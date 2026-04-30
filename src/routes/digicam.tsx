import { createFileRoute } from "@tanstack/react-router";
import { DigicamMode } from "@/components/digicam/DigicamMode";

export const Route = createFileRoute("/digicam")({
  head: () => ({
    meta: [
      { title: "Digital Camera — Y2K Aesthetic" },
      {
        name: "description",
        content: "Early 2000s digital camera simulator capturing raw, imperfect moments.",
      },
      { property: "og:title", content: "DigiCam Mode" },
    ],
  }),
  component: DigicamMode,
});
