// pages/index_data/index_data.js
import * as echarts from '../../ec-canvas/echarts';
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopID:{},
    shopInfo:'',
    shopList:[],//店铺列表内容
    dataInfo:'',
    firstData: true, //判断是否是第一次加载 
    propArray: [{"id": 0,"text": "近7天"}, {"id": 1,"text": "近15天"}, {"id": 2,"text": "近30天"}],
    selectShow:false,//判断隐藏
    tiemText:'',
    animationData:{},
    todaySales:{
      dailySales:"12.00",
      dailySalesTac:"10.02",
      order_quantity:1232
    },
    ec:{
      lazyLoad: true
    } //图表走势
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _that = this;
    _that.setData({
      tiemText:_that.data.propArray[0]
    })
    this.ecComponent = this.selectComponent('#mychart-dom-line');
    _that.getShopListData();
    
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
    let _that = this;
    if (!_that.data.firstData){
      wx.getStorage({
        key: 'shopInfo',
        success: function (res) {
          console.log(res);
          _that.setData({
            shopInfo: res.data
          })
        }
      })
    }
    _that.init();
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  shopSelect:function(){
    let _that = this;
    wx.navigateTo({
      url:'../shop_select/shop_select'
    })
  },
  // 点击进入热销商品
  gotoHotprorank(){
    let _that = this;
    wx.navigateTo({
      url: '../hotCategory/hotCategory'
    })
  },
  // 点击进入支付类型占比页
  gotoPaytype () {
    let _that = this;
    wx.navigateTo({
      url: '../payType/payType'
    })
  },
  // 点击进入滞销商品排行
  gosalable () {
    let _that = this;
    wx.navigateTo({
      url: '../unsalable/unsalable'
    })
  },
  /**
   * 获取店铺列表
   */
  getShopListData:function(){
    let _that = this;
    let url = app.globalData.shopURL;
    let org_id = app.globalData.org_id;
    wx.request({
      url: url + '/v1/shop/store/list',
      method:'GET',
      data:{
        org_id: org_id
      },
      header:{
        'authorization': app.globalData.member_token_type + " " + app.globalData.member_access_token
      },
      success:function(msg){
        console.log('msg>>>>>',msg);
        let data = msg.data;
        wx.setStorage({
          key: 'shopList',
          data: data.data,
          success: function (res) {
           console.log("存储店铺内容");
            _that.setData({
              shopList: data.data,
              shopInfo: data.data[0],
              firstData: false
            })
          }
        })
      }
    })
  },
  // 时间弹窗
  selectToggle:function(){
    let _that = this;
    let show = _that.data.selectShow;
    let animation = wx.createAnimation({
      timingFunction: "ease"
    })
    _that.animation = animation;
    if (show) {
      animation.rotate(0).step();
      _that.setData({
        animationData: animation.export()
      })
    } else {
      animation.rotate(180).step();
      _that.setData({
        animationData: animation.export()
      })
    }
    _that.setData({
      selectShow:!show
    })
  },
  // 选择弹窗
  setText:function(e){
    let _that = this;
    let show = _that.data.selectShow;
    _that.animation.rotate(0).step();
    let setletText = e.currentTarget.dataset.index;
    _that.setData({
      tiemText: setletText,
      selectShow: !show,
      animationData: this.animation.export()
    })
  },
  /**
   * 获取今日销售额
   */
  getSalesTodyData:function(){
    let _that = this;

  },
  /**
   * 获取本店近期销售趋势
   */
  getSalesTrendData:function(){
    let _that = this;
  },
  /**
   * 初始化图表
   */
  init:function(){
    // wx.showLoading({
    //   title: '加载中',
    // });
    this.ecComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      // this.chart = chart;
      this.setOption(chart);
      this.setData({
        isLoaded: true
      });

      return chart;
    })
    
  },
  setOption: function (chart) {
    chart.clear();  // 清除
    chart.setOption(this.getOption());  //获取新数据
  },
  getOption: function () {
    // 指定图表的配置项和数据
    let option = {
      // title: {
      //   text: '未来一周气温变化',
      //   subtext: '纯属虚构'
      // },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['销售额含税(单位:元)', '购买次数(单位:次)']
      },
      // toolbox: {
      //   show: true,
      //   feature: {
      //     mark: { show: true },
      //     dataView: { show: true, readOnly: false },
      //     magicType: { show: true, type: ['line', 'bar'] },
      //     restore: { show: true },
      //     saveAsImage: { show: true }
      //   }
      // },
      calculable: true,
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: ['2月1日', '2月2日', '2月3日', '2月4日', '2月5日', '2月6日', '2月7日']
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        }
      ],
      series: [
        {
          name: '销售额含税(单位:元)',
          type: 'line',
          data: [1001, 1451, 15, 1003, 112, 13, 190],
          // markPoint: {
          //   data: [
          //     { type: 'max', name: '最大值' },
          //     { type: 'min', name: '最小值' }
          //   ]
          // },
          // markLine: {
          //   data: [
          //     { type: 'average', name: '平均值' }
          //   ]
          // }
        },
        {
          name: '购买次数(单位:次)',
          type: 'line',
          data: [1, 56, 2, 5, 3, 10, 56],
          // markPoint: {
          //   data: [
          //     { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
          //   ]
          // },
          // markLine: {
          //   data: [
          //     { type: 'average', name: '平均值' }
          //   ]
          // }
        }
      ]
    };
    return option;
  },
})