/** 吉祥物：拿放大鏡的偵探小猴（「抓猴」的雙關） */
export function mascotSvg(size = 140): string {
  return `<svg viewBox="0 0 160 160" width="${size}" height="${size}" aria-hidden="true"><g filter="url(#crayon-soft)">
  <ellipse cx="80" cy="150" rx="44" ry="7" fill="#000" opacity=".15"/>
  <path d="M118 120 Q150 120 146 92 Q142 74 128 82" fill="none" stroke="#876a58" stroke-width="8" stroke-linecap="round"/>
  <ellipse cx="80" cy="118" rx="34" ry="30" fill="#977861"/>
  <ellipse cx="80" cy="124" rx="22" ry="20" fill="#d4bea7"/>
  <path d="M46 92 Q34 120 50 138 L62 132 Q54 114 60 98 Z" fill="#745e7b"/>
  <path d="M114 92 Q126 120 110 138 L98 132 Q106 114 100 98 Z" fill="#745e7b"/>
  <circle cx="34" cy="62" r="16" fill="#977861"/><circle cx="34" cy="62" r="9" fill="#d4bea7"/>
  <circle cx="126" cy="62" r="16" fill="#977861"/><circle cx="126" cy="62" r="9" fill="#d4bea7"/>
  <circle cx="80" cy="62" r="42" fill="#977861"/>
  <path d="M50 66 Q50 40 68 44 Q80 52 92 44 Q110 40 110 66 Q110 98 80 98 Q50 98 50 66Z" fill="#d4bea7"/>
  <ellipse cx="68" cy="64" rx="5" ry="6.4" fill="#403737"/><ellipse cx="94" cy="64" rx="5" ry="6.4" fill="#403737"/>
  <circle cx="70" cy="62" r="1.8" fill="#fff"/><circle cx="96" cy="62" r="1.8" fill="#fff"/>
  <ellipse cx="60" cy="78" rx="6" ry="3.4" fill="#daa3a9" opacity=".55"/><ellipse cx="102" cy="78" rx="6" ry="3.4" fill="#daa3a9" opacity=".55"/>
  <path d="M72 82 Q81 90 90 82" fill="none" stroke="#403737" stroke-width="3" stroke-linecap="round"/>
  <path d="M38 34 Q80 6 122 34 L116 40 Q80 22 44 40 Z" fill="#64544c"/>
  <path d="M44 38 Q80 18 116 38 Q80 30 44 38Z" fill="#7d6b62"/>
  <rect x="44" y="34" width="72" height="7" rx="3" fill="#403737"/>
  <g transform="translate(118 104) rotate(-20)"><rect x="-4" y="6" width="8" height="30" rx="3" fill="#64544c"/><circle r="16" fill="#cbe0ea" stroke="#403737" stroke-width="5"/><path d="M-8 -6 Q-4 -10 2 -10" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/></g>
  <circle cx="112" cy="116" r="8" fill="#977861"/>
</g></svg>`;
}

export function logoSvg(width = 300): string {
  return `<svg viewBox="0 0 320 120" width="${width}" aria-label="抓猴大作戰">
  <g font-family="Huninn, 'PingFang TC', 'Noto Sans TC', sans-serif" font-weight="900" text-anchor="middle">
    <text x="160" y="72" font-size="62" fill="none" stroke="#56414e" stroke-width="16" stroke-linejoin="round" letter-spacing="4">抓猴大作戰</text>
    <text x="160" y="72" font-size="62" fill="#c9b57a" letter-spacing="4">抓猴大作戰</text>
    <text x="160" y="106" font-size="16" fill="#fff" letter-spacing="8">CATCH THE CHEATER</text>
  </g></svg>`;
}
