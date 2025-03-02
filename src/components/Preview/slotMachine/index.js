import React from 'react';
import { useSelector } from 'react-redux';
import GradientBackground from '../common/GradientBackground';
import GameTitle from '../common/GameTitle';
import MachineBody from './MachineBody';
import Footer from '../common/Footer';
import { storeKeyEnum } from '../../const';
export default function SlotMachinePreview() {
  const backgroundColor = useSelector(
    (state) => state[storeKeyEnum.slotMachine].backgroundColor
  );
  return (
    <GradientBackground
      start={backgroundColor}
      end={backgroundColor}
      isRadial={false}
      storeKey={storeKeyEnum.slotMachine}
    >
      <GameTitle text={`Slot Machine`} />
      <MachineBody />
      <Footer />
    </GradientBackground>
  );
}
