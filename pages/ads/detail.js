// pages/ads/detail.js
const config = require('../../utils/config');
const util = require('../../utils/util');
const api = require('../../api/index');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
  	aliyuncs: config.aliyuncs,
  	favorite: false,
  	detail: {},
    adsList: [],
  	timeoutId: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  	this.setData({
  		detail: app.globalData.adsDetail || {}
  	});
  	this.data.timeoutId = setTimeout(this.addAdvUser, 9000);
  	api.getUserCollectionByObject({
  		c_object: app.globalData.adsDetail.id
  	}, (res) => {
  		this.setData({
  			favorite: res.collection === 1
  		});
  	});
    api.getAdsList({start:0, limit:5, business: this.data.detail.business}, (res) => {
      this.setData({
        adsList: res.topics
      });
    });
  },
  
  /**
   * 收藏 
   */
  favoriteClick: function () {
  	let success = () => {
  		this.setData({
	  		favorite: !this.data.favorite
	  	});
  		util.success(this.data.favorite ? '搜藏成功' : '取消收藏成功');
  	}
  	let error = () => {
  		util.success(this.data.favorite ? '取消收藏成功' : '收藏失败');
  	}
  	if (this.data.favorite) {
  		api.delUserCollection({
	  		c_object: app.globalData.adsDetail.id
	  	}, success, error)
  		return;
  	}
  	api.addUserCollection({
  		c_type: 1,
  		c_object: app.globalData.adsDetail.id
  	}, success, error)
  },
  /**
   * 用户点击记录接口 
   */
  addAdvUser: function () {
  	api.addAdvUser({
  		adv_id: this.data.detail.id,
  		dimension: app.globalData.latitude,
      longitude: app.globalData.longitude
  	})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  	clearTimeout(this.data.timeoutId);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})