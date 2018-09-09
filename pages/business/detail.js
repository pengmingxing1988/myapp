// pages/business/detail.js
const app = getApp();
const api = require('../../api/index.js');
const util = require('../../utils/util');
const config = require('../../utils/config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    favorite: false,
    aliyuncs: config.aliyuncs,
    adsList: [],
    bus_name: '',
    content: '',
    contact: '',
    telephone: '',
    address: '',
    bus_status: '',
    dimension: null,
    longitude: null,
    files1: [], // 商家图片
    fileNames1: [], // 商家图片名称
    progresses1: [], // 商家图片上传完成度
    files2: [], // 商家资质
    fileNames2: [], // 商家资质名称
    progresses2: [] // 商家资质上传完成度
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let d = app.globalData.businessDetail
    this.setData({
      bus_name: d.bus_name,
      content: d.content,
      contact: d.contact,
      telephone: d.telephone,
      address: d.address,
      bus_status: d.bus_status,
      fileNames1: d.img_file ? d.img_file.split('_') : [],
      fileNames2: d.bus_certificates ? d.bus_certificates.split('_') : []
    })
    api.getUserCollectionByObject({
      c_object: d.id
    }, (res) => {
      this.setData({
        favorite: res.collection === 1
      });
    });
    api.getAdsList({ start: 0, limit: 5, business: d.id }, (res) => {
      this.setData({
        adsList: res.topics
      });
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  previewImage: function (e) {
    let d = JSON.parse(e.target.dataset.value)
    let urls = this.data.fileNames1
    if (d.type == 2) {
      urls = this.data.fileNames2
    }
    let nUrls = []
    urls.forEach((item) => {
      nUrls.push(this.data.aliyuncs + item);
    })
    wx.previewImage({
      current: nUrls[d.index],
      urls: nUrls
    })
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
        c_object: app.globalData.businessDetail.id
      }, success, error)
      return;
    }
    api.addUserCollection({
      c_type: 2,
      c_object: app.globalData.businessDetail.id
    }, success, error)
  }
})