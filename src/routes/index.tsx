import { createFileRoute } from "@tanstack/react-router";
import { CalendarDesigner } from "@/components/CalendarDesigner";
import { exportCalendarPdf } from "@/lib/export-pdf";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Photo Calendar Studio — Design & Print Your Year" },
      {
        name: "description",
        content:
          "Create a beautiful 12-month photo calendar. Pick a template, add your photos, customize fonts and colors, and download a print-ready PDF.",
      },
      { property: "og:title", content: "Photo Calendar Studio" },
      {
        property: "og:description",
        content: "Design a personalized 12-month photo calendar and export it as a print-ready PDF.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return <CalendarDesigner onExport={(els) => exportCalendarPdf(els, "my-calendar.pdf")} />;
}
