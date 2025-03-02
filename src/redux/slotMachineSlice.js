import { createSlice } from '@reduxjs/toolkit';
import { storeKeyEnum } from '../components/const';

const slotMachineSlice = createSlice({
  name: [storeKeyEnum.slotMachine],
  initialState: {
    backgroundColor: '#FFFFFF',
    lightboxColor: '#FFFFFF',
    lightBulbColor: '#FFFFFF',
    badgeText: '',
    machineLogo: null,
    selectedCoupons: [],
    emptyPrizeDisplayText: '',
    slots: [],
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
    emptyPrizeDisplayTextOnChange: (state, action) => {
      state.emptyPrizeDisplayText = action.payload
    },
  },
});

export const {
  backgroundColorOnChange,
  lightboxColorOnChange,
  lightBulbColorOnChange,
  badgeTextOnChange,
  machineLogoOnChange,
  selectedCouponsOnChange,
  updateCouponWeight,
  updateCouponQuantity,
  emptyPrizeDisplayTextOnChange
} = slotMachineSlice.actions;
export default slotMachineSlice.reducer;
