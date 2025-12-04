// pages/points/points.js
var pointsapp = getApp()

Page({
  data: {
    totalPoints: 0,
    history: []
  },

  onLoad() {
    this.loadUserData()
  },

  onShow() {
    this.loadUserData()
  },

  loadUserData() {
    this.setData({
      totalPoints: pointsapp.globalData.points,
      history: pointsapp.globalData.history
    })
  },

  onPullDownRefresh() {
    this.loadUserData()
    wx.stopPullDownRefresh()
  }
})
