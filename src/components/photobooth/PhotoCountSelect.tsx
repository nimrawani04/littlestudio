import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import choiceBgUrl from "@/assets/photobooth-choice-bg.png";

interface PhotoCountSelectProps {
  onSelect: (n: number) => void;
  mode?: "camera" | "upload";
  onModeChange?: (mode: "camera" | "upload") => void;
  onBack?: () => void;
}

export function PhotoCountSelect({
  onSelect,
  mode = "camera",
  onModeChange,
  onBack,
}: PhotoCountSelectProps) {
  const [loaded, setLoaded] = useState(false);
  const [hoveredStrip, setHoveredStrip] = useState<number | null>(null);
  const [catSpeech, setCatSpeech] = useState(false);
  const [mirrorSpeech, setMirrorSpeech] = useState(false);
  const [wallSpeech, setWallSpeech] = useState(false);
  const [coinSpeech, setCoinSpeech] = useState(false);
  const [boardSpeech, setBoardSpeech] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleCatClick = () => {
    setCatSpeech(true);
    setTimeout(() => setCatSpeech(false), 2200);
  };

  const handleMirrorClick = () => {
    setMirrorSpeech(true);
    setTimeout(() => setMirrorSpeech(false), 2200);
  };

  const handleWallClick = () => {
    setWallSpeech(true);
    setTimeout(() => setWallSpeech(false), 2200);
  };

  const handleCoinClick = () => {
    setCoinSpeech(true);
    setTimeout(() => setCoinSpeech(false), 2200);
  };

  const handleBoardClick = () => {
    setBoardSpeech(true);
    setTimeout(() => setBoardSpeech(false), 2200);
  };

  return (
    <div className="w-screen h-screen bg-[#f5ede5] flex items-center justify-center overflow-hidden font-sans select-none relative m-0 p-0">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Quicksand:wght@600;700;800&display=swap');

        .pixel-text {
          font-family: 'Press Start 2P', monospace;
          image-rendering: pixelated;
        }

        /* Pulsing warm roof lamp glow */
        @keyframes pb-lamp-glow {
          0%, 100% {
            opacity: 0.6;
            filter: drop-shadow(0 0 6px rgba(255, 230, 150, 0.7));
          }
          50% {
            opacity: 0.95;
            filter: drop-shadow(0 0 16px rgba(255, 230, 150, 1));
          }
        }

        /* Twinkling star animation */
        @keyframes pb-star-twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(0.85);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        /* Gentle falling cherry blossom petal */
        @keyframes pb-petal-fall {
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
            transform: translateY(480px) rotate(360deg);
            opacity: 0;
          }
        }

        /* Film strip select hover pulse */
        @keyframes pb-strip-pulse {
          0%, 100% {
            box-shadow: 0 0 12px rgba(255, 117, 143, 0.5), inset 0 0 8px rgba(255, 117, 143, 0.3);
          }
          50% {
            box-shadow: 0 0 24px rgba(255, 117, 143, 0.95), inset 0 0 14px rgba(255, 117, 143, 0.6);
          }
        }
      `}</style>

      {/* Main Canvas Container: strictly locked to 1024x477 aspect ratio (Non-scrollable) */}
      <div
        className={`relative shadow-2xl transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: "min(100vw, calc(100vh * (1024 / 477)))",
          height: "min(100vh, calc(100vw * (477 / 1024)))",
          aspectRatio: "1024 / 477",
        }}
      >
        {/* ========================================= */}
        {/* 1. BASE PIXEL ART ENVIRONMENT             */}
        {/* ========================================= */}
        <img
          src={choiceBgUrl}
          alt="Pixel Photo Booth Film Choice"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          style={{ imageRendering: "pixelated" }}
        />

        {/* Back Button (links to home studio or previous step) */}
        <div className="absolute top-3 left-3 z-50 flex items-center gap-2">
          {onBack ? (
            <button
              onClick={onBack}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#fff0f3] border-2 border-[#5c3a1e] text-[#5c3a1e] text-[9px] font-bold shadow-[0_2px_0_#5c3a1e] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer pixel-text"
            >
              <span>←</span> BACK
            </button>
          ) : (
            <Link
              to="/"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#fff0f3] border-2 border-[#5c3a1e] text-[#5c3a1e] text-[9px] font-bold shadow-[0_2px_0_#5c3a1e] hover:-translate-y-0.5 active:translate-y-0 transition-all no-underline pixel-text"
            >
              <span>←</span> STUDIO
            </Link>
          )}

          {/* Camera vs Upload Mode Switcher */}
          {onModeChange && (
            <div className="flex items-center bg-[#fff0f3]/95 p-0.5 rounded-lg border-2 border-[#5c3a1e] shadow-[0_2px_0_#5c3a1e]">
              <button
                onClick={() => onModeChange("camera")}
                className={`px-2 py-0.5 rounded text-[8px] font-bold transition-all pixel-text ${
                  mode === "camera"
                    ? "bg-[#ff758f] text-white shadow-xs"
                    : "text-[#5c3a1e] hover:bg-[#ffe3eb]"
                }`}
              >
                📷 CAMERA
              </button>
              <button
                onClick={() => onModeChange("upload")}
                className={`px-2 py-0.5 rounded text-[8px] font-bold transition-all pixel-text ${
                  mode === "upload"
                    ? "bg-[#ff758f] text-white shadow-xs"
                    : "text-[#5c3a1e] hover:bg-[#ffe3eb]"
                }`}
              >
                📂 UPLOAD
              </button>
            </div>
          )}
        </div>

        {/* ========================================= */}
        {/* 2. TWINKLING STARS IN SKY                 */}
        {/* ========================================= */}
        <div
          className="absolute pointer-events-none text-white text-[12px]"
          style={{ left: "19.5%", top: "7.5%", animation: "pb-star-twinkle 3s ease-in-out infinite" }}
        >
          ✦
        </div>
        <div
          className="absolute pointer-events-none text-[#ffe8a3] text-[10px]"
          style={{ left: "93.5%", top: "5.5%", animation: "pb-star-twinkle 2.5s ease-in-out infinite 0.8s" }}
        >
          ✨
        </div>
        <div
          className="absolute pointer-events-none text-white text-[9px]"
          style={{ left: "82.5%", top: "18.5%", animation: "pb-star-twinkle 3.2s ease-in-out infinite 1.2s" }}
        >
          ✦
        </div>
        <div
          className="absolute pointer-events-none text-[#ffe8a3] text-[9px]"
          style={{ left: "14.5%", top: "16.0%", animation: "pb-star-twinkle 2.7s ease-in-out infinite 0.5s" }}
        >
          ✦
        </div>

        {/* ========================================= */}
        {/* 3. WARM GLOWING ROOF PENDANT LAMPS        */}
        {/* ========================================= */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: "35.5%",
            top: "4.5%",
            width: "30px",
            height: "30px",
            background: "radial-gradient(circle, rgba(255,230,150,0.8) 0%, transparent 70%)",
            animation: "pb-lamp-glow 3s ease-in-out infinite",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: "48.2%",
            top: "4.5%",
            width: "30px",
            height: "30px",
            background: "radial-gradient(circle, rgba(255,230,150,0.85) 0%, transparent 70%)",
            animation: "pb-lamp-glow 2.8s ease-in-out infinite 0.5s",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: "60.4%",
            top: "4.5%",
            width: "30px",
            height: "30px",
            background: "radial-gradient(circle, rgba(255,230,150,0.8) 0%, transparent 70%)",
            animation: "pb-lamp-glow 3.2s ease-in-out infinite 1s",
          }}
        />

        {/* ========================================= */}
        {/* 4. GENTLE FALLING CHERRY BLOSSOM PETALS   */}
        {/* ========================================= */}
        <div
          className="absolute pointer-events-none text-[#ffb3c1] text-[10px]"
          style={{ left: "12%", top: "-10px", animation: "pb-petal-fall 6s linear infinite" }}
        >
          🌸
        </div>
        <div
          className="absolute pointer-events-none text-[#ffccd5] text-[9px]"
          style={{ left: "28%", top: "-10px", animation: "pb-petal-fall 8s linear infinite 2s" }}
        >
          🌸
        </div>
        <div
          className="absolute pointer-events-none text-[#ffb3c1] text-[11px]"
          style={{ left: "75%", top: "-10px", animation: "pb-petal-fall 7s linear infinite 1s" }}
        >
          🌸
        </div>
        <div
          className="absolute pointer-events-none text-[#ffccd5] text-[8px]"
          style={{ left: "88%", top: "-10px", animation: "pb-petal-fall 6.5s linear infinite 3.5s" }}
        >
          🌸
        </div>

        {/* ========================================= */}
        {/* 5. INTERACTIVE 3 SHOTS FILM STRIP         */}
        {/* ========================================= */}
        <button
          onClick={() => onSelect(3)}
          onMouseEnter={() => setHoveredStrip(3)}
          onMouseLeave={() => setHoveredStrip(null)}
          className="absolute z-20 cursor-pointer rounded-xl transition-all duration-200 group"
          style={{
            left: "41.0%",
            top: "35.5%",
            width: "10.0%",
            height: "48.0%",
          }}
          title="Choose 3 Shots Photo Strip"
        >
          {/* Subtle glowing outline on hover */}
          <div
            className={`w-full h-full rounded-xl transition-all duration-200 ${
              hoveredStrip === 3
                ? "border-2 border-[#ff758f] scale-[1.03] shadow-[0_0_20px_rgba(255,117,143,0.7)]"
                : "border-2 border-transparent hover:border-[#ff758f]/40"
            }`}
            style={{
              animation: hoveredStrip === 3 ? "pb-strip-pulse 1.5s ease-in-out infinite" : undefined,
            }}
          />

          {/* Floating Hover Badge */}
          {hoveredStrip === 3 && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-[#3a1d28] border border-[#ff758f] text-white text-[8px] font-bold shadow-md z-30 pixel-text animate-bounce">
              ⭐ 3 Snaps • Classic
            </div>
          )}
        </button>

        {/* ========================================= */}
        {/* 6. INTERACTIVE 4 SHOTS FILM STRIP         */}
        {/* ========================================= */}
        <button
          onClick={() => onSelect(4)}
          onMouseEnter={() => setHoveredStrip(4)}
          onMouseLeave={() => setHoveredStrip(null)}
          className="absolute z-20 cursor-pointer rounded-xl transition-all duration-200 group"
          style={{
            left: "52.2%",
            top: "35.5%",
            width: "9.8%",
            height: "51.5%",
          }}
          title="Choose 4 Shots Photo Strip"
        >
          {/* Subtle glowing outline on hover */}
          <div
            className={`w-full h-full rounded-xl transition-all duration-200 ${
              hoveredStrip === 4
                ? "border-2 border-[#ff758f] scale-[1.03] shadow-[0_0_20px_rgba(255,117,143,0.7)]"
                : "border-2 border-transparent hover:border-[#ff758f]/40"
            }`}
            style={{
              animation: hoveredStrip === 4 ? "pb-strip-pulse 1.5s ease-in-out infinite" : undefined,
            }}
          />

          {/* Floating Hover Badge */}
          {hoveredStrip === 4 && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-[#3a1d28] border border-[#ff758f] text-[#ffd166] text-[8px] font-bold shadow-md z-30 pixel-text animate-bounce">
              💖 4 Snaps • Most Popular!
            </div>
          )}
        </button>

        {/* ========================================= */}
        {/* 7. EASTER EGGS: CAT, MIRROR, WALL, COIN   */}
        {/* ========================================= */}

        {/* Sleeping Cat on Roof */}
        <div
          onClick={handleCatClick}
          className="absolute z-20 cursor-pointer rounded-full"
          style={{
            left: "63.5%",
            top: "4.5%",
            width: "8.5%",
            height: "8.5%",
          }}
          title="Pet the studio kitty!"
        >
          {catSpeech && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#ff758f] text-[#7c2d12] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              Purr~ smile big! (=^･ω･^=) ♥
            </div>
          )}
        </div>

        {/* Pink Bow Mirror on Right */}
        <div
          onClick={handleMirrorClick}
          className="absolute z-20 cursor-pointer rounded-2xl hover:ring-2 hover:ring-[#ff758f]/50 transition-all"
          style={{
            left: "67.5%",
            top: "41.0%",
            width: "7.0%",
            height: "33.0%",
          }}
          title="Look in the mirror!"
        >
          {mirrorSpeech && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#ff758f] text-[#3a2210] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              You look gorgeous! ✨🪞
            </div>
          )}
        </div>

        {/* Framed Photo Wall on Left */}
        <div
          onClick={handleWallClick}
          className="absolute z-20 cursor-pointer rounded-lg hover:ring-2 hover:ring-[#ff758f]/50 transition-all"
          style={{
            left: "21.5%",
            top: "35.0%",
            width: "14.0%",
            height: "31.0%",
          }}
          title="Past photo strips on the wall"
        >
          {wallSpeech && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#ff758f] text-[#3a2210] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              12 memories in the wall! 📸
            </div>
          )}
        </div>

        {/* Heart Coin Slot / Dispenser */}
        <div
          onClick={handleCoinClick}
          className="absolute z-20 cursor-pointer rounded-lg hover:ring-2 hover:ring-[#ff758f]/50 transition-all"
          style={{
            left: "26.5%",
            top: "67.0%",
            width: "5.0%",
            height: "18.0%",
          }}
          title="Coin slot"
        >
          {coinSpeech && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-[#ffd166] border-2 border-[#5c3a1e] text-[#3a2210] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              *Clink!* Free token! 🪙✨
            </div>
          )}
        </div>

        {/* Chalkboard Sign on Bottom Right */}
        <div
          onClick={handleBoardClick}
          className="absolute z-20 cursor-pointer rounded-lg hover:ring-2 hover:ring-[#ff758f]/50 transition-all"
          style={{
            left: "77.5%",
            top: "69.0%",
            width: "11.0%",
            height: "27.0%",
          }}
          title="Chalkboard sign"
        >
          {boardSpeech && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-[#2a133d] border-2 border-[#ff758f] text-white text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              Smile, Capture, Cherish! ♥
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
