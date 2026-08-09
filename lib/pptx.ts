import pptxgen from 'pptxgenjs';
import { THEMES } from './themes';
import { Presentation, Slide } from './types';

export async function exportToPPTX(presentation: Presentation): Promise<void> {
  const pptx = new pptxgen();
  const theme = THEMES[presentation.theme] || THEMES['dark-violet'];

  // Set Widescreen 16:9
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Present.AI Presentation Design Engine';
  pptx.title = presentation.title;

  // Convert hex color to standard RRGGBB format for pptxgenjs
  const hex = (col: string) => col.replace('#', '').substring(0, 6).toUpperCase();

  const bgHex = hex(theme.bg);
  const surfaceHex = hex(theme.surface);
  const surfaceSecHex = hex(theme.surfaceSecondary);
  const textPrimaryHex = hex(theme.textPrimary);
  const textSecondaryHex = hex(theme.textSecondary);
  const accentHex = hex(theme.accent);
  const borderHex = hex(theme.border);

  presentation.slides.forEach((slide: Slide, idx: number) => {
    const pSlide = pptx.addSlide();
    pSlide.background = { color: bgHex };
    const layout = slide.layout || 'solution';

    // Slide Header / Title Tag
    pSlide.addText(`SLIDE 0${idx + 1} // ${layout.toUpperCase()}`, {
      x: 0.8,
      y: 0.4,
      w: 8.0,
      h: 0.3,
      fontSize: 10,
      color: accentHex,
      bold: true,
      fontFace: 'Arial',
    });

    // Main Title
    pSlide.addText(slide.title, {
      x: 0.8,
      y: 0.75,
      w: 11.7,
      h: 0.7,
      fontSize: 24,
      color: textPrimaryHex,
      bold: true,
      fontFace: 'Georgia',
    });

    // Subtitle
    if (slide.subtitle) {
      pSlide.addText(slide.subtitle, {
        x: 0.8,
        y: 1.45,
        w: 11.7,
        h: 0.4,
        fontSize: 13,
        color: textSecondaryHex,
        fontFace: 'Arial',
      });
    }

    // Divider Line
    pSlide.addShape(pptx.ShapeType.line, {
      x: 0.8,
      y: 1.95,
      w: 11.7,
      h: 0,
      line: { color: borderHex, width: 1 },
    });

    // LAYOUT SPECIFIC PPTX MAPPINGS
    if (layout === 'title') {
      pSlide.addShape(pptx.ShapeType.rect, {
        x: 0.8,
        y: 2.3,
        w: 11.7,
        h: 4.3,
        fill: { color: surfaceHex },
        line: { color: borderHex, width: 1 },
      });

      pSlide.addText(presentation.title, {
        x: 1.2,
        y: 2.7,
        w: 10.5,
        h: 1.2,
        fontSize: 30,
        color: textPrimaryHex,
        bold: true,
        fontFace: 'Georgia',
      });

      pSlide.addText(presentation.subtitle || 'AI Presentation Story Engine', {
        x: 1.2,
        y: 4.0,
        w: 10.5,
        h: 0.6,
        fontSize: 16,
        color: accentHex,
        fontFace: 'Arial',
      });
    } else if (layout === 'comparison' && slide.comparison) {
      // Left box
      pSlide.addShape(pptx.ShapeType.rect, {
        x: 0.8,
        y: 2.3,
        w: 5.6,
        h: 4.3,
        fill: { color: surfaceHex },
        line: { color: borderHex, width: 1 },
      });

      pSlide.addText(slide.comparison.leftTitle, {
        x: 1.1,
        y: 2.6,
        w: 5.0,
        h: 0.4,
        fontSize: 15,
        color: textPrimaryHex,
        bold: true,
        fontFace: 'Georgia',
      });

      slide.comparison.leftItems.forEach((item, i) => {
        pSlide.addText(`• ${item}`, {
          x: 1.1,
          y: 3.2 + i * 0.6,
          w: 5.0,
          h: 0.5,
          fontSize: 12,
          color: textSecondaryHex,
          fontFace: 'Arial',
        });
      });

      // Right box
      pSlide.addShape(pptx.ShapeType.rect, {
        x: 6.9,
        y: 2.3,
        w: 5.6,
        h: 4.3,
        fill: { color: surfaceSecHex },
        line: { color: accentHex, width: 1.5 },
      });

      pSlide.addText(slide.comparison.rightTitle, {
        x: 7.2,
        y: 2.6,
        w: 5.0,
        h: 0.4,
        fontSize: 15,
        color: accentHex,
        bold: true,
        fontFace: 'Georgia',
      });

      slide.comparison.rightItems.forEach((item, i) => {
        pSlide.addText(`✓ ${item}`, {
          x: 7.2,
          y: 3.2 + i * 0.6,
          w: 5.0,
          h: 0.5,
          fontSize: 12,
          color: textPrimaryHex,
          fontFace: 'Arial',
        });
      });
    } else if (layout === 'process' || layout === 'timeline') {
      const steps = slide.processSteps || [
        { stepNumber: 1, label: '01 Discovery', description: 'Audience context mapping' },
        { stepNumber: 2, label: '02 Outline', description: 'Narrative arc classification' },
        { stepNumber: 3, label: '03 Design', description: 'Bespoke layout composition' },
        { stepNumber: 4, label: '04 Present', description: 'Widescreen PPTX export' },
      ];

      steps.forEach((step, i) => {
        const xPos = 0.8 + i * 2.95;
        pSlide.addShape(pptx.ShapeType.rect, {
          x: xPos,
          y: 2.3,
          w: 2.7,
          h: 4.3,
          fill: { color: surfaceHex },
          line: { color: borderHex, width: 1 },
        });

        pSlide.addText(`0${step.stepNumber || i + 1}`, {
          x: xPos + 0.3,
          y: 2.6,
          w: 2.1,
          h: 0.4,
          fontSize: 18,
          color: accentHex,
          bold: true,
          fontFace: 'Arial',
        });

        pSlide.addText(step.label, {
          x: xPos + 0.3,
          y: 3.2,
          w: 2.1,
          h: 0.5,
          fontSize: 14,
          color: textPrimaryHex,
          bold: true,
          fontFace: 'Georgia',
        });

        pSlide.addText(step.description, {
          x: xPos + 0.3,
          y: 3.8,
          w: 2.1,
          h: 1.5,
          fontSize: 11,
          color: textSecondaryHex,
          fontFace: 'Arial',
        });
      });
    } else if (layout === 'statistics' || layout === 'data') {
      // Bullets left
      slide.content.forEach((bullet, i) => {
        pSlide.addText(`✦ ${bullet}`, {
          x: 0.8,
          y: 2.3 + i * 0.9,
          w: 6.5,
          h: 0.8,
          fontSize: 13,
          color: textPrimaryHex,
          fontFace: 'Arial',
        });
      });

      // Metric Card Right
      pSlide.addShape(pptx.ShapeType.rect, {
        x: 7.8,
        y: 2.3,
        w: 4.7,
        h: 4.3,
        fill: { color: surfaceSecHex },
        line: { color: accentHex, width: 1.5 },
      });

      pSlide.addText((slide.keyMetric?.label || 'METRIC HIGHLIGHT').toUpperCase(), {
        x: 8.1,
        y: 2.7,
        w: 4.1,
        h: 0.4,
        fontSize: 11,
        color: textSecondaryHex,
        bold: true,
        fontFace: 'Arial',
      });

      pSlide.addText(slide.keyMetric?.value || '+340%', {
        x: 8.1,
        y: 3.3,
        w: 4.1,
        h: 1.4,
        fontSize: 48,
        color: accentHex,
        bold: true,
        fontFace: 'Georgia',
      });

      if (slide.keyMetric?.trend) {
        pSlide.addText(slide.keyMetric.trend, {
          x: 8.1,
          y: 4.8,
          w: 4.1,
          h: 0.4,
          fontSize: 12,
          color: textPrimaryHex,
          fontFace: 'Arial',
        });
      }
    } else {
      // Default / Solution / Problem / Summary Cards
      const cardWidth = 3.6;
      slide.content.forEach((bullet, i) => {
        const col = i % 3;
        const row = Math.floor(i / 3);
        const xPos = 0.8 + col * 4.0;
        const yPos = 2.3 + row * 2.2;

        pSlide.addShape(pptx.ShapeType.rect, {
          x: xPos,
          y: yPos,
          w: cardWidth,
          h: 2.0,
          fill: { color: surfaceHex },
          line: { color: borderHex, width: 1 },
        });

        pSlide.addText(`✦ ${bullet}`, {
          x: xPos + 0.3,
          y: yPos + 0.3,
          w: cardWidth - 0.6,
          h: 1.4,
          fontSize: 12,
          color: textPrimaryHex,
          fontFace: 'Arial',
        });
      });
    }

    // Footer Tag & Citation
    const footerCitation = slide.citation ? ` | Source: ${slide.citation.sourceName}` : '';
    pSlide.addText(`Generated with Present.AI Verified Research Engine${footerCitation}`, {
      x: 0.8,
      y: 7.0,
      w: 11.7,
      h: 0.3,
      fontSize: 9,
      color: textSecondaryHex,
      fontFace: 'Arial',
    });
  });

  // Save the PPTX File
  const filename = `${presentation.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-deck.pptx`;
  await pptx.writeFile({ fileName: filename });
}
