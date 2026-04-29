import { useState } from "react";
import { BOOTH_TEMPLATES } from "./TemplateSelect";

type Sticker = { id: number; emoji: string; x: number; y: number; size: number };

export const STICKER_PACKS = [
  { id: "girly_pop", name: "Girly Pop", emoji: "🎀", items: ["🎀", "💋", "💖", "🍓", "🍑", "🌸", "🌷", "🩰"] },
  { id: "cute_critters", name: "Cute Critters", emoji: "🧸", items: ["🐰", "🦭", "🐥", "🧸", "🐱", "🐶", "🐼", "🐇"] },
  { id: "trendy_y2k", name: "Trendy Y2K", emoji: "✨", items: ["✨", "🤍", "🖤", "🍀", "💎", "🍄", "💲", "🍵"] },
  { id: "holiday", name: "Winter/Holiday", emoji: "🧦", items: ["🍪", "🧦", "🎄", "❄️", "⛄", "🎁"] }
];

export const BG_OPTIONS = [
  { id: "none", name: "Default", css: "", canvasColor: "" },
  // Solid Pastels
  { id: "pastel-pink", name: "Pastel Pink", css: "#ffe4e6", canvasColor: "#ffe4e6" },
  { id: "pastel-blue", name: "Pastel Blue", css: "#e0f2fe", canvasColor: "#e0f2fe" },
  { id: "pastel-yellow", name: "Pastel Yellow", css: "#fef9c3", canvasColor: "#fef9c3" },
  { id: "pastel-green", name: "Pastel Green", css: "#dcfce7", canvasColor: "#dcfce7" },
  { id: "pastel-purple", name: "Pastel Purple", css: "#f3e8ff", canvasColor: "#f3e8ff" },
  { id: "pastel-beige", name: "Pastel Beige", css: "#f5f5dc", canvasColor: "#f5f5dc" },
  // Gradients
  { id: "pink-glimmer", name: "Pink Glimmer", css: "linear-gradient(135deg, #fbcfe8, #f472b6)", canvasColor: "#f472b6" },
  { id: "sunset", name: "Peach Sunset", css: "linear-gradient(135deg, #ffedd5, #fecdd3)", canvasColor: "#fecdd3" },
  { id: "cyber", name: "Cyberpunk", css: "linear-gradient(135deg, #a21caf, #3b82f6)", canvasColor: "#a21caf" },
  { id: "cloudy", name: "Cloudy Sky", css: "linear-gradient(180deg, #38bdf8, #bae6fd)", canvasColor: "#bae6fd" },
  { id: "emerald", name: "Emerald Sea", css: "linear-gradient(135deg, #a7f3d0, #059669)", canvasColor: "#a7f3d0" },
  // Aesthetics/Patterns (using background-color for canvas fallback)
  { id: "cow-print", name: "Cow Print 🐮", css: "linear-gradient(45deg, #fff 25%, #000 25%, #000 50%, #fff 50%, #fff 75%, #000 75%)", canvasColor: "#ffffff" },
  { id: "pink-gingham", name: "Gingham Pink", css: "linear-gradient(90deg, rgba(219,39,119,0.1) 50%, transparent 50%), linear-gradient(rgba(219,39,119,0.1) 50%, transparent 50%)", canvasColor: "#fbcfe8" },
  { id: "black-white", name: "Dark Mode", css: "#18181b", canvasColor: "#18181b" }
];


export function StripEditor({ photos, templateId, onFinish }: {
  photos: string[];
  templateId: string;
  onFinish: (canvas: HTMLCanvasElement) => void;
}) {
  const tpl = BOOTH_TEMPLATES.find((t) => t.id === templateId) || BOOTH_TEMPLATES[0];
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [bgId, setBgId] = useState("none");
  const [caption, setCaption] = useState("");
  const [tab, setTab] = useState<"stickers" | "bg" | "text">("stickers");
  const [stickerCounter, setStickerCounter] = useState(0);

  const selectedBg = BG_OPTIONS.find(b => b.id === bgId) || BG_OPTIONS[0];

  const applyStickerPack = (packItems: string[]) => {
    const numStickers = 3 + Math.floor(Math.random() * 2); 
    const newStickers: Sticker[] = [];
    
    let currentId = stickerCounter;
    for (let i = 0; i < numStickers; i++) {
      const randomEmoji = packItems[Math.floor(Math.random() * packItems.length)];
      const x = 15 + Math.random() * 60; 
      const y = 10 + Math.random() * 70; 
      const size = 24 + Math.floor(Math.random() * 12); 

      newStickers.push({
        id: currentId,
        emoji: randomEmoji,
        x,
        y,
        size
      });
      currentId++;
    }

    setStickers((prev) => [...prev, ...newStickers]);
    setStickerCounter(currentId);
  };

  const handleFinish = () => {
    const canvas = document.createElement("canvas");
    const stripEl = document.getElementById("final-strip");
    if (!stripEl) return;

    canvas.width = 400;
    canvas.height = photos.length * 320 + 120;
    const ctx = canvas.getContext("2d")!;

    // Background
    ctx.fillStyle = selectedBg.canvasColor || tpl.accent + "22";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw photos
    const promises = photos.map((src, i) => new Promise<void>((resolve) => {
      const img = new Image();
      img.onload = () => {
        const y = 20 + i * (280 + 20);
        ctx.strokeStyle = tpl.border;
        ctx.lineWidth = 4;
        ctx.strokeRect(20, y, 360, 270);
        ctx.drawImage(img, 22, y + 2, 356, 266);
        resolve();
      };
      img.src = src;
    }));

    Promise.all(promises).then(() => {
      // Caption
      if (caption) {
        ctx.fillStyle = tpl.textColor;
        ctx.font = "16px 'Press Start 2P', monospace";
        ctx.textAlign = "center";
        ctx.fillText(caption, 200, canvas.height - 30);
      }
      // Stickers
      stickers.forEach((s) => {
        ctx.font = `${s.size}px serif`;
        ctx.fillText(s.emoji, (s.x / 100) * 400, (s.y / 100) * canvas.height);
      });
      onFinish(canvas);
    });
  };

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-8"
      style={{ background: "linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 50%, #4a1942 100%)" }}>

      <h2 className="pixel-font text-sm text-white mb-2" style={{ textShadow: "2px 2px 0 #8b1a56" }}>
        ✨ Decorate Your Strip ✨
      </h2>
      <p className="pixel-font text-[7px] text-pink-300 opacity-80 mb-6">Tap a sticker pack to drop aesthetic packs randomly!</p>

      <div className="flex flex-col md:flex-row gap-6 px-4 z-10 mb-6">
        {/* Strip preview */}
        <div className="relative" id="final-strip">
          <div className="rounded-lg overflow-hidden p-3 space-y-2" style={{
            width: 200, background: selectedBg.css || tpl.bg, border: `4px solid ${tpl.border}`,
            boxShadow: "0 10px 25px rgba(0,0,0,0.4)"
          }}>
            {photos.map((p, i) => (
              <div key={i} className="w-full aspect-[4/3] rounded overflow-hidden"
                style={{ border: `3px solid ${tpl.border}` }}>
                <img src={p} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
            {caption && (
              <p className="pixel-font text-center py-2" style={{ fontSize: 7, color: tpl.textColor }}>
                {caption}
              </p>
            )}
          </div>

          {/* Rendered stickers overlay */}
          {stickers.map((s) => (
            <span key={s.id} className="absolute pointer-events-none pixel-pop select-none"
              style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: s.size }}>
              {s.emoji}
            </span>
          ))}
        </div>

        {/* Editor control panel */}
        <div className="pixel-border rounded-lg p-4 w-64 block-texture"
          style={{ background: "linear-gradient(180deg, #3d2b5a, #2d1b4e)" }}>

          {/* Tabs */}
          <div className="flex gap-1 mb-4">
            {(["stickers", "bg", "text"] as const).map((t) => (
              <button key={t} onClick={() => setTab(t)}
                className={`pixel-font text-[7px] px-3 py-2 rounded transition-colors ${
                  tab === t ? "bg-pink-600 text-white" : "bg-transparent text-pink-300 hover:bg-pink-900/30"
                }`}>
                {t === "stickers" ? "🎀 Packs" : t === "bg" ? "🎨 BG" : "✏️ Text"}
              </button>
            ))}
          </div>

          {tab === "stickers" && (
            <div className="space-y-2">
              <div className="pixel-font text-[6px] text-pink-300 opacity-60 mb-2">Trendy Packs:</div>
              {STICKER_PACKS.map((pack) => (
                <button key={pack.id} onClick={() => applyStickerPack(pack.items)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded bg-purple-950/40 border border-purple-800 hover:border-pink-500 transition-all text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">{pack.emoji}</span>
                    <span className="pixel-font text-[7px] text-white">{pack.name}</span>
                  </div>
                  <div className="flex gap-0.5 opacity-60">
                    {pack.items.slice(0, 3).map((item, idx) => (
                      <span key={idx} className="text-xs">{item}</span>
                    ))}
                  </div>
                </button>
              ))}
              {stickers.length > 0 && (
                <button onClick={() => setStickers([])} className="w-full text-center pixel-font text-[6px] text-red-400 mt-2 underline">
                  Clear Stickers
                </button>
              )}
            </div>
          )}

          {tab === "bg" && (
            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {BG_OPTIONS.map((b) => (
                <button key={b.id} onClick={() => setBgId(b.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded transition-colors ${
                    bgId === b.id ? "bg-pink-600/30 ring-1 ring-pink-500" : "hover:bg-pink-900/20"
                  }`}>
                  <div className="w-5 h-5 rounded" style={{ background: b.css || tpl.bg, border: "2px solid #8b1a56" }} />
                  <span className="pixel-font text-[7px] text-pink-200">{b.name}</span>
                </button>
              ))}
            </div>
          )}

          {tab === "text" && (
            <div className="space-y-3">
              <input value={caption} onChange={(e) => setCaption(e.target.value)}
                placeholder="Type caption here..."
                maxLength={20}
                className="w-full px-3 py-2 rounded bg-black/30 text-pink-200 pixel-font text-[8px] border border-pink-800 focus:border-pink-500 outline-none" />
              <p className="pixel-font text-[5px] text-pink-400 opacity-60 text-right">Max 20 chars</p>
            </div>
          )}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 z-10">
        <button onClick={handleFinish} className="pixel-btn pixel-btn-pink text-xs">
          🖨️ Print Strip
        </button>
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-16 block-texture" style={{ background: "#4a7c3f" }} />
      <div className="absolute bottom-0 left-0 right-0 h-6 block-texture" style={{ background: "#6b4423" }} />
    </div>
  );
}
