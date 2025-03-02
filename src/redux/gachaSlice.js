import { storeKeyEnum } from '../components/const';
import { createSlice } from '@reduxjs/toolkit';

const gachaSlice = createSlice({
  name: storeKeyEnum.gacha,
  initialState: {
    backgroundColor: '#FFFFFF',
    machineLogo: null,
    selectedCoupons: [],
    emptyPrizeWeight: 0,
    emptyPrizeDisplayText: '',
  },
  reducers: {
    backgroundColorOnChange: (state, action) => {
      state.backgroundColor = action.payload;
    },
    machineLogoOnChange: (state, action) => {
      state.machineLogo = action.payload;
    },
    selectedCouponsOnChange: (state, action) => {
      state.selectedCoupons = action.payload;
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
  machineLogoOnChange,
  selectedCouponsOnChange,
  updateCouponWeight,
  updateCouponQuantity,
  emptyPrizeWeightOnChange,
  emptyPrizeDisplayTextOnChange
} = gachaSlice.actions;

export default gachaSlice.reducer;
