import React, { CSSProperties } from 'react';

interface PinkStrokeButtonProps {
  text: string;
  onClick: () => void;
  width?: string;
  fontSize?: string;
  style?: CSSProperties;
}

const PinkStrokeButton: React.FC<PinkStrokeButtonProps> = ({ text, onClick, width, fontSize, style }) => {
  const buttonStyle: CSSProperties = {
    border: '2px solid rgba(254, 176, 190, 1)', 
    borderRadius: '30px',
    padding: '5px 15px',
    cursor: 'pointer',
    width: width || 'auto',
    fontSize: fontSize || 'inherit', 
    fontFamily: 'Segoe UI', 
    fontWeight: 'bold', 
    ...style, 
  };

  return (
    <button
      type="button"
      onClick={onClick}
      style={buttonStyle}
    >
      <span style={{ fontSize: fontSize || 'inherit' }}>{text}</span>
    </button>
  );
};

export default PinkStrokeButton;
