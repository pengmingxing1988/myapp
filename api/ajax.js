const config = require('../utils/config');

/**
 * ajax 请求
 * url: URL地址
 * method: 方法，默认post
 * params: 参数
 * success: 成功回调函数
 * error: 失败回调函数
 */
const ajax = function (url, method, params, success, error) {
	if (typeof params === 'function') {
		success = params;
		error = success;
		params = {};
	}
    url = `${config.domain}${url}`;
    console.log('====请求接口====')
    console.log(url)
	let headers = {'Content-Type': 'application/x-www-form-urlencoded'};
	if (!params.isLogin) {
		headers['Cookie'] = wx.getStorageSync('session_id');
	}
    wx.request({
      url: url,
      method: method || 'post',
      data: params,
      header: headers,
      success: function (res) {
      	console.log('====成功====')
      	console.log(res)
        if (res.statusCode === 200) {
          if (res.header && res.header.message === 'login') {
            wx.redirectTo({
          		url: '/pages/login/index'
          	});
          	return;
          }
          if (params && params.isLogin) {
            wx.setStorageSync('session_id', res.header['Set-Cookie'])
          }
          success && success(res.data)
        }
      },
      fail: function (res) {
      	console.log('====失败====')
      	console.warn(res)
        error && error(res)
      }
    });
};

const _get = function (url, data, success, error) {
  ajax(url, 'get', data, success, error);
};

const _post = function (url, data, success, error) {
  ajax(url, 'post', data, success, error);
};

module.exports = {
  get: _get,
  post: _post
}
