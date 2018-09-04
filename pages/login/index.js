// pages/login/index.js
//获取应用实例
const app = getApp()
const api = require('../../api/index.js')
const conUtil = require('../../utils/constant.js')
const storage = conUtil.Storage

Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: wx.getStorageSync(storage.userInfo),
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  getUserInfo: function (e) {
    let userInfo = e.detail.userInfo
    if (userInfo) {
      let nInfo = {}
      for (let i in userInfo) {
        nInfo[i.toUpperCase()] = userInfo[i]
      }
      wx.setStorageSync(storage.userInfo, nInfo)
      api.updateUserInfo({
        "nick_name": userInfo.nickName,
        "gender": userInfo.gender,
        "language": userInfo.language,
        "city": userInfo.city,
        "province": userInfo.province,
        "country": userInfo.country,
        "avatar_url": userInfo.avatarUrl
      })
      wx.switchTab({
        url: '/pages/index/index' // 首页
      })
    } else {
      wx.showToast({
        title: '请授权',
      })
      console.log(e.detail.errMsg)
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})