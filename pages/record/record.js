// pages/record/record.js
Page({
  // 页面的初始数据
  data: {
    screenHeight: 0,  //屏幕的高度
    recordList: [
      { name: '芙蓉王活动抵扣券', code: '8958372918353', price: '2.00', date: '2018-10-11 15：21：14' },
      { name: '芙蓉王活动抵扣券', code: '8958372918353', price: '2.00', date: '2018-10-11 15：21：14' },
      { name: '芙蓉王活动抵扣券', code: '8958372918353', price: '2.00', date: '2018-10-11 15：21：14' },
      { name: '芙蓉王活动抵扣券', code: '8958372918353', price: '2.00', date: '2018-10-11 15：21：14' },
      { name: '芙蓉王活动抵扣券', code: '8958372918353', price: '2.00', date: '2018-10-11 15：21：14' },
      { name: '芙蓉王活动抵扣券', code: '8958372918353', price: '2.00', date: '2018-10-11 15：21：14' },
      { name: '芙蓉王活动抵扣券', code: '8958372918353', price: '2.00', date: '2018-10-11 15：21：14' },
      { name: '芙蓉王活动抵扣券', code: '8958372918353', price: '2.00', date: '2018-10-11 15：21：14' },
      { name: '芙蓉王活动抵扣券', code: '8958372918353', price: '2.00', date: '2018-10-11 15：21：14' },
      { name: '芙蓉王活动抵扣券', code: '8958372918353', price: '2.00', date: '2018-10-11 15：21：14' }
    ],  //核销列表
    selecttiemList: ['今天','昨天','近3天','近7天','本周','上周','本月','上月',' '], //时间选择
    selectId: 0,   //选中时间的id
    showMark: false,  //是否显示弹窗，默认不显示
    showTime: '今天'  //选择的时间
  },
  // 滚动条滚动到底部出发事件
  tolower (e) {
    console.log('滚动到底部')
  },
  // 点击选择自定义时间
  selectcustomTime () {
    this.setData({
      showMark: true
    })
  },
  // 选择时间
  selectTime (e) {
    console.log(e,'选择使劲按')
    this.setData({
      selectId: e.currentTarget.id
    })
    console.log(e.currentTarget.id,'选择时间')
  },
  // 点击取消时
  cancelSeclec () {
    this.setData({
      showMark: false
    })
  },
  // 点击确定时
  sureSelect () {
    var that = this;
    that.setData({
      showMark: false,
      showTime: that.data.selecttiemList[that.data.selectId]
    })
  },
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    var that = this;
    // 获取屏幕的高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          screenHeight: res.windowHeight - 80
        })
        console.log(res.windowHeight)
      }
    })
  }
})