export type SidebarStyle = 'minimal' | 'glass' | 'brutalist' | 'modern' | 'floating';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: string;
  href: string;
  badge?: string | number;
  children?: SidebarItem[];
}

export interface SidebarGroup {
  id: string;
  title?: string;
  items: SidebarItem[];
}

export interface SidebarConfig {
  style: SidebarStyle;
  width: string;
  collapsed: boolean;
  collapsible: boolean;
  groups: SidebarGroup[];
  header?: {
    logoText?: string;
    logoType: 'text' | 'image';
    logoUrl?: string;
  };
  footer?: {
    show: boolean;
    text?: string;
  };
  theme: 'light' | 'dark' | 'custom';
  backgroundColor: string;
  textColor: string;
  primaryColor: string;
  borderColor: string;
  borderWidth: string;
  padding: string;
  pageContext: 'empty' | 'dashboard' | 'landing' | 'settings' | 'docs';
  showHeader: boolean;
  showFooter: boolean;
}

export const DEFAULT_CONFIG: SidebarConfig = {
  style: 'minimal',
  width: '280px',
  collapsed: false,
  collapsible: true,
  groups: [
    {
      id: '1',
      title: 'Main',
      items: [
        { id: '1-1', label: 'Dashboard', icon: 'LayoutDashboard', href: '#' },
        { id: '1-2', label: 'Analytics', icon: 'BarChart', href: '#' },
        { id: '1-3', label: 'Customers', icon: 'Users', href: '#' }
      ]
    },
    {
      id: '2',
      title: 'Settings',
      items: [
        { id: '2-1', label: 'Profile', icon: 'User', href: '#' },
        { id: '2-2', label: 'Security', icon: 'Shield', href: '#' },
        { id: '2-3', label: 'Notifications', icon: 'Bell', href: '#' }
      ]
    }
  ],
  header: {
    logoText: 'SidebarCraft',
    logoType: 'text',
  },
  footer: {
    show: true,
    text: '© 2026 SidebarCraft',
  },
  theme: 'light',
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
  primaryColor: '#3b82f6',
  borderColor: '#e5e7eb',
  borderWidth: '1px',
  padding: '16px',
  pageContext: 'dashboard',
  showHeader: true,
  showFooter: true,
};

export const PRESETS: Record<string, Partial<SidebarConfig>> = {
  'Stripe Style': {
    style: 'minimal',
    backgroundColor: '#ffffff',
    textColor: '#4b5563',
    primaryColor: '#635bff',
    width: '260px',
    borderWidth: '0px',
  },
  'Apple Dark': {
    style: 'glass',
    backgroundColor: '#000000',
    textColor: '#f5f5f7',
    primaryColor: '#0071e3',
    borderWidth: '0px',
  },
  'Retro Brutalist': {
    style: 'brutalist',
    backgroundColor: '#FFDE00',
    textColor: '#000000',
    primaryColor: '#000000',
    borderWidth: '4px',
    borderColor: '#000000',
  },
  'SaaS Modern': {
    style: 'modern',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    primaryColor: '#6366f1',
    borderWidth: '1px',
    borderColor: '#e5e7eb',
  },
  'Minimalist Clean': {
    style: 'minimal',
    backgroundColor: '#fafafa',
    textColor: '#000000',
    primaryColor: '#000000',
    borderWidth: '0px',
    width: '240px',
  },
  'E-commerce Admin': {
    style: 'floating',
    backgroundColor: '#1f2937',
    textColor: '#ffffff',
    primaryColor: '#10b981',
    borderWidth: '0px',
    width: '300px',
  }
};