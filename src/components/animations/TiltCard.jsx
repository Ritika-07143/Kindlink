import React, { useState, useRef } from 'react';

/**
 * 3D Interactive Perspective Tilt Card with Specular Light Glare
 */
export default function TiltCard({ 
  children, 
  className = '', 
  maxTilt = 7, 
  glare = true,
  scale = 1.015,
  onClick,
  ...props 
}) {
  const cardRef = useRef(null);
  const [transformStyle, setTransformStyle] = useState({});
  const [glareStyle, setGlareStyle] = useState({ opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const width = rect.width;
    const height = rect.height;

    const centerX = width / 2;
    const centerY = height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    setTransformStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`,
      transition: 'transform 0.1s ease-out'
    });

    if (glare) {
      const glareX = (x / width) * 100;
      const glareY = (y / height) * 100;
      setGlareStyle({
        opacity: 0.18,
        background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.7) 0%, rgba(255, 255, 255, 0) 70%)`,
        transition: 'opacity 0.15s ease-out'
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransformStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
      transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
    });
    if (glare) {
      setGlareStyle({
        opacity: 0,
        transition: 'opacity 0.4s ease-out'
      });
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        ...transformStyle,
        transformStyle: 'preserve-3d',
        willChange: 'transform'
      }}
      className={`relative rounded-3xl transition-shadow ${className}`}
      {...props}
    >
      {/* Specular Light Sheen Overlay */}
      {glare && (
        <div
          className="absolute inset-0 pointer-events-none rounded-[inherit] z-20 overflow-hidden"
          style={glareStyle}
        />
      )}
      {children}
    </div>
  );
}
