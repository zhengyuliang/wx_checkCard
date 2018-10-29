// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showAlert: false,
    showAlerts: false,
    alertType:1,
    alertArr:[]
  },
  clickbtn () {
    this.setData({
      showAlert: true,
      alertArr: ['确认']
    })
  },
  clickbtn2() {
    this.setData({
      showAlert: true,
      alertArr: ['取消']
    })
  },
  clickbtn3() {
    this.setData({
      showAlert: true,
      alertArr: ['取消','确认']
    })
  },
  clickInfo () {
    this.setData({
      showAlert: false
    })
  },
  cancelInfo () {
    this.setData({
      showAlert: true
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  }
})