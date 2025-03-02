import React from 'react';

interface IconProps {
  icon: React.ElementType;
  divStyle?: string; // Allow custom styles to be passed if needed
  onClickFunction?: Function;
  color?: string;
  size?: number;
}

const ComponentIcon: React.FC<IconProps> = ({
  divStyle,
  icon: Icon,
  size,
  color: Color = '#09244B',
  onClickFunction,
}) => {
  var style = 'flex justify-center w-[30px] min-w-[30px]';
  if (onClickFunction) {
    style += ' cursor-pointer';
  }

  return (
    <div className={`${style} ${divStyle}`}>
      {size ? (
        <Icon
          className="text-2xl"
          color={Color}
          size={size}
          onClick={onClickFunction}
        />
      ) : (
        <Icon className="text-2xl" color={Color} onClick={onClickFunction} />
      )}
    </div>
  );
};

export default ComponentIcon;
