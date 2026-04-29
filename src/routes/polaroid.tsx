import { createFileRoute } from "@tanstack/react-router";
import { PolaroidMode } from "@/components/polaroid/PolaroidMode";

export const Route = createFileRoute("/polaroid")({
  head: () => ({
    meta: [
      { title: "Polaroid Mode — Pixel Studio" },
      {
        name: "description",
        content:
          "Capture and decorate a single Polaroid-style photo with aesthetic filters and cute stickers.",
      },
      { property: "og:title", content: "Polaroid Mode" },
    ],
  }),
  component: PolaroidMode,
});
