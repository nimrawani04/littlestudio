import { useCallback, useEffect, useRef, useState } from "react";
import { BOOTH_FILTERS } from "./FilterSelect";

export function CameraCapture({ shotCount, filterId, onComplete }: {
  shotCount: number;
  filterId: string;
  onComplete: (photos: string[]) => void;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);
  const [error, setError] = useState("");
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const selectedFilter = BOOTH_FILTERS.find(f => f.id === filterId) || BOOTH_FILTERS[0];

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: 640, height: 480 } })
      .then((s) => { 
        setStream(s); 
        if (videoRef.current) videoRef.current.srcObject = s; 
      })
      .catch(() => setError("Camera access denied. Please allow camera permissions."));
    
    return () => { 
      stream?.getTracks().forEach((t) => t.stop()); 
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const capture = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext("2d")!;

    // Apply the CSS filter directly onto the captured canvas
    if (selectedFilter.cssFilter !== "none") {
      ctx.filter = selectedFilter.cssFilter;
    }

    // Mirror image for a natural booth feel
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);

    ctx.drawImage(video, 0, 0);
    return canvas.toDataURL("image/png");
  }, [selectedFilter]);

  // Take photo loop
  const snapPhoto = useCallback((currentPhotosCount: number) => {
    setCountdown(5);
    let c = 5;
    const interval = setInterval(() => {
      c--;
      if (c > 0) { 
        setCountdown(c); 
      } else {
        clearInterval(interval);
        setCountdown(null);
        setFlash(true);
        setTimeout(() => setFlash(false), 300);
        
        const img = capture();
        if (img) {
          setPhotos((prev) => {
            const next = [...prev, img];
            if (next.length >= shotCount) {
              setTimeout(() => onComplete(next), 1000);
            } else {
              // Trigger next photo automatically after 1s delay
              setTimeout(() => {
                snapPhoto(next.length);
              }, 1000);
            }
            return next;
          });
        }
      }
    }, 1000);
  }, [capture, shotCount, onComplete]);

  const startPhotoBooth = () => {
    setIsAutoPlaying(true);
    snapPhoto(0);
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center"
        style={{ background: "linear-gradient(180deg, #1a0a2e, #2d1b4e)" }}>
        <div className="text-center p-8">
          <span className="text-5xl block mb-4">😿</span>
          <p className="pixel-font text-xs text-pink-300">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 50%, #4a1942 100%)" }}>

      <h2 className="pixel-font text-sm text-white mb-2" style={{ textShadow: "2px 2px 0 #8b1a56" }}>
        📸 Shot {photos.length + 1} of {shotCount}
      </h2>
      <p className="pixel-font text-[7px] text-pink-300 opacity-80 mb-4 animate-pulse">
        {isAutoPlaying ? "✨ Smile! Subsequent shots are automatic ✨" : "Click START to take the first shot!"}
      </p>

      {/* Camera Viewport */}
      <div className="relative camera-frame rounded-lg overflow-hidden" style={{ width: 340, height: 260 }}>
        <video 
          ref={videoRef} 
          autoPlay 
          muted 
          playsInline 
          className="w-full h-full object-cover" 
          style={{ 
            transform: "scaleX(-1)",
            filter: selectedFilter.cssFilter 
          }} 
        />
        <div className="absolute inset-0 pixel-grid-overlay pointer-events-none" />

        {/* Curtain sides */}
        <div className="absolute left-0 top-0 bottom-0 w-6 pointer-events-none"
          style={{ background: "repeating-linear-gradient(180deg, #d63384 0px, #c4407e 6px, #d63384 12px)", opacity: 0.6 }} />
        <div className="absolute right-0 top-0 bottom-0 w-6 pointer-events-none"
          style={{ background: "repeating-linear-gradient(180deg, #d63384 0px, #c4407e 6px, #d63384 12px)", opacity: 0.6 }} />

        {/* Countdown */}
        {countdown !== null && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 z-30">
            <span key={countdown} className="pixel-font text-8xl text-white countdown-pop"
              style={{ textShadow: "4px 4px 0 #d63384" }}>
              {countdown}
            </span>
          </div>
        )}

        {/* Flash */}
        {flash && <div className="absolute inset-0 bg-white z-40 camera-flash" />}
      </div>

      {/* Shutter button (Only used for the VERY FIRST photo) */}
      {!isAutoPlaying && photos.length < shotCount && (
        <button onClick={startPhotoBooth} 
          className="pixel-btn pixel-btn-pink mt-6 pixel-glow text-xs">
          📸 START
        </button>
      )}

      {isAutoPlaying && photos.length < shotCount && (
        <div className="mt-6 px-4 py-2 bg-pink-950/50 border border-pink-500 rounded pixel-font text-[8px] text-pink-300 animate-pulse">
          Taking photos automatically...
        </div>
      )}

      {/* Mini strip preview */}
      <div className="flex gap-2 mt-6 z-10">
        {Array.from({ length: shotCount }).map((_, i) => (
          <div key={i} className="w-14 h-14 rounded overflow-hidden"
            style={{ border: "3px solid #8b1a56", background: "rgba(139,26,86,0.2)" }}>
            {photos[i] ? (
              <img src={photos[i]} alt={`Shot ${i + 1}`} className="w-full h-full object-cover pixel-pop" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-pink-400 opacity-30 text-xs">
                {i + 1}
              </div>
            )}
          </div>
        ))}
      </div>

      <canvas ref={canvasRef} className="hidden" />

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-16 block-texture" style={{ background: "#4a7c3f" }} />
      <div className="absolute bottom-0 left-0 right-0 h-6 block-texture" style={{ background: "#6b4423" }} />
    </div>
  );
}
