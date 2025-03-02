import React from 'react';

import HomeIcon from './SvgWrapper/HomeIcon';
import GameIcon from './SvgWrapper/GameIcon';
import AwardIcon from './SvgWrapper/AwardIcon';
import CrditCardIcon from './SvgWrapper/CreditCardIcon';
import styled from 'styled-components';

export default function NavBar({ selected, handleClick }) {
  return (
    <Container>
      <NavItem onClick={() => handleClick(0)} selected={selected === 0}>
        <ImageWrapper>
          <HomeIcon fill={selected === 0 ? 'white' : 'grey'} />
        </ImageWrapper>
      </NavItem>
      <NavItem onClick={() => handleClick(1)} selected={selected === 1}>
        <ImageWrapper>
          <GameIcon fill={selected === 1 ? 'white' : 'grey'} />
        </ImageWrapper>
      </NavItem>
      <NavItem onClick={() => handleClick(2)} selected={selected === 2}>
        <ImageWrapper>
          <CrditCardIcon fill={selected === 2 ? 'white' : 'grey'} />
        </ImageWrapper>
      </NavItem>
      <NavItem onClick={() => handleClick(3)} selected={selected === 3}>
        <ImageWrapper>
          <AwardIcon fill={selected === 3 ? 'white' : 'grey'} />
        </ImageWrapper>
      </NavItem>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  background-color: #121e3d;
  padding: 20px 20px;
  border-radius: 40px;
  height: 260px;
`;

const NavItem = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 38px;
  height: 34px;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;
