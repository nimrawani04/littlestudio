import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import editorBgUrl from "@/assets/photobooth-editor-bg.png";
import { BOOTH_TEMPLATES } from "./TemplateSelect";

type Sticker = { id: number; emoji: string; x: number; y: number; size: number };

export const STICKER_PACKS = [
  { id: "girly_pop", name: "Girly Pop", emoji: "🎀", items: ["🎀", "💋", "💖", "🍓", "🍑", "🌸", "🌷", "🩰"] },
  { id: "cute_critters", name: "Cute Critters", emoji: "🧸", items: ["🐰", "🦭", "🐥", "🧸", "🐱", "🐶", "🐼", "🐇"] },
  { id: "trendy_y2k", name: "Trendy Y2K", emoji: "✨", items: ["✨", "🤍", "🖤", "🍀", "💎", "🍄", "💲", "🍵"] },
  { id: "holiday", name: "Winter/Holiday", emoji: "🧦", items: ["🍪", "🧦", "🎄", "❄️", "⛄", "🎁"] },
];

export const BG_OPTIONS = [
  { id: "none", name: "Default", css: "", canvasColor: "" },
  { id: "pastel-pink", name: "Pastel Pink", css: "#ffe4e6", canvasColor: "#ffe4e6" },
  { id: "pastel-blue", name: "Pastel Blue", css: "#e0f2fe", canvasColor: "#e0f2fe" },
  { id: "pastel-yellow", name: "Pastel Yellow", css: "#fef9c3", canvasColor: "#fef9c3" },
  { id: "pastel-green", name: "Pastel Green", css: "#dcfce7", canvasColor: "#dcfce7" },
  { id: "pastel-purple", name: "Pastel Purple", css: "#f3e8ff", canvasColor: "#f3e8ff" },
  { id: "pastel-beige", name: "Pastel Beige", css: "#f5f5dc", canvasColor: "#f5f5dc" },
  { id: "pink-glimmer", name: "Pink Glimmer", css: "linear-gradient(135deg, #fbcfe8, #f472b6)", canvasColor: "#f472b6" },
  { id: "sunset", name: "Peach Sunset", css: "linear-gradient(135deg, #ffedd5, #fecdd3)", canvasColor: "#fecdd3" },
  { id: "cyber", name: "Cyberpunk", css: "linear-gradient(135deg, #a21caf, #3b82f6)", canvasColor: "#a21caf" },
  { id: "cloudy", name: "Cloudy Sky", css: "linear-gradient(180deg, #38bdf8, #bae6fd)", canvasColor: "#bae6fd" },
  { id: "emerald", name: "Emerald Sea", css: "linear-gradient(135deg, #a7f3d0, #059669)", canvasColor: "#a7f3d0" },
];

interface StripEditorProps {
  photos: string[];
  templateId: string;
  onFinish: (canvas: HTMLCanvasElement) => void;
  onBack?: () => void;
}

export function StripEditor({ photos, templateId, onFinish, onBack }: StripEditorProps) {
  const tpl = BOOTH_TEMPLATES.find((t) => t.id === templateId) || BOOTH_TEMPLATES[0];
  const [loaded, setLoaded] = useState(false);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [bgId, setBgId] = useState("none");
  const [caption, setCaption] = useState("Best Day Ever! ♥");
  const [tab, setTab] = useState<"stickers" | "bg" | "text">("stickers");
  const [stickerCounter, setStickerCounter] = useState(0);

  // Easter eggs
  const [catSpeech, setCatSpeech] = useState(false);
  const [boardSpeech, setBoardSpeech] = useState(false);
  const [cameraSpeech, setCameraSpeech] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const selectedBg = BG_OPTIONS.find((b) => b.id === bgId) || BG_OPTIONS[0];

  const applyStickerPack = (packItems: string[]) => {
    const numStickers = 3 + Math.floor(Math.random() * 2);
    const newStickers: Sticker[] = [];

    let currentId = stickerCounter;
    for (let i = 0; i < numStickers; i++) {
      const randomEmoji = packItems[Math.floor(Math.random() * packItems.length)];
      const x = 10 + Math.random() * 75;
      const y = 8 + Math.random() * 80;
      const size = 18 + Math.floor(Math.random() * 10);

      newStickers.push({
        id: currentId,
        emoji: randomEmoji,
        x,
        y,
        size,
      });
      currentId++;
    }

    setStickers((prev) => [...prev, ...newStickers]);
    setStickerCounter(currentId);
  };

  const handleFinish = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    const padding = 20;
    const slotH = 260;
    const headerH = 45;
    const footerH = 65;
    canvas.height = headerH + (slotH + padding) * photos.length + footerH;
    const ctx = canvas.getContext("2d")!;

    // Background
    ctx.fillStyle = selectedBg.canvasColor || (tpl.id === "dark" ? "#1f1f1f" : "#fff0f5");
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Frame border
    ctx.strokeStyle = tpl.border;
    ctx.lineWidth = 6;
    ctx.strokeRect(3, 3, canvas.width - 6, canvas.height - 6);

    // Header
    ctx.fillStyle = tpl.textColor;
    ctx.font = "bold 15px 'Press Start 2P', monospace";
    ctx.textAlign = "center";
    ctx.fillText("♥ LITTLE STUDIO ♥", 200, 32);

    // Draw photos
    const promises = photos.map((src, i) => {
      return new Promise<void>((resolve) => {
        const y = headerH + i * (slotH + padding);
        if (!src) {
          ctx.fillStyle = "#3d2b5a";
          ctx.fillRect(padding, y, 400 - padding * 2, slotH);
          resolve();
          return;
        }
        const img = new Image();
        img.onload = () => {
          ctx.save();
          ctx.beginPath();
          ctx.rect(padding, y, 400 - padding * 2, slotH);
          ctx.clip();
          ctx.drawImage(img, padding, y, 400 - padding * 2, slotH);
          ctx.restore();

          ctx.strokeStyle = tpl.border;
          ctx.lineWidth = 3;
          ctx.strokeRect(padding, y, 400 - padding * 2, slotH);
          resolve();
        };
        img.src = src;
      });
    });

    Promise.all(promises).then(() => {
      // Caption
      if (caption) {
        ctx.fillStyle = tpl.textColor;
        ctx.font = "bold 13px 'Press Start 2P', cursive, monospace";
        ctx.textAlign = "center";
        ctx.fillText(caption, 200, canvas.height - 25);
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
    <div className="w-screen h-screen bg-[#1c0b2b] flex items-center justify-center overflow-hidden font-sans select-none relative m-0 p-0">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Quicksand:wght@600;700;800&display=swap');

        .pixel-text {
          font-family: 'Press Start 2P', monospace;
          image-rendering: pixelated;
        }

        .ed-btn-hover:hover {
          transform: translateY(-2px) scale(1.02);
        }

        .ed-btn-hover:active {
          transform: translateY(1px) scale(0.98);
        }
      `}</style>

      {/* Main Canvas Container: locked to 1024x481 aspect ratio */}
      <div
        className={`relative shadow-2xl transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: "min(100vw, calc(100vh * (1024 / 481)))",
          height: "min(100vh, calc(100vw * (481 / 1024)))",
          aspectRatio: "1024 / 481",
        }}
      >
        {/* ========================================= */}
        {/* 1. BASE PIXEL ART ENVIRONMENT             */}
        {/* ========================================= */}
        <img
          src={editorBgUrl}
          alt="Decorate Your Strip"
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
              <span>←</span> TEMPLATE
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
        {/* 2. STRIP PREVIEW ON LEFT                  */}
        {/* ========================================= */}
        <div
          className="absolute z-20 overflow-hidden flex flex-col items-center justify-start p-1.5"
          style={{
            left: "31.4%",
            top: "18.5%",
            width: "15.6%",
            height: "62.5%",
          }}
        >
          <div
            id="final-strip"
            className="relative w-full h-full rounded-md overflow-hidden flex flex-col p-1.5 space-y-1 shadow-inner"
            style={{
              background: selectedBg.css || (tpl.id === "dark" ? "#1f1f1f" : "#fff0f5"),
              border: `2px solid ${tpl.border}`,
            }}
          >
            {/* Header branding */}
            <div
              className="text-center pixel-text text-[5px] font-bold py-0.5 truncate"
              style={{ color: tpl.textColor }}
            >
              ♥ STUDIO ♥
            </div>

            {/* Photos */}
            <div className="flex-1 flex flex-col justify-between gap-1 overflow-hidden">
              {photos.map((p, i) => (
                <div
                  key={i}
                  className="w-full flex-1 rounded overflow-hidden bg-black/20"
                  style={{ border: `1.5px solid ${tpl.border}` }}
                >
                  {p ? (
                    <img src={p} alt={`Snap ${i + 1}`} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[7px] text-pink-300">
                      📷
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Caption */}
            {caption && (
              <p
                className="pixel-text text-center text-[5.5px] truncate pt-0.5 font-bold"
                style={{ color: tpl.textColor }}
              >
                {caption}
              </p>
            )}

            {/* Rendered stickers overlay */}
            {stickers.map((s) => (
              <span
                key={s.id}
                className="absolute pointer-events-none select-none drop-shadow"
                style={{ left: `${s.x}%`, top: `${s.y}%`, fontSize: `${Math.round(s.size * 0.65)}px` }}
              >
                {s.emoji}
              </span>
            ))}
          </div>
        </div>

        {/* ========================================= */}
        {/* 3. CONTROLS PANEL ON RIGHT                */}
        {/* ========================================= */}
        <div
          className="absolute z-20 flex flex-col"
          style={{
            left: "48.2%",
            top: "18.2%",
            width: "24.0%",
            height: "63.0%",
          }}
        >
          {/* Custom Tabs */}
          <div className="flex gap-1 mb-2 px-1">
            <button
              onClick={() => setTab("stickers")}
              className={`flex-1 py-1 rounded text-[7px] pixel-text font-bold transition-all cursor-pointer ${
                tab === "stickers"
                  ? "bg-[#ff758f] text-white shadow-xs"
                  : "bg-white/70 text-[#5c3a1e] hover:bg-white"
              }`}
            >
              🌸 Packs
            </button>
            <button
              onClick={() => setTab("bg")}
              className={`flex-1 py-1 rounded text-[7px] pixel-text font-bold transition-all cursor-pointer ${
                tab === "bg"
                  ? "bg-[#ff758f] text-white shadow-xs"
                  : "bg-white/70 text-[#5c3a1e] hover:bg-white"
              }`}
            >
              🖼️ BG
            </button>
            <button
              onClick={() => setTab("text")}
              className={`flex-1 py-1 rounded text-[7px] pixel-text font-bold transition-all cursor-pointer ${
                tab === "text"
                  ? "bg-[#ff758f] text-white shadow-xs"
                  : "bg-white/70 text-[#5c3a1e] hover:bg-white"
              }`}
            >
              T Text
            </button>
          </div>

          {/* Tab Content Area */}
          <div
            className="flex-1 overflow-y-auto px-1 space-y-1.5"
            style={{ maxHeight: "calc(100% - 32px)" }}
          >
            {tab === "stickers" && (
              <div className="space-y-1.5">
                {STICKER_PACKS.map((pack) => (
                  <button
                    key={pack.id}
                    onClick={() => applyStickerPack(pack.items)}
                    className="w-full flex items-center justify-between p-1.5 rounded-lg bg-white/80 hover:bg-white border border-[#f8a4c8] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm">{pack.emoji}</span>
                      <span className="pixel-text text-[6.5px] text-[#4a2411] font-bold">
                        {pack.name}
                      </span>
                    </div>
                    <div className="flex gap-0.5 opacity-80 text-[10px]">
                      {pack.items.slice(0, 3).map((item, idx) => (
                        <span key={idx}>{item}</span>
                      ))}
                    </div>
                  </button>
                ))}
                {stickers.length > 0 && (
                  <button
                    onClick={() => setStickers([])}
                    className="w-full text-center pixel-text text-[6.5px] text-red-500 py-1 hover:underline cursor-pointer"
                  >
                    ✕ Clear All Stickers
                  </button>
                )}
              </div>
            )}

            {tab === "bg" && (
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                {BG_OPTIONS.map((b) => (
                  <button
                    key={b.id}
                    onClick={() => setBgId(b.id)}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded-lg border transition-all cursor-pointer ${
                      bgId === b.id
                        ? "bg-[#ff758f]/20 border-[#ff758f] shadow-xs"
                        : "bg-white/70 border-stone-200 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded border border-stone-300 shadow-xs"
                        style={{ background: b.css || tpl.bg }}
                      />
                      <span className="pixel-text text-[6.5px] text-[#4a2411]">
                        {b.name}
                      </span>
                    </div>
                    {bgId === b.id && <span className="text-[9px] text-[#ff758f]">✓</span>}
                  </button>
                ))}
              </div>
            )}

            {tab === "text" && (
              <div className="space-y-2 p-1">
                <label className="pixel-text text-[6.5px] text-[#4a2411] block">
                  Strip Caption:
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g. Best Day Ever! ♥"
                  maxLength={24}
                  className="w-full px-2 py-1.5 rounded bg-white border border-[#f8a4c8] text-[#4a2411] pixel-text text-[7px] focus:outline-none focus:ring-1 focus:ring-[#ff758f]"
                />
                <p className="pixel-text text-[5px] text-stone-500 text-right">
                  {caption.length}/24 chars
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ========================================= */}
        {/* 4. PRINT STRIP BUTTON                     */}
        {/* ========================================= */}
        <button
          onClick={handleFinish}
          className="absolute z-20 cursor-pointer transition-all duration-150 ed-btn-hover rounded-xl focus:outline-none"
          style={{
            left: "38.6%",
            top: "84.5%",
            width: "22.8%",
            height: "9.5%",
          }}
          title="Print & finalize your strip!"
        >
          <div className="w-full h-full rounded-xl hover:ring-2 hover:ring-white/80 transition-all" />
        </button>

        {/* ========================================= */}
        {/* 5. EASTER EGGS: CAT, BOARD, CAMERA        */}
        {/* ========================================= */}
        {/* Cat on Gingham Cloth */}
        <div
          onClick={() => {
            setCatSpeech(true);
            setTimeout(() => setCatSpeech(false), 2400);
          }}
          className="absolute z-20 cursor-pointer rounded-full"
          style={{
            left: "2.5%",
            top: "69.0%",
            width: "9.5%",
            height: "12.0%",
          }}
          title="Pet the cat!"
        >
          {catSpeech && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#ff758f] text-[#7c2d12] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              Purr~ looking so stylish! (=^･ω･^=) ♥
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
            left: "8.5%",
            top: "38.0%",
            width: "8.5%",
            height: "25.0%",
          }}
          title="Studio chalkboard"
        >
          {boardSpeech && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-[#2a133d] border-2 border-[#ff758f] text-[#ffccd5] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              ✨ Smile • Capture • Cherish ✨
            </div>
          )}
        </div>

        {/* Vintage Camera */}
        <div
          onClick={() => {
            setCameraSpeech(true);
            setTimeout(() => setCameraSpeech(false), 2400);
          }}
          className="absolute z-20 cursor-pointer rounded-lg hover:ring-2 hover:ring-[#ff758f]/40 transition-all"
          style={{
            left: "9.5%",
            top: "62.0%",
            width: "8.5%",
            height: "18.0%",
          }}
          title="Instant camera"
        >
          {cameraSpeech && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#5c3a1e] text-[#5c3a1e] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              *Click-whirr!* 📸
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
