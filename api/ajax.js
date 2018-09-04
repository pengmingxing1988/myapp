const config = require('../utils/config');
const api = require('./index.js')
const conUtil = require('../utils/constant.js')
const storage = conUtil.Storage

/**
 * ajax 请求
 * url: URL地址
 * method: 方法，默认post
 * params: 参数
 * success: 成功回调函数
 * error: 失败回调函数
 */
const ajax = function(url, method, params, success, error) {
  let tempUrl = url
  if (typeof params === 'function') {
    success = params;
    error = success;
    params = {};
  }
  url = `${config.domain}${url}`;
  console.log('====请求接口====')
  console.log(url)
  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  };
  if (!params.isLogin) {
    headers['Cookie'] = wx.getStorageSync('session_id');
  }
  wx.request({
    url: url,
    method: method || 'post',
    data: params,
    header: headers,
    success: function(res) {
      console.log('====成功====')
      console.log(res)
      if (res.statusCode === 200) {
        if (res.data && res.data.status == 401) {
          // 登录
          console.log('====自动登录====')
          wx.login({
            success: res => {
              console.log('====小程序登录接口调用成功的回调函数====')
              console.log(res)
              ajax(`miniProgram/user/login.do`, 'get', {
                code: res.code,
                isLogin: true
              }, (lres) => {
                if (lres.newUser || lres.status == 500) {
                  // 新用户跳转到授权页面
                  wx.redirectTo({
                    url: '/pages/login/index'
                  });
                  return
                } else {
                  wx.setStorageSync(storage.userInfo, lres.user)
                }
                // 发送 res.code 到后台换取 openId, sessionKey, unionId
                console.log(`====登录成功, 回调ajax====`)
                ajax(tempUrl, method, params, success, error)
              }, (err) => {
                console.log('====登录失败====')
                console.log(err)
              })
            },
            fail: res => {
              console.log('====小程序登录接口调用失败的回调函数====')
              console.log(res)
            }
          })
          return;
        }
        if (params && params.isLogin) {
          wx.setStorageSync('session_id', res.header['Set-Cookie'])
        }
        success && success(res.data)
      }
    },
    fail: function(res) {
      wx.showToast({
        title: '请求失败',
      })
      console.log('====失败====')
      console.warn(res)
      error && error(res)
    }
  });
};

const _get = function(url, data, success, error) {
  ajax(url, 'get', data, success, error);
};

const _post = function(url, data, success, error) {
  ajax(url, 'post', data, success, error);
};

module.exports = {
  get: _get,
  post: _post
}