// pages/mycenter/index.js
const userUtil = require('../../utils/user.js')
const api = require('../../api/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    businessInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    userUtil.getUserInfo((userInfo) => {
      this.setData({
        userInfo: userInfo
      })
    })
    api.queryBusinessById((res) => {
      if (res.topics && res.topics.length) {
        this.setData({
          businessInfo: res.topics[0]
        })
      }
    })
  },

  goAdsCreateOrEdit () { // 跳转广告发布页面
    wx.navigateTo({
      url: '/pages/mycenter/ads/create',
    })
  },
	goAdsList () { // 跳转广告管理页面
    wx.navigateTo({
			url: '/pages/mycenter/ads/list',
		})
	},
	goMyWatchedAdsList () { // 跳转到我看过的广告页面
    wx.navigateTo({
			url: '/pages/mycenter/ads/watched'
		});
	},
	goJoinBusinessPage () { // 跳转到加入商家页面
		wx.navigateTo({
			url: '/pages/mycenter/business/join'
		});
  },
  goBusinessDetailPage() { // 跳转到商家详情页面
    wx.navigateTo({
      url: '/pages/mycenter/business/detail'
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})