import { useMemo } from "react";
import {
  MONTH_NAMES,
  WEEKDAYS_MON,
  WEEKDAYS_SUN,
  getMonthGrid,
  type WeekStart,
  type TemplateId,
  type ImagePosition,
  type TextAlign,
  type Orientation,
} from "@/lib/calendar-utils";
import { cn } from "@/lib/utils";

export interface CalendarPageProps {
  year: number;
  monthIndex: number;
  template: TemplateId;
  weekStart: WeekStart;
  image?: string | null;
  bgImage?: string | null;
  bgPattern?: string;
  cardOpacity?: number;
  photoOpacity?: number;
  bgImageOpacity?: number;
  cardBlur?: boolean;
  photoFrameStyle?: string;
  fontFamily?: string;
  bg?: string;
  text?: string;
  accent?: string;
  imagePosition: ImagePosition;
  textAlign: TextAlign;
  orientation?: Orientation;
  showWeekdays?: boolean;
  className?: string;
  onImageClick?: () => void;
  // Month Name (Title)
  titleShow?: boolean;
  titleFont?: string;
  titleSize?: number;
  titleColor?: string;
  titleX?: number;
  titleY?: number;
  // Month Number (01, 1, I, etc.)
  monthNumberShow?: boolean;
  monthNumberFormat?: "padded" | "simple" | "roman" | "hidden";
  monthNumberFont?: string;
  monthNumberSize?: number;
  monthNumberColor?: string;
  monthNumberX?: number;
  monthNumberY?: number;
  // Weekday Headers
  weekdaysShow?: boolean;
  weekdaysFont?: string;
  weekdaysSize?: number;
  weekdaysColor?: string;
  weekdaysX?: number;
  weekdaysY?: number;
  // Dates Grid
  datesShow?: boolean;
  datesFont?: string;
  datesSize?: number;
  datesColor?: string;
  datesX?: number;
  datesY?: number;
  datesGridStyle?: "clean" | "boxed" | "circle" | "lines";
  // Photo placement
  photoX?: number;
  photoY?: number;
  photoScale?: number;
  onElementClick?: (elementId: "title" | "number" | "weekdays" | "dates" | "photo") => void;
}

export function CalendarPage({
  year,
  monthIndex,
  template,
  weekStart,
  image,
  bgImage,
  bgPattern = "none",
  cardOpacity = 1,
  photoOpacity = 1,
  bgImageOpacity = 0.8,
  cardBlur = false,
  photoFrameStyle,
  fontFamily,
  bg,
  text,
  accent,
  imagePosition,
  textAlign,
  orientation = "landscape",
  showWeekdays = true,
  className,
  onImageClick,
  titleShow = true,
  titleFont,
  titleSize,
  titleColor,
  titleX,
  titleY,
  monthNumberShow = true,
  monthNumberFormat = "padded",
  monthNumberFont,
  monthNumberSize,
  monthNumberColor,
  monthNumberX,
  monthNumberY,
  weekdaysShow = true,
  weekdaysFont,
  weekdaysSize,
  weekdaysColor,
  weekdaysX,
  weekdaysY,
  datesShow = true,
  datesFont,
  datesSize,
  datesColor,
  datesX,
  datesY,
  datesGridStyle = "clean",
  photoX,
  photoY,
  photoScale = 1,
  onElementClick,
}: CalendarPageProps) {
  const grid = useMemo(
    () => getMonthGrid(year, monthIndex, weekStart),
    [year, monthIndex, weekStart],
  );
  const weekdayLabels = weekStart === "monday" ? WEEKDAYS_MON : WEEKDAYS_SUN;

  const styleOverrides: React.CSSProperties = {};
  if (bg) (styleOverrides as Record<string, string>)["--cal-bg"] = bg;
  if (text) (styleOverrides as Record<string, string>)["--cal-text"] = text;
  if (accent) (styleOverrides as Record<string, string>)["--cal-accent"] = accent;
  if (fontFamily) {
    (styleOverrides as Record<string, string>)["--cal-font-title"] = fontFamily;
    (styleOverrides as Record<string, string>)["--cal-font-body"] = fontFamily;
  }

  const isBg = imagePosition === "background";
  const isFramed = imagePosition === "framed";
  const isLandscape = orientation === "landscape";
  const sideImage = isLandscape && (imagePosition === "top" || imagePosition === "bottom");
  const sideOnRight = isLandscape && imagePosition === "bottom";

  // Determine active frame design
  const effectiveFrame =
    photoFrameStyle ||
    (template === "poster-arched"
      ? "poster-arched"
      : template === "vintage-poster"
      ? "vintage-poster"
      : template === "quote-landscape"
      ? "quote"
      : template === "scrapbook"
      ? "scrapbook"
      : template === "polaroid-card"
      ? "polaroid"
      : template === "circle-portal"
      ? "circle"
      : template === "film-strip"
      ? "filmstrip"
      : template === "custom-studio"
      ? "poster-arched"
      : null);

  const isCustomTemplate =
    effectiveFrame !== null ||
    [
      "custom-studio",
      "poster-arched",
      "vintage-poster",
      "quote-landscape",
      "scrapbook",
      "polaroid-card",
      "circle-portal",
      "film-strip",
      "artistic-ox",
      "artistic-tiger",
      "retro-bold",
      "minimal-split",
    ].includes(template);

  const quotes = [
    "The bad news is time flies. The good news is you're the pilot.",
    "Believe you can and you're halfway there.",
    "The only way to do great work is to love what you do.",
    "Be yourself; everyone else is already taken.",
    "In the middle of every difficulty lies opportunity.",
    "What you get by achieving your goals is not what you become.",
    "The best way to predict the future is to create it.",
    "You miss 100% of the shots you don't take.",
    "Whether you think you can or you think you can't, you're right.",
    "Act as if what you do makes a difference. It does.",
    "Success is not final, failure is not fatal: it is courage to continue.",
    "The only limit to our realization of tomorrow will be our doubts.",
  ];

  const flexDir = isLandscape ? "flex-row" : "flex-col";
  const leftWidth = isLandscape ? "w-1/2 h-full" : "w-full h-[46%]";
  const rightWidth = isLandscape ? "w-1/2 h-full" : "w-full flex-1";

  // Roman numerals conversion
  const ROMAN_NUMERALS = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
  const formattedNumber =
    monthNumberFormat === "simple"
      ? String(monthIndex + 1)
      : monthNumberFormat === "roman"
      ? ROMAN_NUMERALS[monthIndex]
      : monthNumberFormat === "hidden"
      ? ""
      : String(monthIndex + 1).padStart(2, "0");

  const showNum = monthNumberShow && monthNumberFormat !== "hidden" && Boolean(formattedNumber);
  const showTitle = titleShow;
  const showDateElements = datesShow;
  const showWeekdayElements = weekdaysShow && showWeekdays;

  // Month Number Element
  const monthNumberBlock = showNum ? (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onElementClick?.("number");
      }}
      className={cn(
        "cursor-pointer hover:ring-2 hover:ring-[#ff758f] rounded p-0.5 transition-all select-none",
        (monthNumberX !== undefined || monthNumberY !== undefined) && "absolute z-30"
      )}
      style={{
        fontFamily: monthNumberFont || "var(--cal-font-title)",
        fontSize: monthNumberSize ? `${monthNumberSize}px` : "clamp(1.25rem, 3.2vw, 2.4rem)",
        fontWeight: "bold",
        lineHeight: 1,
        color: monthNumberColor || (isBg ? "white" : "var(--cal-text)"),
        left: monthNumberX !== undefined ? `${monthNumberX * 100}%` : undefined,
        top: monthNumberY !== undefined ? `${monthNumberY * 100}%` : undefined,
        transform:
          monthNumberX !== undefined || monthNumberY !== undefined
            ? "translate(-50%, -50%)"
            : undefined,
      }}
      title="Click to customize month number"
    >
      {formattedNumber}
    </div>
  ) : null;

  // Month Name Element
  const titleBlock = showTitle ? (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onElementClick?.("title");
      }}
      className={cn(
        "px-[2%] sm:px-[4%] py-[1%] sm:py-[2%]",
        textAlign === "center" && "text-center",
        textAlign === "right" && "text-right",
        onElementClick && "cursor-pointer hover:ring-2 hover:ring-[#ff758f] rounded transition-all",
        (titleX !== undefined || titleY !== undefined) && "absolute z-30"
      )}
      style={{
        fontFamily: titleFont || "var(--cal-font-title)",
        color: titleColor || (isBg ? "white" : "var(--cal-text)"),
        left: titleX !== undefined ? `${titleX * 100}%` : undefined,
        top: titleY !== undefined ? `${titleY * 100}%` : undefined,
        transform:
          titleX !== undefined || titleY !== undefined ? "translate(-50%, -50%)" : undefined,
      }}
      title="Click to customize month name"
    >
      <h2
        style={{
          fontSize: titleSize ? `${titleSize}px` : "clamp(0.95rem, 2.5vw, var(--cal-title-size, 1.75rem))",
          fontWeight: "var(--cal-title-weight)" as unknown as number,
          letterSpacing: "var(--cal-title-tracking)",
          textTransform: "var(--cal-title-transform)" as React.CSSProperties["textTransform"],
          lineHeight: 1.05,
          color: titleColor || (isBg ? "white" : "var(--cal-text)"),
        }}
      >
        {MONTH_NAMES[monthIndex]}
      </h2>
      <div
        className="mt-0.5 text-xs sm:text-sm tracking-widest opacity-70"
        style={{ color: titleColor || (isBg ? "white" : "var(--cal-muted)") }}
      >
        {year}
      </div>
    </div>
  ) : null;

  // Date Grid & Weekdays
  const dateGrid = showDateElements ? (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onElementClick?.("dates");
      }}
      className={cn(
        "relative flex-1 px-[4%] py-[2%] flex flex-col rounded-xl transition-all cursor-pointer hover:ring-2 hover:ring-[#ff758f]/50",
        cardBlur && "backdrop-blur-md bg-white/20 shadow-xs border border-white/30",
        (datesX !== undefined || datesY !== undefined) && "absolute z-30 w-[88%]"
      )}
      style={{
        backgroundColor: cardOpacity < 1 && !cardBlur ? `rgba(255, 255, 255, ${cardOpacity})` : undefined,
        left: datesX !== undefined ? `${datesX * 100}%` : undefined,
        top: datesY !== undefined ? `${datesY * 100}%` : undefined,
        transform: datesX !== undefined || datesY !== undefined ? "translate(-50%, -50%)" : undefined,
      }}
      title="Click to customize dates & weekday headers"
    >
      {showWeekdayElements && (
        <div
          onClick={(e) => {
            e.stopPropagation();
            onElementClick?.("weekdays");
          }}
          className={cn(
            "mb-2 grid grid-cols-7 gap-1 text-center text-[0.65rem] font-semibold uppercase tracking-wider opacity-70",
            onElementClick && "cursor-pointer hover:ring-1 hover:ring-[#ff758f] rounded p-0.5",
            (weekdaysX !== undefined || weekdaysY !== undefined) && "absolute z-30 w-[88%]"
          )}
          style={{
            fontFamily: weekdaysFont,
            fontSize: weekdaysSize ? `${weekdaysSize}px` : undefined,
            color: weekdaysColor,
            left: weekdaysX !== undefined ? `${weekdaysX * 100}%` : undefined,
            top: weekdaysY !== undefined ? `${weekdaysY * 100}%` : undefined,
            transform:
              weekdaysX !== undefined || weekdaysY !== undefined ? "translate(-50%, -50%)" : undefined,
          }}
          title="Click to customize weekdays"
        >
          {weekdayLabels.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
      )}
      <div
        className="grid grid-cols-7 gap-1 text-center flex-1"
        style={{
          fontFamily: datesFont,
          fontSize: datesSize ? `${datesSize}px` : undefined,
          color: datesColor,
        }}
      >
        {grid.map((d, i) => {
          let cellStyle = "flex aspect-square items-center justify-center text-[10px] sm:text-xs md:text-sm tabular-nums";
          if (datesGridStyle === "boxed" && d) {
            cellStyle += " border border-current/25 rounded-md bg-white/10";
          } else if (datesGridStyle === "circle" && d) {
            cellStyle += " rounded-full bg-black/5 hover:bg-black/10";
          } else if (datesGridStyle === "lines" && d) {
            cellStyle += " border-b border-current/20";
          }
          return (
            <div
              key={i}
              className={cellStyle}
              style={{ color: d ? undefined : "transparent" }}
            >
              {d ?? "·"}
            </div>
          );
        })}
      </div>
    </div>
  ) : null;

  const divider = (
    <div className="px-[6%]">
      <div
        className="h-px w-full"
        style={{ background: isBg ? "rgba(255,255,255,0.4)" : "var(--cal-border)" }}
      />
    </div>
  );

  // Render specific Photo Frame
  const renderFrameElement = () => {
    const photoTransformStyle = {
      transform: `translate(${photoX ? (photoX - 0.5) * 60 : 0}px, ${photoY ? (photoY - 0.5) * 60 : 0}px) scale(${photoScale || 1})`,
      transition: "transform 0.15s ease",
    };

    switch (effectiveFrame) {
      case "poster-arched":
        return (
          <div className="w-full h-full p-[3%] flex items-center justify-center" style={photoTransformStyle}>
            <div
              onClick={() => {
                onElementClick?.("photo");
                onImageClick?.();
              }}
              className={cn(
                "relative w-full h-full max-h-[96%]",
                isLandscape ? "rounded-t-[130px]" : "rounded-t-[100px]",
                "overflow-hidden border-4 border-[var(--cal-text)] bg-[var(--cal-border)] shadow-xl",
                "cursor-pointer hover:ring-2 hover:ring-[#ff758f]"
              )}
            >
              {image ? (
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover"
                  style={{ opacity: photoOpacity }}
                />
              ) : (
                <EmptyImage />
              )}
            </div>
          </div>
        );

      case "scrapbook":
        return (
          <div className="w-full h-full p-[4%] flex items-center justify-center" style={photoTransformStyle}>
            <div className="relative bg-[#faf7f2] p-3 pb-8 shadow-xl transform -rotate-2 border border-stone-300 w-[88%] max-w-[270px]">
              {/* Washi tape */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-yellow-200/80 backdrop-blur-xs border border-yellow-300/70 shadow-xs transform -rotate-6 z-20 pointer-events-none" />
              {/* Stamp */}
              <div className="absolute -top-1 -right-1 w-8 h-10 bg-red-50 border-2 border-dashed border-red-400 flex flex-col items-center justify-center text-[6px] font-bold text-red-600 transform rotate-12 shadow-xs pointer-events-none z-20">
                <span>STAMP</span>
                <span className="text-[9px]">📮</span>
              </div>
              <div
                onClick={() => {
                  onElementClick?.("photo");
                  onImageClick?.();
                }}
                className="aspect-square w-full bg-[var(--cal-border)] overflow-hidden shadow-inner cursor-pointer hover:ring-2 hover:ring-[#ff758f]"
              >
                {image ? (
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover"
                    style={{ opacity: photoOpacity }}
                  />
                ) : (
                  <EmptyImage />
                )}
              </div>
              <div
                className="mt-2 text-center text-sm font-bold text-stone-700 tracking-wide"
                style={{ fontFamily: titleFont || "Caveat, cursive" }}
              >
                Memories ✨
              </div>
            </div>
          </div>
        );

      case "polaroid":
        return (
          <div className="w-full h-full p-[4%] flex items-center justify-center" style={photoTransformStyle}>
            <div className="relative bg-white p-3.5 pb-10 shadow-2xl rounded-xs border border-stone-200 transform rotate-1 hover:rotate-0 transition-transform w-[88%] max-w-[270px]">
              <div
                onClick={() => {
                  onElementClick?.("photo");
                  onImageClick?.();
                }}
                className="aspect-square w-full bg-[var(--cal-border)] overflow-hidden shadow-inner cursor-pointer hover:ring-2 hover:ring-[#ff758f]"
              >
                {image ? (
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover"
                    style={{ opacity: photoOpacity }}
                  />
                ) : (
                  <EmptyImage />
                )}
              </div>
              <div
                className="absolute bottom-2.5 left-0 right-0 text-center text-base sm:text-lg font-bold text-stone-800"
                style={{ fontFamily: titleFont || "Caveat, cursive" }}
              >
                {year}
              </div>
            </div>
          </div>
        );

      case "circle":
        return (
          <div className="w-full h-full p-[4%] flex items-center justify-center" style={photoTransformStyle}>
            <div
              onClick={() => {
                onElementClick?.("photo");
                onImageClick?.();
              }}
              className={cn(
                "relative",
                isLandscape ? "w-52 h-52" : "w-56 h-56",
                "rounded-full overflow-hidden border-4 border-[var(--cal-text)] bg-[var(--cal-border)] shadow-xl ring-8 ring-[var(--cal-text)]/15",
                "cursor-pointer hover:ring-2 hover:ring-[#ff758f]"
              )}
            >
              {image ? (
                <img
                  src={image}
                  alt=""
                  className="h-full w-full object-cover"
                  style={{ opacity: photoOpacity }}
                />
              ) : (
                <EmptyImage />
              )}
            </div>
          </div>
        );

      case "filmstrip":
        return (
          <div className="w-full h-full p-[4%] flex items-center justify-center" style={photoTransformStyle}>
            <div className="relative bg-[#1c1917] p-2.5 text-white shadow-2xl rounded-xs border-2 border-stone-800 w-[90%] max-w-[310px]">
              {/* Perforations top */}
              <div className="flex justify-between items-center px-1 pb-1.5">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div key={idx} className="w-2.5 h-3 bg-white/80 rounded-xs" />
                ))}
              </div>
              <div
                onClick={() => {
                  onElementClick?.("photo");
                  onImageClick?.();
                }}
                className="relative aspect-[4/3] w-full bg-stone-900 overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#ff758f]"
              >
                {image ? (
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover"
                    style={{ opacity: photoOpacity }}
                  />
                ) : (
                  <EmptyImage />
                )}
                <div className="absolute top-1 left-2 text-[9px] font-mono text-amber-400 opacity-80 pointer-events-none">
                  ISO 400 • 35mm FILM • {String(monthIndex + 1).padStart(2, "0")}A
                </div>
              </div>
              {/* Perforations bottom */}
              <div className="flex justify-between items-center px-1 pt-1.5">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div key={idx} className="w-2.5 h-3 bg-white/80 rounded-xs" />
                ))}
              </div>
            </div>
          </div>
        );

      case "vintage-poster":
        return (
          <div className="w-full h-full p-[3%] flex items-center justify-center" style={photoTransformStyle}>
            <div
              onClick={() => {
                onElementClick?.("photo");
                onImageClick?.();
              }}
              className="relative w-full h-full max-h-[94%] border-[10px] border-[var(--cal-text)] ring-2 ring-[var(--cal-text)]/40 p-1 bg-[var(--cal-bg)] shadow-xl overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#ff758f]"
            >
              <div className="relative w-full h-full overflow-hidden bg-[var(--cal-border)]">
                {image ? (
                  <img
                    src={image}
                    alt=""
                    className="h-full w-full object-cover"
                    style={{ opacity: photoOpacity }}
                  />
                ) : (
                  <EmptyImage />
                )}
              </div>
            </div>
          </div>
        );

      case "quote":
        return (
          <div
            onClick={() => {
              onElementClick?.("photo");
              onImageClick?.();
            }}
            className="relative w-full h-full bg-[var(--cal-border)] overflow-hidden shadow-lg cursor-pointer hover:ring-2 hover:ring-[#ff758f]"
            style={photoTransformStyle}
          >
            {image ? (
              <img
                src={image}
                alt=""
                className="h-full w-full object-cover"
                style={{ opacity: photoOpacity }}
              />
            ) : (
              <EmptyImage />
            )}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white pointer-events-none">
              <div className="text-xs italic font-light opacity-90 leading-snug">
                "{quotes[monthIndex]}"
              </div>
            </div>
          </div>
        );

      case "box":
      default:
        return (
          <div
            onClick={() => {
              onElementClick?.("photo");
              onImageClick?.();
            }}
            className="relative w-full h-full bg-[var(--cal-border)] overflow-hidden cursor-pointer hover:ring-2 hover:ring-[#ff758f]"
            style={photoTransformStyle}
          >
            {image ? (
              <img
                src={image}
                alt=""
                className="h-full w-full object-cover"
                style={{ opacity: photoOpacity }}
              />
            ) : (
              <EmptyImage />
            )}
          </div>
        );
    }
  };

  let customContent = null;
  if (isCustomTemplate) {
    customContent = (
      <div className={`flex h-full ${flexDir}`}>
        <div className={`${leftWidth} flex items-center justify-center overflow-hidden relative min-w-0`}>
          {renderFrameElement()}
        </div>
        <div className={`${rightWidth} flex flex-col justify-center px-[3%] sm:px-[4%] py-[1%] sm:py-[2%] relative min-w-0`}>
          {/* Header block with customizable Month Number & Month Name */}
          <div className="mb-1.5 sm:mb-3 flex items-baseline gap-2 sm:gap-3 flex-wrap">
            {monthNumberX === undefined && monthNumberY === undefined && monthNumberBlock}
            {titleX === undefined && titleY === undefined && titleBlock}
          </div>
          {/* Internal Dates & Weekday headers */}
          {datesX === undefined && datesY === undefined && dateGrid}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        `tpl-${template}`,
        "relative w-full overflow-hidden shadow-elegant",
        isLandscape ? "aspect-[297/210]" : "aspect-[210/297]",
        className
      )}
      style={{
        backgroundColor: "var(--cal-bg)",
        color: "var(--cal-text)",
        fontFamily: "var(--cal-font-body)",
        ...styleOverrides,
      }}
    >
      {/* Background Image / Pattern Layers */}
      {bgImage && (
        <img
          src={bgImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover pointer-events-none z-0"
          style={{ opacity: bgImageOpacity }}
        />
      )}

      {bgPattern === "grid" && (
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            opacity: bgImageOpacity,
          }}
        />
      )}

      {bgPattern === "dots" && (
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(0,0,0,0.1) 1.5px, transparent 1.5px)",
            backgroundSize: "16px 16px",
            opacity: bgImageOpacity,
          }}
        />
      )}

      {bgPattern === "stars" && (
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{
            backgroundImage:
              "radial-gradient(circle, #fff 1.2px, transparent 1.2px), radial-gradient(circle, #ffe699 1.5px, transparent 1.5px)",
            backgroundSize: "32px 32px, 48px 48px",
            backgroundPosition: "0 0, 16px 24px",
            opacity: bgImageOpacity,
          }}
        />
      )}

      {bgPattern === "sunset" && (
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{
            background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 50%, #ee9ca7 100%)",
            opacity: bgImageOpacity,
          }}
        />
      )}

      {bgPattern === "parchment" && (
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{
            background: "#fcf8ee",
            backgroundImage:
              "radial-gradient(#c8b488 0.75px, transparent 0.75px), radial-gradient(#bca068 0.5px, #fcf8ee 0.5px)",
            backgroundSize: "24px 24px",
            backgroundPosition: "0 0, 12px 12px",
            opacity: bgImageOpacity,
          }}
        />
      )}

      {bgPattern === "watercolor" && (
        <div
          className="absolute inset-0 w-full h-full pointer-events-none z-0"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, #fce7f3 0%, #ede9fe 40%, #e0f2fe 80%, #fef3c7 100%)",
            opacity: bgImageOpacity,
          }}
        />
      )}

      {/* Card Transparency Backdrop */}
      {cardOpacity < 1 && (
        <div
          className={cn(
            "absolute inset-0 pointer-events-none z-0",
            cardBlur && "backdrop-blur-md"
          )}
          style={{
            backgroundColor: "var(--cal-bg)",
            opacity: cardOpacity,
          }}
        />
      )}

      {/* Floating Absolutely Positioned Elements (when custom X/Y are set) */}
      {(monthNumberX !== undefined || monthNumberY !== undefined) && monthNumberBlock}
      {(titleX !== undefined || titleY !== undefined) && titleBlock}
      {(datesX !== undefined || datesY !== undefined) && dateGrid}

      {isCustomTemplate ? (
        <div className="relative z-10 w-full h-full">{customContent}</div>
      ) : (
        <>
          {isBg && image && (
            <>
              <img
                src={image}
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
                style={{ opacity: photoOpacity }}
              />
              <div className="absolute inset-0 bg-black/40" />
            </>
          )}

          {/* LANDSCAPE side-by-side layout */}
          {sideImage ? (
            <div className={cn("relative z-10 flex h-full", isBg && "text-white")}>
              {!sideOnRight && (
                <div
                  onClick={() => {
                    onElementClick?.("photo");
                    onImageClick?.();
                  }}
                  className={cn(
                    "h-full w-1/2 overflow-hidden bg-[var(--cal-border)] cursor-pointer hover:ring-2 hover:ring-[#ff758f]"
                  )}
                >
                  {image ? (
                    <img
                      src={image}
                      alt=""
                      className="h-full w-full object-cover"
                      style={{ opacity: photoOpacity }}
                    />
                  ) : (
                    <EmptyImage />
                  )}
                </div>
              )}
              <div className="flex h-full w-1/2 flex-col justify-center">
                {titleX === undefined && titleY === undefined && titleBlock}
                {divider}
                {datesX === undefined && datesY === undefined && dateGrid}
              </div>
              {sideOnRight && (
                <div
                  onClick={() => {
                    onElementClick?.("photo");
                    onImageClick?.();
                  }}
                  className={cn(
                    "h-full w-1/2 overflow-hidden bg-[var(--cal-border)] cursor-pointer hover:ring-2 hover:ring-[#ff758f]"
                  )}
                >
                  {image ? (
                    <img
                      src={image}
                      alt=""
                      className="h-full w-full object-cover"
                      style={{ opacity: photoOpacity }}
                    />
                  ) : (
                    <EmptyImage />
                  )}
                </div>
              )}
            </div>
          ) : (
            /* PORTRAIT or background/framed in any orientation */
            <div className={cn("relative z-10 flex h-full flex-col", isBg && "text-white")}>
              {imagePosition === "top" && (
                <div
                  onClick={() => {
                    onElementClick?.("photo");
                    onImageClick?.();
                  }}
                  className={cn(
                    "w-full overflow-hidden bg-[var(--cal-border)] cursor-pointer hover:ring-2 hover:ring-[#ff758f]",
                    isLandscape ? "h-[35%]" : "h-[45%]"
                  )}
                >
                  {image ? (
                    <img
                      src={image}
                      alt=""
                      className="h-full w-full object-cover"
                      style={{ opacity: photoOpacity }}
                    />
                  ) : (
                    <EmptyImage />
                  )}
                </div>
              )}

              {isFramed && (
                <div className="px-[8%] pt-[4%]">
                  <div
                    onClick={() => {
                      onElementClick?.("photo");
                      onImageClick?.();
                    }}
                    className={cn(
                      "overflow-hidden border-4 border-[var(--cal-border)] bg-[var(--cal-border)] shadow-md cursor-pointer hover:ring-2 hover:ring-[#ff758f]",
                      !image && "border-dashed"
                    )}
                    style={{ aspectRatio: isLandscape ? "21/9" : "16/10" }}
                  >
                    {image ? (
                      <img
                        src={image}
                        alt=""
                        className="h-full w-full object-cover"
                        style={{ opacity: photoOpacity }}
                      />
                    ) : (
                      <EmptyImage />
                    )}
                  </div>
                </div>
              )}

              {titleX === undefined && titleY === undefined && titleBlock}
              {divider}
              {datesX === undefined && datesY === undefined && dateGrid}

              {imagePosition === "bottom" && (
                <div
                  onClick={() => {
                    onElementClick?.("photo");
                    onImageClick?.();
                  }}
                  className={cn(
                    "w-full overflow-hidden bg-[var(--cal-border)] cursor-pointer hover:ring-2 hover:ring-[#ff758f]",
                    isLandscape ? "h-[30%]" : "h-[35%]"
                  )}
                >
                  {image ? (
                    <img
                      src={image}
                      alt=""
                      className="h-full w-full object-cover"
                      style={{ opacity: photoOpacity }}
                    />
                  ) : (
                    <EmptyImage />
                  )}
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function EmptyImage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-1.5 p-4 text-[#8c6b54] bg-[#faf4ec]/70 hover:bg-[#fff0f3]/80 transition-all select-none">
      <svg
        className="w-7 h-7 text-[#8c6b54]/60 mb-0.5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.7}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
      <span className="text-[11px] font-bold uppercase tracking-widest text-[#8c6b54]/80">
        Add a photo
      </span>
      <span className="text-[9px] text-[#8c6b54]/60 font-medium">
        Click to upload
      </span>
    </div>
  );
}
