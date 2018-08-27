// pages/business/join.js
const api = require('../../../api/index.js');
const util = require('../../../utils/util');
const config = require('../../../utils/config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadEnd: false,
    aliyuncs: config.aliyuncs,
    bus_name: '',
    contact: '',
    telephone: '',
    address: '',
    bus_status: '',
    dimension: null,
    longitude: null,
    files1: [], // 商家图片
    fileNames1: [], // 商家图片名称
    progresses1: [], // 商家图片上传完成度
    files2: [], // 商家资质
    fileNames2: [], // 商家资质名称
    progresses2: [] // 商家资质上传完成度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 定位
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success: (res) => {
        var latitude = res.latitude
        var longitude = res.longitude
        this.setData({
          dimension: latitude,//纬度 
          longitude: longitude//经度 
        })
      }
    })
    api.queryBusinessById((res) => {
      if (res.topics && res.topics.length) {
        let d = res.topics[0]
        this.setData({
          bus_name: d.bus_name,
          contact: d.contact,
          telephone: d.telephone,
          address: d.address,
          bus_status: d.bus_status,
          fileNames1: d.img_file ? d.img_file.split('_') : [],
          fileNames2: d.bus_certificates ? d.bus_certificates.split('_') : []
        })
      }
      this.setData({
        loadEnd: true
      });
    })
  },
  uploadFile: function (files, index, callback, callback1) {
    if (index >= files.length) {
      //退出上传
      return;
    }
    let file = files[index];
    let fileName = util.randomString() + util.getFileSuffix(file);
    callback(fileName)
    api.getObjectPolicy((data) => {
      util.uploadFile(file, fileName, data, (r) => {
        callback1(r.progress < 100 ? r.progress + '%' : '完成', index);
      }, (r) => {
        index++;
        this.uploadFile(files, index, callback, callback1);
      }, (r) => {
        this.data.progresses[index] = '失败';
        index++;
        this.uploadFile(files, index, callback, callback1);
      })
    })
  },
  selectPicFile1: function () { // 选择文件，商家图片
    util.chooseImage({
      count: 9 - this.data.files1.length
    }, (files) => {
      //上传图片
      let index = this.data.files1.length;
      for (let i = 0; i < files.length; i++) {
        this.data.files1.push(files[i]);
      }
      this.setData({
        files1: this.data.files1
      });
      this.uploadFile(this.data.files1, index, (fileName) => {
        this.data.fileNames1.push(fileName);
        this.data.progresses1.push(0);
        this.setData({
          fileNames1: this.data.fileNames1,
          progresses1: this.data.progresses1
        });
      }, (progress, index) => {
        this.data.progresses1[index] = progress;
        this.setData({
          progresses1: this.data.progresses1
        })
      });
    })
  },
  selectPicFile2: function () { // 选择文件，商家图片
    util.chooseImage({
      count: 9 - this.data.files2.length
    }, (files) => {
      //上传图片
      let index = this.data.files2.length;
      for (let i = 0; i < files.length; i++) {
        this.data.files2.push(files[i]);
      }
      this.setData({
        files2: this.data.files2
      });
      this.uploadFile(this.data.files2, index, (fileName) => {
        this.data.fileNames2.push(fileName);
        this.data.progresses2.push(0);
        this.setData({
          fileNames2: this.data.fileNames2,
          progresses2: this.data.progresses2
        });
      }, (progress, index) => {
        this.data.progresses2[index] = progress;
        this.setData({
          progresses2: this.data.progresses2
        })
      });
    })
  },
  formSubmit(e) { // 表单提交
    console.log(e.detail.value)
    let d = e.detail.value
    if (!d.bus_name) {
      util.error('请输入商家名称');
      return;
    }
    if (!d.contact) {
      util.error('请输入联系人');
      return;
    }
    if (!d.telephone) {
      util.error('请输入联系电话');
      return;
    }
    if (!d.address) {
      util.error('请输入地址');
      return;
    }
    if (!this.data.fileNames1.length) {
      util.error('请上传商家图片');
      return;
    }
    if (!this.data.fileNames2.length) {
      util.error('请上传商家资质');
      return;
    }
    let formData = {
      bus_name: d.bus_name,
      contact: d.contact,
      telephone: d.telephone,
      address: d.address,
      img_file: this.data.fileNames1.join('_'),
      bus_certificates: this.data.fileNames2.join('_'),
      dimension: this.data.dimension || 0,
      longitude: this.data.longitude || 0
    }
    api.businessCreate(formData, () => {
      util.success('申请提交成功', {
        success: () => {
          wx.switchTab({
            url: '/pages/mycenter/index'
          })
        }
      })
    }, () => {
      util.error('申请提交失败')
    })
  },
  cancelFormSubmit(e) { // 表单提交
    api.businessCancel(() => {
      util.success('下架成功', {
        success: () => {
          wx.switchTab({
            url: '/pages/mycenter/index'
          })
        }
      })
    }, () => {
      util.error('下架失败')
    })
  }
})