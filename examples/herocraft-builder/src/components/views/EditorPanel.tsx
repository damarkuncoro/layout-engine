
import { Box, Flex, Stack } from "@damarkuncoro/layout-engine-react";
import { HeroConfig, HeroStyle } from "../../types";
import { Layout, Palette, Settings2, Type, ImageIcon } from "lucide-react";

interface EditorPanelProps {
  activeTab: 'layout' | 'style' | 'content';
  config: HeroConfig;
  updateConfig: (updates: Partial<HeroConfig>) => void;
}

export function EditorPanel({ activeTab, config, updateConfig }: EditorPanelProps) {
  return (
    <Box style={{ flex: 1, overflowY: 'auto', padding: '24px', borderTop: '1px solid #f3f4f6' }}>
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
    </Box>
  );
}
