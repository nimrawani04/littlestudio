// 12 beautiful seasonal vector illustrations encoded as clean SVG data URIs
export const SAMPLE_MONTH_IMAGES: { month: string; url: string; title: string }[] = [
  {
    month: "January",
    title: "Cherry Blossom Sunrise",
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
      <defs>
        <linearGradient id="g1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="%23ffccd5"/>
          <stop offset="50%" stop-color="%23ffb3c1"/>
          <stop offset="100%" stop-color="%23fff0f3"/>
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(%23g1)"/>
      <circle cx="400" cy="220" r="110" fill="%23fff" opacity="0.6"/>
      <circle cx="400" cy="220" r="90" fill="%23ffe5ec" opacity="0.9"/>
      <path d="M 0 350 Q 200 310 400 340 T 800 330 L 800 450 L 0 450 Z" fill="%23590d22" opacity="0.8"/>
      <path d="M 0 380 Q 250 350 500 370 T 800 360 L 800 450 L 0 450 Z" fill="%232b0913"/>
      <text x="400" y="230" font-family="sans-serif" font-size="28" font-weight="bold" fill="%23590d22" text-anchor="middle">🌸 January • Cherry Blossom</text>
    </svg>`,
  },
  {
    month: "February",
    title: "Snowy Mountain Pine",
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
      <defs>
        <linearGradient id="g2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="%23a0c4ff"/>
          <stop offset="60%" stop-color="%23bde0fe"/>
          <stop offset="100%" stop-color="%23e2eafc"/>
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(%23g2)"/>
      <polygon points="400,100 240,380 560,380" fill="%234361ee" opacity="0.7"/>
      <polygon points="400,100 350,190 400,170 450,190" fill="%23ffffff"/>
      <polygon points="220,160 100,380 340,380" fill="%233f37c9" opacity="0.5"/>
      <polygon points="580,180 460,380 700,380" fill="%233f37c9" opacity="0.5"/>
      <rect y="380" width="800" height="70" fill="%23edf2f4"/>
      <text x="400" y="270" font-family="sans-serif" font-size="28" font-weight="bold" fill="%231e3d59" text-anchor="middle">🏔️ February • Winter Pines</text>
    </svg>`,
  },
  {
    month: "March",
    title: "Spring Tulip Field",
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
      <defs>
        <linearGradient id="g3" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="%23c7f9cc"/>
          <stop offset="60%" stop-color="%23d8f3dc"/>
          <stop offset="100%" stop-color="%23e8f5e9"/>
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(%23g3)"/>
      <circle cx="680" cy="120" r="60" fill="%23ffb703" opacity="0.8"/>
      <ellipse cx="200" cy="380" rx="400" ry="80" fill="%2352b788"/>
      <ellipse cx="600" cy="390" rx="350" ry="70" fill="%232d6a4f"/>
      <text x="400" y="240" font-family="sans-serif" font-size="28" font-weight="bold" fill="%231b4332" text-anchor="middle">🌷 March • Spring Tulips</text>
    </svg>`,
  },
  {
    month: "April",
    title: "Blooming Orchard",
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
      <defs>
        <linearGradient id="g4" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="%23fed9b7"/>
          <stop offset="50%" stop-color="%23fdf0d5"/>
          <stop offset="100%" stop-color="%23f7d6e0"/>
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(%23g4)"/>
      <circle cx="200" cy="160" r="80" fill="%23f28482" opacity="0.6"/>
      <circle cx="350" cy="140" r="90" fill="%23f6bd60" opacity="0.6"/>
      <circle cx="550" cy="150" r="85" fill="%23f28482" opacity="0.6"/>
      <path d="M 0 320 Q 200 280 400 310 T 800 300 L 800 450 L 0 450 Z" fill="%2384a59d"/>
      <text x="400" y="250" font-family="sans-serif" font-size="28" font-weight="bold" fill="%23583101" text-anchor="middle">🌺 April • Blossom Bloom</text>
    </svg>`,
  },
  {
    month: "May",
    title: "Emerald Summer Hills",
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
      <defs>
        <linearGradient id="g5" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="%2399e2b4"/>
          <stop offset="100%" stop-color="%2388d4ab"/>
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(%23g5)"/>
      <circle cx="400" cy="140" r="70" fill="%23fff" opacity="0.8"/>
      <path d="M 0 280 Q 250 220 500 270 T 800 250 L 800 450 L 0 450 Z" fill="%2356ab91"/>
      <path d="M 0 340 Q 200 300 450 330 T 800 320 L 800 450 L 0 450 Z" fill="%23358f80"/>
      <text x="400" y="240" font-family="sans-serif" font-size="28" font-weight="bold" fill="%23004b23" text-anchor="middle">🌿 May • Summer Hills</text>
    </svg>`,
  },
  {
    month: "June",
    title: "Sunny Blue Shore",
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
      <defs>
        <linearGradient id="g6" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="%2390e0ef"/>
          <stop offset="70%" stop-color="%23caf0f8"/>
          <stop offset="100%" stop-color="%23ffeedb"/>
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(%23g6)"/>
      <circle cx="150" cy="110" r="50" fill="%23ffb703"/>
      <path d="M 0 320 C 200 300 400 340 800 310 L 800 450 L 0 450 Z" fill="%230077b6" opacity="0.6"/>
      <path d="M 0 360 C 250 330 500 370 800 350 L 800 450 L 0 450 Z" fill="%23e9c46a"/>
      <text x="400" y="240" font-family="sans-serif" font-size="28" font-weight="bold" fill="%2303045e" text-anchor="middle">🌊 June • Summer Beach</text>
    </svg>`,
  },
  {
    month: "July",
    title: "Golden Sunflower Field",
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
      <defs>
        <linearGradient id="g7" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="%23ffe6a7"/>
          <stop offset="60%" stop-color="%23fff3b0"/>
          <stop offset="100%" stop-color="%23bb9457"/>
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(%23g7)"/>
      <circle cx="400" cy="130" r="80" fill="%23fb8500" opacity="0.5"/>
      <path d="M 0 320 Q 250 280 500 310 T 800 300 L 800 450 L 0 450 Z" fill="%236f1d1b"/>
      <text x="400" y="240" font-family="sans-serif" font-size="28" font-weight="bold" fill="%2343281c" text-anchor="middle">🌻 July • Golden Sunflowers</text>
    </svg>`,
  },
  {
    month: "August",
    title: "Tropical Sunset",
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
      <defs>
        <linearGradient id="g8" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="%23f72585"/>
          <stop offset="40%" stop-color="%237209b7"/>
          <stop offset="80%" stop-color="%233a0ca3"/>
          <stop offset="100%" stop-color="%234361ee"/>
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(%23g8)"/>
      <circle cx="400" cy="220" r="80" fill="%23ffb703" opacity="0.9"/>
      <path d="M 0 350 Q 200 330 400 350 T 800 340 L 800 450 L 0 450 Z" fill="%2310002b"/>
      <text x="400" y="270" font-family="sans-serif" font-size="28" font-weight="bold" fill="%23ffffff" text-anchor="middle">🏖️ August • Tropical Dusk</text>
    </svg>`,
  },
  {
    month: "September",
    title: "Autumn Maple Woods",
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
      <defs>
        <linearGradient id="g9" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="%23e76f51"/>
          <stop offset="50%" stop-color="%23f4a261"/>
          <stop offset="100%" stop-color="%23e9c46a"/>
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(%23g9)"/>
      <path d="M 0 300 Q 200 260 400 290 T 800 280 L 800 450 L 0 450 Z" fill="%239c6644"/>
      <path d="M 0 360 Q 250 320 500 350 T 800 340 L 800 450 L 0 450 Z" fill="%237f4f24"/>
      <text x="400" y="240" font-family="sans-serif" font-size="28" font-weight="bold" fill="%23ffffff" text-anchor="middle">🍁 September • Autumn Leaves</text>
    </svg>`,
  },
  {
    month: "October",
    title: "Cozy Pumpkin Patch",
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
      <defs>
        <linearGradient id="g10" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="%233a0ca3"/>
          <stop offset="60%" stop-color="%237209b7"/>
          <stop offset="100%" stop-color="%23f72585"/>
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(%23g10)"/>
      <circle cx="680" cy="120" r="50" fill="%23ffe6a7"/>
      <circle cx="400" cy="380" r="100" fill="%23f77f00"/>
      <circle cx="300" cy="400" r="70" fill="%23d62828"/>
      <circle cx="500" cy="400" r="80" fill="%23fcbf49"/>
      <text x="400" y="260" font-family="sans-serif" font-size="28" font-weight="bold" fill="%23ffffff" text-anchor="middle">🎃 October • Pumpkin Season</text>
    </svg>`,
  },
  {
    month: "November",
    title: "Golden Amber Woods",
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
      <defs>
        <linearGradient id="g11" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="%23dda15e"/>
          <stop offset="60%" stop-color="%23bc6c25"/>
          <stop offset="100%" stop-color="%23283618"/>
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(%23g11)"/>
      <path d="M 0 330 Q 250 300 500 320 T 800 310 L 800 450 L 0 450 Z" fill="%23606c38"/>
      <text x="400" y="240" font-family="sans-serif" font-size="28" font-weight="bold" fill="%23fefae0" text-anchor="middle">🍂 November • Warm Harvest</text>
    </svg>`,
  },
  {
    month: "December",
    title: "Winter Starlight Holiday",
    url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="450" viewBox="0 0 800 450">
      <defs>
        <linearGradient id="g12" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="%2303045e"/>
          <stop offset="60%" stop-color="%23023e8a"/>
          <stop offset="100%" stop-color="%230077b6"/>
        </linearGradient>
      </defs>
      <rect width="800" height="450" fill="url(%23g12)"/>
      <polygon points="400,160 330,280 470,280" fill="%232d6a4f"/>
      <polygon points="400,220 310,340 490,340" fill="%231b4332"/>
      <polygon points="400,280 290,400 510,400" fill="%23081c15"/>
      <circle cx="400" cy="155" r="10" fill="%23ffd166"/>
      <rect y="400" width="800" height="50" fill="%23ffffff"/>
      <text x="400" y="260" font-family="sans-serif" font-size="28" font-weight="bold" fill="%23ffffff" text-anchor="middle">🎄 December • Winter Lights</text>
    </svg>`,
  },
];
