import { useState, useRef } from "react";
import html2canvas from "html2canvas-pro";
import { Link } from "@tanstack/react-router";

const BORDER_COLORS = [
  { id: "white", hex: "#ffffff" },
  { id: "pink", hex: "#fce7f3" }, // pink-100
  { id: "lavender", hex: "#f3e8ff" }, // purple-100
  { id: "mint", hex: "#d1fae5" }, // emerald-100
];

const STICKERS = ["✨", "💖", "🌸", "⭐", "🦋", "🎀", "🥺", "🔥", "✌️"];

interface PolaroidSticker {
  id: string;
  emoji: string;
  x: number;
  y: number;
  size: number;
  rot: number;
}

export function PolaroidEditor({ photo, onFinish }: { photo: string; onFinish: (url: string) => void }) {
  const [borderColor, setBorderColor] = useState(BORDER_COLORS[0].hex);
  const [caption, setCaption] = useState("Best Day Ever!");
  const [stickers, setStickers] = useState<PolaroidSticker[]>([]);
  const [selectedTool, setSelectedTool] = useState<"caption" | "border" | "stickers">("caption");
  const [draggingId, setDraggingId] = useState<string | null>(null);
  
  const polaroidRef = useRef<HTMLDivElement>(null);

  const handleFinish = async () => {
    if (!polaroidRef.current) return;
    try {
      const canvas = await html2canvas(polaroidRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true,
      });
      onFinish(canvas.toDataURL("image/png"));
    } catch (err) {
      console.error(err);
    }
  };

  const addSticker = (emoji: string) => {
    setStickers((prev) => [
      ...prev,
      {
        id: Math.random().toString(36).slice(2, 9),
        emoji,
        x: 50,
        y: 50,
        size: 32,
        rot: (Math.random() - 0.5) * 40,
      },
    ]);
  };

  const handlePointerDown = (e: React.PointerEvent, id: string) => {
    setDraggingId(id);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!draggingId || !polaroidRef.current) return;
    const rect = polaroidRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setStickers((prev) => prev.map((s) => s.id === draggingId ? { ...s, x, y } : s));
  };

  const handlePointerUp = () => {
    setDraggingId(null);
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ background: "linear-gradient(180deg, #ffb347 0%, #ff7b25 100%)" }}>
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-black/10">
        <Link to="/" className="pixel-btn text-[8px] bg-gray-800 text-white">
          ← Back to Studio
        </Link>
        <h1 className="pixel-font text-white text-sm" style={{ textShadow: "1px 1px 0 #000" }}>Decorate</h1>
        <button onClick={handleFinish} className="pixel-btn pixel-btn-green text-[8px]">
          ✅ Done
        </button>
      </header>

      {/* Editor Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 overflow-hidden">
        {/* Polaroid Container */}
        <div 
          ref={polaroidRef}
          className="relative shadow-2xl transition-colors duration-300 select-none"
          style={{ 
            width: 320, 
            padding: "16px 16px 64px 16px", 
            backgroundColor: borderColor,
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)"
          }}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
        >
          {/* Photo */}
          <div className="w-full aspect-square bg-gray-200 border border-black/10 overflow-hidden relative">
            <img src={photo} alt="Polaroid" className="w-full h-full object-cover" />
          </div>

          {/* Caption */}
          <div className="absolute bottom-4 left-0 right-0 text-center px-4">
            <span className="font-hand text-3xl text-gray-800" style={{ fontFamily: "'Dancing Script', 'Caveat', cursive" }}>
              {caption}
            </span>
          </div>

          {/* Stickers Layer */}
          {stickers.map((s) => (
            <div
              key={s.id}
              onPointerDown={(e) => handlePointerDown(e, s.id)}
              className="absolute cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                transform: `translate(-50%, -50%) rotate(${s.rot}deg)`,
                fontSize: s.size,
                touchAction: "none"
              }}
            >
              {s.emoji}
            </div>
          ))}
        </div>
      </main>

      {/* Tools */}
      <footer className="bg-black/20 p-4 pb-8 flex flex-col gap-4">
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => setSelectedTool("border")}
            className={`pixel-font text-[10px] px-4 py-2 rounded-lg transition-colors ${selectedTool === "border" ? "bg-white text-orange-600" : "bg-orange-800/50 text-orange-200 hover:bg-orange-800/70"}`}
          >
            🎨 Border
          </button>
          <button 
            onClick={() => setSelectedTool("caption")}
            className={`pixel-font text-[10px] px-4 py-2 rounded-lg transition-colors ${selectedTool === "caption" ? "bg-white text-orange-600" : "bg-orange-800/50 text-orange-200 hover:bg-orange-800/70"}`}
          >
            ✏️ Caption
          </button>
          <button 
            onClick={() => setSelectedTool("stickers")}
            className={`pixel-font text-[10px] px-4 py-2 rounded-lg transition-colors ${selectedTool === "stickers" ? "bg-white text-orange-600" : "bg-orange-800/50 text-orange-200 hover:bg-orange-800/70"}`}
          >
            🎀 Stickers
          </button>
        </div>

        <div className="h-16 flex items-center justify-center">
          {selectedTool === "border" && (
            <div className="flex gap-4">
              {BORDER_COLORS.map(c => (
                <button
                  key={c.id}
                  onClick={() => setBorderColor(c.hex)}
                  className={`w-10 h-10 rounded-full border-4 shadow-inner ${borderColor === c.hex ? "border-blue-400 scale-110" : "border-white/50"}`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}

          {selectedTool === "caption" && (
            <input 
              type="text" 
              value={caption} 
              onChange={(e) => setCaption(e.target.value)} 
              className="px-4 py-2 rounded-lg font-hand text-2xl w-full max-w-xs text-center text-gray-800 shadow-inner focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Write a caption..."
              maxLength={30}
            />
          )}

          {selectedTool === "stickers" && (
            <div className="flex gap-2 overflow-x-auto px-2 pb-2">
              {STICKERS.map(emoji => (
                <button
                  key={emoji}
                  onClick={() => addSticker(emoji)}
                  className="text-2xl hover:scale-125 transition-transform bg-white/20 p-2 rounded-lg"
                >
                  {emoji}
                </button>
              ))}
              <button 
                onClick={() => setStickers([])}
                className="pixel-font text-[8px] bg-red-500/80 text-white px-2 rounded-lg ml-2 hover:bg-red-500"
              >
                Clear
              </button>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
}
