import React, { useId } from 'react';

/**
 * RankShelter Official Brand Emblem (High-Definition 3D Glowing Vector)
 * Matches the user's official uploaded logo image:
 * - Electric Blue Glowing House / Shelter with Chimney on right
 * - 3D Beveled Inner Arch
 * - Central Upward Rank Arrow with 2 horizontal base metric bars
 * - Bottom Curved Horizon Swoop Arc
 */
export default function RankShelterIcon({ size = 32, className = '' }) {
  const rawId = useId();
  const idPrefix = 'rs_' + rawId.replace(/[:]/g, '');
  const roofGrad = `${idPrefix}_roof`;
  const shadowGrad = `${idPrefix}_shadow`;
  const arrowGrad = `${idPrefix}_arrow`;
  const arcGrad = `${idPrefix}_arc`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="RankShelter Logo"
      style={{ display: 'block', overflow: 'visible' }}
    >
      <defs>
        {/* Main Radiant Electric Cyan-Blue Gradient */}
        <linearGradient id={roofGrad} x1="256" y1="70" x2="256" y2="360" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#00f5ff" />
          <stop offset="30%" stopColor="#00c8ff" />
          <stop offset="65%" stopColor="#0072ff" />
          <stop offset="100%" stopColor="#004ce6" />
        </linearGradient>

        {/* Inner 3D Bevel Dark Shadow */}
        <linearGradient id={shadowGrad} x1="256" y1="110" x2="256" y2="340" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#002d7a" />
          <stop offset="50%" stopColor="#001852" />
          <stop offset="100%" stopColor="#000b26" />
        </linearGradient>

        {/* Central Rank Arrow Gradient */}
        <linearGradient id={arrowGrad} x1="256" y1="165" x2="256" y2="340" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#30eeff" />
          <stop offset="45%" stopColor="#0090ff" />
          <stop offset="100%" stopColor="#0050e6" />
        </linearGradient>

        {/* Bottom Horizon Arc Gradient */}
        <linearGradient id={arcGrad} x1="18" y1="375" x2="494" y2="375" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0055e6" stopOpacity="0.3" />
          <stop offset="25%" stopColor="#0099ff" />
          <stop offset="50%" stopColor="#00f2ff" />
          <stop offset="75%" stopColor="#0099ff" />
          <stop offset="100%" stopColor="#0055e6" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* 1. INNER 3D BEVEL SHADOW ROOF */}
      <path
        d="M256 114L146 205V338L158 343V212L256 132L354 212V343L366 338V205L256 114Z"
        fill={`url(#${shadowGrad})`}
      />

      {/* 2. OUTER SHELTER HOUSE WITH CHIMNEY & PILLARS */}
      <path
        d="M256 75L20 234H112V355C112 355 136 348 154 342V208L256 122L358 208V342C376 348 400 355 400 355V234H492L398 158V108H348V118L256 75Z"
        fill={`url(#${roofGrad})`}
      />

      {/* 3. CENTER RANK ARROWHEAD */}
      <path
        d="M256 168L168 244H214V268H298V244H344L256 168Z"
        fill={`url(#${arrowGrad})`}
      />

      {/* 4. BASE RANK METRIC BAR 1 */}
      <rect
        x="214"
        y="278"
        width="84"
        height="24"
        rx="3"
        fill={`url(#${arrowGrad})`}
      />

      {/* 5. BASE RANK METRIC BAR 2 */}
      <rect
        x="214"
        y="312"
        width="84"
        height="24"
        rx="3"
        fill={`url(#${arrowGrad})`}
      />

      {/* 6. BOTTOM CURVED HORIZON SWOOP ARC */}
      <path
        d="M18 400C120 362 392 362 494 400C392 344 120 344 18 400Z"
        fill={`url(#${arcGrad})`}
      />
    </svg>
  );
}
