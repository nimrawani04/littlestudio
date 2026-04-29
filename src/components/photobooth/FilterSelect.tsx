export type BoothFilter = {
  id: string;
  name: string;
  emoji: string;
  cssFilter: string;
};

export const BOOTH_FILTERS: BoothFilter[] = [
  { id: "none", name: "No Filter", emoji: "✨", cssFilter: "none" },
  { id: "grayscale", name: "Black & White", emoji: "🏁", cssFilter: "grayscale(100%)" },
  { id: "sepia", name: "Vintage Sepia", emoji: "🎞️", cssFilter: "sepia(80%)" },
  { id: "warm", name: "Warm Glow", emoji: "🌅", cssFilter: "sepia(20%) saturate(140%)" },
  { id: "cool", name: "Cyber Cool", emoji: "❄️", cssFilter: "hue-rotate(180deg) saturate(120%)" },
  { id: "pixel", name: "Pixel Retro", emoji: "👾", cssFilter: "contrast(120%) saturate(80%)" }
];

export function FilterSelect({ selected, onSelect, onNext }: {
  selected: string;
  onSelect: (id: string) => void;
  onNext: () => void;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 50%, #4a1942 100%)" }}>

      <h2 className="pixel-font text-sm text-white mb-2" style={{ textShadow: "2px 2px 0 #8b1a56" }}>
        📸 Choose a Filter
      </h2>
      <p className="pixel-font text-[8px] text-pink-300 mb-8 opacity-70">choose your vibe before taking photos</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 px-4 max-w-lg mb-8">
        {BOOTH_FILTERS.map((f) => (
          <button key={f.id} onClick={() => onSelect(f.id)}
            className={`pixel-border rounded-lg p-4 cursor-pointer flex flex-col items-center gap-2 transition-transform hover:scale-105 block-texture ${
              selected === f.id ? "border-pink-500 bg-pink-900/30 shadow-[0_0_15px_rgba(214,51,132,0.5)]" : "bg-purple-900/20 border-purple-950"
            }`}
            style={{ width: 140 }}>
            <span className="text-3xl" style={{ filter: f.cssFilter }}>{f.emoji}</span>
            <span className="pixel-font text-[8px] text-white text-center mt-2">{f.name}</span>
          </button>
        ))}
      </div>

      <button onClick={onNext} className="pixel-btn pixel-btn-pink">
        ✅ Set Filter
      </button>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-16 block-texture" style={{ background: "#4a7c3f" }} />
      <div className="absolute bottom-0 left-0 right-0 h-6 block-texture" style={{ background: "#6b4423" }} />
    </div>
  );
}
