import { createFileRoute } from "@tanstack/react-router";
import { CalendarDesigner } from "@/components/CalendarDesigner";
import { LandingHub } from "@/components/LandingHub";
import { exportCalendarPdf } from "@/lib/export-pdf";

type IndexSearch = { mode?: string };

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): IndexSearch => ({
    mode: (search.mode as string) || undefined,
  }),
  head: () => ({
    meta: [
      { title: "Pixel Studio — Calendar Designer & Photo Booth" },
      {
        name: "description",
        content:
          "Create beautiful photo calendars or step into a Minecraft-style virtual photo booth. Design, capture, decorate, and download!",
      },
      { property: "og:title", content: "Pixel Studio" },
      {
        property: "og:description",
        content: "Calendar designer & photo booth in a cute Minecraft pixel world.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { mode } = Route.useSearch();

  if (mode === "calendar") {
    return <CalendarDesigner onExport={(els, orientation) => exportCalendarPdf(els, orientation, "my-calendar.pdf")} />;
  }

  return <LandingHub />;
}
