// pages/collection/index.js
const util = require("../../utils/util");
const api = require("../../api/index");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current: 'ads',
    adsList: [],
    businessList: []
  },

  clickTab (e) {
    this.setData({
      current: e.target.dataset.current
    })
  },
  
  getList () {
  	// 获取我收藏的广告列表
  	api.queryUserCollection({
  		c_type: 1
  	}, (res) => {
  		this.setData({
  			adsList: res.topics
  		});
  	});
  	// 获取我收藏的商家列表
  	api.queryUserCollection({
  		c_type: 2
  	}, (res) => {
  		this.setData({
  			businessList: res.topics
  		});
  	})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
		
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
    this.getList();
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
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
   wx.stopPullDownRefresh()
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
  
  },
  //滑动事件处理
  touchmove: function (e) {
  	debugger
		util.touchMoveEvent.call(this, e, (index, bool) => {
			if (bool) {
				this.data.adsList.forEach(function (v, i) {
					v.showDel = false;
				});
			}
			this.data.adsList[index].showDel = bool;
			//更新数据
			this.setData({
				adsList: this.data.adsList
			})
		});
  }
})