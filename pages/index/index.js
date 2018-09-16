//index.js

const api = require('../../api/index');
const config = require('../../utils/config');
const util = require('../../utils/util');
var app = getApp();
Page({
  data: {
		aliyuncs: config.aliyuncs,
    fixedSearch: false,
		adsList: [],
    formData: {}
  },
  //事件处理函数
  bindViewTap: function() {
  },
  onLoad: function () {
  },
  onShow: function () {
    this.setData({
      adsList: []
    })
    this.getAdsList()
  },
	getAdsList: function (callback) {
    let data = {
      start: this.data.adsList.length,
      limit: 10
    }
    for (let i in this.data.formData) {
      data[i] = this.data.formData[i]
    }
		api.getAdsList(data, (res) => {
			callback && callback();
			this.setData({
				adsList: this.data.adsList.concat(res.topics)
			});
		});
	},
  onPullDownRefresh () {
    wx.showNavigationBarLoading() //在标题栏中显示加载
		this.setData({
			adsList: []
		})
		this.getAdsList(() => {
			wx.hideNavigationBarLoading() //完成停止加载
			wx.stopPullDownRefresh() //停止下拉刷新
		});
  },
	onReachBottom () {
		wx.showNavigationBarLoading() //在标题栏中显示加载
		this.getAdsList(() => {
			wx.hideNavigationBarLoading() //完成停止加载
		});
	},
  searchCallback (e) {
    this.setData({
      adsList: [],
      formData: e.detail
    })
    this.getAdsList()
  },
  onPageScroll (e) {
    if (e.scrollTop >= 220) {
      this.setData({
        fixedSearch: true
      })
    } else {
      this.setData({
        fixedSearch: false
      })
    }
  }
})
