'use client';
import React, { useState } from 'react';
import styled from 'styled-components';
import NavBar from './NavBar';
import SlotMachine from './Form/SlotMachine';
import Gachapon from './Form/Gachapon';
import LuckyDraw from './Form/LuckyDraw';

import { Provider } from 'react-redux';
import store from '../redux/store';
import SlotMachinePreview from './Preview/slotMachine';
import GachaponPreview from './Preview/gachapon';
import LuckyDrawPreview from './Preview/luckyDraw';
export default function NavWidget() {
  const [selected, setSelected] = useState(null);

  const handleClick = (index) => {
    setSelected(index);
  };
  return (
    <Provider store={store}>
      <Container>
        <NavBar selected={selected} handleClick={handleClick} />
        <EditorContainer>
          <EditorHeader>
            <EditorHeaderButton>Cancel</EditorHeaderButton>
            <EditorHeaderButton>Save</EditorHeaderButton>
          </EditorHeader>
          <div className="flex">
            <EditorBody>
              {selected === 0 && <h1>Home</h1>}
              {selected === 1 && <Gachapon />}
              {selected === 2 && <LuckyDraw />}
              {selected === 3 && <SlotMachine />}
            </EditorBody>
            <PreviewBody>
              {selected === 0 && <h1>Home</h1>}
              {selected === 1 && <GachaponPreview />}
              {selected === 2 && <LuckyDrawPreview />}
              {selected === 3 && <SlotMachinePreview />}
            </PreviewBody>
          </div>
        </EditorContainer>
      </Container>
    </Provider>
  );
}

const EditorHeaderButton = styled.div`
  padding: 10px;
  border-radius: 15px;
  border: 2px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bolder;
`;

const EditorHeader = styled.div`
  display: flex;
  justify-content: space-between;
  background: #56d4e1;
  width: 100%;
  height: 61px;
  border-radius: 40px 40px 0px 0px;
  padding: 20px 40px;
`;

const Container = styled.div`
  position: absolute;
  top: 30%;
  left: 10%;
  display: flex;
  gap: 15px;
`;

const EditorContainer = styled.div`
  position: relative;
  top: -150px;
  width: 1200px;
  height: 934px;
  background: white;
  border-radius: 40px;
  overflow: auto;
`;
const EditorBody = styled.div`
  padding: 20px;
  background-color: #f7f8fa;
  width: 50%;
  height: 100%;
`;
const PreviewBody = styled.div`
  width: 50%;
  height: 100%;
`;
