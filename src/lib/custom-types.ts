import type { CSSProperties } from "react";

export type FrameStyle = "none" | "thin" | "thick" | "double" | "dashed" | "rounded" | "shadow" | "vintage";

export interface CustomText {
  id: string;
  kind: "text";
  x: number; // 0..1 of canvas
  y: number;
  text: string;
  color: string;
  font: string;
  size: number; // px @ 900 width reference
  rotation: number;
}

export interface CustomSticker {
  id: string;
  kind: "sticker";
  x: number;
  y: number;
  emoji: string;
  size: number;
  rotation: number;
}

export interface CustomStroke {
  id: string;
  kind: "stroke";
  color: string;
  width: number;
  points: { x: number; y: number }[]; // normalized 0..1
}

export type CustomItem = CustomText | CustomSticker | CustomStroke;

export interface MonthCustomization {
  items: CustomItem[];
  frame: FrameStyle;
  frameColor: string;
}

export const emptyMonthCustomization = (): MonthCustomization => ({
  items: [],
  frame: "none",
  frameColor: "#1a1a1a",
});

export const STICKER_SETS: { name: string; emojis: string[] }[] = [
  { name: "Hearts & Stars", emojis: ["❤️", "💖", "💕", "⭐", "✨", "🌟", "💫", "🌸", "🌺", "🌷"] },
  { name: "Celebrations", emojis: ["🎂", "🎉", "🎁", "🎈", "🥳", "🎊", "🍾", "🥂", "🎀", "💐"] },
  { name: "Seasons", emojis: ["🌞", "☀️", "🌈", "❄️", "☃️", "🍂", "🍁", "🌷", "🌻", "🎄"] },
  { name: "Travel & Life", emojis: ["✈️", "🏖️", "⛺", "🗺️", "📷", "🎿", "🏔️", "🌊", "🚗", "🍷"] },
  { name: "Symbols", emojis: ["✓", "✔", "★", "☆", "❋", "❀", "✿", "❁", "✺", "✦"] },
];

export const FONT_FAMILIES = [
  { name: "Inter", css: "Inter, sans-serif" },
  { name: "Playfair", css: "'Playfair Display', serif" },
  { name: "Dancing", css: "'Dancing Script', cursive" },
  { name: "Caveat", css: "Caveat, cursive" },
];

export const SWATCHES = [
  "#000000", "#ffffff", "#e63946", "#f4a261", "#e9c46a",
  "#2a9d8f", "#264653", "#457b9d", "#7209b7", "#f72585",
  "#06d6a0", "#9d4edd",
];

export function frameStyleToCss(frame: FrameStyle, color: string): CSSProperties {
  switch (frame) {
    case "none": return {};
    case "thin": return { boxShadow: `inset 0 0 0 4px ${color}` };
    case "thick": return { boxShadow: `inset 0 0 0 14px ${color}` };
    case "double":
      return { boxShadow: `inset 0 0 0 4px ${color}, inset 0 0 0 10px transparent, inset 0 0 0 14px ${color}` };
    case "dashed":
      return { outline: `4px dashed ${color}`, outlineOffset: "-12px" };
    case "rounded":
      return { boxShadow: `inset 0 0 0 8px ${color}`, borderRadius: "28px" };
    case "shadow":
      return { boxShadow: `inset 0 0 0 6px ${color}, 0 30px 60px -20px rgba(0,0,0,0.45)` };
    case "vintage":
      return {
        boxShadow: `inset 0 0 0 6px ${color}, inset 0 0 0 10px #f6efe1, inset 0 0 0 14px ${color}`,
      };
  }
}
