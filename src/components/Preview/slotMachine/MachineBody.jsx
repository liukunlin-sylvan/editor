import React from 'react';
import { useSelector } from 'react-redux';
import { storeKeyEnum } from '../../const';
import MachineHeadWithLogo from '../common/MachineHeadWithLogo';
import MachineBodyWithLightBulbs from '../common/MachineBodyWithLightBulbs';
import styled from 'styled-components';
import Trigger from '../slotMachine/Trigger';
export default function MachineBody() {
  const { selectedCoupons, machineLogo, lightboxColor, lightBulbColor } =
    useSelector((state) => state[storeKeyEnum.slotMachine]);
  const slots = Array(3)
    .fill()
    .map(() =>
      Array(24)
        .fill()
        .flatMap(() => selectedCoupons)
    );

  return (
    <>
      <MachineHeadWithLogo
        img={machineLogo}
        storeKey={storeKeyEnum.slotMachine}
      />
      <MachineBodyWithLightBulbs
        lightboxColor={lightboxColor}
        storeKey={storeKeyEnum.slotMachine}
        lightBulbColor={lightBulbColor}
      >
        <SlotWrapper>
          {selectedCoupons.length === 3 &&
            slots.map((el, outerIndex) => {
              return (
                <Slot key={outerIndex}>
                  <SlotContentWrapper>
                    {el.map((item, innerIndex) => (
                      <div key={innerIndex}>
                        {item.img ? (
                          <CircularFrame>
                            <CircularImage src={item.img} />
                          </CircularFrame>
                        ) : (
                          <CouponText>{item.name}</CouponText>
                        )}
                      </div>
                    ))}
                  </SlotContentWrapper>
                </Slot>
              );
            })}
        </SlotWrapper>

        <Trigger />
      </MachineBodyWithLightBulbs>

      <HorizontalMessageBox>
        <span>BRAND NEW</span>
      </HorizontalMessageBox>
    </>
  );
}

const SlotWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const CouponText = styled.div`
  text-align: center;
  color: #fe3935;
  font-size: 20px;
  font-weight: 600;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
`;

const CircularFrame = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #b17053;
  background-color: white;
`;

const CircularImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: cover;
`;

const Slot = styled.div`
  width: 60px;
  height: 240px;
  background-color: #e8e3d0;
  border-radius: 15px;
  border: 2px solid #b17053;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  overflow: hidden;
`;

const SlotContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding: 15px 0px;
  gap: 20px;
`;

const HorizontalMessageBox = styled.div`
  background-color: #fee1a8;
  width: 350px;
  height: 80px;
  border: 5px solid #963a12;
  border-radius: 15px;
  font-size: 50px;
  color: #963a12;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
`;
