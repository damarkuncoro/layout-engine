import { motion, AnimatePresence } from 'motion/react';
import { 
  Layout, 
  Code2, 
  Plus, 
  Trash2, 
  MoveVertical,
  RotateCcw,
  PanelLeft
} from 'lucide-react';
import { SidebarConfig, SidebarStyle, DEFAULT_CONFIG, PRESETS } from '../types';
import { cn } from '../lib/utils';

interface EditorSidebarProps {
  config: SidebarConfig;
  updateConfig: (updates: Partial<SidebarConfig>) => void;
  activeTab: 'layout' | 'style' | 'items' | 'code';
  setActiveTab: (tab: 'layout' | 'style' | 'items' | 'code') => void;
  isFullscreen: boolean;
  importJson: string;
  setImportJson: (json: string) => void;
  handleImportJSON: (json: string) => void;
  addGroup: () => void;
  addItemToGroup: (groupId: string) => void;
  removeGroup: (groupId: string) => void;
  removeItem: (groupId: string, itemId: string) => void;
  updateGroup: (groupId: string, title: string) => void;
  updateItem: (groupId: string, itemId: string, label: string) => void;
  setConfig: (config: SidebarConfig) => void;
}

export const EditorSidebar = ({
  config,
  updateConfig,
  activeTab,
  setActiveTab,
  isFullscreen,
  importJson,
  setImportJson,
  handleImportJSON,
  addGroup,
  addItemToGroup,
  removeGroup,
  removeItem,
  updateGroup,
  updateItem,
  setConfig
}: EditorSidebarProps) => {
  return (
    <aside className={cn(
      "w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm z-20 transition-all duration-500",
      isFullscreen ? "-ml-80" : "ml-0"
    )}>
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
            <PanelLeft className="text-white w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold tracking-tight">SidebarCraft</h1>
        </div>
        <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">Sidebar Builder v1.0</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Tabs */}
        <div className="flex p-1 bg-gray-100 rounded-xl">
          {(['layout', 'style', 'items', 'code'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "flex-1 py-2 text-xs font-semibold rounded-lg transition-all capitalize",
                activeTab === tab ? "bg-white shadow-sm text-emerald-600" : "text-gray-500 hover:text-gray-700"
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
              <section className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Layout size={14} className="text-gray-400" />
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Page Context</label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {(['empty', 'dashboard', 'landing', 'settings', 'docs'] as const).map((ctx) => (
                    <button
                      key={ctx}
                      onClick={() => updateConfig({ pageContext: ctx })}
                      className={cn(
                        "px-3 py-2 text-[10px] font-bold rounded-lg border transition-all capitalize",
                        config.pageContext === ctx 
                          ? "bg-emerald-50 border-emerald-200 text-emerald-600 shadow-sm" 
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
                      className="px-3 py-2 text-xs font-medium bg-gray-50 border border-gray-200 rounded-lg hover:border-emerald-300 hover:bg-emerald-50 transition-all text-left flex justify-between items-center group"
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
                  {(['minimal', 'glass', 'brutalist', 'modern', 'floating'] as SidebarStyle[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => updateConfig({ style: s })}
                      className={cn(
                        "px-3 py-2 text-sm rounded-lg border-2 transition-all capitalize",
                        config.style === s ? "border-emerald-600 bg-emerald-50 text-emerald-700" : "border-gray-100 hover:border-gray-200"
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
                    <span className="text-sm font-medium">Collapsed</span>
                    <button 
                      onClick={() => updateConfig({ collapsed: !config.collapsed })}
                      className={cn("w-10 h-5 rounded-full transition-colors relative", config.collapsed ? "bg-emerald-600" : "bg-gray-200")}
                    >
                      <div className={cn("absolute top-1 w-3 h-3 bg-white rounded-full transition-all", config.collapsed ? "left-6" : "left-1")} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Collapsible</span>
                    <button 
                      onClick={() => updateConfig({ collapsible: !config.collapsible })}
                      className={cn("w-10 h-5 rounded-full transition-colors relative", config.collapsible ? "bg-emerald-600" : "bg-gray-200")}
                    >
                      <div className={cn("absolute top-1 w-3 h-3 bg-white rounded-full transition-all", config.collapsible ? "left-6" : "left-1")} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Show Header</span>
                    <button 
                      onClick={() => updateConfig({ showHeader: !config.showHeader })}
                      className={cn("w-10 h-5 rounded-full transition-colors relative", config.showHeader ? "bg-emerald-600" : "bg-gray-200")}
                    >
                      <div className={cn("absolute top-1 w-3 h-3 bg-white rounded-full transition-all", config.showHeader ? "left-6" : "left-1")} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Show Footer</span>
                    <button 
                      onClick={() => updateConfig({ showFooter: !config.showFooter })}
                      className={cn("w-10 h-5 rounded-full transition-colors relative", config.showFooter ? "bg-emerald-600" : "bg-gray-200")}
                    >
                      <div className={cn("absolute top-1 w-3 h-3 bg-white rounded-full transition-all", config.showFooter ? "left-6" : "left-1")} />
                    </button>
                  </div>
                </div>
              </section>

              <section className="space-y-3">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Width</label>
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium">Sidebar Width</span>
                    <span className="text-xs text-gray-500">{config.width}</span>
                  </div>
                  <input 
                    type="range" min="180" max="400" step="10"
                    value={parseInt(config.width)}
                    onChange={(e) => updateConfig({ width: `${e.target.value}px` })}
                    className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
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
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-[10px] font-mono min-h-[60px] outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
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
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Header</label>
                <div className="space-y-3">
                  <div className="flex p-1 bg-gray-100 rounded-lg mb-2">
                    {(['text', 'image'] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => updateConfig({ 
                          header: { 
                            logoType: t,
                            logoText: config.header?.logoText || '',
                            logoUrl: config.header?.logoUrl || ''
                          } 
                        })}
                        className={cn(
                          "flex-1 py-1.5 text-xs font-bold rounded-md transition-all capitalize",
                          config.header?.logoType === t ? "bg-white shadow-sm text-emerald-600" : "text-gray-500 hover:text-gray-700"
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  {config.header?.logoType === 'text' ? (
                    <div>
                      <span className="text-xs text-gray-500 mb-1 block">Logo Text</span>
                      <input 
                        type="text" 
                        value={config.header?.logoText || ''}
                        onChange={(e) => updateConfig({ 
                          header: { 
                            logoType: config.header?.logoType ?? 'text',
                            logoText: e.target.value,
                            logoUrl: config.header?.logoUrl
                          } 
                        })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                  ) : (
                    <div>
                      <span className="text-xs text-gray-500 mb-1 block">Logo Image URL</span>
                      <input 
                        type="text" 
                        placeholder="https://example.com/logo.png"
                        value={config.header?.logoUrl || ''}
                        onChange={(e) => updateConfig({ 
                          header: { 
                            logoType: config.header?.logoType ?? 'text',
                            logoUrl: e.target.value,
                            logoText: config.header?.logoText
                          } 
                        })}
                        className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                      />
                    </div>
                  )}
                </div>
              </section>

              <section className="space-y-4">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Footer</label>
                <div>
                  <span className="text-xs text-gray-500 mb-1 block">Footer Text</span>
                  <input 
                    type="text" 
                    value={config.footer?.text || ''}
                    onChange={(e) => updateConfig({ 
                      footer: { 
                        show: config.footer?.show ?? true,
                        text: e.target.value 
                      } 
                    })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
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
                        backgroundColor: t === 'dark' ? '#1f2937' : '#ffffff',
                        textColor: t === 'dark' ? '#ffffff' : '#1f2937',
                        borderColor: t === 'dark' ? '#374151' : '#e5e7eb'
                      })}
                      className={cn(
                        "flex-1 py-1.5 text-xs font-bold rounded-md transition-all capitalize",
                        config.theme === t ? "bg-white shadow-sm text-emerald-600" : "text-gray-500 hover:text-gray-700"
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
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Primary / Active</span>
                    <input 
                      type="color" 
                      value={config.primaryColor}
                      onChange={(e) => updateConfig({ primaryColor: e.target.value })}
                      className="w-8 h-8 rounded cursor-pointer border-none bg-transparent"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Border Color</span>
                    <input 
                      type="color" 
                      value={config.borderColor}
                      onChange={(e) => updateConfig({ borderColor: e.target.value })}
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
                      <span className="text-xs font-medium">Border Width</span>
                      <span className="text-xs text-gray-500">{config.borderWidth}</span>
                    </div>
                    <input 
                      type="range" min="0" max="8" step="1"
                      value={parseInt(config.borderWidth)}
                      onChange={(e) => updateConfig({ borderWidth: `${e.target.value}px` })}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium">Padding</span>
                      <span className="text-xs text-gray-500">{config.padding}</span>
                    </div>
                    <input 
                      type="range" min="8" max="32" step="4"
                      value={parseInt(config.padding)}
                      onChange={(e) => updateConfig({ padding: `${e.target.value}px` })}
                      className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                    />
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {activeTab === 'items' && (
            <motion.div
              key="items"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="space-y-6"
            >
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Sidebar Groups</label>
                  <button 
                    onClick={addGroup}
                    className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-all"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <div className="space-y-4">
                  {config.groups.map((group) => (
                    <div key={group.id} className="space-y-2 p-3 bg-gray-50 rounded-lg border border-gray-100">
                      <div className="flex items-center gap-2 group">
                        <div className="cursor-grab text-gray-300 group-hover:text-gray-400">
                          <MoveVertical size={14} />
                        </div>
                        <input 
                          type="text" 
                          value={group.title || ''}
                          onChange={(e) => updateGroup(group.id, e.target.value)}
                          placeholder="Group Title"
                          className="flex-1 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm outline-none focus:ring-1 focus:ring-emerald-500"
                        />
                        <button 
                          onClick={() => addItemToGroup(group.id)}
                          className="p-1.5 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-md transition-all"
                          title="Add Item"
                        >
                          <Plus size={14} />
                        </button>
                        <button 
                          onClick={() => removeGroup(group.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-all"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      
                      {/* Items Editor */}
                      <div className="ml-6 space-y-2 border-l-2 border-gray-100 pl-3 py-1">
                        {group.items.map((item) => (
                          <div key={item.id} className="flex items-center gap-2 group">
                            <span className="text-gray-300 text-xs w-4">{item.icon || '○'}</span>
                            <input 
                              type="text" 
                              value={item.label}
                              onChange={(e) => updateItem(group.id, item.id, e.target.value)}
                              className="flex-1 px-3 py-1 bg-white border border-gray-100 rounded-lg text-xs outline-none focus:ring-1 focus:ring-emerald-500"
                            />
                            <button 
                              onClick={() => removeItem(group.id, item.id)}
                              className="p-1 text-gray-300 hover:text-red-500 transition-all"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        ))}
                        {group.items.length === 0 && (
                          <p className="text-xs text-gray-400 italic">No items in this group</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
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
              <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100">
                <h3 className="text-sm font-bold text-emerald-900 mb-2">Export Design</h3>
                <p className="text-xs text-emerald-700 leading-relaxed">
                  Grab the code for your custom sidebar. Choose between raw Tailwind or Layout Engine implementation.
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
          className="w-full py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all flex items-center justify-center gap-2"
        >
          <Code2 size={18} />
          View Code
        </button>
      </div>
    </aside>
  );
};