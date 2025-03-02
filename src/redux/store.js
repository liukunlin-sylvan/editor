// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import { storeKeyEnum } from '../components/const';

import slotMachineReducer from './slotMachineSlice';
import gachaReducer from './gachaSlice';
import luckyDrawReducer from './luckyDrawSlice';
const store = configureStore({
  reducer: {
    [storeKeyEnum.gacha]: gachaReducer,
    [storeKeyEnum.luckyDraw]: luckyDrawReducer,
    [storeKeyEnum.slotMachine]: slotMachineReducer,
  },
});

export default store;
