import React from 'react';

/**
 * KindLink Official Brand Logo Component
 * Symbolism: Interlocking infinity heart loop + blooming nourishment leaf
 * Colors: Forest Emerald (#15803D) & Warm Golden Amber (#D97706)
 */
export default function KindLinkLogo({ 
  size = 'md', 
  variant = 'full', // 'full' | 'icon' | 'badge' | 'seal'
  className = '',
  textColor = 'default',
  animated = false 
}) {
  const sizeMap = {
    xs: { icon: 22, text: 'text-sm', sub: 'text-[9px]' },
    sm: { icon: 28, text: 'text-base', sub: 'text-[10px]' },
    md: { icon: 38, text: 'text-xl', sub: 'text-[11px]' },
    lg: { icon: 48, text: 'text-2xl', sub: 'text-xs' },
    xl: { icon: 64, text: 'text-3xl', sub: 'text-sm' },
    hero: { icon: 84, text: 'text-4xl sm:text-5xl', sub: 'text-sm' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  // Standalone Vector Icon
  const LogoIcon = (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${animated ? 'hover:scale-105 transition-transform duration-300' : ''}`}>
      <svg 
        width={currentSize.icon} 
        height={currentSize.icon} 
        viewBox="0 0 64 64" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_4px_8px_rgba(21,128,61,0.2)]"
      >
        <defs>
          {/* Emerald Gradient */}
          <linearGradient id="klEmeraldGrad" x1="8" y1="8" x2="56" y2="56" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#15803D" />
            <stop offset="100%" stopColor="#064E3B" />
          </linearGradient>

          {/* Warm Amber/Gold Gradient */}
          <linearGradient id="klAmberGrad" x1="16" y1="48" x2="48" y2="16" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F59E0B" />
            <stop offset="60%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* Sprout Glow Filter */}
          <filter id="klGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#15803D" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Outer Organic Shield Background (Optional subtle glow circle) */}
        <circle cx="32" cy="32" r="30" fill="currentColor" className="text-emerald-500/[0.08] dark:text-emerald-400/[0.12]" />

        {/* Heart Loop (Kindness) - Left to Center Loop */}
        <path 
          d="M20 23C16 19 11 22 11 28C11 36 21 44 32 51C33.5 49.9 36 47.8 38.5 45.5C36 44 33.5 41.5 32 39C27 31 25 28 20 23Z" 
          fill="url(#klEmeraldGrad)"
        />

        {/* Link Interlock Loop (Connection) - Right Intertwining Ribbon */}
        <path 
          d="M44 23C48 19 53 22 53 28C53 36 43 44 32 51C34.5 46 39 37 43 32C45.5 28.5 46 25 44 23Z" 
          fill="url(#klAmberGrad)" 
          opacity="0.92"
        />

        {/* Central Interlocking Link Bridge (Ring) */}
        <path
          d="M26 26C28 22 36 22 38 26C41 31 32 38 32 38C32 38 23 31 26 26Z"
          fill="#10B981"
          opacity="0.8"
        />

        {/* Central Blooming Nourishment Sprout Leaf */}
        <path 
          d="M32 15C32 15 36 21 34 26C32 29 29 27 28 24C27 20 32 15 32 15Z" 
          fill="#22C55E"
          filter="url(#klGlow)"
        />
        <path 
          d="M32 15C32 15 37 18 36 23C35 25 33 25 32 25C31.5 21 32 15 32 15Z" 
          fill="#86EFAC" 
          opacity="0.75"
        />

        {/* Dynamic Spark / Connecting Node Pin */}
        <circle cx="32" cy="35" r="3" fill="#FFFFFF" className="drop-shadow-xs" />
      </svg>
    </div>
  );

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {LogoIcon}
      </div>
    );
  }

  if (variant === 'badge' || variant === 'seal') {
    return (
      <div className={`inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-white dark:bg-[#24201D] border-2 border-[#E6DFD1] dark:border-[#3E3832] shadow-warm-sm ${className}`}>
        {LogoIcon}
        <div className="text-left">
          <div className="flex items-center gap-1 leading-tight">
            <span className="font-extrabold text-sm text-[#1C1917] dark:text-white font-display">
              Kind<span className="text-emerald-700 dark:text-emerald-400">Link</span>
            </span>
            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300">
              VERIFIED
            </span>
          </div>
          <div className="text-[10px] text-[#78716C] dark:text-stone-400 font-medium">
            Delhi Food Rescue Network
          </div>
        </div>
      </div>
    );
  }

  // Full Horizontal Brand Lockup
  return (
    <div className={`inline-flex items-center gap-3 text-left select-none ${className}`}>
      {LogoIcon}
      <div>
        <div className="flex items-center gap-1.5 leading-none">
          <span className={`font-black tracking-tight font-display ${currentSize.text} ${textColor === 'light' ? 'text-white' : 'text-[#1C1917] dark:text-white'}`}>
            Kind<span className="text-emerald-700 dark:text-emerald-400 font-black">Link</span>
          </span>
          <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-[9px] font-bold bg-emerald-100/90 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300/60 dark:border-emerald-700/60">
            DELHI
          </span>
        </div>
        <p className={`mt-1 font-medium tracking-tight text-[#78716C] dark:text-stone-400 ${currentSize.sub}`}>
          Food Rescue & Verified Relief
        </p>
      </div>
    </div>
  );
}
