/**
 * 收藏API
 */
const ajax = require('./ajax');

/**
 * 新增用户收藏
 * @param {Object} data 
 * {
 * 	c_type:1 (1广告, 2商家)
 * 	c_object:广告ID
 * }
 * @param {Object} success
 * @param {Object} error
 */
const addUserCollection = function (data, success, error) {
	ajax.post('mobile/collection/addUserCollection.do', data, success, error);
}

/**
 * 查询用户是否收藏
 * @param {Object} data {c_object:广告ID}
 * @param {Object} success
 * @param {Object} error
 */
const getUserCollectionByObject = function (data, success, error) {
	ajax.post('mobile/collection/userCollectionByObject.do', data, success, error);
}
/**
 * 删除用户收藏
 * @param {Object} data {c_object:广告ID}
 * @param {Object} success
 * @param {Object} error
 */
const delUserCollection = function (data, success, error) {
	ajax.post('mobile/collection/delUserCollection.do', data, success, error);
}

/**
 * 获取我的收藏列表
 * @param {Object} data {c_type:1 (1广告, 2商家)}
 * @param {Object} success
 * @param {Object} error
 */
const queryUserCollection = function (data, success, error) {
	ajax.post('mobile/collection/queryUserCollection.do', data, (res) => {
    if (!res) {
      res = {
        topics: [],
        totalCount: []
      }
    }
	  res.topics.forEach((item) => {
			if (item.file_type === 'img') {
				item.a_file = item.a_file.split('_');
			}
		});
		success && success(res);
	}, error);
}

module.exports = {
	addUserCollection: addUserCollection, // 新增用户收藏
	getUserCollectionByObject: getUserCollectionByObject, //查询用户是否收藏
	delUserCollection: delUserCollection, // 删除用户收藏
	queryUserCollection: queryUserCollection // 获取我的收藏列表
}
