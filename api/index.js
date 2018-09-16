const ajax = require('./ajax');
const ads = require('./ads');
const collection = require('./collection');
const business = require('./business');

// 用户登录
const login = function (code, success, error) {
  ajax.get(`miniProgram/user/login.do`, {
    code: code,
    isLogin: true
  }, success, error);
};

// 更新用户信息
const updateUserInfo = function (data, success, error) {
  ajax.post(`mobile/user/updateUserInfo.do`, data, success, error);
};

// 获取签名
const getObjectPolicy = function (data, success, error) {
	ajax.get('mobile/oss/postObjectPolicy.do', data, success, error);
}

// 获取账户余额
const getAccount = function (success, error) {
  ajax.get('mobile/user/myAccount.do', success, error)
}

const extendObj = function (obj1, obj2) {
	for (let i in obj2) {
		obj1[i] = obj2[i];
	}
}

let modules = {
	login: login, // 登录
  updateUserInfo: updateUserInfo, // 更新用户信息(第一次新增，第二次开始就是更新)
	getObjectPolicy: getObjectPolicy, // 获取签名
  getAccount: getAccount // 获取账户余额
}
extendObj(modules, ads);
extendObj(modules, collection);
extendObj(modules, business);

module.exports = modules;