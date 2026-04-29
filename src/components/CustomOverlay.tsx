import { useEffect, useRef, useState } from "react";
import type {
  CustomItem,
  CustomStroke,
  MonthCustomization,
} from "@/lib/custom-types";
import { frameStyleToCss } from "@/lib/custom-types";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

export type Tool = "select" | "draw" | "sticker" | "text" | "erase";

interface Props {
  customization: MonthCustomization;
  onChange: (next: MonthCustomization) => void;
  tool: Tool;
  drawColor: string;
  drawWidth: number;
  stickerEmoji: string;
  stickerSize: number;
  textColor: string;
  textFont: string;
  textSize: number;
  textInput: string;
  /** when true, hide handles/selection chrome (used for export & thumbnails) */
  readOnly?: boolean;
  /** reference width for normalizing brush size (default 900px) */
  refWidth?: number;
}

const uid = () => Math.random().toString(36).slice(2, 9);

export function CustomOverlay({
  customization,
  onChange,
  tool,
  drawColor,
  drawWidth,
  stickerEmoji,
  stickerSize,
  textColor,
  textFont,
  textSize,
  textInput,
  readOnly = false,
  refWidth = 900,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [drawing, setDrawing] = useState<CustomStroke | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const ro = new ResizeObserver(() => {
      setSize({ w: el.clientWidth, h: el.clientHeight });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = size.w > 0 ? size.w / refWidth : 1;

  const toLocal = (e: React.PointerEvent) => {
    const rect = ref.current!.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  };

  const update = (next: MonthCustomization) => onChange(next);

  const addItem = (item: CustomItem) =>
    update({ ...customization, items: [...customization.items, item] });

  const removeItem = (id: string) =>
    update({ ...customization, items: customization.items.filter((i) => i.id !== id) });

  const updateItem = (id: string, patch: Partial<CustomItem>) =>
    update({
      ...customization,
      items: customization.items.map((i) => (i.id === id ? ({ ...i, ...patch } as CustomItem) : i)),
    });

  const onPointerDown = (e: React.PointerEvent) => {
    if (readOnly) return;
    const p = toLocal(e);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);

    if (tool === "draw") {
      setDrawing({
        id: uid(),
        kind: "stroke",
        color: drawColor,
        width: drawWidth,
        points: [p],
      });
    } else if (tool === "sticker" && stickerEmoji) {
      addItem({
        id: uid(),
        kind: "sticker",
        x: p.x,
        y: p.y,
        emoji: stickerEmoji,
        size: stickerSize,
        rotation: 0,
      });
    } else if (tool === "text" && textInput.trim()) {
      addItem({
        id: uid(),
        kind: "text",
        x: p.x,
        y: p.y,
        text: textInput,
        color: textColor,
        font: textFont,
        size: textSize,
        rotation: 0,
      });
    } else if (tool === "select") {
      setSelectedId(null);
    }
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (drawing) {
      const p = toLocal(e);
      setDrawing({ ...drawing, points: [...drawing.points, p] });
    } else if (draggingId) {
      const p = toLocal(e);
      updateItem(draggingId, { x: p.x, y: p.y } as Partial<CustomItem>);
    }
  };

  const onPointerUp = () => {
    if (drawing && drawing.points.length > 1) {
      addItem(drawing);
    }
    setDrawing(null);
    setDraggingId(null);
  };

  const renderStrokePath = (s: CustomStroke) => {
    if (s.points.length < 2) return null;
    const d = s.points
      .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x * size.w} ${p.y * size.h}`)
      .join(" ");
    return (
      <path
        key={s.id}
        d={d}
        stroke={s.color}
        strokeWidth={s.width * scale}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    );
  };

  const cursorClass =
    readOnly ? "" :
    tool === "draw" ? "cursor-crosshair" :
    tool === "sticker" || tool === "text" ? "cursor-copy" :
    "cursor-default";

  return (
    <div
      ref={ref}
      className={cn("absolute inset-0 z-20", cursorClass)}
      style={{
        ...frameStyleToCss(customization.frame, customization.frameColor),
        touchAction: "none",
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Strokes layer */}
      <svg className="pointer-events-none absolute inset-0 h-full w-full" width={size.w} height={size.h}>
        {customization.items
          .filter((i): i is CustomStroke => i.kind === "stroke")
          .map(renderStrokePath)}
        {drawing && renderStrokePath(drawing)}
      </svg>

      {/* Stickers & text */}
      {customization.items
        .filter((i) => i.kind !== "stroke")
        .map((item) => {
          const isSelected = !readOnly && selectedId === item.id;
          const common: React.CSSProperties = {
            position: "absolute",
            left: `${item.x * 100}%`,
            top: `${item.y * 100}%`,
            transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
            cursor: readOnly ? "default" : (tool === "select" ? "grab" : "default"),
            userSelect: "none",
            pointerEvents: readOnly ? "none" : "auto",
          };
          const onItemDown = (e: React.PointerEvent) => {
            if (readOnly) return;
            if (tool === "erase") {
              e.stopPropagation();
              removeItem(item.id);
              return;
            }
            if (tool === "select") {
              e.stopPropagation();
              setSelectedId(item.id);
              setDraggingId(item.id);
              (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
            }
          };

          if (item.kind === "sticker") {
            return (
              <div
                key={item.id}
                style={{ ...common, fontSize: item.size * scale, lineHeight: 1 }}
                onPointerDown={onItemDown}
                className={cn(isSelected && "outline outline-2 outline-primary outline-offset-2")}
              >
                <span style={{ fontSize: "inherit" }}>{item.emoji}</span>
                {isSelected && (
                  <button
                    onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                    className="absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            );
          }

          if (item.kind === "text") {
            return (
              <div
                key={item.id}
                style={{
                  ...common,
                  color: item.color,
                  fontFamily: item.font,
                  fontSize: item.size * scale,
                  whiteSpace: "nowrap",
                  fontWeight: 500,
                }}
                onPointerDown={onItemDown}
                className={cn(isSelected && "outline outline-2 outline-primary outline-offset-4")}
              >
                {item.text}
                {isSelected && (
                  <button
                    onClick={(e) => { e.stopPropagation(); removeItem(item.id); }}
                    className="absolute -right-3 -top-3 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-white"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </div>
            );
          }
          return null;
        })}

      {/* Erase mode hint for strokes */}
      {!readOnly && tool === "erase" && (
        <svg className="absolute inset-0 h-full w-full" width={size.w} height={size.h}>
          {customization.items
            .filter((i): i is CustomStroke => i.kind === "stroke")
            .map((s) => {
              if (s.points.length < 2) return null;
              const d = s.points
                .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x * size.w} ${p.y * size.h}`)
                .join(" ");
              return (
                <path
                  key={`hit-${s.id}`}
                  d={d}
                  stroke="transparent"
                  strokeWidth={Math.max(s.width * scale, 16)}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  style={{ pointerEvents: "stroke", cursor: "pointer" }}
                  onPointerDown={(e) => { e.stopPropagation(); removeItem(s.id); }}
                />
              );
            })}
        </svg>
      )}
    </div>
  );
}
