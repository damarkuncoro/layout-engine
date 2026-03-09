import { useState } from 'react';
import { HeroPreview } from './components/HeroPreview';
import { DEFAULT_HERO_CONFIG } from './types';
import { useHeroConfig } from './hooks/useHeroConfig';

// Import Layout Engine Components
import { 
  Box,
  DashboardLayout,
  renderNodeToReact
} from "@damarkuncoro/layout-engine-react";
import { Navbar } from '@damarkuncoro/navbar-engine';

// Import App Components
import { EditorSidebar } from './components/layout/EditorSidebar';
import { CodeModal } from './components/modals/CodeModal';
import { Monitor, Smartphone, Tablet } from 'lucide-react';

function App() {
  const { config, updateConfig } = useHeroConfig(DEFAULT_HERO_CONFIG);
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [activeTab, setActiveTab] = useState<'layout' | 'style' | 'content'>('layout');
  const [showCode, setShowCode] = useState(false);

  const sidebar = (
    <EditorSidebar 
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      config={config}
      updateConfig={updateConfig}
      setShowCode={setShowCode}
    />
  );

  const navbarNode = Navbar({
    children: [
      Navbar.Brand({
        children: <Box>HeroCraft</Box>
      }),
      Navbar.Menu({}),
      Navbar.End({
        children: (
          <Box style={{ display: 'flex', backgroundColor: '#f3f4f6', padding: '4px', borderRadius: '8px' }}>
            {([ 'desktop', 'tablet', 'mobile' ] as const).map((v) => (
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
        )
      })
    ]
  });

  const header = renderNodeToReact(navbarNode);

  const main = (
    <HeroPreview config={config} viewport={viewport} />
  );

  const sidebarWidth = viewport === 'desktop' ? '320px' : viewport === 'tablet' ? '280px' : '0px';

  return (
    <Box>
      <DashboardLayout
        sidebar={sidebar}
        header={header}
        sidebarWidth={sidebarWidth}
      >
        {main}
      </DashboardLayout>

      <CodeModal 
        show={showCode} 
        onClose={() => setShowCode(false)} 
        config={config} 
      />
    </Box>
  );
}

export default App;
