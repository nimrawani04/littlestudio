export function BoothControlPanel({ onCamera, onUpload, onBack }: {
  onCamera: () => void; onUpload: () => void; onBack: () => void;
}) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 50%, #4a1942 100%)" }}>

      {/* Lanterns */}
      <div className="absolute top-4 left-0 right-0 flex justify-center gap-10 pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i} className="lantern-glow text-xl" style={{ animationDelay: `${i * 0.5}s` }}>🏮</span>
        ))}
      </div>

      <h2 className="pixel-font text-base md:text-lg text-white mb-2"
        style={{ textShadow: "3px 3px 0 #8b1a56" }}>Control Panel</h2>
      <p className="pixel-font text-[8px] text-pink-300 mb-10 opacity-70">choose what to do</p>

      {/* Block panel */}
      <div className="pixel-border rounded-lg p-6 w-72 md:w-80 space-y-5 block-texture"
        style={{ background: "linear-gradient(180deg, #3d2b5a, #2d1b4e)" }}>

        <button onClick={onCamera}
          className="pixel-btn pixel-btn-pink w-full flex items-center justify-center gap-3">
          <span className="text-lg">📸</span> Use Camera
        </button>

        <button onClick={onUpload}
          className="pixel-btn pixel-btn-green w-full flex items-center justify-center gap-3">
          <span className="text-lg">🖼️</span> Upload Photos
        </button>

        <button onClick={onBack}
          className="pixel-btn pixel-btn-amber w-full flex items-center justify-center gap-3">
          <span className="text-lg">🚪</span> Exit Booth
        </button>
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-16 block-texture" style={{ background: "#4a7c3f" }} />
      <div className="absolute bottom-0 left-0 right-0 h-6 block-texture" style={{ background: "#6b4423" }} />
    </div>
  );
}
