import { motion, AnimatePresence } from 'motion/react';
import { 
  Layout, 
  Code2, 
  Plus, 
  Trash2, 
  MoveVertical,
  Sparkles,
  RotateCcw,
  ChevronDown
} from 'lucide-react';
import { NavbarConfig, NavbarStyle, DEFAULT_CONFIG, PRESETS } from '../types';
import { cn } from '../lib/utils';

interface EditorSidebarProps {
  config: NavbarConfig;
  updateConfig: (updates: Partial<NavbarConfig>) => void;
  activeTab: 'layout' | 'style' | 'links' | 'code';
  setActiveTab: (tab: 'layout' | 'style' | 'links' | 'code') => void;
  isFullscreen: boolean;
  aiPrompt: string;
  setAiPrompt: (prompt: string) => void;
  isGenerating: boolean;
  generateWithAI: () => void;
  importJson: string;
  setImportJson: (json: string) => void;
  handleImportJSON: (json: string) => void;
  addLink: () => void;
  addDropdownLink: (id: string) => void;
  removeLink: (id: string) => void;
  removeDropdownLink: (parentId: string, subId: string) => void;
  updateLink: (id: string, label: string) => void;
  updateDropdownLink: (parentId: string, subId: string, label: string) => void;
  setConfig: (config: NavbarConfig) => void;
}

export const EditorSidebar = ({
  config,
  updateConfig,
  activeTab,
  setActiveTab,
  isFullscreen,
  aiPrompt,
  setAiPrompt,
  isGenerating,
  generateWithAI,
  importJson,
  setImportJson,
  handleImportJSON,
  addLink,
  addDropdownLink,
  removeLink,
  removeDropdownLink,
  updateLink,
  updateDropdownLink,
  setConfig
}: EditorSidebarProps) => {
  return (
    <aside className={cn(
      "w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm z-20 transition-all duration-500",
      isFullscreen ? "-ml-80" : "ml-0"
    )}>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
            <Layout className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">NavCraft</h1>
        </div>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Navbar Builder v1.0</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Tabs */}
        <div className="flex p-1 bg-gray-100 rounded-xl">
          {(['layout', 'style', 'links', 'code'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-2 text-xs font-semibold rounded-lg transition-all capitalize",
                activeTab === tab ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'layout' && (
            <motion.div
              key="layout"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              <section className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles size={14} className="text-indigo-600" />
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">AI Magic Maker</label>
                </div>
                <div className="space-y-2">
                  <textarea 
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="e.g. 'Luxury dark e-commerce navbar with product and cart menu'"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs min-h-[80px] outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                  />
                  <button 
                    onClick={generateWithAI}
                    disabled={isGenerating || !aiPrompt.trim()}
                    className={cn(
                      "w-full py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all",
                      isGenerating ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-indigo-600 text-white hover:bg-indigo-700"
                    )}
                  >
                    {isGenerating ? (
                      <>
                        <RotateCcw size={14} className="animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles size={14} />
                        Generate Design
                      </>
                    )}
                  </button>
                </div>
              </section>

              <section className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Layout size={14} className="text-gray-400" />
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Page Context</label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(['empty', 'landing', 'dashboard', 'auth', 'blog'] as const).map((ctx) => (
                    <button
                      key={ctx}
                      onClick={() => updateConfig({ pageContext: ctx })}
                      className={cn(
                        "px-3 py-2 text-[10px] font-bold rounded-lg border transition-all capitalize",
                        config.pageContext === ctx 
                          ? "bg-indigo-50 border-indigo-200 text-indigo-600 shadow-sm" 
                          : "bg-white border-gray-100 text-gray-500 hover:border-gray-200"
                      )}
                    >
                      {ctx}
                    </button>
                  ))}
                </div>
              </section>

              <section className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Layout size={14} className="text-gray-400" />
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Presets</label>
                </div>
                <div className="grid grid-cols-1 gap-2">
                  {Object.entries(PRESETS).map(([name, preset]) => (
                    <button
                      key={name}
                      onClick={() => updateConfig(preset)}
                      className="px-3 py-2 text-xs font-medium bg-gray-50 border border-gray-200 rounded-lg hover:border-indigo-300 hover:bg-indigo-50 transition-all text-left flex justify-between items-center group"
                    >
                      {name}
                      <Plus size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </section>

              <section className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Base Style</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['minimal', 'glass', 'brutalist', 'modern', 'floating'] as NavbarStyle[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateConfig({ style: s })}
                      className={cn(
                        "px-3 py-2 text-sm rounded-lg border-2 transition-all capitalize",
                        config.style === s ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-100 hover:border-gray-200"
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Configuration</label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Sticky Header</span>
                    <button 
                      onClick={() => updateConfig({ sticky: !config.sticky })}
                      className={cn("w-10 h-5 rounded-full transition-colors relative", config.sticky ? "bg-indigo-600" : "bg-gray-200")}
                    >
                      <div className={cn("absolute top-1 w-3 h-3 bg-white rounded-full transition-all", config.sticky ? "left-6" : "left-1")} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Shrink on Scroll</span>
                    <button 
                      onClick={() => updateConfig({ shrinkOnScroll: !config.shrinkOnScroll })}
                      className={cn("w-10 h-5 rounded-full transition-colors relative", config.shrinkOnScroll ? "bg-indigo-600" : "bg-gray-200")}
                    >
                      <div className={cn("absolute top-1 w-3 h-3 bg-white rounded-full transition-all", config.shrinkOnScroll ? "left-6" : "left-1")} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Full Width</span>
                    <button 
                      onClick={() => updateConfig({ fullWidth: !config.fullWidth })}
                      className={cn("w-10 h-5 rounded-full transition-colors relative", config.fullWidth ? "bg-indigo-600" : "bg-gray-200")}
                    >
                      <div className={cn("absolute top-1 w-3 h-3 bg-white rounded-full transition-all", config.fullWidth ? "left-6" : "left-1")} />
                    </button>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Alignment</label>
                <div className="grid grid-cols-2 gap-2">
                  {(['left', 'center', 'right', 'between'] as const).map((a) => (
                    <button
                      key={a}
                      onClick={() => updateConfig({ alignment: a })}
                      className={cn(
                        "px-3 py-2 text-sm rounded-lg border-2 transition-all capitalize",
                        config.alignment === a ? "border-indigo-600 bg-indigo-50 text-indigo-700" : "border-gray-100 hover:border-gray-200"
                      )}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </section>
              <section className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Code2 size={14} className="text-gray-400" />
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Import Design</label>
                </div>
                <div className="space-y-2">
                  <textarea 
                    value={importJson}
                    onChange={(e) => setImportJson(e.target.value)}
                    placeholder='Paste your JSON configuration here...'
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[10px] font-mono min-h-[60px] outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                  />
                  <button 
                    onClick={() => {
                      handleImportJSON(importJson);
                      setImportJson('');
                    }}
                    disabled={!importJson.trim()}
                    className={cn(
                      "w-full py-2 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all",
                      !importJson.trim() ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-gray-800 text-white hover:bg-black"
                    )}
                  >
                    Apply JSON
                  </button>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'style' && (
            <motion.div
              key="style"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              <section className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Branding</label>
                <div className="space-y-3">
                  <div className="flex p-1 bg-gray-100 rounded-lg mb-2">
                    {(['text', 'image'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => updateConfig({ logoType: t })}
                        className={cn(
                          "flex-1 py-1.5 text-xs font-bold rounded-md transition-all capitalize",
                          config.logoType === t ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  {config.logoType === 'text' ? (
                    <div>
                      <span className="text-xs text-gray-500 mb-1 block">Logo Text</span>
                      <input 
                        type="text" 
                        value={config.logoText}
                        onChange={(e) => updateConfig({ logoText: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                  ) : (
                    <div>
                      <span className="text-xs text-gray-500 mb-1 block">Logo Image URL</span>
                      <input 
                        type="text" 
                        placeholder="https://example.com/logo.png"
                        value={config.logoUrl}
                        onChange={(e) => updateConfig({ logoUrl: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                  )}
                </div>
              </section>

              <section className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Theme</label>
                <div className="flex p-1 bg-gray-100 rounded-lg">
                  {(['light', 'dark'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => updateConfig({ 
                        theme: t,
                        backgroundColor: t === 'dark' ? '#000000' : '#ffffff',
                        textColor: t === 'dark' ? '#ffffff' : '#1f2937'
                      })}
                      className={cn(
                        "flex-1 py-1.5 text-xs font-bold rounded-md transition-all capitalize",
                        config.theme === t ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700"
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Colors</label>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Primary Color</span>
                    <input 
                      type="color" 
                      value={config.primaryColor}
                      onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                      className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Background</span>
                    <input 
                      type="color" 
                      value={config.backgroundColor}
                      onChange={(e) => updateConfig({ backgroundColor: e.target.value })}
                      className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Text Color</span>
                    <input 
                      type="color" 
                      value={config.textColor}
                      onChange={(e) => updateConfig({ textColor: e.target.value })}
                      className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"
                    />
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sizing</label>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium">Vertical Padding</span>
                      <span className="text-xs text-gray-500">{config.paddingY}</span>
                    </div>
                    <input 
                      type="range" min="0.5" max="3" step="0.1"
                      value={parseFloat(config.paddingY)}
                      onChange={(e) => updateConfig({ paddingY: `${e.target.value}rem` })}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium">Horizontal Padding</span>
                      <span className="text-xs text-gray-500">{config.paddingX}</span>
                    </div>
                    <input 
                      type="range" min="0" max="5" step="0.1"
                      value={parseFloat(config.paddingX)}
                      onChange={(e) => updateConfig({ paddingX: `${e.target.value}rem` })}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                  {config.shrinkOnScroll && (
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-xs font-medium">Shrink Vertical Padding</span>
                        <span className="text-xs text-gray-500">{config.paddingYScrolled}</span>
                      </div>
                      <input 
                        type="range" min="0.2" max="2" step="0.1"
                        value={parseFloat(config.paddingYScrolled)}
                        onChange={(e) => updateConfig({ paddingYScrolled: `${e.target.value}rem` })}
                        className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                      />
                    </div>
                  )}
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium">Border Radius</span>
                      <span className="text-xs text-gray-500">{config.borderRadius}</span>
                    </div>
                    <input 
                      type="range" min="0" max="2" step="0.1"
                      value={parseFloat(config.borderRadius)}
                      onChange={(e) => updateConfig({ borderRadius: `${e.target.value}rem` })}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                </div>
              </section>

              {config.style === 'glass' && (
                <section className="space-y-4">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Glass Effects</label>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium">Blur Intensity</span>
                      <span className="text-xs text-gray-500">12px</span>
                    </div>
                    <input 
                      type="range" min="0" max="24" step="1"
                      defaultValue={12}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                </section>
              )}

              {config.style === 'modern' && (
                <section className="space-y-4">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Shadow</label>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium">Intensity</span>
                      <span className="text-xs text-gray-500">Soft</span>
                    </div>
                    <input 
                      type="range" min="1" max="3" step="1"
                      defaultValue={1}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />
                  </div>
                </section>
              )}
            </motion.div>
          )}

          {activeTab === 'links' && (
            <motion.div
              key="links"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Navigation Links</label>
                  <button 
                    onClick={addLink}
                    className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="space-y-2">
                  {config.links.map((link) => (
                    <div key={link.id} className="space-y-2">
                      <div className="flex items-center gap-2 group">
                        <div className="cursor-grab text-gray-300 group-hover:text-gray-400">
                          <MoveVertical size={14} />
                        </div>
                        <input 
                          type="text" 
                          value={link.label}
                          onChange={(e) => updateLink(link.id, e.target.value)}
                          className="flex-1 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-indigo-500"
                        />
                        <button 
                          onClick={() => addDropdownLink(link.id)}
                          className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-md transition-all"
                          title="Add Dropdown Item"
                        >
                          <Plus size={14} />
                        </button>
                        <button 
                          onClick={() => removeLink(link.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      
                      {/* Dropdown Items Editor */}
                      {link.dropdown && link.dropdown.length > 0 && (
                        <div className="ml-6 space-y-2 border-l-2 border-gray-100 pl-3 py-1">
                          {link.dropdown.map((sub) => (
                            <div key={sub.id} className="flex items-center gap-2 group">
                              <input 
                                type="text" 
                                value={sub.label}
                                onChange={(e) => updateDropdownLink(link.id, sub.id, e.target.value)}
                                className="flex-1 px-3 py-1 bg-white border border-gray-100 rounded-lg text-xs outline-none focus:ring-1 focus:ring-indigo-500"
                              />
                              <button 
                                onClick={() => removeDropdownLink(link.id, sub.id)}
                                className="p-1 text-gray-300 hover:text-red-500 transition-all"
                              >
                                <Trash2 size={12} />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Search Bar</label>
                  <button 
                    onClick={() => updateConfig({ showSearch: !config.showSearch })}
                    className={cn("w-10 h-5 rounded-full transition-colors relative", config.showSearch ? "bg-indigo-600" : "bg-gray-200")}
                  >
                    <div className={cn("absolute top-1 w-3 h-3 bg-white rounded-full transition-all", config.showSearch ? "left-6" : "left-1")} />
                  </button>
                </div>
                {config.showSearch && (
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs text-gray-500 mb-1 block">Placeholder</span>
                      <input 
                        type="text" 
                        value={config.searchPlaceholder}
                        onChange={(e) => updateConfig({ searchPlaceholder: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                  </div>
                )}
              </section>

              <section className="space-y-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Call to Action</label>
                  <button 
                    onClick={() => updateConfig({ showCta: !config.showCta })}
                    className={cn("w-10 h-5 rounded-full transition-colors relative", config.showCta ? "bg-indigo-600" : "bg-gray-200")}
                  >
                    <div className={cn("absolute top-1 w-3 h-3 bg-white rounded-full transition-all", config.showCta ? "left-6" : "left-1")} />
                  </button>
                </div>
                {config.showCta && (
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs text-gray-500 mb-1 block">Button Text</span>
                      <input 
                        type="text" 
                        value={config.ctaText}
                        onChange={(e) => updateConfig({ ctaText: e.target.value })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                      />
                    </div>
                  </div>
                )}
              </section>
            </motion.div>
          )}

          {activeTab === 'code' && (
            <motion.div
              key="code"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                <h3 className="text-sm font-bold text-indigo-900 mb-2">Export Design</h3>
                <p className="text-xs text-indigo-700 leading-relaxed">
                  Grab the code for your custom navbar. Choose between raw Tailwind or Layout Engine implementation.
                </p>
              </div>
              <button 
                onClick={() => setConfig(DEFAULT_CONFIG)}
                className="w-full py-2 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw size={14} />
                Reset to Default
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <button 
          onClick={() => setActiveTab('code')}
          className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2"
        >
          <Code2 size={18} />
          View Code
        </button>
      </div>
    </aside>
  );
};
