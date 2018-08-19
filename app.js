//app.js
const conUtil = require('./utils/constant.js')
const storage = conUtil.Storage
App({
  onLaunch: function () {
  	wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        this.globalData.latitude = res.latitude
        this.globalData.longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
      }
    })
		//session_key 未过期，并且在本生命周期一直有效
		if (!wx.getStorageSync(storage.userInfo)) {
			wx.redirectTo({
				url: '/pages/login/index',
			})
		}
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
  	latitude: null, //纬度
  	longitude: null, //经度
  	adsDetail: {},
    userInfo: null,
    businessInfo: null
  }
})