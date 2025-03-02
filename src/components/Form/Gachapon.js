import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  backgroundColorOnChange,
  machineLogoOnChange,
  selectedCouponsOnChange,
  updateCouponWeight,
  updateCouponQuantity,
  emptyPrizeWeightOnChange,
  emptyPrizeDisplayTextOnChange
} from '../../redux/gachaSlice';
import ColorPicker from '../../editorComponent/user_components/setting_components/ColorPicker';
import ImageUploader from '../../editorComponent/user_components/setting_components/ImageUploader';
import axios from 'axios';
import { storeKeyEnum } from '../const';
import CouponRow from './CouponRow';
import { imageUpload, createGame } from './helper';
import { CreateGameButton, CouponsContainer, Container, ColorPickerWrapper } from './common/StyleComponent';

export default function Gachapon() {
  const [coupons, setCoupons] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/coupon`);
      setCoupons(data.coupons);
    }
    fetchData();
  }, []);

  const {
    backgroundColor,
    lightboxColor,
    lightBulbColor,
    machineLogo,
    selectedCoupons,
    emptyPrizeWeight,
    emptyPrizeDisplayText,
  } = useSelector((state) => state[storeKeyEnum.gacha]);
  const dispatch = useDispatch();

  const toggleCouponSelection = (coupon) => {
    const isSelected = selectedCoupons.map((el) => el.id).includes(coupon.id);
    const updatedSelections = isSelected
      ? selectedCoupons.filter(({ id }) => id !== coupon.id)
      : [...selectedCoupons, coupon];
    dispatch(selectedCouponsOnChange(updatedSelections));
  };


  const payload = {
    value: {
      backgroundColor,
      lightboxColor,
      lightBulbColor,
      machineLogo,
      gameType: storeKeyEnum.gacha,
      emptyPrizeWeight,
      emptyPrizeDisplayText,
    },
    selectedCoupons,
    restaurantId: 1,
    preview: false,
  };

  const handleWeightChange = (couponId, newWeight) => {
    dispatch(updateCouponWeight({ couponId, weight: newWeight }));
  };

  const handleQuantityChange = (couponId, newQuantity) => {
    dispatch(updateCouponQuantity({ couponId, quantity: newQuantity }));
  };

  return (
    <Container>
      <div className="flex gap-[50px]">
        <div className="flex flex-col gap-[30px] items-end">
          <ColorPickerWrapper>
            <div className="text-xs">Background Color</div>
            <ColorPicker
              color={backgroundColor}
              onChange={(color) => dispatch(backgroundColorOnChange(color))}
            />
          </ColorPickerWrapper>
        </div>
      </div>
      <ImageUploader
        image={machineLogo}
        imageName="logo"
        onImageChange={(e) => imageUpload(e, (imageUrl) => dispatch(machineLogoOnChange(imageUrl)))}
      />

      <div className="flex gap-[50px] text-xs items-center">
        <div className="w-[160px]">Empty Prize Weight (Each)</div>
        <input
          type="number"
          value={emptyPrizeWeight}
          onChange={(e) => dispatch(emptyPrizeWeightOnChange(e.target.value))}
          className="w-[70px] h-[30px] border border-gray-300 rounded-md p-2"
          min={0}
        />
      </div>
      <div className="flex gap-[50px] text-xs items-center">
        <div className="w-[160px]">Empty Prize Display Text</div>
        <textarea
          placeholder="Empty Prize Display Text"
          type="text"
          muitiline="true"
          value={emptyPrizeDisplayText}
          onChange={(e) =>
            dispatch(emptyPrizeDisplayTextOnChange(e.target.value))
          }
          className="w-[300px] h-[100px] border border-gray-300 rounded-md p-2"
        />
      </div>
      <h1>Select Coupons</h1>
      <CouponsContainer>
        {coupons?.length > 0 &&
          coupons.map((coupon) => {
            const isSelected = selectedCoupons.some(
              (el) => el.id === coupon.id
            );
            const selectedCoupon = selectedCoupons.find(
              (el) => el.id === coupon.id
            );

            return (
              <CouponRow
                key={coupon.id}
                toggleCouponSelection={toggleCouponSelection}
                isSelected={isSelected}
                selectedCoupon={selectedCoupon}
                coupon={coupon}
                handleWeightChange={handleWeightChange}
                handleQuantityChange={handleQuantityChange}
              />

            );
          })}
      </CouponsContainer>
      <CreateGameButton onClick={() => createGame(payload, storeKeyEnum.gacha)}>Creat Game</CreateGameButton>
    </Container>
  );
}

