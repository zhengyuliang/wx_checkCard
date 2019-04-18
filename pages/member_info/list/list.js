// pages/member_info/list/list.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false, //loading
    listData: [
      {
        name:'18319924003',
        price:"123.23",
        integral:123,
        card:12,
        list:[
          {
            name:'张三',
            sex: 0
          },
          {
            name: '小红',
            sex: 1
          }
        ]
      }
    ],
    searchLoading: false, // "上拉加载"的变量，默认false，隐藏
    searchLoadingComplete: false, //“没有数据”的变量，默认false，隐藏
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  /**
   * 查询内容
   */
  formSubmit:function (e) {
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let _that = this;
  },
  /**
   * 加载更多数据
   */
  loadingMoreScrollLower: function() {
    console.log("加载更多信息内容");
    let _that = this;
  },
  /**
   * 第一次加载内容
   */
  refreshScroollLower: function(){
    let _that = this;
  },
  /**
   * 请求后台数据内容
   */
  loadMore: function(){
    let _that = this;
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