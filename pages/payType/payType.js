// pages/hotCategory/hotCategory.js
import * as echarts from '../../ec-canvas/echarts';
const app = getApp()
let payList = [
  { value: 335, name: '支付宝' },
  { value: 310, name: '现金' },
  { value: 234, name: '微信' },
  { value: 135, name: '其他' }
]
let allData = 0

function initChart(canvas,width,height) {
  const chart = echarts.init(canvas,null,{
    width:width,
    height:height
  });
  canvas.setChart(chart);
  var option = {
    color: ['#FFB6C1', '#DC143C','yellow','purple'],
    tooltip: {
      trigger: 'item',
      formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
      orient: 'vertical',
      // x: 'left',
      top: '90%',
      data: ['支付宝', '现金', '微信', '其他']
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: ['30%', '70%'],
        data: payList
      }
    ]
  };
  chart.setOption(option);
  return chart;
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      onInit: initChart
    },
    startTime: '', //开始时间
    endTime: '', //结束时间
    brr: []
  },
  getDate: function(e) {
    var that = this;
    if (e.detail.id === 0) {
      that.setData({
        startTime: that.behindDay(7).split(' ')[0] + ' ' + '00:00:00',
        endTime: that.behindDay(1)
      })
    } else if (e.detail.id === 1) {
      that.setData({
        startTime: that.behindDay(15).split(' ')[0] + ' ' + '00:00:00',
        endTime: that.behindDay(1)
      })
    } else {
      that.setData({
        startTime: that.behindDay(30).split(' ')[0] + ' ' + '00:00:00',
        endTime: that.behindDay(1)
      })
    }
    that.getPaytypedata(that.data.startTime, that.data.endTime)
  },
  // 数据格式化
  formatter(date1) {
    let y = date1.getFullYear();
    let m = date1.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    let d = date1.getDate();
    d = d < 10 ? ('0' + d) : d;
    return y + '-' + m + '-' + d
  },
  // 前几天
  behindDay(n) {
    let that = this;
    let d = new Date()
    return that.formatter(new Date(new Date(that.formatter(d) + ' ' + '23:59:59').getTime() - 86400000 * n)) + ' ' + '23:59:59'
  },
  // 获取支付类型的数据
  getPaytypedata (startTime,endTime) {
    let that = this;
    let url = app.globalData.payTypeURL;
    let org_id = app.globalData.org_id;
    wx.request({
      url: url + '/v1/reports/sales_reports',
      method: 'POST',
      data: {
        endtime: endTime,
        group_id: org_id,
        page: 1,
        perpage: 1000,
        product_category: 0,
        search_content: "",
        starttime: startTime,
        store_id: 0
      },
      header: {
        'authorization': app.globalData.member_token_type + " " + app.globalData.member_access_token
      },
      success: function (res) {
        if (res.statusCode === 200) {
          let msg = res.data
          let alipay = 0
          let wechat = 0
          let cash = 0
          let other = 0
          let arr = []
          if (msg.length !== 0) {
            msg.map(item => {
              alipay += item.alipay
              wechat += item.wechat
              cash += item.cash
              other += item.other
            })
            arr = [
              { value: alipay, name: '支付宝' },
              { value: wechat, name: '微信' },
              { value: cash, name: '现金' },
              { value: other, name: '其他' }
            ]
            payList = arr
            that.data.brr = arr
            allData = alipay + wechat + cash + other
          }
          
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      startTime: that.behindDay(7).split(' ')[0] + ' ' + '00:00:00',
      endTime: that.behindDay(1)
    })
    that.getPaytypedata(that.data.startTime, that.data.endTime)
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