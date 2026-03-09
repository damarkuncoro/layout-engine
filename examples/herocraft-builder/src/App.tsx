import { useState } from 'react';
import { HeroPreview } from './components/HeroPreview';
import { DEFAULT_HERO_CONFIG, HeroStyle } from './types';
import { generateLayoutEngineCode, generateTailwindCode } from './utils/codeGenerator';
import { useHeroConfig } from './hooks/useHeroConfig';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  Settings2, 
  Layout, 
  Image as ImageIcon,
  Palette,
  Type,
  X,
  Code2,
  Copy,
  Check
} from 'lucide-react';

// Import Layout Engine Components
import { 
  Box, 
  Flex, 
  Stack, 
  DashboardLayout,
  renderNodeToReact
} from "@damarkuncoro/layout-engine-react";
import { Sidebar } from "@damarkuncoro/sidebar-engine";

function App() {
  const { config, updateConfig } = useHeroConfig(DEFAULT_HERO_CONFIG);
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [activeTab, setActiveTab] = useState<'layout' | 'style' | 'content'>('layout');
  const [showCode, setShowCode] = useState(false);
  const [codeType, setCodeType] = useState<'le' | 'tailwind'>('le');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const code = codeType === 'le' ? generateLayoutEngineCode(config) : generateTailwindCode(config);

  // --- Sub-layouts ---

  const sidebarNode = Sidebar({
    background: '#fff',
    children: [
      Sidebar.Header({
        children: (
          <Flex align="center" gap="12px">
            <Box style={{ width: '32px', height: '32px', backgroundColor: '#4f46e5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
              H
            </Box>
            <Box tag="h1" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>HeroCraft</Box>
          </Flex>
        )
      }),

      Sidebar.Group({
        title: "Navigation",
        children: [
          Sidebar.Item({ 
            label: "Layout", 
            icon: <Layout size={18} />, 
            active: activeTab === 'layout',
            onClick: () => setActiveTab('layout')
          } as any),
          Sidebar.Item({ 
            label: "Style", 
            icon: <Palette size={18} />, 
            active: activeTab === 'style',
            onClick: () => setActiveTab('style')
          } as any),
          Sidebar.Item({ 
            label: "Content", 
            icon: <Type size={18} />, 
            active: activeTab === 'content',
            onClick: () => setActiveTab('content')
          } as any)
        ]
      }),

      <Box key="content" style={{ flex: 1, overflowY: 'auto', padding: '24px', borderTop: '1px solid #f3f4f6' }}>
        {activeTab === 'layout' && (
          <Stack gap="24px">
            <Box tag="section">
              <Flex gap="8px" align="center" style={{ marginBottom: '12px' }}>
                <Layout size={16} color="#4f46e5" />
                <Box style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Layout Variants</Box>
              </Flex>
              <Box style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {[
                  { id: 'split', label: 'Split Hero' },
                  { id: 'centered', label: 'Centered Hero' },
                  { id: 'fullscreen', label: 'Fullscreen' },
                  { id: 'background', label: 'Background Image' },
                  { id: 'video', label: 'Video Background' },
                  { id: 'product', label: 'Product Showcase' },
                  { id: 'minimal', label: 'Minimal Hero' },
                  { id: 'form', label: 'Hero with Form' },
                  { id: 'stats', label: 'Hero with Stats' },
                  { id: 'illustration', label: 'Illustration Hero' },
                  { id: 'cards', label: 'Card Hero' },
                  { id: 'app-preview', label: 'App Preview' }
                ].map((v) => (
                  <Box 
                    tag="button"
                    key={v.id}
                    onClick={() => updateConfig({ variant: v.id as any })}
                    style={{ 
                      padding: '8px 12px', 
                      fontSize: '10px', 
                      fontWeight: 'bold', 
                      borderRadius: '8px', 
                      border: config.variant === v.id ? '2px solid #4f46e5' : '2px solid #f3f4f6',
                      backgroundColor: config.variant === v.id ? '#eef2ff' : '#fff',
                      color: config.variant === v.id ? '#4338ca' : '#1f2937',
                      textAlign: 'left',
                      cursor: 'pointer'
                    }}
                  >
                    {v.label}
                  </Box>
                ))}
              </Box>
            </Box>

            <Box tag="section">
              <Flex gap="8px" align="center" style={{ marginBottom: '12px' }}>
                <Settings2 size={16} color="#4f46e5" />
                <Box style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Base Style</Box>
              </Flex>
              <Box style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {(['modern', 'glass', 'brutalist', 'minimal'] as HeroStyle[]).map((s) => (
                  <Box 
                    tag="button"
                    key={s}
                    onClick={() => updateConfig({ style: s })}
                    style={{ 
                      padding: '8px 12px', 
                      fontSize: '0.875rem', 
                      borderRadius: '8px', 
                      border: config.style === s ? '2px solid #4f46e5' : '2px solid #f3f4f6',
                      backgroundColor: config.style === s ? '#eef2ff' : '#fff',
                      color: config.style === s ? '#4338ca' : '#1f2937',
                      textTransform: 'capitalize',
                      cursor: 'pointer'
                    }}
                  >
                    {s}
                  </Box>
                ))}
              </Box>
            </Box>

            <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '12px' }}>
              <Box tag="span" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Reverse Layout</Box>
              <Box 
                tag="button" 
                onClick={() => updateConfig({ reverse: !config.reverse })}
                style={{ 
                  width: '40px', 
                  height: '20px', 
                  borderRadius: '999px', 
                  border: 'none',
                  position: 'relative',
                  cursor: 'pointer',
                  backgroundColor: config.reverse ? '#4f46e5' : '#e5e7eb'
                }}
              >
                <Box style={{ 
                  position: 'absolute', 
                  top: '4px', 
                  left: config.reverse ? '24px' : '4px', 
                  width: '12px', 
                  height: '12px', 
                  backgroundColor: '#fff', 
                  borderRadius: '50%', 
                  transition: 'all 0.2s' 
                }} />
              </Box>
            </Box>
          </Stack>
        )}

        {activeTab === 'style' && (
          <Stack gap="24px">
            <Box tag="section">
              <Flex gap="8px" align="center" style={{ marginBottom: '16px' }}>
                <Palette size={16} color="#4f46e5" />
                <Box style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Colors & Radius</Box>
              </Flex>
              <Stack gap="16px">
                <Flex align="center" justify="space-between">
                  <Box tag="span" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Background</Box>
                  <input type="color" value={config.backgroundColor} onChange={(e) => updateConfig({ backgroundColor: e.target.value })} style={{ width: '32px', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
                </Flex>
                <Flex align="center" justify="space-between">
                  <Box tag="span" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Primary Color</Box>
                  <input type="color" value={config.primaryColor} onChange={(e) => updateConfig({ primaryColor: e.target.value })} style={{ width: '32px', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
                </Flex>
                <Flex align="center" justify="space-between">
                  <Box tag="span" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Text Color</Box>
                  <input type="color" value={config.textColor} onChange={(e) => updateConfig({ textColor: e.target.value })} style={{ width: '32px', height: '32px', border: 'none', borderRadius: '4px', cursor: 'pointer' }} />
                </Flex>
                <Box>
                  <Flex justify="space-between" style={{ marginBottom: '8px' }}>
                    <Box tag="span" style={{ fontSize: '0.875rem', fontWeight: 500 }}>Border Radius</Box>
                    <Box tag="span" style={{ fontSize: '0.75rem', color: '#9ca3af' }}>{config.borderRadius}</Box>
                  </Flex>
                  <input type="range" min="0" max="3" step="0.1" value={parseFloat(config.borderRadius)} onChange={(e) => updateConfig({ borderRadius: `${e.target.value}rem` })} style={{ width: '100%', accentColor: '#4f46e5' }} />
                </Box>
              </Stack>
            </Box>
          </Stack>
        )}

        {activeTab === 'content' && (
          <Stack gap="24px">
            <Box tag="section">
              <Flex gap="8px" align="center" style={{ marginBottom: '16px' }}>
                <Type size={16} color="#4f46e5" />
                <Box style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Text Content</Box>
              </Flex>
              <Stack gap="12px">
                <Stack gap="4px">
                  <Box tag="span" style={{ fontSize: '0.75rem', fontWeight: 500, color: '#6b7280' }}>Title</Box>
                  <textarea value={config.title} onChange={(e) => updateConfig({ title: e.target.value })} style={{ width: '100%', padding: '8px 12px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '0.875rem', minHeight: '80px', outline: 'none' }} />
                </Stack>
                <Stack gap="4px">
                  <Box tag="span" style={{ fontSize: '0.75rem', fontWeight: 500, color: '#6b7280' }}>Description</Box>
                  <textarea value={config.description} onChange={(e) => updateConfig({ description: e.target.value })} style={{ width: '100%', padding: '8px 12px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '0.875rem', minHeight: '96px', outline: 'none' }} />
                </Stack>
              </Stack>
            </Box>

            <Box tag="section">
              <Flex gap="8px" align="center" style={{ marginBottom: '16px' }}>
                <ImageIcon size={16} color="#4f46e5" />
                <Box style={{ fontSize: '0.75rem', fontWeight: 'bold', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Visual Asset</Box>
              </Flex>
              <Box style={{ display: 'flex', padding: '4px', backgroundColor: '#f3f4f6', borderRadius: '8px', marginBottom: '8px' }}>
                {(['image', 'none'] as const).map((t) => (
                  <Box 
                    tag="button"
                    key={t}
                    onClick={() => updateConfig({ visualType: t })}
                    style={{ 
                      flex: 1, 
                      padding: '6px 0', 
                      fontSize: '0.75rem', 
                      fontWeight: 'bold', 
                      borderRadius: '6px', 
                      border: 'none',
                      cursor: 'pointer',
                      backgroundColor: config.visualType === t ? '#fff' : 'transparent',
                      color: config.visualType === t ? '#4f46e5' : '#6b7280',
                      textTransform: 'capitalize'
                    }}
                  >
                    {t}
                  </Box>
                ))}
              </Box>
              {config.visualType === 'image' && (
                <input type="text" value={config.visualUrl} onChange={(e) => updateConfig({ visualUrl: e.target.value })} placeholder="Image URL..." style={{ width: '100%', padding: '8px 12px', backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', fontSize: '0.75rem', outline: 'none' }} />
              )}
            </Box>
          </Stack>
        )}
      </Box>,

      Sidebar.Footer({
        children: (
          <Box 
            tag="button"
            onClick={() => setShowCode(true)}
            style={{ 
              width: '100%', 
              padding: '12px 0', 
              backgroundColor: '#4f46e5', 
              color: '#fff', 
              borderRadius: '12px', 
              fontWeight: 'bold', 
              fontSize: '0.875rem', 
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 10px 15px -3px rgba(79, 70, 229, 0.1)'
            }}
          >
            <Code2 size={18} />
            View Code
          </Box>
        )
      })
    ]
  });

  const sidebar = renderNodeToReact(sidebarNode);

  const header = (
    <Box style={{ height: '64px', backgroundColor: '#fff', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px' }}>
      <Flex gap="8px" align="center">
        <Box tag="span" style={{ fontSize: '0.875rem', fontWeight: 600, color: '#6b7280' }}>Viewport:</Box>
        <Box style={{ display: 'flex', backgroundColor: '#f3f4f6', padding: '4px', borderRadius: '8px' }}>
          {(['desktop', 'tablet', 'mobile'] as const).map((v) => (
            <Box 
              tag="button"
              key={v}
              onClick={() => setViewport(v)}
              style={{ 
                padding: '6px', 
                borderRadius: '6px', 
                border: 'none',
                cursor: 'pointer',
                backgroundColor: viewport === v ? '#fff' : 'transparent',
                color: viewport === v ? '#4f46e5' : '#9ca3af',
                boxShadow: viewport === v ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' : 'none'
              }}
            >
              {v === 'desktop' && <Monitor size={18} />}
              {v === 'tablet' && <Tablet size={18} />}
              {v === 'mobile' && <Smartphone size={18} />}
            </Box>
          ))}
        </Box>
      </Flex>
      
      <Flex gap="16px" align="center">
        <Box style={{ padding: '4px 12px', backgroundColor: '#f0fdf4', color: '#16a34a', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Box style={{ width: '6px', height: '6px', backgroundColor: '#22c55e', borderRadius: '50%' }} />
          Live Preview
        </Box>
      </Flex>
    </Box>
  );

  const main = (
    <Box style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
      <HeroPreview config={config} viewport={viewport} />
    </Box>
  );

  return (
    <Box style={{ height: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif' }}>
      <DashboardLayout
        sidebar={sidebar}
        header={header}
        sidebarWidth="320px"
      >
        {main}
      </DashboardLayout>

      {/* Code Modal */}
      {showCode && (
        <Box style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px' }}>
          <Box style={{ backgroundColor: '#fff', borderRadius: '16px', width: '100%', maxWidth: '896px', maxHeight: '80vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}>
            <Box style={{ padding: '24px', borderBottom: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Flex gap="16px" align="center">
                <Box tag="h2" style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>Export Code</Box>
                <Box style={{ display: 'flex', backgroundColor: '#f3f4f6', padding: '4px', borderRadius: '8px' }}>
                  <Box 
                    tag="button"
                    onClick={() => setCodeType('le')}
                    style={{ padding: '6px 16px', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: codeType === 'le' ? '#fff' : 'transparent', color: codeType === 'le' ? '#4f46e5' : '#6b7280' }}
                  >
                    Layout Engine
                  </Box>
                  <Box 
                    tag="button"
                    onClick={() => setCodeType('tailwind')}
                    style={{ padding: '6px 16px', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '6px', border: 'none', cursor: 'pointer', backgroundColor: codeType === 'tailwind' ? '#fff' : 'transparent', color: codeType === 'tailwind' ? '#4f46e5' : '#6b7280' }}
                  >
                    Tailwind CSS
                  </Box>
                </Box>
              </Flex>
              <Box tag="button" onClick={() => setShowCode(false)} style={{ padding: '8px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', borderRadius: '50%' }}>
                <X size={20} />
              </Box>
            </Box>
            
            <Box style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
              <Box style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10 }}>
                <Box 
                  tag="button"
                  onClick={() => copyToClipboard(code)}
                  style={{ padding: '8px 12px', backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', border: 'none', borderRadius: '8px', backdropFilter: 'blur(8px)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', fontWeight: 'bold' }}
                >
                  {copied ? <Check size={14} color="#4ade80" /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy Code'}
                </Box>
              </Box>
              <Box style={{ height: '100%', overflow: 'auto' }}>
                <SyntaxHighlighter 
                  language="tsx" 
                  style={vscDarkPlus}
                  customStyle={{ margin: 0, height: '100%', fontSize: '13px' }}
                >
                  {code}
                </SyntaxHighlighter>
              </Box>
            </Box>
            
            <Box style={{ padding: '24px', backgroundColor: '#f9fafb', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'flex-end' }}>
              <Box 
                tag="button"
                onClick={() => setShowCode(false)}
                style={{ padding: '8px 24px', backgroundColor: '#4f46e5', color: '#fff', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.875rem', border: 'none', cursor: 'pointer' }}
              >
                Close
              </Box>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default App;
