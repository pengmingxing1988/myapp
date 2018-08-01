// components/ads/adsList.js
const app = getApp();
const config = require('../../utils/config');
const util = require("../../utils/util");
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  	datas: {
  		type: Array,
  		value: []
  	},
  	message: {
  		type: String,
  		value: '暂无广告'
    },
    showSearch: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
  	startX: 0,
    startY: 0,
  	aliyuncs: config.aliyuncs,
  	adTypes: [
  	  {id: '', name: '全部'},
  	  {id: '1', name: '推广'},
  	  {id: '2', name: '促销'},
  	  {id: '3', name: '需求'}
  	],
    formData: {
      a_type: '',
      title: ''
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
  	//手指触摸动作开始 记录起点X坐标
	  touchstart: function (e) {
			util.touchStartEvent.call(this, e);
	  },
	  //滑动事件处理
	  touchmove: function (e) {
			util.touchMoveEvent.call(this, e, (index, bool) => {
				this.data.touchMoveEvent && this.data.touchMoveEvent(index, bool);
			});
	  },
	  goToDetail (e) {
	  	app.globalData.adsDetail = e.currentTarget.dataset.value;
      wx.navigateTo({
	  		url: '/pages/ads/detail'
	  	});
	  },
    getParams () {
      let formData = {}
      let adType = this.data.formData.a_type
      if (adType) {
        formData.a_type = adType
      }
      let title = this.data.formData.title
      if (title) {
        formData.title = title
      }
      return formData
    },
    adTypeChange (e) {
      this.data.formData.a_type = this.data.adTypes[parseInt(e.detail.value)].id
      this.setData({
        formData: this.data.formData
      })
      this.triggerEvent('searchCallback', this.getParams())
    },
    titleChange(e) {
      this.data.formData.title = e.detail.value
      this.setData({
        formData: this.data.formData
      })
      this.triggerEvent('searchCallback', this.getParams())
    }
  }
})
