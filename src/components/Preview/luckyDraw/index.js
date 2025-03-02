import React, { useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import MachineBody from '../luckyDraw/MachineBody';
import { useSelector, useDispatch } from 'react-redux';
import GradientBackground from '../common/GradientBackground';
import { storeKeyEnum } from '../../const';
export default function LuckyDraw() {
  const backgroundColor = useSelector(
    (state) => state[storeKeyEnum.luckyDraw].backgroundColor
  );
  if (!backgroundColor) {
    return null;
  }

  return (
    <GradientBackground
      start={backgroundColor}
      end={backgroundColor}
      isRadial={false}
      storeKey={storeKeyEnum.luckyDraw}
    >
      <Container>
        <GameTitle>Lucky Draw</GameTitle>
        <MachineBody />
        <Footer>
          <MovingBanner>
            <BannerText>
              NEW BRAND NEW BRAND NEW BRAND NEW BRAND NEW BRAND
            </BannerText>
          </MovingBanner>
        </Footer>
      </Container>
    </GradientBackground>
  );
}

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  max-width: 400px;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0px 0px 0px;
`;

const GameTitle = styled.div`
  font-weight: 600;
  font-size: 1rem;
  color: white;
  flex: 1;
`;

const Footer = styled.div`
  flex: 1;
  display: flex;
  padding-top: 30px;
  align-items: start;
  width: 100%;
`;

const MovingBanner = styled.div`
  color: white;
  background-color: orange;
  width: 100%;
  height: 30px;
  font-size: 25px;
  overflow: hidden;
  position: relative;
`;

const moveBanner = keyframes`
  0% {
    transform: translateX(100%); 
  }
  100% {
    transform: translateX(-100%);
  }
`;

const BannerText = styled.div`
  display: inline-block;
  position: absolute;
  white-space: nowrap;
  animation: ${moveBanner} 10s linear infinite;
  width: max-content;
`;
