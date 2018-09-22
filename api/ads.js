/**
 * 广告API
 */
const ajax = require('./ajax');

const _adsRequest = function (name, args) {
	if (name === 'queryAdvertisement' || name === 'myAdvertisement' || name === 'myUserAdvertisement') {
	  if (typeof args[0] === 'function') {
	  	let f = args[0]
	  	args[0] = (res) => {
	  	res.topics.forEach((item) => {
	  		item.$showDel = false;
				if (item.file_type === 'img') {
					item.a_file = item.a_file.split('_');
				}
			});
			f(res);
	  	}
	  } else {
	  	let f = args[1];
	  	args[1] = (res) => {
	  		res.topics.forEach((item) => {
	  			item.$showDel = false;
				if (item.file_type === 'img') {
					item.a_file = item.a_file.split('_');
				}
			});
			f(res);
	  	}
	  }
	}
	ajax.post.apply(null, [`mobile/advertisement/${name}.do`].concat(Array.prototype.slice.call(args, 0)));
}

// 发布广告
const createAds = function (data, success, error) {
	_adsRequest('addAdvertisement', arguments);
};

// 获取广告列表
const getAdsList = function (data, success, error) {
	_adsRequest('queryAdvertisement', arguments);
};

// 获取自己的广告列表
const getMyAdsList = function (data, success, error) {
	_adsRequest('myAdvertisement', arguments);
};

// 获取我看过的广告
const getMyWatchedAdsList = function (data, success, error) {
	_adsRequest('myUserAdvertisement', arguments);
}

/**
 * 根据ID获取广告详情
 * @param {Object} {ads_id:'广告ID'}
 * @param {Object} success
 * @param {Object} error
 */
const getAdsById = function (ads_id, success, error) {
	_adsRequest('advertisementById', arguments);
}

// 用户点击记录接口
const addAdvUser = function (data, success, error) {
	_adsRequest('addAdvUser', arguments);
}

/**
 * 获取看过此广告的用户
 * @param {Object} data {adv_id:广告ID}
 * @param {Object} success
 * @param {Object} error
 */
const getAdvertisementByUser = function (data, success, error) {
	_adsRequest('advertisementByUser', arguments);
}

const queryGetMoneyInfo = function (data, success, error) {
  ajax.post('mobile/advertisement/queryGetMoneyInfo.do', data, success, error)
}

module.exports = {
	createAds: createAds, // 发布广告
	getMyAdsList: getMyAdsList, // 获取我的广告列表
	getAdsList: getAdsList, // 获取广告列表
	getAdsById: getAdsById, // 根据广告ID获取广告详情
	getMyWatchedAdsList: getMyWatchedAdsList, // 获取我看过的广告列表
	addAdvUser: addAdvUser, // 用户点击记录接口
	getAdvertisementByUser: getAdvertisementByUser, // 获取看过此广告的用户
  queryGetMoneyInfo: queryGetMoneyInfo // 获取状态
}
