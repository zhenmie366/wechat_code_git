/// <reference path="./types/index.d.ts" />

interface Merchant {
  id: number
  name: string;
  rate: string;
  points: number;
  image: string;
  description: string;
}

interface HistoryItem {
  merchant: string;
  time: string;
  points: number;
}

interface UserData {
  points: number;
  history: HistoryItem[];
}

interface MerchantsData {
  [key: string]: Merchant;
}

interface IAppOption {
  globalData: {
    userData: UserData;
    merchants: Merchant[];
    points: number;
    history: HistoryItem[];
    selectedMerchant: Merchant
  };
  addPoints(points: number, merchantName: string): void;

  setSelectedMerchant(merchant: Merchant): void;
  getSelectedMerchant(): Merchant;
}