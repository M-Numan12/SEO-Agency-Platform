import React from 'react';

/**
 * RankShelter Custom Brand Icon
 * Concept: Protective Shelter Canopy (Roof) on Top + Rising Rank Growth Arrow Underneath
 */
export default function RankShelterIcon({ size = 24, className = '' }) {
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
      {/* 1. SHELTER ROOF (Top Canopy) */}
      <path
        d="M3 13L16 3.5L29 13"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner architectural shelter ceiling for premium depth */}
      <path
        d="M7 13.5L16 7L25 13.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.45"
      />

      {/* 2. RANK GROWTH ARROW (Underneath Shelter) */}
      {/* Upward Rank Shaft */}
      <path
        d="M16 27.5V11"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* Arrowhead pointing up under the shelter */}
      <path
        d="M10.5 16.5L16 11L21.5 16.5"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 3. RANKING BASE STEPS (Left & Right Growth Indicators) */}
      <path
        d="M8.5 27.5V21.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeOpacity="0.6"
      />
      <path
        d="M23.5 27.5V18.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeOpacity="0.85"
      />
    </svg>
  );
}
