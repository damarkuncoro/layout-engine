
import { useState } from 'react';
import { Box, Flex } from "@damarkuncoro/layout-engine-react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { X, Copy, Check } from 'lucide-react';
import { generateLayoutEngineCode, generateTailwindCode } from '../../utils/codeGenerator';
import { HeroConfig } from '../../types';

interface CodeModalProps {
  show: boolean;
  onClose: () => void;
  config: HeroConfig;
}

export function CodeModal({ show, onClose, config }: CodeModalProps) {
  const [codeType, setCodeType] = useState<'le' | 'tailwind'>('le');
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const code = codeType === 'le' ? generateLayoutEngineCode(config) : generateTailwindCode(config);

  if (!show) return null;

  return (
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
          <Box tag="button" onClick={onClose} style={{ padding: '8px', border: 'none', backgroundColor: 'transparent', cursor: 'pointer', borderRadius: '50%' }}>
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
            onClick={onClose}
            style={{ padding: '8px 24px', backgroundColor: '#4f46e5', color: '#fff', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.875rem', border: 'none', cursor: 'pointer' }}
          >
            Close
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
