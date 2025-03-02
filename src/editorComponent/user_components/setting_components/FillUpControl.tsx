import React from 'react';
import { FaFillDrip } from 'react-icons/fa';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import ComponentIcon from './ComponentIcon';
import ColorPicker from './ColorPicker';

interface FillUpControlProps {
  isFillUpChecked: boolean;
  color: string;
  onSwitchChange: Function;
  onColorChange: Function;
}

const FillUpControl: React.FC<FillUpControlProps> = ({
  isFillUpChecked,
  color,
  onSwitchChange,
  onColorChange,
}) => {
  return (
    <div className="editor-component">
      <ComponentIcon icon={FaFillDrip} size={20} />

      <FormControlLabel
        className="ml-1"
        control={
          <Switch
            defaultChecked
            checked={isFillUpChecked}
            onChange={(e) => onSwitchChange(e)}
          />
        }
        label="Fill up"
        labelPlacement="start"
      />
      {isFillUpChecked && (
        <div className="relative">
          <ColorPicker color={color} onChange={onColorChange} />
        </div>
      )}
    </div>
  );
};

export default FillUpControl;
