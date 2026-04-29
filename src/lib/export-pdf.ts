import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export async function exportCalendarPdf(pages: HTMLElement[], filename = "calendar.pdf") {
  if (!pages.length) return;
  // A4 portrait: 210 x 297 mm
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  for (let i = 0; i < pages.length; i++) {
    const canvas = await html2canvas(pages[i], {
      scale: 2,
      backgroundColor: null,
      useCORS: true,
      logging: false,
    });
    const img = canvas.toDataURL("image/jpeg", 0.92);

    // fit canvas inside page (preserve aspect ratio, leave 10mm margin)
    const margin = 10;
    const maxW = pageW - margin * 2;
    const maxH = pageH - margin * 2;
    const ratio = canvas.width / canvas.height;
    let w = maxW;
    let h = w / ratio;
    if (h > maxH) {
      h = maxH;
      w = h * ratio;
    }
    const x = (pageW - w) / 2;
    const y = (pageH - h) / 2;

    if (i > 0) pdf.addPage();
    pdf.addImage(img, "JPEG", x, y, w, h);
  }

  pdf.save(filename);
}
