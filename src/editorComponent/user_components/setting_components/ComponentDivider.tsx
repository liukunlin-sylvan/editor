import React from 'react';

interface DividerProps {
  style?: string; // Allow custom styles to be passed if needed
}

const ComponentDivider: React.FC<DividerProps> = ({ style }) => {
  return <div className={`w-full h-[1px] bg-[#E6EAF1] my-4 ${style}`} />;
};

export default ComponentDivider;
