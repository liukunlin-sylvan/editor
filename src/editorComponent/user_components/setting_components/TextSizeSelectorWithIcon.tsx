import React from 'react';
import { GoTypography } from 'react-icons/go';
import '../../utils/editorStyles.css';
import ComponentIcon from './ComponentIcon';
import TextSizeSelector from './TextSizeSelector';

interface TextSizeSelectorWithIconProps {
  fontSize: number;
  setFontSize: Function;
}

const TextSizeSelectorWithIcon: React.FC<TextSizeSelectorWithIconProps> = ({
  fontSize,
  setFontSize,
}) => {
  return (
    <div className="editor-component h-[50px]">
      <ComponentIcon icon={GoTypography} size={25} />

      <div>
        <TextSizeSelector fontSize={fontSize} setFontSize={setFontSize} />
      </div>
    </div>
  );
};

export default TextSizeSelectorWithIcon;
