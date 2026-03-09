
import { ReactNode } from 'react';
import { Box, Flex, renderNodeToReact } from "@damarkuncoro/layout-engine-react";
import { Sidebar } from "@damarkuncoro/sidebar-engine";
import { Layout, Palette, Type, Code2 } from 'lucide-react';
import { EditorPanel } from '../views/EditorPanel';
import { HeroConfig } from '../../types';

interface EditorSidebarProps {
  activeTab: 'layout' | 'style' | 'content';
  setActiveTab: (tab: 'layout' | 'style' | 'content') => void;
  config: HeroConfig;
  updateConfig: (updates: Partial<HeroConfig>) => void;
  setShowCode: (show: boolean) => void;
}

export function EditorSidebar({ activeTab, setActiveTab, config, updateConfig, setShowCode }: EditorSidebarProps): ReactNode {
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

      // <EditorPanel 
      //   key="editor-panel"
      //   activeTab={activeTab} 
      //   config={config} 
      //   updateConfig={updateConfig} 
      // />,

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

  return renderNodeToReact(sidebarNode);
}
