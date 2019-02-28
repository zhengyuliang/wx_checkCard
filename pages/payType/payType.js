// pages/hotCategory/hotCategory.js
import * as echarts from '../../ec-canvas/echarts';
const app = getApp()
let payList = []
let allData = 0
var Chart = null

Page({

  /**
   * 页面的初始数据
   */
  data: {
    ec: {
      // onInit: initChart
      lazyLoad: true // 延迟加载
    },
    startTime: '', //开始时间
    endTime: '', //结束时间
    nodata: false,
    storeId: '' //店铺id
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
    console.log(payList,'获取的接口数据')
    that.getPaytypedata(that.data.startTime, that.data.endTime,that.data.storeId)
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
  getPaytypedata (startTime,endTime,storeID) {
    payList = []
    let that = this;
    let url = app.globalData.payTypeURL;
    let org_id = app.globalData.org_id;
    wx.showLoading({
      title: '数据加载中',
      mask: true
    })
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
        store_id: storeID
      },
      header: {
        'authorization': app.globalData.member_token_type + " " + app.globalData.member_access_token
      },
      success: function (res) {
        if (res.statusCode === 200) {
          wx.hideLoading()
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
              { value: parseFloat(alipay).toFixed(2), name: '支付宝' },
              { value: parseFloat(wechat).toFixed(2), name: '微信' },
              { value: parseFloat(cash).toFixed(2), name: '现金' },
              { value: parseFloat(other).toFixed(2), name: '其他' }
            ]
            payList = arr
            that.data.brr = arr
            allData = parseFloat(alipay + wechat + cash + other).toFixed(2)
            // if (!Chart) {
              that.init_echarts(); //初始化图表
            // } else {
              // that.setOption(Chart); //更新数据
            // }
          } else {
            that.setData({
              nodata: true
            })
          }
          
        }
      },
      fail: function () {
        wx.hideLoading({});
        wx.getNetworkType({
          success(res) {
            const networkType = res.networkType;
            if (networkType === 'none') {
              wx.showToast({
                title: '网络连接超时，请检查网络',
                icon: 'none',
                duration: 2000
              });
            }
          }
        });
      }
    })
  },
  init_echarts: function () {
    this.echartsComponnet.init((canvas, width, height) => {
      // 初始化图表
      Chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      // Chart.setOption(this.getOption());
      this.setOption(Chart);
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return Chart;
    });

  },
  setOption: function (Chart) {
    Chart.clear();  // 清除
    Chart.setOption(this.getOption());  //获取新数据
  },
  getOption: function () {
    // 指定图表的配置项和数据
    var option = {
      color: ['#0090FF', '#00C5C3', '#00C64C', '#FFCB00'],
      tooltip: {
        trigger: 'item',
        confine: true,
        position: ['50%', '50%']
      },
      legend: {
        orient: 'vertical',
        // x: 'left',
        top: '90%',
        data: ['支付宝', '现金', '微信', '其他']
      },
      series: [
        {
          name: '类型',
          type: 'pie',
          radius: ['0%', '55%'],
          data: payList,
          label: {
            fontSize: 14,
            formatter: '{b}:{c}({d}%)'
          },
          labelLine: {
            length2: 2
          }
        }
      ]
    };
    return option;

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
    that.echartsComponnet = this.selectComponent('#mychart-dom-line')
    wx.getStorage({
      key: "shopInfo",
      success: function (res) {
        if (res.data) {
          that.setData({
            storeId: res.data.shop_id
          })
          that.getPaytypedata(that.data.startTime, that.data.endTime,res.data.shop_id)
        }
      }
    })
    
  } 
})