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
    current: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
     let _that = this;
     wx.getStorage({
       key: 'shopInfo',
       success: function(res) {
         console.log(res);
         _that.setData({
           current:res.data.name
         })
       },
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  handleFruitChange({ detail = {} }){
    let _that = this;
    console.log('detail>',detail);
    _that.setData({
      current: detail.value
    });
    _that.shopSelectData(detail.value);
  },

  /**
   * 获取店铺列表信息
   */
  getShopListInfo:function(){
    let _that = this;
    
  },

  /**
   * 获得店铺内容
   */
  shopSelectData:function(data){
    let _that = this;
    let dataR = _that.data.shopList.filter(item => {
      return item.name = data;
    })
    wx.setStorage({
      key: 'shopInfo',
      data: dataR[0],
      success:function(res){
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },

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