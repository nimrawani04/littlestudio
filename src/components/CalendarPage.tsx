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
  titleFont?: string;
  titleSize?: number;
  titleColor?: string;
  titleX?: number;
  titleY?: number;
  weekdaysFont?: string;
  weekdaysSize?: number;
  weekdaysColor?: string;
  weekdaysX?: number;
  weekdaysY?: number;
  datesFont?: string;
  datesSize?: number;
  datesColor?: string;
  datesX?: number;
  datesY?: number;
  onElementClick?: (elementId: "title" | "weekdays" | "dates") => void;
}

export function CalendarPage({
  year,
  monthIndex,
  template,
  weekStart,
  image,
  fontFamily,
  bg,
  text,
  accent,
  imagePosition,
  textAlign,
  orientation = "portrait",
  showWeekdays = true,
  className,
  onImageClick,
  titleFont,
  titleSize,
  titleColor,
  titleX,
  titleY,
  weekdaysFont,
  weekdaysSize,
  weekdaysColor,
  weekdaysX,
  weekdaysY,
  datesFont,
  datesSize,
  datesColor,
  datesX,
  datesY,
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
  // In landscape, "top"/"bottom" become "left"/"right" side panels
  const sideImage = isLandscape && (imagePosition === "top" || imagePosition === "bottom");
  const sideOnRight = isLandscape && imagePosition === "bottom";

  const isCustomTemplate = [
    "poster-arched",
    "vintage-poster",
    "quote-landscape",
    "artistic-ox",
    "artistic-tiger",
    "retro-bold",
    "minimal-split",
    "scrapbook"
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
    "The only limit to our realization of tomorrow will be our doubts."
  ];

  const flexDir = isLandscape ? "flex-row" : "flex-col";
  const leftWidth = isLandscape ? "w-1/2 h-full" : "w-full h-[45%]";
  const rightWidth = isLandscape ? "w-1/2 h-full" : "w-full flex-1";

  const titleBlock = (
    <div
      onClick={() => onElementClick?.("title")}
      className={cn(
        "px-[6%] py-[3%]",
        textAlign === "center" && "text-center",
        textAlign === "right" && "text-right",
        onElementClick && "cursor-pointer hover:bg-black/5 rounded",
        (titleX !== undefined || titleY !== undefined) && "absolute z-30"
      )}
      style={{ 
        fontFamily: titleFont || "var(--cal-font-title)",
        color: titleColor || (isBg ? "white" : "var(--cal-text)"),
        left: titleX !== undefined ? `${titleX * 100}%` : undefined,
        top: titleY !== undefined ? `${titleY * 100}%` : undefined,
        transform: (titleX !== undefined || titleY !== undefined) ? "translate(-50%, -50%)" : undefined,
      }}
    >
      <h2
        style={{
          fontSize: titleSize ? `${titleSize}px` : "var(--cal-title-size)",
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
        className="mt-1 text-sm tracking-widest opacity-70"
        style={{ color: titleColor || (isBg ? "white" : "var(--cal-muted)") }}
      >
        {year}
      </div>
    </div>
  );

  const dateGrid = (
    <div className="relative flex-1 px-[6%] py-[3%] flex flex-col">
      {showWeekdays && (
        <div 
          onClick={() => onElementClick?.("weekdays")}
          className={cn(
            "mb-2 grid grid-cols-7 gap-1 text-center text-[0.65rem] font-semibold uppercase tracking-wider opacity-70",
            onElementClick && "cursor-pointer hover:bg-black/5 rounded p-0.5",
            (weekdaysX !== undefined || weekdaysY !== undefined) && "absolute z-30 w-[88%]"
          )}
          style={{
            fontFamily: weekdaysFont,
            fontSize: weekdaysSize ? `${weekdaysSize}px` : undefined,
            color: weekdaysColor,
            left: weekdaysX !== undefined ? `${weekdaysX * 100}%` : undefined,
            top: weekdaysY !== undefined ? `${weekdaysY * 100}%` : undefined,
            transform: (weekdaysX !== undefined || weekdaysY !== undefined) ? "translate(-50%, -50%)" : undefined,
          }}
        >
          {weekdayLabels.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
      )}
      <div 
        onClick={() => onElementClick?.("dates")}
        className={cn(
          "grid grid-cols-7 gap-1 text-center flex-1",
          onElementClick && "cursor-pointer hover:bg-black/5 rounded p-1",
          (datesX !== undefined || datesY !== undefined) && "absolute z-30 w-[88%]"
        )}
        style={{
          fontFamily: datesFont,
          fontSize: datesSize ? `${datesSize}px` : undefined,
          color: datesColor,
          left: datesX !== undefined ? `${datesX * 100}%` : undefined,
          top: datesY !== undefined ? `${datesY * 100}%` : undefined,
          transform: (datesX !== undefined || datesY !== undefined) ? "translate(-50%, -50%)" : undefined,
        }}
      >
        {grid.map((d, i) => (
          <div
            key={i}
            className="flex aspect-square items-center justify-center text-sm tabular-nums"
            style={{ color: d ? undefined : "transparent" }}
          >
            {d ?? "·"}
          </div>
        ))}
      </div>
    </div>
  );

  const divider = (
    <div className="px-[6%]">
      <div
        className="h-px w-full"
        style={{ background: isBg ? "rgba(255,255,255,0.4)" : "var(--cal-border)" }}
      />
    </div>
  );

  let customContent = null;
  if (isCustomTemplate) {
    switch (template) {
      case "poster-arched":
        customContent = (
          <div className={`flex h-full ${flexDir}`}>
            <div className={`${leftWidth} p-[4%] flex items-center justify-center`}>
              <div onClick={onImageClick} className={`relative w-full h-full ${isLandscape ? 'rounded-t-[140px]' : 'rounded-t-[100px]'} overflow-hidden border-4 border-[var(--cal-text)] bg-[var(--cal-border)] ${onImageClick ? 'cursor-pointer' : ''}`}>
                {image ? (
                  <img src={image} alt="" className="h-full w-full object-cover" />
                ) : (
                  <EmptyImage />
                )}
                <div className="absolute top-[10%] left-0 right-0 text-center">
                  <span className="text-white drop-shadow-md text-xl font-bold tracking-widest uppercase" style={{ fontFamily: "var(--cal-font-title)" }}>
                    {MONTH_NAMES[monthIndex]}
                  </span>
                </div>
              </div>
            </div>
            <div className={`${rightWidth} flex flex-col justify-center px-[6%]`}>
              <div className="mb-4">
                <div className="text-6xl font-serif font-bold text-[var(--cal-text)]">
                  {String(monthIndex + 1).padStart(2, '0')}
                </div>
                <div 
                  onClick={() => onElementClick?.("title")}
                  className={cn("text-2xl mt-1", onElementClick && "cursor-pointer hover:bg-black/5 rounded")}
                  style={{
                    fontFamily: titleFont || "var(--cal-font-title)",
                    color: titleColor || "var(--cal-text)",
                    fontSize: titleSize ? `${titleSize * 0.75}px` : undefined,
                  }}
                >
                  {MONTH_NAMES[monthIndex]}
                </div>
                <div className="text-sm opacity-70 text-[var(--cal-text)]">
                  {year}
                </div>
              </div>
              {dateGrid}
            </div>
          </div>
        );
        break;
      case "vintage-poster":
        customContent = (
          <div className={`flex h-full ${flexDir}`}>
            <div className={`${leftWidth} p-[4%]`}>
            <div onClick={onImageClick} className={`relative w-full h-full border-[12px] border-[var(--cal-text)] bg-[var(--cal-border)] overflow-hidden ${onImageClick ? 'cursor-pointer' : ''}`}>
                {image ? (
                  <img src={image} alt="" className="h-full w-full object-cover" />
                ) : (
                  <EmptyImage />
                )}
                <div className="absolute top-[8%] left-0 right-0 text-center">
                  <span className="text-white drop-shadow-md text-2xl font-bold tracking-widest uppercase" style={{ fontFamily: "var(--cal-font-title)" }}>
                    {MONTH_NAMES[monthIndex]}
                  </span>
                </div>
              </div>
            </div>
            <div className={`${rightWidth} flex flex-col justify-center px-[6%]`}>
              <div className="mb-4">
                <div className="text-5xl font-serif font-bold text-[var(--cal-text)]">
                  {String(monthIndex + 1).padStart(2, '0')}
                </div>
                <div 
                  onClick={() => onElementClick?.("title")}
                  className={cn("text-xl mt-1", onElementClick && "cursor-pointer hover:bg-black/5 rounded")}
                  style={{
                    fontFamily: titleFont || "var(--cal-font-title)",
                    color: titleColor || "var(--cal-text)",
                    fontSize: titleSize ? `${titleSize * 0.65}px` : undefined,
                  }}
                >
                  {MONTH_NAMES[monthIndex]} {year}
                </div>
              </div>
              {dateGrid}
            </div>
          </div>
        );
        break;
      case "quote-landscape":
        customContent = (
          <div className={`flex h-full ${flexDir}`}>
            <div onClick={onImageClick} className={`${leftWidth} relative bg-[var(--cal-border)] overflow-hidden ${onImageClick ? 'cursor-pointer' : ''}`}>
              {image ? (
                <img src={image} alt="" className="h-full w-full object-cover" />
              ) : (
                <EmptyImage />
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black/40 p-4 text-white">
                <div className="text-4xl font-bold">
                  {String(monthIndex + 1).padStart(2, '0')}
                </div>
                <div 
                  onClick={() => onElementClick?.("title")}
                  className={cn("text-xl uppercase tracking-widest", onElementClick && "cursor-pointer hover:bg-black/5 rounded")}
                  style={{
                    fontFamily: titleFont || "var(--cal-font-title)",
                    color: titleColor || "white",
                    fontSize: titleSize ? `${titleSize * 0.65}px` : undefined,
                  }}
                >
                  {MONTH_NAMES[monthIndex]}
                </div>
              </div>
            </div>
            <div className={`${rightWidth} flex flex-col justify-between p-[6%]`}>
              <div className="text-sm font-medium italic text-[var(--cal-text)] leading-relaxed mt-4">
                "{quotes[monthIndex]}"
              </div>
              <div className="flex-1 flex items-center">
                {dateGrid}
              </div>
            </div>
          </div>
        );
        break;
      case "artistic-ox":
        customContent = (
          <div className={`flex h-full ${flexDir}`}>
            <div onClick={onImageClick} className={`${leftWidth} p-[4%] ${onImageClick ? 'cursor-pointer' : ''}`}>
              {image ? (
                <img src={image} alt="" className="h-full w-full object-cover rounded-2xl shadow-md" />
              ) : (
                <EmptyImage />
              )}
            </div>
            <div className={`${rightWidth} flex flex-col justify-center px-[4%]`}>
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-yellow-400 text-black px-4 py-2 rounded-xl font-bold text-2xl shadow-sm">
                  {String(monthIndex + 1).padStart(2, '0')}
                </div>
                <div>
                  <div 
                    onClick={() => onElementClick?.("title")}
                    className={cn("text-xl font-bold", onElementClick && "cursor-pointer hover:bg-black/5 rounded")}
                    style={{
                      fontFamily: titleFont || "var(--cal-font-title)",
                      color: titleColor || "var(--cal-text)",
                      fontSize: titleSize ? `${titleSize * 0.65}px` : undefined,
                    }}
                  >
                    {MONTH_NAMES[monthIndex]}
                  </div>
                  <div className="text-sm text-[var(--cal-muted)]">
                    {year}
                  </div>
                </div>
              </div>
              {dateGrid}
            </div>
          </div>
        );
        break;
      case "artistic-tiger":
        customContent = (
          <div className={`flex h-full ${flexDir}`}>
            <div onClick={onImageClick} className={`${leftWidth} relative bg-[var(--cal-bg)] flex items-center justify-center p-[4%] ${onImageClick ? 'cursor-pointer' : ''}`}>
              {image ? (
                <img src={image} alt="" className="max-h-full max-w-full object-contain rounded-lg" />
              ) : (
                <EmptyImage />
              )}
            </div>
            <div className={`${rightWidth} flex flex-col justify-center bg-white px-[4%]`}>
              <div className="text-center mb-4">
                <div 
                  onClick={() => onElementClick?.("title")}
                  className={cn("text-3xl font-bold uppercase tracking-widest", onElementClick && "cursor-pointer hover:bg-black/5 rounded")}
                  style={{
                    fontFamily: titleFont || "var(--cal-font-title)",
                    color: titleColor || "var(--cal-text)",
                    fontSize: titleSize ? `${titleSize * 0.75}px` : undefined,
                  }}
                >
                  {MONTH_NAMES[monthIndex]}
                </div>
              </div>
              {dateGrid}
            </div>
          </div>
        );
        break;
      case "retro-bold":
        customContent = (
          <div className={`flex h-full ${flexDir}`}>
            <div className={`${leftWidth} flex items-center justify-center p-[6%]`}>
              <div onClick={onImageClick} className={`w-40 h-40 rounded-full overflow-hidden border-8 border-[var(--cal-text)] bg-[var(--cal-border)] shadow-lg ${onImageClick ? 'cursor-pointer' : ''}`}>
                {image ? (
                  <img src={image} alt="" className="h-full w-full object-cover" />
                ) : (
                  <EmptyImage />
                )}
              </div>
            </div>
            <div className={`${rightWidth} flex flex-col justify-center px-[6%]`}>
              <div className="mb-4 text-center">
                <div 
                  onClick={() => onElementClick?.("title")}
                  className={cn("text-4xl font-black tracking-tighter uppercase transform -rotate-3", onElementClick && "cursor-pointer hover:bg-black/5 rounded")}
                  style={{
                    fontFamily: titleFont || "var(--cal-font-title)",
                    color: titleColor || "var(--cal-text)",
                    fontSize: titleSize ? `${titleSize}px` : undefined,
                  }}
                >
                  {MONTH_NAMES[monthIndex]}
                </div>
                <div className="text-lg font-bold text-[var(--cal-text)] mt-1">
                  {year}
                </div>
              </div>
              {dateGrid}
            </div>
          </div>
        );
        break;
      case "minimal-split":
        customContent = (
          <div className={`flex h-full ${flexDir}`}>
            <div onClick={onImageClick} className={`${leftWidth} overflow-hidden ${onImageClick ? 'cursor-pointer' : ''}`}>
              {image ? (
                <img src={image} alt="" className="h-full w-full object-cover" />
              ) : (
                <EmptyImage />
              )}
            </div>
            <div className={`${rightWidth} flex flex-col justify-center px-[6%] border-l border-[var(--cal-border)]`}>
              <div className="mb-4">
                <div 
                  onClick={() => onElementClick?.("title")}
                  className={cn("text-2xl font-light tracking-widest uppercase", onElementClick && "cursor-pointer hover:bg-black/5 rounded")}
                  style={{
                    fontFamily: titleFont || "var(--cal-font-title)",
                    color: titleColor || "var(--cal-text)",
                    fontSize: titleSize ? `${titleSize * 0.75}px` : undefined,
                  }}
                >
                  {MONTH_NAMES[monthIndex]}
                </div>
                <div className="text-xs text-[var(--cal-muted)] mt-1 tracking-wider">
                  {year}
                </div>
              </div>
              {dateGrid}
            </div>
          </div>
        );
        break;
      case "scrapbook":
        customContent = (
          <div className={`flex h-full ${flexDir} bg-[#faf7f2]`}>
            <div className={`${leftWidth} p-[6%] flex items-center justify-center`}>
              <div className="relative bg-white p-4 pb-12 shadow-lg transform -rotate-3 border border-gray-200 w-full max-w-[200px]">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-100/60 backdrop-blur-sm border border-yellow-200/50 shadow-sm transform -rotate-12" />
                <div onClick={onImageClick} className={`aspect-square bg-[var(--cal-border)] overflow-hidden ${onImageClick ? 'cursor-pointer' : ''}`}>
                  {image ? (
                    <img src={image} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <EmptyImage />
                  )}
                </div>
                <div className="absolute bottom-2 left-0 right-0 text-center font-hand text-xl text-gray-700">
                  {MONTH_NAMES[monthIndex]}
                </div>
              </div>
            </div>
            <div className={`${rightWidth} flex flex-col justify-center px-[6%] font-hand text-2xl`}>
              <div 
                onClick={() => onElementClick?.("title")}
                className={cn("mb-2 text-center text-3xl font-bold", onElementClick && "cursor-pointer hover:bg-black/5 rounded")}
                style={{
                  fontFamily: titleFont || "var(--cal-font-title)",
                  color: titleColor || "var(--cal-text)",
                  fontSize: titleSize ? `${titleSize * 0.85}px` : undefined,
                }}
              >
                {MONTH_NAMES[monthIndex]} {year}
              </div>
              {dateGrid}
            </div>
          </div>
        );
        break;
    }
  }

  return (
    <div
      className={cn(
        `tpl-${template}`,
        "relative w-full overflow-hidden shadow-elegant",
        isLandscape ? "aspect-[297/210]" : "aspect-[210/297]",
        className,
      )}
      style={{
        backgroundColor: "var(--cal-bg)",
        color: "var(--cal-text)",
        fontFamily: "var(--cal-font-body)",
        ...styleOverrides,
      }}
    >
      {isCustomTemplate ? (
        customContent
      ) : (
        <>
          {isBg && image && (
            <>
              <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-black/40" />
            </>
          )}

          {/* LANDSCAPE side-by-side layout */}
          {sideImage ? (
            <div className={cn("relative z-10 flex h-full", isBg && "text-white")}>
              {!sideOnRight && (
                <div onClick={onImageClick} className={`h-full w-1/2 overflow-hidden bg-[var(--cal-border)] ${onImageClick ? 'cursor-pointer' : ''}`}>
                  {image ? (
                    <img src={image} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <EmptyImage />
                  )}
                </div>
              )}
              <div className="flex h-full w-1/2 flex-col">
                {titleBlock}
                {divider}
                {dateGrid}
              </div>
              {sideOnRight && (
                <div onClick={onImageClick} className={`h-full w-1/2 overflow-hidden bg-[var(--cal-border)] ${onImageClick ? 'cursor-pointer' : ''}`}>
                  {image ? (
                    <img src={image} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <EmptyImage />
                  )}
                </div>
              )}
            </div>
          ) : (
            /* PORTRAIT or background/framed in any orientation: stacked layout */
            <div className={cn("relative z-10 flex h-full flex-col", isBg && "text-white")}>
              {imagePosition === "top" && (
                <div onClick={onImageClick} className={cn("w-full overflow-hidden bg-[var(--cal-border)]", isLandscape ? "h-[35%]" : "h-[45%]", onImageClick && "cursor-pointer")}>
                  {image ? (
                    <img src={image} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <EmptyImage />
                  )}
                </div>
              )}

              {isFramed && (
                <div className="px-[8%] pt-[4%]">
                  <div
                    onClick={onImageClick}
                    className={cn(
                      "overflow-hidden border-4 border-[var(--cal-border)] bg-[var(--cal-border)] shadow-md",
                      !image && "border-dashed",
                      onImageClick && "cursor-pointer"
                    )}
                    style={{ aspectRatio: isLandscape ? "21/9" : "16/10" }}
                  >
                    {image ? (
                      <img src={image} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <EmptyImage />
                    )}
                  </div>
                </div>
              )}

              {titleBlock}
              {divider}
              {dateGrid}

              {imagePosition === "bottom" && (
                <div onClick={onImageClick} className={cn("w-full overflow-hidden bg-[var(--cal-border)]", isLandscape ? "h-[30%]" : "h-[35%]", onImageClick && "cursor-pointer")}>
                  {image ? (
                    <img src={image} alt="" className="h-full w-full object-cover" />
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
    <div className="flex h-full w-full items-center justify-center text-xs uppercase tracking-widest opacity-40">
      Add a photo
    </div>
  );
}
