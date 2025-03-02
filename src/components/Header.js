'use client';

import React from 'react';
import styled from 'styled-components';

export default function Header() {
  return (
    <Container>
      <ImageWrapper>Dine Seal</ImageWrapper>
      <NavContainer>
        <NavItem>Home</NavItem>
        <NavItem>Analytics</NavItem>
      </NavContainer>
    </Container>
  );
}

const ImageWrapper = styled.div`
  font-family: 'Poppins';
  font-weight: bold;
  font-size: 24px;
  line-height: 136%;
  text-align: center;
  background: linear-gradient(90deg, #58e5ea -1.23%, #4fa4c8 117.01%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0px 4px 43.7px rgba(255, 255, 255, 0.25);
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #ffffff;
  height: 50px;
  padding: 0 40px;
  gap: 50px;
`;

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  height: 100%;
`;
const NavItem = styled.div`
  font-size: 16px;
  color: #cdcdcd;
  font-weight: 600;
`;
