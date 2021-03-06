const api = require('../../../api/index.js');
const util = require('../../../utils/util');
var commonMixin = require('../../../mixins/commonMixin')
Page(Object.assign({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: null,
    longitude: null,
		fileType: 'img',
		files: [],
		fileNames: [],
		progresses: [],
		showLimitArea: false,
		showIntervalDay: false,
    isDiabledDay: false, // 是否限制天数
    isDisabledDistant: false // 是否限制范围
  },
  onLoad: function(){
    // 定位
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        var latitude = res.latitude
        var longitude = res.longitude
        this.setData({
          latitude: latitude,//纬度 
          longitude: longitude//经度 
        })
      }
    })
  },
	uploadFile: function (index) {
		if (index >= this.data.files.length) {
			//退出上传
			return;
		}
		let file = this.data.files[index];
		let fileName = util.randomString() + util.getFileSuffix(file);
		this.data.fileNames.push(fileName);
		this.setData({
			fileNames: this.data.fileNames
		});
		this.data.progresses.push(0);
		api.getObjectPolicy((data) => {
			util.uploadFile(file, fileName, data, (r) => {
				this.data.progresses[index] = r.progress < 100 ? r.progress + '%' : '完成';
				this.setData({
					progresses: this.data.progresses
				})
			}, (r) => {
				index++;
				this.uploadFile(index);
			}, (r) => {
				this.data.progresses[index] = '失败';
				index++;
				this.uploadFile(index);
			})
		})
	},
  selectFile: function() { // 选择文件
	  if (this.data.fileType === 'video') {
			if (this.data.files.length >= 1) {
        util.error('最多1个视频')
				return;
			}
			util.chooseVideo((res) => {
				if (!util.checkSize(res.size)) {
          util.error('最大20M的视频')
					return;
				}
				let index = this.data.files.length;
				this.data.files.push(res.tempFilePath);
				this.setData({
					files: this.data.files
				});
				this.uploadFile(index);
			})
			return;
		}
		if (this.data.files.length >= 9) {
      util.error('最多9张图片')
			return;
		}
    util.chooseImage({
			count: 9 - this.data.files.length
		}, (files) => {
			//上传图片
			let index = this.data.files.length;
			for (let i=0; i<files.length; i++) {
				this.data.files.push(files[i]);
			}
			this.setData({
				files: this.data.files
			});
			this.uploadFile(index);
    })
  },
	fileTypeChange (e) { // 文件类型切换
		this.setData({
			files: [],
			fileNames: [],
			progresses: [],
			fileType: e.detail.value
		});
	},
  limitAreaChange (e) { // 限制范围
    this.setData({
			showLimitArea: e.detail.value.length
		});
  },
	intervalDayChange (e) { // 间隔天数
		this.setData({
			showIntervalDay: e.detail.value.length
		});
	},
	formSubmit (e) { // 表单提交
		console.log(e.detail.value)
		let d = e.detail.value
		if (!d.title) {
      util.error('请输入标题');
			return;
		}
		if (!this.data.files.length) {
      util.error('请选择文件');
			return;
		}
		if (!d.price) {
      util.error('请输入价格');
			return;
		}
		let formData = {
			title: d.title,
			content: d.content || '',
			file_type: d.file_type,
			a_file: this.data.fileNames.join('_'),
			interval_day: d.interval_day || 0,
			a_type: d.a_type,
			latitude: d.latitude || 0,
			dimension: d.longitude || 0,
			total_count: d.total_count || 0,
			distance: d.distance || 0,
			price: d.price || 0
		}
    wx.showModal({
      title: '您否是确认发布？',
      content: '发布后需要支付'+d.price*d.total_count+'元',
      success: function (res) {
        if (res.confirm) {
          api.createAds(formData, () => {
            util.success('发布广告成功', {
              success: () => {
                wx.switchTab({
                  url: '/pages/mycenter/index'
                })
              }
            })
          }, () => {
            util.error('发布广告失败')
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
	}
}, commonMixin));
