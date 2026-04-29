import { useState, useEffect } from "react";
import { BOOTH_TEMPLATES } from "./TemplateSelect";

export function PrintExperience({ photos, templateId, onDone }: {
  photos: string[]; templateId: string; onDone: (dataUrl: string) => void;
}) {
  const tpl = BOOTH_TEMPLATES.find((t) => t.id === templateId) || BOOTH_TEMPLATES[0];
  const [printing, setPrinting] = useState(true);
  const [particles, setParticles] = useState<{ id: number; x: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate particles
    const p = Array.from({ length: 12 }, (_, i) => ({
      id: i, x: 20 + Math.random() * 60, delay: Math.random() * 1.5,
    }));
    setParticles(p);

    const timer = setTimeout(() => {
      setPrinting(false);
      // Generate the final image
      const canvas = document.createElement("canvas");
      canvas.width = 400;
      canvas.height = photos.length * 310 + 100;
      const ctx = canvas.getContext("2d")!;

      // Parse bg - for gradient we'll just use accent color
      ctx.fillStyle = tpl.labelBg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Border
      ctx.strokeStyle = tpl.border;
      ctx.lineWidth = 6;
      ctx.strokeRect(3, 3, canvas.width - 6, canvas.height - 6);

      const promises = photos.map((src, i) => new Promise<void>((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const y = 30 + i * (280 + 20);
          ctx.save();
          ctx.strokeStyle = tpl.border;
          ctx.lineWidth = 3;
          ctx.strokeRect(30, y, 340, 260);
          ctx.drawImage(img, 32, y + 2, 336, 256);
          ctx.restore();
          resolve();
        };
        img.onerror = () => resolve();
        img.src = src;
      }));

      Promise.all(promises).then(() => {
        onDone(canvas.toDataURL("image/png"));
      });
    }, 2800);

    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1a0a2e 0%, #2d1b4e 50%, #4a1942 100%)" }}>

      <h2 className="pixel-font text-sm text-white mb-8" style={{ textShadow: "2px 2px 0 #8b1a56" }}>
        🖨️ Printing...
      </h2>

      {/* Dispenser slot */}
      <div className="relative">
        {/* Machine body */}
        <div className="pixel-border rounded-lg w-56 h-20 flex items-center justify-center block-texture"
          style={{ background: "linear-gradient(180deg, #5c3a1e, #3a2210)" }}>
          <div className="w-40 h-3 rounded" style={{
            background: "linear-gradient(90deg, #8b1a56, #d63384, #8b1a56)",
            boxShadow: "0 0 12px rgba(214,51,132,0.6)",
          }} />
        </div>

        {/* Strip coming out */}
        <div className={`mx-auto overflow-hidden ${printing ? "slide-out-print" : ""}`}
          style={{ width: 160, maxHeight: printing ? 0 : 500, transition: printing ? "none" : "max-height 0.5s" }}>
          <div className="rounded-b-lg p-2 space-y-1 mt-0" style={{
            background: tpl.bg, border: `3px solid ${tpl.border}`, borderTop: "none",
          }}>
            {photos.map((p, i) => (
              <div key={i} className="w-full aspect-[4/3] rounded overflow-hidden"
                style={{ border: `2px solid ${tpl.border}` }}>
                <img src={p} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Particles */}
        {printing && particles.map((p) => (
          <span key={p.id} className="particle text-sm"
            style={{ left: `${p.x}%`, bottom: 0, animationDelay: `${p.delay}s` }}>
            ✨
          </span>
        ))}
      </div>

      {printing && (
        <p className="pixel-font text-[8px] text-pink-300 mt-6 twinkle">
          ✨ printing your memories ✨
        </p>
      )}

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-16 block-texture" style={{ background: "#4a7c3f" }} />
      <div className="absolute bottom-0 left-0 right-0 h-6 block-texture" style={{ background: "#6b4423" }} />
    </div>
  );
}
