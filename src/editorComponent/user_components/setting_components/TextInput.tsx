import React from 'react';
import { RxText } from 'react-icons/rx';
import '../../utils/editorStyles.css';
import ComponentIcon from './ComponentIcon';
import FontSelector from './FontSelector';
import ColorPicker from './ColorPicker';

const TextInput = ({
  icon: Icon = RxText,
  placeholder,
  value,
  onChange,
  colorValue,
  onColorChange,
  allowStyleChange = true,
  font,
  onFontChange,
  backgroundColorValue,
  onBackgroundColorChange,
  muitiline = false,
}) => {
  const componentStyle = muitiline ? 'flex mb-1 gap-3' : 'editor-component';
  const fontSelectorStyle = muitiline ? 'mt-2' : '';
  const colorPickerStyle = muitiline ? 'mt-3' : '';

  return (
    <div className={componentStyle}>
      <ComponentIcon icon={Icon} size={50} />

      {/* Text Input */}
      {muitiline ? (
        <textarea
          className="editor-textarea"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={1}
        />
      ) : (
        <input
          className="editor-input"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}

      {allowStyleChange && font && onFontChange && (
        <div className={fontSelectorStyle}>
          <FontSelector font={font} onFontChange={onFontChange} />
        </div>
      )}

      {/* Color Picker */}
      {allowStyleChange && colorValue && onColorChange && (
        <div className={colorPickerStyle}>
          <ColorPicker color={colorValue} onChange={onColorChange} />
        </div>
      )}

      {/* Background Picker */}
      {allowStyleChange && backgroundColorValue && onBackgroundColorChange && (
        <div className={colorPickerStyle}>
          <ColorPicker
            color={backgroundColorValue}
            onChange={onBackgroundColorChange}
          />
        </div>
      )}
    </div>
  );
};

export default TextInput;
