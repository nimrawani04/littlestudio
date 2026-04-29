import { useState, useRef, useEffect, useCallback } from "react";

export function PolaroidCamera({ onCapture }: { onCapture: (img: string) => void }) {
  const [mode, setMode] = useState<"entry" | "viewfinder" | "printing">("entry");
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string>("");
  const [flash, setFlash] = useState(false);
  const [shake, setShake] = useState(false);
  const [error, setError] = useState("");

  const startCamera = async () => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: 640, height: 480 } });
      setStream(s);
      setMode("viewfinder");
    } catch (e) {
      setError("Camera access denied.");
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

    // Shake and flash
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
      const timer = setTimeout(() => {
        onCapture(capturedImage);
      }, 4000); // Wait for print animation
      return () => clearTimeout(timer);
    }
  }, [mode, capturedImage, onCapture]);

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#ffe4e1]">
        <div className="text-center p-8">
          <span className="text-5xl block mb-4">😿</span>
          <p className="pixel-font text-xs text-pink-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
         style={{ background: "linear-gradient(180deg, #ffb347 0%, #ff7b25 100%)" }}>
      
      {mode === "entry" && (
        <div className="flex flex-col items-center animate-in fade-in zoom-in duration-700">
          <h2 className="pixel-font text-2xl text-white mb-8" style={{ textShadow: "3px 3px 0 #3e1f0e" }}>
            Polaroid Camera
          </h2>
          <div className="relative group cursor-pointer" onClick={startCamera}>
            <div className="w-48 h-44 rounded-2xl flex flex-col items-center justify-center relative shadow-2xl transition-transform duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.6)]"
                 style={{ border: "6px solid #fff", background: "#e5e7eb" }}>
              <div className="absolute top-3 right-4 w-6 h-6 rounded-full bg-red-500 animate-pulse" />
              <div className="w-20 h-20 rounded-full bg-gray-800 border-8 border-gray-600 flex items-center justify-center shadow-inner">
                <div className="w-6 h-6 rounded-full bg-blue-400/50 absolute top-4 right-4" />
              </div>
              <div className="absolute bottom-[-14px] w-32 h-6 bg-gray-900 rounded-b-md" />
            </div>
          </div>
          <div className="mt-12 flex gap-4">
            <button onClick={startCamera} className="pixel-btn text-[10px]" style={{ background: "#d97706" }}>
              📸 Take Photo
            </button>
            <label className="pixel-btn text-[10px] cursor-pointer" style={{ background: "#b45309" }}>
              🖼 Upload
              <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
            </label>
          </div>
        </div>
      )}

      {mode === "viewfinder" && (
        <div className={`relative flex flex-col items-center w-full h-full justify-center ${shake ? "animate-[shake_0.4s_ease-in-out]" : ""}`}>
          <div className="relative rounded-lg overflow-hidden border-8 border-gray-800 bg-black shadow-2xl"
               style={{ width: "90vw", maxWidth: 640, aspectRatio: "4/3" }}>
            <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" style={{ transform: "scaleX(-1)" }} />
            
            {/* HUD */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <span className="pixel-font text-[10px] text-white" style={{ textShadow: "1px 1px 0 #000" }}>LIVE</span>
            </div>
            <div className="absolute top-4 right-4 pixel-font text-[10px] text-white" style={{ textShadow: "1px 1px 0 #000" }}>
              🔋 100%
            </div>
            {/* Viewfinder crosshairs */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-50">
              <div className="w-8 h-px bg-white" />
              <div className="absolute h-8 w-px bg-white" />
            </div>

            {flash && <div className="absolute inset-0 bg-white z-40 opacity-100 animate-out fade-out duration-200" />}
          </div>
          <button onClick={takePhoto} className="mt-8 w-20 h-20 rounded-full bg-red-500 border-4 border-red-700 shadow-[0_8px_0_#991b1b] active:translate-y-2 active:shadow-[0_0_0_#991b1b] transition-all hover:bg-red-400" />
        </div>
      )}

      {mode === "printing" && (
        <div className="flex flex-col items-center">
          <div className="relative w-48 h-44 rounded-2xl flex flex-col items-center justify-center shadow-2xl scale-110"
               style={{ border: "6px solid #fff", background: "#e5e7eb" }}>
            <div className="w-20 h-20 rounded-full bg-gray-800 border-8 border-gray-600 flex items-center justify-center" />
            <div className="absolute bottom-[-14px] w-32 h-6 bg-gray-900 rounded-b-md z-20" />
            
            {/* Print animation */}
            <div className="absolute bottom-[-14px] w-24 h-32 bg-white shadow-xl z-10 flex flex-col items-center p-1 origin-top animate-[slideOut_3.5s_forwards]"
                 style={{ border: "2px solid #ddd" }}>
              <div className="w-full h-20 bg-gray-200 relative overflow-hidden">
                <img src={capturedImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-0 animate-[develop_2s_ease-in_1.5s_forwards]" />
              </div>
              <div className="w-full h-8 bg-white" />
            </div>
          </div>
          <p className="mt-40 pixel-font text-[10px] text-yellow-100 animate-pulse">Printing your moment...</p>
        </div>
      )}

      <canvas ref={canvasRef} className="hidden" />

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(-5px, 5px); }
          50% { transform: translate(5px, -5px); }
          75% { transform: translate(-5px, -5px); }
        }
        @keyframes slideOut {
          0% { transform: translateY(0); }
          100% { transform: translateY(110%); }
        }
        @keyframes develop {
          0% { opacity: 0; filter: grayscale(100%) contrast(50%); }
          100% { opacity: 1; filter: grayscale(0%) contrast(100%); }
        }
      `}</style>
    </div>
  );
}
