import { createSlice } from '@reduxjs/toolkit';
import { storeKeyEnum } from '../components/const';
const luckyDrawSlice = createSlice({
  name: [storeKeyEnum.luckyDraw],
  initialState: {
    backgroundColor: '#FFFFFF',
    lightboxColor: '#FFFFFF',
    lightBulbColor: '#FFFFFF',
    machineLogo: null,
    emptyLogo: null,
    selectedCoupons: [],
    luckyDrawItems: [],
    emptyPrizeWeight: 0,
    emptyPrizeDisplayText: ''
  },
  reducers: {
    backgroundColorOnChange: (state, action) => {
      state.backgroundColor = action.payload;
    },
    lightboxColorOnChange: (state, action) => {
      state.lightboxColor = action.payload;
    },
    lightBulbColorOnChange: (state, action) => {
      state.lightBulbColor = action.payload;
    },
    badgeTextOnChange: (state, action) => {
      state.badgeText = action.payload;
    },
    machineLogoOnChange: (state, action) => {
      state.machineLogo = action.payload;
    },
    emptyLogoOnChange: (state, action) => {
      state.emptyLogo = action.payload;
    },
    selectedCouponsOnChange: (state, action) => {
      state.selectedCoupons = action.payload;
    },
    setLuckyDrawItems: (state, action) => {
      state.luckyDrawItems = action.payload;
    },
    updateCouponWeight: (state, action) => {
      const { couponId, weight } = action.payload;
      state.selectedCoupons = state.selectedCoupons.map((coupon) =>
        coupon.id === couponId ? { ...coupon, weight } : coupon
      );
    },
    updateCouponQuantity: (state, action) => {
      const { couponId, quantity } = action.payload;
      state.selectedCoupons = state.selectedCoupons.map((coupon) =>
        coupon.id === couponId ? { ...coupon, quantity } : coupon
      );
    },
    emptyPrizeWeightOnChange: (state, action) => {
      state.emptyPrizeWeight = action.payload;
    },
    emptyPrizeDisplayTextOnChange: (state, action) => {
      state.emptyPrizeDisplayText = action.payload
    },
  },
});

export const {
  backgroundColorOnChange,
  lightboxColorOnChange,
  lightBulbColorOnChange,
  machineLogoOnChange,
  selectedCouponsOnChange,
  setLuckyDrawItems,
  emptyLogoOnChange,
  updateCouponWeight,
  updateCouponQuantity,
  emptyPrizeWeightOnChange,
  emptyPrizeDisplayTextOnChange
} = luckyDrawSlice.actions;
export default luckyDrawSlice.reducer;
