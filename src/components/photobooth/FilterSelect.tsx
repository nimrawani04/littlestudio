import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import filterBgUrl from "@/assets/photobooth-filter-bg.png";

export type BoothFilter = {
  id: string;
  name: string;
  emoji: string;
  cssFilter: string;
  vibe: string;
  box: { left: string; top: string; width: string; height: string };
};

export const BOOTH_FILTERS: BoothFilter[] = [
  {
    id: "none",
    name: "No Filter",
    emoji: "✨",
    cssFilter: "none",
    vibe: "✨ Crisp & Natural",
    box: { left: "31.05%", top: "32.09%", width: "11.62%", height: "20.67%" },
  },
  {
    id: "grayscale",
    name: "Black & White",
    emoji: "🏁",
    cssFilter: "grayscale(100%)",
    vibe: "🏁 Classic Monochrome",
    box: { left: "44.53%", top: "32.09%", width: "11.62%", height: "20.67%" },
  },
  {
    id: "sepia",
    name: "Vintage Sepia",
    emoji: "🎞️",
    cssFilter: "sepia(80%)",
    vibe: "🎞️ Nostalgic Warmth",
    box: { left: "57.91%", top: "32.09%", width: "11.62%", height: "20.67%" },
  },
  {
    id: "warm",
    name: "Warm Glow",
    emoji: "🌅",
    cssFilter: "sepia(20%) saturate(140%)",
    vibe: "🌅 Golden Sunset",
    box: { left: "31.05%", top: "53.74%", width: "11.62%", height: "20.67%" },
  },
  {
    id: "cool",
    name: "Cyber Cool",
    emoji: "❄️",
    cssFilter: "hue-rotate(180deg) saturate(120%)",
    vibe: "❄️ Cyber Neon",
    box: { left: "44.53%", top: "53.74%", width: "11.62%", height: "20.67%" },
  },
  {
    id: "pixel",
    name: "Pixel Retro",
    emoji: "👾",
    cssFilter: "contrast(120%) saturate(80%)",
    vibe: "👾 8-Bit Arcade",
    box: { left: "57.91%", top: "53.74%", width: "11.62%", height: "20.67%" },
  },
];

interface FilterSelectProps {
  selected: string;
  onSelect: (id: string) => void;
  onNext: () => void;
  onBack?: () => void;
}

export function FilterSelect({
  selected,
  onSelect,
  onNext,
  onBack,
}: FilterSelectProps) {
  const [loaded, setLoaded] = useState(false);
  const [hoveredFilter, setHoveredFilter] = useState<string | null>(null);
  const [roofCatSpeech, setRoofCatSpeech] = useState(false);
  const [sleepCatSpeech, setSleepCatSpeech] = useState(false);
  const [boardSpeech, setBoardSpeech] = useState(false);
  const [cameraSpeech, setCameraSpeech] = useState(false);
  const [polaroidSpeech, setPolaroidSpeech] = useState(false);
  const [moonSpeech, setMoonSpeech] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const triggerBubble = (setter: (v: boolean) => void) => {
    setter(true);
    setTimeout(() => setter(false), 2200);
  };

  const selectedFilterObj =
    BOOTH_FILTERS.find((f) => f.id === selected) || BOOTH_FILTERS[0];

  return (
    <div className="w-screen h-screen bg-[#1c0b2b] flex items-center justify-center overflow-hidden font-sans select-none relative m-0 p-0">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Quicksand:wght@600;700;800&display=swap');

        .pixel-text {
          font-family: 'Press Start 2P', monospace;
          image-rendering: pixelated;
        }

        /* Pulsing warm roof lamp glow */
        @keyframes fl-lamp-glow {
          0%, 100% {
            opacity: 0.65;
            filter: drop-shadow(0 0 8px rgba(255, 230, 150, 0.7));
          }
          50% {
            opacity: 0.95;
            filter: drop-shadow(0 0 18px rgba(255, 230, 150, 1));
          }
        }

        /* Twinkling star animation */
        @keyframes fl-star-twinkle {
          0%, 100% {
            opacity: 0.35;
            transform: scale(0.85);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        /* Gentle falling cherry blossom petal */
        @keyframes fl-petal-fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.9;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(520px) rotate(360deg);
            opacity: 0;
          }
        }

        /* Selected filter card pulsing neon border */
        @keyframes fl-card-selected {
          0%, 100% {
            box-shadow: 0 0 12px rgba(255, 117, 143, 0.75), inset 0 0 8px rgba(255, 117, 143, 0.4);
          }
          50% {
            box-shadow: 0 0 24px rgba(255, 117, 143, 1), inset 0 0 14px rgba(255, 117, 143, 0.7);
          }
        }

        /* Set Filter button hover pulse */
        @keyframes fl-btn-pulse {
          0%, 100% {
            box-shadow: 0 0 12px rgba(255, 105, 180, 0.6);
          }
          50% {
            box-shadow: 0 0 22px rgba(255, 105, 180, 0.95);
          }
        }
      `}</style>

      {/* Main Canvas Container: strictly locked to 1024x508 aspect ratio (No scrollbars) */}
      <div
        className={`relative shadow-2xl transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: "min(100vw, calc(100vh * (1024 / 508)))",
          height: "min(100vh, calc(100vw * (508 / 1024)))",
          aspectRatio: "1024 / 508",
        }}
      >
        {/* ========================================= */}
        {/* 1. BASE PIXEL ART ENVIRONMENT             */}
        {/* ========================================= */}
        <img
          src={filterBgUrl}
          alt="Choose a Filter Pixel Art Booth"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          style={{ imageRendering: "pixelated" }}
        />

        {/* Back Button (links to previous step or home) */}
        <div className="absolute top-3 left-3 z-50 flex items-center gap-2">
          {onBack ? (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2a133d] border-2 border-[#ff758f] text-[#ffccd5] text-[9px] font-bold shadow-[0_2px_0_#150524] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer pixel-text"
            >
              <span>←</span> BACK
            </button>
          ) : (
            <Link
              to="/"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2a133d] border-2 border-[#ff758f] text-[#ffccd5] text-[9px] font-bold shadow-[0_2px_0_#150524] hover:-translate-y-0.5 active:translate-y-0 transition-all no-underline pixel-text"
            >
              <span>←</span> STUDIO
            </Link>
          )}

          {/* Active Filter Pill Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2a133d]/90 border border-[#ff758f]/60 text-white text-[8px] font-bold shadow-xs pixel-text">
            <span>FILTER:</span>
            <span className="text-[#ffd166]">{selectedFilterObj.name}</span>
          </div>
        </div>

        {/* ========================================= */}
        {/* 2. TWINKLING STARS IN TWILIGHT SKY        */}
        {/* ========================================= */}
        <div
          className="absolute pointer-events-none text-white text-[11px]"
          style={{ left: "14.5%", top: "7.0%", animation: "fl-star-twinkle 3s ease-in-out infinite" }}
        >
          ✦
        </div>
        <div
          className="absolute pointer-events-none text-[#ffe8a3] text-[10px]"
          style={{ left: "28.5%", top: "4.5%", animation: "fl-star-twinkle 2.5s ease-in-out infinite 0.7s" }}
        >
          ✨
        </div>
        <div
          className="absolute pointer-events-none text-white text-[9px]"
          style={{ left: "78.0%", top: "6.5%", animation: "fl-star-twinkle 3.2s ease-in-out infinite 1.2s" }}
        >
          ✦
        </div>
        <div
          className="absolute pointer-events-none text-[#ffe8a3] text-[9px]"
          style={{ left: "95.0%", top: "16.0%", animation: "fl-star-twinkle 2.8s ease-in-out infinite 0.4s" }}
        >
          ✦
        </div>

        {/* ========================================= */}
        {/* 3. WARM GLOWING ROOF PENDANT LAMPS        */}
        {/* ========================================= */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: "34.8%",
            top: "2.5%",
            width: "32px",
            height: "32px",
            background: "radial-gradient(circle, rgba(255,230,150,0.85) 0%, transparent 70%)",
            animation: "fl-lamp-glow 3s ease-in-out infinite",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: "49.6%",
            top: "2.5%",
            width: "32px",
            height: "32px",
            background: "radial-gradient(circle, rgba(255,230,150,0.9) 0%, transparent 70%)",
            animation: "fl-lamp-glow 2.7s ease-in-out infinite 0.6s",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: "64.0%",
            top: "2.5%",
            width: "32px",
            height: "32px",
            background: "radial-gradient(circle, rgba(255,230,150,0.85) 0%, transparent 70%)",
            animation: "fl-lamp-glow 3.2s ease-in-out infinite 1.1s",
          }}
        />

        {/* Left Street Lamp Glow */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: "14.8%",
            top: "33.0%",
            width: "40px",
            height: "40px",
            background: "radial-gradient(circle, rgba(255,210,120,0.7) 0%, transparent 70%)",
            animation: "fl-lamp-glow 3.5s ease-in-out infinite",
          }}
        />

        {/* ========================================= */}
        {/* 4. GENTLE FALLING CHERRY BLOSSOM PETALS   */}
        {/* ========================================= */}
        <div
          className="absolute pointer-events-none text-[#ffb3c1] text-[10px]"
          style={{ left: "10%", top: "-10px", animation: "fl-petal-fall 6s linear infinite" }}
        >
          🌸
        </div>
        <div
          className="absolute pointer-events-none text-[#ffccd5] text-[9px]"
          style={{ left: "26%", top: "-10px", animation: "fl-petal-fall 7.5s linear infinite 1.8s" }}
        >
          🌸
        </div>
        <div
          className="absolute pointer-events-none text-[#ffb3c1] text-[11px]"
          style={{ left: "74%", top: "-10px", animation: "fl-petal-fall 6.8s linear infinite 0.9s" }}
        >
          🌸
        </div>
        <div
          className="absolute pointer-events-none text-[#ffccd5] text-[8px]"
          style={{ left: "89%", top: "-10px", animation: "fl-petal-fall 6.2s linear infinite 3.2s" }}
        >
          🌸
        </div>

        {/* ========================================= */}
        {/* 5. 6 INTERACTIVE FILTER CARDS             */}
        {/* ========================================= */}
        {BOOTH_FILTERS.map((f) => {
          const isSelected = selected === f.id;
          const isHovered = hoveredFilter === f.id;

          return (
            <button
              key={f.id}
              onClick={() => onSelect(f.id)}
              onMouseEnter={() => setHoveredFilter(f.id)}
              onMouseLeave={() => setHoveredFilter(null)}
              className="absolute z-20 cursor-pointer rounded-xl transition-all duration-200 group p-0 m-0 border-0 bg-transparent"
              style={{
                left: f.box.left,
                top: f.box.top,
                width: f.box.width,
                height: f.box.height,
              }}
              title={`Select ${f.name} Filter`}
            >
              {/* Highlight / Outline Overlay */}
              <div
                className={`w-full h-full rounded-xl transition-all duration-200 relative ${
                  isSelected
                    ? "border-[3px] border-[#ff758f] scale-[1.03]"
                    : isHovered
                    ? "border-2 border-[#ff758f]/70 scale-[1.015] shadow-[0_0_12px_rgba(255,117,143,0.5)]"
                    : "border-2 border-transparent"
                }`}
                style={{
                  animation: isSelected ? "fl-card-selected 1.8s ease-in-out infinite" : undefined,
                }}
              >
                {/* Selected Checkmark Badge (top-right of card) */}
                {isSelected && (
                  <div className="absolute -top-2.5 -right-2.5 px-1.5 py-0.5 rounded-full bg-[#ff758f] text-white text-[7px] font-extrabold shadow-md z-30 pixel-text animate-bounce">
                    ♥ ✓
                  </div>
                )}
              </div>

              {/* Floating Hover Vibe Badge */}
              {isHovered && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-[#2a133d] border border-[#ff758f] text-[#ffd166] text-[7.5px] font-bold shadow-md z-30 pixel-text pointer-events-none">
                  {f.vibe}
                </div>
              )}
            </button>
          );
        })}

        {/* ========================================= */}
        {/* 6. SET FILTER BUTTON                      */}
        {/* ========================================= */}
        <button
          onClick={onNext}
          className="absolute z-30 cursor-pointer rounded-xl transition-all duration-200 group flex items-center justify-center border-0 bg-transparent p-0 m-0"
          style={{
            left: "39.45%",
            top: "75.98%",
            width: "21.09%",
            height: "9.65%",
          }}
          title="Apply filter and proceed"
        >
          {/* Subtle pulse and hover highlight */}
          <div
            className="w-full h-full rounded-xl border-2 border-transparent hover:border-white/60 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 flex items-center justify-center"
            style={{
              animation: "fl-btn-pulse 2s ease-in-out infinite",
            }}
          />
        </button>

        {/* ========================================= */}
        {/* 7. EASTER EGGS: CATS, CHALKBOARD, CAMERA  */}
        {/* ========================================= */}

        {/* White Cat on Roof (top right of sign) */}
        <div
          onClick={() => triggerBubble(setRoofCatSpeech)}
          className="absolute z-30 cursor-pointer rounded-full"
          style={{
            left: "67.5%",
            top: "3.5%",
            width: "8.5%",
            height: "9.5%",
          }}
          title="Pet the roof kitty!"
        >
          {roofCatSpeech && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#ff758f] text-[#7c2d12] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              Purr~ love this twilight! (=^･ω･^=) ♥
            </div>
          )}
        </div>

        {/* Sleeping Calico Cat on Ground */}
        <div
          onClick={() => triggerBubble(setSleepCatSpeech)}
          className="absolute z-30 cursor-pointer rounded-2xl"
          style={{
            left: "23.5%",
            top: "83.5%",
            width: "12.0%",
            height: "11.0%",
          }}
          title="Shh, sleeping kitty!"
        >
          {sleepCatSpeech && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#ff758f] text-[#3a2210] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              Zzz... dreaming of sunny naps... 🐟💤
            </div>
          )}
        </div>

        {/* Chalkboard Sign on Left */}
        <div
          onClick={() => triggerBubble(setBoardSpeech)}
          className="absolute z-30 cursor-pointer rounded-lg hover:ring-2 hover:ring-[#ff758f]/40 transition-all"
          style={{
            left: "1.0%",
            top: "61.0%",
            width: "15.5%",
            height: "34.5%",
          }}
          title="Chalkboard sign"
        >
          {boardSpeech && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-[#2a133d] border-2 border-[#ff758f] text-white text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              Smile, Capture, Cherish, Repeat! ♥
            </div>
          )}
        </div>

        {/* Instant Camera on Right Table */}
        <div
          onClick={() => triggerBubble(setCameraSpeech)}
          className="absolute z-30 cursor-pointer rounded-lg hover:ring-2 hover:ring-[#ff758f]/40 transition-all"
          style={{
            left: "80.5%",
            top: "66.5%",
            width: "10.5%",
            height: "15.0%",
          }}
          title="Instant camera"
        >
          {cameraSpeech && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-[#fff0f3] border-2 border-[#ff758f] text-[#5c3a1e] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              *Snap!* Ready for your photos! 📸✨
            </div>
          )}
        </div>

        {/* Polaroid Cards on Right Table */}
        <div
          onClick={() => triggerBubble(setPolaroidSpeech)}
          className="absolute z-30 cursor-pointer rounded-lg hover:ring-2 hover:ring-[#ff758f]/40 transition-all"
          style={{
            left: "83.5%",
            top: "80.5%",
            width: "13.5%",
            height: "16.5%",
          }}
          title="Polaroid prints"
        >
          {polaroidSpeech && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-[#fff0f3] border-2 border-[#ff758f] text-[#5c3a1e] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              Freshly printed memories! 🖼️💖
            </div>
          )}
        </div>

        {/* Crescent Moon in Twilight Sky */}
        <div
          onClick={() => triggerBubble(setMoonSpeech)}
          className="absolute z-30 cursor-pointer rounded-full"
          style={{
            left: "86.4%",
            top: "7.5%",
            width: "6.5%",
            height: "13.5%",
          }}
          title="The glowing crescent moon"
        >
          {moonSpeech && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-[#2a133d] border-2 border-[#ffd166] text-[#ffe8a3] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              Good evening, superstar! 🌙✨
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
