import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";
import outputBgUrl from "@/assets/photobooth-output-clean.png";
import dispenserLipUrl from "@/assets/photobooth-dispenser-lip.png";
import curtainLeftUrl from "@/assets/photobooth-curtain-billow-left.png";
import curtainRightUrl from "@/assets/photobooth-curtain-billow-right.png";
import modalBgUrl from "@/assets/photobooth-modal-bg.png";
import polaroidDownloadBgUrl from "@/assets/polaroid-download-bg.png";

interface DownloadScreenProps {
  imageUrl: string;
  onRetake: () => void;
  isPolaroid?: boolean;
}

export function DownloadScreen({
  imageUrl,
  onRetake,
  isPolaroid,
}: DownloadScreenProps) {
  // If Polaroid, render original polaroid screen
  if (isPolaroid) {
    return <PolaroidDownloadScreen imageUrl={imageUrl} onRetake={onRetake} />;
  }

  return <PhotoboothOutputScreen imageUrl={imageUrl} onRetake={onRetake} />;
}

/* ============================================================
   PHOTOBOOTH FINAL OUTPUT EXPERIENCE
   ============================================================ */
function PhotoboothOutputScreen({
  imageUrl,
  onRetake,
}: {
  imageUrl: string;
  onRetake: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [dispensed, setDispensed] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [copied, setCopied] = useState(false);

  // Easter egg speech bubble states
  const [catSpeech, setCatSpeech] = useState(false);
  const [mirrorSpeech, setMirrorSpeech] = useState(false);
  const [wallSpeech, setWallSpeech] = useState(false);
  const [boardSpeech, setBoardSpeech] = useState(false);
  const [flowerSpeech, setFlowerSpeech] = useState(false);
  const [chuteSpeech, setChuteSpeech] = useState(false);

  useEffect(() => {
    setLoaded(true);
    // Trigger dispensing animation
    const timer = setTimeout(() => {
      setDispensed(true);
      setChuteSpeech(true);
      setTimeout(() => setChuteSpeech(false), 2800);
      setTimeout(() => setIsZoomed(true), 1200);
    }, 2200);

    return () => clearTimeout(timer);
  }, []);

  const triggerBubble = (setter: (v: boolean) => void) => {
    setter(true);
    setTimeout(() => setter(false), 2400);
  };

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `pixel-booth-strip-${Date.now()}.png`;
    a.click();
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Photo Strip</title>
          <style>
            @page {
              size: 2in 6in;
              margin: 0;
            }
            body { 
              margin: 0; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              height: 100vh; 
              background: white;
            }
            img { 
              max-height: 98vh; 
              max-width: 98vw; 
              object-fit: contain; 
              image-rendering: pixelated;
            }
          </style>
        </head>
        <body>
          <img src="${imageUrl}" onload="window.print();window.close()" />
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleCopy = async () => {
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      await navigator.clipboard.write([
        new ClipboardItem({ [blob.type]: blob }),
      ]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      handleDownload();
    }
  };

  return (
    <div className="w-screen h-screen bg-[#f5ede5] flex items-center justify-center overflow-hidden font-sans select-none relative m-0 p-0">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Quicksand:wght@600;700;800&display=swap');

        .pixel-text {
          font-family: 'Press Start 2P', monospace;
          image-rendering: pixelated;
        }

        /* ── Curtain Billowing / Swaying Animations ── */
        @keyframes curtain-billow-left {
          0%, 100% {
            transform: skewX(0deg) scaleX(1);
          }
          30% {
            transform: skewX(-2deg) scaleX(0.97);
          }
          70% {
            transform: skewX(2.5deg) scaleX(1.02);
          }
        }

        @keyframes curtain-billow-right {
          0%, 100% {
            transform: skewX(0deg) scaleX(1);
          }
          35% {
            transform: skewX(3deg) scaleX(0.96);
          }
          75% {
            transform: skewX(-2deg) scaleX(1.03);
          }
        }

        /* Wind gust ripples */
        @keyframes wind-gust-anim {
          0%, 100% {
            opacity: 0.2;
            transform: translateX(0);
          }
          50% {
            opacity: 0.85;
            transform: translateX(6px);
          }
        }

        /* Breeze sparkle drift out of doorway */
        @keyframes breeze-drift {
          0% {
            transform: translate(0, 0) scale(0.6);
            opacity: 0;
          }
          30% {
            opacity: 0.9;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translate(50px, -25px) scale(1.1);
            opacity: 0;
          }
        }

        /* Pulsing warm roof lamp glow */
        @keyframes out-lamp-glow {
          0%, 100% {
            opacity: 0.6;
            filter: drop-shadow(0 0 6px rgba(255, 230, 150, 0.7));
          }
          50% {
            opacity: 0.95;
            filter: drop-shadow(0 0 16px rgba(255, 230, 150, 1));
          }
        }

        /* Twinkling star animation */
        @keyframes out-star-twinkle {
          0%, 100% {
            opacity: 0.35;
            transform: scale(0.85);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        /* Falling cherry blossom petal */
        @keyframes out-petal-fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
            opacity: 0;
          }
          20% {
            opacity: 0.9;
          }
          80% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(480px) rotate(360deg);
            opacity: 0;
          }
        }

        /* Strip slide out animation from slot */
        @keyframes strip-slide-out {
          0% {
            transform: translateY(-88%) rotate(4.8deg);
          }
          100% {
            transform: translateY(0%) rotate(4.8deg);
          }
        }

        /* Strip resting subtle pulse */
        @keyframes strip-idle-glow {
          0%, 100% {
            filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.25)) drop-shadow(0 0 4px rgba(255, 117, 143, 0.3));
          }
          50% {
            filter: drop-shadow(0 6px 12px rgba(0, 0, 0, 0.35)) drop-shadow(0 0 10px rgba(255, 117, 143, 0.8));
          }
        }
      `}</style>

      {/* Main Canvas: Strictly locked to 1024x477 aspect ratio (Non-scrollable) */}
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
        {/* 1. BASE PIXEL ART ENVIRONMENT             */}
        {/* ========================================= */}
        <img
          src={outputBgUrl}
          alt="Pixel Photo Booth Final Output"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          style={{ imageRendering: "pixelated" }}
        />

        {/* ========================================= */}
        {/* 2. WAVING CURTAINS OVERLAY IN DOORWAY     */}
        {/* ========================================= */}
        {/* Left Curtain Billow */}
        <img
          src={curtainLeftUrl}
          alt=""
          className="absolute pointer-events-none select-none z-10"
          style={{
            left: "45.12%",
            top: "27.25%",
            width: "7.81%",
            height: "54.51%",
            imageRendering: "pixelated",
            transformOrigin: "top center",
            animation: "curtain-billow-left 3.8s ease-in-out infinite",
          }}
        />

        {/* Right Curtain Billow */}
        <img
          src={curtainRightUrl}
          alt=""
          className="absolute pointer-events-none select-none z-10"
          style={{
            left: "54.49%",
            top: "27.25%",
            width: "8.20%",
            height: "52.41%",
            imageRendering: "pixelated",
            transformOrigin: "top center",
            animation: "curtain-billow-right 3.4s ease-in-out infinite 0.4s",
          }}
        />

        {/* Wind Gust Line Ripples */}
        <div
          className="absolute pointer-events-none text-[#ffccd5] text-[12px] font-bold z-10 select-none"
          style={{
            left: "43.5%",
            top: "52.0%",
            animation: "wind-gust-anim 2.5s ease-in-out infinite",
          }}
        >
          ( (
        </div>
        <div
          className="absolute pointer-events-none text-[#ffccd5] text-[12px] font-bold z-10 select-none"
          style={{
            left: "62.0%",
            top: "56.0%",
            animation: "wind-gust-anim 2.2s ease-in-out infinite 0.7s",
          }}
        >
          ) )
        </div>

        {/* Breeze Sparkles drifting from doorway */}
        <div
          className="absolute pointer-events-none text-[#ffd166] text-[11px] z-10"
          style={{
            left: "52.0%",
            top: "50.0%",
            animation: "breeze-drift 3.5s ease-in-out infinite",
          }}
        >
          ✨
        </div>
        <div
          className="absolute pointer-events-none text-[#ff758f] text-[9px] z-10"
          style={{
            left: "54.0%",
            top: "62.0%",
            animation: "breeze-drift 4s ease-in-out infinite 1.2s",
          }}
        >
          🌸
        </div>
        <div
          className="absolute pointer-events-none text-white text-[10px] z-10"
          style={{
            left: "49.0%",
            top: "40.0%",
            animation: "breeze-drift 3s ease-in-out infinite 0.6s",
          }}
        >
          ✦
        </div>

        {/* ========================================= */}
        {/* 3. PHOTO STRIP SLIDING OUT OF BOOTH       */}
        {/* ========================================= */}
        <div
          onClick={() => setIsZoomed(true)}
          className="absolute z-10 cursor-pointer group"
          style={{
            left: "32.6%",
            top: "71.0%",
            width: "5.8%",
            height: "22.6%",
            transformOrigin: "top left",
            transform: "rotate(4.8deg)",
            animation: dispensed
              ? "strip-idle-glow 2.5s ease-in-out infinite"
              : "strip-slide-out 2.2s cubic-bezier(0.25, 1, 0.5, 1) forwards",
          }}
          title="Click to zoom / inspect your photo strip!"
        >
          {/* Actual Rendered Photo Strip */}
          <div className="w-full h-full relative rounded-xs overflow-hidden border border-[#5c3a1e] bg-white shadow-md group-hover:scale-105 group-hover:shadow-[0_0_16px_rgba(255,117,143,0.8)] transition-transform duration-200">
            <img
              src={imageUrl}
              alt="Your custom photo strip"
              className="w-full h-full object-cover"
              style={{ imageRendering: "pixelated" }}
            />
          </div>

          {/* Sparkles around slot when printing finishes */}
          {dispensed && (
            <>
              <span className="absolute -top-3 -left-3 text-[11px] animate-bounce pointer-events-none">
                ✨
              </span>
              <span className="absolute -bottom-2 -right-3 text-[10px] animate-pulse pointer-events-none">
                💖
              </span>
              <span className="absolute top-1/2 -right-4 text-[9px] pointer-events-none animate-ping">
                ⭐
              </span>
            </>
          )}

          {/* Hover prompt badge */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-0.5 rounded bg-[#2a133d] border border-[#ff758f] text-white text-[7px] font-bold opacity-0 group-hover:opacity-100 transition-opacity z-40 pixel-text pointer-events-none shadow-md">
            🔍 Click to Zoom
          </div>
        </div>

        {/* Dispenser Lip Overlay (Z-20): Strip slides out from underneath this lip */}
        <img
          src={dispenserLipUrl}
          alt=""
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none z-20"
          style={{ imageRendering: "pixelated" }}
        />

        {/* Chute Dispenser Speech Bubble */}
        {chuteSpeech && (
          <div
            className="absolute z-40 whitespace-nowrap px-2.5 py-1 rounded bg-[#fff0f3] border-2 border-[#ff758f] text-[#5c3a1e] text-[8px] font-bold shadow-lg pixel-text animate-bounce"
            style={{ left: "28.5%", top: "63.0%" }}
          >
            *Pop!* Your strip is ready! 📸💖
          </div>
        )}

        {/* ========================================= */}
        {/* 4. TOP RETRO ACTION & DOWNLOAD BAR        */}
        {/* ========================================= */}
        <div className="absolute top-3 left-3 right-3 z-30 flex items-center justify-between pointer-events-none">
          {/* Left Navigation */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <Link
              to="/"
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#fff0f3] border-2 border-[#5c3a1e] text-[#5c3a1e] text-[8.5px] font-bold shadow-[0_2px_0_#5c3a1e] hover:-translate-y-0.5 active:translate-y-0 transition-all no-underline pixel-text"
            >
              <span>←</span> STUDIO
            </Link>
            <button
              onClick={onRetake}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#fff0f3] border-2 border-[#5c3a1e] text-[#5c3a1e] text-[8.5px] font-bold shadow-[0_2px_0_#5c3a1e] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer pixel-text"
              title="Take a new set of photos"
            >
              <span>🔄</span> RETAKE
            </button>
          </div>

          {/* Right Action & Download Buttons */}
          <div className="flex items-center gap-2 pointer-events-auto">
            <button
              onClick={() => setIsZoomed(true)}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#ffd166] border-2 border-[#5c3a1e] text-[#3a2210] text-[8.5px] font-bold shadow-[0_2px_0_#5c3a1e] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer pixel-text"
            >
              <span>🔍</span> PREVIEW
            </button>
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#95d5b2] border-2 border-[#1b4332] text-[#1b4332] text-[8.5px] font-bold shadow-[0_2px_0_#1b4332] hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer pixel-text"
            >
              <span>🖨️</span> PRINT
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3.5 py-1 rounded bg-[#ff758f] border-2 border-[#5c3a1e] text-white text-[9px] font-bold shadow-[0_3px_0_#5c3a1e] hover:-translate-y-0.5 hover:shadow-[0_4px_0_#5c3a1e] active:translate-y-0 active:shadow-none transition-all cursor-pointer pixel-text animate-pulse"
            >
              <span>💾</span> DOWNLOAD
            </button>
          </div>
        </div>

        {/* Bottom Tip Badge */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <div className="px-3 py-1 rounded-full bg-[#3a1d28]/85 border border-[#ff758f]/60 text-white text-[7.5px] font-bold pixel-text shadow-md flex items-center gap-2">
            <span>✨</span>
            <span>Click strip to zoom • Ready to save & share!</span>
            <span>💖</span>
          </div>
        </div>

        {/* ========================================= */}
        {/* 5. ATMOSPHERIC LAMPS & STARS              */}
        {/* ========================================= */}
        <div
          className="absolute pointer-events-none text-white text-[12px]"
          style={{ left: "19.5%", top: "7.5%", animation: "out-star-twinkle 3s ease-in-out infinite" }}
        >
          ✦
        </div>
        <div
          className="absolute pointer-events-none text-[#ffe8a3] text-[10px]"
          style={{ left: "93.5%", top: "5.5%", animation: "out-star-twinkle 2.5s ease-in-out infinite 0.8s" }}
        >
          ✨
        </div>
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: "35.5%",
            top: "4.5%",
            width: "30px",
            height: "30px",
            background: "radial-gradient(circle, rgba(255,230,150,0.85) 0%, transparent 70%)",
            animation: "out-lamp-glow 3s ease-in-out infinite",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: "48.2%",
            top: "4.5%",
            width: "30px",
            height: "30px",
            background: "radial-gradient(circle, rgba(255,230,150,0.9) 0%, transparent 70%)",
            animation: "out-lamp-glow 2.8s ease-in-out infinite 0.5s",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: "60.4%",
            top: "4.5%",
            width: "30px",
            height: "30px",
            background: "radial-gradient(circle, rgba(255,230,150,0.85) 0%, transparent 70%)",
            animation: "out-lamp-glow 3.2s ease-in-out infinite 1s",
          }}
        />

        {/* Falling Petals */}
        <div
          className="absolute pointer-events-none text-[#ffb3c1] text-[10px]"
          style={{ left: "12%", top: "-10px", animation: "out-petal-fall 6s linear infinite" }}
        >
          🌸
        </div>
        <div
          className="absolute pointer-events-none text-[#ffccd5] text-[9px]"
          style={{ left: "75%", top: "-10px", animation: "out-petal-fall 7s linear infinite 1.2s" }}
        >
          🌸
        </div>

        {/* ========================================= */}
        {/* 6. INTERACTIVE EASTER EGGS                */}
        {/* ========================================= */}
        {/* Roof Cat */}
        <div
          onClick={() => triggerBubble(setCatSpeech)}
          className="absolute z-30 cursor-pointer rounded-full"
          style={{ left: "63.5%", top: "4.5%", width: "8.5%", height: "8.5%" }}
          title="Pet the roof kitty!"
        >
          {catSpeech && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#ff758f] text-[#7c2d12] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              Thank you for visiting! (=^･ω･^=) ♥
            </div>
          )}
        </div>

        {/* Pink Bow Mirror */}
        <div
          onClick={() => triggerBubble(setMirrorSpeech)}
          className="absolute z-30 cursor-pointer rounded-2xl hover:ring-2 hover:ring-[#ff758f]/50 transition-all"
          style={{ left: "67.5%", top: "41.0%", width: "7.0%", height: "33.0%" }}
          title="Mirror"
        >
          {mirrorSpeech && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#ff758f] text-[#3a2210] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              Looking cute in those photos! ✨🪞
            </div>
          )}
        </div>

        {/* 12 Photo Wall */}
        <div
          onClick={() => triggerBubble(setWallSpeech)}
          className="absolute z-30 cursor-pointer rounded-lg hover:ring-2 hover:ring-[#ff758f]/50 transition-all"
          style={{ left: "21.5%", top: "35.0%", width: "14.0%", height: "31.0%" }}
          title="Photo wall"
        >
          {wallSpeech && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#ff758f] text-[#3a2210] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              Your memories look great up there! 📸
            </div>
          )}
        </div>

        {/* Chalkboard Sign */}
        <div
          onClick={() => triggerBubble(setBoardSpeech)}
          className="absolute z-30 cursor-pointer rounded-lg hover:ring-2 hover:ring-[#ff758f]/50 transition-all"
          style={{ left: "77.5%", top: "69.0%", width: "11.0%", height: "27.0%" }}
          title="Chalkboard"
        >
          {boardSpeech && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-[#2a133d] border-2 border-[#ff758f] text-white text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              Smile, Capture, Cherish! ♥
            </div>
          )}
        </div>

        {/* Potted Flower */}
        <div
          onClick={() => triggerBubble(setFlowerSpeech)}
          className="absolute z-30 cursor-pointer rounded-lg"
          style={{ left: "13.5%", top: "65.0%", width: "8.5%", height: "25.0%" }}
          title="Flowers"
        >
          {flowerSpeech && (
            <div className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#52b788] text-[#1b4332] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              Watered with love! 🌸
            </div>
          )}
        </div>

        {/* ========================================= */}
        {/* 7. PIXEL ART "YOUR PHOTO STRIP" MODAL     */}
        {/* ========================================= */}
        {isZoomed && (
          <div
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-0 m-0 animate-fade-in"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative shadow-2xl select-none"
              style={{
                width: "min(100vw, calc(100vh * (1024 / 483)))",
                height: "min(100vh, calc(100vw * (483 / 1024)))",
                aspectRatio: "1024 / 483",
              }}
            >
              <img
                src={modalBgUrl}
                alt="Your Photo Strip Modal"
                className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
                style={{ imageRendering: "pixelated" }}
              />

              {/* Close Button on top right of the modal */}
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute z-30 cursor-pointer rounded-full hover:scale-110 active:scale-95 transition-transform"
                style={{
                  left: "61.3%",
                  top: "18.5%",
                  width: "3.2%",
                  height: "5.5%",
                }}
                title="Close Modal"
              />

              {/* User's High-Res Photo Strip inside the white strip frame */}
              <div
                className="absolute z-20 overflow-hidden flex items-center justify-center pointer-events-auto"
                style={{
                  left: "44.6%",
                  top: "27.5%",
                  width: "10.8%",
                  height: "53.5%",
                }}
              >
                <img
                  src={imageUrl}
                  alt="Your Photo Strip"
                  className="w-full h-full object-contain"
                  style={{ imageRendering: "pixelated" }}
                />
              </div>

              {/* DOWNLOAD PNG Button */}
              <button
                onClick={handleDownload}
                className="absolute z-30 cursor-pointer rounded-lg hover:ring-2 hover:ring-white transition-all up-btn-hover"
                style={{
                  left: "37.2%",
                  top: "84.8%",
                  width: "10.8%",
                  height: "6.2%",
                }}
                title="Download PNG"
              />

              {/* PRINT Button */}
              <button
                onClick={handlePrint}
                className="absolute z-30 cursor-pointer rounded-lg hover:ring-2 hover:ring-white transition-all up-btn-hover"
                style={{
                  left: "48.8%",
                  top: "84.8%",
                  width: "6.5%",
                  height: "6.2%",
                }}
                title="Print Strip"
              />

              {/* COPY Button */}
              <button
                onClick={handleCopy}
                className="absolute z-30 cursor-pointer rounded-lg hover:ring-2 hover:ring-white transition-all up-btn-hover"
                style={{
                  left: "56.8%",
                  top: "84.8%",
                  width: "6.0%",
                  height: "6.2%",
                }}
                title={copied ? "Copied!" : "Copy Image"}
              >
                {copied && (
                  <div className="absolute -top-7 left-1/2 -translate-x-1/2 bg-[#2a133d] border border-white text-white text-[7px] px-1.5 py-0.5 rounded pixel-text animate-bounce">
                    COPIED!
                  </div>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ============================================================
   POLAROID DOWNLOAD SCREEN
   ============================================================ */
function PolaroidDownloadScreen({
  imageUrl,
  onRetake,
}: {
  imageUrl: string;
  onRetake: () => void;
}) {
  const [loaded, setLoaded] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const [catSpeech, setCatSpeech] = useState(false);
  const [boardSpeech, setBoardSpeech] = useState(false);
  const [cameraSpeech, setCameraSpeech] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `pixel-polaroid-${Date.now()}.png`;
    a.click();
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Polaroid Photo</title>
          <style>
            body { 
              margin: 0; 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              height: 100vh; 
              background: white;
            }
            img { 
              max-height: 95vh; 
              max-width: 95vw; 
              object-fit: contain; 
            }
          </style>
        </head>
        <body>
          <img src="${imageUrl}" onload="window.print();window.close()" />
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="w-screen h-screen bg-[#1c0b2b] flex items-center justify-center overflow-hidden font-sans select-none relative m-0 p-0">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Quicksand:wght@600;700;800&display=swap');

        .pixel-text {
          font-family: 'Press Start 2P', monospace;
          image-rendering: pixelated;
        }

        @keyframes pol-star-twinkle {
          0%, 100% { opacity: 0.35; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.15); }
        }

        @keyframes pol-lamp-glow {
          0%, 100% {
            opacity: 0.55;
            filter: drop-shadow(0 0 6px rgba(255, 230, 150, 0.6));
          }
          50% {
            opacity: 0.95;
            filter: drop-shadow(0 0 16px rgba(255, 230, 150, 0.95));
          }
        }

        .pol-btn-hover:hover {
          transform: translateY(-2px) scale(1.02);
        }

        .pol-btn-hover:active {
          transform: translateY(1px) scale(0.98);
        }
      `}</style>

      {/* Main Canvas Container: locked to 1024x477 aspect ratio */}
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
        {/* 1. BASE PIXEL ART ENVIRONMENT             */}
        {/* ========================================= */}
        <img
          src={polaroidDownloadBgUrl}
          alt="Keep Your Memory"
          className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          style={{ imageRendering: "pixelated" }}
        />

        {/* Back / Navigation Link */}
        <div className="absolute top-3 left-3 z-50 flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#2a133d] border-2 border-[#f8a4c8] text-[#f8a4c8] text-[9px] font-bold shadow-[0_2px_0_#1a0826] hover:-translate-y-0.5 active:translate-y-0 transition-all no-underline pixel-text"
          >
            <span>←</span> STUDIO
          </Link>
        </div>

        {/* ========================================= */}
        {/* 2. TWINKLING STARS IN SKY                 */}
        {/* ========================================= */}
        <div
          className="absolute pointer-events-none text-white text-[12px]"
          style={{ left: "14.5%", top: "8.5%", animation: "pol-star-twinkle 3s ease-in-out infinite" }}
        >
          ✦
        </div>
        <div
          className="absolute pointer-events-none text-[#ffe8a3] text-[10px]"
          style={{ left: "26.5%", top: "15.0%", animation: "pol-star-twinkle 2.5s ease-in-out infinite 0.7s" }}
        >
          ✨
        </div>
        <div
          className="absolute pointer-events-none text-white text-[9px]"
          style={{ left: "73.5%", top: "13.5%", animation: "pol-star-twinkle 3.2s ease-in-out infinite 1.2s" }}
        >
          ✦
        </div>
        <div
          className="absolute pointer-events-none text-[#ffe8a3] text-[9px]"
          style={{ left: "86.0%", top: "16.0%", animation: "pol-star-twinkle 2.7s ease-in-out infinite 0.5s" }}
        >
          ✦
        </div>

        {/* ========================================= */}
        {/* 3. WARM GLOWING LANTERNS                  */}
        {/* ========================================= */}
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: "18.5%",
            top: "14.0%",
            width: "36px",
            height: "50px",
            background: "radial-gradient(circle, rgba(255,225,130,0.5) 0%, transparent 70%)",
            animation: "pol-lamp-glow 2.8s ease-in-out infinite",
          }}
        />
        <div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: "68.5%",
            top: "14.0%",
            width: "36px",
            height: "50px",
            background: "radial-gradient(circle, rgba(255,225,130,0.5) 0%, transparent 70%)",
            animation: "pol-lamp-glow 2.8s ease-in-out infinite 1.4s",
          }}
        />

        {/* ========================================= */}
        {/* 4. USER'S POLAROID IMAGE FRAME            */}
        {/* ========================================= */}
        <div
          onClick={() => setIsZoomed(true)}
          className="absolute z-20 overflow-hidden flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-[1.03]"
          style={{
            left: "39.6%",
            top: "23.5%",
            width: "20.8%",
            height: "50.5%",
          }}
          title="Click to zoom in"
        >
          <img
            src={imageUrl}
            alt="Your Polaroid"
            className="w-full h-full object-contain drop-shadow-xl"
            style={{ imageRendering: "pixelated" }}
          />
        </div>

        {/* ========================================= */}
        {/* 5. BOTTOM ACTION BUTTONS                  */}
        {/* ========================================= */}

        {/* 💾 Download Button */}
        <button
          onClick={handleDownload}
          className="absolute z-20 cursor-pointer transition-all duration-150 pol-btn-hover rounded-xl focus:outline-none"
          style={{
            left: "30.8%",
            top: "78.6%",
            width: "12.2%",
            height: "7.6%",
          }}
          title="Download Polaroid image"
        >
          <div className="w-full h-full rounded-xl hover:ring-2 hover:ring-white/80 transition-all" />
        </button>

        {/* 🖨️ Print Button */}
        <button
          onClick={handlePrint}
          className="absolute z-20 cursor-pointer transition-all duration-150 pol-btn-hover rounded-xl focus:outline-none"
          style={{
            left: "44.1%",
            top: "78.6%",
            width: "11.8%",
            height: "7.6%",
          }}
          title="Print Polaroid photo"
        >
          <div className="w-full h-full rounded-xl hover:ring-2 hover:ring-[#5c3a1e]/60 transition-all" />
        </button>

        {/* 🔄 Retake Button */}
        <button
          onClick={onRetake}
          className="absolute z-20 cursor-pointer transition-all duration-150 pol-btn-hover rounded-xl focus:outline-none"
          style={{
            left: "57.0%",
            top: "78.6%",
            width: "12.3%",
            height: "7.6%",
          }}
          title="Take another photo"
        >
          <div className="w-full h-full rounded-xl hover:ring-2 hover:ring-white/80 transition-all" />
        </button>

        {/* ========================================= */}
        {/* 6. EASTER EGGS: CAT, BOARD, CAMERA        */}
        {/* ========================================= */}

        {/* Cat on Gingham Cloth */}
        <div
          onClick={() => {
            setCatSpeech(true);
            setTimeout(() => setCatSpeech(false), 2400);
          }}
          className="absolute z-20 cursor-pointer rounded-full"
          style={{
            left: "3.5%",
            top: "68.0%",
            width: "9.5%",
            height: "12.0%",
          }}
          title="Pet the cat!"
        >
          {catSpeech && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#ff758f] text-[#7c2d12] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              Purr~ keep this memory forever! (=^･ω･^=) ♥
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
            left: "83.5%",
            top: "60.0%",
            width: "10.0%",
            height: "26.0%",
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
            top: "52.0%",
            width: "8.5%",
            height: "18.0%",
          }}
          title="Instant camera"
        >
          {cameraSpeech && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-white border-2 border-[#5c3a1e] text-[#5c3a1e] text-[8px] font-bold shadow-md z-40 pixel-text animate-bounce">
              *Click-whirr!* 📸 Best shot ever!
            </div>
          )}
        </div>
      </div>

      {/* Lightbox Modal on click */}
      {isZoomed && (
        <div
          onClick={() => setIsZoomed(false)}
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative bg-[#2a133d] p-4 rounded-2xl border-4 border-[#ff758f] shadow-2xl flex flex-col items-center max-w-sm"
          >
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#ff758f] border-2 border-white text-white font-bold flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-transform cursor-pointer pixel-text text-[11px]"
            >
              ✕
            </button>
            <img
              src={imageUrl}
              alt="Polaroid zoom"
              className="max-h-[65vh] object-contain rounded-lg shadow-xl"
              style={{ imageRendering: "pixelated" }}
            />
            <div className="mt-4 flex gap-3">
              <button
                onClick={handleDownload}
                className="px-4 py-2 rounded-lg bg-[#ff758f] border-2 border-white text-white text-[9px] font-bold shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer pixel-text"
              >
                💾 DOWNLOAD
              </button>
              <button
                onClick={handlePrint}
                className="px-4 py-2 rounded-lg bg-[#95d5b2] border-2 border-[#1b4332] text-[#1b4332] text-[9px] font-bold shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-transform cursor-pointer pixel-text"
              >
                🖨️ PRINT
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
