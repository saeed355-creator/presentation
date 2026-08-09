import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { Presentation } from './types';

export async function exportToPDF(presentation: Presentation, elementId: string = 'slide-canvas-container'): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Canvas element #${elementId} not found`);
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
      logging: false,
    });

    const imgData = canvas.toDataURL('image/png');
    // 16:9 PDF landscape dimensions (297mm x 167mm)
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: [297, 167.06],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, 297, 167.06);
    const filename = `${presentation.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-deck.pdf`;
    pdf.save(filename);
  } catch (err) {
    console.error('Failed to export PDF:', err);
  }
}
