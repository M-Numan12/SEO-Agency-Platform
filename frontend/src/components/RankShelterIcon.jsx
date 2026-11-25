import React from 'react';

/**
 * RankShelter Custom Brand Icon (Refined)
 * - Aerodynamic Peaked Shelter Canopy (Soft curved protective roof)
 * - Diagonal/Angled Ranking Surge Arrow (↗) representing soaring organic growth
 * - Ascending Base Metrics Steps
 */
export default function RankShelterIcon({ size = 25, className = '' }) {
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
      {/* 1. ELEGANT CURVED SHELTER CANOPY (With subtle center peak & curved wings) */}
      <path
        d="M3.5 14Q9.5 5.5 16 4.5Q22.5 5.5 28.5 14"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Inner decorative shelter arch for architectural depth */}
      <path
        d="M7 14.5Q11 8.5 16 7.8Q21 8.5 25 14.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity="0.4"
      />

      {/* 2. DYNAMIC ANGLED/DIAGONAL RANK SURGE ARROW (↗) */}
      {/* Soaring diagonal arrow shaft */}
      <path
        d="M9.5 24.5L22.5 11"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      {/* Sharp angled arrowhead pointing up-right */}
      <path
        d="M15.5 11H22.5V18"
        stroke="currentColor"
        strokeWidth="2.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 3. ASCENDING RANKING GROWTH METRIC BARS */}
      {/* Base Bar (Stage 1) */}
      <path
        d="M7.5 25.5V21"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />
      {/* Mid Growth Bar (Stage 2) */}
      <path
        d="M13 25.5V17.5"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeOpacity="0.75"
      />
    </svg>
  );
}
