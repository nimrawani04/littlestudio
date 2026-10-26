import { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "@tanstack/react-router";
import polaroidBgUrl from "@/assets/polaroid-pixel-art.png";
import developingBgUrl from "@/assets/polaroid-developing-bg.png";

export function PolaroidCamera({ onCapture }: { onCapture: (img: string) => void }) {
  const [mode, setMode] = useState<"entry" | "viewfinder" | "printing">("entry");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string>("");
  const [developProgress, setDevelopProgress] = useState(0);
  const [flash, setFlash] = useState(false);
  const [shake, setShake] = useState(false);
  const [error, setError] = useState("");
  const [catPurr, setCatPurr] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: 640, height: 480 } });
      setStream(s);
      setMode("viewfinder");
    } catch {
      setError("Camera access denied or unavailable.");
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setCapturedImage(reader.result as string);
        setMode("printing");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCatClick = () => {
    setCatPurr(true);
    setTimeout(() => setCatPurr(false), 2000);
  };

  useEffect(() => {
    if (mode === "viewfinder" && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    return () => {
      if (mode !== "viewfinder" && stream) {
        stream.getTracks().forEach((t) => t.stop());
        setStream(null);
      }
    };
  }, [mode, stream]);

  const takePhoto = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    setShake(true);
    setFlash(true);
    setTimeout(() => setFlash(false), 200);
    setTimeout(() => setShake(false), 400);

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d")!;
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);
    const imgData = canvas.toDataURL("image/png");

    setTimeout(() => {
      setCapturedImage(imgData);
      setMode("printing");
    }, 600);
  }, []);

  useEffect(() => {
    if (mode === "printing") {
      setDevelopProgress(0);
      const startTime = Date.now();
      const duration = 3500;
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const p = Math.min(100, Math.round((elapsed / duration) * 100));
        setDevelopProgress(p);
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onCapture(capturedImage);
          }, 350);
        }
      }, 40);

      return () => clearInterval(interval);
    }
  }, [mode, capturedImage, onCapture]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#ffe4e1]">
        <div className="text-center p-8">
          <span className="text-5xl block mb-4">😿</span>
          <p className="pixel-font text-xs text-pink-600 mb-4">{error}</p>
          <button
            onClick={() => { setError(""); setMode("entry"); }}
            className="pixel-btn pixel-btn-pink text-xs"
          >
            ← Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-[#ff9e5e] flex items-center justify-center overflow-hidden font-sans select-none relative m-0 p-0">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Quicksand:wght@600;700;800&display=swap');

        @keyframes polaroid-lantern {
          0%, 100% {
            opacity: 0.55;
            filter: drop-shadow(0 0 8px rgba(255, 235, 120, 0.7));
          }
          50% {
            opacity: 0.9;
            filter: drop-shadow(0 0 16px rgba(255, 235, 120, 0.95));
          }
        }

        @keyframes polaroid-sun-glimmer {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.9; }
        }

        @keyframes polaroid-float-heart {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-4px) scale(1.1); }
        }

        @keyframes polaroid-shake {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-5px, 5px); }
          50% { transform: translate(5px, -5px); }
          75% { transform: translate(-5px, -5px); }
        }

        @keyframes polaroid-dev-star {
          0%, 100% {
            opacity: 0.35;
            transform: scale(0.85);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes polaroid-print-slide {
          0% {
            transform: translateY(-55%);
            opacity: 0.6;
          }
          30% {
            opacity: 1;
          }
          100% {
            transform: translateY(0%);
            opacity: 1;
          }
        }

        @keyframes polaroid-photo-reveal {
          0% {
            opacity: 0.15;
            filter: blur(2px) grayscale(90%) contrast(150%);
          }
          45% {
            opacity: 0.65;
            filter: blur(1px) sepia(45%) contrast(120%);
          }
          100% {
            opacity: 1;
            filter: blur(0px) none;
          }
        }

        .pixel-text {
          font-family: 'Press Start 2P', monospace;
          image-rendering: pixelated;
        }

        .btn-hover-lift:hover {
          transform: translateY(-2px) scale(1.02);
        }

        .btn-hover-lift:active {
          transform: translateY(1px) scale(0.98);
        }
      `}</style>

      {/* Main Canvas Container: strictly locked to viewport & aspect ratio */}
      <div
        className={`relative shadow-2xl transition-opacity duration-700 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        style={{
          width: "min(100vw, calc(100vh * (1024 / 477)))",
          height: "min(100vh, calc(100vw * (477 / 1024)))",
          aspectRatio: "1024 / 477",
        }}
      >
        {/* ========================================= */}
        {/* ENTRY MODE: FULL PIXEL ART SUNSET SCENE   */}
        {/* ========================================= */}
        {mode === "entry" && (
          <>
            <img
              src={polaroidBgUrl}
              alt="Polaroid Camera Sunset"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              style={{ imageRendering: "pixelated" }}
            />

            {/* Back to Studio Navigation Link */}
            <Link
              to="/"
              className="absolute top-3 left-3 z-50 flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#3b1d11] border-2 border-[#ffcb8f] text-[#ffcb8f] text-[9px] font-bold shadow-[0_2px_0_#1f0d06] hover:-translate-y-0.5 hover:shadow-[0_4px_0_#1f0d06] active:translate-y-0 active:shadow-none transition-all no-underline pixel-text"
            >
              <span>←</span> STUDIO
            </Link>

            {/* Lantern on Wooden Post Glow */}
            <div
              className="absolute rounded-full pointer-events-none bg-[#ffe082]/40"
              style={{
                left: "9.2%",
                top: "14.0%",
                width: "5.8%",
                height: "12.5%",
                animation: "polaroid-lantern 2.7s ease-in-out infinite",
              }}
            />

            {/* Sun Water Glimmer */}
            <div
              className="absolute pointer-events-none bg-gradient-to-b from-transparent via-[#ffd166]/15 to-transparent"
              style={{
                left: "67%",
                top: "60%",
                width: "18%",
                height: "18%",
                animation: "polaroid-sun-glimmer 3.2s ease-in-out infinite",
              }}
            />

            {/* Floating Hearts near Polaroid Camera */}
            <div
              className="absolute pointer-events-none text-[#ff6b8b] text-[12px]"
              style={{ left: "41.0%", top: "42.0%", animation: "polaroid-float-heart 2.6s ease-in-out infinite" }}
            >
              ♥
            </div>
            <div
              className="absolute pointer-events-none text-[#ff6b8b] text-[10px]"
              style={{ left: "44.8%", top: "44.5%", animation: "polaroid-float-heart 2.6s ease-in-out infinite 0.7s" }}
            >
              ♥
            </div>

            {/* Sleeping Cat Hotspot */}
            <div
              onClick={handleCatClick}
              className="absolute z-20 cursor-pointer"
              style={{
                left: "10.74%",
                top: "76.52%",
                width: "15.62%",
                height: "15.72%",
              }}
              title="Pet the sleepy cat!"
            >
              {catPurr && (
                <div
                  className="absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-[#5c3a1e] text-[8px] md:text-[9px] font-bold px-2 py-0.5 rounded-full shadow-lg border border-[#f8a4c8] whitespace-nowrap z-40 animate-bounce pointer-events-none"
                  style={{ fontFamily: "'Quicksand', sans-serif" }}
                >
                  Purr~ zZz ♥
                </div>
              )}
            </div>

            {/* 1. "TAKE PHOTO" BUTTON HOTSPOT */}
            <button
              onClick={startCamera}
              className="btn-hover-lift absolute z-20 cursor-pointer rounded-md transition-all duration-150 border-2 border-transparent group bg-transparent p-0"
              style={{
                left: "34.96%",
                top: "66.67%",
                width: "14.65%",
                height: "9.22%",
              }}
              title="Start Webcam"
            >
              <div className="w-full h-full rounded-md border-2 border-transparent group-hover:border-[#ff94c2] group-hover:bg-[#ff94c2]/20 group-hover:shadow-[0_0_12px_rgba(255,148,194,0.8)] transition-all flex items-center justify-center" />
            </button>

            {/* 2. "UPLOAD" BUTTON HOTSPOT */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-hover-lift absolute z-20 cursor-pointer rounded-md transition-all duration-150 border-2 border-transparent group bg-transparent p-0"
              style={{
                left: "50.59%",
                top: "66.67%",
                width: "14.26%",
                height: "9.22%",
              }}
              title="Upload Photo"
            >
              <div className="w-full h-full rounded-md border-2 border-transparent group-hover:border-[#ffdb70] group-hover:bg-[#ffdb70]/20 group-hover:shadow-[0_0_12px_rgba(255,219,112,0.8)] transition-all flex items-center justify-center" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleUpload}
            />
          </>
        )}

        {/* ========================================= */}
        {/* VIEWFINDER MODE: LIVE WEBCAM FEED         */}
        {/* ========================================= */}
        {mode === "viewfinder" && (
          <div
            className={`relative flex flex-col items-center justify-center w-full h-full bg-[#1e110c] ${
              shake ? "animate-[polaroid-shake_0.4s_ease-in-out]" : ""
            }`}
          >
            <button
              onClick={() => setMode("entry")}
              className="absolute top-4 left-4 z-50 px-2.5 py-1 rounded bg-[#3b1d11] border-2 border-[#ffcb8f] text-[#ffcb8f] text-[9px] font-bold pixel-text"
            >
              ← CANCEL
            </button>

            <div
              className="relative rounded-lg overflow-hidden border-4 border-[#fff] bg-black shadow-2xl"
              style={{ width: "70%", maxWidth: 540, aspectRatio: "4/3" }}
            >
              <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-cover"
                style={{ transform: "scaleX(-1)" }}
              />

              {/* Viewfinder HUD */}
              <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/50 px-2 py-0.5 rounded">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                <span className="pixel-text text-[8px] text-white">LIVE</span>
              </div>
              <div className="absolute top-3 right-3 pixel-text text-[8px] text-white bg-black/50 px-2 py-0.5 rounded">
                ⚡ READY
              </div>

              {/* Crosshair */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <div className="w-6 h-px bg-white" />
                <div className="absolute h-6 w-px bg-white" />
              </div>

              {flash && (
                <div className="absolute inset-0 bg-white z-40 opacity-100 transition-opacity duration-200" />
              )}
            </div>

            {/* Shutter Button */}
            <div className="mt-4 flex flex-col items-center gap-2">
              <button
                onClick={takePhoto}
                className="w-14 h-14 rounded-full bg-[#ff4d6d] border-4 border-[#fff] shadow-[0_4px_0_#b32540] active:translate-y-1 active:shadow-none hover:scale-105 transition-all cursor-pointer flex items-center justify-center text-white"
                title="Snap Photo"
              >
                📸
              </button>
              <span className="pixel-text text-[8px] text-[#ffd166]">CLICK TO SNAP</span>
            </div>
          </div>
        )}

        {/* ========================================= */}
        {/* PRINTING MODE: DEVELOPING POLAROID PHOTO  */}
        {/* ========================================= */}
        {mode === "printing" && (
          <div
            className="relative shadow-2xl transition-opacity duration-700 overflow-hidden select-none"
            style={{
              width: "min(100vw, calc(100vh * (1024 / 471)))",
              height: "min(100vh, calc(100vw * (471 / 1024)))",
              aspectRatio: "1024 / 471",
            }}
          >
            {/* 1. Base Pixel Art Developing Background */}
            <img
              src={developingBgUrl}
              alt="Developing Polaroid"
              className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
              style={{ imageRendering: "pixelated" }}
            />

            {/* 2. Emerging Developing Polaroid Print */}
            <div
              className="absolute z-10 overflow-hidden"
              style={{
                left: "45.1%",
                top: "46.3%",
                width: "9.2%",
                height: "17.0%",
                animation: "polaroid-print-slide 3.2s cubic-bezier(0.2, 0.8, 0.3, 1) forwards",
              }}
            >
              {/* White Polaroid Card */}
              <div className="w-full h-full bg-white shadow-md p-[6%] pb-[18%] flex flex-col rounded-xs border border-stone-200">
                <div className="w-full aspect-square bg-[#eae2d6] overflow-hidden relative rounded-xs">
                  <img
                    src={capturedImage}
                    alt="Developing photo"
                    className="w-full h-full object-cover"
                    style={{
                      animation: "polaroid-photo-reveal 3s ease-in-out forwards",
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 3. Camera Mouth Lip (Overlay to tuck print inside) */}
            <div
              className="absolute pointer-events-none z-20 rounded-b-xs"
              style={{
                left: "44.6%",
                top: "45.6%",
                width: "10.2%",
                height: "1.4%",
                backgroundColor: "#201824",
                boxShadow: "0 2px 4px rgba(0,0,0,0.4)",
              }}
            />

            {/* 4. Animated Golden Progress Bar */}
            <div
              className="absolute z-20 overflow-hidden rounded-full p-[1px]"
              style={{
                left: "38.9%",
                top: "74.6%",
                width: "21.9%",
                height: "3.9%",
              }}
            >
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#d97706] via-[#f59e0b] to-[#fde047] transition-all duration-100 ease-out shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                style={{ width: `${developProgress}%` }}
              />
            </div>

            {/* 5. Twinkling Golden Stars */}
            <div
              className="absolute pointer-events-none text-[#ffe8a3] text-[13px] z-20"
              style={{ left: "40.5%", top: "32.5%", animation: "polaroid-dev-star 2.5s ease-in-out infinite" }}
            >
              ✨
            </div>
            <div
              className="absolute pointer-events-none text-[#ffd166] text-[12px] z-20"
              style={{ left: "59.2%", top: "33.5%", animation: "polaroid-dev-star 2.8s ease-in-out infinite 0.7s" }}
            >
              ✨
            </div>
            <div
              className="absolute pointer-events-none text-[#ffe8a3] text-[10px] z-20"
              style={{ left: "31.2%", top: "15.5%", animation: "polaroid-dev-star 3s ease-in-out infinite 0.3s" }}
            >
              ✦
            </div>
            <div
              className="absolute pointer-events-none text-[#ffd166] text-[11px] z-20"
              style={{ left: "68.2%", top: "16.8%", animation: "polaroid-dev-star 2.7s ease-in-out infinite 1.1s" }}
            >
              ✦
            </div>
            <div
              className="absolute pointer-events-none text-[#ffe8a3] text-[10px] z-20"
              style={{ left: "22.0%", top: "44.0%", animation: "polaroid-dev-star 3.2s ease-in-out infinite 0.5s" }}
            >
              ✦
            </div>
            <div
              className="absolute pointer-events-none text-[#ffd166] text-[10px] z-20"
              style={{ left: "79.5%", top: "43.0%", animation: "polaroid-dev-star 2.6s ease-in-out infinite 0.9s" }}
            >
              ✦
            </div>
          </div>
        )}

        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}
