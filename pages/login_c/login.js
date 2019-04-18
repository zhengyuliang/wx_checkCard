// pages/login_c/login.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    codeText:'获取验证码',
    codeLoading: false, //判断是否能重新获取验证码
    loading: false, //判断是否是登录中
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  formSubmit:function(e){
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    let data = e.detail.value;
    if(data.phone === ''){
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if(data.phone.length < 11){
      wx.showToast({
        title: '输入的手机号不正确',
        icon: 'none',
        duration: 2000
      });
      return;
    }
    if(data.code === ''){
      wx.showToast({
        title: '请输入验证码',
        icon: 'none',
        duration: 2000
      })
      return;
    }

  },

  /**
   * 获取验证码
   * 请求后台数据内容
   */
  getCode:function(e){
    let _that = this;
    if(_that.data.codeLoading) return;
    let time = 60;
    let promise = new Promise((resolve, reject) => {
      let setTimer = setInterval(() => {
        time--;
        _that.setData({
          codeText: time + 'S后重新获取',
          codeLoading: true
        })
        if(time <= 0){
          _that.setData({
            codeText: '获取验证码',
            codeLoading: false
          })
          resolve(setTimer);
        }
      },1000)
    })
    promise.then((setTimer) => {
      clearInterval(setTimer);
    })
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