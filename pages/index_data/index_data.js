// pages/index_data/index_data.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopID:{},
    shopInfo:'',
    shopList:[],//店铺列表内容
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
    let _that = this;
    wx.getStorage({
      key: 'shopInfo',
      success: function (res) {
        console.log(res);
        if(res){
          _that.setData({
            shopInfo: res.data
          })
        }else{
          _that.setData({
            shopInfo: res.data
          })
        }
        
       
      },
    })
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
        _that.setData({
          shopList:data.data
        })
        wx.setStorage({
          key: 'shopList',
          data: data.data,
          success: function (res) {
           console.log("存储店铺内容");
          }
        })
      }
    })

  }
})