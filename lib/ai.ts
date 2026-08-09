import { GoogleGenerativeAI } from '@google/generative-ai';
import {
  AudienceType,
  PurposeType,
  ToneType,
  Presentation,
  Slide,
  ThemeType,
  StoryOutlineItem,
  QualityScore,
  SlideLayoutType,
  ChartDataConfig,
  ProcessStepItem,
} from './types';

// Curated Editorial Image Assets by Topic & Category
const TOPIC_ASSETS: Record<string, string[]> = {
  healthcare: [
    'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&w=1200&q=80',
  ],
  technology: [
    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
  ],
  business: [
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
  ],
  education: [
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1200&q=80',
  ],
  climate: [
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
  ],
  default: [
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
  ],
};

export function getCuratedAssetUrl(topic: string, index: number): string {
  const lower = topic.toLowerCase();
  let pool = TOPIC_ASSETS.default;

  if (lower.includes('health') || lower.includes('medical') || lower.includes('doctor') || lower.includes('hospital')) {
    pool = TOPIC_ASSETS.healthcare;
  } else if (lower.includes('tech') || lower.includes('ai') || lower.includes('data') || lower.includes('code') || lower.includes('network') || lower.includes('cyber')) {
    pool = TOPIC_ASSETS.technology;
  } else if (lower.includes('pitch') || lower.includes('business') || lower.includes('market') || lower.includes('finance') || lower.includes('revenue')) {
    pool = TOPIC_ASSETS.business;
  } else if (lower.includes('climate') || lower.includes('energy') || lower.includes('green') || lower.includes('solar')) {
    pool = TOPIC_ASSETS.climate;
  } else if (lower.includes('education') || lower.includes('school') || lower.includes('learn') || lower.includes('student')) {
    pool = TOPIC_ASSETS.education;
  }

  return pool[index % pool.length];
}

// Calculate measurable heuristics for Presentation Quality Score
export function calculateQualityScore(
  slides: Slide[],
  topic: string,
  purpose: PurposeType = 'meeting'
): QualityScore {
  let story = 92;
  let clarity = 94;
  let structure = 95;
  let visualBalance = 90;
  let contentDensity = 88;
  const recommendations: string[] = [];

  const totalWords = slides.reduce(
    (acc, s) => acc + s.title.split(' ').length + s.content.join(' ').split(' ').length,
    0
  );
  const avgWordsPerSlide = totalWords / Math.max(1, slides.length);

  // Check content density
  if (avgWordsPerSlide > 45) {
    contentDensity -= 10;
    recommendations.push('Reduce text density on wordy slides for better audience retention.');
  } else if (avgWordsPerSlide < 15) {
    contentDensity -= 5;
    recommendations.push('Add supportive metrics or examples to brief slides.');
  }

  // Check layout variety
  const layoutTypes = new Set(slides.map((s) => s.layout));
  if (layoutTypes.size < 4) {
    visualBalance -= 8;
    recommendations.push('Incorporate more layout variety (Comparison, Process, Data Chart).');
  }

  const overall = Math.round(
    (story + clarity + structure + visualBalance + contentDensity) / 5
  );

  return {
    overall,
    story,
    clarity,
    structure,
    visualBalance,
    contentDensity,
    recommendations,
  };
}

// Generate Fallback Outline with Rich Slide Classification
export function generateFallbackOutline(
  topic: string,
  audience: AudienceType,
  purpose: PurposeType,
  slideCount: number = 8
): StoryOutlineItem[] {
  const baseItems: { title: string; summary: string; layout: SlideLayoutType }[] = [
    {
      title: `The Genesis of ${topic.slice(0, 30)}`,
      summary: `Setting the stage by exploring the initial spark and macro trends that made this imperative for ${audience}.`,
      layout: 'title',
    },
    {
      title: 'Market Landscape & Key Friction Points',
      summary: `Detailing current state inefficiencies and critical pain points our narrative addresses.`,
      layout: 'problem',
    },
    {
      title: 'Core Strategic Architecture & Innovation',
      summary: `Introducing the framework and unique technology that differentiates us from incumbents.`,
      layout: 'solution',
    },
    {
      title: 'Legacy Approach vs. Present.AI Story Engine',
      summary: `Side-by-side contrast of manual slide friction versus automated presentation design.`,
      layout: 'comparison',
    },
    {
      title: 'Phased Implementation Workflow',
      summary: `Step-by-step roadmap from raw idea dump to executive pitch deck.`,
      layout: 'process',
    },
    {
      title: 'Quantitative Impact & Key Metrics',
      summary: `Demonstrating measurable efficiency gains, turnaround speed, and ROI.`,
      layout: 'statistics',
    },
    {
      title: 'Market Growth & Metric Performance',
      summary: `Visualizing adoption trajectory and multi-year projection benchmarks.`,
      layout: 'chart',
    },
    {
      title: 'Real-World Architectural Impact',
      summary: `Case study showcasing real enterprise deployment and strategic results.`,
      layout: 'text-image',
    },
    {
      title: 'Strategic Summary & Action Plan',
      summary: `Synthesizing final recommendations and immediate next steps for decision-makers.`,
      layout: 'conclusion',
    },
  ];

  const items: StoryOutlineItem[] = [];
  for (let i = 0; i < slideCount; i++) {
    const template = baseItems[i % baseItems.length];
    items.push({
      id: `outline-${i + 1}`,
      slideNumber: i + 1,
      title: template.title,
      summary: template.summary,
      layout: template.layout,
    });
  }
  return items;
}

// Generate Fallback Presentation with Rich Multi-Layout Compositions
export function generateFallbackPresentation(
  topic: string,
  audience: AudienceType = 'professional',
  purpose: PurposeType = 'meeting',
  slideCount: number = 8,
  tone: ToneType = 'professional',
  theme: ThemeType = 'dark-violet',
  customOutline?: StoryOutlineItem[]
): Presentation {
  const id = `deck-${Date.now()}`;
  const outlineItems =
    customOutline && customOutline.length > 0
      ? customOutline
      : generateFallbackOutline(topic, audience, purpose, slideCount);

  const slides: Slide[] = outlineItems.map((item, idx) => {
    const layout = item.layout;
    const isTitle = layout === 'title';
    const isProblem = layout === 'problem';
    const isSolution = layout === 'solution';
    const isComparison = layout === 'comparison';
    const isProcess = layout === 'process';
    const isStats = layout === 'statistics';
    const isChart = layout === 'chart';
    const isTextImage = layout === 'text-image';
    const isConclusion = layout === 'conclusion';

    const imageUrl = (isTitle || isTextImage || isSolution)
      ? getCuratedAssetUrl(topic, idx)
      : undefined;

    const chartData: ChartDataConfig | undefined = isChart
      ? {
          chartType: 'bar',
          labels: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026 Target'],
          series: [24, 45, 68, 89, 140],
        }
      : undefined;

    const processSteps: ProcessStepItem[] | undefined = isProcess
      ? [
          { stepNumber: 1, label: '01 Brain Dump', description: 'Paste raw thoughts & bullet outlines' },
          { stepNumber: 2, label: '02 AI Synthesis', description: 'Engine classifies narrative arc' },
          { stepNumber: 3, label: '03 Design Engine', description: 'Applies editorial layout & colors' },
          { stepNumber: 4, label: '04 Present & Export', description: 'Native PPTX & PDF widescreen' },
        ]
      : undefined;

    return {
      id: `slide-${idx + 1}`,
      slideNumber: idx + 1,
      title: item.title,
      subtitle: item.summary,
      layout,
      content: [
        `Strategic takeaway regarding ${topic.slice(0, 25)}...`,
        `Audience alignment tailored specifically for ${audience}`,
        `Actionable insight supporting the overall ${purpose} objective`,
      ],
      speakerNotes: `Emphasize key points on slide ${idx + 1} clearly for the target audience.`,
      keyMetric: (isStats || isChart || isProblem)
        ? {
            label: 'EFFICIENCY GAIN',
            value: '+340%',
            trend: '↑ 4.2x Faster Turnaround',
          }
        : undefined,
      comparison: isComparison
        ? {
            leftTitle: 'Traditional Manual Process',
            leftItems: ['Hours of pixel alignment', 'Inconsistent layout hierarchy', 'Fragmented story flow'],
            rightTitle: 'Present.AI Story Engine',
            rightItems: ['Instant structured narrative', 'Gallery-quality editorial design', 'Automated widescreen export'],
          }
        : undefined,
      chartData,
      processSteps,
      imageUrl,
      visualSuggestion: {
        type: isChart ? 'chart' : isProcess ? 'diagram' : isTextImage ? 'image' : 'icon',
        description: `Visual element for slide ${idx + 1}`,
        iconName: 'Sparkles',
      },
    };
  });

  const qualityScore = calculateQualityScore(slides, topic, purpose);

  return {
    id,
    title: topic,
    subtitle: `Present.AI Presentation Design Engine for ${audience}`,
    topic,
    audience,
    purpose,
    tone,
    slideCount: slides.length,
    theme,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    slides,
    qualityScore,
  };
}

// Generate Full Presentation via Gemini AI API
export async function generateAIPresentation(
  topic: string,
  audience: AudienceType = 'professional',
  purpose: PurposeType = 'meeting',
  slideCount: number = 8,
  tone: ToneType = 'professional',
  theme: ThemeType = 'dark-violet',
  customOutline?: StoryOutlineItem[]
): Promise<Presentation> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.log('No GEMINI_API_KEY found in env, using fallback story generator.');
    return generateFallbackPresentation(topic, audience, purpose, slideCount, tone, theme, customOutline);
  }

  const modelCandidates = ['gemini-2.0-flash', 'gemini-1.5-pro', 'gemini-pro'];

  for (const modelName of modelCandidates) {
    try {
      const ai = new GoogleGenerativeAI(apiKey);
      const model = ai.getGenerativeModel({ model: modelName });

      const outlineContext = customOutline && customOutline.length > 0
        ? `Follow this explicit approved outline: ${JSON.stringify(customOutline)}`
        : `Generate ${slideCount} slides with varied slide layouts (title, problem, solution, comparison, process, statistics, chart, text-image, conclusion).`;

      const systemPrompt = `You are an elite AI presentation story engine and strategic design architect.
Generate a presentation based on:
Topic: "${topic}"
Target Audience: "${audience}"
Presentation Purpose: "${purpose}"
Tone: "${tone}"
Requested Slide Count: ${slideCount}

${outlineContext}

Your response MUST be strict raw JSON without markdown formatting.
Schema:
{
  "title": "string",
  "subtitle": "string",
  "slides": [
    {
      "slideNumber": 1,
      "title": "string",
      "subtitle": "string",
      "layout": "title" | "problem" | "solution" | "comparison" | "process" | "statistics" | "chart" | "text-image" | "conclusion",
      "content": ["bullet point 1", "bullet point 2", "bullet point 3"],
      "speakerNotes": "string",
      "keyMetric": { "label": "string", "value": "string", "trend": "string" },
      "comparison": { "leftTitle": "string", "leftItems": ["item1"], "rightTitle": "string", "rightItems": ["item1"] },
      "chartData": { "chartType": "bar", "labels": ["Q1", "Q2", "Q3", "Q4"], "series": [10, 25, 45, 80] },
      "processSteps": [ { "stepNumber": 1, "label": "Step 1", "description": "Desc" } ],
      "visualSuggestion": { "type": "image" | "chart" | "diagram" | "metric" | "icon", "description": "string" }
    }
  ]
}`;

      const result = await model.generateContent(systemPrompt);
      const responseText = result.response.text();
      const cleanJsonText = responseText.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const parsed = JSON.parse(cleanJsonText);

      const id = `deck-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const slides: Slide[] = parsed.slides.map((s: any, idx: number) => {
        const layout: SlideLayoutType = s.layout || 'solution';
        const imageUrl = (layout === 'title' || layout === 'text-image' || layout === 'solution')
          ? getCuratedAssetUrl(topic, idx)
          : undefined;

        return {
          id: `slide-${idx + 1}`,
          slideNumber: idx + 1,
          title: s.title || `Slide ${idx + 1}`,
          subtitle: s.subtitle || '',
          layout,
          content: Array.isArray(s.content) ? s.content : [String(s.content)],
          speakerNotes: s.speakerNotes || '',
          keyMetric: s.keyMetric,
          comparison: s.comparison,
          chartData: s.chartData,
          processSteps: s.processSteps,
          imageUrl,
          visualSuggestion: s.visualSuggestion || {
            type: 'diagram',
            description: 'Visual element representing key concept',
            iconName: 'Sparkles',
          },
        };
      });

      const qualityScore = calculateQualityScore(slides, topic, purpose);

      return {
        id,
        title: parsed.title || topic,
        subtitle: parsed.subtitle || `Present.AI Presentation Engine for ${audience}`,
        topic,
        audience,
        purpose,
        tone,
        slideCount: slides.length,
        theme,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        slides,
        qualityScore,
      };
    } catch (err) {
      console.warn(`Gemini model ${modelName} notice:`, err);
    }
  }

  // Fallback if all Gemini model candidates throw an exception
  return generateFallbackPresentation(topic, audience, purpose, slideCount, tone, theme, customOutline);
}
