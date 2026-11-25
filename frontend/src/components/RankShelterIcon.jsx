import React from 'react';

/**
 * RankShelter Brand Icon (Refined Premium Architecture)
 * 1. Shelter: Solid architectural protective roof canopy with distinct eaves & depth
 * 2. Rank Arrow: Dynamic angled/diagonal rank surge arrow (↗) with growth bars
 */
export default function RankShelterIcon({ size = 26, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* 1. SOLID ARCHITECTURAL SHELTER ROOF (Chhat / Canopy) */}
      {/* Solid roof slab with eaves providing genuine shelter over the arrow */}
      <path
        d="M2.5 13.5L16 2.5L29.5 13.5L25.8 15.5L16 7.5L6.2 15.5L2.5 13.5Z"
        fill="currentColor"
      />
      {/* Subtle roof ridge division for premium 3D bevel */}
      <path
        d="M16 2.5V7.5"
        stroke="#071926"
        strokeWidth="1.2"
        strokeLinecap="round"
        opacity="0.35"
      />

      {/* 2. DYNAMIC ANGLED RANK ARROW (↗ Tehra Growth Arrow) */}
      {/* Soaring diagonal surge shaft */}
      <path
        d="M9 25.5L22 12.5"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* Sharp ranking arrowhead pointing ↗ */}
      <path
        d="M15 12.5H22V19.5"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 3. ASCENDING RANK GROWTH METRIC BARS */}
      {/* Stage 1 Base Bar */}
      <path
        d="M7 26V21.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.5"
      />
      {/* Stage 2 Growth Bar */}
      <path
        d="M12.5 26V18"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.8"
      />
    </svg>
  );
}
