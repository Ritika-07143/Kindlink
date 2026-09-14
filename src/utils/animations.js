import { useState, useEffect, useRef } from 'react';

/**
 * High-performance requestAnimationFrame number counter hook with ease-out cubic
 */
export function useCountUp(endValue, duration = 1200, startOnMount = true) {
  const [count, setCount] = useState(0);
  const prevEndRef = useRef(0);

  useEffect(() => {
    if (!startOnMount) return;
    
    let startTime = null;
    let animationFrameId;
    const startVal = prevEndRef.current;
    const diff = Number(endValue) - startVal;

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutCubic(progress);
      
      const current = Math.round(startVal + diff * easedProgress);
      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        prevEndRef.current = Number(endValue);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [endValue, duration, startOnMount]);

  return count;
}

/**
 * Creates an expanding radial ripple effect on any element click
 */
export function createRipple(event) {
  const button = event.currentTarget;
  if (!button) return;
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height) * 2;
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  const ripple = document.createElement('span');
  ripple.style.position = 'absolute';
  ripple.style.left = x + 'px';
  ripple.style.top = y + 'px';
  ripple.style.width = size + 'px';
  ripple.style.height = size + 'px';
  ripple.style.borderRadius = '50%';
  ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.35)';
  ripple.style.pointerEvents = 'none';
  ripple.style.transform = 'scale(0)';
  ripple.style.animation = 'rippleEffect 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards';
  ripple.className = 'js-ripple-effect';

  button.style.position = button.style.position || 'relative';
  button.style.overflow = 'hidden';
  button.appendChild(ripple);

  setTimeout(() => {
    if (ripple.parentNode) {
      ripple.parentNode.removeChild(ripple);
    }
  }, 700);
}

/**
 * Spawns mini animated sparkles at mouse click coordinates
 */
export function spawnSparkles(x, y, count = 7) {
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.left = x + 'px';
  container.style.top = y + 'px';
  container.style.pointerEvents = 'none';
  container.style.zIndex = '9999';
  document.body.appendChild(container);

  const colors = ['#10B981', '#F59E0B', '#FBBF24', '#059669', '#E6DFD1'];

  for (let i = 0; i < count; i++) {
    const sparkle = document.createElement('div');
    const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.4 - 0.2);
    const distance = 30 + Math.random() * 40;
    const targetX = Math.cos(angle) * distance;
    const targetY = Math.sin(angle) * distance;
    const color = colors[i % colors.length];
    const size = 5 + Math.random() * 4;

    sparkle.style.position = 'absolute';
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    sparkle.style.borderRadius = '50%';
    sparkle.style.backgroundColor = color;
    sparkle.style.boxShadow = '0 0 8px ' + color;
    sparkle.style.transform = 'translate(-50%, -50%) scale(1)';
    sparkle.style.transition = 'all 0.65s cubic-bezier(0.16, 1, 0.3, 1)';
    sparkle.style.opacity = '1';

    container.appendChild(sparkle);

    requestAnimationFrame(() => {
      sparkle.style.transform = 'translate(' + targetX + 'px, ' + targetY + 'px) scale(0)';
      sparkle.style.opacity = '0';
    });
  }

  setTimeout(() => {
    if (container.parentNode) container.parentNode.removeChild(container);
  }, 750);
}
