import React from 'react';
import { IoMdResize } from 'react-icons/io';
import { Slider } from '@mui/material';
import ComponentIcon from './ComponentIcon';

interface SizeSliderProps {
  size: number;
  onChange: Function;
  min?: number;
  max?: number;
  disabled?: boolean;
}

const SizeSlider: React.FC<SizeSliderProps> = ({
  size,
  onChange,
  min = 1,
  max = 10,
  disabled = true,
}) => {
  return (
    <div className="flex items-center gap-4">
      <ComponentIcon icon={IoMdResize} size={30} />
      <p>Size</p>
      <Slider
        value={size}
        onChange={(_, value) => {
          onChange(value as number);
        }}
        min={min}
        max={max}
      />
      <input
        className="w-[40px] rounded-[5px] border-[2px] border-black p-1"
        disabled={disabled}
        value={size}
      />
    </div>
  );
};

export default SizeSlider;
