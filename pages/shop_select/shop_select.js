// pages/shop_select/shop_select.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: [{
      id: 0,
      name: '全部店铺'
    }, {
      id: 1,
      name: '昆仑好客恒毅B1层体验店'
    }, {
      id: 2,
      name: '昆仑好客东直门店'
    }, {
      id: 3,
      name: '昆仑好客东直门店2'
    }, {
      id: 4,
      name: '昆仑好客鸟巢店'
    }],
    current: '全部店铺',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  handleFruitChange({ detail = {} }){
    console.log('detail>',detail);
    this.setData({
      current: detail.value
    });
  },

  /**
   * 获得店铺内容
   */

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})