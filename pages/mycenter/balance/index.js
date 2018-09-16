// pages/mycenter/balance/index.js
const api = require('../../../api/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 0
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    api.getAccount((res) => {
      this.setData({
        total: res.topics || 0
      })
    })
  },
  withdraw () {
    wx.showToast({
      icon: 'none',
      title: '敬请期待',
    })
  }
})