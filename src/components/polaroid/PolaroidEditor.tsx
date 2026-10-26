import { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas-pro";
import { Link } from "@tanstack/react-router";
import decorateBgUrl from "@/assets/polaroid-decorate-bg.png";

const BORDER_COLORS = [
  { id: "white", hex: "#ffffff", name: "Classic White", icon: "⚪" },
  { id: "pink", hex: "#ffe4e6", name: "Pastel Pink", icon: "🌸" },
  { id: "lavender", hex: "#f3e8ff", name: "Lavender", icon: "💜" },
  { id: "mint", hex: "#dcfce7", name: "Mint Green", icon: "🍃" },
  { id: "honey", hex: "#fef9c3", name: "Warm Honey", icon: "🍯" },
  { id: "dark", hex: "#292524", name: "Dark Retro", icon: "🖤" },
];

const STICKERS = [
  "✨", "💖", "🌸", "⭐", "🦋", "🎀", "🍓", "🐱", "🐰", "🥺", "🔥", "✌️", "🌷", "🍑", "💎"
];

interface PolaroidSticker {
  id: string;
  emoji: string;
  x: number;
  y: number;
  size: number;
  rot: number;
}

export function PolaroidEditor({
  photo,
  onFinish,
}: {
  photo: string;
  onFinish: (url: string) => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [borderColor, setBorderColor] = useState(BORDER_COLORS[0].hex);
  const [caption, setCaption] = useState("Best Day Ever!");
  const [stickers, setStickers] = useState<PolaroidSticker[]>([]);
  const [selectedTool, setSelectedTool] = useState<"caption" | "border" | "stickers">("caption");
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // Easter egg bubbles
  const [catSpeech, setCatSpeech] = useState(false);
  const [bookSpeech, setBookSpeech] = useState(false);
  const [cameraSpeech, setCameraSpeech] = useState(false);
  const [noteSpeech, setNoteSpeech] = useState(false);

  const polaroidRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const triggerBubble = (setter: (v: boolean) => void) => {
    setter(true);
    setTimeout(() => setter(false), 2400);
  };

  const handleFinish = async () => {
    if (!polaroidRef.current || isProcessing) return;
    setIsProcessing(true);
    try {
      const canvas = await html2canvas(polaroidRef.current, {
        scale: 2.5,
        backgroundColor: null,
        useCORS: true,
      });
      onFinish(canvas.toDataURL("image/png"));
    } catch (err) {
      console.error(err);
      setIsProcessing(false);
    }
  };

  const addSticker = (emoji: string) => {
    setStickers((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).slice(2, 9),
        emoji,
        x: 35 + Math.random() * 30,
        y: 25 + Math.random() * 40,
        size: 28 + Math.floor(Math.random() * 8),
        rot: (Math.random() - 0.5) * 30,
      },
    ]);
  };

  const handlePointerDown = (e: React.PointerEvent, id: string) => {
    e.stopPropagation();
    setDraggingId(id);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingId || !polaroidRef.current) return;
    const rect = polaroidRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setStickers((prev) =>
      prev.map((s) => (s.id === draggingId ? { ...s, x, y } : s))
    );
  };

  const handlePointerUp = () => {
    setDraggingId(null);
  };

  return (
    <div className="w-screen h-screen bg-[#2c1810] flex items-center justify-center overflow-hidden font-sans select-none relative m-0 p-0">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Dancing+Script:wght@700&family=Press+Start+2P&family=Quicksand:wght@600;700;800&display=swap');

        .pixel-text {
          font-family: 'Press Start 2P', monospace;
          image-rendering: pixelated;
        }

        .hand-text {
          font-family: 'Caveat', 'Dancing Script', cursive;
        }

        /* Ambient Lamp Glow */
        @keyframes polaroid-lamp-glow {
          0%, 100% {
            opacity: 0.6;
            filter: drop-shadow(0 0 10px rgba(255, 200, 100, 0.7));
          }
          50% {
            opacity: 0.95;
            filter: drop-shadow(0 0 24px rgba(255, 200, 100, 1));
          }
        }

        /* Falling Blossom Petals */
        @keyframes polaroid-petal-fall {
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

        /* Gingham Tape Pattern */
        .washi-tape-pink {
          background-color: #ffd1dc;
          background-image: 
            linear-gradient(90deg, rgba(255, 105, 180, 0.35) 50%, transparent 50%),
            linear-gradient(rgba(255, 105, 180, 0.35) 50%, transparent 50%);
          background-size: 8px 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.15);
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
          src={decorateBgUrl}
          alt="Polaroid Decorate Studio"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          style={{ imageRendering: "pixelated" }}
        />

        {/* ========================================= */}
        {/* 2. TOP ACTION BUTTONS (HOTSPOTS)          */}
        {/* ========================================= */}
        {/* Top-Left: BACK TO STUDIO */}
        <Link
          to="/"
          className="absolute z-30 cursor-pointer rounded-lg transition-transform hover:scale-[1.03] active:scale-[0.98] group"
          style={{
            left: "2.2%",
            top: "4.5%",
            width: "21.0%",
            height: "13.5%",
          }}
          title="Return to Studio Home"
        >
          <div className="w-full h-full rounded-lg border-2 border-transparent group-hover:border-white/40" />
        </Link>

        {/* Top-Right: DONE BUTTON */}
        <button
          onClick={handleFinish}
          disabled={isProcessing}
          className="absolute z-30 cursor-pointer rounded-lg transition-transform hover:scale-[1.03] active:scale-[0.98] group p-0 m-0 border-0 bg-transparent"
          style={{
            left: "79.5%",
            top: "4.5%",
            width: "16.0%",
            height: "13.5%",
          }}
          title="Finish and save your polaroid"
        >
          <div className="w-full h-full rounded-lg border-2 border-transparent group-hover:border-white/50 group-hover:shadow-[0_0_14px_rgba(46,204,113,0.6)] transition-all flex items-center justify-center">
            {isProcessing && (
              <span className="text-white text-[9px] font-bold pixel-text animate-pulse">
                SAVING...
              </span>
            )}
          </div>
        </button>

        {/* ========================================= */}
        {/* 3. INTERACTIVE POLAROID FRAME ON WALL     */}
        {/* ========================================= */}
        <div
          className="absolute z-20"
          style={{
            left: "37.1%",
            top: "13.8%",
            width: "25.9%",
            height: "59.0%",
            transformOrigin: "center center",
            transform: "rotate(1.8deg)",
          }}
        >
          {/* Polaroid Card (Captured by html2canvas) */}
          <div
            ref={polaroidRef}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="w-full h-full relative rounded-xs shadow-2xl flex flex-col transition-colors duration-200 select-none p-3 pb-8"
            style={{
              backgroundColor: borderColor,
              boxShadow: "0 15px 35px rgba(0,0,0,0.45), 0 2px 6px rgba(0,0,0,0.2)",
            }}
          >
            {/* Corner Washi Tape: Top-Left */}
            <div
              className="absolute -top-3.5 -left-4 w-14 h-5 washi-tape-pink rounded-xs pointer-events-none z-30 opacity-95"
              style={{ transform: "rotate(-32deg)" }}
            />

            {/* Corner Washi Tape: Bottom-Right */}
            <div
              className="absolute -bottom-3 -right-3.5 w-14 h-5 washi-tape-pink rounded-xs pointer-events-none z-30 opacity-95"
              style={{ transform: "rotate(-35deg)" }}
            />

            {/* Inner Photo Square */}
            <div className="w-full aspect-square bg-[#f5ede5] overflow-hidden relative rounded-xs border border-stone-300 shadow-inner">
              <img
                src={photo}
                alt="Polaroid memory"
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </div>

            {/* Bottom Chin: Cursive Caption with hearts */}
            <div className="flex-1 flex items-center justify-center px-1 pt-1.5 overflow-hidden">
              <div className="flex items-center gap-1.5 text-stone-800 drop-shadow-xs">
                <span className="text-[#ff758f] text-xs">♥</span>
                <span
                  className="hand-text text-xl sm:text-2xl font-bold tracking-wide text-center truncate max-w-[200px]"
                  style={{
                    color: borderColor === "#292524" ? "#f5ede5" : "#2c1810",
                  }}
                >
                  {caption || "Best Day Ever!"}
                </span>
                <span className="text-[#ff758f] text-xs">♥</span>
              </div>
            </div>

            {/* Draggable Stickers Overlay */}
            {stickers.map((s) => (
              <div
                key={s.id}
                onPointerDown={(e) => handlePointerDown(e, s.id)}
                className="absolute cursor-grab active:cursor-grabbing hover:scale-115 transition-transform z-20 select-none"
                style={{
                  left: `${s.x}%`,
                  top: `${s.y}%`,
                  transform: `translate(-50%, -50%) rotate(${s.rot}deg)`,
                  fontSize: `${s.size}px`,
                  touchAction: "none",
                  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
                }}
                title="Drag sticker to move"
              >
                {s.emoji}
              </div>
            ))}
          </div>
        </div>

        {/* ========================================= */}
        {/* 4. THREE TOOL TABS: Border, Caption, Stickers */}
        {/* ========================================= */}
        <div
          className="absolute z-30 flex items-center justify-between"
          style={{
            left: "30.5%",
            top: "77.5%",
            width: "39.0%",
            height: "7.8%",
          }}
        >
          {/* Border Tab */}
          <button
            onClick={() => setSelectedTool("border")}
            className="h-full w-[31%] cursor-pointer rounded-lg p-0 m-0 border-0 bg-transparent flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            title="Choose Border Color"
          >
            <div
              className={`w-full h-full rounded-lg flex items-center justify-center gap-1 pixel-text text-[8px] font-bold transition-all ${
                selectedTool === "border"
                  ? "bg-white text-[#5c3a1e] border-2 border-[#ff758f] shadow-md -translate-y-0.5"
                  : "bg-[#4a2411]/80 text-[#ffd1dc] border border-[#ffccd5]/30 hover:bg-[#5a2e16]"
              }`}
            >
              <span>🌸</span>
              <span>Border</span>
            </div>
          </button>

          {/* Caption Tab */}
          <button
            onClick={() => setSelectedTool("caption")}
            className="h-full w-[33%] cursor-pointer rounded-lg p-0 m-0 border-0 bg-transparent flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            title="Edit Caption Text"
          >
            <div
              className={`w-full h-full rounded-lg flex items-center justify-center gap-1 pixel-text text-[8px] font-bold transition-all ${
                selectedTool === "caption"
                  ? "bg-white text-[#5c3a1e] border-2 border-[#ff758f] shadow-md -translate-y-0.5"
                  : "bg-[#4a2411]/80 text-[#ffd1dc] border border-[#ffccd5]/30 hover:bg-[#5a2e16]"
              }`}
            >
              <span>✏️</span>
              <span>Caption</span>
            </div>
          </button>

          {/* Stickers Tab */}
          <button
            onClick={() => setSelectedTool("stickers")}
            className="h-full w-[31%] cursor-pointer rounded-lg p-0 m-0 border-0 bg-transparent flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
            title="Add Stickers"
          >
            <div
              className={`w-full h-full rounded-lg flex items-center justify-center gap-1 pixel-text text-[8px] font-bold transition-all ${
                selectedTool === "stickers"
                  ? "bg-white text-[#5c3a1e] border-2 border-[#ff758f] shadow-md -translate-y-0.5"
                  : "bg-[#4a2411]/80 text-[#ffd1dc] border border-[#ffccd5]/30 hover:bg-[#5a2e16]"
              }`}
            >
              <span>🦋</span>
              <span>Stickers</span>
            </div>
          </button>
        </div>

        {/* ========================================= */}
        {/* 5. TOOL CONTROL PLAQUE (BOTTOM ROW)       */}
        {/* ========================================= */}
        <div
          className="absolute z-30 flex items-center justify-center"
          style={{
            left: "32.0%",
            top: "86.0%",
            width: "36.0%",
            height: "9.8%",
          }}
        >
          {/* Tool 1: CAPTION INPUT PLAQUE */}
          {selectedTool === "caption" && (
            <div className="w-full h-full bg-[#fdfaf5] border-2 border-[#d4a373] rounded-xl shadow-md flex items-center justify-between px-3 relative overflow-hidden">
              <span className="text-sm select-none">🌸 ♥</span>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                maxLength={26}
                placeholder="Write your memory caption..."
                className="flex-1 mx-2 bg-transparent text-center hand-text text-xl sm:text-2xl font-bold text-[#3a2210] outline-none placeholder:text-stone-400"
                autoFocus
              />
              <span className="text-sm select-none">♥ 🌸</span>
            </div>
          )}

          {/* Tool 2: BORDER COLOR CHOOSER */}
          {selectedTool === "border" && (
            <div className="w-full h-full bg-[#fdfaf5] border-2 border-[#d4a373] rounded-xl shadow-md flex items-center justify-center gap-2.5 px-3">
              {BORDER_COLORS.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setBorderColor(c.hex)}
                  className={`w-7 h-7 rounded-full shadow-md transition-all cursor-pointer flex items-center justify-center ${
                    borderColor === c.hex
                      ? "ring-3 ring-[#ff758f] scale-110"
                      : "hover:scale-105 border border-stone-300"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {borderColor === c.hex && (
                    <span className="text-[10px] text-[#ff758f] font-bold">✓</span>
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Tool 3: STICKERS TRAY */}
          {selectedTool === "stickers" && (
            <div className="w-full h-full bg-[#fdfaf5] border-2 border-[#d4a373] rounded-xl shadow-md flex items-center justify-between px-2 gap-1 overflow-x-auto cute-scrollbar">
              <div className="flex items-center gap-1.5 flex-1 overflow-x-auto py-1">
                {STICKERS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => addSticker(emoji)}
                    className="text-lg hover:scale-125 active:scale-95 transition-transform p-1 rounded-md hover:bg-[#fff0f3] cursor-pointer"
                    title={`Add ${emoji}`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              {stickers.length > 0 && (
                <button
                  onClick={() => setStickers([])}
                  className="px-2 py-0.5 rounded bg-[#ff758f] text-white text-[7.5px] font-bold pixel-text shadow-xs hover:bg-[#e63946] transition-colors shrink-0"
                  title="Clear all stickers"
                >
                  CLEAR
                </button>
              )}
            </div>
          )}
        </div>

        {/* ========================================= */}
        {/* 6. ATMOSPHERIC LIGHTING & PETALS          */}
        {/* ========================================= */}
        {/* Warm Amber Hanging Lamp Glow on Right */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: "92.5%",
            top: "16.0%",
            width: "55px",
            height: "55px",
            background: "radial-gradient(circle, rgba(255,200,90,0.9) 0%, transparent 70%)",
            animation: "polaroid-lamp-glow 3s ease-in-out infinite",
          }}
        />

        {/* Falling Cherry Blossom Petals from Window */}
        <div
          className="absolute pointer-events-none text-[#ffb3c1] text-[10px]"
          style={{ left: "8.0%", top: "-10px", animation: "polaroid-petal-fall 6s linear infinite" }}
        >
          🌸
        </div>
        <div
          className="absolute pointer-events-none text-[#ffccd5] text-[9px]"
          style={{ left: "17.0%", top: "-10px", animation: "polaroid-petal-fall 7.5s linear infinite 1.5s" }}
        >
          🌸
        </div>
        <div
          className="absolute pointer-events-none text-[#ffb3c1] text-[11px]"
          style={{ left: "25.0%", top: "-10px", animation: "polaroid-petal-fall 6.5s linear infinite 0.8s" }}
        >
          🌸
        </div>

        {/* ========================================= */}
        {/* 7. EASTER EGGS: CAT, BOOKS, CAMERA, NOTES */}
        {/* ========================================= */}
        {/* Sleeping Calico Kitty on Left Table */}
        <div
          onClick={() => triggerBubble(setCatSpeech)}
          className="absolute z-30 cursor-pointer rounded-2xl"
          style={{
            left: "0.8%",
            top: "70.5%",
            width: "12.0%",
            height: "20.5%",
          }}
          title="Pet the sleeping studio kitty!"
        >
          {catSpeech && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#ff758f] text-[#7c2d12] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              Zzz... dreaming of sunny naps... 🌸💤
            </div>
          )}
        </div>

        {/* Book Stack on Left */}
        <div
          onClick={() => triggerBubble(setBookSpeech)}
          className="absolute z-30 cursor-pointer rounded-lg hover:ring-2 hover:ring-[#ff758f]/40 transition-all"
          style={{
            left: "6.5%",
            top: "56.0%",
            width: "15.0%",
            height: "20.0%",
          }}
          title="Studio books"
        >
          {bookSpeech && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-[#2a133d] border-2 border-[#ff758f] text-white text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              Smile, Capture, Cherish, Repeat! 📚
            </div>
          )}
        </div>

        {/* Retro Polaroid Camera on Right Table */}
        <div
          onClick={() => triggerBubble(setCameraSpeech)}
          className="absolute z-30 cursor-pointer rounded-lg hover:ring-2 hover:ring-[#ff758f]/40 transition-all"
          style={{
            left: "77.0%",
            top: "54.0%",
            width: "13.0%",
            height: "24.0%",
          }}
          title="Vintage Polaroid instant camera"
        >
          {cameraSpeech && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-[#fff0f3] border-2 border-[#ff758f] text-[#5c3a1e] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              *Click!* Instant retro memories! 📸✨
            </div>
          )}
        </div>

        {/* Wall Notes on Right */}
        <div
          onClick={() => triggerBubble(setNoteSpeech)}
          className="absolute z-30 cursor-pointer rounded-lg hover:ring-2 hover:ring-[#ff758f]/40 transition-all"
          style={{
            left: "64.0%",
            top: "23.0%",
            width: "18.0%",
            height: "38.0%",
          }}
          title="Memories on the wall"
        >
          {noteSpeech && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-[#fff0f3] border-2 border-[#ffd166] text-[#3a2210] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              Good Photos, Happier Days ♡
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
