/**
 * 商家API
 */
const ajax = require('./ajax');

/**
 * 新增商家信息
 * @param {Object} data
 * @param {Object} success
 * @param {Object} error
 */
const businessCreate = function (data, success, error) {
	ajax.post('mobile/business/addBusiness.do', data, success, error);
}

/**
 * 查询商家信息
 * @param {Object} data
 * @param {Object} success
 * @param {Object} error
 */
const businessQuery = function (data, success, error) {
	ajax.post('mobile/business/queryBusiness.do', data, success, error);
}

/**
 * 商家下架接口
 * @param {Object} data
 * @param {Object} success
 * @param {Object} error
 */
const businessCancel = function (data, success, error) {
	ajax.post('mobile/business/cancelBusiness.do', data, success, error);
}

module.exports = {
	businessCreate: businessCreate, //新增商家信息
	businessQuery: businessQuery, //查询商家信息
	businessCancel: businessCancel //商家下架接口
}
