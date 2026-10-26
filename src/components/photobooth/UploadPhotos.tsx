import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import uploadBgUrl from "@/assets/photobooth-upload-bg.png";
import { BOOTH_FILTERS } from "./FilterSelect";

interface UploadPhotosProps {
  shotCount: number;
  filterId: string;
  photos: string[];
  onUpdate: (p: string[]) => void;
  onDone: () => void;
  onBack?: () => void;
}

export function UploadPhotos({
  shotCount,
  filterId,
  photos,
  onUpdate,
  onDone,
  onBack,
}: UploadPhotosProps) {
  const [loaded, setLoaded] = useState(false);
  const [hoveredSlot, setHoveredSlot] = useState<number | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Easter egg speech bubble states
  const [catSpeech, setCatSpeech] = useState(false);
  const [boardSpeech, setBoardSpeech] = useState(false);
  const [cameraSpeech, setCameraSpeech] = useState(false);
  const [wallSpeech, setWallSpeech] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const batchInputRef = useRef<HTMLInputElement | null>(null);
  const selectedFilter = BOOTH_FILTERS.find((f) => f.id === filterId) || BOOTH_FILTERS[0];

  useEffect(() => {
    setLoaded(true);
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2600);
  };

  const handleFile = (idx: number, file: File) => {
    if (!file.type.startsWith("image/")) return;
    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // Create canvas to bake the chosen filter into the photo
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

  const handleBatchFiles = (fileList: FileList) => {
    const validFiles = Array.from(fileList).filter((f) => f.type.startsWith("image/"));
    if (validFiles.length === 0) return;

    const next = [...photos];
    while (next.length < shotCount) next.push("");

    let processed = 0;
    validFiles.slice(0, shotCount).forEach((file, i) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d")!;
          if (selectedFilter.cssFilter !== "none") {
            ctx.filter = selectedFilter.cssFilter;
          }
          ctx.drawImage(img, 0, 0);
          next[i] = canvas.toDataURL("image/png");
          processed++;
          if (processed === Math.min(validFiles.length, shotCount)) {
            onUpdate([...next]);
            showToast(`Loaded ${processed} photo${processed > 1 ? "s" : ""}! ✨`);
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    });
  };

  const filledCount = photos.filter(Boolean).length;
  const allFilled = filledCount >= shotCount;

  const handleDownloadClick = () => {
    if (!allFilled) {
      if (filledCount === 0) {
        showToast("Tap any slot to upload photos first! 📸");
        return;
      }
      showToast(`Only ${filledCount}/${shotCount} slots filled! Fill all or preview ✨`);
    }
    onDone();
  };

  // Generate quick PNG download of the current strip
  const handleDirectDownload = () => {
    const validPhotos = photos.filter(Boolean);
    if (validPhotos.length === 0) {
      showToast("Please upload at least one photo first! 📸");
      return;
    }

    const canvas = document.createElement("canvas");
    const stripWidth = 400;
    const padding = 20;
    const slotH = 260;
    const headerH = 50;
    const footerH = 60;
    canvas.width = stripWidth;
    canvas.height = headerH + (slotH + padding) * shotCount + footerH;

    const ctx = canvas.getContext("2d")!;
    // Background
    ctx.fillStyle = "#2a133d";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Header title
    ctx.fillStyle = "#ff758f";
    ctx.font = "bold 16px monospace";
    ctx.textAlign = "center";
    ctx.fillText("♥ LITTLE STUDIO ♥", stripWidth / 2, 34);

    let loadedCount = 0;
    const totalToLoad = photos.slice(0, shotCount).length;

    photos.slice(0, shotCount).forEach((p, idx) => {
      const y = headerH + idx * (slotH + padding);
      if (!p) {
        ctx.fillStyle = "#3d2b5a";
        ctx.fillRect(padding, y, stripWidth - padding * 2, slotH);
        ctx.fillStyle = "#8b1a56";
        ctx.font = "14px monospace";
        ctx.fillText(`Slot ${idx + 1}`, stripWidth / 2, y + slotH / 2);
        loadedCount++;
        if (loadedCount === totalToLoad) finishDownload();
        return;
      }

      const img = new Image();
      img.onload = () => {
        ctx.save();
        ctx.beginPath();
        ctx.rect(padding, y, stripWidth - padding * 2, slotH);
        ctx.clip();
        ctx.drawImage(img, padding, y, stripWidth - padding * 2, slotH);
        ctx.restore();

        // Border around photo
        ctx.strokeStyle = "#8b1a56";
        ctx.lineWidth = 3;
        ctx.strokeRect(padding, y, stripWidth - padding * 2, slotH);

        loadedCount++;
        if (loadedCount === totalToLoad) finishDownload();
      };
      img.src = p;
    });

    function finishDownload() {
      // Footer date
      const footerY = canvas.height - 24;
      ctx.fillStyle = "#ffccd5";
      ctx.font = "12px monospace";
      ctx.textAlign = "center";
      ctx.fillText(new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }), stripWidth / 2, footerY);

      const a = document.createElement("a");
      a.href = canvas.toDataURL("image/png");
      a.download = `photobooth-strip-${Date.now()}.png`;
      a.click();
      showToast("Strip downloaded! 🎉");
    }
  };

  // Slot coordinates (proportional to 1024x576)
  const slotLayouts =
    shotCount === 4
      ? [
          { left: "44.4%", top: "19.8%", width: "12.0%", height: "13.2%" },
          { left: "44.4%", top: "33.7%", width: "12.0%", height: "13.2%" },
          { left: "44.4%", top: "47.6%", width: "12.0%", height: "13.2%" },
          { left: "44.4%", top: "61.3%", width: "12.0%", height: "13.2%" },
        ]
      : Array.from({ length: shotCount }).map((_, i) => {
          const totalHeight = 54.8;
          const slotH = totalHeight / shotCount - 1.2;
          const top = 19.8 + i * (slotH + 1.2);
          return {
            left: "44.4%",
            top: `${top}%`,
            width: "12.0%",
            height: `${slotH}%`,
          };
        });

  return (
    <div className="w-screen h-screen bg-[#1c0b2b] flex items-center justify-center overflow-hidden font-sans select-none relative m-0 p-0">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Quicksand:wght@600;700;800&display=swap');

        .pixel-text {
          font-family: 'Press Start 2P', monospace;
          image-rendering: pixelated;
        }

        @keyframes up-star-twinkle {
          0%, 100% { opacity: 0.35; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.15); }
        }

        @keyframes up-lamp-glow {
          0%, 100% {
            opacity: 0.55;
            filter: drop-shadow(0 0 6px rgba(255, 230, 150, 0.6));
          }
          50% {
            opacity: 0.95;
            filter: drop-shadow(0 0 16px rgba(255, 230, 150, 0.95));
          }
        }

        @keyframes up-slot-pulse {
          0%, 100% {
            box-shadow: 0 0 6px rgba(214, 51, 132, 0.4), inset 0 0 6px rgba(214, 51, 132, 0.2);
          }
          50% {
            box-shadow: 0 0 14px rgba(255, 117, 143, 0.8), inset 0 0 10px rgba(255, 117, 143, 0.5);
          }
        }

        .up-btn-hover:hover {
          transform: translateY(-2px) scale(1.02);
        }

        .up-btn-hover:active {
          transform: translateY(1px) scale(0.98);
        }
      `}</style>

      {/* Main Canvas Container: strictly locked to 1024x576 aspect ratio (16:9, Non-scrollable) */}
      <div
        className={`relative shadow-2xl transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: "min(100vw, calc(100vh * (1024 / 576)))",
          height: "min(100vh, calc(100vw * (576 / 1024)))",
          aspectRatio: "1024 / 576",
        }}
      >
        {/* ========================================= */}
        {/* 1. BASE PIXEL ART ENVIRONMENT             */}
        {/* ========================================= */}
        <img
          src={uploadBgUrl}
          alt="Photobooth Fill Your Strip"
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
              <span>←</span> FILTER
            </button>
          )}
          <Link
            to="/"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2a133d] border-2 border-[#f8a4c8] text-[#f8a4c8] text-[9px] font-bold shadow-[0_2px_0_#1a0826] hover:-translate-y-0.5 active:translate-y-0 transition-all no-underline pixel-text"
          >
            <span>←</span> STUDIO
          </Link>
          <button
            onClick={() => batchInputRef.current?.click()}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#ff758f] border-2 border-[#fff0f3] text-white text-[9px] font-bold shadow-[0_2px_0_#8b1a56] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer pixel-text"
            title="Upload multiple photos together"
          >
            <span>📁</span> BATCH UPLOAD
          </button>
          <input
            ref={batchInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => {
              if (e.target.files) handleBatchFiles(e.target.files);
              e.target.value = "";
            }}
          />
        </div>

        {/* ========================================= */}
        {/* 2. TWINKLING STARS IN SKY                 */}
        {/* ========================================= */}
        <div
          className="absolute pointer-events-none text-white text-[12px]"
          style={{ left: "12.5%", top: "9.5%", animation: "up-star-twinkle 3s ease-in-out infinite" }}
        >
          ✦
        </div>
        <div
          className="absolute pointer-events-none text-[#ffe8a3] text-[10px]"
          style={{ left: "34.5%", top: "16.0%", animation: "up-star-twinkle 2.5s ease-in-out infinite 0.7s" }}
        >
          ✨
        </div>
        <div
          className="absolute pointer-events-none text-white text-[9px]"
          style={{ left: "62.5%", top: "14.5%", animation: "up-star-twinkle 3.2s ease-in-out infinite 1.2s" }}
        >
          ✦
        </div>
        <div
          className="absolute pointer-events-none text-[#ffe8a3] text-[9px]"
          style={{ left: "85.0%", top: "11.0%", animation: "up-star-twinkle 2.7s ease-in-out infinite 0.5s" }}
        >
          ✦
        </div>

        {/* ========================================= */}
        {/* 3. WARM GLOWING PERGOLA LANTERNS          */}
        {/* ========================================= */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: "17.0%",
            top: "16.0%",
            width: "36px",
            height: "50px",
            background: "radial-gradient(circle, rgba(255,225,130,0.5) 0%, transparent 70%)",
            animation: "up-lamp-glow 2.8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: "77.5%",
            top: "16.0%",
            width: "36px",
            height: "50px",
            background: "radial-gradient(circle, rgba(255,225,130,0.5) 0%, transparent 70%)",
            animation: "up-lamp-glow 2.8s ease-in-out infinite 1.4s",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: "16.5%",
            top: "52.0%",
            width: "30px",
            height: "44px",
            background: "radial-gradient(circle, rgba(255,225,130,0.45) 0%, transparent 70%)",
            animation: "up-lamp-glow 3s ease-in-out infinite 0.5s",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: "83.8%",
            top: "52.0%",
            width: "30px",
            height: "44px",
            background: "radial-gradient(circle, rgba(255,225,130,0.45) 0%, transparent 70%)",
            animation: "up-lamp-glow 3s ease-in-out infinite 1.8s",
          }}
        />

        {/* Dynamic filter banner on wooden board (updates if not Pixel Retro) */}
        {selectedFilter.id !== "pixel" && (
          <div className="absolute top-[8.2%] left-1/2 -translate-x-1/2 text-center pointer-events-none z-10 whitespace-nowrap">
            <span className="pixel-text text-[6.5px] text-[#4a2411] font-bold bg-[#f6cfbf]/90 px-2 py-0.5 rounded shadow-xs">
              Filter: {selectedFilter.name} {selectedFilter.emoji}
            </span>
          </div>
        )}

        {/* ========================================= */}
        {/* 4. INTERACTIVE PHOTO STRIP SLOTS          */}
        {/* ========================================= */}
        {slotLayouts.map((layout, i) => {
          const hasPhoto = Boolean(photos[i]);
          const isHovered = hoveredSlot === i;

          return (
            <div
              key={i}
              onClick={() => inputRefs.current[i]?.click()}
              onMouseEnter={() => setHoveredSlot(i)}
              onMouseLeave={() => setHoveredSlot(null)}
              className="absolute z-20 cursor-pointer rounded-lg overflow-hidden transition-all duration-150"
              style={{
                left: layout.left,
                top: layout.top,
                width: layout.width,
                height: layout.height,
              }}
              title={hasPhoto ? `Slot ${i + 1} (Tap to change)` : `Tap to upload Slot ${i + 1}`}
            >
              {/* Outer hover border glow */}
              <div
                className={`absolute inset-0 rounded-lg pointer-events-none transition-all duration-150 ${
                  isHovered
                    ? "border-2 border-[#ff758f] shadow-[0_0_12px_rgba(255,117,143,0.9)]"
                    : hasPhoto
                    ? "border-2 border-[#d63384]/70"
                    : "border-2 border-transparent"
                }`}
                style={{
                  animation: !hasPhoto ? "up-slot-pulse 2s ease-in-out infinite" : undefined,
                }}
              />

              {hasPhoto ? (
                <div className="relative w-full h-full group">
                  <img
                    src={photos[i]}
                    alt={`Slot ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                    style={{ filter: selectedFilter.cssFilter }}
                  />
                  {/* Hover indicator to replace photo */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 pointer-events-none">
                    <span className="pixel-text text-[7px] text-white bg-[#ff758f] px-1.5 py-0.5 rounded shadow">
                      ✎ CHANGE
                    </span>
                  </div>
                </div>
              ) : (
                /* Invisible clickable hit area (background image already shows camera icon & Slot text) */
                <div className="w-full h-full flex flex-col items-center justify-center transition-all">
                  {isHovered && (
                    <div className="bg-[#ff758f]/90 text-white px-2 py-1 rounded text-[7px] pixel-text shadow-md animate-bounce">
                      UPLOAD +
                    </div>
                  )}
                </div>
              )}

              <input
                ref={(el) => {
                  inputRefs.current[i] = el;
                }}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const f = e.target.files?.[0];
                  if (f) handleFile(i, f);
                  e.target.value = "";
                }}
              />
            </div>
          );
        })}

        {/* ========================================= */}
        {/* 5. BOTTOM CONTROLS: DOWNLOAD & PREVIEW     */}
        {/* ========================================= */}

        {/* DOWNLOAD STRIP Button (Overlaid on the pink wooden button) */}
        <button
          onClick={handleDownloadClick}
          className="absolute z-20 cursor-pointer transition-all duration-150 up-btn-hover rounded-xl focus:outline-none"
          style={{
            left: "35.2%",
            top: "79.0%",
            width: "23.6%",
            height: "10.6%",
          }}
          title={allFilled ? "Proceed to customize & download!" : "Fill all slots to download"}
        >
          {/* Subtle glowing ring on hover */}
          <div className="w-full h-full rounded-xl hover:ring-2 hover:ring-[#ffe3eb] transition-all" />
        </button>

        {/* PREVIEW STRIP Button (Overlaid on dark wooden button) */}
        <button
          onClick={() => {
            if (filledCount === 0) {
              showToast("Upload at least 1 photo to preview! 📸");
              return;
            }
            setShowPreview(true);
          }}
          className="absolute z-20 cursor-pointer transition-all duration-150 up-btn-hover rounded-xl focus:outline-none"
          style={{
            left: "59.2%",
            top: "79.0%",
            width: "15.2%",
            height: "10.6%",
          }}
          title="Preview your assembled strip"
        >
          <div className="w-full h-full rounded-xl hover:ring-2 hover:ring-[#ffe3eb]/70 transition-all" />
        </button>

        {/* ========================================= */}
        {/* 6. EASTER EGGS: CAT, BOARD, CAMERA, WALL  */}
        {/* ========================================= */}

        {/* Sleeping Cat on Patio */}
        <div
          onClick={() => {
            setCatSpeech(true);
            setTimeout(() => setCatSpeech(false), 2400);
          }}
          className="absolute z-20 cursor-pointer rounded-full"
          style={{
            left: "19.0%",
            top: "71.0%",
            width: "9.5%",
            height: "11.5%",
          }}
          title="Pet the cozy cat!"
        >
          {catSpeech && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#ff758f] text-[#7c2d12] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              Purr~ so aesthetic! (=^･ω･^=) ♥
            </div>
          )}
        </div>

        {/* Chalkboard Sign: Smile Capture Cherish Repeat */}
        <div
          onClick={() => {
            setBoardSpeech(true);
            setTimeout(() => setBoardSpeech(false), 2400);
          }}
          className="absolute z-20 cursor-pointer rounded-lg hover:ring-2 hover:ring-[#ff758f]/40 transition-all"
          style={{
            left: "6.5%",
            top: "59.0%",
            width: "11.0%",
            height: "26.0%",
          }}
          title="Read the studio chalkboard"
        >
          {boardSpeech && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-[#2a133d] border-2 border-[#ff758f] text-[#ffccd5] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              ✨ Smile • Capture • Cherish ✨
            </div>
          )}
        </div>

        {/* Vintage Polaroid Camera on Crates */}
        <div
          onClick={() => {
            setCameraSpeech(true);
            setTimeout(() => setCameraSpeech(false), 2400);
          }}
          className="absolute z-20 cursor-pointer rounded-lg hover:ring-2 hover:ring-[#ff758f]/40 transition-all"
          style={{
            left: "82.5%",
            top: "62.0%",
            width: "13.5%",
            height: "24.0%",
          }}
          title="Vintage camera"
        >
          {cameraSpeech && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#5c3a1e] text-[#5c3a1e] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              *Click-whirr!* 📸 Cheese!
            </div>
          )}
        </div>

        {/* Hanging Pinned Photos on Posts */}
        <div
          onClick={() => {
            setWallSpeech(true);
            setTimeout(() => setWallSpeech(false), 2400);
          }}
          className="absolute z-20 cursor-pointer"
          style={{
            left: "22.5%",
            top: "28.0%",
            width: "6.5%",
            height: "24.0%",
          }}
          title="Pinned memory polaroids"
        >
          {wallSpeech && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#ff758f] text-[#7c2d12] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              Cute memories on the wall 💕
            </div>
          )}
        </div>

        {/* Floating Toast Notification */}
        {toastMessage && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 rounded-lg bg-[#2a133d] border-2 border-[#ff758f] text-[#ffd166] text-[9px] font-bold shadow-xl pixel-text animate-bounce">
            {toastMessage}
          </div>
        )}
      </div>

      {/* ========================================= */}
      {/* 7. PREVIEW STRIP RETRO MODAL              */}
      {/* ========================================= */}
      {showPreview && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="relative bg-[#2d1b4e] border-4 border-[#ff758f] rounded-2xl p-5 max-w-sm w-full shadow-2xl flex flex-col items-center">
            {/* Modal Header */}
            <div className="w-full flex justify-between items-center mb-4 pb-2 border-b-2 border-[#8b1a56]">
              <span className="pixel-text text-[10px] text-[#ffccd5]">
                👁️ STRIP PREVIEW ({filledCount}/{shotCount})
              </span>
              <button
                onClick={() => setShowPreview(false)}
                className="text-[#ff758f] hover:text-white text-base font-bold cursor-pointer px-1.5"
              >
                ✕
              </button>
            </div>

            {/* Assembled Film Strip */}
            <div
              className="bg-[#1c0b2b] p-3 rounded-xl border-2 border-[#8b1a56] shadow-inner space-y-2 w-44"
              style={{ maxHeight: "60vh", overflowY: "auto" }}
            >
              <div className="text-center text-[8px] pixel-text text-[#ff758f] pb-1">
                ♥ LITTLE STUDIO ♥
              </div>
              {Array.from({ length: shotCount }).map((_, idx) => (
                <div
                  key={idx}
                  className="w-full aspect-[4/3] rounded-md overflow-hidden bg-[#3d2b5a] border-2 border-[#8b1a56] flex items-center justify-center"
                >
                  {photos[idx] ? (
                    <img
                      src={photos[idx]}
                      alt={`Slot ${idx + 1}`}
                      className="w-full h-full object-cover"
                      style={{ filter: selectedFilter.cssFilter }}
                    />
                  ) : (
                    <span className="pixel-text text-[8px] text-pink-400 opacity-60">
                      Empty Slot {idx + 1}
                    </span>
                  )}
                </div>
              ))}
              <div className="text-center text-[7px] pixel-text text-pink-300 pt-1 opacity-70">
                {new Date().toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })}
              </div>
            </div>

            {/* Actions inside modal */}
            <div className="mt-4 flex flex-col w-full gap-2">
              <button
                onClick={handleDirectDownload}
                className="w-full py-2 rounded-lg bg-[#ff758f] border-2 border-white text-white text-[9px] font-bold shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer pixel-text"
              >
                📥 DOWNLOAD IMAGE (PNG)
              </button>
              <button
                onClick={() => {
                  setShowPreview(false);
                  onDone();
                }}
                className="w-full py-2 rounded-lg bg-[#3d2b5a] border-2 border-[#f8a4c8] text-[#f8a4c8] text-[9px] font-bold hover:bg-[#4d3b6a] transition-all cursor-pointer pixel-text"
              >
                🎨 CUSTOMIZE FRAME & STICKERS →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
