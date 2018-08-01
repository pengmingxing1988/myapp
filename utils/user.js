const app = getApp()
const conUtil = require('./constant.js')
const storage = conUtil.Storage

// 获取用户信息
const getUserInfo = function (callback) {
  const userInfo = wx.getStorageSync(storage.userInfo)
  if (userInfo) {
    callback && callback(userInfo)
  } else if (wx.canIUse('button.open-type.getUserInfo')) {
    // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    // 所以此处加入 callback 以防止这种情况
    app.userInfoReadyCallback = res => {
      wx.setStorageSync(storage.userInfo, res.userInfo)
      callback && callback(res.userInfo)
    }
  } else {
    // 在没有 open-type=getUserInfo 版本的兼容处理
    wx.getUserInfo({
      success: res => {
        wx.setStorageSync(storage.userInfo, res.userInfo)
        callback && callback(res.userInfo)
      }
    })
  }
}

module.exports = {
  getUserInfo: getUserInfo
}