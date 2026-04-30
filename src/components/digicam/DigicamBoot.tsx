import { useState, useEffect } from "react";
import { Link } from "@tanstack/react-router";

interface DigicamBootProps {
  onComplete: () => void;
}

export function DigicamBoot({ onComplete }: DigicamBootProps) {
  const [bootState, setBootState] = useState<"off" | "powering" | "flicker" | "done">("off");

  const handlePowerOn = () => {
    if (bootState !== "off") return;
    
    // Play sound if possible
    const audio = new Audio("data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA="); // tiny placeholder beep
    audio.play().catch(() => {});

    setBootState("powering");

    setTimeout(() => {
      setBootState("flicker");
      setTimeout(() => {
        setBootState("done");
        onComplete();
      }, 800);
    }, 1000);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-black overflow-hidden relative">
      <Link
        to="/"
        className="absolute top-4 left-4 z-50 text-white/50 hover:text-white font-mono text-xs"
      >
        ← Back
      </Link>

      {bootState === "off" && (
        <button
          onClick={handlePowerOn}
          className="absolute inset-0 flex items-center justify-center text-white/30 hover:text-white/70 transition-colors cursor-pointer"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-current flex items-center justify-center">
              <span className="text-2xl">⏻</span>
            </div>
            <span className="font-mono text-sm tracking-widest">TAP TO POWER ON</span>
          </div>
        </button>
      )}

      {bootState === "powering" && (
        <div className="absolute top-8 left-8">
          <span className="font-mono text-green-500 text-sm animate-pulse tracking-widest">
            POWER ON...
          </span>
        </div>
      )}

      {bootState === "flicker" && (
        <div className="absolute inset-0 bg-white/20 animate-pulse" />
      )}
    </div>
  );
}
