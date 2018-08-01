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
  	adsDetail: {
			"business": "business",
			"distance": "0",
			"total_count": "100",
			"a_file": ["dCkEKPz8jArihiFQrGXDJHEpBJe3ezBd1530782333193.png", "mmWfhaRe5kSBnhFjZNnyY4tzFQTJAjF71530782333412.png", "H7K8NEcPttW53xEyySDrWYKNnErZNn7b1530782333733.jpg"],
			"title": "测试标题002测试标题002测试标题002测试标题002测试标题002测试标题002测试标题002",
			"content": "测试内容002",
			"a_type": "1",
			"interval_day": "0",
			"price": "1",
			"file_type": "img",
			"creater": "122351f8f17343009bd2447722e17cc6",
			"id": "703dd22e2a7c2dede0532f6612ac4050",
			"create_date": "2018-07-05 17:19:10 ",
			"dimension": "0",
			"longitude": "",
			"curr_count": "0",
			"a_status": "1"
		},
    userInfo: null
  }
})