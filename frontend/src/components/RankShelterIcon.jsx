import React from 'react';

/**
 * RankShelter Official Brand Emblem
 * Pixel-perfect SVG recreation of the official logo provided by user:
 * - Peaked Shelter Roof with Chimney on right
 * - 3D Beveled Inner Arch
 * - Upward Rank Arrow with 2 horizontal base metric bars
 * - Bottom Curved Horizon Swoop Arc
 * - High-Impact Electric Cyan-Blue Glow Gradients
 */
export default function RankShelterIcon({ size = 28, className = '' }) {
  const gradId = 'rs_blue_grad';
  const shadowId = 'rs_bevel_shadow';
  const arrowGradId = 'rs_arrow_grad';
  const arcGradId = 'rs_arc_grad';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="RankShelter Logo"
    >
      <defs>
        {/* Main Vibrant Cyan-Blue Gradient */}
        <linearGradient id={gradId} x1="256" y1="60" x2="256" y2="390" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00f5ff" />
          <stop offset="25%" stopColor="#00c8ff" />
          <stop offset="65%" stopColor="#0077ff" />
          <stop offset="100%" stopColor="#0050e6" />
        </linearGradient>

        {/* Inner 3D Bevel Dark Blue Shadow */}
        <linearGradient id={shadowId} x1="256" y1="110" x2="256" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#002d7a" />
          <stop offset="50%" stopColor="#001a4e" />
          <stop offset="100%" stopColor="#000e30" />
        </linearGradient>

        {/* Central Rank Arrow Gradient */}
        <linearGradient id={arrowGradId} x1="256" y1="160" x2="256" y2="345" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2aeaff" />
          <stop offset="40%" stopColor="#0099ff" />
          <stop offset="100%" stopColor="#005ce6" />
        </linearGradient>

        {/* Bottom Horizon Arc Gradient */}
        <linearGradient id={arcGradId} x1="20" y1="380" x2="492" y2="380" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#005ae6" stopOpacity="0.3" />
          <stop offset="20%" stopColor="#009dff" />
          <stop offset="50%" stopColor="#00f0ff" />
          <stop offset="80%" stopColor="#009dff" />
          <stop offset="100%" stopColor="#005ae6" stopOpacity="0.3" />
        </linearGradient>

        {/* Glow Filter for High-Impact Display */}
        <filter id="rsGlow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="6" floodColor="#00c8ff" floodOpacity="0.3" />
        </filter>
      </defs>

      <g filter="url(#rsGlow)">
        {/* 1. INNER 3D BEVEL ROOF SHADOW LAYER */}
        <path
          d="M256 112L145 204V340L160 345V214L256 135L352 214V345L367 340V204L256 112Z"
          fill="url(#rs_bevel_shadow)"
        />

        {/* 2. OUTER SHELTER HOUSE WITH CHIMNEY & PILLARS */}
        <path
          d="M256 75L20 234H110V355C110 355 135 348 152 342V208L256 122L360 208V342C377 348 402 355 402 355V234H492L398 158V108H348V118L256 75Z"
          fill="url(#rs_blue_grad)"
        />

        {/* 3. CENTER RANK ARROWHEAD */}
        <path
          d="M256 168L168 244H212V268H300V244H344L256 168Z"
          fill="url(#rs_arrow_grad)"
        />

        {/* 4. BASE RANK METRIC BAR 1 */}
        <rect
          x="212"
          y="278"
          width="88"
          height="24"
          rx="3"
          fill="url(#rs_arrow_grad)"
        />

        {/* 5. BASE RANK METRIC BAR 2 */}
        <rect
          x="212"
          y="312"
          width="88"
          height="24"
          rx="3"
          fill="url(#rs_arrow_grad)"
        />

        {/* 6. BOTTOM CURVED HORIZON SWOOP ARC */}
        <path
          d="M18 400C120 365 392 365 494 400C392 345 120 345 18 400Z"
          fill="url(#rs_arc_grad)"
        />
      </g>
    </svg>
  );
}
