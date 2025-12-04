// app.ts

App<IAppOption>({
  globalData: {
    // 用户数据（从本地存储初始化）
    userData: {} as UserData,
    points: 0,
    merchants: [
      {
        id: 1,
        name: "时尚服装店",
        rate: "最高 8% 返利",
        points: 5,
        image: "https://images.unsplash.com/photo-1566206091558-7f218b696731?w=400&h=300&fit=crop",
        description: "精选时尚服装，品质保证，价格实惠"
      },
      {
        id: 2,
        name: "精品咖啡馆",
        rate: "最高 6% 返利",
        points: 4,
        image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=400&h=300&fit=crop",
        description: "优质咖啡豆，手工烘焙，香醇可口"
      },
      {
        id: 3,
        name: "独立书店",
        rate: "最高 7% 返利",
        points: 6,
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
        description: "精选图书，文创产品，阅读空间"
      },
      {
        id: 4,
        name: "手工艺品店",
        rate: "最高 5% 返利",
        points: 7,
        image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
        description: "手工制作，独特设计，精美礼品"
      },
      {
        id: 5,
        name: "有机食品店",
        rate: "最高 9% 返利",
        points: 8,
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop",
        description: "有机认证，健康食品，新鲜直达"
      },
      {
        id: 6,
        name: "花艺工作室",
        rate: "最高 6% 返利",
        points: 5,
        image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?w=400&h=300&fit=crop",
        description: "鲜花定制，花艺设计，节日花束"
      }
    ],
    selectedMerchant: {} as Merchant,
    history: []
  },
  onLaunch() {
    // 初始化用户数据（从本地存储加载）
    const localData = wx.getStorageSync("userData");
    if (localData) {
      this.globalData.userData = localData;
    } else {
      // 无数据时初始化默认值
      this.globalData.userData = {
        points: 0,
        history: []
      };
      wx.setStorageSync("userData", this.globalData.userData);
    }
  },

  // 全局方法：增加积分
  addPoints(points: number, merchantName: string) {
    const userData = this.globalData.userData;
    userData.points += points;
    userData.history.unshift({
      time: new Date().toLocaleString(),
      merchant: merchantName,
      points: points
    });
    // 保存到本地存储
    wx.setStorageSync("userData", userData);
    // 更新全局数据
    this.globalData.userData = userData;
  },

  setSelectedMerchant(merchant: any) {
    this.globalData.selectedMerchant = merchant;
  },
  getSelectedMerchant() {
    return this.globalData.selectedMerchant;
  }
})