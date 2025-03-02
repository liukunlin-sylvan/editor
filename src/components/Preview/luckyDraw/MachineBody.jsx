import { useSelector } from 'react-redux';
import React from 'react';
import styled from 'styled-components';
import MachineHeadWithLogo from '../common/MachineHeadWithLogo';
import { storeKeyEnum } from '../../const';
import MachineBodyWithLightBulbs from '../common/MachineBodyWithLightBulbs';

export default function MachineBody() {
  let {
    machineLogo,
    lightBulbColor,
    lightboxColor,
    selectedCoupons,
  } = useSelector((state) => state[storeKeyEnum.luckyDraw]);
  return (
    <>
      <MachineHeadWithLogo img={machineLogo}></MachineHeadWithLogo>
      <MachineBodyWithLightBulbs
        storeKey={storeKeyEnum.luckyDraw}
        lightboxColor={lightboxColor}
        lightBulbColor={lightBulbColor}
      >
        <CardGrid>
          {selectedCoupons?.length > 0 &&
            selectedCoupons.map((item, index) => (
              <Card key={index} className={index === 4 ? 'goBtn' : ''}>
                {item.img && (
                  <div>
                    <img
                      src={item.img}
                      className={item.isEmpty ? 'emptyImg' : 'cardImg'}
                    />
                  </div>
                )}
                <div className="itemName">
                  {item.isEmpty ? "" : item.name}
                </div>
              </Card>
            ))}
        </CardGrid>
      </MachineBodyWithLightBulbs>
    </>
  );
}

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  width: 85%;
  height: 85%;
  background-color: #52221e;
  padding: 4px 3px;
  border-radius: 10px;
`;

const Card = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'highlighted',
})`
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f9f3de;
  border: 9px solid ${(props) => (props.highlighted ? '#FCC979' : '#B6542D')};
  border-radius: 16px;
  font-weight: bold;
  color: brown;
  font-size: 16px;
  text-align: center;
  overflow: hidden;

  &.goBtn {
    background-color: #f30003;
    color: white;
    font-size: 20px;
    font-style: italic;
    cursor: pointer;
  }
  & .emptyImg {
    height: 80px;
  }

  & .cardImg {
    height: 40px;
  }
`;
