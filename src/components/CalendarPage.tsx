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

  const titleBlock = (
    <div
      className={cn(
        "px-[6%] py-[3%]",
        textAlign === "center" && "text-center",
        textAlign === "right" && "text-right",
      )}
      style={{ fontFamily: "var(--cal-font-title)" }}
    >
      <h2
        style={{
          fontSize: "var(--cal-title-size)",
          fontWeight: "var(--cal-title-weight)" as unknown as number,
          letterSpacing: "var(--cal-title-tracking)",
          textTransform: "var(--cal-title-transform)" as React.CSSProperties["textTransform"],
          lineHeight: 1.05,
          color: isBg ? "white" : "var(--cal-text)",
        }}
      >
        {MONTH_NAMES[monthIndex]}
      </h2>
      <div
        className="mt-1 text-sm tracking-widest opacity-70"
        style={{ color: isBg ? "white" : "var(--cal-muted)" }}
      >
        {year}
      </div>
    </div>
  );

  const dateGrid = (
    <div className="flex-1 px-[6%] py-[3%]">
      {showWeekdays && (
        <div className="mb-2 grid grid-cols-7 gap-1 text-center text-[0.65rem] font-semibold uppercase tracking-wider opacity-70">
          {weekdayLabels.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-7 gap-1 text-center">
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

  return (
    <div
      className={cn(
        `tpl-${template}`,
        "relative w-full overflow-hidden shadow-elegant",
        isLandscape ? "aspect-[4/3]" : "aspect-[3/4]",
        className,
      )}
      style={{
        backgroundColor: "var(--cal-bg)",
        color: "var(--cal-text)",
        fontFamily: "var(--cal-font-body)",
        ...styleOverrides,
      }}
    >
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
            <div className="h-full w-1/2 overflow-hidden bg-[var(--cal-border)]">
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
            <div className="h-full w-1/2 overflow-hidden bg-[var(--cal-border)]">
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
            <div className={cn("w-full overflow-hidden bg-[var(--cal-border)]", isLandscape ? "h-[35%]" : "h-[45%]")}>
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
                className={cn(
                  "overflow-hidden border-4 border-[var(--cal-border)] bg-[var(--cal-border)] shadow-md",
                  !image && "border-dashed",
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
            <div className={cn("w-full overflow-hidden bg-[var(--cal-border)]", isLandscape ? "h-[30%]" : "h-[35%]")}>
              {image ? (
                <img src={image} alt="" className="h-full w-full object-cover" />
              ) : (
                <EmptyImage />
              )}
            </div>
          )}
        </div>
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
