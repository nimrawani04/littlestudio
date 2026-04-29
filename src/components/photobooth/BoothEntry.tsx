import { useState } from "react";
import "../../styles/photobooth.css";

export function BoothEntry({ onEnter }: { onEnter: () => void }) {
  const [opening, setOpening] = useState(false);

  const handleEnter = () => {
    setOpening(true);
    setTimeout(onEnter, 1000);
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, #ffd1dc 0%, #ff9ebb 50%, #e06c9f 100%)",
        imageRendering: "pixelated"
      }}>
      
      {/* Lanterns String */}
      <div className="absolute top-0 left-0 right-0 flex justify-around pointer-events-none z-30 pt-4 bg-amber-900/40 border-b-4 border-amber-950">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="flex flex-col items-center">
            <div className="w-1 h-6 bg-amber-950" />
            <span className="lantern-glow text-3xl select-none" style={{ animationDelay: `${i * 0.3}s` }}>🏮</span>
          </div>
        ))}
      </div>

      {/* Background Vines */}
      <div className="absolute left-6 top-20 bottom-0 w-8 pointer-events-none select-none z-10 flex flex-col text-2xl gap-4 opacity-80">
        {["🌿", "🍃", "🌸", "🌿", "🍃", "🌺", "🌿"].map((v, i) => (
          <span key={i} className="twinkle" style={{ animationDelay: `${i * 0.4}s` }}>{v}</span>
        ))}
      </div>
      <div className="absolute right-6 top-20 bottom-0 w-8 pointer-events-none select-none z-10 flex flex-col text-2xl gap-4 opacity-80">
        {["🌿", "🌸", "🍃", "🌿", "🌺", "🍃", "🌿"].map((v, i) => (
          <span key={i} className="twinkle" style={{ animationDelay: `${i * 0.5}s` }}>{v}</span>
        ))}
      </div>

      {/* Main Booth Body - Styled like Minecraft Blocks */}
      <div className={`relative transition-all duration-1000 transform ${opening ? "scale-110 brightness-110" : "scale-100"}`}
        style={{ width: 360 }}>
        
        {/* Roof Blocks */}
        <div className="flex justify-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-16 h-12 block-texture border-2 border-pink-700" 
              style={{ background: "#fbcfe8", boxShadow: "inset 0 4px 0 #fff, inset 0 -4px 0 #db2777" }} />
          ))}
        </div>

        {/* Booth Signboard */}
        <div className="pixel-border-pink p-4 text-center z-20 relative mx-4 -mt-4 mb-2"
          style={{ background: "linear-gradient(180deg, #db2777, #9d174d)" }}>
          <h1 className="pixel-font text-xs md:text-sm text-white" style={{ textShadow: "2px 2px 0 #4c0519" }}>
            ✨ A-TOWN BOOTH ✨
          </h1>
        </div>

        {/* Booth Frame (Blocks Stacked) */}
        <div className="relative overflow-hidden" style={{
          height: 380, 
          border: "12px solid #5c3a1e",
          borderRadius: "8px",
          background: "linear-gradient(180deg, #371b2c, #1f0d18)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.5), inset 0 0 40px rgba(0,0,0,0.8)"
        }}>
          {/* Interior camera lens/glow */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <div className="w-20 h-20 rounded-full border-4 border-pink-500 bg-black/80 flex items-center justify-center pixel-glow mb-4">
              <div className="w-6 h-6 rounded-full bg-blue-400 opacity-60 animate-pulse" />
            </div>
            <span className="pixel-font text-[9px] text-pink-300 animate-pulse">SMILE & STEP IN</span>
          </div>

          {/* Left Curtain (Animated sliding open) */}
          <div className="absolute left-0 top-0 bottom-0 w-1/2 z-20 transition-transform duration-1000 ease-in-out"
            style={{ 
              background: "repeating-linear-gradient(180deg, #d63384 0px, #db2777 12px, #be185d 24px)",
              boxShadow: "inset -12px 0 20px rgba(0,0,0,0.5)",
              transform: opening ? "translateX(-100%)" : "translateX(0)"
            }}>
            {/* Curtain Folds */}
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-black/20" />
          </div>

          {/* Right Curtain (Animated sliding open) */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 z-20 transition-transform duration-1000 ease-in-out"
            style={{ 
              background: "repeating-linear-gradient(180deg, #d63384 0px, #db2777 12px, #be185d 24px)",
              boxShadow: "inset 12px 0 20px rgba(0,0,0,0.5)",
              transform: opening ? "translateX(100%)" : "translateX(0)"
            }}>
            {/* Curtain Folds */}
            <div className="absolute left-0 top-0 bottom-0 w-4 bg-black/20" />
          </div>
        </div>
      </div>

      {/* Enter button */}
      <button onClick={handleEnter} className="pixel-btn pixel-btn-pink mt-8 pixel-glow z-30 text-xs">
        🎀 Walk Into Booth 🎀
      </button>

      {/* Pig and Vines on Ground */}
      <div className="absolute bottom-16 left-12 z-20 select-none pointer-events-none transition-transform duration-1000 transform" 
        style={{ transform: opening ? "scale(0) translateY(100px)" : "scale(1)" }}>
        <div className="relative">
          <span className="text-5xl block animate-bounce">🐷</span>
          <span className="absolute -top-4 -right-2 text-pink-400 text-xs animate-pulse">oink!</span>
        </div>
      </div>

      <div className="absolute bottom-16 right-12 z-20 text-4xl select-none pointer-events-none animate-pulse">
        🌷
      </div>

      {/* Ground blocks */}
      <div className="absolute bottom-0 left-0 right-0 h-16 block-texture border-t-4 border-green-800" 
        style={{ background: "#4a7c3f" }} />
      <div className="absolute bottom-0 left-0 right-0 h-4 block-texture" 
        style={{ background: "#6b4423" }} />
    </div>
  );
}
