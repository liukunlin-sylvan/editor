'use client';
import React, { useEffect } from 'react';
import MachineBody from '../gachapon/MachineBody';
import Footer from '../common/Footer';
import { useSelector } from 'react-redux';
import GradientBackground from '../common/GradientBackground';
import GameTitle from '../common/GameTitle';
import { storeKeyEnum } from '../../const';

export default function Gachapon() {
  const backgroundColor = useSelector(
    (state) => state[storeKeyEnum.gacha].backgroundColor
  );
  useEffect(() => {
    const metaTag = document.querySelector('meta[name="theme-color"]');

    if (metaTag) {
      metaTag.setAttribute('content', '#493029');
    } else {
      const newMetaTag = document.createElement('meta');
      newMetaTag.setAttribute('name', 'theme-color');
      newMetaTag.setAttribute('content', '#493029');
      document.head.appendChild(newMetaTag);
    }
  }, []);

  if (!backgroundColor) {
    return null;
  }

  return (
    <GradientBackground start={backgroundColor} end={backgroundColor} isRadial>
      <GameTitle text="GACHAPON" />
      <MachineBody />
      <Footer />
    </GradientBackground>
  );
}
