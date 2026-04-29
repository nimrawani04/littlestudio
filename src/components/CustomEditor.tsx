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
  Sparkles,
  Square,
  Trash2,
  Type,
  Upload,
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
  onApplyToAll?: (m: MonthCustomization) => void;
}

export function CustomEditor({ pageProps, customization, onChange, onClear, onApplyToAll }: Props) {
  const [tool, setTool] = useState<Tool>("select");
  const [drawColor, setDrawColor] = useState("#e63946");
  const [drawWidth, setDrawWidth] = useState(6);
  const [stickerEmoji, setStickerEmoji] = useState("✨");
  const [stickerSize, setStickerSize] = useState(64);
  const [textInput, setTextInput] = useState("Hello!");
  const [textColor, setTextColor] = useState("#1a1a1a");
  const [textFont, setTextFont] = useState(FONT_FAMILIES[2].css);
  const [textSize, setTextSize] = useState(42);
  const [selectedElement, setSelectedElement] = useState<"title" | "weekdays" | "dates" | null>(null);

  const [history, setHistory] = useState<MonthCustomization[]>([JSON.parse(JSON.stringify(customization))]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleUpdate = (next: MonthCustomization) => {
    const nextHistory = history.slice(0, historyIndex + 1);
    nextHistory.push(JSON.parse(JSON.stringify(next)));
    setHistory(nextHistory);
    setHistoryIndex(nextHistory.length - 1);
    onChange(next);
  };

  const undo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      onChange(JSON.parse(JSON.stringify(history[prevIndex])));
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      onChange(JSON.parse(JSON.stringify(history[nextIndex])));
    }
  };

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
          <CalendarPage 
            {...pageProps} 
            titleFont={customization.titleFont}
            titleSize={customization.titleSize}
            titleColor={customization.titleColor}
            titleX={customization.titleX}
            titleY={customization.titleY}
            weekdaysFont={customization.weekdaysFont}
            weekdaysSize={customization.weekdaysSize}
            weekdaysColor={customization.weekdaysColor}
            weekdaysX={customization.weekdaysX}
            weekdaysY={customization.weekdaysY}
            datesFont={customization.datesFont}
            datesSize={customization.datesSize}
            datesColor={customization.datesColor}
            datesX={customization.datesX}
            datesY={customization.datesY}
            onElementClick={(el) => {
              setSelectedElement(el);
            }}
          />
          <CustomOverlay
            customization={customization}
            onChange={handleUpdate}
            tool={tool}
            drawColor={drawColor}
            drawWidth={drawWidth}
            stickerEmoji={stickerEmoji}
            stickerSize={stickerSize}
            textColor={textColor}
            textFont={textFont}
            textSize={textSize}
            textInput={textInput}
            onElementClick={(el) => setSelectedElement(el)}
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
        {/* Undo / Redo */}
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="w-full text-xs" onClick={undo} disabled={historyIndex === 0}>
            ↶ Undo
          </Button>
          <Button variant="outline" size="sm" className="w-full text-xs" onClick={redo} disabled={historyIndex >= history.length - 1}>
            ↷ Redo
          </Button>
        </div>
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

        {/* Selected Element Controls (Title, Weekdays, Dates) */}
        {selectedElement && (
          <div className="border border-primary/30 bg-primary/5 p-3 rounded-md space-y-3">
            <div className="flex justify-between items-center">
              <Label className="block text-xs font-bold uppercase tracking-wider text-primary">
                Edit {selectedElement}
              </Label>
              <Button variant="ghost" size="sm" className="h-6 px-2 text-xs" onClick={() => setSelectedElement(null)}>
                Deselect
              </Button>
            </div>

            {/* Font / Handwriting */}
            <div>
              <Label className="mb-1 block text-xs">Handwriting / Font</Label>
              <div className="grid grid-cols-2 gap-1">
                {FONT_FAMILIES.map((f) => (
                  <button
                    key={f.css}
                    onClick={() => {
                      const patch: Partial<MonthCustomization> = {};
                      if (selectedElement === "title") patch.titleFont = f.css;
                      else if (selectedElement === "weekdays") patch.weekdaysFont = f.css;
                      else if (selectedElement === "dates") patch.datesFont = f.css;
                      handleUpdate({ ...customization, ...patch });
                    }}
                    className={cn(
                      "rounded border p-1 text-2xs truncate",
                      (selectedElement === "title" && customization.titleFont === f.css) ||
                      (selectedElement === "weekdays" && customization.weekdaysFont === f.css) ||
                      (selectedElement === "dates" && customization.datesFont === f.css)
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:bg-muted"
                    )}
                    style={{ fontFamily: f.css }}
                  >
                    {f.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <Label className="mb-1 block text-xs">
                Size
              </Label>
              <Slider
                min={selectedElement === "title" ? 20 : 8}
                max={selectedElement === "title" ? 100 : 30}
                step={1}
                value={[
                  selectedElement === "title"
                    ? customization.titleSize || 36
                    : selectedElement === "weekdays"
                    ? customization.weekdaysSize || 11
                    : customization.datesSize || 14,
                ]}
                onValueChange={([v]) => {
                  const patch: Partial<MonthCustomization> = {};
                  if (selectedElement === "title") patch.titleSize = v;
                  else if (selectedElement === "weekdays") patch.weekdaysSize = v;
                  else if (selectedElement === "dates") patch.datesSize = v;
                  handleUpdate({ ...customization, ...patch });
                }}
              />
            </div>

            {/* Color */}
            <div>
              <Label className="mb-1 block text-xs">Color</Label>
              <div className="grid grid-cols-6 gap-1">
                {SWATCHES.map((color) => (
                  <button
                    key={color}
                    className={cn(
                      "h-5 w-5 rounded-full border border-black/10",
                      ((selectedElement === "title" && customization.titleColor === color) ||
                        (selectedElement === "weekdays" && customization.weekdaysColor === color) ||
                        (selectedElement === "dates" && customization.datesColor === color)) &&
                        "ring-2 ring-primary"
                    )}
                    style={{ backgroundColor: color }}
                    onClick={() => {
                      const patch: Partial<MonthCustomization> = {};
                      if (selectedElement === "title") patch.titleColor = color;
                      else if (selectedElement === "weekdays") patch.weekdaysColor = color;
                      else if (selectedElement === "dates") patch.datesColor = color;
                      handleUpdate({ ...customization, ...patch });
                    }}
                  />
                ))}
              </div>
            </div>
            {/* Position X / Y Sliders */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <div>
                <Label className="mb-1 block text-2xs">Position X (Drag)</Label>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[
                    selectedElement === "title"
                      ? (customization.titleX !== undefined ? customization.titleX * 100 : 50)
                      : selectedElement === "weekdays"
                      ? (customization.weekdaysX !== undefined ? customization.weekdaysX * 100 : 50)
                      : (customization.datesX !== undefined ? customization.datesX * 100 : 50)
                  ]}
                  onValueChange={([v]) => {
                    const patch: Partial<MonthCustomization> = {};
                    if (selectedElement === "title") patch.titleX = v / 100;
                    else if (selectedElement === "weekdays") patch.weekdaysX = v / 100;
                    else if (selectedElement === "dates") patch.datesX = v / 100;
                    handleUpdate({ ...customization, ...patch });
                  }}
                />
              </div>
              <div>
                <Label className="mb-1 block text-2xs">Position Y (Drag)</Label>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[
                    selectedElement === "title"
                      ? (customization.titleY !== undefined ? customization.titleY * 100 : 15)
                      : selectedElement === "weekdays"
                      ? (customization.weekdaysY !== undefined ? customization.weekdaysY * 100 : 40)
                      : (customization.datesY !== undefined ? customization.datesY * 100 : 65)
                  ]}
                  onValueChange={([v]) => {
                    const patch: Partial<MonthCustomization> = {};
                    if (selectedElement === "title") patch.titleY = v / 100;
                    else if (selectedElement === "weekdays") patch.weekdaysY = v / 100;
                    else if (selectedElement === "dates") patch.datesY = v / 100;
                    handleUpdate({ ...customization, ...patch });
                  }}
                />
              </div>
            </div>
          </div>
        )}
        
        {/* Image Overlays */}
        <div className="border-t border-border pt-3">
          <Label className="mb-2 block text-xs uppercase tracking-widest text-muted-foreground">
            Image Overlays
          </Label>
          <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-secondary px-4 py-2 text-xs font-medium hover:bg-secondary/80 transition-colors">
            <Upload className="h-3.5 w-3.5" />
            Upload Overlay Image
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = () => {
                    handleUpdate({
                      ...customization,
                      items: [
                        ...customization.items,
                        {
                          id: Math.random().toString(36).slice(2, 9),
                          kind: "image",
                          x: 0.5,
                          y: 0.5,
                          src: reader.result as string,
                          size: 150,
                          rotation: 0,
                        },
                      ],
                    });
                    setTool("select");
                  };
                  reader.readAsDataURL(file);
                }
                e.target.value = "";
              }}
            />
          </label>
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
                onClick={() => handleUpdate({ ...customization, frame: f.id })}
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
              onChange={(c) => handleUpdate({ ...customization, frameColor: c })}
              label="Frame color"
            />
          </div>
        </div>

        <div className="border-t border-border pt-4 space-y-2">
          {onApplyToAll && (
            <Button 
              variant="default" 
              size="sm" 
              className="w-full bg-primary/90 hover:bg-primary font-semibold"
              onClick={() => onApplyToAll(customization)}
            >
              <Sparkles className="mr-2 h-3.5 w-3.5" /> Apply styles to all months
            </Button>
          )}
          <Button variant="outline" size="sm" className="w-full" onClick={onClear}>
            <Trash2 className="mr-2 h-3.5 w-3.5" /> Clear this month
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
