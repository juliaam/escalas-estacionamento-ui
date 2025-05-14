import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { RefObject } from "react";
export async function html2PDF(exportRef: RefObject<HTMLDivElement>) {
  if (!exportRef.current) return;

  const options = {
    scale: 5,
    useCORS: true,
    logging: false,
    scrollX: 0,
    scrollY: 0,
    windowWidth: document.documentElement.offsetWidth,
    windowHeight: document.documentElement.offsetHeight,
  };

  const canvas = await html2canvas(exportRef.current, options);
  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("l", "pt", "a4");
  const imgProps = pdf.getImageProperties(imgData);
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
  pdf.save("escala.pdf");
}
