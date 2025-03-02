import React, { useState, useRef } from 'react';
import { Modal } from '@mui/material';

const fontList = [
  { name: 'Roboto', fontFamily: 'Roboto, sans-serif' },
  { name: 'Lobster', fontFamily: 'Lobster, cursive' },
  { name: 'Open Sans', fontFamily: 'Open Sans, sans-serif' },
  { name: 'Arial', fontFamily: 'Arial, sans-serif' },
  { name: 'Georgia', fontFamily: 'Georgia, serif' },
  { name: 'Courier New', fontFamily: 'Courier New, monospace' },
];

interface FontSelectorProps {
  font: string;
  onFontChange: Function;
}

const FontSelector: React.FC<FontSelectorProps> = ({ font, onFontChange }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);

  const handleFontChange = (font: string) => {
    onFontChange(font);
    setIsModalOpen(false); // Close the modal after font selection
  };

  return (
    <div className="flex flex-col items-center relative">
      {/* Font Preview acting as the button to open Modal */}
      <div
        ref={anchorRef}
        className="text-4xl cursor-pointer w-[30px] min-w-[30px] text-center"
        onClick={() => setIsModalOpen((prev) => !prev)}
        style={{ fontFamily: font }}
      >
        A
      </div>

      {/* Modal - Font List */}
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
          className="bg-white shadow-lg rounded-lg p-4 max-h-40 overflow-x-auto flex py-2 px-2 absolute"
          style={{
            top: anchorRef.current
              ? anchorRef.current.getBoundingClientRect().bottom +
                window.scrollY +
                10 +
                'px'
              : '0px',
            left: 'auto',
            right: 'auto',
            bottom: 'auto',
          }}
        >
          {fontList.map((f) => (
            <div
              key={f.name}
              className="cursor-pointer flex items-center justify-center w-14 h-14 rounded-full hover:bg-gray-100 transition-all"
              onClick={() => handleFontChange(f.fontFamily)}
            >
              <span
                style={{
                  fontFamily: f.fontFamily,
                  color: 'black',
                  fontSize: 24,
                }}
              >
                A
              </span>
            </div>
          ))}
        </div>
      </Modal>
    </div>
  );
};

export default FontSelector;
