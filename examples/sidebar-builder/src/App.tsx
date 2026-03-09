import { useState } from 'react';
import { 
  Copy,
  Check,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

import { cn } from './lib/utils';
import { SidebarPreview } from './components/SidebarPreview';
import { EditorSidebar } from './components/EditorSidebar';
import { PreviewHeader } from './components/PreviewHeader';
import { useSidebarConfig } from './hooks/useSidebarConfig';
import { generateLayoutEngineCode, generateTailwindCode } from './utils/codeGenerator';

export default function App() {
  const {
    config,
    updateConfig,
    addGroup,
    addItemToGroup,
    removeGroup,
    removeItem,
    updateGroup,
    updateItem,
    handleImportJSON,
    resetConfig
  } = useSidebarConfig();

  const [activeTab, setActiveTab] = useState<'layout' | 'style' | 'items' | 'code'>('layout');
  const [subTab, setSubTab] = useState<'tailwind' | 'le'>('tailwind');
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [importJson, setImportJson] = useState('');
  const [copied, setCopied] = useState(false);
  const [copiedLE, setCopiedLE] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(generateTailwindCode(config));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLE = () => {
    navigator.clipboard.writeText(generateLayoutEngineCode(config));
    setCopiedLE(true);
    setTimeout(() => setCopiedLE(false), 2000);
  };

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex h-screen bg-[#F9FAFB] text-[#111827] font-sans overflow-hidden">
      {/* Sidebar */}
      <EditorSidebar 
        config={config}
        updateConfig={updateConfig}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isFullscreen={isFullscreen}
        importJson={importJson}
        setImportJson={setImportJson}
        handleImportJSON={(json) => handleImportJSON(json, () => setImportJson(''))}
        addGroup={addGroup}
        addItemToGroup={addItemToGroup}
        removeGroup={removeGroup}
        removeItem={removeItem}
        updateGroup={updateGroup}
        updateItem={updateItem}
        setConfig={resetConfig}
      />

      {/* Main Content / Preview */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        <PreviewHeader 
          viewport={viewport}
          setViewport={setViewport}
          isFullscreen={isFullscreen}
          setIsFullscreen={setIsFullscreen}
          showContent={showContent}
          setShowContent={setShowContent}
          resetConfig={resetConfig}
        />

        {/* Preview Area */}
        <div className="flex-1 overflow-hidden flex items-center justify-center p-8 bg-[#F3F4F6]">
          {activeTab === 'code' ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-4xl h-full bg-[#1e1e1e] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/10"
            >
              <div className="p-4 border-b border-white/10 flex items-center justify-between bg-black/20">
                <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                  <button 
                    onClick={() => setSubTab('tailwind')}
                    className={cn("flex-1 py-1.5 px-4 text-xs font-bold rounded-md transition-all", subTab === 'tailwind' ? "bg-white shadow-sm text-emerald-600" : "text-gray-500 hover:text-gray-700")}
                  >
                    Tailwind
                  </button>
                  <button 
                    onClick={() => setSubTab('le')}
                    className={cn("flex-1 py-1.5 px-4 text-xs font-bold rounded-md transition-all", subTab === 'le' ? "bg-white shadow-sm text-emerald-600" : "text-gray-500 hover:text-gray-700")}
                  >
                    Layout Engine
                  </button>
                  <button 
                    onClick={handleCopyJSON}
                    className="flex-1 py-1.5 px-4 text-xs font-bold rounded-md text-gray-500 hover:text-gray-700 transition-all flex items-center justify-center gap-1"
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    JSON
                  </button>
                </div>
                <button 
                  onClick={subTab === 'tailwind' ? handleCopy : handleCopyLE}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-bold transition-all"
                >
                  {(subTab === 'tailwind' ? copied : copiedLE) ? <Check size={14} /> : <Copy size={14} />}
                  Copy Code
                </button>
              </div>
              <div className="flex-1 overflow-auto custom-scrollbar">
                <SyntaxHighlighter
                  language="tsx"
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    padding: '2rem',
                    background: 'transparent',
                    fontSize: '13px',
                    lineHeight: '1.6',
                  }}
                >
                  {subTab === 'tailwind' ? generateTailwindCode(config) : generateLayoutEngineCode(config)}
                </SyntaxHighlighter>
              </div>
            </motion.div>
          ) : (
            <SidebarPreview config={config} viewport={viewport} showContent={showContent} />
          )}
        </div>
      </main>
    </div>
  );
}