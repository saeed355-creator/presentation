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

export type ResearchMode = 'quick' | 'standard' | 'deep';

export type ClaimVerificationStatus = 'VERIFIED' | 'SUPPORTED' | 'UNCERTAIN' | 'CONFLICTING';

export interface ResearchSource {
  id: string;
  sourceName: string;
  title: string;
  url: string;
  date?: string;
  snippet?: string;
  usedInSlides: number[];
  verificationStatus?: ClaimVerificationStatus;
}

export interface ResearchSummaryData {
  topic: string;
  researchMode: ResearchMode;
  queryList: string[];
  keyFacts: string[];
  statistics: { label: string; value: string; sourceId?: string }[];
  sources: ResearchSource[];
  timestamp: string;
}

export interface SlideCitation {
  sourceName: string;
  title?: string;
  url?: string;
  date?: string;
  verificationStatus?: ClaimVerificationStatus;
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
  citation?: SlideCitation;
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

export interface PresentationBrief {
  topic: string;
  purpose: string;
  purposeCustom?: string;
  audience: string;
  audienceCustom?: string;
  style: string;
  styleCustom?: string;
  depth: string;
  depthCustom?: string;
  slideCount: number;
  visualPreferences: string[];
  visualsCustom?: string;
  researchLevel: ResearchMode;
  sourcePreference: string;
  sourceCustom?: string;
  tone: string;
  toneCustom?: string;
  language: string;
  languageCustom?: string;
  specialRequirements?: string;
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
  researchMode?: ResearchMode;
  researchData?: ResearchSummaryData;
  sources?: ResearchSource[];
  brief?: PresentationBrief;
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
