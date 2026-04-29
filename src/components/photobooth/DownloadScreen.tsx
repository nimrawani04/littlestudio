export function DownloadScreen({ imageUrl, onRetake, isPolaroid }: {
  imageUrl: string;
  onRetake: () => void;
  isPolaroid?: boolean;
}) {
  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = imageUrl;
    a.download = `pixel-${isPolaroid ? 'polaroid' : 'booth-strip'}-${Date.now()}.png`;
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
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 50%, #4a1942 100%)" }}>

      <style>{`
        @media print {
          .no-print { display: none !important; }
        }
      `}</style>

      <h2 className="pixel-font text-sm text-white mb-2 no-print" style={{ textShadow: "2px 2px 0 #8b1a56" }}>
        💾 Keep Your Memory
      </h2>
      <p className="pixel-font text-[8px] text-pink-300 mb-6 opacity-70 no-print">your {isPolaroid ? 'polaroid' : 'strip'} is ready!</p>

      {/* Strip floating */}
      <div className="relative pixel-bounce">
        <div className="pixel-glow rounded-lg overflow-hidden" style={{ maxWidth: 220 }}>
          <img src={imageUrl} alt={isPolaroid ? "Polaroid photo" : "Photo strip"} className="w-full rounded-lg"
            style={{ boxShadow: "0 20px 40px rgba(0,0,0,0.4), 0 0 30px rgba(255,105,180,0.2)" }} />
        </div>
        {/* Sparkles around */}
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="absolute twinkle text-lg pointer-events-none no-print"
            style={{
              left: `${[-10, 100, -15, 105, -5, 95][i]}%`,
              top: `${[10, 20, 50, 60, 85, 90][i]}%`,
              animationDelay: `${i * 0.3}s`,
            }}>
            ✨
          </span>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4 mt-8 z-10 no-print">
        <button onClick={handleDownload} className="pixel-btn pixel-btn-pink text-xs">
          💾 Download
        </button>
        <button onClick={handlePrint} className="pixel-btn pixel-btn-green text-xs">
          🖨️ Print
        </button>
        <button onClick={onRetake} className="pixel-btn pixel-btn-purple text-xs">
          🔄 Retake
        </button>
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-16 block-texture no-print" style={{ background: "#4a7c3f" }} />
      <div className="absolute bottom-0 left-0 right-0 h-6 block-texture no-print" style={{ background: "#6b4423" }} />
    </div>
  );
}
