import React, { useRef } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import MachineHeadWithLogo from '../common/MachineHeadWithLogo';
import { storeKeyEnum } from '../../const';
import screen from './screen.json';
import Lottie from 'lottie-react';

export default function MachineBody() {
  const { machineLogo } = useSelector((state) => state[storeKeyEnum.gacha]);
  const lottieRef = useRef(null);
  return (
    <Body>
      <MachineHeadWithLogo img={machineLogo}></MachineHeadWithLogo>
      <GachaArea start="#B0B0B0" end="#505050">
        <Window>
          <WindowAnimationContainer>
            <Lottie
              lottieRef={lottieRef}
              autoplay={false}
              animationData={screen}
              loop={false}
              initialSegment={[30, 100]}
            />
          </WindowAnimationContainer>
        </Window>
        <InsertCoinsArea>
          <Circle>
            <Stroke />
          </Circle>
        </InsertCoinsArea>
        <ExchangeCoinsArea>
          <Eclipse bottom="4px" />
          <Eclipse bottom="14px" />
        </ExchangeCoinsArea>
        <Wheel src="/wheel.png" alt="wheel"></Wheel>
        <GachaCollectionArea></GachaCollectionArea>
      </GachaArea>
    </Body>
  );
}

const spin = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(90deg);
    }
`;
const WindowAnimationContainer = styled.div`
  position: absolute;
  scale: 1.321;
  top: -230px;
`;

const Body = styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

const GachaArea = styled.div`
  background: ${({ start, end }) =>
    `linear-gradient(to right, ${start}, ${end})`};
  width: 80%;
  height: 21rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const Window = styled.div`
  position: absolute;
  top: 20px;
  width: 90%;
  height: 11rem;
  background: white;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const appearInCollection = keyframes`
  0% {
    transform: translateY(-20px) rotate(50deg);
   
  }
  40% {
    transform: rotate(60deg);
  }
  70% {
    transform: translateX(-10px) rotate(10deg); 
  }
    100%{
    transform: translateX(-10px) rotate(10deg); 

}
`;

const DroppedBall = styled.img`
  width: 63px;
  height: 63px;
  position: absolute;
  bottom: 1px;
  left: 11px;
  animation: ${appearInCollection} 1s linear forwards;
`;

const InsertCoinsArea = styled.div`
  position: absolute;
  width: 40px;
  height: 40px;
  background-color: #805e49;
  bottom: 80px;
  left: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Circle = styled.div`
  width: 33px;
  height: 33px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Stroke = styled.div`
  width: 5px;
  height: 25px;
  background-color: black;
`;

const ExchangeCoinsArea = styled.div`
  position: absolute;
  width: 60px;
  height: 25px;
  background-color: #805e49;
  bottom: 38px;
  left: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Eclipse = styled.div`
  position: absolute;
  bottom: ${({ bottom }) => `${bottom}`};
  left: 5px;
  width: 50px;
  height: 6px;
  background-color: white;
  border-radius: 50%;
`;

const Wheel = styled.img.withConfig({
  shouldForwardProp: (prop) => prop !== 'isRunning',
})`
  position: absolute;
  border-radius: 50%;
  width: 100px;
  height: 100px;
  bottom: 25px;
  cursor: pointer;

  ${({ isRunning }) =>
    isRunning &&
    css`
      animation: ${spin} 1s linear forwards;
    `}
`;

const GachaCollectionArea = styled.div`
  position: absolute;
  background-color: black;
  width: 80px;
  height: 80px;
  bottom: 0px;
  right: 10px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-top: 7px solid #6c1d08;
  border-left: 3px solid #6c1d08;
  border-right: 3px solid #6c1d08;
  border-bottom: none;
`;
