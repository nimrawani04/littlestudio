import { useRef } from "react";
import { BOOTH_FILTERS } from "./FilterSelect";

export function UploadPhotos({ shotCount, filterId, photos, onUpdate, onDone }: {
  shotCount: number;
  filterId: string;
  photos: string[];
  onUpdate: (p: string[]) => void;
  onDone: () => void;
}) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const selectedFilter = BOOTH_FILTERS.find(f => f.id === filterId) || BOOTH_FILTERS[0];

  const handleFile = (idx: number, file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // Create canvas to apply filter
        const canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext("2d")!;

        if (selectedFilter.cssFilter !== "none") {
          ctx.filter = selectedFilter.cssFilter;
        }

        ctx.drawImage(img, 0, 0);

        const filteredSrc = canvas.toDataURL("image/png");
        const next = [...photos];
        while (next.length < shotCount) next.push("");
        next[idx] = filteredSrc;
        onUpdate(next);
      };
      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  };

  const allFilled = photos.filter(Boolean).length >= shotCount;

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 50%, #4a1942 100%)" }}>

      <h2 className="pixel-font text-sm text-white mb-2" style={{ textShadow: "2px 2px 0 #8b1a56" }}>
        🖼️ Fill Your Strip
      </h2>
      <p className="pixel-font text-[8px] text-pink-300 mb-8 opacity-70">
        tap each slot to upload (Filter applied: {selectedFilter.name})
      </p>

      {/* Upload slots */}
      <div className="pixel-border rounded-lg p-4 space-y-3 block-texture"
        style={{ background: "linear-gradient(180deg, #3d2b5a, #2d1b4e)", width: 200 }}>
        {Array.from({ length: shotCount }).map((_, i) => (
          <button key={i} onClick={() => inputRefs.current[i]?.click()}
            className="w-full aspect-[4/3] rounded-lg overflow-hidden transition-transform hover:scale-105 cursor-pointer"
            style={{
              border: "4px solid #8b1a56",
              background: photos[i] ? "transparent" : "linear-gradient(135deg, rgba(214,51,132,0.1), rgba(139,26,86,0.2))",
            }}>
            {photos[i] ? (
              <img src={photos[i]} alt={`Slot ${i + 1}`} className="w-full h-full object-cover pixel-pop" style={{ filter: selectedFilter.cssFilter }} />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center gap-1">
                <span className="text-2xl">📷</span>
                <span className="pixel-font text-[7px] text-pink-400 opacity-60">Slot {i + 1}</span>
              </div>
            )}
            <input ref={(el) => { inputRefs.current[i] = el; }}
              type="file" accept="image/*" className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(i, f); e.target.value = ""; }} />
          </button>
        ))}
      </div>

      {allFilled && (
        <button onClick={onDone} className="pixel-btn pixel-btn-green mt-6 pixel-bounce">
          ✅ Continue
        </button>
      )}

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-16 block-texture" style={{ background: "#4a7c3f" }} />
      <div className="absolute bottom-0 left-0 right-0 h-6 block-texture" style={{ background: "#6b4423" }} />
    </div>
  );
}
