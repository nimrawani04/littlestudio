import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import templateBgUrl from "@/assets/photobooth-template-bg.png";

export type BoothTemplate = {
  id: string;
  name: string;
  emoji: string;
  bg: string;
  border: string;
  accent: string;
  textColor: string;
  labelBg: string;
};

export const BOOTH_TEMPLATES: BoothTemplate[] = [
  {
    id: "pastel",
    name: "Pastel Pink",
    emoji: "💗",
    bg: "linear-gradient(180deg, #ffe4f0, #ffc2d9)",
    border: "#d63384",
    accent: "#ff69b4",
    textColor: "#8b1a56",
    labelBg: "#fff0f5",
  },
  {
    id: "floral",
    name: "Floral Vines",
    emoji: "🌸",
    bg: "linear-gradient(180deg, #f0fff0, #d4edda)",
    border: "#2d8b4e",
    accent: "#6bcf7f",
    textColor: "#1a5c32",
    labelBg: "#e8f5e9",
  },
  {
    id: "dark",
    name: "Dark Stone",
    emoji: "🖤",
    bg: "linear-gradient(180deg, #2d2d2d, #1a1a1a)",
    border: "#555",
    accent: "#888",
    textColor: "#e0e0e0",
    labelBg: "#333",
  },
  {
    id: "kawaii",
    name: "Kawaii Hearts",
    emoji: "🧸",
    bg: "linear-gradient(180deg, #fff0f5, #ffe4ec)",
    border: "#ff69b4",
    accent: "#ff1493",
    textColor: "#c71585",
    labelBg: "#fff5f8",
  },
  {
    id: "vintage",
    name: "Vintage Sepia",
    emoji: "📸",
    bg: "linear-gradient(180deg, #f5e6d0, #e8d5b8)",
    border: "#8b7355",
    accent: "#a0845c",
    textColor: "#5c4033",
    labelBg: "#faf0e4",
  },
];

interface TemplateSelectProps {
  selected: string;
  onSelect: (id: string) => void;
  onContinue: () => void;
  onBack?: () => void;
}

export function TemplateSelect({
  selected,
  onSelect,
  onContinue,
  onBack,
}: TemplateSelectProps) {
  const [loaded, setLoaded] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Easter eggs
  const [catSpeech, setCatSpeech] = useState(false);
  const [boardSpeech, setBoardSpeech] = useState(false);
  const [cameraSpeech, setCameraSpeech] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const cardLayouts: Record<
    string,
    { left: string; top: string; width: string; height: string }
  > = {
    pastel: { left: "30.8%", top: "21.0%", width: "12.3%", height: "29.0%" },
    floral: { left: "43.7%", top: "21.0%", width: "12.3%", height: "29.0%" },
    dark: { left: "56.6%", top: "21.0%", width: "12.3%", height: "29.0%" },
    kawaii: { left: "37.2%", top: "53.5%", width: "12.4%", height: "29.0%" },
    vintage: { left: "50.1%", top: "53.5%", width: "12.4%", height: "29.0%" },
  };

  return (
    <div className="w-screen h-screen bg-[#1c0b2b] flex items-center justify-center overflow-hidden font-sans select-none relative m-0 p-0">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Quicksand:wght@600;700;800&display=swap');

        .pixel-text {
          font-family: 'Press Start 2P', monospace;
          image-rendering: pixelated;
        }

        @keyframes tpl-star-twinkle {
          0%, 100% { opacity: 0.35; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.15); }
        }

        @keyframes tpl-lamp-glow {
          0%, 100% {
            opacity: 0.55;
            filter: drop-shadow(0 0 6px rgba(255, 230, 150, 0.6));
          }
          50% {
            opacity: 0.95;
            filter: drop-shadow(0 0 16px rgba(255, 230, 150, 0.95));
          }
        }

        .tpl-btn-hover:hover {
          transform: translateY(-2px) scale(1.02);
        }

        .tpl-btn-hover:active {
          transform: translateY(1px) scale(0.98);
        }
      `}</style>

      {/* Main Canvas Container: strictly locked to 1024x576 aspect ratio (16:9, Non-scrollable) */}
      <div
        className={`relative shadow-2xl transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: "min(100vw, calc(100vh * (1024 / 576)))",
          height: "min(100vh, calc(100vw * (576 / 1024)))",
          aspectRatio: "1024 / 576",
        }}
      >
        {/* ========================================= */}
        {/* 1. BASE PIXEL ART ENVIRONMENT             */}
        {/* ========================================= */}
        <img
          src={templateBgUrl}
          alt="Choose Your Vibe"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          style={{ imageRendering: "pixelated" }}
        />

        {/* Back / Navigation Link */}
        <div className="absolute top-3 left-3 z-50 flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2a133d] border-2 border-[#f8a4c8] text-[#f8a4c8] text-[9px] font-bold shadow-[0_2px_0_#1a0826] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer pixel-text"
            >
              <span>←</span> BACK
            </button>
          )}
          <Link
            to="/"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2a133d] border-2 border-[#f8a4c8] text-[#f8a4c8] text-[9px] font-bold shadow-[0_2px_0_#1a0826] hover:-translate-y-0.5 active:translate-y-0 transition-all no-underline pixel-text"
          >
            <span>←</span> STUDIO
          </Link>
        </div>

        {/* ========================================= */}
        {/* 2. TWINKLING STARS IN SKY                 */}
        {/* ========================================= */}
        <div
          className="absolute pointer-events-none text-white text-[12px]"
          style={{ left: "12.5%", top: "8.5%", animation: "tpl-star-twinkle 3s ease-in-out infinite" }}
        >
          ✦
        </div>
        <div
          className="absolute pointer-events-none text-[#ffe8a3] text-[10px]"
          style={{ left: "26.5%", top: "14.0%", animation: "tpl-star-twinkle 2.5s ease-in-out infinite 0.7s" }}
        >
          ✨
        </div>
        <div
          className="absolute pointer-events-none text-white text-[9px]"
          style={{ left: "71.5%", top: "12.5%", animation: "tpl-star-twinkle 3.2s ease-in-out infinite 1.2s" }}
        >
          ✦
        </div>
        <div
          className="absolute pointer-events-none text-[#ffe8a3] text-[9px]"
          style={{ left: "85.0%", top: "18.0%", animation: "tpl-star-twinkle 2.7s ease-in-out infinite 0.5s" }}
        >
          ✦
        </div>

        {/* ========================================= */}
        {/* 3. WARM GLOWING PERGOLA LANTERNS          */}
        {/* ========================================= */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: "7.0%",
            top: "16.0%",
            width: "36px",
            height: "50px",
            background: "radial-gradient(circle, rgba(255,225,130,0.5) 0%, transparent 70%)",
            animation: "tpl-lamp-glow 2.8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: "88.0%",
            top: "16.0%",
            width: "36px",
            height: "50px",
            background: "radial-gradient(circle, rgba(255,225,130,0.5) 0%, transparent 70%)",
            animation: "tpl-lamp-glow 2.8s ease-in-out infinite 1.4s",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: "7.5%",
            top: "52.0%",
            width: "30px",
            height: "44px",
            background: "radial-gradient(circle, rgba(255,225,130,0.45) 0%, transparent 70%)",
            animation: "tpl-lamp-glow 3s ease-in-out infinite 0.5s",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: "91.8%",
            top: "52.0%",
            width: "30px",
            height: "44px",
            background: "radial-gradient(circle, rgba(255,225,130,0.45) 0%, transparent 70%)",
            animation: "tpl-lamp-glow 3s ease-in-out infinite 1.8s",
          }}
        />

        {/* ========================================= */}
        {/* 4. INTERACTIVE TEMPLATE CARDS             */}
        {/* ========================================= */}
        {BOOTH_TEMPLATES.map((t) => {
          const layout = cardLayouts[t.id];
          if (!layout) return null;
          const isSelected = selected === t.id;
          const isHovered = hoveredCard === t.id;

          return (
            <button
              key={t.id}
              onClick={() => onSelect(t.id)}
              onMouseEnter={() => setHoveredCard(t.id)}
              onMouseLeave={() => setHoveredCard(null)}
              className="absolute z-20 cursor-pointer rounded-2xl transition-all duration-150 focus:outline-none"
              style={{
                left: layout.left,
                top: layout.top,
                width: layout.width,
                height: layout.height,
              }}
              title={`Choose ${t.name} template`}
            >
              {/* Highlight / glowing border around card */}
              <div
                className={`w-full h-full rounded-2xl transition-all duration-150 ${
                  isSelected
                    ? "border-[3px] border-[#ff758f] shadow-[0_0_18px_rgba(255,117,143,0.95)] ring-2 ring-white/60"
                    : isHovered
                    ? "border-2 border-[#ff758f]/80 shadow-[0_0_10px_rgba(255,117,143,0.6)]"
                    : "border-2 border-transparent"
                }`}
              />

              {/* Selected check badge */}
              {isSelected && (
                <div className="absolute -top-3 -right-2 bg-[#ff758f] text-white text-[9px] px-1.5 py-0.5 rounded-full border-2 border-white shadow-md pixel-text animate-bounce">
                  ✓
                </div>
              )}
            </button>
          );
        })}

        {/* ========================================= */}
        {/* 5. CONTINUE TO EDITOR BUTTON              */}
        {/* ========================================= */}
        <button
          onClick={onContinue}
          className="absolute z-20 cursor-pointer transition-all duration-150 tpl-btn-hover rounded-xl focus:outline-none"
          style={{
            left: "36.8%",
            top: "85.2%",
            width: "26.4%",
            height: "9.2%",
          }}
          title="Continue to Decorator & Stickers"
        >
          {/* Subtle glowing ring on hover */}
          <div className="w-full h-full rounded-xl hover:ring-2 hover:ring-white/80 transition-all" />
        </button>

        {/* ========================================= */}
        {/* 6. EASTER EGGS: CAT, BOARD, CAMERA        */}
        {/* ========================================= */}

        {/* Sleeping Cat on Patio */}
        <div
          onClick={() => {
            setCatSpeech(true);
            setTimeout(() => setCatSpeech(false), 2400);
          }}
          className="absolute z-20 cursor-pointer rounded-full"
          style={{
            left: "4.5%",
            top: "73.0%",
            width: "9.5%",
            height: "11.5%",
          }}
          title="Pet the cat!"
        >
          {catSpeech && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#ff758f] text-[#7c2d12] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              Purr~ adorable vibes! (=^･ω･^=) ♥
            </div>
          )}
        </div>

        {/* Chalkboard Sign */}
        <div
          onClick={() => {
            setBoardSpeech(true);
            setTimeout(() => setBoardSpeech(false), 2400);
          }}
          className="absolute z-20 cursor-pointer rounded-lg hover:ring-2 hover:ring-[#ff758f]/40 transition-all"
          style={{
            left: "81.5%",
            top: "66.0%",
            width: "11.5%",
            height: "26.0%",
          }}
          title="Studio chalkboard"
        >
          {boardSpeech && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-[#2a133d] border-2 border-[#ff758f] text-[#ffccd5] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              ✨ Smile • Capture • Cherish ✨
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
