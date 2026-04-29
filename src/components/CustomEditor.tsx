import { useState } from "react";
import { CalendarPage, type CalendarPageProps } from "@/components/CalendarPage";
import { CustomOverlay, type Tool } from "@/components/CustomOverlay";
import {
  FONT_FAMILIES,
  STICKER_SETS,
  SWATCHES,
  type FrameStyle,
  type MonthCustomization,
} from "@/lib/custom-types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import {
  Eraser,
  MousePointer2,
  Pencil,
  Smile,
  Square,
  Trash2,
  Type,
} from "lucide-react";

const FRAMES: { id: FrameStyle; label: string }[] = [
  { id: "none", label: "None" },
  { id: "thin", label: "Thin" },
  { id: "thick", label: "Thick" },
  { id: "double", label: "Double" },
  { id: "dashed", label: "Dashed" },
  { id: "rounded", label: "Rounded" },
  { id: "shadow", label: "Shadow" },
  { id: "vintage", label: "Vintage" },
];

interface Props {
  pageProps: CalendarPageProps;
  customization: MonthCustomization;
  onChange: (m: MonthCustomization) => void;
  onClear: () => void;
}

export function CustomEditor({ pageProps, customization, onChange, onClear }: Props) {
  const [tool, setTool] = useState<Tool>("select");
  const [drawColor, setDrawColor] = useState("#e63946");
  const [drawWidth, setDrawWidth] = useState(6);
  const [stickerEmoji, setStickerEmoji] = useState("✨");
  const [stickerSize, setStickerSize] = useState(64);
  const [textInput, setTextInput] = useState("Hello!");
  const [textColor, setTextColor] = useState("#1a1a1a");
  const [textFont, setTextFont] = useState(FONT_FAMILIES[2].css);
  const [textSize, setTextSize] = useState(42);

  const tools: { id: Tool; icon: React.ElementType; label: string }[] = [
    { id: "select", icon: MousePointer2, label: "Select / move" },
    { id: "draw", icon: Pencil, label: "Draw" },
    { id: "sticker", icon: Smile, label: "Sticker" },
    { id: "text", icon: Type, label: "Text" },
    { id: "erase", icon: Eraser, label: "Erase" },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      {/* Canvas */}
      <div className="relative mx-auto w-full max-w-lg">
        <div className="relative">
          <CalendarPage {...pageProps} />
          <CustomOverlay
            customization={customization}
            onChange={onChange}
            tool={tool}
            drawColor={drawColor}
            drawWidth={drawWidth}
            stickerEmoji={stickerEmoji}
            stickerSize={stickerSize}
            textColor={textColor}
            textFont={textFont}
            textSize={textSize}
            textInput={textInput}
          />
        </div>
        {/* Tool helper */}
        <p className="mt-3 text-center text-xs text-muted-foreground">
          {tool === "select" && "Click an element to move or remove it."}
          {tool === "draw" && "Click and drag to draw."}
          {tool === "sticker" && "Click anywhere to place a sticker."}
          {tool === "text" && "Click anywhere to drop your text."}
          {tool === "erase" && "Click any element to remove it."}
        </p>
      </div>

      {/* Tools panel */}
      <aside className="space-y-5 rounded-lg border border-border bg-card p-4 shadow-soft">
        {/* Tool switcher */}
        <div>
          <Label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
            Tool
          </Label>
          <div className="grid grid-cols-5 gap-1">
            {tools.map((t) => (
              <button
                key={t.id}
                onClick={() => setTool(t.id)}
                title={t.label}
                className={cn(
                  "flex h-10 items-center justify-center rounded-md border transition-all",
                  tool === t.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border hover:border-primary/50",
                )}
              >
                <t.icon className="h-4 w-4" />
              </button>
            ))}
          </div>
        </div>

        {/* Draw controls */}
        {tool === "draw" && (
          <div className="space-y-3">
            <Swatches value={drawColor} onChange={setDrawColor} label="Brush color" />
            <div>
              <Label className="mb-1 block text-xs">Brush size: {drawWidth}px</Label>
              <Slider min={2} max={30} step={1} value={[drawWidth]} onValueChange={([v]) => setDrawWidth(v)} />
            </div>
          </div>
        )}

        {/* Sticker controls */}
        {tool === "sticker" && (
          <div className="space-y-3">
            <Label className="block text-xs">Stickers</Label>
            <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
              {STICKER_SETS.map((set) => (
                <div key={set.name}>
                  <div className="mb-1 text-[10px] uppercase tracking-wider text-muted-foreground">
                    {set.name}
                  </div>
                  <div className="grid grid-cols-5 gap-1">
                    {set.emojis.map((e) => (
                      <button
                        key={e}
                        onClick={() => setStickerEmoji(e)}
                        className={cn(
                          "flex h-9 items-center justify-center rounded-md border text-lg transition-all",
                          stickerEmoji === e ? "border-primary bg-primary/10" : "border-border hover:border-primary/50",
                        )}
                      >
                        {e}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div>
              <Label className="mb-1 block text-xs">Size: {stickerSize}px</Label>
              <Slider min={24} max={200} step={2} value={[stickerSize]} onValueChange={([v]) => setStickerSize(v)} />
            </div>
          </div>
        )}

        {/* Text controls */}
        {tool === "text" && (
          <div className="space-y-3">
            <div>
              <Label className="mb-1 block text-xs">Text</Label>
              <Input value={textInput} onChange={(e) => setTextInput(e.target.value)} placeholder="Type something" />
            </div>
            <div>
              <Label className="mb-1 block text-xs">Font</Label>
              <div className="grid grid-cols-2 gap-1">
                {FONT_FAMILIES.map((f) => (
                  <button
                    key={f.name}
                    onClick={() => setTextFont(f.css)}
                    style={{ fontFamily: f.css }}
                    className={cn(
                      "rounded-md border px-2 py-1.5 text-sm transition-all",
                      textFont === f.css ? "border-primary bg-primary/10" : "border-border hover:border-primary/50",
                    )}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>
            <Swatches value={textColor} onChange={setTextColor} label="Color" />
            <div>
              <Label className="mb-1 block text-xs">Size: {textSize}px</Label>
              <Slider min={14} max={120} step={2} value={[textSize]} onValueChange={([v]) => setTextSize(v)} />
            </div>
          </div>
        )}

        {/* Frame controls — always visible */}
        <div className="border-t border-border pt-4">
          <Label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
            <Square className="mr-1 inline h-3 w-3" /> Frame / Border
          </Label>
          <div className="grid grid-cols-4 gap-1">
            {FRAMES.map((f) => (
              <button
                key={f.id}
                onClick={() => onChange({ ...customization, frame: f.id })}
                className={cn(
                  "rounded-md border px-1.5 py-1 text-[10px] transition-all",
                  customization.frame === f.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50",
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
          <div className="mt-2">
            <Swatches
              value={customization.frameColor}
              onChange={(c) => onChange({ ...customization, frameColor: c })}
              label="Frame color"
            />
          </div>
        </div>

        <div className="border-t border-border pt-4">
          <Button variant="outline" size="sm" className="w-full" onClick={onClear}>
            <Trash2 className="mr-2 h-3.5 w-3.5" /> Clear customizations
          </Button>
        </div>
      </aside>
    </div>
  );
}

function Swatches({ value, onChange, label }: { value: string; onChange: (c: string) => void; label: string }) {
  return (
    <div>
      <Label className="mb-1 block text-xs">{label}</Label>
      <div className="flex flex-wrap gap-1">
        {SWATCHES.map((c) => (
          <button
            key={c}
            onClick={() => onChange(c)}
            className={cn(
              "h-6 w-6 rounded-full border-2 transition-all",
              value === c ? "border-foreground scale-110" : "border-transparent",
            )}
            style={{ background: c, boxShadow: c === "#ffffff" ? "inset 0 0 0 1px #ddd" : undefined }}
            aria-label={c}
          />
        ))}
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-6 w-6 cursor-pointer rounded-full border-2 border-transparent bg-transparent"
        />
      </div>
    </div>
  );
}
