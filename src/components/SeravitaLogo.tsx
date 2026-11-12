import React from 'react';

interface SeravitaLogoProps {
  variant?: 'dark' | 'light' | 'cream';
  showSubtitle?: boolean;
  className?: string;
  symbolSize?: number;
}

export const SeravitaLogo: React.FC<SeravitaLogoProps> = ({
  variant = 'dark',
  showSubtitle = true,
  className = '',
  symbolSize = 36,
}) => {
  const isLight = variant === 'light';
  const textColor = isLight ? 'text-white' : 'text-[#23483F]';
  const symbolColor = isLight ? '#A6B9A8' : '#23483F';
  const accentColor = isLight ? '#FFFFFF' : '#A6B9A8';
  const subtitleColor = isLight ? 'text-[#A6B9A8]' : 'text-[#343B38]/70';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Seravita Custom Organic Care Monogram Icon */}
      <svg
        width={symbolSize}
        height={symbolSize}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-300 group-hover:scale-105"
        aria-hidden="true"
      >
        {/* Soft circular base aura */}
        <circle cx="24" cy="24" r="22" fill={isLight ? 'rgba(255,255,255,0.08)' : 'rgba(166,185,168,0.2)'} />
        
        {/* Continuous organic caring wave & leaf */}
        <path
          d="M24 8C15.163 8 8 15.163 8 24C8 30.5 11.5 35 17 38C15 34 15 28 19 23C23 18 29 17 31 11C28 9 26 8 24 8Z"
          fill={symbolColor}
          fillOpacity="0.9"
        />
        <path
          d="M24 40C32.837 40 40 32.837 40 24C40 17.5 36.5 13 31 10C33 14 33 20 29 25C25 30 19 31 17 37C20 39 22 40 24 40Z"
          fill={accentColor}
          fillOpacity="0.85"
        />
        {/* Inner gentle leaf stem / life pulse line */}
        <path
          d="M17 31C21 28 27 20 31 17"
          stroke={isLight ? '#23483F' : '#FFFFFF'}
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>

      {/* Brand Typography */}
      <div className="flex flex-col justify-center leading-none">
        <span
          className={`font-serif text-2xl sm:text-[1.65rem] font-bold tracking-[0.06em] ${textColor} transition-colors`}
        >
          SERAVITA
        </span>
        {showSubtitle && (
          <span
            className={`text-[9.5px] font-medium tracking-[0.24em] uppercase ${subtitleColor} mt-1`}
          >
            Clínica Médica
          </span>
        )}
      </div>
    </div>
  );
};
