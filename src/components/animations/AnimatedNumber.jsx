import React from 'react';
import { useCountUp } from '../../utils/animations';

export default function AnimatedNumber({ 
  value, 
  duration = 1100, 
  prefix = '', 
  suffix = '', 
  formatLocale = true,
  className = ''
}) {
  const numericVal = typeof value === 'number' ? value : parseFloat(value) || 0;
  const count = useCountUp(numericVal, duration);

  const display = formatLocale ? count.toLocaleString('en-IN') : count;

  return (
    <span className={"inline-block tabular-nums font-inherit transition-all duration-150 " + className}>
      {prefix}{display}{suffix}
    </span>
  );
}
