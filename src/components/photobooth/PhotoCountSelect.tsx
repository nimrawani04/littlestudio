export function PhotoCountSelect({ onSelect }: { onSelect: (n: number) => void }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 50%, #4a1942 100%)" }}>

      <h2 className="pixel-font text-base text-white mb-2"
        style={{ textShadow: "3px 3px 0 #8b1a56" }}>Film Choice</h2>
      <p className="pixel-font text-[8px] text-pink-300 mb-10 opacity-70">
        how many shots?
      </p>

      <div className="flex gap-8">
        {[3, 4].map((n) => (
          <button key={n} onClick={() => onSelect(n)}
            className="group flex flex-col items-center gap-3 cursor-pointer transition-transform hover:scale-105">
            {/* Film strip */}
            <div className="pixel-border rounded-lg p-3 w-28 block-texture transition-shadow group-hover:shadow-[0_0_20px_rgba(255,105,180,0.5)]"
              style={{ background: "linear-gradient(180deg, #3d2b5a, #2d1b4e)" }}>
              {Array.from({ length: n }).map((_, i) => (
                <div key={i} className="w-full aspect-square mb-2 last:mb-0 rounded"
                  style={{
                    border: "3px solid #8b1a56",
                    background: "linear-gradient(135deg, rgba(255,105,180,0.1), rgba(255,105,180,0.05))",
                  }}>
                  <div className="w-full h-full flex items-center justify-center text-pink-400 opacity-40">
                    <span className="text-lg">📷</span>
                  </div>
                </div>
              ))}
            </div>
            <span className="pixel-font text-xs text-white group-hover:text-pink-300 transition-colors">
              {n} shots
            </span>
          </button>
        ))}
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-16 block-texture" style={{ background: "#4a7c3f" }} />
      <div className="absolute bottom-0 left-0 right-0 h-6 block-texture" style={{ background: "#6b4423" }} />
    </div>
  );
}
