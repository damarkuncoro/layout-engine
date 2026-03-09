import React from 'react'
import { Box, Flex, Stack, Sidebar } from '@damarkuncoro/layout-engine-react'
import { LayoutDashboard, Layers, Trash2, Plus, Type, AlignLeft, AlignCenter, AlignRight, BoxSelect } from 'lucide-react'
import { LayoutConfig, LayoutElement } from '../types'

interface EditorSidebarProps {
  config: LayoutConfig;
  updateConfig: (updates: Partial<LayoutConfig>) => void;
  updateElement: (id: string, updates: Partial<LayoutElement>) => void;
  addElement: () => void;
  removeElement: (id: string) => void;
  addPreset: (type: '3-cols' | 'hero' | 'sidebar') => void;
  selectedElementId: string | null;
}

export function EditorSidebar({
  config,
  updateConfig,
  updateElement,
  addElement,
  removeElement,
  addPreset,
  selectedElementId,
}: EditorSidebarProps) {
  React.useEffect(() => {
    if (selectedElementId) {
      const element = document.getElementById(`editor-item-${selectedElementId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedElementId]);

  const selectedElement = config.children.find(el => el.id === selectedElementId);

  return (
    <Sidebar
      width="300px"
      style={{ borderRight: '1px solid #e5e7eb' }}
    >
      <Sidebar.Header>
        <Box tag="h2" style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>Layout Settings</Box>
      </Sidebar.Header>

      <Sidebar.Content>
        {selectedElement && (
          <Sidebar.Group title="Selected Element">
            <Box style={{ padding: '0 1.5rem 1.5rem' }}>
              <Stack gap="1rem">
                <Box>
                  <Box tag="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: '700', color: '#3b82f6', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    <Type size={14} /> Typography
                  </Box>
                  <Flex gap="0.5rem">
                    <input
                      type="text"
                      value={selectedElement.fontSize || '1rem'}
                      onChange={(e) => updateElement(selectedElement.id, { fontSize: e.target.value })}
                      placeholder="Size (e.g. 1rem)"
                      style={{ flex: 1, padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '0.875rem' }}
                    />
                    <Flex style={{ border: '1px solid #d1d5db', borderRadius: '0.375rem', overflow: 'hidden' }}>
                      {[
                        { id: 'left', icon: AlignLeft },
                        { id: 'center', icon: AlignCenter },
                        { id: 'right', icon: AlignRight }
                      ].map((align) => (
                        <Box 
                          key={align.id}
                          tag="button"
                          onClick={() => updateElement(selectedElement.id, { textAlign: align.id as any })}
                          style={{ 
                            padding: '0.5rem', 
                            border: 'none', 
                            backgroundColor: selectedElement.textAlign === align.id ? '#eff6ff' : '#ffffff',
                            color: selectedElement.textAlign === align.id ? '#3b82f6' : '#6b7280',
                            cursor: 'pointer'
                          }}
                        >
                          <align.icon size={16} />
                        </Box>
                      ))}
                    </Flex>
                  </Flex>
                </Box>

                <Flex gap="1rem">
                  <Box style={{ flex: 1 }}>
                    <Box tag="label" style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Radius</Box>
                    <input
                      type="text"
                      value={selectedElement.borderRadius || '0.5rem'}
                      onChange={(e) => updateElement(selectedElement.id, { borderRadius: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '0.875rem' }}
                    />
                  </Box>
                  <Box style={{ flex: 1 }}>
                    <Box tag="label" style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Padding</Box>
                    <input
                      type="text"
                      value={selectedElement.padding || '1rem'}
                      onChange={(e) => updateElement(selectedElement.id, { padding: e.target.value })}
                      style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '0.875rem' }}
                    />
                  </Box>
                </Flex>

                <Box tag="hr" style={{ border: 'none', borderTop: '1px solid #f3f4f6', margin: '0.5rem 0' }} />

                <Box>
                  <Box tag="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                    <BoxSelect size={14} /> Advanced Styles
                  </Box>
                  <Stack gap="0.75rem">
                    <Box>
                      <Box tag="label" style={{ display: 'block', fontSize: '0.7rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Custom Class Name</Box>
                      <input
                        type="text"
                        value={selectedElement.className || ''}
                        onChange={(e) => updateElement(selectedElement.id, { className: e.target.value })}
                        placeholder="e.g. custom-card shadow-lg"
                        style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '0.875rem' }}
                      />
                    </Box>
                    <Flex gap="0.75rem">
                      <Box style={{ flex: 1 }}>
                        <Box tag="label" style={{ display: 'block', fontSize: '0.7rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Position</Box>
                        <select
                          value={selectedElement.position || 'relative'}
                          onChange={(e) => updateElement(selectedElement.id, { position: e.target.value as any })}
                          style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '0.875rem' }}
                        >
                          <option value="static">Static</option>
                          <option value="relative">Relative</option>
                          <option value="absolute">Absolute</option>
                          <option value="fixed">Fixed</option>
                          <option value="sticky">Sticky</option>
                        </select>
                      </Box>
                      <Box style={{ flex: 1 }}>
                        <Box tag="label" style={{ display: 'block', fontSize: '0.7rem', color: '#9ca3af', marginBottom: '0.25rem' }}>Z-Index</Box>
                        <input
                          type="number"
                          value={selectedElement.zIndex || 0}
                          onChange={(e) => {
                            const val = parseInt(e.target.value);
                            updateElement(selectedElement.id, { zIndex: isNaN(val) ? 0 : val });
                          }}
                          style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '0.875rem' }}
                        />
                      </Box>
                    </Flex>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </Sidebar.Group>
        )}

        <Sidebar.Group title="Quick Templates">
          <Box style={{ padding: '0 1.5rem 1.5rem' }}>
            <Flex gap="0.5rem" wrap="wrap">
              {[
                { id: '3-cols', label: '3 Columns' },
                { id: 'hero', label: 'Hero Section' }
              ].map((p) => (
                <Box 
                  key={p.id}
                  tag="button"
                  onClick={() => addPreset(p.id as any)}
                  style={{ 
                    padding: '0.4rem 0.8rem', 
                    fontSize: '0.75rem', 
                    borderRadius: '0.375rem', 
                    border: '1px solid #e5e7eb',
                    backgroundColor: '#ffffff',
                    cursor: 'pointer'
                  }}
                >
                  {p.label}
                </Box>
              ))}
            </Flex>
          </Box>
        </Sidebar.Group>

        <Sidebar.Group title="Global Settings">
          <Box style={{ padding: '0 1.5rem 1.5rem' }}>
            <Stack gap="1.5rem">
              <Box>
                <Box tag="label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.75rem', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  <LayoutDashboard size={14} /> Direction
                </Box>
                <select
                  value={config.direction}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => updateConfig({ direction: e.target.value as 'row' | 'column' })}
                  style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', backgroundColor: '#f9fafb' }}
                >
                  <option value="row">Row (Horizontal)</option>
                  <option value="column">Column (Vertical)</option>
                </select>
              </Box>
              
              <Flex gap="1rem">
                <Box style={{ flex: 1 }}>
                  <Box tag="label" style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Gap</Box>
                  <input
                    type="text"
                    value={config.gap}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateConfig({ gap: e.target.value })}
                    style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', backgroundColor: '#f9fafb' }}
                  />
                </Box>
                <Box style={{ flex: 1 }}>
                  <Box tag="label" style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Padding</Box>
                  <input
                    type="text"
                    value={config.padding}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateConfig({ padding: e.target.value })}
                    style={{ width: '100%', padding: '0.625rem', border: '1px solid #d1d5db', borderRadius: '0.5rem', backgroundColor: '#f9fafb' }}
                  />
                </Box>
              </Flex>
            </Stack>
          </Box>
        </Sidebar.Group>
        
        <Sidebar.Group title={`Elements (${config.children.length})`}>
          <Box style={{ padding: '0 1.5rem 1.5rem' }}>
            <Stack gap="0.75rem">
              {config.children.map((el) => (
                <Box 
                  key={el.id} 
                  id={`editor-item-${el.id}`}
                  style={{ 
                    padding: '1rem', 
                    border: `2px solid ${selectedElementId === el.id ? '#3b82f6' : '#e5e7eb'}`, 
                    borderRadius: '0.75rem', 
                    backgroundColor: '#ffffff',
                    transition: 'border-color 0.2s ease'
                  }}
                >
                  <Flex align="center" justify="space-between" style={{ marginBottom: '0.75rem' }}>
                    <Flex align="center" gap="0.5rem">
                      <Layers size={14} className={selectedElementId === el.id ? "text-blue-500" : "text-gray-400"} />
                      <Box tag="span" style={{ fontWeight: '600', fontSize: '0.875rem' }}>Element {el.id}</Box>
                    </Flex>
                    <Box 
                      tag="button" 
                      onClick={() => removeElement(el.id)}
                      style={{ color: '#ef4444', cursor: 'pointer', border: 'none', background: 'none', padding: '0.25rem' }}
                      title="Delete Element"
                    >
                      <Trash2 size={14} />
                    </Box>
                  </Flex>
                  <Stack gap="0.75rem">
                    <input
                      type="text"
                      value={el.content}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateElement(el.id, { content: e.target.value })}
                      placeholder="Element content..."
                      style={{ width: '100%', padding: '0.5rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', fontSize: '0.875rem' }}
                    />
                    <Flex align="center" gap="0.5rem">
                      <input
                        type="color"
                        value={el.backgroundColor}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateElement(el.id, { backgroundColor: e.target.value })}
                        style={{ width: '2rem', height: '2rem', border: 'none', borderRadius: '0.25rem', cursor: 'pointer', padding: 0 }}
                      />
                      <Box tag="span" style={{ fontSize: '0.75rem', color: '#6b7280', fontFamily: 'monospace' }}>{el.backgroundColor}</Box>
                    </Flex>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Box>
        </Sidebar.Group>
      </Sidebar.Content>

      <Sidebar.Footer>
        <Box 
          tag="button" 
          onClick={addElement}
          style={{ 
            width: '100%', 
            padding: '0.75rem', 
            backgroundColor: '#3b82f6', 
            color: '#ffffff', 
            border: 'none', 
            borderRadius: '0.5rem', 
            cursor: 'pointer', 
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          <Plus size={18} /> Add New Element
        </Box>
      </Sidebar.Footer>
    </Sidebar>
  )
}
