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
} from "@/lib/calendar-utils";
import { cn } from "@/lib/utils";

export interface CalendarPageProps {
  year: number;
  monthIndex: number; // 0-11
  template: TemplateId;
  weekStart: WeekStart;
  image?: string | null;
  fontFamily?: string; // override
  bg?: string;
  text?: string;
  accent?: string;
  imagePosition: ImagePosition;
  textAlign: TextAlign;
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
  showWeekdays = true,
  className,
}: CalendarPageProps) {
  const grid = useMemo(
    () => getMonthGrid(year, monthIndex, weekStart),
    [year, monthIndex, weekStart],
  );
  const weekdayLabels = weekStart === "monday" ? WEEKDAYS_MON : WEEKDAYS_SUN;

  // Inline overrides applied on top of template CSS variables
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

  return (
    <div
      className={cn(`tpl-${template}`, "relative aspect-[3/4] w-full overflow-hidden shadow-elegant", className)}
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

      <div className={cn("relative z-10 flex h-full flex-col", isBg && "text-white")}>
        {/* Image area - top */}
        {imagePosition === "top" && (
          <div className="h-[45%] w-full overflow-hidden bg-[var(--cal-border)]">
            {image ? (
              <img src={image} alt="" className="h-full w-full object-cover" />
            ) : (
              <EmptyImage />
            )}
          </div>
        )}

        {/* Framed image */}
        {isFramed && image && (
          <div className="px-[8%] pt-[6%]">
            <div className="overflow-hidden border-4 border-[var(--cal-border)] bg-[var(--cal-border)] shadow-md" style={{ aspectRatio: "16/10" }}>
              <img src={image} alt="" className="h-full w-full object-cover" />
            </div>
          </div>
        )}
        {isFramed && !image && (
          <div className="px-[8%] pt-[6%]">
            <div className="border-4 border-dashed border-[var(--cal-border)]" style={{ aspectRatio: "16/10" }}>
              <EmptyImage />
            </div>
          </div>
        )}

        {/* Title */}
        <div
          className={cn("px-[8%] py-[3%]", textAlign === "center" && "text-center", textAlign === "right" && "text-right")}
          style={{
            fontFamily: "var(--cal-font-title)",
          }}
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

        {/* Decorative divider */}
        <div className="px-[8%]">
          <div className="h-px w-full" style={{ background: isBg ? "rgba(255,255,255,0.4)" : "var(--cal-border)" }} />
        </div>

        {/* Date grid */}
        <div className={cn("flex-1 px-[8%] py-[3%]")}>
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

        {/* Image area - bottom */}
        {imagePosition === "bottom" && (
          <div className="h-[35%] w-full overflow-hidden bg-[var(--cal-border)]">
            {image ? (
              <img src={image} alt="" className="h-full w-full object-cover" />
            ) : (
              <EmptyImage />
            )}
          </div>
        )}
      </div>
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
