import { HeroPattern as EnginePattern, HeroAction as EngineAction, HeroStat as EngineStat } from "@damarkuncoro/hero-engine";

export type HeroStyle = 'modern' | 'glass' | 'brutalist' | 'minimal';
export type HeroPattern = EnginePattern;
export type HeroVariant = 
  | 'centered' 
  | 'split' 
  | 'fullscreen' 
  | 'background' 
  | 'video' 
  | 'product' 
  | 'minimal' 
  | 'form' 
  | 'stats' 
  | 'illustration' 
  | 'cards' 
  | 'app-preview';

export interface HeroAction extends Omit<EngineAction, 'variant'> {
  id: string;
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline';
}

export type HeroStat = EngineStat;

export interface HeroConfig {
  variant: HeroVariant;
  pattern: HeroPattern;
  style: HeroStyle;
  title: string;
  description: string;
  actions: HeroAction[];
  stats: HeroStat[];
  visualType: 'image' | 'video' | 'none';
  visualUrl?: string;
  videoUrl?: string;
  backgroundColor: string;
  textColor: string;
  primaryColor: string;
  paddingY: string;
  paddingX: string;
  borderRadius: string;
  reverse: boolean;
  visualOverlay: number;
}

export const DEFAULT_HERO_CONFIG: HeroConfig = {
  variant: 'split',
  pattern: 'split',
  style: 'modern',
  title: 'Design Your Perfect Hero Section',
  description: 'Build high-converting landing pages with our headless hero engine. Fully customizable, accessible, and lightning fast.',
  actions: [
    { id: '1', label: 'Get Started', href: '#', variant: 'primary' },
    { id: '2', label: 'Documentation', href: '#', variant: 'outline' },
  ],
  stats: [
    { label: 'Active Users', value: '100k+' },
    { label: 'Countries', value: '50+' },
    { label: 'Uptime', value: '99.9%' },
  ],
  visualType: 'image',
  visualUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  primaryColor: '#6366f1',
  paddingY: '5rem',
  paddingX: '1.5rem',
  borderRadius: '0.75rem',
  reverse: false,
  visualOverlay: 0.4,
};
