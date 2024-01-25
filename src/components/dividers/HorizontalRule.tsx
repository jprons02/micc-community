import React from 'react';

interface HorizontalRuleProps {
  color?: string;
  width?: string;
}

const HorizontalRule: React.FC<HorizontalRuleProps> = ({
  color = '#d8d8d8',
  width = '100%',
}) => {
  return (
    <div
      style={{
        border: 'none',
        borderBottom: `1px solid ${color}`,
        width: width,
        margin: '30px 0',
        maxWidth: '400px',
      }}
    />
  );
};

export default HorizontalRule;
