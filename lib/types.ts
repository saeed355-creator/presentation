export type AudienceType =
  | 'student'
  | 'teacher'
  | 'professional'
  | 'business'
  | 'investor'
  | 'startup'
  | 'technical'
  | 'general';

export type PurposeType =
  | 'assignment'
  | 'seminar'
  | 'project'
  | 'pitch'
  | 'meeting'
  | 'sales'
  | 'research'
  | 'training';

export type ToneType =
  | 'academic'
  | 'professional'
  | 'minimal'
  | 'persuasive'
  | 'technical'
  | 'creative';

export type SlideLayoutType =
  | 'title'
  | 'problem'
  | 'solution'
  | 'comparison'
  | 'data'
  | 'summary'
  | 'process'
  | 'timeline'
  | 'statistics'
  | 'chart'
  | 'text-image'
  | 'quote'
  | 'conclusion';

export type ThemeType =
  | 'dark-violet'
  | 'cyberpunk-blue'
  | 'emerald-executive'
  | 'sunset-gold'
  | 'minimal-monochrome'
  | 'neo-crimson';

export type VisualSuggestionType =
  | 'image'
  | 'chart'
  | 'diagram'
  | 'metric'
  | 'icon'
  | 'timeline'
  | 'illustration';

export interface ChartDataItem {
  label: string;
  value: number;
}

export interface ChartDataConfig {
  chartType: 'bar' | 'donut' | 'line' | 'kpi';
  labels: string[];
  series: number[];
}

export interface ProcessStepItem {
  stepNumber: number;
  label: string;
  description: string;
}

export interface SlideVisualSuggestion {
  type: VisualSuggestionType;
  description: string;
  iconName?: string;
  chartData?: ChartDataItem[];
  imageUrl?: string;
}

export interface MetricData {
  label: string;
  value: string;
  trend?: string;
}

export interface ComparisonData {
  leftTitle: string;
  leftItems: string[];
  rightTitle: string;
  rightItems: string[];
}

export interface Slide {
  id: string;
  slideNumber: number;
  title: string;
  subtitle?: string;
  layout: SlideLayoutType;
  content: string[];
  speakerNotes?: string;
  keyMetric?: MetricData;
  comparison?: ComparisonData;
  chartData?: ChartDataConfig;
  processSteps?: ProcessStepItem[];
  imageUrl?: string;
  quoteAuthor?: string;
  visualSuggestion?: SlideVisualSuggestion;
}

export interface StoryOutlineItem {
  id: string;
  slideNumber: number;
  title: string;
  summary: string;
  layout: SlideLayoutType;
}

export interface QualityScore {
  overall: number;
  story: number;
  clarity: number;
  structure: number;
  visualBalance: number;
  contentDensity: number;
  recommendations: string[];
}

export interface Presentation {
  id: string;
  title: string;
  subtitle: string;
  topic: string;
  audience: AudienceType;
  purpose: PurposeType;
  tone: ToneType;
  slideCount: number;
  theme: ThemeType;
  createdAt: string;
  updatedAt: string;
  slides: Slide[];
  outline?: StoryOutlineItem[];
  qualityScore?: QualityScore;
}

export interface ThemeConfig {
  id: ThemeType;
  name: string;
  description: string;
  bg: string;
  surface: string;
  surfaceSecondary: string;
  border: string;
  textPrimary: string;
  textSecondary: string;
  accent: string;
  accentGradient: string;
  accentGlow: string;
  badgeBg: string;
  badgeText: string;
}

export interface AIProgressStep {
  id: string;
  label: string;
  detail: string;
  completed: boolean;
}

export interface PracticeScoreResult {
  overall: number;
  clarity: number;
  structure: number;
  confidence: number;
  timing: number;
  targetDurationSeconds: number;
  actualDurationSeconds: number;
  recommendations: string[];
}
