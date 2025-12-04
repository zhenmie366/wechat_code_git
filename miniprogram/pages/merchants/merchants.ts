var merchantApp = getApp()

Page({
  data: {
    merchants: [] as Merchant[],
    currentTab: 0,
    userPoints: 0, 
    userInfo: null,
    hasUserInfo: false
  },

  onLoad() {
    this.setData({
      userPoints: merchantApp.globalData.points, 
      merchants: merchantApp.globalData.merchants
    })
  },

  onShow() {
    this.setData({
      userPoints: merchantApp.globalData.points
    })
  },

  // 获取用户信息回调
  onGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      // 用户点击了允许授权
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
      
      // 可以将用户信息存储到全局或发送到服务器
      merchantApp.globalData.userInfo = e.detail.userInfo;
      
      wx.showToast({
        title: '授权成功',
        icon: 'success'
      });
    } else {
      // 用户点击了拒绝授权
      wx.showToast({
        title: '授权失败',
        icon: 'none'
      });
    }
  },

  switchTab(e: { currentTarget: { dataset: { index: number } } }) {
    const index = e.currentTarget.dataset.index
    console.log("merchant switchTab + " + index)
    this.setData({
      currentTab: index
    })
  },

  selectMerchant(e: { currentTarget: { dataset: { merchant: Merchant } } }) {
    const mer = e.currentTarget.dataset.merchant
    // console.log("selectMerchant class + " + JSON.stringify(mer))
    merchantApp.setSelectedMerchant(mer)
    wx.switchTab({
      url: `/pages/share/share`, 
      // success: function(res) {
      //   console.log("open navigated page successfully" + res)
      // }
    })
  },

  onPullDownRefresh() {
    wx.stopPullDownRefresh()
  }
})