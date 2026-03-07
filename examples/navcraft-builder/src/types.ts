export type NavbarStyle = 'minimal' | 'glass' | 'brutalist' | 'modern' | 'floating';

export interface NavLink {
  id: string;
  label: string;
  href: string;
  dropdown?: NavLink[];
}

export interface NavbarConfig {
  style: NavbarStyle;
  logoText: string;
  logoType: 'text' | 'image';
  logoUrl?: string;
  links: NavLink[];
  sticky: boolean;
  shrinkOnScroll: boolean;
  fullWidth: boolean;
  alignment: 'left' | 'center' | 'right' | 'between';
  theme: 'light' | 'dark' | 'custom';
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  showCta: boolean;
  ctaText: string;
  ctaHref: string;
  showSearch: boolean;
  searchPlaceholder: string;
  pageContext: 'empty' | 'landing' | 'dashboard' | 'auth' | 'blog';
  borderRadius: string;
  borderWidth: string;
  paddingX: string;
  paddingY: string;
  paddingYScrolled: string;
}

export const DEFAULT_CONFIG: NavbarConfig = {
  style: 'minimal',
  logoText: 'NavCraft',
  logoType: 'text',
  links: [
    { id: '1', label: 'Home', href: '#' },
    { 
      id: '2', 
      label: 'Products', 
      href: '#',
      dropdown: [
        { id: '2-1', label: 'Analytics', href: '#' },
        { id: '2-2', label: 'Engagement', href: '#' },
        { id: '2-3', label: 'Security', href: '#' },
      ]
    },
    { id: '3', label: 'Pricing', href: '#' },
    { id: '4', label: 'About', href: '#' },
  ],
  sticky: true,
  shrinkOnScroll: true,
  fullWidth: false,
  alignment: 'between',
  theme: 'light',
  primaryColor: '#3b82f6',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  showCta: true,
  ctaText: 'Get Started',
  ctaHref: '#',
  showSearch: false,
  searchPlaceholder: 'Search...',
  pageContext: 'empty',
  borderRadius: '0.75rem',
  borderWidth: '1px',
  paddingX: '1.5rem',
  paddingY: '1.25rem',
  paddingYScrolled: '0.75rem',
};

export const PRESETS: Record<string, Partial<NavbarConfig>> = {
  'Stripe Style': {
    style: 'minimal',
    backgroundColor: '#ffffff',
    textColor: '#4b5563',
    primaryColor: '#6366f1',
    paddingY: '1.5rem',
    paddingYScrolled: '1rem',
    borderRadius: '9999px',
    alignment: 'center',
  },
  'Apple Dark': {
    style: 'glass',
    backgroundColor: '#000000',
    textColor: '#f5f5f7',
    primaryColor: '#0071e3',
    paddingY: '0.75rem',
    paddingYScrolled: '0.75rem',
    sticky: true,
  },
  'Retro Brutalist': {
    style: 'brutalist',
    backgroundColor: '#FFDE00',
    textColor: '#000000',
    primaryColor: '#000000',
    borderRadius: '0px',
    paddingY: '1.5rem',
  },
  'SaaS Modern': {
    style: 'modern',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    primaryColor: '#6366f1',
    borderRadius: '0.75rem',
    paddingY: '1rem',
    sticky: true,
    shrinkOnScroll: true,
    fullWidth: false,
    alignment: 'between',
  },
  'Minimalist Clean': {
    style: 'minimal',
    backgroundColor: '#ffffff',
    textColor: '#000000',
    primaryColor: '#000000',
    borderRadius: '0px',
    paddingY: '1.5rem',
    borderWidth: '0px',
    alignment: 'center',
  },
  'E-commerce Hero': {
    style: 'floating',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    primaryColor: '#e11d48',
    borderRadius: '1rem',
    paddingY: '1rem',
    alignment: 'between',
    fullWidth: false,
  }
};
