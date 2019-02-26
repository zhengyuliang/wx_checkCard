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
    showNodata: false,  //没有数据时显示
    showLoadtext: true, //是否显示加载更多，默认显示
    startTime: '', //开始时间
    endTime: '', //结束时间
    page: 1,
    arr: [],
    productInfoList: [
      { name: '商品名称1', rightInfo: '$21000.00', propertion: 50 },
      { name: '商品名称2', rightInfo: '$21000.00', propertion: 30 },

    ] //商品信息
  },
  // 切换nav展示不同的数据
  /**
   * 生命周期函数--监听页面加载
   */
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
  behindDay (n) {
    let that = this;
    let d = new Date()
    return that.formatter(new Date(new Date(that.formatter(d) + ' ' + '23:59:59').getTime() - 86400000 * n)) + ' ' + '23:59:59'
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      startTime: that.behindDay(7).split(' ')[0] + ' ' + '00:00:00',
      endTime: that.behindDay(1)
    })
    // 获取热销商品数据
    that.getHotprodata(that.data.startTime,that.data.endTime,that.data.changTag)
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenHeight: res.windowHeight - 145
        })
      }
    })
  },
  changeTags(e) {
    var that = this;
    var type = e.currentTarget.dataset.type;
    that.data.arr = []
    that.setData({
      changTag: +type
    })
    that.getHotprodata(that.data.startTime, that.data.endTime, that.data.changTag)
  },
  // 获取热销商品数据
  getHotprodata (startTime,endTime,type) {
    var that = this
    that.data.arr = []
    wx.showLoading({
      mask: true
    })
      let params = {
        "start_time": startTime,
        "end_time": endTime,
        "store_id": 0,
        "ranking_by": type,  //1销售金额 2销售数量 3订单量
        "is_desc": 1,  //1热销 0滞销
        "org_id": 2, //组织id
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
        success: function (res) {
         
          if (res.statusCode === 200) {
            wx.hideLoading({});
            let msg = JSON.parse(res.data)
            // let arr = []
            let max = 0
            if (msg[1]) {
              // 有数据
              for (let i in msg) {
                
                if (that.data.changTag === 1) {
                  max = msg[1].amount
                  msg[i].propertion = msg[i].amount /max * 100 + '%'
                
                  that.data.arr.push({
                    name: msg[i].name,
                    rightInfo: '￥'+msg[i].amount,
                    propertion: msg[i].propertion
                  })
                } else if (that.data.changTag === 2) {
                  max = msg[1].count
                  msg[i].propertion = msg[i].count / max * 100 + '%'
                  that.data.arr.push({
                    name: msg[i].name,
                    rightInfo: msg[i].count + '件',
                    propertion: msg[i].propertion
                  })
                } else {
                  max = msg[1].order_number
                  msg[i].propertion = msg[i].order_number / max * 100 + '%'
                  that.data.arr.push({
                    name: msg[i].name,
                    rightInfo: msg[i].order_number + '次',
                    propertion: msg[i].propertion
                  })
                }
              }
              // if (that.data.arr.length <= 9) {
                that.setData({
                  productInfoList: that.data.arr
                })
              // } else {
                // that.setData({
                //   productInfoList: that.data.arr.slice(0, 9)
                // })
                // that.data.productInfoList = that.data.arr.slice(0, 9)
                // 
              // }
               
            } else {
              // 没有数据
              that.setData({
                showNodata: true,
                showLoadtext: false
              })
            }
          }
        },
        fail: function (err) { }
      })
  },
  // 加载更多信息
  bindscrolltolowers () {
    var that = this;
  
    // that.data.page++
    // that.data.productInfoList = that.data.arr.slice((that.data.page - 1) * 9, that.data.page * 9)
  },
  loadMoredata () {
    var that = this;
    let pages = 1
    that.data.productInfoList.concat(that.data.arr.slice((that.data.page - 1) * 9, that.data.page * 9))
    that.data.page++
  },
  // 选择时间
  getDate (e) {
    var that = this
    that.data.arr = []
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
    that.getHotprodata(that.data.startTime, that.data.endTime, that.data.changTag)
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