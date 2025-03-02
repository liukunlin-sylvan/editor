import React from 'react';
import styled, { keyframes, css } from 'styled-components';
import { useSelector } from 'react-redux';
import { lighten } from 'polished';

export default function DecorationBalls({ storeKey, lightBulbColor }) {
  const balls = [...Array(41)];
  const { isRunning, isFinished } = useSelector((state) => state[storeKey]);
  const lightBulbColorAlt = lighten(0.3, lightBulbColor); // Adjust percentage as needed

  return (
    <>
      <BallTrackTop>
        {balls.slice(0, 11).map((_, index) => (
          <Ball
            key={index}
            index={index}
            isRunning={isRunning}
            isFinished={isFinished}
            lightBulbColor={lightBulbColor}
            lightBulbColorAlt={lightBulbColorAlt}
          />
        ))}
      </BallTrackTop>
      <BallTrackLeft>
        {balls.slice(11, 21).map((_, index) => (
          <Ball
            key={index + 11}
            index={index + 11}
            isRunning={isRunning}
            isFinished={isFinished}
            lightBulbColor={lightBulbColor}
            lightBulbColorAlt={lightBulbColorAlt}
          />
        ))}
      </BallTrackLeft>
      <BallTrackRight>
        {balls.slice(21, 30).map((_, index) => (
          <Ball
            key={index + 21}
            index={index + 21}
            isRunning={isRunning}
            isFinished={isFinished}
            lightBulbColor={lightBulbColor}
            lightBulbColorAlt={lightBulbColorAlt}
          />
        ))}
      </BallTrackRight>
      <BallTrackBottom>
        {balls.slice(31, 41).map((_, index) => (
          <Ball
            key={index + 31}
            index={index + 31}
            isRunning={isRunning}
            isFinished={isFinished}
            lightBulbColor={lightBulbColor}
            lightBulbColorAlt={lightBulbColorAlt}
          />
        ))}
      </BallTrackBottom>
    </>
  );
}

const changeColor = keyframes`
    0%, 100% {
        background-color: #FCE8C4;
    }
    50% {
        background-color: #FAC980;
    }
`;

const Ball = styled.div.withConfig({
  shouldForwardProp: (prop) =>
    prop !== 'isRunning' &&
    prop !== 'isFinished' &&
    prop !== 'lightBulbColor' &&
    prop !== 'lightBulbColorAlt' &&
    prop !== 'index' &&
    prop !== 'lightBulbColorAlt',
})`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background-color: ${(props) =>
    props.index % 2 === 0 ? props.lightBulbColor : props.lightBulbColorAlt};
  animation: ${(props) => css`
      ${keyframes`
                0%, 100% {
                    background-color: ${props.lightBulbColor};
                }
                50% {
                    background-color: ${props.lightBulbColorAlt};
                }
            `}
    `}
    ${(props) => (props.isFinished ? '0.5s' : props.isRunning ? '1s' : '3s')}
    infinite steps(1);
  animation-delay: ${(props) =>
    props.isFinished ? '0s' : `${(props.index % 2) * 1.5}s`};
`;
const BallTrackTop = styled.div`
  top: 8px;
  left: 8px;
  position: absolute;
  width: 370px;
  height: 30px;
  display: flex;
  gap: 13px;
`;

const BallTrackLeft = styled.div`
  top: 40px;
  left: 8px;
  position: absolute;
  width: 30px;
  height: 370px;
  display: flex;
  flex-direction: column;
  gap: 13px;
  padding-top: 3px;
`;

const BallTrackBottom = styled.div`
  bottom: 0px;
  left: 43px;
  position: absolute;
  width: 410px;
  height: 30px;
  display: flex;
  gap: 12.5px;
`;

const BallTrackRight = styled.div`
  top: 0px;
  right: 3px;
  position: absolute;
  width: 30px;
  height: 370px;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding-top: 40px;
`;
