import { useCallback, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarPage } from "@/components/CalendarPage";
import { CustomEditor } from "@/components/CustomEditor";
import { CustomOverlay } from "@/components/CustomOverlay";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  COLOR_PRESETS,
  FONT_OPTIONS,
  MONTH_NAMES,
  TEMPLATES,
  PHOTO_FRAME_STYLES,
  BG_PATTERNS,
  type ImagePosition,
  type Orientation,
  type TemplateId,
  type PhotoFrameStyle,
  type TextAlign,
  type WeekStart,
} from "@/lib/calendar-utils";
import { emptyMonthCustomization, type MonthCustomization } from "@/lib/custom-types";
import { SAMPLE_MONTH_IMAGES } from "@/lib/sample-calendar-images";
import {
  Upload,
  Download,
  Sparkles,
  Trash2,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  Loader2,
  FileText,
  Layers,
  ArrowLeftRight,
  Palette,
  Type,
  RefreshCw,
  FolderOpen,
  Sliders,
  Check,
  Move,
  Hash,
  Calendar as CalendarIcon,
  Eye,
  EyeOff,
  Copy,
} from "lucide-react";
import html2canvas from "html2canvas-pro";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

interface DesignerProps {
  onExport: (months: HTMLDivElement[], orientation: Orientation) => Promise<void>;
}

// Preset color palettes for 1-click styling
const PRESET_PALETTES = [
  { name: "Default", bg: "", text: "", accent: "" },
  { name: "Pure White", bg: "#ffffff", text: "#18181b", accent: "#e11d48" },
  { name: "Warm Cream", bg: "#fdfbf7", text: "#292524", accent: "#d97706" },
  { name: "Soft Rose", bg: "#fff1f2", text: "#4c0519", accent: "#f43f5e" },
  { name: "Pastel Peach", bg: "#fff7ed", text: "#431407", accent: "#ea580c" },
  { name: "Mint Sage", bg: "#f0fdf4", text: "#052e16", accent: "#16a34a" },
  { name: "Sky Blue", bg: "#f0f9ff", text: "#082f49", accent: "#0284c7" },
  { name: "Lavender", bg: "#faf5ff", text: "#3b0764", accent: "#9333ea" },
  { name: "Midnight", bg: "#18181b", text: "#fafafa", accent: "#fbbf24" },
];

type ActiveElement = "title" | "number" | "weekdays" | "dates" | "photo";

export function CalendarDesigner({ onExport }: DesignerProps) {
  const currentYear = new Date().getFullYear();
  const [year, setYear] = useState(currentYear + 1);
  const [weekStart, setWeekStart] = useState<WeekStart>("monday");
  const [template, setTemplate] = useState<TemplateId>("custom-studio");
  const [photoFrameStyle, setPhotoFrameStyle] = useState<PhotoFrameStyle>("poster-arched");
  const [fontId, setFontId] = useState<string>("hand");
  const [colorId, setColorId] = useState<string>("default");
  const [imagePosition, setImagePosition] = useState<ImagePosition>("top");
  const [textAlign, setTextAlign] = useState<TextAlign>("center");
  const [orientation, setOrientation] = useState<Orientation>("landscape");
  const [images, setImages] = useState<(string | null)[]>(Array(12).fill(null));
  const [activeMonth, setActiveMonth] = useState(0);
  const [swapSource, setSwapSource] = useState<number | null>(null);
  const [exporting, setExporting] = useState(false);
  const [pngDownloading, setPngDownloading] = useState(false);
  const [catSpeech, setCatSpeech] = useState(false);
  const [bulkModalOpen, setBulkModalOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Active element selected for granular appearance/placement editing
  const [selectedElement, setSelectedElement] = useState<ActiveElement>("title");

  // Mobile navigation tabs: preview | elements | custom | designs | colors | opacity | format
  const [mobileTab, setMobileTab] = useState<"preview" | "elements" | "custom" | "designs" | "colors" | "opacity" | "format">("preview");

  // Customization sidebar tab: elements | custom | designs | colors | opacity
  const [activeTab, setActiveTab] = useState<"elements" | "custom" | "designs" | "colors" | "opacity">("elements");

  // Advanced customization state
  const [customBgColor, setCustomBgColor] = useState<string>("");
  const [customTextColor, setCustomTextColor] = useState<string>("");
  const [customAccentColor, setCustomAccentColor] = useState<string>("");
  const [bgPattern, setBgPattern] = useState<string>("sunset");
  const [bgImage, setBgImage] = useState<string | null>(null);
  const [cardOpacity, setCardOpacity] = useState<number>(0.95);
  const [photoOpacity, setPhotoOpacity] = useState<number>(1);
  const [bgImageOpacity, setBgImageOpacity] = useState<number>(0.85);
  const [cardBlur, setCardBlur] = useState<boolean>(true);

  const [customizations, setCustomizations] = useState<MonthCustomization[]>(
    () => Array.from({ length: 12 }, () => emptyMonthCustomization()),
  );
  const [editorOpen, setEditorOpen] = useState(false);

  const bulkFileInputRef = useRef<HTMLInputElement>(null);
  const singleFileInputRef = useRef<HTMLInputElement>(null);
  const bgImageInputRef = useRef<HTMLInputElement>(null);
  const activePreviewRef = useRef<HTMLDivElement>(null);
  const pageRefs = useRef<(HTMLDivElement | null)[]>([]);

  const font = FONT_OPTIONS.find((f) => f.id === fontId) ?? FONT_OPTIONS[0];
  const color = COLOR_PRESETS.find((c) => c.id === colorId) ?? COLOR_PRESETS[0];

  const currentCust = customizations[activeMonth] || emptyMonthCustomization();

  const updateCurrentCust = (updates: Partial<MonthCustomization>) => {
    setCustomizations((prev) =>
      prev.map((c, idx) => (idx === activeMonth ? { ...c, ...updates } : c))
    );
  };

  const applyLayoutToAllMonths = () => {
    const src = customizations[activeMonth];
    setCustomizations((prev) =>
      prev.map((c) => ({
        ...c,
        titleShow: src.titleShow,
        titleFont: src.titleFont,
        titleSize: src.titleSize,
        titleColor: src.titleColor,
        titleX: src.titleX,
        titleY: src.titleY,
        monthNumberShow: src.monthNumberShow,
        monthNumberFormat: src.monthNumberFormat,
        monthNumberFont: src.monthNumberFont,
        monthNumberSize: src.monthNumberSize,
        monthNumberColor: src.monthNumberColor,
        monthNumberX: src.monthNumberX,
        monthNumberY: src.monthNumberY,
        weekdaysShow: src.weekdaysShow,
        weekdaysFont: src.weekdaysFont,
        weekdaysSize: src.weekdaysSize,
        weekdaysColor: src.weekdaysColor,
        weekdaysX: src.weekdaysX,
        weekdaysY: src.weekdaysY,
        datesShow: src.datesShow,
        datesFont: src.datesFont,
        datesSize: src.datesSize,
        datesColor: src.datesColor,
        datesX: src.datesX,
        datesY: src.datesY,
        datesGridStyle: src.datesGridStyle,
        photoX: src.photoX,
        photoY: src.photoY,
        photoScale: src.photoScale,
      }))
    );
    toast.success("✨ Applied custom layout & styles across all 12 months!");
  };

  const resetCurrentMonthLayout = () => {
    updateCurrentCust({
      titleShow: true,
      titleFont: undefined,
      titleSize: undefined,
      titleColor: undefined,
      titleX: undefined,
      titleY: undefined,
      monthNumberShow: true,
      monthNumberFormat: "padded",
      monthNumberFont: undefined,
      monthNumberSize: undefined,
      monthNumberColor: undefined,
      monthNumberX: undefined,
      monthNumberY: undefined,
      weekdaysShow: true,
      weekdaysFont: undefined,
      weekdaysSize: undefined,
      weekdaysColor: undefined,
      weekdaysX: undefined,
      weekdaysY: undefined,
      datesShow: true,
      datesFont: undefined,
      datesSize: undefined,
      datesColor: undefined,
      datesX: undefined,
      datesY: undefined,
      datesGridStyle: "clean",
      photoX: undefined,
      photoY: undefined,
      photoScale: 1,
    });
    toast.info(`Reset ${MONTH_NAMES[activeMonth]} layout to defaults`);
  };

  // Single file upload
  const handleSingleFile = useCallback((file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose a valid image file");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImages((prev) => {
        const next = [...prev];
        next[activeMonth] = reader.result as string;
        return next;
      });
      toast.success(`Photo set for ${MONTH_NAMES[activeMonth]}! 📸`);
    };
    reader.readAsDataURL(file);
  }, [activeMonth]);

  // Bulk upload: automatically distributes files across months
  const handleBulkUpload = useCallback((files: FileList | null) => {
    if (!files || files.length === 0) return;
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (imageFiles.length === 0) {
      toast.error("No valid image files found");
      return;
    }

    const newImages = [...images];
    let loadedCount = 0;
    const startIdx = imageFiles.length > 1 ? 0 : activeMonth;

    imageFiles.forEach((file, idx) => {
      const targetIdx = (startIdx + idx) % 12;
      const reader = new FileReader();
      reader.onload = () => {
        newImages[targetIdx] = reader.result as string;
        loadedCount++;
        if (loadedCount === imageFiles.length) {
          setImages([...newImages]);
          toast.success(
            `Bulk upload complete! Populated ${imageFiles.length} photo${
              imageFiles.length > 1 ? "s" : ""
            } across your calendar. ✨`
          );
          setBulkModalOpen(false);
        }
      };
      reader.readAsDataURL(file);
    });
  }, [activeMonth, images]);

  // 1-Click Auto-fill with 12 seasonal aesthetic illustrations
  const handleAutoFillSamplePhotos = () => {
    setImages(SAMPLE_MONTH_IMAGES.map((s) => s.url));
    toast.success("Loaded 12 seasonal photos across all months! 🌸✨");
    setBulkModalOpen(false);
  };

  // Background image upload
  const handleBgImageUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please choose an image file for the background");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setBgImage(reader.result as string);
      setBgPattern("custom");
      toast.success("Background wallpaper applied across calendar! 🖼️");
    };
    reader.readAsDataURL(file);
  };

  const removeImage = (idx: number) => {
    setImages((prev) => {
      const next = [...prev];
      next[idx] = null;
      return next;
    });
    toast.info(`Removed photo for ${MONTH_NAMES[idx]}`);
  };

  const clearAllImages = () => {
    setImages(Array(12).fill(null));
    toast.info("Cleared all 12 photos");
  };

  const resetAllStyles = () => {
    setTemplate("custom-studio");
    setPhotoFrameStyle("poster-arched");
    setFontId("hand");
    setCustomBgColor("");
    setCustomTextColor("");
    setCustomAccentColor("");
    setBgPattern("sunset");
    setBgImage(null);
    setCardOpacity(0.95);
    setPhotoOpacity(1);
    setBgImageOpacity(0.85);
    setCardBlur(true);
    setImagePosition("top");
    setTextAlign("center");
    toast.info("Reset styles to custom defaults ✨");
  };

  const startSwap = (idx: number) => {
    if (swapSource === null) {
      setSwapSource(idx);
      toast.info(`Click another month to swap with ${MONTH_NAMES[idx]}`);
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

  // Full 12-month PDF export
  const handleExport = async () => {
    setExporting(true);
    try {
      const els = pageRefs.current.filter((e): e is HTMLDivElement => !!e);
      await onExport(els, orientation);
      toast.success("12-Month Calendar PDF downloaded successfully! 📄✨");
    } catch (e) {
      console.error("PDF Export Error:", e);
      toast.error(`Export failed: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setExporting(false);
    }
  };

  // Single month PNG export
  const handleDownloadPng = async () => {
    if (!activePreviewRef.current) return;
    setPngDownloading(true);
    try {
      const canvas = await html2canvas(activePreviewRef.current, {
        scale: 2.5,
        useCORS: true,
        backgroundColor: null,
      });
      const link = document.createElement("a");
      link.download = `Calendar-${MONTH_NAMES[activeMonth]}-${year}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      toast.success(`Downloaded ${MONTH_NAMES[activeMonth]} as high-res PNG! 🖼️`);
    } catch (err) {
      console.error("PNG download error:", err);
      toast.error("Failed to download image.");
    } finally {
      setPngDownloading(false);
    }
  };

  const previewProps = (i: number) => ({
    year,
    monthIndex: i,
    template,
    weekStart,
    image: images[i],
    bgImage,
    bgPattern,
    cardOpacity,
    photoOpacity,
    bgImageOpacity,
    cardBlur,
    photoFrameStyle,
    fontFamily: font.css || undefined,
    bg: customBgColor || color.bg || undefined,
    text: customTextColor || color.text || undefined,
    accent: customAccentColor || color.accent || undefined,
    imagePosition,
    textAlign,
    orientation,
    // Element customization
    titleShow: customizations[i].titleShow ?? true,
    titleFont: customizations[i].titleFont,
    titleSize: customizations[i].titleSize,
    titleColor: customizations[i].titleColor,
    titleX: customizations[i].titleX,
    titleY: customizations[i].titleY,
    monthNumberShow: customizations[i].monthNumberShow ?? true,
    monthNumberFormat: customizations[i].monthNumberFormat ?? "padded",
    monthNumberFont: customizations[i].monthNumberFont,
    monthNumberSize: customizations[i].monthNumberSize,
    monthNumberColor: customizations[i].monthNumberColor,
    monthNumberX: customizations[i].monthNumberX,
    monthNumberY: customizations[i].monthNumberY,
    weekdaysShow: customizations[i].weekdaysShow ?? true,
    weekdaysFont: customizations[i].weekdaysFont,
    weekdaysSize: customizations[i].weekdaysSize,
    weekdaysColor: customizations[i].weekdaysColor,
    weekdaysX: customizations[i].weekdaysX,
    weekdaysY: customizations[i].weekdaysY,
    datesShow: customizations[i].datesShow ?? true,
    datesFont: customizations[i].datesFont,
    datesSize: customizations[i].datesSize,
    datesColor: customizations[i].datesColor,
    datesX: customizations[i].datesX,
    datesY: customizations[i].datesY,
    datesGridStyle: customizations[i].datesGridStyle ?? "clean",
    photoX: customizations[i].photoX,
    photoY: customizations[i].photoY,
    photoScale: customizations[i].photoScale ?? 1,
  });

  const uploadedCount = images.filter(Boolean).length;

  return (
    <div className="relative w-screen h-screen max-h-screen overflow-hidden bg-[#fcf8f2] flex flex-col font-sans select-none m-0 p-0 text-[#3a2210]">
      <Toaster richColors position="top-center" />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Quicksand:wght@600;700;800&family=Playfair+Display:wght@500;700&family=Dancing+Script:wght@700&family=Caveat:wght@700&display=swap');

        .pixel-font {
          font-family: 'Press Start 2P', monospace;
          image-rendering: pixelated;
        }

        .cal-tab-btn {
          transition: all 0.15s ease;
        }
        .cal-tab-btn:hover {
          transform: translateY(-1px);
        }
        .cal-tab-btn:active {
          transform: translateY(1px);
        }

        .cute-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .cute-scrollbar::-webkit-scrollbar-track {
          background: #f5eedc;
          border-radius: 4px;
        }
        .cute-scrollbar::-webkit-scrollbar-thumb {
          background: #d4ab71;
          border-radius: 4px;
        }
      `}</style>

      {/* Hidden file inputs */}
      <input
        ref={bulkFileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          handleBulkUpload(e.target.files);
          e.target.value = "";
        }}
      />
      <input
        ref={singleFileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleSingleFile(f);
          e.target.value = "";
        }}
      />
      <input
        ref={bgImageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleBgImageUpload(f);
          e.target.value = "";
        }}
      />

      {/* ========================================================================= */}
      {/* 1. TOP HEADER & TOOLBAR (RESPONSIVE)                                      */}
      {/* ========================================================================= */}
      <header className="min-h-14 py-1.5 bg-[#ffffff] border-b-2 border-[#e6d8cb] px-3 sm:px-4 flex flex-wrap items-center justify-between shrink-0 shadow-sm z-30 gap-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 px-2 py-1 rounded bg-[#fff0f3] border-2 border-[#5c3a1e] text-[#5c3a1e] text-[9px] font-bold shadow-[0_2px_0_#5c3a1e] hover:-translate-y-0.5 active:translate-y-0 transition-all no-underline pixel-font"
          >
            <span>←</span> STUDIO
          </Link>

          <div className="flex items-center gap-1.5">
            <span className="text-xl hidden sm:inline">📅</span>
            <div>
              <h1 className="text-xs sm:text-sm font-extrabold text-[#3a2210] tracking-wide" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                Photo Calendar Studio
              </h1>
              <div className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-[#8c6b54]">
                <span>{uploadedCount}/12 Photos</span>
                <span>•</span>
                <span className="capitalize">{orientation} (A4)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center / Action Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
          {/* Quick Customize Mode Toggle Button */}
          <button
            onClick={() => {
              setActiveTab("elements");
              setMobileTab("elements");
              toast.success("Opened Element Appearance & Placement Studio 📐");
            }}
            className="cal-tab-btn flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#ffd166] to-[#f4a261] text-[#3a2210] font-extrabold text-[11px] sm:text-xs shadow-[0_2px_0_#e76f51] hover:brightness-105 active:translate-y-0.5 border border-[#e76f51]/40"
            title="Customize font, size, and place for each element"
          >
            <Move className="w-3.5 h-3.5 text-[#e76f51]" />
            <span>Customize Elements</span>
          </button>

          {/* Orientation Toggle (Portrait vs Landscape) */}
          <div className="flex items-center bg-[#f5eedc] p-0.5 sm:p-1 rounded-lg border-2 border-[#d6c5b2]">
            <button
              onClick={() => {
                setOrientation("portrait");
                toast.success("Portrait A4 📄");
              }}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-bold transition-all ${
                orientation === "portrait"
                  ? "bg-[#ff758f] text-white shadow-sm"
                  : "text-[#5c3a1e] hover:bg-[#ebdcc8]"
              }`}
            >
              <FileText className="w-3 h-3" /> <span className="hidden sm:inline">Portrait</span>
            </button>
            <button
              onClick={() => {
                setOrientation("landscape");
                toast.success("Landscape A4 🖼️");
              }}
              className={`flex items-center gap-1 px-2 py-1 rounded text-[11px] font-bold transition-all ${
                orientation === "landscape"
                  ? "bg-[#ff758f] text-white shadow-sm"
                  : "text-[#5c3a1e] hover:bg-[#ebdcc8]"
              }`}
            >
              <Layers className="w-3 h-3 rotate-90" /> <span className="hidden sm:inline">Landscape</span>
            </button>
          </div>

          {/* Bulk Upload Button */}
          <button
            onClick={() => setBulkModalOpen(true)}
            className="cal-tab-btn flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#52b788] text-white text-[11px] sm:text-xs font-bold shadow-[0_2px_0_#2d6a4f] hover:bg-[#40916c] active:translate-y-0.5 active:shadow-none border border-[#2d6a4f]"
            title="Upload multiple photos at once"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Bulk Upload</span>
          </button>

          {/* 1-Click Auto Fill Sample Photos Button */}
          <button
            onClick={handleAutoFillSamplePhotos}
            className="cal-tab-btn hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#ffd166] text-[#3a2210] font-bold text-[11px] sm:text-xs shadow-[0_2px_0_#d4a373] hover:bg-[#f6bd60] border border-[#d4a373]"
            title="Auto-fill 12 curated seasonal illustrations"
          >
            <span>🌸</span>
            <span>Auto-Fill 12</span>
          </button>

          {/* Download PDF Quick Action Button */}
          <button
            onClick={handleExport}
            disabled={exporting}
            className="cal-tab-btn flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-[#e63946] text-white text-[11px] sm:text-xs font-bold shadow-[0_2px_0_#9d0208] hover:bg-[#d90429] active:translate-y-0.5 active:shadow-none border border-[#9d0208] disabled:opacity-50"
            title="Download full 12-month calendar as PDF"
          >
            {exporting ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span className="hidden sm:inline">Exporting...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>PDF</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Tab Selector */}
      <div className="flex md:hidden bg-[#faf3ea] border-b-2 border-[#e6d8cb] text-xs font-bold shrink-0 overflow-x-auto cute-scrollbar">
        <button
          onClick={() => setMobileTab("preview")}
          className={`flex-1 min-w-[70px] py-2 text-center border-b-2 transition-all ${
            mobileTab === "preview" ? "border-[#ff758f] text-[#ff758f] bg-white" : "border-transparent text-[#8c6b54]"
          }`}
        >
          📅 Preview
        </button>
        <button
          onClick={() => {
            setMobileTab("elements");
            setActiveTab("elements");
          }}
          className={`flex-1 min-w-[80px] py-2 text-center border-b-2 transition-all ${
            mobileTab === "elements" ? "border-[#ff758f] text-[#ff758f] bg-white" : "border-transparent text-[#8c6b54]"
          }`}
        >
          📐 Elements
        </button>
        <button
          onClick={() => {
            setMobileTab("custom");
            setActiveTab("custom");
          }}
          className={`flex-1 min-w-[75px] py-2 text-center border-b-2 transition-all ${
            mobileTab === "custom" ? "border-[#ff758f] text-[#ff758f] bg-white" : "border-transparent text-[#8c6b54]"
          }`}
        >
          ✨ Frames
        </button>
        <button
          onClick={() => {
            setMobileTab("colors");
            setActiveTab("colors");
          }}
          className={`flex-1 min-w-[75px] py-2 text-center border-b-2 transition-all ${
            mobileTab === "colors" ? "border-[#ff758f] text-[#ff758f] bg-white" : "border-transparent text-[#8c6b54]"
          }`}
        >
          🌈 Colors
        </button>
        <button
          onClick={() => {
            setMobileTab("opacity");
            setActiveTab("opacity");
          }}
          className={`flex-1 min-w-[75px] py-2 text-center border-b-2 transition-all ${
            mobileTab === "opacity" ? "border-[#ff758f] text-[#ff758f] bg-white" : "border-transparent text-[#8c6b54]"
          }`}
        >
          🎚️ Opacity
        </button>
        <button
          onClick={() => setMobileTab("format")}
          className={`flex-1 min-w-[65px] py-2 text-center border-b-2 transition-all ${
            mobileTab === "format" ? "border-[#ff758f] text-[#ff758f] bg-white" : "border-transparent text-[#8c6b54]"
          }`}
        >
          ⚙️ Format
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 2. MAIN WORKSPACE (RESPONSIVE 3-PANEL ON DESKTOP, TABBED ON MOBILE)       */}
      {/* ========================================================================= */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* ========================================= */}
        {/* LEFT COLUMN: CUSTOMIZATION TABS           */}
        {/* ========================================= */}
        <aside
          className={`w-full md:w-88 bg-[#fffdfa] border-r-2 border-[#e6d8cb] flex flex-col shrink-0 overflow-hidden shadow-sm ${
            mobileTab === "elements" || mobileTab === "custom" || mobileTab === "designs" || mobileTab === "colors" || mobileTab === "opacity"
              ? "flex"
              : "hidden md:flex"
          }`}
        >
          {/* Tab Selection Header */}
          <div className="flex border-b border-[#e6d8cb] bg-[#faf3ea] overflow-x-auto cute-scrollbar">
            <button
              onClick={() => setActiveTab("elements")}
              className={`flex-1 min-w-[75px] py-2 text-[11px] font-bold flex items-center justify-center gap-1 border-b-2 transition-all ${
                activeTab === "elements"
                  ? "border-[#ff758f] text-[#ff758f] bg-white"
                  : "border-transparent text-[#8c6b54] hover:text-[#5c3a1e]"
              }`}
            >
              <Move className="w-3.5 h-3.5" /> Elements
            </button>
            <button
              onClick={() => setActiveTab("custom")}
              className={`flex-1 min-w-[75px] py-2 text-[11px] font-bold flex items-center justify-center gap-1 border-b-2 transition-all ${
                activeTab === "custom"
                  ? "border-[#ff758f] text-[#ff758f] bg-white"
                  : "border-transparent text-[#8c6b54] hover:text-[#5c3a1e]"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" /> Frames
            </button>
            <button
              onClick={() => setActiveTab("designs")}
              className={`flex-1 min-w-[70px] py-2 text-[11px] font-bold flex items-center justify-center gap-1 border-b-2 transition-all ${
                activeTab === "designs"
                  ? "border-[#ff758f] text-[#ff758f] bg-white"
                  : "border-transparent text-[#8c6b54] hover:text-[#5c3a1e]"
              }`}
            >
              <Layers className="w-3.5 h-3.5" /> Presets
            </button>
            <button
              onClick={() => setActiveTab("colors")}
              className={`flex-1 min-w-[75px] py-2 text-[11px] font-bold flex items-center justify-center gap-1 border-b-2 transition-all ${
                activeTab === "colors"
                  ? "border-[#ff758f] text-[#ff758f] bg-white"
                  : "border-transparent text-[#8c6b54] hover:text-[#5c3a1e]"
              }`}
            >
              <Palette className="w-3.5 h-3.5" /> Colors & BG
            </button>
            <button
              onClick={() => setActiveTab("opacity")}
              className={`flex-1 min-w-[70px] py-2 text-[11px] font-bold flex items-center justify-center gap-1 border-b-2 transition-all ${
                activeTab === "opacity"
                  ? "border-[#ff758f] text-[#ff758f] bg-white"
                  : "border-transparent text-[#8c6b54] hover:text-[#5c3a1e]"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" /> Opacity
            </button>
          </div>

          {/* TAB 1: GRANULAR ELEMENT APPEARANCE & PLACEMENT */}
          {activeTab === "elements" && (
            <div className="flex-1 overflow-y-auto cute-scrollbar p-3 space-y-3.5 text-xs">
              {/* Element Selector Bar */}
              <div className="p-1 bg-[#faf3ea] rounded-xl border border-[#e6d8cb] grid grid-cols-5 gap-1 text-[10px] font-bold text-center">
                <button
                  onClick={() => setSelectedElement("title")}
                  className={`py-1.5 rounded-lg transition-all flex flex-col items-center gap-0.5 ${
                    selectedElement === "title"
                      ? "bg-[#ff758f] text-white shadow-xs"
                      : "text-[#5c3a1e] hover:bg-[#ebdcc8]"
                  }`}
                >
                  <Type className="w-3 h-3" />
                  <span>Name</span>
                </button>
                <button
                  onClick={() => setSelectedElement("number")}
                  className={`py-1.5 rounded-lg transition-all flex flex-col items-center gap-0.5 ${
                    selectedElement === "number"
                      ? "bg-[#ff758f] text-white shadow-xs"
                      : "text-[#5c3a1e] hover:bg-[#ebdcc8]"
                  }`}
                >
                  <Hash className="w-3 h-3" />
                  <span>Number</span>
                </button>
                <button
                  onClick={() => setSelectedElement("weekdays")}
                  className={`py-1.5 rounded-lg transition-all flex flex-col items-center gap-0.5 ${
                    selectedElement === "weekdays"
                      ? "bg-[#ff758f] text-white shadow-xs"
                      : "text-[#5c3a1e] hover:bg-[#ebdcc8]"
                  }`}
                >
                  <CalendarIcon className="w-3 h-3" />
                  <span>Weekdays</span>
                </button>
                <button
                  onClick={() => setSelectedElement("dates")}
                  className={`py-1.5 rounded-lg transition-all flex flex-col items-center gap-0.5 ${
                    selectedElement === "dates"
                      ? "bg-[#ff758f] text-white shadow-xs"
                      : "text-[#5c3a1e] hover:bg-[#ebdcc8]"
                  }`}
                >
                  <Sliders className="w-3 h-3" />
                  <span>Dates</span>
                </button>
                <button
                  onClick={() => setSelectedElement("photo")}
                  className={`py-1.5 rounded-lg transition-all flex flex-col items-center gap-0.5 ${
                    selectedElement === "photo"
                      ? "bg-[#ff758f] text-white shadow-xs"
                      : "text-[#5c3a1e] hover:bg-[#ebdcc8]"
                  }`}
                >
                  <ImageIcon className="w-3 h-3" />
                  <span>Photo</span>
                </button>
              </div>

              {/* 1. MONTH NAME (TITLE) CONTROLS */}
              {selectedElement === "title" && (
                <div className="space-y-3 p-3 bg-white rounded-xl border border-[#e6d8cb] shadow-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-[#f0e6dc]">
                    <div className="font-bold text-[#3a2210] flex items-center gap-1.5 text-xs">
                      <Type className="w-3.5 h-3.5 text-[#ff758f]" />
                      <span>Month Name ("{MONTH_NAMES[activeMonth]}")</span>
                    </div>
                    <button
                      onClick={() =>
                        updateCurrentCust({
                          titleShow: currentCust.titleShow === false ? true : false,
                        })
                      }
                      className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                        currentCust.titleShow !== false
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {currentCust.titleShow !== false ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{currentCust.titleShow !== false ? "Visible" : "Hidden"}</span>
                    </button>
                  </div>

                  {/* Font Family */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#8c6b54]">Font Style</label>
                    <div className="grid grid-cols-2 gap-1">
                      {FONT_OPTIONS.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => updateCurrentCust({ titleFont: f.css || undefined })}
                          className={`p-1.5 rounded border text-left text-xs truncate transition-all ${
                            currentCust.titleFont === (f.css || undefined)
                              ? "bg-[#fff0f3] border-[#ff758f] font-bold text-[#ff758f]"
                              : "bg-white border-[#e6d8cb] hover:bg-[#faf4ec]"
                          }`}
                          style={{ fontFamily: f.css || "inherit" }}
                        >
                          {f.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Font Size */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-[#8c6b54]">Font Size</span>
                      <span className="font-mono text-[#ff758f]">
                        {currentCust.titleSize || 32}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="16"
                      max="72"
                      step="2"
                      value={currentCust.titleSize || 32}
                      onChange={(e) => updateCurrentCust({ titleSize: parseInt(e.target.value) })}
                      className="w-full accent-[#ff758f] cursor-pointer"
                    />
                  </div>

                  {/* Font Color */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#8c6b54]">Color</span>
                    <div className="flex items-center gap-1.5">
                      <input
                        type="color"
                        value={currentCust.titleColor || "#292524"}
                        onChange={(e) => updateCurrentCust({ titleColor: e.target.value })}
                        className="w-6 h-6 rounded border cursor-pointer p-0"
                      />
                      {currentCust.titleColor && (
                        <button
                          onClick={() => updateCurrentCust({ titleColor: undefined })}
                          className="text-[10px] text-red-500 hover:underline"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Placement & Position */}
                  <div className="space-y-1.5 pt-2 border-t border-[#f0e6dc]">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-[#8c6b54]">Placement / Position</label>
                      {(currentCust.titleX !== undefined || currentCust.titleY !== undefined) && (
                        <button
                          onClick={() => updateCurrentCust({ titleX: undefined, titleY: undefined })}
                          className="text-[10px] text-[#ff758f] hover:underline"
                        >
                          Default Position
                        </button>
                      )}
                    </div>
                    {/* Quick position buttons */}
                    <div className="grid grid-cols-4 gap-1 text-[10px] font-bold">
                      <button
                        onClick={() => updateCurrentCust({ titleX: 0.25, titleY: 0.1 })}
                        className="py-1 rounded bg-[#faf4ec] border border-[#e6d8cb] hover:bg-[#f5eedc]"
                      >
                        Top Left
                      </button>
                      <button
                        onClick={() => updateCurrentCust({ titleX: 0.5, titleY: 0.1 })}
                        className="py-1 rounded bg-[#faf4ec] border border-[#e6d8cb] hover:bg-[#f5eedc]"
                      >
                        Top Center
                      </button>
                      <button
                        onClick={() => updateCurrentCust({ titleX: 0.75, titleY: 0.1 })}
                        className="py-1 rounded bg-[#faf4ec] border border-[#e6d8cb] hover:bg-[#f5eedc]"
                      >
                        Top Right
                      </button>
                      <button
                        onClick={() => updateCurrentCust({ titleX: 0.5, titleY: 0.5 })}
                        className="py-1 rounded bg-[#faf4ec] border border-[#e6d8cb] hover:bg-[#f5eedc]"
                      >
                        Center
                      </button>
                    </div>

                    {/* Fine X & Y sliders */}
                    <div className="space-y-1 text-[10px]">
                      <div className="flex justify-between">
                        <span className="text-[#8c6b54]">Horizontal (X)</span>
                        <span className="font-mono">{Math.round((currentCust.titleX ?? 0.5) * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.05"
                        max="0.95"
                        step="0.02"
                        value={currentCust.titleX ?? 0.5}
                        onChange={(e) => updateCurrentCust({ titleX: parseFloat(e.target.value) })}
                        className="w-full accent-[#ff758f] cursor-pointer"
                      />
                      <div className="flex justify-between">
                        <span className="text-[#8c6b54]">Vertical (Y)</span>
                        <span className="font-mono">{Math.round((currentCust.titleY ?? 0.1) * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.05"
                        max="0.95"
                        step="0.02"
                        value={currentCust.titleY ?? 0.1}
                        onChange={(e) => updateCurrentCust({ titleY: parseFloat(e.target.value) })}
                        className="w-full accent-[#ff758f] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 2. MONTH NUMBER CONTROLS */}
              {selectedElement === "number" && (
                <div className="space-y-3 p-3 bg-white rounded-xl border border-[#e6d8cb] shadow-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-[#f0e6dc]">
                    <div className="font-bold text-[#3a2210] flex items-center gap-1.5 text-xs">
                      <Hash className="w-3.5 h-3.5 text-[#ff758f]" />
                      <span>Month Number</span>
                    </div>
                    <button
                      onClick={() =>
                        updateCurrentCust({
                          monthNumberShow: currentCust.monthNumberShow === false ? true : false,
                        })
                      }
                      className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                        currentCust.monthNumberShow !== false
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {currentCust.monthNumberShow !== false ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{currentCust.monthNumberShow !== false ? "Visible" : "Hidden"}</span>
                    </button>
                  </div>

                  {/* Format Selector */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#8c6b54]">Number Format</label>
                    <div className="grid grid-cols-4 gap-1 text-[11px] font-bold">
                      {[
                        { id: "padded", label: "01" },
                        { id: "simple", label: "1" },
                        { id: "roman", label: "I (Roman)" },
                        { id: "hidden", label: "None" },
                      ].map((fmt) => (
                        <button
                          key={fmt.id}
                          onClick={() => updateCurrentCust({ monthNumberFormat: fmt.id as any })}
                          className={`py-1.5 rounded border text-center transition-all ${
                            (currentCust.monthNumberFormat ?? "padded") === fmt.id
                              ? "bg-[#ff758f] text-white border-[#ff758f]"
                              : "bg-white border-[#e6d8cb] hover:bg-[#faf4ec]"
                          }`}
                        >
                          {fmt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Font Family */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#8c6b54]">Font Style</label>
                    <div className="grid grid-cols-2 gap-1">
                      {FONT_OPTIONS.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => updateCurrentCust({ monthNumberFont: f.css || undefined })}
                          className={`p-1.5 rounded border text-left text-xs truncate transition-all ${
                            currentCust.monthNumberFont === (f.css || undefined)
                              ? "bg-[#fff0f3] border-[#ff758f] font-bold text-[#ff758f]"
                              : "bg-white border-[#e6d8cb] hover:bg-[#faf4ec]"
                          }`}
                          style={{ fontFamily: f.css || "inherit" }}
                        >
                          {f.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Font Size */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-[#8c6b54]">Number Size</span>
                      <span className="font-mono text-[#ff758f]">
                        {currentCust.monthNumberSize || 42}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="20"
                      max="96"
                      step="4"
                      value={currentCust.monthNumberSize || 42}
                      onChange={(e) => updateCurrentCust({ monthNumberSize: parseInt(e.target.value) })}
                      className="w-full accent-[#ff758f] cursor-pointer"
                    />
                  </div>

                  {/* Font Color */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#8c6b54]">Color</span>
                    <input
                      type="color"
                      value={currentCust.monthNumberColor || "#292524"}
                      onChange={(e) => updateCurrentCust({ monthNumberColor: e.target.value })}
                      className="w-6 h-6 rounded border cursor-pointer p-0"
                    />
                  </div>

                  {/* Placement & Position */}
                  <div className="space-y-1.5 pt-2 border-t border-[#f0e6dc]">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] font-bold text-[#8c6b54]">Position</label>
                      {(currentCust.monthNumberX !== undefined || currentCust.monthNumberY !== undefined) && (
                        <button
                          onClick={() => updateCurrentCust({ monthNumberX: undefined, monthNumberY: undefined })}
                          className="text-[10px] text-[#ff758f] hover:underline"
                        >
                          Reset to Title Flow
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-[10px] font-bold">
                      <button
                        onClick={() => updateCurrentCust({ monthNumberX: 0.15, monthNumberY: 0.12 })}
                        className="py-1 rounded bg-[#faf4ec] border border-[#e6d8cb] hover:bg-[#f5eedc]"
                      >
                        Top Left
                      </button>
                      <button
                        onClick={() => updateCurrentCust({ monthNumberX: 0.5, monthNumberY: 0.12 })}
                        className="py-1 rounded bg-[#faf4ec] border border-[#e6d8cb] hover:bg-[#f5eedc]"
                      >
                        Top Mid
                      </button>
                      <button
                        onClick={() => updateCurrentCust({ monthNumberX: 0.85, monthNumberY: 0.12 })}
                        className="py-1 rounded bg-[#faf4ec] border border-[#e6d8cb] hover:bg-[#f5eedc]"
                      >
                        Top Right
                      </button>
                      <button
                        onClick={() => updateCurrentCust({ monthNumberX: 0.85, monthNumberY: 0.85 })}
                        className="py-1 rounded bg-[#faf4ec] border border-[#e6d8cb] hover:bg-[#f5eedc]"
                      >
                        Bottom Right
                      </button>
                    </div>

                    <div className="space-y-1 text-[10px]">
                      <div className="flex justify-between">
                        <span className="text-[#8c6b54]">Position X</span>
                        <span className="font-mono">{Math.round((currentCust.monthNumberX ?? 0.5) * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.05"
                        max="0.95"
                        step="0.02"
                        value={currentCust.monthNumberX ?? 0.5}
                        onChange={(e) => updateCurrentCust({ monthNumberX: parseFloat(e.target.value) })}
                        className="w-full accent-[#ff758f] cursor-pointer"
                      />
                      <div className="flex justify-between">
                        <span className="text-[#8c6b54]">Position Y</span>
                        <span className="font-mono">{Math.round((currentCust.monthNumberY ?? 0.12) * 100)}%</span>
                      </div>
                      <input
                        type="range"
                        min="0.05"
                        max="0.95"
                        step="0.02"
                        value={currentCust.monthNumberY ?? 0.12}
                        onChange={(e) => updateCurrentCust({ monthNumberY: parseFloat(e.target.value) })}
                        className="w-full accent-[#ff758f] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* 3. WEEKDAYS HEADERS CONTROLS */}
              {selectedElement === "weekdays" && (
                <div className="space-y-3 p-3 bg-white rounded-xl border border-[#e6d8cb] shadow-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-[#f0e6dc]">
                    <div className="font-bold text-[#3a2210] flex items-center gap-1.5 text-xs">
                      <CalendarIcon className="w-3.5 h-3.5 text-[#ff758f]" />
                      <span>Weekday Headers (MON TUE...)</span>
                    </div>
                    <button
                      onClick={() =>
                        updateCurrentCust({
                          weekdaysShow: currentCust.weekdaysShow === false ? true : false,
                        })
                      }
                      className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                        currentCust.weekdaysShow !== false
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {currentCust.weekdaysShow !== false ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{currentCust.weekdaysShow !== false ? "Visible" : "Hidden"}</span>
                    </button>
                  </div>

                  {/* Week Starts On */}
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#8c6b54]">Week Starts On</span>
                    <div className="flex gap-1">
                      {(["monday", "sunday"] as WeekStart[]).map((ws) => (
                        <button
                          key={ws}
                          onClick={() => setWeekStart(ws)}
                          className={`px-2.5 py-1 rounded text-xs font-bold capitalize transition-all ${
                            weekStart === ws
                              ? "bg-[#ff758f] text-white"
                              : "bg-white text-[#5c3a1e] border border-[#d6c5b2]"
                          }`}
                        >
                          {ws.slice(0, 3)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Font Family */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#8c6b54]">Font Style</label>
                    <div className="grid grid-cols-2 gap-1">
                      {FONT_OPTIONS.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => updateCurrentCust({ weekdaysFont: f.css || undefined })}
                          className={`p-1.5 rounded border text-left text-xs truncate transition-all ${
                            currentCust.weekdaysFont === (f.css || undefined)
                              ? "bg-[#fff0f3] border-[#ff758f] font-bold text-[#ff758f]"
                              : "bg-white border-[#e6d8cb] hover:bg-[#faf4ec]"
                          }`}
                          style={{ fontFamily: f.css || "inherit" }}
                        >
                          {f.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Font Size & Color */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-[#8c6b54]">Header Size</span>
                      <span className="font-mono text-[#ff758f]">
                        {currentCust.weekdaysSize || 10}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="8"
                      max="18"
                      step="1"
                      value={currentCust.weekdaysSize || 10}
                      onChange={(e) => updateCurrentCust({ weekdaysSize: parseInt(e.target.value) })}
                      className="w-full accent-[#ff758f] cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#8c6b54]">Color</span>
                    <input
                      type="color"
                      value={currentCust.weekdaysColor || "#78716c"}
                      onChange={(e) => updateCurrentCust({ weekdaysColor: e.target.value })}
                      className="w-6 h-6 rounded border cursor-pointer p-0"
                    />
                  </div>
                </div>
              )}

              {/* 4. INTERNAL DATES GRID CONTROLS */}
              {selectedElement === "dates" && (
                <div className="space-y-3 p-3 bg-white rounded-xl border border-[#e6d8cb] shadow-xs">
                  <div className="flex items-center justify-between pb-1 border-b border-[#f0e6dc]">
                    <div className="font-bold text-[#3a2210] flex items-center gap-1.5 text-xs">
                      <CalendarIcon className="w-3.5 h-3.5 text-[#ff758f]" />
                      <span>Internal Dates (1 to 31)</span>
                    </div>
                    <button
                      onClick={() =>
                        updateCurrentCust({
                          datesShow: currentCust.datesShow === false ? true : false,
                        })
                      }
                      className={`px-2 py-0.5 rounded text-[10px] font-bold flex items-center gap-1 ${
                        currentCust.datesShow !== false
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {currentCust.datesShow !== false ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{currentCust.datesShow !== false ? "Visible" : "Hidden"}</span>
                    </button>
                  </div>

                  {/* Grid Style */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#8c6b54]">Date Number Cell Style</label>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] font-bold">
                      {[
                        { id: "clean", label: "Minimal Clean" },
                        { id: "boxed", label: "Boxed Grid 🔲" },
                        { id: "circle", label: "Circle Dot ⚪" },
                        { id: "lines", label: "Lined Paper 📄" },
                      ].map((st) => (
                        <button
                          key={st.id}
                          onClick={() => updateCurrentCust({ datesGridStyle: st.id as any })}
                          className={`py-1.5 px-2 rounded border text-center transition-all ${
                            (currentCust.datesGridStyle ?? "clean") === st.id
                              ? "bg-[#ff758f] text-white border-[#ff758f]"
                              : "bg-white border-[#e6d8cb] hover:bg-[#faf4ec]"
                          }`}
                        >
                          {st.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Font Family */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#8c6b54]">Dates Font</label>
                    <div className="grid grid-cols-2 gap-1">
                      {FONT_OPTIONS.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => updateCurrentCust({ datesFont: f.css || undefined })}
                          className={`p-1.5 rounded border text-left text-xs truncate transition-all ${
                            currentCust.datesFont === (f.css || undefined)
                              ? "bg-[#fff0f3] border-[#ff758f] font-bold text-[#ff758f]"
                              : "bg-white border-[#e6d8cb] hover:bg-[#faf4ec]"
                          }`}
                          style={{ fontFamily: f.css || "inherit" }}
                        >
                          {f.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date Numbers Size & Color */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-[#8c6b54]">Dates Number Size</span>
                      <span className="font-mono text-[#ff758f]">
                        {currentCust.datesSize || 14}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="26"
                      step="1"
                      value={currentCust.datesSize || 14}
                      onChange={(e) => updateCurrentCust({ datesSize: parseInt(e.target.value) })}
                      className="w-full accent-[#ff758f] cursor-pointer"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#8c6b54]">Color</span>
                    <input
                      type="color"
                      value={currentCust.datesColor || "#1c1917"}
                      onChange={(e) => updateCurrentCust({ datesColor: e.target.value })}
                      className="w-6 h-6 rounded border cursor-pointer p-0"
                    />
                  </div>
                </div>
              )}

              {/* 5. PHOTO PLACEMENT & CUTOUT */}
              {selectedElement === "photo" && (
                <div className="space-y-3 p-3 bg-white rounded-xl border border-[#e6d8cb] shadow-xs">
                  <div className="font-bold text-[#3a2210] flex items-center gap-1.5 text-xs pb-1 border-b border-[#f0e6dc]">
                    <ImageIcon className="w-3.5 h-3.5 text-[#ff758f]" />
                    <span>Photo Frame & Placement</span>
                  </div>

                  {/* Photo Frame Style */}
                  <div className="space-y-1">
                    <label className="text-[11px] font-bold text-[#8c6b54]">Photo Frame Cutout</label>
                    <div className="grid grid-cols-2 gap-1">
                      {PHOTO_FRAME_STYLES.map((f) => (
                        <button
                          key={f.id}
                          onClick={() => {
                            setPhotoFrameStyle(f.id);
                            toast.success(`Frame set to ${f.name}!`);
                          }}
                          className={`p-1.5 rounded border text-left text-xs flex items-center gap-1.5 transition-all ${
                            photoFrameStyle === f.id
                              ? "bg-[#fff0f3] border-[#ff758f] font-bold text-[#ff758f]"
                              : "bg-white border-[#e6d8cb] hover:bg-[#faf4ec]"
                          }`}
                        >
                          <span>{f.icon}</span>
                          <span className="truncate">{f.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Photo Scale */}
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] font-bold">
                      <span className="text-[#8c6b54]">Photo Size / Scale</span>
                      <span className="font-mono text-[#ff758f]">
                        {Math.round((currentCust.photoScale ?? 1) * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0.7"
                      max="1.3"
                      step="0.05"
                      value={currentCust.photoScale ?? 1}
                      onChange={(e) => updateCurrentCust({ photoScale: parseFloat(e.target.value) })}
                      className="w-full accent-[#ff758f] cursor-pointer"
                    />
                  </div>

                  {/* Fine Position Offset */}
                  <div className="space-y-1 text-[10px]">
                    <div className="flex justify-between font-bold">
                      <span className="text-[#8c6b54]">Offset Position</span>
                      {(currentCust.photoX !== undefined || currentCust.photoY !== undefined) && (
                        <button
                          onClick={() => updateCurrentCust({ photoX: undefined, photoY: undefined, photoScale: 1 })}
                          className="text-[#ff758f] hover:underline"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <div className="flex justify-between text-[#8c6b54]">
                          <span>X</span>
                          <span>{Math.round(((currentCust.photoX ?? 0.5) - 0.5) * 60)}px</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.02"
                          value={currentCust.photoX ?? 0.5}
                          onChange={(e) => updateCurrentCust({ photoX: parseFloat(e.target.value) })}
                          className="w-full accent-[#ff758f] cursor-pointer"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-[#8c6b54]">
                          <span>Y</span>
                          <span>{Math.round(((currentCust.photoY ?? 0.5) - 0.5) * 60)}px</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1"
                          step="0.02"
                          value={currentCust.photoY ?? 0.5}
                          onChange={(e) => updateCurrentCust({ photoY: parseFloat(e.target.value) })}
                          className="w-full accent-[#ff758f] cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons: Apply to All Months & Reset */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={applyLayoutToAllMonths}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-[#ffd166] to-[#f4a261] text-[#3a2210] font-extrabold text-xs shadow-xs border border-[#e76f51]/40 hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-2"
                >
                  <Copy className="w-3.5 h-3.5 text-[#e76f51]" />
                  <span>Apply Layout to All 12 Months ✨</span>
                </button>

                <button
                  onClick={resetCurrentMonthLayout}
                  className="w-full py-1.5 text-center text-xs text-[#8c6b54] hover:text-[#5c3a1e] hover:underline flex items-center justify-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Reset {MONTH_NAMES[activeMonth]} Layout</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: MIX & MATCH FRAMES */}
          {activeTab === "custom" && (
            <div className="flex-1 overflow-y-auto cute-scrollbar p-3 space-y-4 text-xs">
              <div className="p-2.5 bg-[#fff7ed] rounded-xl border border-[#fed7aa]">
                <div className="flex items-center gap-1.5 font-bold text-[#7c2d12] text-xs">
                  <span>✨</span>
                  <span>Photo Frame Cutouts & Shapes</span>
                </div>
                <p className="text-[10px] text-[#9a3412] mt-0.5">
                  Pick the shape and framing style for your photos across the calendar!
                </p>
              </div>

              {/* Photo Frame / Shape Designs */}
              <div className="space-y-1.5">
                <div className="grid grid-cols-2 gap-1.5">
                  {PHOTO_FRAME_STYLES.map((f) => {
                    const isSelected = photoFrameStyle === f.id && template === "custom-studio";
                    return (
                      <button
                        key={f.id}
                        onClick={() => {
                          setTemplate("custom-studio");
                          setPhotoFrameStyle(f.id);
                          toast.success(`Photo frame: ${f.name}!`);
                        }}
                        className={`p-2 rounded-lg border-2 text-left flex flex-col justify-between transition-all ${
                          isSelected
                            ? "bg-[#fff0f3] border-[#ff758f] shadow-xs text-[#ff758f]"
                            : "bg-white border-[#e6d8cb] hover:border-[#d4ab71] text-[#3a2210]"
                        }`}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span className="text-base">{f.icon}</span>
                          {isSelected && <span className="text-xs font-bold text-[#ff758f]">✓</span>}
                        </div>
                        <div className="mt-1">
                          <div className="font-bold text-[11px] leading-tight">{f.name}</div>
                          <div className="text-[9px] text-[#8c6b54] truncate">{f.desc}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: READY-MADE PRESETS */}
          {activeTab === "designs" && (
            <div className="flex-1 overflow-y-auto cute-scrollbar p-3 space-y-2">
              <div className="flex items-center justify-between pb-1">
                <span className="text-[11px] font-bold text-[#8c6b54] uppercase tracking-wider">
                  {TEMPLATES.length} Presets Available
                </span>
                <span className="text-[10px] text-[#ff758f]">Click to apply</span>
              </div>

              {TEMPLATES.map((t) => {
                const isSelected = template === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTemplate(t.id);
                      toast.success(`Preset "${t.name}" loaded!`);
                    }}
                    className={`w-full text-left p-2.5 rounded-lg border-2 transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-[#fff0f3] border-[#ff758f] shadow-sm ring-2 ring-[#ff758f]/20"
                        : "bg-[#ffffff] border-[#e6d8cb] hover:border-[#d4ab71] hover:bg-[#faf4ec]"
                    }`}
                  >
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-sm font-bold text-[#3a2210]">{t.name}</span>
                        {isSelected && <span className="text-[#ff758f] text-xs">♥</span>}
                      </div>
                      <p className="text-[10px] text-[#8c6b54] mt-0.5">{t.desc}</p>
                    </div>
                    <div
                      className={`w-6 h-6 rounded-full border flex items-center justify-center text-[10px] ${
                        isSelected
                          ? "bg-[#ff758f] text-white border-[#ff758f]"
                          : "bg-[#f5eedc] text-[#5c3a1e] border-[#d4ab71]"
                      }`}
                    >
                      {isSelected ? "✓" : "✦"}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* TAB 4: COLORS, BACKGROUND IMAGE & PATTERNS */}
          {activeTab === "colors" && (
            <div className="flex-1 overflow-y-auto cute-scrollbar p-3 space-y-4 text-xs">
              {/* Background Color Presets */}
              <div className="space-y-1.5">
                <label className="font-bold text-[#5c3a1e] uppercase tracking-wider text-[11px] flex items-center justify-between">
                  <span>Calendar Background Color</span>
                  {customBgColor && (
                    <button
                      onClick={() => setCustomBgColor("")}
                      className="text-[10px] text-[#ff758f] hover:underline"
                    >
                      Reset
                    </button>
                  )}
                </label>
                <div className="grid grid-cols-5 gap-1.5">
                  {PRESET_PALETTES.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => {
                        setCustomBgColor(p.bg);
                        if (p.text) setCustomTextColor(p.text);
                        if (p.accent) setCustomAccentColor(p.accent);
                        toast.success(`Color palette "${p.name}" applied!`);
                      }}
                      className="aspect-square rounded-md border-2 border-[#d6c5b2] hover:scale-105 transition-transform relative flex items-center justify-center shadow-xs"
                      style={{ backgroundColor: p.bg || "#ffffff" }}
                      title={p.name}
                    >
                      {customBgColor === p.bg && <span className="text-xs">✓</span>}
                    </button>
                  ))}
                </div>

                {/* Custom Hex Color Picker */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="color"
                    value={customBgColor || "#ffffff"}
                    onChange={(e) => setCustomBgColor(e.target.value)}
                    className="w-8 h-8 rounded border border-[#d6c5b2] cursor-pointer p-0"
                    title="Choose custom background color"
                  />
                  <input
                    type="text"
                    value={customBgColor}
                    placeholder="Custom Hex (#ffffff)"
                    onChange={(e) => setCustomBgColor(e.target.value)}
                    className="flex-1 px-2 py-1 rounded border border-[#d6c5b2] text-xs font-mono uppercase bg-white"
                  />
                </div>
              </div>

              {/* Background Patterns & Textures */}
              <div className="space-y-2 pt-2 border-t border-[#e6d8cb]">
                <label className="font-bold text-[#5c3a1e] uppercase tracking-wider text-[11px] block">
                  Background Patterns & Textures
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {BG_PATTERNS.map((pat) => (
                    <button
                      key={pat.id}
                      onClick={() => {
                        setBgPattern(pat.id);
                        if (pat.id !== "custom") setBgImage(null);
                        toast.success(`Pattern: ${pat.name}!`);
                      }}
                      className={`p-2 rounded-lg border-2 text-left flex items-center gap-1.5 transition-all ${
                        bgPattern === pat.id
                          ? "bg-[#fff0f3] border-[#ff758f] font-bold text-[#ff758f]"
                          : "bg-white border-[#e6d8cb] hover:border-[#d4ab71]"
                      }`}
                    >
                      <span>{pat.icon}</span>
                      <span className="truncate">{pat.name}</span>
                    </button>
                  ))}
                </div>

                {/* Upload Custom Wallpaper / Background Image */}
                <button
                  onClick={() => bgImageInputRef.current?.click()}
                  className="w-full py-2.5 px-3 rounded-lg bg-white border-2 border-dashed border-[#d4ab71] hover:bg-[#fffdf5] text-[#5c3a1e] font-bold flex items-center justify-center gap-2 transition-all mt-1"
                >
                  <Upload className="w-4 h-4 text-[#d4ab71]" />
                  <span>{bgImage ? "Replace Wallpaper Image" : "Upload Background Wallpaper Image"}</span>
                </button>
                {bgImage && (
                  <button
                    onClick={() => {
                      setBgImage(null);
                      setBgPattern("none");
                      toast.info("Removed background wallpaper");
                    }}
                    className="w-full text-center text-[10px] text-red-600 hover:underline"
                  >
                    Remove Background Image
                  </button>
                )}
              </div>
            </div>
          )}

          {/* TAB 5: TRANSPARENCY, OPACITY & GLASSMORPHISM */}
          {activeTab === "opacity" && (
            <div className="flex-1 overflow-y-auto cute-scrollbar p-3 space-y-4 text-xs">
              <div className="p-2.5 bg-[#f0fdf4] rounded-xl border border-[#bbf7d0]">
                <div className="font-bold text-[#14532d] text-xs flex items-center gap-1.5">
                  <span>🎚️</span>
                  <span>Transparency & Glassmorphism</span>
                </div>
                <p className="text-[10px] text-[#15803d] mt-0.5">
                  Adjust sheer opacity from frosted glass to 100% opaque.
                </p>
              </div>

              {/* Frosted Glass Blur Toggle */}
              <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#e6d8cb]">
                <div>
                  <div className="font-bold text-[#3a2210]">Frosted Glass Blur</div>
                  <div className="text-[10px] text-[#8c6b54]">Soft frosted backdrop effect</div>
                </div>
                <button
                  onClick={() => setCardBlur(!cardBlur)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    cardBlur ? "bg-[#52b788] text-white" : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {cardBlur ? "ON" : "OFF"}
                </button>
              </div>

              {/* Card / Calendar Transparency Slider */}
              <div className="space-y-1.5 p-2 rounded-lg bg-white border border-[#e6d8cb]">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#3a2210]">Calendar Card Opacity</span>
                  <span className="text-[#ff758f] font-mono">{Math.round(cardOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={cardOpacity}
                  onChange={(e) => setCardOpacity(parseFloat(e.target.value))}
                  className="w-full accent-[#ff758f] cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-[#8c6b54]">
                  <span>Sheer (10%)</span>
                  <span>Frosted (50%)</span>
                  <span>Solid (100%)</span>
                </div>
              </div>

              {/* Photo Opacity Slider */}
              <div className="space-y-1.5 p-2 rounded-lg bg-white border border-[#e6d8cb]">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#3a2210]">Photo Opacity</span>
                  <span className="text-[#ff758f] font-mono">{Math.round(photoOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.2"
                  max="1"
                  step="0.05"
                  value={photoOpacity}
                  onChange={(e) => setPhotoOpacity(parseFloat(e.target.value))}
                  className="w-full accent-[#ff758f] cursor-pointer"
                />
              </div>

              {/* Wallpaper Opacity Slider */}
              <div className="space-y-1.5 p-2 rounded-lg bg-white border border-[#e6d8cb]">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-[#3a2210]">Wallpaper / Pattern Opacity</span>
                  <span className="text-[#ff758f] font-mono">{Math.round(bgImageOpacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.1"
                  max="1"
                  step="0.05"
                  value={bgImageOpacity}
                  onChange={(e) => setBgImageOpacity(parseFloat(e.target.value))}
                  className="w-full accent-[#ff758f] cursor-pointer"
                />
              </div>
            </div>
          )}
        </aside>

        {/* ========================================= */}
        {/* CENTER COLUMN: LIVE CALENDAR PREVIEW      */}
        {/* ========================================= */}
        <main
          className={`flex-1 flex flex-col bg-[#fcf8f2] overflow-hidden p-2 sm:p-3 items-center justify-between ${
            mobileTab === "preview" ? "flex" : "hidden md:flex"
          }`}
        >
          {/* Month Navigation Header */}
          <div className="flex items-center justify-between w-full max-w-xl bg-white px-3 py-1.5 rounded-full border-2 border-[#e6d8cb] shadow-sm shrink-0 mb-2">
            <button
              onClick={() => setActiveMonth((prev) => (prev === 0 ? 11 : prev - 1))}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-[#5c3a1e] hover:bg-[#f5eedc] transition-all"
            >
              <ChevronLeft className="w-4 h-4" /> Prev
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="text-[#ff758f] animate-pulse">♥</span>
              <span className="text-xs sm:text-sm font-extrabold tracking-wide" style={{ fontFamily: "'Quicksand', sans-serif" }}>
                {MONTH_NAMES[activeMonth]} {year}
              </span>
              <span className="text-[9px] sm:text-[10px] px-2 py-0.5 rounded-full bg-[#f5eedc] text-[#8c6b54] font-semibold">
                {activeMonth + 1}/12
              </span>
              <span className="text-[#ff758f] animate-pulse">♥</span>
            </div>

            <button
              onClick={() => setActiveMonth((prev) => (prev === 11 ? 0 : prev + 1))}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold text-[#5c3a1e] hover:bg-[#f5eedc] transition-all"
            >
              Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Interactive Live Calendar Canvas */}
          <div className="flex-1 w-full h-full flex items-center justify-center p-1 sm:p-2 overflow-hidden min-h-0 min-w-0 relative">
            <div
              ref={activePreviewRef}
              className="relative bg-white shadow-xl rounded-xl border-2 sm:border-4 border-[#e6d8cb] overflow-hidden transition-all duration-300 max-w-full max-h-full"
              style={{
                aspectRatio: orientation === "landscape" ? "297 / 210" : "210 / 297",
                width:
                  orientation === "landscape"
                    ? "min(100%, calc((100vh - 200px) * (297 / 210)), 850px)"
                    : "min(100%, calc((100vh - 200px) * (210 / 297)), 540px)",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            >
              <CalendarPage
                {...previewProps(activeMonth)}
                className="w-full h-full shadow-none border-none"
                onImageClick={() => singleFileInputRef.current?.click()}
                onElementClick={(elem) => {
                  setSelectedElement(elem);
                  setActiveTab("elements");
                  setMobileTab("elements");
                  toast.info(`Editing ${elem} appearance & placement`);
                }}
              />

              {/* Custom Drawing & Stickers Overlay for Active Month */}
              <CustomOverlay
                customization={customizations[activeMonth]}
                onChange={() => {}}
                tool="select"
                readOnly
              />
            </div>
          </div>

          {/* Bottom 12 Month Thumbnails Bar */}
          <div className="w-full max-w-4xl bg-white border-2 border-[#e6d8cb] rounded-xl p-1.5 shadow-sm mt-2 shrink-0 overflow-x-auto cute-scrollbar">
            <div className="grid grid-cols-6 sm:grid-cols-12 gap-1 sm:gap-1.5 min-w-[300px]">
              {MONTH_NAMES.map((name, i) => {
                const isActive = activeMonth === i;
                const hasImage = Boolean(images[i]);
                const isSwapping = swapSource === i;

                return (
                  <button
                    key={name}
                    onClick={() => {
                      if (swapSource !== null && swapSource !== i) {
                        startSwap(i);
                      } else {
                        setActiveMonth(i);
                      }
                    }}
                    className={`relative p-1 rounded-lg border-2 transition-all flex flex-col items-center justify-between text-left ${
                      isActive
                        ? "border-[#ff758f] bg-[#fff0f3] ring-2 ring-[#ff758f]/30 scale-105"
                        : "border-[#e6d8cb] bg-[#faf4ec] hover:border-[#d4ab71]"
                    } ${isSwapping ? "ring-2 ring-yellow-400 animate-bounce" : ""}`}
                    title={`Month: ${name} (${hasImage ? "Photo set" : "Empty"})`}
                  >
                    {/* Thumbnail box */}
                    <div className="w-full aspect-[4/3] rounded bg-[#ebdcc8] overflow-hidden relative mb-1 flex items-center justify-center">
                      {hasImage ? (
                        <img src={images[i]!} alt={name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[8px] sm:text-[9px] text-[#8c6b54]">empty</span>
                      )}
                      {hasImage && (
                        <div className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-[#52b788] text-white flex items-center justify-center text-[7px] font-bold">
                          ✓
                        </div>
                      )}
                    </div>
                    <span className="text-[9px] sm:text-[10px] font-bold text-[#3a2210] truncate w-full text-center">
                      {name.slice(0, 3)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </main>

        {/* ========================================= */}
        {/* RIGHT COLUMN: CONTROLS & EXPORT OPTIONS   */}
        {/* ========================================= */}
        <aside
          className={`w-full md:w-64 bg-[#fffdfa] border-l-2 border-[#e6d8cb] flex flex-col shrink-0 p-3 space-y-4 overflow-y-auto cute-scrollbar shadow-sm ${
            mobileTab === "format" ? "flex" : "hidden md:flex"
          }`}
        >
          {/* Orientation & Format Block */}
          <div className="p-3 bg-[#faf3ea] rounded-xl border border-[#e6d8cb] space-y-2">
            <h3 className="text-xs font-bold text-[#5c3a1e] tracking-wider uppercase flex items-center gap-1.5">
              <span>📄 Page Format</span>
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                onClick={() => setOrientation("portrait")}
                className={`py-2 px-2 rounded-lg border-2 font-bold flex flex-col items-center gap-1 transition-all ${
                  orientation === "portrait"
                    ? "bg-[#ff758f] text-white border-[#ff758f] shadow-sm"
                    : "bg-white text-[#5c3a1e] border-[#e6d8cb] hover:border-[#d4ab71]"
                }`}
              >
                <div className="w-5 h-7 border-2 border-current rounded-sm" />
                <span>Portrait</span>
              </button>
              <button
                onClick={() => setOrientation("landscape")}
                className={`py-2 px-2 rounded-lg border-2 font-bold flex flex-col items-center gap-1 transition-all ${
                  orientation === "landscape"
                    ? "bg-[#ff758f] text-white border-[#ff758f] shadow-sm"
                    : "bg-white text-[#5c3a1e] border-[#e6d8cb] hover:border-[#d4ab71]"
                }`}
              >
                <div className="w-7 h-5 border-2 border-current rounded-sm" />
                <span>Landscape</span>
              </button>
            </div>
          </div>

          {/* Active Month Photo Controls */}
          <div className="p-3 bg-[#faf3ea] rounded-xl border border-[#e6d8cb] space-y-2.5">
            <h3 className="text-xs font-bold text-[#5c3a1e] tracking-wider uppercase">
              ♥ {MONTH_NAMES[activeMonth]} Photo
            </h3>

            {images[activeMonth] ? (
              <div className="space-y-2">
                <div className="relative aspect-video rounded-lg overflow-hidden border border-[#d6c5b2] shadow-inner">
                  <img src={images[activeMonth]!} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => singleFileInputRef.current?.click()}
                    className="flex-1 py-1.5 rounded-lg bg-[#5c3a1e] text-white text-xs font-bold hover:bg-[#432918] transition-all"
                  >
                    Replace
                  </button>
                  <button
                    onClick={() => removeImage(activeMonth)}
                    className="px-2 py-1.5 rounded-lg bg-red-100 text-red-700 text-xs font-bold hover:bg-red-200 transition-all"
                    title="Remove photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => singleFileInputRef.current?.click()}
                className="w-full py-4 border-2 border-dashed border-[#d4ab71] rounded-lg bg-white hover:bg-[#fff9f0] transition-all flex flex-col items-center justify-center gap-1 text-[#5c3a1e]"
              >
                <Upload className="w-5 h-5 text-[#d4ab71]" />
                <span className="text-xs font-bold">Upload Photo</span>
              </button>
            )}

            <button
              onClick={() => startSwap(activeMonth)}
              className="w-full flex items-center justify-center gap-1 py-1.5 text-xs font-bold rounded-lg bg-white border border-[#d6c5b2] hover:bg-[#f5eedc] text-[#5c3a1e] transition-all"
            >
              <ArrowLeftRight className="w-3 h-3" />
              <span>{swapSource === activeMonth ? "Cancel Swap" : "Swap with other month"}</span>
            </button>
          </div>

          {/* Year & Week Start Settings */}
          <div className="p-3 bg-[#faf3ea] rounded-xl border border-[#e6d8cb] space-y-2 text-xs">
            <h3 className="font-bold text-[#5c3a1e] tracking-wider uppercase">Calendar Settings</h3>
            <div className="flex items-center justify-between">
              <span className="text-[#8c6b54]">Calendar Year:</span>
              <div className="flex gap-1">
                {[currentYear, currentYear + 1].map((y) => (
                  <button
                    key={y}
                    onClick={() => setYear(y)}
                    className={`px-2 py-0.5 rounded font-bold ${
                      year === y ? "bg-[#5c3a1e] text-white" : "bg-white text-[#5c3a1e] border border-[#d6c5b2]"
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#8c6b54]">Week Starts On:</span>
              <div className="flex gap-1">
                {(["monday", "sunday"] as WeekStart[]).map((ws) => (
                  <button
                    key={ws}
                    onClick={() => setWeekStart(ws)}
                    className={`px-2 py-0.5 rounded font-bold capitalize ${
                      weekStart === ws ? "bg-[#5c3a1e] text-white" : "bg-white text-[#5c3a1e] border border-[#d6c5b2]"
                    }`}
                  >
                    {ws.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Customizer & Stickers Button */}
          <button
            onClick={() => setEditorOpen(true)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-[#ffd166] to-[#f4a261] text-[#3a2210] font-extrabold text-xs shadow-sm border border-[#e76f51]/40 hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            <Sparkles className="w-4 h-4 text-[#e76f51]" />
            <span>Stickers, Text & Frames</span>
          </button>

          {/* Download Buttons Block */}
          <div className="space-y-2 pt-2 border-t border-[#e6d8cb]">
            <button
              onClick={handleExport}
              disabled={exporting}
              className="w-full py-2.5 rounded-xl bg-[#e63946] text-white font-extrabold text-xs shadow-[0_3px_0_#9d0208] hover:bg-[#d90429] active:translate-y-0.5 active:shadow-none transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {exporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating 12-Page PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Download Full Calendar (PDF)</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownloadPng}
              disabled={pngDownloading}
              className="w-full py-2 rounded-xl bg-white border-2 border-[#d6c5b2] text-[#5c3a1e] font-bold text-xs hover:bg-[#faf4ec] transition-all flex items-center justify-center gap-1.5"
            >
              {pngDownloading ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <ImageIcon className="w-3.5 h-3.5" />
              )}
              <span>Download {MONTH_NAMES[activeMonth]} (PNG)</span>
            </button>
          </div>

          {/* Sleeping Cat Cozy Touch */}
          <div
            onClick={() => {
              setCatSpeech(true);
              setTimeout(() => setCatSpeech(false), 2000);
            }}
            className="p-2 bg-[#fff7ed] rounded-xl border border-[#fed7aa] flex items-center gap-3 cursor-pointer hover:bg-[#ffedd5] transition-all"
            title="Pet the studio cat!"
          >
            <span className="text-2xl">🐱</span>
            <div>
              <div className="text-[11px] font-bold text-[#7c2d12]">Studio Kitty</div>
              <div className="text-[9px] text-[#9a3412]">
                {catSpeech ? "Purr~ zZz ♥" : "Sleeping quietly..."}
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* ========================================================================= */}
      {/* 3. DEDICATED BULK UPLOAD MODAL DIALOG                                     */}
      {/* ========================================================================= */}
      <Dialog open={bulkModalOpen} onOpenChange={setBulkModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto cute-scrollbar">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-lg">
              <span className="text-xl">📸</span>
              <span>Bulk Upload Calendar Photos</span>
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 pt-2">
            {/* Drag and drop zone */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (e.dataTransfer.files) {
                  handleBulkUpload(e.dataTransfer.files);
                }
              }}
              onClick={() => bulkFileInputRef.current?.click()}
              className={`p-6 border-3 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 text-center cursor-pointer transition-all ${
                isDragging
                  ? "border-[#ff758f] bg-[#fff0f3]"
                  : "border-[#d4ab71] bg-[#fcfaf7] hover:bg-[#fff9f0]"
              }`}
            >
              <div className="w-12 h-12 rounded-full bg-[#f5eedc] flex items-center justify-center text-[#5c3a1e] mb-1">
                <FolderOpen className="w-6 h-6" />
              </div>
              <div className="text-sm font-bold text-[#3a2210]">
                Choose up to 12 photos or drag & drop them here
              </div>
              <div className="text-xs text-[#8c6b54]">
                PNG, JPG, WEBP, or HEIC supported • Automatically distributes to January through December
              </div>
              <button
                type="button"
                className="mt-2 px-4 py-2 rounded-lg bg-[#52b788] text-white text-xs font-bold shadow-sm hover:bg-[#40916c]"
              >
                Browse Files
              </button>
            </div>

            {/* Quick 1-Click Auto Fill Action */}
            <div className="p-3 bg-[#faf3ea] rounded-xl border border-[#e6d8cb] flex items-center justify-between">
              <div>
                <div className="text-xs font-bold text-[#5c3a1e]">Need instant sample photos?</div>
                <div className="text-[11px] text-[#8c6b54]">
                  Auto-fill all 12 months with curated seasonal pixel illustrations
                </div>
              </div>
              <button
                type="button"
                onClick={handleAutoFillSamplePhotos}
                className="px-3 py-1.5 rounded-lg bg-[#ffd166] text-[#3a2210] font-bold text-xs hover:bg-[#f6bd60] border border-[#d4a373] shadow-xs shrink-0"
              >
                🌸 Auto-Fill 12 Photos
              </button>
            </div>

            {/* Current 12-Month Status Grid */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#5c3a1e]">
                <span>Status: {uploadedCount} of 12 Months Filled</span>
                {uploadedCount > 0 && (
                  <button
                    type="button"
                    onClick={clearAllImages}
                    className="text-red-600 hover:underline text-[11px]"
                  >
                    Clear All
                  </button>
                )}
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {MONTH_NAMES.map((name, i) => (
                  <div
                    key={name}
                    className={`p-2 rounded-lg border flex items-center gap-2 relative ${
                      images[i] ? "bg-[#f0fdf4] border-[#86efac]" : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="w-10 h-10 rounded bg-[#ebdcc8] overflow-hidden shrink-0 flex items-center justify-center">
                      {images[i] ? (
                        <img src={images[i]!} alt={name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-[9px] text-[#8c6b54]">{i + 1}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold truncate text-[#3a2210]">{name}</div>
                      <div className="text-[10px] text-[#8c6b54]">
                        {images[i] ? "✓ Ready" : "Empty"}
                      </div>
                    </div>
                    {images[i] && (
                      <button
                        type="button"
                        onClick={() => removeImage(i)}
                        className="text-gray-400 hover:text-red-500 text-xs p-1"
                        title="Remove"
                      >
                        ✕
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Stickers & Custom Editor Dialog */}
      <Dialog open={editorOpen} onOpenChange={setEditorOpen}>
        <DialogContent className="max-w-5xl max-h-[92vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#ff758f]" />
              <span>Customize {MONTH_NAMES[activeMonth]} — stickers, drawing, text & frames</span>
            </DialogTitle>
          </DialogHeader>
          <CustomEditor
            pageProps={previewProps(activeMonth)}
            customization={customizations[activeMonth]}
            onChange={(m) => updateCurrentCust(m)}
            onClear={resetCurrentMonthLayout}
            onApplyToAll={applyLayoutToAllMonths}
          />
        </DialogContent>
      </Dialog>

      {/* Hidden off-screen render target for high-res PDF generation without stretching document body */}
      <div
        className="pointer-events-none fixed -top-[99999px] -left-[99999px] w-0 h-0 overflow-hidden opacity-0"
        style={{
          position: "fixed",
          left: "-99999px",
          top: "-99999px",
          width: 0,
          height: 0,
          overflow: "hidden",
          pointerEvents: "none",
          opacity: 0,
        }}
        aria-hidden="true"
      >
        {MONTH_NAMES.map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              pageRefs.current[i] = el;
            }}
            style={{
              width: orientation === "landscape" ? "1123px" : "794px",
              height: orientation === "landscape" ? "794px" : "1123px",
            }}
          >
            <div className="relative w-full h-full">
              <CalendarPage {...previewProps(i)} />
              <CustomOverlay
                customization={customizations[i]}
                onChange={() => {}}
                tool="select"
                readOnly
                refWidth={orientation === "landscape" ? 1123 : 794}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
