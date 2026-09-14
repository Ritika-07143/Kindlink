import React from 'react';
import { createRipple, spawnSparkles } from '../../utils/animations';

export default function RippleButton({
  children,
  className = '',
  onClick,
  sparkles = false,
  ...props
}) {
  const handleClick = (e) => {
    createRipple(e);
    if (sparkles) {
      spawnSparkles(e.clientX, e.clientY, 6);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`relative overflow-hidden active:scale-[0.97] transition-transform duration-150 select-none ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
