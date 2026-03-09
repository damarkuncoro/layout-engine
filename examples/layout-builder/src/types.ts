export interface LayoutConfig {
  direction: 'row' | 'column';
  gap: string;
  padding: string;
  backgroundColor: string;
  children: LayoutElement[];
}

export interface LayoutElement {
  id: string;
  type: 'box' | 'flex' | 'stack';
  content?: string;
  backgroundColor?: string;
  padding?: string;
  gap?: string;
  direction?: 'row' | 'column';
  borderRadius?: string;
  textAlign?: 'left' | 'center' | 'right';
  fontSize?: string;
  color?: string;
  className?: string;
  zIndex?: number;
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
}

export const DEFAULT_LAYOUT_CONFIG: LayoutConfig = {
  direction: 'column',
  gap: '1rem',
  padding: '2rem',
  backgroundColor: '#f3f4f6',
  children: [
    {
      id: '1',
      type: 'box',
      content: 'Hello, Layout Builder!',
      backgroundColor: '#ffffff',
      padding: '1rem',
    },
    {
      id: '2',
      type: 'box',
      content: 'This is a basic layout example.',
      backgroundColor: '#ffffff',
      padding: '1rem',
    },
  ],
};
