export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const WEEKDAYS_SUN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const WEEKDAYS_MON = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export type WeekStart = "sunday" | "monday";

/** Returns a 6x7 grid of day-numbers (or null) for a given month. */
export function getMonthGrid(year: number, monthIndex: number, weekStart: WeekStart): (number | null)[] {
  const firstDay = new Date(year, monthIndex, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
  const offset = weekStart === "monday" ? (firstDay + 6) % 7 : firstDay;
  const cells: (number | null)[] = [];
  for (let i = 0; i < offset; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  while (cells.length < 42) cells.push(null);
  return cells;
}

export const TEMPLATES = [
  { id: "minimal", name: "Minimal", desc: "Clean & airy" },
  { id: "elegant", name: "Elegant Serif", desc: "Refined & timeless" },
  { id: "handwritten", name: "Handwritten", desc: "Warm & personal" },
  { id: "bold", name: "Bold Modern", desc: "Dark & striking" },
  { id: "vintage", name: "Vintage", desc: "Warm sepia tones" },
  { id: "playful", name: "Playful", desc: "Soft pink script" },
] as const;

export type TemplateId = typeof TEMPLATES[number]["id"];

export const FONT_OPTIONS = [
  { id: "default", name: "Template default", css: "" },
  { id: "sans", name: "Clean Sans", css: "Inter, sans-serif" },
  { id: "serif", name: "Elegant Serif", css: "'Playfair Display', serif" },
  { id: "script", name: "Cursive Script", css: "'Dancing Script', cursive" },
  { id: "hand", name: "Handwritten", css: "Caveat, cursive" },
] as const;

export const COLOR_PRESETS = [
  { id: "default", name: "Template default", bg: "", text: "", accent: "" },
  { id: "rose", name: "Rose", bg: "oklch(0.97 0.03 25)", text: "oklch(0.25 0.05 25)", accent: "oklch(0.6 0.18 25)" },
  { id: "sage", name: "Sage", bg: "oklch(0.96 0.03 150)", text: "oklch(0.25 0.04 150)", accent: "oklch(0.5 0.12 150)" },
  { id: "ocean", name: "Ocean", bg: "oklch(0.96 0.03 230)", text: "oklch(0.22 0.05 240)", accent: "oklch(0.55 0.16 240)" },
  { id: "mono", name: "Mono", bg: "oklch(0.98 0 0)", text: "oklch(0.15 0 0)", accent: "oklch(0.4 0 0)" },
  { id: "midnight", name: "Midnight", bg: "oklch(0.16 0.02 270)", text: "oklch(0.98 0 0)", accent: "oklch(0.78 0.18 70)" },
] as const;

export type ImagePosition = "top" | "bottom" | "background" | "framed";
export type TextAlign = "left" | "center" | "right";
export type Orientation = "portrait" | "landscape";
