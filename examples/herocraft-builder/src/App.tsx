import React, { useState } from 'react';
import { HeroPreview } from './components/HeroPreview';
import { DEFAULT_HERO_CONFIG, HeroConfig, HeroPattern, HeroStyle } from './types';
import { generateLayoutEngineCode, generateTailwindCode } from './utils/codeGenerator';
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
  ExternalLink,
  ChevronDown,
  X,
  Code2,
  Copy,
  Check
} from 'lucide-react';

function App() {
  const [config, setConfig] = useState<HeroConfig>(DEFAULT_HERO_CONFIG);
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [activeTab, setActiveTab] = useState<'layout' | 'style' | 'content'>('layout');
  const [showCode, setShowCode] = useState(false);
  const [codeType, setCodeType] = useState<'le' | 'tailwind'>('le');
  const [copied, setCopied] = useState(false);

  const updateConfig = (updates: Partial<HeroConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const code = codeType === 'le' ? generateLayoutEngineCode(config) : generateTailwindCode(config);

  return (
    <div className="flex h-screen bg-gray-100 font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm">
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">H</div>
          <h1 className="text-xl font-bold tracking-tight text-gray-800">HeroCraft</h1>
        </div>

        {/* Tabs */}
        <div className="flex p-1 bg-gray-100 m-4 rounded-xl">
          {(['layout', 'style', 'content'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all capitalize ${
                activeTab === tab ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {activeTab === 'layout' && (
            <div className="space-y-6">
              <section className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <Layout size={16} className="text-indigo-600" />
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Patterns</label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(['split', 'centered', 'fullscreen', 'overlap'] as HeroPattern[]).map((p) => (
                    <button
                      key={p}
                      onClick={() => updateConfig({ pattern: p })}
                      className={`px-3 py-2 text-sm rounded-lg border-2 transition-all capitalize ${
                        config.pattern === p ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </section>

              <section className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <Settings2 size={16} className="text-indigo-600" />
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Base Style</label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(['modern', 'glass', 'brutalist', 'minimal'] as HeroStyle[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateConfig({ style: s })}
                      className={`px-3 py-2 text-sm rounded-lg border-2 transition-all capitalize ${
                        config.style === s ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </section>

              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <span className="text-sm font-medium">Reverse Layout</span>
                <button 
                  onClick={() => updateConfig({ reverse: !config.reverse })}
                  className={`w-10 h-5 rounded-full transition-colors relative ${config.reverse ? "bg-indigo-600" : "bg-gray-200"}`}
                >
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${config.reverse ? "left-6" : "left-1"}`} />
                </button>
              </div>
            </div>
          )}

          {activeTab === 'style' && (
            <div className="space-y-6">
              <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Palette size={16} className="text-indigo-600" />
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Colors & Radius</label>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Background</span>
                    <input type="color" value={config.backgroundColor} onChange={(e) => updateConfig({ backgroundColor: e.target.value })} className="w-8 h-8 rounded cursor-pointer" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Primary Color</span>
                    <input type="color" value={config.primaryColor} onChange={(e) => updateConfig({ primaryColor: e.target.value })} className="w-8 h-8 rounded cursor-pointer" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Text Color</span>
                    <input type="color" value={config.textColor} onChange={(e) => updateConfig({ textColor: e.target.value })} className="w-8 h-8 rounded cursor-pointer" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">Border Radius</span>
                      <span className="text-xs text-gray-400">{config.borderRadius}</span>
                    </div>
                    <input type="range" min="0" max="3" step="0.1" value={parseFloat(config.borderRadius)} onChange={(e) => updateConfig({ borderRadius: `${e.target.value}rem` })} className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" />
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === 'content' && (
            <div className="space-y-6">
              <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <Type size={16} className="text-indigo-600" />
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Text Content</label>
                </div>
                <div className="space-y-3">
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500 font-medium">Title</span>
                    <textarea value={config.title} onChange={(e) => updateConfig({ title: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none h-20" />
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-gray-500 font-medium">Description</span>
                    <textarea value={config.description} onChange={(e) => updateConfig({ description: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none resize-none h-24" />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                  <ImageIcon size={16} className="text-indigo-600" />
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Visual Asset</label>
                </div>
                <div className="flex p-1 bg-gray-100 rounded-lg mb-2">
                  {(['image', 'none'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => updateConfig({ visualType: t })}
                      className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all capitalize ${
                        config.visualType === t ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                {config.visualType === 'image' && (
                  <input type="text" value={config.visualUrl} onChange={(e) => updateConfig({ visualUrl: e.target.value })} className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="Image URL..." />
                )}
              </section>
            </div>
          )}
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <button 
            onClick={() => setShowCode(true)}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
          >
            <Code2 size={18} />
            View Code
          </button>
        </div>
      </aside>

      {/* Main Preview Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Toolbar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-500">Viewport:</span>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button onClick={() => setViewport('desktop')} className={`p-1.5 rounded-md transition-all ${viewport === 'desktop' ? "bg-white shadow-sm text-indigo-600" : "text-gray-400 hover:text-gray-600"}`}>
                <Monitor size={18} />
              </button>
              <button onClick={() => setViewport('tablet')} className={`p-1.5 rounded-md transition-all ${viewport === 'tablet' ? "bg-white shadow-sm text-indigo-600" : "text-gray-400 hover:text-gray-600"}`}>
                <Tablet size={18} />
              </button>
              <button onClick={() => setViewport('mobile')} className={`p-1.5 rounded-md transition-all ${viewport === 'mobile' ? "bg-white shadow-sm text-indigo-600" : "text-gray-400 hover:text-gray-600"}`}>
                <Smartphone size={18} />
              </button>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-xs font-bold flex items-center gap-1.5">
               <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
               Live Preview
             </div>
          </div>
        </header>

        {/* Preview Wrapper */}
        <div className="flex-1 overflow-hidden relative">
          <HeroPreview config={config} viewport={viewport} />
        </div>
      </main>

      {/* Code Modal */}
      {showCode && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-8">
          <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-xl font-bold">Export Code</h2>
                <div className="flex bg-gray-100 p-1 rounded-lg">
                  <button 
                    onClick={() => setCodeType('le')}
                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${codeType === 'le' ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    Layout Engine
                  </button>
                  <button 
                    onClick={() => setCodeType('tailwind')}
                    className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${codeType === 'tailwind' ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"}`}
                  >
                    Tailwind CSS
                  </button>
                </div>
              </div>
              <button onClick={() => setShowCode(false)} className="p-2 hover:bg-gray-100 rounded-full transition-all">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex-1 overflow-hidden relative group">
              <div className="absolute top-4 right-4 z-10">
                <button 
                  onClick={() => copyToClipboard(code)}
                  className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-lg backdrop-blur-md transition-all flex items-center gap-2 text-xs font-bold"
                >
                  {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                  {copied ? 'Copied!' : 'Copy Code'}
                </button>
              </div>
              <div className="h-full overflow-auto">
                <SyntaxHighlighter 
                  language="tsx" 
                  style={vscDarkPlus}
                  customStyle={{ margin: 0, height: '100%', fontSize: '13px' }}
                >
                  {code}
                </SyntaxHighlighter>
              </div>
            </div>
            
            <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button 
                onClick={() => setShowCode(false)}
                className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
