// pages/member_c/member.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    member_num:56,
    member_price:123123,
    date_num:[],
    tabIndex:0, //选择的切换
    trade_price: 0,//交易额
    amount:0, //订单数
    credit_price: 0, //充值金额
    customer_price: 0 //客单价
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 选择tab内容
   */
  tabselect: function(e){
    let _that = this;
    console.log(e);
    let index = e.currentTarget.dataset.index;
    _that.setData({
      tabIndex: index
    })
    _that.getselectData();

  },
  /**
   * 请求数数据内容
   */
  getselectData: function(){
    let _that = this;
    //这里是后台请求数据内容
  },

  /**
   * 选择自定义内容
   */
  tbacustom: function(){
    let _that = this;
    wx.showToast({
      title: '暂无确定内容',
      icon: 'none',
      duration: 2000
    });
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