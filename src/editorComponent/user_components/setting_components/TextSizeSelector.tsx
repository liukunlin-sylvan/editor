import React from 'react';
import '../../utils/editorStyles.css';

interface TextSizeSelectorProps {
  fontSize: number;
  setFontSize: Function;
}

const TextSizeSelector: React.FC<TextSizeSelectorProps> = ({
  fontSize,
  setFontSize,
}) => {
  return (
    <div className="flex justify-start bg-[#E6EAF1] rounded-[40px] gap-5 py-1 px-4 text-[12px]">
      <label className="flex items-center gap-1">
        <input
          type="radio"
          name="size"
          value={12}
          checked={fontSize === 12}
          onChange={() => setFontSize(12)}
        />
        <span>Small</span>
      </label>
      <label className="flex items-center gap-1">
        <input
          type="radio"
          name="size"
          value={14}
          checked={fontSize === 14}
          onChange={() => setFontSize(14)}
        />
        <span>Medium</span>
      </label>
      <label className="flex items-center gap-1">
        <input
          type="radio"
          name="size"
          value={18}
          checked={fontSize === 18}
          onChange={() => setFontSize(18)}
        />
        <span>Large</span>
      </label>
      <label className="flex items-center gap-1">
        <input
          type="radio"
          name="size"
          value={24}
          checked={fontSize === 24}
          onChange={() => setFontSize(24)}
        />
        <span>Extra Large</span>
      </label>
    </div>
  );
};

export default TextSizeSelector;
