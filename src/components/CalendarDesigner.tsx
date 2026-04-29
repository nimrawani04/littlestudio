import { useCallback, useRef, useState } from "react";
import { CalendarPage } from "@/components/CalendarPage";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  COLOR_PRESETS,
  FONT_OPTIONS,
  MONTH_NAMES,
  TEMPLATES,
  type ImagePosition,
  type Orientation,
  type TemplateId,
  type TextAlign,
  type WeekStart,
} from "@/lib/calendar-utils";
import { cn } from "@/lib/utils";
import { ArrowLeftRight, Download, Image as ImageIcon, Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

interface DesignerProps {
  onExport: (months: HTMLDivElement[], orientation: Orientation) => Promise<void>;
}

export function CalendarDesigner({ onExport }: DesignerProps) {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear + 1);
  const [weekStart, setWeekStart] = useState<WeekStart>("monday");
  const [template, setTemplate] = useState<TemplateId>("elegant");
  const [fontId, setFontId] = useState<string>("default");
  const [colorId, setColorId] = useState<string>("default");
  const [imagePosition, setImagePosition] = useState<ImagePosition>("top");
  const [textAlign, setTextAlign] = useState<TextAlign>("center");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [images, setImages] = useState<(string | null)[]>(Array(12).fill(null));
  const [activeMonth, setActiveMonth] = useState(0);
  const [swapSource, setSwapSource] = useState<number | null>(null);
  const [exporting, setExporting] = useState(false);

  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const font = FONT_OPTIONS.find((f) => f.id === fontId) ?? FONT_OPTIONS[0];
  const color = COLOR_PRESETS.find((c) => c.id === colorId) ?? COLOR_PRESETS[0];

  const handleFile = useCallback((monthIdx: number, file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImages((prev) => {
        const next = [...prev];
        next[monthIdx] = reader.result as string;
        return next;
      });
    };
    reader.readAsDataURL(file);
  }, []);

  const removeImage = (idx: number) =>
    setImages((prev) => {
      const next = [...prev];
      next[idx] = null;
      return next;
    });

  const startSwap = (idx: number) => {
    if (swapSource === null) {
      setSwapSource(idx);
      toast.info(`Now click another month to swap with ${MONTH_NAMES[idx]}`);
    } else if (swapSource === idx) {
      setSwapSource(null);
    } else {
      setImages((prev) => {
        const next = [...prev];
        [next[swapSource], next[idx]] = [next[idx], next[swapSource]];
        return next;
      });
      toast.success(`Swapped ${MONTH_NAMES[swapSource]} ↔ ${MONTH_NAMES[idx]}`);
      setSwapSource(null);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const els = pageRefs.current.filter((e): e is HTMLDivElement => !!e);
      await onExport(els, orientation);
      toast.success("Calendar PDF downloaded");
    } catch (e) {
      console.error(e);
      toast.error("Export failed");
    } finally {
      setExporting(false);
    }
  };

  const previewProps = (i: number) => ({
    year,
    monthIndex: i,
    template,
    weekStart,
    image: images[i],
    fontFamily: font.css || undefined,
    bg: color.bg || undefined,
    text: color.text || undefined,
    accent: color.accent || undefined,
    imagePosition,
    textAlign,
    orientation,
  });

  return (
    <div className="min-h-screen bg-background">
      <Toaster richColors position="top-center" />

      {/* Header */}
      <header
        className="border-b border-border"
        style={{ background: "var(--gradient-soft)" }}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-6 py-8 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="font-serif text-4xl font-medium tracking-tight md:text-5xl">
              Photo Calendar Studio
            </h1>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">
              Pick a template, drop in 12 photos, and export a print-ready calendar PDF.
            </p>
          </div>
          <Button size="lg" onClick={handleExport} disabled={exporting} className="self-start md:self-auto">
            {exporting ? (
              <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating PDF…</>
            ) : (
              <><Download className="mr-2 h-4 w-4" /> Download PDF</>
            )}
          </Button>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[340px_1fr]">
        {/* Sidebar */}
        <aside className="space-y-8">
          {/* Templates */}
          <section>
            <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Template
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {TEMPLATES.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTemplate(t.id)}
                  className={cn(
                    "group overflow-hidden rounded-lg border-2 text-left transition-all",
                    template === t.id
                      ? "border-primary shadow-soft ring-2 ring-primary/20"
                      : "border-border hover:border-primary/50",
                  )}
                >
                  <div className={cn(`tpl-${t.id}`, "flex aspect-[3/4] flex-col p-3")}
                       style={{ background: "var(--cal-bg)", color: "var(--cal-text)" }}>
                    <div
                      style={{
                        fontFamily: "var(--cal-font-title)",
                        fontWeight: "var(--cal-title-weight)" as unknown as number,
                        letterSpacing: "var(--cal-title-tracking)",
                        textTransform: "var(--cal-title-transform)" as React.CSSProperties["textTransform"],
                        fontSize: "0.85rem",
                      }}
                    >
                      Jan
                    </div>
                    <div className="mt-auto grid grid-cols-7 gap-px text-[6px] opacity-70">
                      {Array.from({ length: 21 }).map((_, i) => (
                        <div key={i} className="aspect-square text-center">{i + 1}</div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-card p-2">
                    <div className="text-xs font-medium">{t.name}</div>
                    <div className="text-[10px] text-muted-foreground">{t.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Settings */}
          <section className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Calendar
            </h2>
            <div>
              <Label className="mb-2 block text-xs">Year</Label>
              <Select value={String(year)} onValueChange={(v) => setYear(Number(v))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 7 }, (_, i) => currentYear - 1 + i).map((y) => (
                    <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2 block text-xs">Week starts on</Label>
              <Select value={weekStart} onValueChange={(v) => setWeekStart(v as WeekStart)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="monday">Monday</SelectItem>
                  <SelectItem value="sunday">Sunday</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Customize
            </h2>
            <div>
              <Label className="mb-2 block text-xs">Font</Label>
              <Select value={fontId} onValueChange={setFontId}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {FONT_OPTIONS.map((f) => (
                    <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2 block text-xs">Color palette</Label>
              <Select value={colorId} onValueChange={setColorId}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {COLOR_PRESETS.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2 block text-xs">Photo position</Label>
              <Select value={imagePosition} onValueChange={(v) => setImagePosition(v as ImagePosition)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="top">Top</SelectItem>
                  <SelectItem value="bottom">Bottom</SelectItem>
                  <SelectItem value="background">Full background</SelectItem>
                  <SelectItem value="framed">Framed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-2 block text-xs">Title alignment</Label>
              <Select value={textAlign} onValueChange={(v) => setTextAlign(v as TextAlign)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="left">Left</SelectItem>
                  <SelectItem value="center">Center</SelectItem>
                  <SelectItem value="right">Right</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </section>
        </aside>

        {/* Main preview */}
        <section>
          {/* Active month preview */}
          <div className="mb-8 grid gap-6 lg:grid-cols-[1fr_280px]">
            <div className="mx-auto w-full max-w-md">
              <CalendarPage {...previewProps(activeMonth)} />
            </div>
            <div className="space-y-3">
              <div>
                <h3 className="font-serif text-2xl">{MONTH_NAMES[activeMonth]} {year}</h3>
                <p className="text-sm text-muted-foreground">
                  {images[activeMonth] ? "Photo assigned" : "No photo yet"}
                </p>
              </div>
              <label className="flex cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                <Upload className="h-4 w-4" />
                {images[activeMonth] ? "Replace photo" : "Upload photo"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) handleFile(activeMonth, f);
                    e.target.value = "";
                  }}
                />
              </label>
              {images[activeMonth] && (
                <Button variant="outline" className="w-full" onClick={() => removeImage(activeMonth)}>
                  <Trash2 className="mr-2 h-4 w-4" /> Remove
                </Button>
              )}
              <Button
                variant={swapSource === activeMonth ? "default" : "outline"}
                className="w-full"
                onClick={() => startSwap(activeMonth)}
              >
                <ArrowLeftRight className="mr-2 h-4 w-4" />
                {swapSource === activeMonth ? "Cancel swap" : "Swap with…"}
              </Button>
            </div>
          </div>

          {/* Month grid (clickable to switch active) */}
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            All months
          </h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {MONTH_NAMES.map((name, i) => (
              <button
                key={name}
                onClick={() => {
                  if (swapSource !== null && swapSource !== i) startSwap(i);
                  else setActiveMonth(i);
                }}
                className={cn(
                  "group overflow-hidden rounded-md border-2 transition-all",
                  activeMonth === i ? "border-primary shadow-soft" : "border-transparent hover:border-border",
                  swapSource === i && "ring-2 ring-accent-foreground",
                )}
              >
                <CalendarPage {...previewProps(i)} className="!shadow-none" />
                <div className="flex items-center justify-between bg-card px-2 py-1.5 text-xs">
                  <span className="font-medium">{name}</span>
                  {images[i] ? (
                    <ImageIcon className="h-3 w-3 text-primary" />
                  ) : (
                    <span className="text-[10px] text-muted-foreground">empty</span>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Hidden full-resolution pages used for PDF export */}
          <div className="pointer-events-none fixed -left-[10000px] top-0" aria-hidden>
            {MONTH_NAMES.map((_, i) => (
              <div
                key={i}
                ref={(el) => { pageRefs.current[i] = el; }}
                style={{ width: "900px" }}
              >
                <CalendarPage {...previewProps(i)} />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
