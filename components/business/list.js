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
      value: '暂无商家'
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
    aliyuncs: config.aliyuncs,
    formData: {
      title: ''
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goToDetail(e) {
      app.globalData.businessDetail = e.currentTarget.dataset.value;
      wx.navigateTo({
        url: '/pages/business/detail'
      });
    },
    getParams() {
      let formData = {}
      let bus_name = this.data.formData.bus_name
      if (bus_name) {
        formData.bus_name = bus_name
      }
      return formData
    },
    titleChange(e) {
      this.data.formData.bus_name = e.detail.value
      this.setData({
        formData: this.data.formData
      })
      this.triggerEvent('searchCallback', this.getParams())
    }
  }
})
