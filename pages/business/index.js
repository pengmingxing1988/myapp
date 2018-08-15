// pages/business/index.js
const api = require('../../api/index');
const config = require('../../utils/config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    aliyuncs: config.aliyuncs,
    datas: [],
    formData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getBusinessList();
  },
  getBusinessList (callback) {
    let data = {
      start: this.data.datas.length,
      limit: 10
    }
    for (let i in this.data.formData) {
      data[i] = this.data.formData[i]
    }
    api.businessQuery(data, (res) => {
      res.topics.forEach((item) => {
        item.img_file = item.img_file.split('_')[0]
      })
      this.setData({
        datas: this.data.datas.concat(res.topics)
      });
    })
  },
  onPullDownRefresh() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.setData({
      datas: []
    })
    this.getAdsList(() => {
      wx.hideNavigationBarLoading() //完成停止加载
      wx.stopPullDownRefresh() //停止下拉刷新
    });
  },
  onReachBottom() {
    wx.showNavigationBarLoading() //在标题栏中显示加载
    this.getBusinessList(() => {
      wx.hideNavigationBarLoading() //完成停止加载
    });
  },
  searchCallback(e) {
    this.setData({
      datas: [],
      formData: e.detail
    })
    this.getBusinessList()
  }
})