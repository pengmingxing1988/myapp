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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  loginClick: function (callback) {
  	// 登录
		wx.login({
			success: res => {
				console.log('====小程序登录接口调用成功的回调函数====')
				console.log(res)
				api.login(res.code, () => {
					// 发送 res.code 到后台换取 openId, sessionKey, unionId
					if (typeof callback === 'function') {
					  callback();
					} else {
            wx.switchTab({
						  url: '/pages/index/index'
						});
					}
				});
			},
			fail: res => {
				console.log('====小程序登录接口调用失败的回调函数====')
				console.log(res)
			}
		})
  },
  getUserInfo: function (e) {
  	this.loginClick(() => {
	    let userInfo = e.detail.userInfo
	    if (userInfo) {
	      wx.setStorageSync(storage.userInfo, userInfo)
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
	      console.log(e.detail.errMsg)
	    }
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