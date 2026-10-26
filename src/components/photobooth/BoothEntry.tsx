import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import photoboothBgUrl from "@/assets/photobooth-bg.png";
import curtainLeftUrl from "@/assets/curtain-left.png";
import curtainRightUrl from "@/assets/curtain-right.png";
import enterSignUrl from "@/assets/enter-sign-transparent.png";

export function BoothEntry({ onEnter }: { onEnter: () => void }) {
  const [opening, setOpening] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [catSpeech, setCatSpeech] = useState(false);
  const [mirrorSpeech, setMirrorSpeech] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleEnter = () => {
    if (opening) return;
    setOpening(true);
    setTimeout(onEnter, 900); // Wait for curtains to open and warm flash
  };

  const handleCatClick = () => {
    setCatSpeech(true);
    setTimeout(() => setCatSpeech(false), 2000);
  };

  const handleMirrorClick = () => {
    setMirrorSpeech(true);
    setTimeout(() => setMirrorSpeech(false), 2000);
  };

  return (
    <div className="w-screen h-screen bg-[#f5ede5] flex items-center justify-center overflow-hidden font-sans select-none relative m-0 p-0">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Quicksand:wght@600;700;800&display=swap');

        /* Gentle curtain idle swaying / rippling */
        @keyframes curtain-sway-left {
          0%, 100% {
            transform: skewX(0deg) scaleX(1);
          }
          30% {
            transform: skewX(-2deg) scaleX(0.97);
          }
          70% {
            transform: skewX(1.5deg) scaleX(1.02);
          }
        }

        @keyframes curtain-sway-right {
          0%, 100% {
            transform: skewX(0deg) scaleX(1);
          }
          35% {
            transform: skewX(2deg) scaleX(0.97);
          }
          75% {
            transform: skewX(-1.5deg) scaleX(1.02);
          }
        }

        /* Curtain parting when entering */
        @keyframes curtain-open-left {
          0% {
            transform: translateX(0%) scaleX(1);
            opacity: 1;
          }
          100% {
            transform: translateX(-90%) scaleX(0.2);
            opacity: 0.7;
          }
        }

        @keyframes curtain-open-right {
          0% {
            transform: translateX(0%) scaleX(1);
            opacity: 1;
          }
          100% {
            transform: translateX(90%) scaleX(0.2);
            opacity: 0.7;
          }
        }

        /* Hanging sign gentle swing */
        @keyframes sign-swing {
          0%, 100% {
            transform: rotate(0deg) translateY(0);
          }
          30% {
            transform: rotate(-1.5deg) translateY(-1px);
          }
          75% {
            transform: rotate(1.5deg) translateY(1px);
          }
        }

        /* Warm interior glow when curtain opens */
        @keyframes booth-glow-reveal {
          0% {
            opacity: 0;
            transform: scale(0.85);
          }
          100% {
            opacity: 1;
            transform: scale(1.15);
          }
        }

        /* Hanging lamps soft breathing pulse */
        @keyframes lamp-pulse {
          0%, 100% {
            opacity: 0.55;
            filter: drop-shadow(0 0 8px rgba(255, 230, 150, 0.6));
          }
          50% {
            opacity: 0.85;
            filter: drop-shadow(0 0 16px rgba(255, 230, 150, 0.9));
          }
        }

        /* Twinkle stars */
        @keyframes photobooth-star {
          0%, 100% { opacity: 0.3; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.15); }
        }

        .pixel-text {
          font-family: 'Press Start 2P', monospace;
          image-rendering: pixelated;
        }
      `}</style>

      {/* Main Canvas Container: strictly locked to viewport & aspect ratio (No scrolling!) */}
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
        {/* BASE PIXEL ART ENVIRONMENT                */}
        {/* ========================================= */}
        <img
          src={photoboothBgUrl}
          alt="Photobooth Kiosk"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          style={{ imageRendering: "pixelated" }}
        />

        {/* Back to Studio Navigation Link (Retro Pixel Badge) */}
        <Link
          to="/"
          className="absolute top-3 left-3 z-50 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#fff0f3] border-2 border-[#5c3a1e] text-[#5c3a1e] text-[9px] font-bold shadow-[0_2px_0_#5c3a1e] hover:-translate-y-0.5 hover:shadow-[0_4px_0_#5c3a1e] active:translate-y-0 active:shadow-none transition-all no-underline pixel-text"
        >
          <span>←</span> STUDIO
        </Link>

        {/* ========================================= */}
        {/* TWINKLING GOLDEN STARS IN SKY             */}
        {/* ========================================= */}
        <div
          className="absolute pointer-events-none select-none text-[#ffe8a3] text-[10px]"
          style={{ left: "19.5%", top: "18.5%", animation: "photobooth-star 3.2s ease-in-out infinite" }}
        >
          ✦
        </div>
        <div
          className="absolute pointer-events-none select-none text-[#ffe8a3] text-[9px]"
          style={{ left: "93.0%", top: "10.0%", animation: "photobooth-star 2.8s ease-in-out infinite 0.7s" }}
        >
          ✧
        </div>
        <div
          className="absolute pointer-events-none select-none text-[#ffe8a3] text-[10px]"
          style={{ left: "82.5%", top: "22.5%", animation: "photobooth-star 3.4s ease-in-out infinite 1.4s" }}
        >
          ✦
        </div>

        {/* ========================================= */}
        {/* HANGING LAMPS PULSE OVER PHOTOBOOTH SIGN  */}
        {/* ========================================= */}
        <div
          className="absolute pointer-events-none bg-[#ffe8a3]/35 rounded-full"
          style={{
            left: "36.5%",
            top: "9.5%",
            width: "5.5%",
            height: "8.0%",
            animation: "lamp-pulse 2.6s ease-in-out infinite",
          }}
        />
        <div
          className="absolute pointer-events-none bg-[#ffe8a3]/35 rounded-full"
          style={{
            left: "47.8%",
            top: "9.5%",
            width: "5.5%",
            height: "8.0%",
            animation: "lamp-pulse 2.6s ease-in-out infinite 0.9s",
          }}
        />
        <div
          className="absolute pointer-events-none bg-[#ffe8a3]/35 rounded-full"
          style={{
            left: "58.5%",
            top: "9.5%",
            width: "5.5%",
            height: "8.0%",
            animation: "lamp-pulse 2.6s ease-in-out infinite 1.8s",
          }}
        />

        {/* ========================================= */}
        {/* SLEEPING CAT ON ROOF (CLICKABLE)          */}
        {/* ========================================= */}
        <div
          onClick={handleCatClick}
          className="absolute z-20 cursor-pointer"
          style={{
            left: "63.5%",
            top: "6.5%",
            width: "7.8%",
            height: "9.0%",
          }}
          title="Pet the cat!"
        >
          {catSpeech && (
            <div
              className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-[#5c3a1e] text-[8px] md:text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg border border-[#f8a4c8] whitespace-nowrap z-40 animate-bounce pointer-events-none"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              Meow! 🐾 Purr~
            </div>
          )}
        </div>

        {/* ========================================= */}
        {/* VINTAGE MIRROR ON RIGHT (CLICKABLE)       */}
        {/* ========================================= */}
        <div
          onClick={handleMirrorClick}
          className="absolute z-20 cursor-pointer rounded-full"
          style={{
            left: "67.8%",
            top: "41.5%",
            width: "7.2%",
            height: "26.5%",
          }}
          title="Look in the mirror!"
        >
          {mirrorSpeech && (
            <div
              className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-[#d63384] text-[8px] md:text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg border border-[#f8a4c8] whitespace-nowrap z-40 animate-bounce pointer-events-none"
              style={{ fontFamily: "'Quicksand', sans-serif" }}
            >
              Looking fabulous! ✨
            </div>
          )}
        </div>

        {/* ========================================= */}
        {/* CENTER DOORWAY & ANIMATED MOVING CURTAIN  */}
        {/* ========================================= */}
        <div
          onClick={handleEnter}
          className="absolute z-20 cursor-pointer group"
          style={{
            left: "45.70%",
            top: "28.30%",
            width: "18.55%",
            height: "57.23%",
          }}
        >
          {/* Warm Interior Glow when Curtain Opens */}
          {opening && (
            <div
              className="absolute inset-0 bg-gradient-to-t from-[#ffdfa0] via-[#ffe8c2] to-[#fff3dd] rounded-sm pointer-events-none z-10"
              style={{ animation: "booth-glow-reveal 0.9s ease-out forwards" }}
            />
          )}

          {/* Left Curtain Half */}
          <div
            className="absolute top-0 bottom-0 left-0 w-1/2 overflow-hidden pointer-events-none"
            style={{
              transformOrigin: "top left",
              animation: opening
                ? "curtain-open-left 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards"
                : "curtain-sway-left 3.8s ease-in-out infinite",
            }}
          >
            <img
              src={curtainLeftUrl}
              alt="Curtain Left"
              className="w-full h-full object-fill select-none"
              style={{ imageRendering: "pixelated" }}
            />
          </div>

          {/* Right Curtain Half */}
          <div
            className="absolute top-0 bottom-0 right-0 w-1/2 overflow-hidden pointer-events-none"
            style={{
              transformOrigin: "top right",
              animation: opening
                ? "curtain-open-right 0.9s cubic-bezier(0.4, 0, 0.2, 1) forwards"
                : "curtain-sway-right 4.2s ease-in-out infinite",
            }}
          >
            <img
              src={curtainRightUrl}
              alt="Curtain Right"
              className="w-full h-full object-fill select-none"
              style={{ imageRendering: "pixelated" }}
            />
          </div>

          {/* Enter Sign hanging from chains in front of curtain */}
          <div
            className={`absolute z-30 transition-all duration-300 ${
              opening ? "opacity-0 scale-90" : "opacity-100 group-hover:scale-105"
            }`}
            style={{
              left: "11.5%",
              top: "38.5%",
              width: "77%",
              height: "22%",
              transformOrigin: "top center",
              animation: opening ? "none" : "sign-swing 2.8s ease-in-out infinite",
            }}
          >
            <img
              src={enterSignUrl}
              alt="Enter Photobooth"
              className="w-full h-full object-contain select-none filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.35)]"
              style={{ imageRendering: "pixelated" }}
            />
          </div>
        </div>

        {/* ========================================= */}
        {/* CLICKABLE PHOTO STRIP PREVIEW (LEFT)      */}
        {/* ========================================= */}
        <div
          onClick={handleEnter}
          className="absolute z-10 cursor-pointer rounded group"
          style={{
            left: "25.5%",
            top: "35.2%",
            width: "17.0%",
            height: "29.5%",
          }}
          title="Click to start photoshoot!"
        >
          <div className="w-full h-full border border-transparent group-hover:border-[#ff94c2]/50 group-hover:bg-[#ff94c2]/10 transition-all rounded" />
        </div>

        {/* Enter Prompt Footer hint at bottom */}
        <div
          onClick={handleEnter}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 cursor-pointer flex items-center gap-2 px-3 py-1 rounded-full bg-[#3d2729]/80 backdrop-blur-[2px] border border-[#f8a4c8]/40 text-white text-[9px] md:text-[10px] shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          <span className="text-[#f8a4c8] animate-pulse">♥</span>
          <span className="pixel-text">CLICK CURTAIN TO ENTER</span>
          <span className="text-[#f8a4c8] animate-pulse">♥</span>
        </div>
      </div>
    </div>
  );
}
