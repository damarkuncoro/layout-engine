export type HeroStyle = 'modern' | 'glass' | 'brutalist' | 'minimal';
export type HeroPattern = 'split' | 'centered' | 'fullscreen' | 'overlap';

export interface HeroAction {
  id: string;
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline';
}

export interface HeroConfig {
  pattern: HeroPattern;
  style: HeroStyle;
  title: string;
  description: string;
  actions: HeroAction[];
  visualType: 'image' | 'none';
  visualUrl?: string;
  backgroundColor: string;
  textColor: string;
  primaryColor: string;
  paddingY: string;
  paddingX: string;
  borderRadius: string;
  reverse: boolean;
}

export const DEFAULT_HERO_CONFIG: HeroConfig = {
  pattern: 'split',
  style: 'modern',
  title: 'Design Your Perfect Hero Section',
  description: 'Build high-converting landing pages with our headless hero engine. Fully customizable, accessible, and lightning fast.',
  actions: [
    { id: '1', label: 'Get Started', href: '#', variant: 'primary' },
    { id: '2', label: 'Documentation', href: '#', variant: 'outline' },
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
};
