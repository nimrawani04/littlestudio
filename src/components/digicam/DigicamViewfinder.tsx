import { useState, useRef, useEffect, useCallback } from "react";
import { DigicamSettings } from "./DigicamMode";

interface DigicamViewfinderProps {
  settings: DigicamSettings;
  onUpdateSettings: (s: DigicamSettings) => void;
  onCapture: (photos: string[]) => void;
  onOpenGallery: () => void;
  photoCount: number;
}

export function DigicamViewfinder({
  settings,
  onUpdateSettings,
  onCapture,
  onOpenGallery,
  photoCount,
}: DigicamViewfinderProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState("");
  
  // Status
  const [batteryState, setBatteryState] = useState<"full" | "medium" | "low">("full");
  const [timeStr, setTimeStr] = useState("");
  
  // Focus
  const [focusPos, setFocusPos] = useState({ x: 50, y: 50 });
  const [focusState, setFocusState] = useState<"none" | "focusing" | "locked">("none");
  
  // UI states
  const [isFlashing, setIsFlashing] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Start camera
  useEffect(() => {
    let active = true;
    const startCam = async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } } 
        });
        if (active) {
          setStream(s);
          if (videoRef.current) videoRef.current.srcObject = s;
        }
      } catch (e) {
        // Fallback to user if environment fails
        try {
          const s = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: "user", width: { ideal: 1280 }, height: { ideal: 720 } } 
          });
          if (active) {
            setStream(s);
            if (videoRef.current) videoRef.current.srcObject = s;
          }
        } catch (err) {
          if (active) setError("Camera access denied.");
        }
      }
    };
    startCam();
    return () => {
      active = false;
      if (stream) stream.getTracks().forEach(t => t.stop());
    };
  }, []);

  // Update time
  useEffect(() => {
    const interval = setInterval(() => {
      const d = new Date();
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yy = String(d.getFullYear()).slice(-2);
      const hh = String(d.getHours()).padStart(2, '0');
      const min = String(d.getMinutes()).padStart(2, '0');
      setTimeStr(`${dd}/${mm}/${yy} ${hh}:${min}`);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Battery drain sim
  useEffect(() => {
    const t1 = setTimeout(() => setBatteryState("medium"), 60000);
    const t2 = setTimeout(() => setBatteryState("low"), 120000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleTapFocus = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isProcessing) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setFocusPos({ x, y });
    setFocusState("focusing");
    
    // Play beep
    const audio = new Audio("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=");
    audio.play().catch(() => {});

    setTimeout(() => {
      setFocusState("locked");
      // Double beep
      audio.play().catch(() => {});
      setTimeout(() => audio.play().catch(() => {}), 100);
      
      setTimeout(() => setFocusState("none"), 2000);
    }, 800);
  };

  const processImage = (video: HTMLVideoElement, canvas: HTMLCanvasElement): string => {
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext("2d");
    if (!ctx) return "";

    // Draw video
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    // Apply mode effects
    const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      let r = data[i];
      let g = data[i + 1];
      let b = data[i + 2];

      // Base: slight contrast & green tint (digicam vibe)
      r = Math.min(255, r * 1.05);
      g = Math.min(255, g * 1.1);
      b = Math.min(255, b * 0.95);

      if (settings.mode === "NIGHT") {
        r = r * 0.8;
        g = g * 0.8;
        b = b * 1.2;
        // High noise done via grain overlay on CSS, but let's add some pixel noise
      } else if (settings.mode === "PARTY") {
        r = Math.min(255, r * 1.2);
        g = Math.min(255, g * 1.1);
        b = Math.min(255, b * 1.3);
      } else if (settings.mode === "OVEREXPOSED") {
        r = Math.min(255, r * 1.4 + 20);
        g = Math.min(255, g * 1.4 + 20);
        b = Math.min(255, b * 1.4 + 20);
      }

      // Base noise
      const noise = (Math.random() - 0.5) * settings.grainLevel;
      data[i] = Math.min(255, Math.max(0, r + noise));
      data[i + 1] = Math.min(255, Math.max(0, g + noise));
      data[i + 2] = Math.min(255, Math.max(0, b + noise));
    }
    ctx.putImageData(imgData, 0, 0);

    // Timestamp burn
    if (settings.showTimestamp) {
      ctx.font = "bold 32px 'Courier New', Courier, monospace";
      ctx.fillStyle = "#ffaa00";
      ctx.shadowColor = "#000";
      ctx.shadowBlur = 4;
      const d = new Date();
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yy = String(d.getFullYear()).slice(-2);
      const hh = String(d.getHours()).padStart(2, '0');
      const min = String(d.getMinutes()).padStart(2, '0');
      ctx.fillText(`'${yy} ${mm} ${dd} ${hh}:${min}`, canvas.width - 320, canvas.height - 40);
    }

    return canvas.toDataURL("image/jpeg", 0.8);
  };

  const captureSequence = async (count: number = 1) => {
    if (!videoRef.current || !canvasRef.current || isProcessing) return;
    setIsProcessing(true);

    const shots: string[] = [];
    
    // Shutter sound
    const audio = new Audio("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=");

    for (let i = 0; i < count; i++) {
      audio.play().catch(() => {});
      
      // Flash effect
      const useFlash = settings.flash === "ON" || (settings.flash === "AUTO" && settings.mode === "NIGHT");
      if (useFlash) {
        setIsFlashing(true);
      }
      setIsShaking(true);

      await new Promise(r => setTimeout(r, 50));
      
      shots.push(processImage(videoRef.current, canvasRef.current));

      setTimeout(() => {
        setIsFlashing(false);
        setIsShaking(false);
      }, 150);

      if (i < count - 1) {
        await new Promise(r => setTimeout(r, 400));
      }
    }

    onCapture(shots);
    setTimeout(() => setIsProcessing(false), 300);
  };

  let burstTimer: NodeJS.Timeout;
  const handleShutterDown = () => {
    if (isProcessing) return;
    burstTimer = setTimeout(() => {
      // Burst mode
      captureSequence(3);
    }, 500); // hold for 500ms to burst
  };

  const handleShutterUp = () => {
    clearTimeout(burstTimer);
    if (!isProcessing) {
      captureSequence(1);
    }
  };

  if (error) {
    return <div className="text-white text-center p-8 bg-black h-screen font-mono">{error}</div>;
  }

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden select-none font-mono flex flex-col">
      {/* Settings Header Area */}
      <div className="h-16 bg-gray-900 flex items-center justify-between px-4 z-20">
        <button onClick={() => {
          const modes: typeof settings.mode[] = ["AUTO", "NIGHT", "PARTY", "OVEREXPOSED"];
          const next = modes[(modes.indexOf(settings.mode) + 1) % modes.length];
          onUpdateSettings({ ...settings, mode: next });
        }} className="text-cyan-400 text-xs border border-cyan-800 px-2 py-1 rounded bg-black">
          MODE: {settings.mode}
        </button>

        <button onClick={() => {
          const flashes: typeof settings.flash[] = ["AUTO", "ON", "OFF"];
          const next = flashes[(flashes.indexOf(settings.flash) + 1) % flashes.length];
          onUpdateSettings({ ...settings, flash: next });
        }} className="text-yellow-400 text-xs border border-yellow-800 px-2 py-1 rounded bg-black">
          FLASH: {settings.flash}
        </button>
      </div>

      {/* Main Viewfinder */}
      <div 
        className={`relative flex-1 bg-[#111] overflow-hidden ${isShaking ? "animate-[shake_0.1s_ease-in-out_infinite]" : ""}`}
        onClick={handleTapFocus}
      >
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover" 
          style={{ 
            transform: "scaleX(-1)",
            filter: settings.mode === 'OVEREXPOSED' ? 'brightness(1.2) contrast(0.9)' : 
                    settings.mode === 'NIGHT' ? 'brightness(1.5) contrast(1.2)' : 'none'
          }} 
        />
        
        {/* CRT / LCD Scanline Overlay */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03))",
          backgroundSize: "100% 4px, 6px 100%"
        }} />

        {/* Grain overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-overlay" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }} />

        {/* HUD: Battery */}
        <div className="absolute top-4 left-4 flex gap-1 items-center pointer-events-none text-white drop-shadow-md">
          <div className="w-6 h-3 border border-white p-[1px] relative">
            <div className={`h-full ${batteryState === "low" ? "w-1/3 bg-red-500 animate-pulse" : batteryState === "medium" ? "w-2/3 bg-white" : "w-full bg-white"}`} />
            <div className="absolute -right-[3px] top-1/2 -translate-y-1/2 w-[2px] h-[4px] bg-white" />
          </div>
        </div>

        {/* HUD: Timestamp */}
        <div className="absolute top-4 right-4 text-orange-400 font-bold text-sm tracking-wider pointer-events-none drop-shadow-md">
          {timeStr}
        </div>

        {/* HUD: Status */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex items-center gap-2 pointer-events-none">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse drop-shadow-md" />
          <span className="text-white text-xs drop-shadow-md">REC</span>
        </div>

        {/* HUD: Focus Box */}
        {focusState !== "none" && (
          <div 
            className="absolute w-16 h-16 -translate-x-1/2 -translate-y-1/2 pointer-events-none transition-all duration-300"
            style={{ 
              left: `${focusPos.x}%`, 
              top: `${focusPos.y}%`,
              border: `2px solid ${focusState === "locked" ? "#00ff00" : "#ffffff"}`,
              transform: `translate(-50%, -50%) scale(${focusState === "focusing" ? 1.2 : 1})`
            }}
          >
            <div className="absolute top-1/2 left-0 w-2 h-px bg-current" />
            <div className="absolute top-1/2 right-0 w-2 h-px bg-current" />
            <div className="absolute top-0 left-1/2 w-px h-2 bg-current" />
            <div className="absolute bottom-0 left-1/2 w-px h-2 bg-current" />
          </div>
        )}

        {/* Flash Overlay */}
        {isFlashing && <div className="absolute inset-0 bg-white opacity-90 z-40 animate-[flash_0.2s_ease-out]" />}
      </div>

      {/* Control Strip */}
      <div className="h-24 bg-gray-900 flex items-center justify-around px-4 z-20">
        <div className="flex flex-col items-center justify-center text-gray-500 text-[10px]">
          <span>GRAIN</span>
          <input 
            type="range" 
            min="0" max="100" 
            value={settings.grainLevel}
            onChange={(e) => onUpdateSettings({ ...settings, grainLevel: parseInt(e.target.value) })}
            className="w-16 accent-gray-400 h-1 mt-1" 
          />
        </div>

        <button 
          onPointerDown={handleShutterDown}
          onPointerUp={handleShutterUp}
          onPointerLeave={handleShutterUp}
          className="w-16 h-16 rounded-full bg-gray-300 border-4 border-gray-400 shadow-[0_4px_0_#4b5563,inset_0_4px_8px_rgba(255,255,255,0.8)] active:translate-y-1 active:shadow-[0_0px_0_#4b5563,inset_0_2px_4px_rgba(255,255,255,0.8)] transition-all flex items-center justify-center relative"
        >
          <div className="w-12 h-12 rounded-full bg-gray-200 border border-gray-400 shadow-inner" />
        </button>

        <button 
          onClick={onOpenGallery}
          className="w-12 h-12 bg-gray-800 border-2 border-gray-600 rounded flex items-center justify-center relative hover:bg-gray-700 transition-colors"
        >
          {photoCount > 0 ? (
            <span className="text-white text-xs">IMG</span>
          ) : (
            <span className="text-gray-500 text-[10px]">EMPTY</span>
          )}
          {photoCount > 0 && (
            <div className="absolute -top-2 -right-2 bg-red-600 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-sans border border-red-800">
              {photoCount}
            </div>
          )}
        </button>
      </div>

      <canvas ref={canvasRef} className="hidden" />

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-2px, 2px); }
          50% { transform: translate(2px, -2px); }
          75% { transform: translate(-2px, -2px); }
        }
        @keyframes flash {
          0% { opacity: 0; }
          20% { opacity: 1; }
          100% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
