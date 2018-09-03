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
  },
  globalData: {
  	latitude: null, //纬度
  	longitude: null, //经度
  	adsDetail: {},
    userInfo: null,
    businessInfo: null
  }
})