// pages/record/record.js
Page({
  // 页面的初始数据
  data: {
    screenHeight: 0,  //屏幕的高度
    recordList: [],  //核销列表
    selecttiemList: ['今天','昨天','近3天','近7天','本周','上周','本月','上月'], //时间选择
    selectId: 0,   //选中时间的id
    showMark: false,  //是否显示弹窗，默认不显示
    showTime: '今天',  //选择的时间
    maskType: "hide", //"show", "hide" show为显示，默认为hide mask层的显示及隐藏
    showType: "hide" //"show","hide" show为显示，默认为hide
  },
  // 滚动条滚动到底部出发事件
  tolower (e) {
    console.log('滚动到底部')
  },
  // 点击选择自定义时间
  selectcustomTime () {
    this.setData({
      maskType: "show",
      showType: "show"
    })
  },
  // 选择时间
  selectTime (e) {
    console.log(e,'选择使劲按')
    this.setData({
      selectId: e.currentTarget.dataset.index
    })
    console.log(e.currentTarget.dataset.index,'选择时间')
  },
  // 点击取消时
  cancelSeclec () {
    this.setData({
      maskType: "hide",
      showType: "hide"
    })
  },
  // 点击确定时
  sureSelect () {
    var that = this;
    that.setData({
      maskType: "hide",
      showType: "hide",
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
          screenHeight: res.windowHeight - 50
        })
        console.log(res.windowHeight)
      }
    });
    wx.getStorage({
      key: 'record',
      success: function(res) {
        let data = res.data;
        that.setData({
          recordList:data
        })
      },
    })
  }
})