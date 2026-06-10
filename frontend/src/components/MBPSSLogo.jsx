import React from 'react';

export default function MBPSSLogo({ size = 'default' }) {
  const height = size === 'large' ? 56 : size === 'small' ? 36 : 44;
  
  return (
    <svg height={height} viewBox="0 0 220 56" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Shield / House Icon */}
      <g>
        {/* Outer shield shape */}
        <path
          d="M6 8 L22 4 L38 8 L38 28 Q38 40 22 46 Q6 40 6 28 Z"
          fill="#c9a84c"
        />
        {/* Inner shield */}
        <path
          d="M10 11 L22 8 L34 11 L34 27 Q34 36 22 41 Q10 36 10 27 Z"
          fill="#0a2540"
        />
        {/* House shape on shield */}
        <path
          d="M22 16 L30 22 L30 33 L14 33 L14 22 Z"
          fill="none"
          stroke="#c9a84c"
          strokeWidth="1.5"
        />
        <path
          d="M12 23 L22 14 L32 23"
          fill="none"
          stroke="#c9a84c"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        {/* Door */}
        <rect x="19" y="27" width="6" height="6" fill="#c9a84c" rx="0.5" />
        {/* Checkmark / tick */}
        <path
          d="M15 25 L19 29 L27 20"
          fill="none"
          stroke="#c9a84c"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.3"
        />
      </g>

      {/* Text: MBPSS */}
      <text
        x="50"
        y="30"
        fontFamily="'Playfair Display', serif"
        fontWeight="800"
        fontSize="26"
        fill="#ffffff"
        letterSpacing="1"
      >
        MBPSS
      </text>

      {/* Tagline */}
      <text
        x="51"
        y="44"
        fontFamily="'DM Sans', sans-serif"
        fontWeight="400"
        fontSize="9"
        fill="#c9a84c"
        letterSpacing="2.5"
      >
        PROPERTY SOLUTIONS
      </text>
    </svg>
  );
}
