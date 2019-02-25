// pages/hotCategory/hotCategory.js
import * as echarts from '../../ec-canvas/echarts';
const app = getApp()


Page({

  /**
   * 页面的初始数据
   */
  data: {
    changTag: 1, // 1.为销售金额含税 2.为销售数量 3.为购买次数
    screenHeight: 0, // 设备的高度
    showNodata: false,
    productInfoList: [
      { name: '商品名称1', price: '$21000.00', propertion: 50 },
      { name: '商品名称2', price: '$21000.00', propertion: 30 },
      { name: '商品名称3', price: '$21000.00', propertion: 20 },
      { name: '商品名称4', price: '$21000.00', propertion: 10 },
      { name: '商品名称5', price: '$21000.00', propertion: 100 },
      { name: '商品名称6', price: '$21000.00', propertion: 290 },
      { name: '商品名称7', price: '$21000.00', propertion: 50 },
      { name: '商品名称8', price: '$21000.00', propertion: 50 },
      { name: '商品名称9', price: '$21000.00', propertion: 50 },
      { name: '商品名称10', price: '$21000.00', propertion: 50 },
      { name: '商品名称11', price: '$21000.00', propertion: 50 },
      { name: '商品名称12', price: '$21000.00', propertion: 50 },
      { name: '商品名称13', price: '$21000.00', propertion: 50 },
      { name: '商品名称14', price: '$21000.00', propertion: 50 },
      { name: '商品名称15', price: '$21000.00', propertion: 50 },
      { name: '商品名称16', price: '$21000.00', propertion: 50 },
      { name: '商品名称17', price: '$21000.00', propertion: 50 },
      { name: '商品名称18', price: '$21000.00', propertion: 50 },
      { name: '商品名称19', price: '$21000.00', propertion: 50 },
      { name: '商品名称10', price: '$21000.00', propertion: 50 },
      { name: '商品名称21', price: '$21000.00', propertion: 50 },
      { name: '商品名称22', price: '$21000.00', propertion: 50 },
      { name: '商品名称23', price: '$21000.00', propertion: 50 },
      { name: '商品名称24', price: '$21000.00', propertion: 50 }

    ] //商品信息
  },
  // 切换nav展示不同的数据
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenHeight: res.windowHeight - 145
        })
        console.log(res.windowHeight,'高度')
      }
    })
    // 获取热销商品数据
    that.getHotprodata()
  },
  changeTag(e) {
    var that = this;
    var type = e.currentTarget.dataset.type;
    that.setData({
      changTag: +type
    })
    if (that.data.productInfoList.length !== 0) {
      that.setData({
        showNodata: false
      })
      if (+type === 1) {
        console.log(1)
        that.setData({
          productInfoList: [
            { name: '商品名称1', price: '$21000.00', propertion: 50 },
            { name: '商品名称2', price: '$21000.00', propertion: 30 },
            { name: '商品名称3', price: '$21000.00', propertion: 20 },
            { name: '商品名称4', price: '$21000.00', propertion: 10 },
            { name: '商品名称5', price: '$21000.00', propertion: 100 },
            { name: '商品名称6', price: '$21000.00', propertion: 290 },
            { name: '商品名称7', price: '$21000.00', propertion: 50 },
            { name: '商品名称8', price: '$21000.00', propertion: 50 },
            { name: '商品名称9', price: '$21000.00', propertion: 50 },
            { name: '商品名称10', price: '$21000.00', propertion: 50 },
            { name: '商品名称11', price: '$21000.00', propertion: 50 },
            { name: '商品名称12', price: '$21000.00', propertion: 50 },
            { name: '商品名称13', price: '$21000.00', propertion: 50 },
            { name: '商品名称14', price: '$21000.00', propertion: 50 },
            { name: '商品名称15', price: '$21000.00', propertion: 50 },
            { name: '商品名称16', price: '$21000.00', propertion: 50 },
            { name: '商品名称17', price: '$21000.00', propertion: 50 },
            { name: '商品名称18', price: '$21000.00', propertion: 50 },
            { name: '商品名称19', price: '$21000.00', propertion: 50 },
            { name: '商品名称10', price: '$21000.00', propertion: 50 },
            { name: '商品名称21', price: '$21000.00', propertion: 50 },
            { name: '商品名称22', price: '$21000.00', propertion: 50 },
            { name: '商品名称23', price: '$21000.00', propertion: 50 },
            { name: '商品名称24', price: '$21000.00', propertion: 50 }
          ]
        })
      } else if (+type === 2) {
        console.log(2)
        that.setData({
          productInfoList: [
            { name: '商品名称1', price: '100件', propertion: 50 },
            { name: '商品名称2', price: '100件', propertion: 30 },
            { name: '商品名称3', price: '100件', propertion: 20 },
            { name: '商品名称4', price: '100件', propertion: 10 },
            { name: '商品名称5', price: '100件', propertion: 100 },
            { name: '商品名称6', price: '100件', propertion: 290 },
            { name: '商品名称7', price: '100件', propertion: 50 },
            { name: '商品名称8', price: '100件', propertion: 50 },
            { name: '商品名称9', price: '100件', propertion: 50 },
            { name: '商品名称10', price: '100件', propertion: 50 },
            { name: '商品名称11', price: '100件', propertion: 50 },
            { name: '商品名称12', price: '100件', propertion: 50 },
            { name: '商品名称13', price: '100件', propertion: 50 },
            { name: '商品名称14', price: '100件', propertion: 50 },
            { name: '商品名称15', price: '100件', propertion: 50 },
            { name: '商品名称16', price: '100件', propertion: 50 },
            { name: '商品名称17', price: '100件', propertion: 50 },
            { name: '商品名称18', price: '100件', propertion: 50 },
            { name: '商品名称19', price: '100件', propertion: 50 },
            { name: '商品名称10', price: '100件', propertion: 50 },
            { name: '商品名称21', price: '100件', propertion: 50 },
            { name: '商品名称22', price: '100件', propertion: 50 },
            { name: '商品名称23', price: '100件', propertion: 50 },
            { name: '商品名称24', price: '100件', propertion: 50 }
          ]
        })
      } else {
        console.log(3)
        that.setData({
          productInfoList: [
            { name: '商品名称1', price: '50次', propertion: 50 },
            { name: '商品名称2', price: '50次', propertion: 30 },
            { name: '商品名称3', price: '50次', propertion: 20 },
            { name: '商品名称4', price: '50次', propertion: 10 },
            { name: '商品名称5', price: '50次', propertion: 100 },
            { name: '商品名称6', price: '50次', propertion: 290 },
            { name: '商品名称7', price: '50次', propertion: 50 },
            { name: '商品名称8', price: '50次', propertion: 50 },
            { name: '商品名称9', price: '50次', propertion: 50 },
            { name: '商品名称10', price: '50次', propertion: 50 },
            { name: '商品名称11', price: '50次', propertion: 50 },
            { name: '商品名称12', price: '50次', propertion: 50 },
            { name: '商品名称13', price: '50次', propertion: 50 },
            { name: '商品名称14', price: '50次', propertion: 50 },
            { name: '商品名称15', price: '50次', propertion: 50 },
            { name: '商品名称16', price: '50次', propertion: 50 },
            { name: '商品名称17', price: '50次', propertion: 50 },
            { name: '商品名称18', price: '50次', propertion: 50 },
            { name: '商品名称19', price: '50次', propertion: 50 },
            { name: '商品名称10', price: '50次', propertion: 50 },
            { name: '商品名称21', price: '50次', propertion: 50 },
            { name: '商品名称22', price: '50次', propertion: 50 },
            { name: '商品名称23', price: '50次', propertion: 50 },
            { name: '商品名称24', price: '50次', propertion: 50 }
          ]
        })
      }
    } else {
      that.setData({
        showNodata: true
      })
    }
  },
  // 获取热销商品数据
  getHotprodata () {
      let params = {
        "start_time": "2019-02-01 00:00:00",
        "end_time": "2019-02-25 17:47:17",
        "store_id": 0,
        "ranking_by": 1,
        "is_desc": 1,
        "org_id": 2,
        "top_n": 100
      }
      wx.request({
        url: 'https://a95oyxv7s6.execute-api.cn-northwest-1.amazonaws.com.cn/proc/report/usmile/ranking/sales-test',
        method: 'POST',
        data: params,
        // config: {
        header: {
          'x-api-key': 'XpF1tKUX0CatqWK6uH9UU1CkZ1TNUwnN5USWT1ka'
        },
        // },
        success: function (msg) {
          console.log(msg, 'msgmsg')
        },
        fail: function (err) { }
      })
  },
  // 加载更多信息
  bindscrolltolowers () {},
  // 选择时间
  getDate (e) {
    console.log(e.detail.text)
  },
  // 格式化时间
  
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