import { useState } from 'react'
import { Box, Flex, DashboardLayout } from '@damarkuncoro/layout-engine-react'
import { Monitor, Tablet, Smartphone, CornerUpLeft } from 'lucide-react'
import { useLayoutConfig } from './hooks/useLayoutConfig'
import { EditorSidebar } from './components/EditorSidebar'
import { LayoutPreview } from './components/LayoutPreview'
import { ExportModal } from './components/ExportModal'

export type ViewportSize = 'mobile' | 'tablet' | 'desktop';

function App() {
  const {
    config,
    updateConfig,
    updateElement,
    addElement,
    removeElement,
    addPreset,
    undo,
    canUndo
  } = useLayoutConfig()
  
  const [showJSON, setShowJSON] = useState(false)
  const [viewport, setViewport] = useState<ViewportSize>('desktop')
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null)

  const sidebar = (
    <EditorSidebar 
      config={config}
      updateConfig={updateConfig}
      updateElement={updateElement}
      addElement={addElement}
      removeElement={removeElement}
      addPreset={addPreset}
      selectedElementId={selectedElementId}
    />
  )

  const header = (
    <Box style={{ padding: '0.5rem 1rem', backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb' }}>
      <Flex align="center" justify="space-between">
        <Flex align="center" gap="1rem">
          <Box tag="h1" style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>Layout Builder</Box>
          <Box 
            tag="button" 
            onClick={undo}
            disabled={!canUndo}
            style={{ 
              padding: '0.4rem 0.8rem', 
              backgroundColor: canUndo ? '#f3f4f6' : '#f9fafb', 
              color: canUndo ? '#374151' : '#d1d5db', 
              border: '1px solid #e5e7eb', 
              borderRadius: '0.375rem', 
              cursor: canUndo ? 'pointer' : 'not-allowed',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontSize: '0.875rem'
            }}
          >
            <CornerUpLeft size={16} /> Undo
          </Box>
        </Flex>
        
        <Flex gap="0.5rem" align="center" style={{ backgroundColor: '#f3f4f6', padding: '0.25rem', borderRadius: '0.5rem' }}>
          {[
            { id: 'mobile', icon: Smartphone, label: 'Mobile' },
            { id: 'tablet', icon: Tablet, label: 'Tablet' },
            { id: 'desktop', icon: Monitor, label: 'Desktop' }
          ].map((v) => (
            <Box 
              key={v.id}
              tag="button"
              onClick={() => setViewport(v.id as ViewportSize)}
              style={{ 
                padding: '0.5rem', 
                borderRadius: '0.375rem', 
                border: 'none',
                cursor: 'pointer',
                backgroundColor: viewport === v.id ? '#ffffff' : 'transparent',
                boxShadow: viewport === v.id ? '0 1px 3px 0 rgba(0, 0, 0, 0.1)' : 'none',
                color: viewport === v.id ? '#3b82f6' : '#6b7280',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
              title={v.label}
            >
              <v.icon size={18} />
              <Box tag="span" style={{ fontSize: '0.75rem', fontWeight: '600', display: viewport === v.id ? 'block' : 'none' }}>{v.label}</Box>
            </Box>
          ))}
        </Flex>

        <Box 
          tag="button" 
          onClick={() => setShowJSON(true)}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#10b981', color: '#ffffff', border: 'none', borderRadius: '0.375rem', cursor: 'pointer', fontWeight: '500' }}
        >
          Export JSON
        </Box>
      </Flex>
    </Box>
  )

  return (
    <DashboardLayout
      sidebar={sidebar}
      header={header}
      sidebarWidth="300px"
    >
      <LayoutPreview 
        config={config} 
        viewport={viewport} 
        onSelectElement={setSelectedElementId}
        selectedElementId={selectedElementId}
      />
      
      {showJSON && (
        <ExportModal 
          config={config} 
          onClose={() => setShowJSON(false)} 
        />
      )}
    </DashboardLayout>
  )
}

export default App
