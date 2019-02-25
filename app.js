//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: '',
    /**测试环境 */
    shopURL: 'http://test-swagger.esmart365.com:5015', //店铺 Contact 刘益
    org_id: 3, //组织ID

    /**生产环境 */
    // shopURL: '', //店铺 Contact 刘益
    // org_id: 3, //组织ID

    member_access_token: "YsfrkQGy21BCIvP2aLlqVZjHz9lpLaDfsKldpUmFGEsXRhx4ycd5uOBPS42cm3Yu",
    member_token_type: "member",
    access_token: "eyJjbGllbnRfaWQiOiAiNDY1Zjg3YTkxYmZiOWRlMzY5ZGZiMzA2NWJjMDkyOGUzMzc0MjBmOCIsICJzYWx0IjogMC42ODYzMDMxMTk5MTM3MDE5LCAiZXhwaXJlcyI6IDE1MTU0NzE1NjQuMjEwMDc5ff5v3mH4TbPQ3ZW-AVaIUFQ=",
    token_type: "repository",
  }
})