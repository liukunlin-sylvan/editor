import React, { useState, useRef } from 'react';
import { Modal } from '@mui/material';
import { SketchPicker } from 'react-color';

// Function to convert RGBA to a string
function rgbaToString(rgb) {
  return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
}

const ColorPicker = ({ color, onChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const anchorRef = useRef(null);
  return (
    <div className="flex flex-col relative">
      <div
        ref={anchorRef}
        className="h-9 w-9 rounded-full shadow-lg border-2 border-gray-300 cursor-pointer"
        style={{ backgroundColor: color }}
        onClick={() => setIsModalOpen((prev) => !prev)}
      />
      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        closeAfterTransition
        className="flex items-center justify-center"
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: 'transparent', // Makes the backdrop transparent
            },
          },
        }}
      >
        <div
          className="absolute"
          style={{
            top: anchorRef.current
              ? anchorRef.current.getBoundingClientRect().bottom +
                window.scrollY +
                10 +
                'px'
              : '0px',
            left: (() => {
              if (anchorRef.current) {
                const rect = anchorRef.current.getBoundingClientRect();
                const modalWidth = 220;
                const centerPosition =
                  rect.left + rect.width / 2 - modalWidth / 2;
                return centerPosition + modalWidth > window.innerWidth
                  ? window.innerWidth - modalWidth - 10 + 'px' // Adjust if it overflows on the right
                  : centerPosition < 0
                    ? '10px' // Adjust if it overflows on the left
                    : centerPosition + window.scrollX + 'px'; // Center alignment by default
              }
              return '0px';
            })(),
          }}
        >
          <SketchPicker
            className="sketch-picker"
            color={color}
            onChange={(color) => onChange(rgbaToString(color.rgb))}
          />
        </div>
      </Modal>
    </div>
  );
};

export default ColorPicker;
