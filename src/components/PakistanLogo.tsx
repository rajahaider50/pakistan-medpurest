import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'dark' | 'white';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default function PakistanLogo({
  className = '',
  variant = 'dark',
  size = 'md',
}: LogoProps) {
  const isWhite = variant === 'white';
  const isIconOnly = variant === 'icon';

  const sizeClasses = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-16',
  };

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Code-Generated Medical Emblem */}
      <svg
        className={`${sizeClasses[size]} w-auto aspect-square flex-shrink-0 transition-transform duration-300 hover:scale-105`}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pkMedGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#006633" />
            <stop offset="50%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <linearGradient id="pkCrossGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#008542" />
          </linearGradient>
          <filter id="subtleGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0284C7" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Outer Circular Shield Frame */}
        <circle cx="50" cy="50" r="46" stroke="url(#pkMedGrad)" strokeWidth="3.5" fill="none" opacity="0.9" />

        {/* Crescent Arc (Emblematic of Pakistan & Medical Care Shield) */}
        <path
          d="M 58 16 A 34 34 0 1 0 74 72 A 28 28 0 1 1 58 16 Z"
          fill="url(#pkMedGrad)"
          filter="url(#subtleGlow)"
        />

        {/* Modern Medical Cross in Center */}
        <rect x="44" y="32" width="12" height="36" rx="3.5" fill="url(#pkCrossGrad)" />
        <rect x="32" y="44" width="36" height="12" rx="3.5" fill="url(#pkCrossGrad)" />

        {/* Spark of Innovation / Star Dot */}
        <circle cx="68" cy="30" r="3.5" fill="#10B981" />
      </svg>

      {/* Brand Typography */}
      {!isIconOnly && (
        <div className="flex flex-col justify-center text-left leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-black tracking-wider text-xl md:text-2xl font-sans uppercase ${
                isWhite ? 'text-white' : 'text-slate-900'
              }`}
            >
              PAKISTAN
            </span>
            <span className="text-emerald-500 font-bold text-xs uppercase px-1.5 py-0.5 rounded bg-emerald-50 border border-emerald-200">
              MED
            </span>
          </div>
          <span
            className={`text-[9px] md:text-[10px] tracking-widest uppercase font-semibold mt-1 ${
              isWhite ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            Medical Supplies & Technology
          </span>
        </div>
      )}
    </div>
  );
}
