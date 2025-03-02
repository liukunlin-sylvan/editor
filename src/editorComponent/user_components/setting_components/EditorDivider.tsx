import React from 'react';

interface DividerProps {
  style?: string; // Allow custom styles to be passed if needed
}

const EditorDivider: React.FC<DividerProps> = ({ style }) => {
  return <div className={`w-[5px] bg-[#C1C9D7] rounded-[30px] ${style}`} />;
};

export default EditorDivider;
