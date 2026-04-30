import { createFileRoute } from "@tanstack/react-router";
import { CalendarDesigner } from "@/components/CalendarDesigner";
import { exportCalendarPdf } from "@/lib/export-pdf";

export const Route = createFileRoute("/calendar")({
  head: () => ({
    meta: [
      { title: "Calendar Designer — Creative Studio" },
      {
        name: "description",
        content: "Design a beautiful 12-month photo calendar with custom templates, fonts, and colors.",
      },
      { property: "og:title", content: "Calendar Designer" },
      {
        property: "og:description",
        content: "Create and customize your perfect photo calendar.",
      },
    ],
  }),
  component: CalendarDesignerPage,
});

function CalendarDesignerPage() {
  return (
    <CalendarDesigner 
      onExport={(els, orientation) => 
        exportCalendarPdf(els, orientation, "my-calendar.pdf")
      } 
    />
  );
}
