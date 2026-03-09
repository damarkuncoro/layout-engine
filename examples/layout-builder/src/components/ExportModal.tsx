import React from 'react'
import { Box } from '@damarkuncoro/layout-engine-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { LayoutConfig } from '../types'

interface ExportModalProps {
  config: LayoutConfig;
  onClose: () => void;
}

export function ExportModal({ config, onClose }: ExportModalProps) {
  return (
    <Box 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        backgroundColor: 'rgba(0,0,0,0.5)', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        zIndex: 50,
        padding: '2rem'
      }}
      onClick={onClose}
    >
      <Box 
        style={{ 
          backgroundColor: '#1e1e1e', 
          borderRadius: '0.5rem', 
          width: '100%', 
          maxWidth: '800px', 
          maxHeight: '80vh', 
          overflow: 'hidden',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
        }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <Box style={{ padding: '1rem', borderBottom: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box tag="h2" style={{ color: '#fff', fontSize: '1.125rem', fontWeight: 'bold', margin: 0 }}>Exported JSON</Box>
          <Box 
            tag="button" 
            onClick={onClose}
            style={{ color: '#9ca3af', cursor: 'pointer', border: 'none', background: 'none', fontSize: '1.5rem' }}
          >
            ×
          </Box>
        </Box>
        <Box style={{ padding: '1rem', overflow: 'auto', maxHeight: 'calc(80vh - 4rem)' }}>
          <SyntaxHighlighter language="json" style={vscDarkPlus}>
            {JSON.stringify(config, null, 2)}
          </SyntaxHighlighter>
        </Box>
      </Box>
    </Box>
  )
}
