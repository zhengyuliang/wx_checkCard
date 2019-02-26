// pages/index_data/index_data.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopID:{},
    shopInfo:'',
    dataInfo:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _that = this;
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

  },
  shopSelect:function(){
    let _that = this;
    wx.navigateTo({
      url:'../shop_select/shop_select'
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
      }
    })

  }
})