export type BoothTemplate = {
  id: string; name: string; emoji: string;
  bg: string; border: string; accent: string; textColor: string;
  labelBg: string;
};

export const BOOTH_TEMPLATES: BoothTemplate[] = [
  { id: "pastel", name: "Pastel Pink", emoji: "💗",
    bg: "linear-gradient(180deg, #ffe4f0, #ffc2d9)", border: "#d63384", accent: "#ff69b4", textColor: "#8b1a56",
    labelBg: "#fff0f5" },
  { id: "floral", name: "Floral Vines", emoji: "🌸",
    bg: "linear-gradient(180deg, #f0fff0, #d4edda)", border: "#2d8b4e", accent: "#6bcf7f", textColor: "#1a5c32",
    labelBg: "#e8f5e9" },
  { id: "dark", name: "Dark Stone", emoji: "🖤",
    bg: "linear-gradient(180deg, #2d2d2d, #1a1a1a)", border: "#555", accent: "#888", textColor: "#e0e0e0",
    labelBg: "#333" },
  { id: "kawaii", name: "Kawaii Hearts", emoji: "🧸",
    bg: "linear-gradient(180deg, #fff0f5, #ffe4ec)", border: "#ff69b4", accent: "#ff1493", textColor: "#c71585",
    labelBg: "#fff5f8" },
  { id: "vintage", name: "Vintage Sepia", emoji: "📸",
    bg: "linear-gradient(180deg, #f5e6d0, #e8d5b8)", border: "#8b7355", accent: "#a0845c", textColor: "#5c4033",
    labelBg: "#faf0e4" },
];

export function TemplateSelect({ selected, onSelect }: {
  selected: string; onSelect: (id: string) => void;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 50%, #4a1942 100%)" }}>

      <h2 className="pixel-font text-sm text-white mb-2" style={{ textShadow: "2px 2px 0 #8b1a56" }}>
        🎀 Choose Your Vibe
      </h2>
      <p className="pixel-font text-[8px] text-pink-300 mb-8 opacity-70">pick a template</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 max-w-lg">
        {BOOTH_TEMPLATES.map((t) => (
          <button key={t.id} onClick={() => onSelect(t.id)}
            className={`template-poster rounded-lg overflow-hidden cursor-pointer ${selected === t.id ? "selected" : ""}`}
            style={{ width: 140 }}>
            <div className="h-36 flex flex-col items-center justify-center p-3" style={{ background: t.bg }}>
              <span className="text-3xl mb-2">{t.emoji}</span>
              {/* Mini strip preview */}
              <div className="space-y-1">
                {[1,2,3].map((i) => (
                  <div key={i} className="w-16 h-4 rounded-sm" style={{ border: `2px solid ${t.border}`, background: `${t.accent}22` }} />
                ))}
              </div>
            </div>
            <div className="p-2 text-center" style={{ background: t.labelBg }}>
              <span className="pixel-font text-[7px]" style={{ color: t.textColor }}>{t.name}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-16 block-texture" style={{ background: "#4a7c3f" }} />
      <div className="absolute bottom-0 left-0 right-0 h-6 block-texture" style={{ background: "#6b4423" }} />
    </div>
  );
}
