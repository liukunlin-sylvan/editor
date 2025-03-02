import React from 'react';
import { IconButton } from '@mui/material';
import { PiCopy } from 'react-icons/pi';
import { BsTrash } from 'react-icons/bs';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

interface ToolbarProps {
  onCopy: () => void;
  onDelete: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onCopy,
  onDelete,
  onMoveUp,
  onMoveDown,
}) => {
  const onClickDelete = () => {
    const userConfirmed = window.confirm(
      'Are you sure you want to delete this text component?'
    );
    if (userConfirmed) {
      onDelete();
    }
  };

  return (
    <div className="flex flex-col gap-2 bg-[#E6EAF1] rounded-s-xl px-2 py-3 justify-between">
      <div className="flex flex-col">
        {/* Copy Button */}
        <IconButton color="primary" size="small" onClick={onCopy}>
          <PiCopy style={{ color: 'black' }} />
        </IconButton>

        {/* Delete Button */}
        <IconButton color="primary" size="small" onClick={onClickDelete}>
          <BsTrash style={{ color: 'black' }} />
        </IconButton>
      </div>

      <div className="flex flex-col">
        {/* Move Up Button */}
        <IconButton color="primary" size="small" onClick={onMoveUp}>
          <IoIosArrowUp style={{ color: 'black' }} />
        </IconButton>

        {/* Move Down Button */}
        <IconButton color="primary" size="small" onClick={onMoveDown}>
          <IoIosArrowDown style={{ color: 'black' }} />
        </IconButton>
      </div>
    </div>
  );
};

export default Toolbar;
