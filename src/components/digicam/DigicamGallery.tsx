import { useState } from "react";

interface DigicamGalleryProps {
  photos: string[];
  onClose: () => void;
}

export function DigicamGallery({ photos, onClose }: DigicamGalleryProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const handleDownload = (photoUrl: string) => {
    const a = document.createElement("a");
    a.href = photoUrl;
    a.download = `digicam_${Date.now()}.jpg`;
    a.click();
  };

  const handleDownloadAll = () => {
    photos.forEach((p, i) => {
      setTimeout(() => {
        handleDownload(p);
      }, i * 300);
    });
  };

  const handleDownloadCollage = () => {
    if (photos.length === 0) return;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const size = 600;
    const cols = Math.ceil(Math.sqrt(photos.length));
    const rows = Math.ceil(photos.length / cols);
    canvas.width = cols * size;
    canvas.height = rows * size;

    ctx.fillStyle = "#111";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    let loaded = 0;
    photos.forEach((src, i) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        const x = (i % cols) * size;
        const y = Math.floor(i / cols) * size;
        ctx.drawImage(img, x, y, size, size);
        loaded++;
        if (loaded === photos.length) {
          const a = document.createElement("a");
          a.href = canvas.toDataURL("image/jpeg", 0.9);
          a.download = `digicam_collage_${Date.now()}.jpg`;
          a.click();
        }
      };
    });
  };

  if (selectedPhoto) {
    return (
      <div className="absolute inset-0 z-50 bg-black flex flex-col font-mono text-white">
        <div className="flex justify-between p-4 bg-gray-900 border-b border-gray-700">
          <button onClick={() => setSelectedPhoto(null)} className="text-gray-400 hover:text-white">← BACK</button>
          <button onClick={() => handleDownload(selectedPhoto)} className="text-cyan-400">SAVE</button>
        </div>
        <div className="flex-1 flex items-center justify-center p-4 bg-[#0a0a0a]">
          <img src={selectedPhoto} alt="View" className="max-w-full max-h-full object-contain border-4 border-gray-800 shadow-2xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-40 bg-[#1a1a1a] flex flex-col font-mono text-white overflow-hidden">
      <div className="flex justify-between items-center p-4 bg-gray-900 border-b border-gray-800">
        <button onClick={onClose} className="text-gray-400 hover:text-white">← CAM</button>
        <span className="text-gray-500">MEMORY CARD</span>
        <div className="flex gap-4">
          <button onClick={handleDownloadCollage} className="text-yellow-500 hover:text-yellow-300">COLLAGE</button>
          <button onClick={handleDownloadAll} className="text-cyan-500 hover:text-cyan-300">SAVE ALL</button>
        </div>
      </div>
      
      <div className="flex-1 p-8 overflow-y-auto relative bg-[#111]">
        {photos.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-700">NO IMAGES FOUND</div>
        ) : (
          <div className="relative min-h-full w-full">
            {photos.map((p, i) => {
              // Scatter effect
              const rot = (Math.random() - 0.5) * 30;
              const x = Math.random() * 20;
              const y = Math.random() * 20;
              return (
                <div 
                  key={i} 
                  className="inline-block relative cursor-pointer hover:z-10 transition-transform hover:scale-110 m-2"
                  style={{ 
                    transform: `rotate(${rot}deg) translate(${x}px, ${y}px)`,
                    zIndex: i 
                  }}
                  onClick={() => setSelectedPhoto(p)}
                >
                  <img src={p} alt={`Photo ${i}`} className="w-40 h-30 object-cover border-4 border-white shadow-xl pointer-events-none" />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
