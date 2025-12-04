// pages/share/share.js
const sharedapp = getApp()

Page({
  data: {
    selectedPlatform: {},
    merchant: {} as Merchant,
    platforms: [
      { id: 'wechat', name: '微信', icon: 'weixin', color: '#07C160' },
      { id: 'weibo', name: '微博', icon: 'weibo', color: '#E6162D' },
      { id: 'douyin', name: '抖音', icon: 'tiktok', color: '#000000' },
      { id: 'xiaohongshu', name: '小红书', icon: 'heart', color: '#FF2D55' },
      { id: 'whatsapp', name: 'WhatsApp', icon: 'whatsapp', color: '#25D366' },
      { id: 'instagram', name: 'Instagram', icon: 'instagram', color: '#E4405F' }
    ]
  },

  onLoad() {
    this.loadData()
  },

  onShow() {
    this.loadData()
  },

  // 加载数据（首次或刷新）
  loadData() {
    // 模拟接口请求
    setTimeout(() => {
      const mer = sharedapp.getSelectedMerchant()
      if (mer) {
        this.setData({merchant: mer})
        // console.log("share onLoad successfully" + JSON.stringify(mer))
        wx.setNavigationBarTitle({ title: `分享 ${mer.name}` })
      }
    }, 500);
  },

  selectPlatform(e: { currentTarget: { dataset: { platform: object } } }) {
    const platformId = e.currentTarget.dataset.platform
    this.setData({ selectedPlatform: platformId })
  },

  shareMerchant() {
    const { selectedPlatform, merchant } = this.data
    if (!selectedPlatform || selectedPlatform == {}) {
      wx.showToast({
        title: '请选择分享平台',
        icon: 'none'
      })
      return
    }

    if (!merchant) {
      wx.showToast({
        title: '商家信息错误',
        icon: 'none'
      })
      return
    }

    // 模拟分享成功
    this.handleShareSuccess(merchant)
  },

  handleShareSuccess(merchant: Merchant) {
    // 更新积分
    sharedapp.globalData.points += merchant.points
    
    // 添加历史记录
    sharedapp.globalData.history.push({
      merchant: merchant.name,
      date: new Date().toLocaleString(),
      points: merchant.points,
      platform: this.data.selectedPlatform
    })
    
    // 保存数据
    wx.setStorageSync('userData', {
      points: sharedapp.globalData.points,
      history: sharedapp.globalData.history
    })
    
    wx.showToast({
      title: `分享成功！+${merchant.points}积分`,
      icon: 'success',
      duration: 2000,
      success: () => {
        setTimeout(() => {
          wx.navigateBack()
        }, 2000)
      }
    })
  },

  backToMerchants() {
    wx.switchTab({
      url: `/pages/merchants/merchants`,
      success: function(res) {
        sharedapp.setSelectedMerchant()
      }
    })
  }
})
