import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import "../../src/styles/photobooth.css";
import logoUrl from "../assets/logo.png?url";

/* ── tiny inline SVG pixel decorations ── */
const Heart = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 16 16" className={className} width="16" height="16">
    <rect x="3" y="1" width="4" height="2" fill="currentColor" />
    <rect x="9" y="1" width="4" height="2" fill="currentColor" />
    <rect x="1" y="3" width="14" height="2" fill="currentColor" />
    <rect x="1" y="5" width="14" height="2" fill="currentColor" />
    <rect x="2" y="7" width="12" height="2" fill="currentColor" />
    <rect x="3" y="9" width="10" height="2" fill="currentColor" />
    <rect x="4" y="11" width="8" height="2" fill="currentColor" />
    <rect x="5" y="13" width="6" height="2" fill="currentColor" />
    <rect x="6" y="15" width="4" height="1" fill="currentColor" />
  </svg>
);

const Star = ({ className = "", style }: { className?: string; style?: React.CSSProperties }) => (
  <svg viewBox="0 0 12 12" className={className} style={style} width="12" height="12">
    <rect x="5" y="0" width="2" height="2" fill="currentColor" />
    <rect x="3" y="2" width="6" height="2" fill="currentColor" />
    <rect x="0" y="4" width="12" height="2" fill="currentColor" />
    <rect x="2" y="6" width="8" height="2" fill="currentColor" />
    <rect x="1" y="8" width="4" height="2" fill="currentColor" />
    <rect x="7" y="8" width="4" height="2" fill="currentColor" />
    <rect x="0" y="10" width="3" height="2" fill="currentColor" />
    <rect x="9" y="10" width="3" height="2" fill="currentColor" />
  </svg>
);

/* ── Floating decoration component ── */
function FloatingDeco() {
  const items = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    emoji: ["🌸", "💗", "✨", "🌷", "⭐", "💖", "🎀", "🌺", "💕"][i % 9],
    left: `${5 + Math.random() * 90}%`,
    top: `${5 + Math.random() * 90}%`,
    delay: `${Math.random() * 4}s`,
    size: 12 + Math.random() * 14,
  }));

  return (
    <>
      {items.map((it) => (
        <span
          key={it.id}
          className="absolute pointer-events-none twinkle select-none"
          style={{
            left: it.left,
            top: it.top,
            animationDelay: it.delay,
            fontSize: it.size,
            opacity: 0.5,
          }}
        >
          {it.emoji}
        </span>
      ))}
    </>
  );
}

/* ── Pixel pig ── */
function PixelPig({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ width: 48, height: 40, imageRendering: "pixelated" }}>
      <div className="absolute" style={{ left: 4, top: 0, width: 40, height: 28, background: "#f8a4b8", borderRadius: 4 }} />
      <div className="absolute" style={{ left: 14, top: 8, width: 20, height: 12, background: "#e8829a", borderRadius: 2 }} />
      <div className="absolute rounded-full" style={{ left: 17, top: 10, width: 4, height: 4, background: "#4a2030" }} />
      <div className="absolute rounded-full" style={{ left: 27, top: 10, width: 4, height: 4, background: "#4a2030" }} />
      <div className="absolute" style={{ left: 8, top: 28, width: 8, height: 12, background: "#f8a4b8", borderRadius: "0 0 2px 2px" }} />
      <div className="absolute" style={{ left: 32, top: 28, width: 8, height: 12, background: "#f8a4b8", borderRadius: "0 0 2px 2px" }} />
    </div>
  );
}

export function LandingHub() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 30%, #16213e 60%, #0f3460 100%)",
      }}
    >
      {/* Starry sky */}
      <FloatingDeco />

      {/* Ground blocks */}
      <div className="absolute bottom-0 left-0 right-0 h-20 block-texture" style={{ background: "#4a7c3f" }} />
      <div className="absolute bottom-0 left-0 right-0 h-8 block-texture" style={{ background: "#6b4423" }} />

      {/* Lanterns top */}
      <div className="absolute top-6 left-0 right-0 flex justify-center gap-12 pointer-events-none">
        {Array.from({ length: 7 }).map((_, i) => (
          <span key={i} className="lantern-glow text-2xl" style={{ animationDelay: `${i * 0.4}s` }}>
            🏮
          </span>
        ))}
      </div>

      {/* Title */}
      <div
        className={`mb-6 text-center transition-all duration-1000 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-8"}`}
      >
        <img 
          src={logoUrl} 
          alt="Pixel Studio Logo" 
          className="w-40 md:w-48 mx-auto mb-2 pixel-pop pointer-events-none select-none" 
          style={{ filter: "drop-shadow(0 0 15px rgba(219,39,119,0.4))", imageRendering: "pixelated" }} 
        />
        <h1
          className="pixel-font text-xl md:text-3xl text-white mb-3"
          style={{ textShadow: "3px 3px 0 #8b1a56" }}
        >
          Pixel Studio
        </h1>
        <p className="pixel-font text-[8px] md:text-[10px] text-pink-200 tracking-wider opacity-80">
          ✨ Choose your adventure ✨
        </p>
        <PixelPig className="mx-auto mt-2 scale-75" />
      </div>

      {/* Three main cards */}
      <div
        className={`relative z-10 flex flex-col md:flex-row flex-wrap justify-center gap-8 px-6 max-w-6xl transition-all duration-1000 delay-300 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
      >
        {/* Calendar Card */}
        <Link to="/" search={{ mode: "calendar" }} className="block no-underline">
          <div className="mc-card pixel-border-pink rounded-lg overflow-hidden w-72 md:w-80 cursor-pointer group transition-transform hover:-translate-y-2">
            <div
              className="relative h-56 flex flex-col items-center justify-center p-6 block-texture"
              style={{ background: "linear-gradient(180deg, #2d1b4e 0%, #1a0a2e 100%)" }}
            >
              {/* Calendar icon pixel art */}
              <div className="relative mb-4 group-hover:scale-105 transition-transform duration-500">
                <div
                  className="w-24 h-28 rounded-lg flex flex-col overflow-hidden"
                  style={{
                    border: "4px solid #d63384",
                    background: "linear-gradient(180deg, #ff69b4 0%, #fff0f5 30%)",
                  }}
                >
                  <div className="bg-pink-500 h-8 flex items-center justify-center">
                    <span className="pixel-font text-[6px] text-white">2026</span>
                  </div>
                  <div className="flex-1 grid grid-cols-7 gap-px p-1">
                    {Array.from({ length: 28 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-sm"
                        style={{
                          background: i === 14 ? "#ff69b4" : "rgba(219, 39, 119, 0.15)",
                          fontSize: 3,
                        }}
                      />
                    ))}
                  </div>
                </div>
                <Star className="absolute -top-2 -right-3 text-yellow-300 twinkle" />
                <Star className="absolute -bottom-1 -left-3 text-pink-300 twinkle" style={{ animationDelay: "1s" }} />
              </div>
              <span className="text-2xl mb-1">📅</span>
            </div>
            <div className="bg-gradient-to-b from-[#2a0845] to-[#1a0a2e] p-5 text-center">
              <h2 className="pixel-font text-sm text-pink-300 mb-2">Customize</h2>
              <h3 className="pixel-font text-lg text-white mb-2" style={{ textShadow: "2px 2px 0 #8b1a56" }}>
                Calendar
              </h3>
              <p className="pixel-font text-[7px] text-pink-200 leading-relaxed opacity-70">
                Design a 12-month photo calendar & export as PDF
              </p>
              <div className="mt-4">
                <span className="pixel-btn pixel-btn-pink text-[8px] inline-block">Enter →</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Polaroid Camera Card */}
        <Link to="/polaroid" className="block no-underline">
          <div className="mc-card pixel-border-pink rounded-lg overflow-hidden w-72 md:w-80 cursor-pointer group transition-transform hover:-translate-y-2">
            <div
              className="relative h-56 flex flex-col items-center justify-center p-6 block-texture"
              style={{ background: "linear-gradient(180deg, #ffb347 0%, #ff7b25 100%)" }}
            >
              {/* Polaroid Camera pixel art */}
              <div className="relative mb-4 group-hover:scale-105 transition-transform duration-500">
                <div
                  className="w-32 h-28 rounded-xl flex flex-col items-center justify-center relative shadow-lg"
                  style={{
                    border: "4px solid #fff",
                    background: "#e5e7eb",
                  }}
                >
                  <div className="absolute top-2 right-3 w-4 h-4 rounded-full bg-red-500" />
                  <div className="w-12 h-12 rounded-full bg-gray-800 border-4 border-gray-600 flex items-center justify-center shadow-inner">
                    <div className="w-4 h-4 rounded-full bg-blue-400/50 absolute top-2 right-2" />
                  </div>
                  <div className="absolute bottom-[-10px] w-20 h-4 bg-gray-900 rounded-b-md" />
                  {/* Polaroid sticking out */}
                  <div className="absolute -bottom-6 w-16 h-12 bg-white border-2 border-gray-300 shadow-md transform rotate-3 flex items-start justify-center p-1">
                    <div className="w-full h-8 bg-pink-200" />
                  </div>
                </div>
                <Star className="absolute -top-4 -right-3 text-yellow-300 twinkle" />
                <Star className="absolute -bottom-4 -left-3 text-pink-300 twinkle" style={{ animationDelay: "1s" }} />
              </div>
            </div>
            <div className="bg-gradient-to-b from-[#8b4513] to-[#4a2311] p-5 text-center">
              <h2 className="pixel-font text-sm text-yellow-300 mb-2">Capture a</h2>
              <h3 className="pixel-font text-lg text-white mb-2" style={{ textShadow: "2px 2px 0 #3e1f0e" }}>
                Polaroid
              </h3>
              <p className="pixel-font text-[7px] text-yellow-100 leading-relaxed opacity-70">
                Take a single shot & print a custom Instax-style photo
              </p>
              <div className="mt-4">
                <span className="pixel-btn text-[8px] inline-block" style={{ background: "#d97706", boxShadow: "inset -2px -2px 0px rgba(0,0,0,0.2)" }}>Enter →</span>
              </div>
            </div>
          </div>
        </Link>

        {/* Photo Booth Card */}
        <Link to="/photobooth" className="block no-underline">
          <div className="mc-card pixel-border-pink rounded-lg overflow-hidden w-72 md:w-80 cursor-pointer group transition-transform hover:-translate-y-2">
            <div
              className="relative h-56 flex flex-col items-center justify-center p-6 block-texture"
              style={{ background: "linear-gradient(180deg, #4a1942 0%, #1a0a2e 100%)" }}
            >
              {/* Booth pixel art */}
              <div className="relative mb-4">
                <div
                  className="w-28 h-28 rounded-lg flex items-center justify-center pixel-glow"
                  style={{
                    border: "4px solid #d63384",
                    background: "linear-gradient(180deg, #8b1a56 0%, #4a0e2e 100%)",
                  }}
                >
                  {/* Curtains */}
                  <div className="absolute left-1 top-1 bottom-1 w-5" style={{ background: "repeating-linear-gradient(180deg, #d63384, #d63384 4px, #c4407e 4px, #c4407e 8px)" }} />
                  <div className="absolute right-1 top-1 bottom-1 w-5" style={{ background: "repeating-linear-gradient(180deg, #d63384, #d63384 4px, #c4407e 4px, #c4407e 8px)" }} />
                  <span className="text-4xl relative z-10">📸</span>
                </div>
                <div className="absolute -top-2 left-0 right-0 flex justify-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="lantern-glow text-xs" style={{ animationDelay: `${i * 0.3}s` }}>🏮</span>
                  ))}
                </div>
                <Star className="absolute -bottom-2 -right-3 text-yellow-300 twinkle" style={{ animationDelay: "0.5s" }} />
              </div>
              <span className="text-2xl mb-1">🎀</span>
            </div>
            <div className="bg-gradient-to-b from-[#4a1942] to-[#1a0a2e] p-5 text-center">
              <h2 className="pixel-font text-sm text-pink-300 mb-2">Enter the</h2>
              <h3 className="pixel-font text-lg text-white mb-2" style={{ textShadow: "2px 2px 0 #8b1a56" }}>
                Photo Booth
              </h3>
              <p className="pixel-font text-[7px] text-pink-200 leading-relaxed opacity-70">
                Take pics, choose templates, add stickers & print strips
              </p>
              <div className="mt-4">
                <span className="pixel-btn pixel-btn-purple text-[8px] inline-block">Enter →</span>
              </div>
            </div>
          </div>
        </Link>
      </div>

      {/* Bottom vines */}
      <div className="absolute bottom-16 left-0 right-0 flex justify-around pointer-events-none text-xl opacity-60">
        {["🌸", "🌷", "🌺", "🌸", "🌷", "🌺", "🌸", "🌷"].map((f, i) => (
          <span key={i} className="twinkle" style={{ animationDelay: `${i * 0.3}s` }}>{f}</span>
        ))}
      </div>
    </div>
  );
}
