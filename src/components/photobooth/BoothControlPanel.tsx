import { Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import controlBgUrl from "@/assets/photobooth-control-bg.png";

export function BoothControlPanel({
  onCamera,
  onUpload,
  onBack,
}: {
  onCamera: () => void;
  onUpload: () => void;
  onBack: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="w-screen h-screen bg-[#1c0b2b] flex items-center justify-center overflow-hidden font-sans select-none relative m-0 p-0">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Quicksand:wght@600;700;800&display=swap');

        @keyframes cp-star-twinkle {
          0%, 100% { opacity: 0.35; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.15); }
        }

        @keyframes cp-lantern-glow {
          0%, 100% {
            opacity: 0.55;
            filter: drop-shadow(0 0 6px rgba(255, 230, 150, 0.6));
          }
          50% {
            opacity: 0.9;
            filter: drop-shadow(0 0 14px rgba(255, 230, 150, 0.95));
          }
        }

        @keyframes cp-water-shimmer {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.95; }
        }

        .cp-button-hover:hover {
          transform: translateY(-2px) scale(1.02);
        }

        .cp-button-hover:active {
          transform: translateY(1px) scale(0.98);
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
          width: "min(100vw, calc(100vh * (1024 / 473)))",
          height: "min(100vh, calc(100vw * (473 / 1024)))",
          aspectRatio: "1024 / 473",
        }}
      >
        {/* ========================================= */}
        {/* BASE PIXEL ART ENVIRONMENT                */}
        {/* ========================================= */}
        <img
          src={controlBgUrl}
          alt="Control Panel Background"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          style={{ imageRendering: "pixelated" }}
        />

        {/* Back to Studio Link */}
        <Link
          to="/"
          className="absolute top-3 left-3 z-50 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2a133d] border-2 border-[#f8a4c8] text-[#f8a4c8] text-[9px] font-bold shadow-[0_2px_0_#1a0826] hover:-translate-y-0.5 hover:shadow-[0_4px_0_#1a0826] active:translate-y-0 active:shadow-none transition-all no-underline pixel-text"
        >
          <span>←</span> STUDIO
        </Link>

        {/* ========================================= */}
        {/* TWINKLING STARS IN THE NIGHT SKY          */}
        {/* ========================================= */}
        <div
          className="absolute pointer-events-none text-white text-[11px]"
          style={{ left: "16.8%", top: "14.5%", animation: "cp-star-twinkle 3s ease-in-out infinite" }}
        >
          ✦
        </div>
        <div
          className="absolute pointer-events-none text-[#ffe8a3] text-[9px]"
          style={{ left: "12.0%", top: "25.0%", animation: "cp-star-twinkle 2.5s ease-in-out infinite 0.7s" }}
        >
          ✧
        </div>
        <div
          className="absolute pointer-events-none text-white text-[10px]"
          style={{ left: "24.5%", top: "37.5%", animation: "cp-star-twinkle 3.4s ease-in-out infinite 1.2s" }}
        >
          ✦
        </div>
        <div
          className="absolute pointer-events-none text-[#ffe8a3] text-[10px]"
          style={{ left: "71.5%", top: "27.5%", animation: "cp-star-twinkle 3.1s ease-in-out infinite 0.4s" }}
        >
          ✧
        </div>
        <div
          className="absolute pointer-events-none text-white text-[11px]"
          style={{ left: "84.0%", top: "16.0%", animation: "cp-star-twinkle 2.7s ease-in-out infinite 1.6s" }}
        >
          ✦
        </div>
        <div
          className="absolute pointer-events-none text-[#ffe8a3] text-[9px]"
          style={{ left: "93.5%", top: "24.5%", animation: "cp-star-twinkle 3.3s ease-in-out infinite 0.9s" }}
        >
          ✧
        </div>

        {/* ========================================= */}
        {/* GLOWING HANGING LANTERNS                  */}
        {/* ========================================= */}
        {[38.8, 44.4, 50.0, 55.4, 60.8].map((leftPct, i) => (
          <div
            key={i}
            className="absolute pointer-events-none bg-[#ffe8a3]/40 rounded-full"
            style={{
              left: `${leftPct - 1.5}%`,
              top: "9.0%",
              width: "3.2%",
              height: "6.0%",
              animation: `cp-lantern-glow 2.8s ease-in-out infinite ${i * 0.4}s`,
            }}
          />
        ))}

        {/* ========================================= */}
        {/* WATER REFLECTION SHIMMER                  */}
        {/* ========================================= */}
        <div
          className="absolute pointer-events-none bg-gradient-to-t from-transparent via-[#ffe8a3]/5 to-transparent"
          style={{
            left: "0%",
            top: "81%",
            width: "100%",
            height: "12%",
            animation: "cp-water-shimmer 3.5s ease-in-out infinite",
          }}
        />

        {/* ========================================= */}
        {/* 1. "USE CAMERA" BUTTON HOTSPOT            */}
        {/* ========================================= */}
        <button
          onClick={onCamera}
          onMouseEnter={() => setHoveredBtn("camera")}
          onMouseLeave={() => setHoveredBtn(null)}
          className="cp-button-hover absolute z-20 cursor-pointer rounded-lg transition-all duration-150 border-2 border-transparent group bg-transparent p-0"
          style={{
            left: "37.11%",
            top: "35.52%",
            width: "24.41%",
            height: "15.22%",
          }}
          title="Use Webcam"
        >
          <div className="w-full h-full rounded-lg border-2 border-transparent group-hover:border-[#ff94c2] group-hover:bg-[#ff94c2]/20 group-hover:shadow-[0_0_14px_rgba(255,148,194,0.8)] transition-all flex items-center justify-center" />
          {hoveredBtn === "camera" && (
            <div
              className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#2d1e18] text-[#ffccd5] text-[9px] font-bold px-2 py-0.5 rounded shadow-lg border border-[#ffccd5] whitespace-nowrap z-40 pointer-events-none pixel-text"
            >
              📸 WEBCAM
            </div>
          )}
        </button>

        {/* ========================================= */}
        {/* 2. "UPLOAD PHOTOS" BUTTON HOTSPOT         */}
        {/* ========================================= */}
        <button
          onClick={onUpload}
          onMouseEnter={() => setHoveredBtn("upload")}
          onMouseLeave={() => setHoveredBtn(null)}
          className="cp-button-hover absolute z-20 cursor-pointer rounded-lg transition-all duration-150 border-2 border-transparent group bg-transparent p-0"
          style={{
            left: "37.11%",
            top: "52.43%",
            width: "24.41%",
            height: "15.22%",
          }}
          title="Upload from Device"
        >
          <div className="w-full h-full rounded-lg border-2 border-transparent group-hover:border-[#7ddf64] group-hover:bg-[#7ddf64]/20 group-hover:shadow-[0_0_14px_rgba(125,223,100,0.8)] transition-all flex items-center justify-center" />
          {hoveredBtn === "upload" && (
            <div
              className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#1b3a1a] text-[#c2ffba] text-[9px] font-bold px-2 py-0.5 rounded shadow-lg border border-[#7ddf64] whitespace-nowrap z-40 pointer-events-none pixel-text"
            >
              🖼️ UPLOAD
            </div>
          )}
        </button>

        {/* ========================================= */}
        {/* 3. "EXIT BOOTH" BUTTON HOTSPOT            */}
        {/* ========================================= */}
        <button
          onClick={onBack}
          onMouseEnter={() => setHoveredBtn("exit")}
          onMouseLeave={() => setHoveredBtn(null)}
          className="cp-button-hover absolute z-20 cursor-pointer rounded-lg transition-all duration-150 border-2 border-transparent group bg-transparent p-0"
          style={{
            left: "37.11%",
            top: "69.34%",
            width: "24.41%",
            height: "14.38%",
          }}
          title="Exit to Studio Entrance"
        >
          <div className="w-full h-full rounded-lg border-2 border-transparent group-hover:border-[#ffc107] group-hover:bg-[#ffc107]/20 group-hover:shadow-[0_0_14px_rgba(255,193,7,0.8)] transition-all flex items-center justify-center" />
          {hoveredBtn === "exit" && (
            <div
              className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#3a2c0f] text-[#ffeb99] text-[9px] font-bold px-2 py-0.5 rounded shadow-lg border border-[#ffc107] whitespace-nowrap z-40 pointer-events-none pixel-text"
            >
              🚪 EXIT
            </div>
          )}
        </button>
      </div>
    </div>
  );
}
