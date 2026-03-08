import { useState } from 'react';
import { 
  Layout, 
  Code2, 
  Monitor,
  Smartphone,
  Tablet,
  Copy,
  Check,
  ExternalLink,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

import { NavbarConfig, NavLink, DEFAULT_CONFIG } from './types';
import { cn } from './lib/utils';
import { NavbarPreview } from './components/NavbarPreview';
import { EditorSidebar } from './components/EditorSidebar';

export default function App() {
  const [config, setConfig] = useState<NavbarConfig>(DEFAULT_CONFIG);
  const [activeTab, setActiveTab] = useState<'layout' | 'style' | 'links' | 'code'>('layout');
  const [subTab, setSubTab] = useState<'tailwind' | 'le'>('tailwind');
  const [viewport, setViewport] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showContent, setShowContent] = useState(true);
  const [aiPrompt, setAiPrompt] = useState('');
  const [importJson, setImportJson] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedLE, setCopiedLE] = useState(false);

  const updateConfig = (updates: Partial<NavbarConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const addLink = () => {
    const newLink: NavLink = {
      id: Math.random().toString(36).substring(2, 9),
      label: 'New Link',
      href: '#'
    };
    updateConfig({ links: [...config.links, newLink] });
  };

  const addDropdownLink = (parentId: string) => {
    const newSubLink: NavLink = {
      id: Math.random().toString(36).substring(2, 9),
      label: 'Sub Link',
      href: '#'
    };
    updateConfig({
      links: config.links.map(l => {
        if (l.id === parentId) {
          return { ...l, dropdown: [...(l.dropdown || []), newSubLink] };
        }
        return l;
      })
    });
  };

  const removeLink = (id: string) => {
    updateConfig({ links: config.links.filter(l => l.id !== id) });
  };

  const removeDropdownLink = (parentId: string, subId: string) => {
    updateConfig({
      links: config.links.map(l => {
        if (l.id === parentId) {
          return { ...l, dropdown: l.dropdown?.filter(s => s.id !== subId) };
        }
        return l;
      })
    });
  };

  const updateLink = (id: string, label: string) => {
    updateConfig({
      links: config.links.map(l => l.id === id ? { ...l, label } : l)
    });
  };

  const updateDropdownLink = (parentId: string, subId: string, label: string) => {
    updateConfig({
      links: config.links.map(l => {
        if (l.id === parentId) {
          return {
            ...l,
            dropdown: l.dropdown?.map(s => s.id === subId ? { ...s, label } : s)
          };
        }
        return l;
      })
    });
  };

  const handleImportJSON = (json: string) => {
    try {
      const parsed = JSON.parse(json);
      if (parsed && typeof parsed === 'object' && parsed.style) {
        setConfig({ ...DEFAULT_CONFIG, ...parsed });
        setActiveTab('layout');
      } else {
        alert("Invalid JSON format. Please check the structure.");
      }
    } catch (e) {
      alert("Invalid JSON. Please ensure it's a valid JSON string.");
    }
  };

  const generateWithAI = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
      const genAI = new GoogleGenerativeAI("YOUR_GEMINI_API_KEY_HERE");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `You are an expert UI/UX designer. Based on this prompt: "${aiPrompt}", 
      generate a JSON configuration for a navbar. 
      The JSON must strictly follow this structure and use these exact keys:
      {
        "style": "minimal" | "glass" | "brutalist" | "modern" | "floating",
        "logoText": "string",
        "logoType": "text",
        "links": [{"id": "string", "label": "string", "href": "#", "dropdown": []}],
        "sticky": boolean,
        "shrinkOnScroll": boolean,
        "fullWidth": boolean,
        "alignment": "left" | "center" | "right" | "between",
        "theme": "light" | "dark",
        "primaryColor": "hex_color",
        "backgroundColor": "hex_color",
        "textColor": "hex_color",
        "showCta": boolean,
        "ctaText": "string",
        "ctaHref": "#",
        "showSearch": boolean,
        "searchPlaceholder": "string",
        "borderRadius": "0.5rem",
        "paddingX": "1.5rem",
        "paddingY": "1rem"
      }
      Return ONLY the JSON object, no markdown, no explanation.`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      const cleanedJson = text.replace(/```json|```/g, '').trim();
      const newConfig = JSON.parse(cleanedJson);
      
      updateConfig(newConfig);
      setAiPrompt('');
    } catch (error) {
      console.error("AI Generation failed:", error);
      alert("Maaf, gagal membuat desain dengan AI. Pastikan API Key sudah terpasang.");
    } finally {
      setIsGenerating(false);
    }
  };

  const generateLayoutEngineCode = () => {
    const presetImport =
      config.style === 'glass'
        ? "NavbarGlassBlurAutoVW as NavbarPreset"
        : config.style === 'brutalist'
        ? "NavbarBrutalistAutoVW as NavbarPreset"
        : config.style === 'floating'
        ? "NavbarFloatingAutoVW as NavbarPreset"
        : "NavbarTopStickyLightAutoVW as NavbarPreset"
    const left = config.logoType === 'text' ? config.logoText : 'Logo'
    const centerItems = config.links.map(l => l.label.replace(/"/g, '\\"'))
    const cta = config.showCta
      ? `{ Box({ children: "${config.ctaText.replace(/"/g, '\\"')}", style: { backgroundColor: "${config.primaryColor}", color: "#fff", padding: "8px 12px", borderRadius: "${config.borderRadius}" } }) }`
      : "null"
    const contained = !config.fullWidth
    return `import React from "react"
import { Box, Flex, ${presetImport} } from "@damarkuncoro/layout-engine-react"

export default function Navbar() {
  const left = Box({ children: "${left}" })
  const center = Flex({ gap: 12, children: [${centerItems.map(t => `Box({ children: "${t}" })`).join(", ")}] })
  const right = ${cta}
  return ${config.shrinkOnScroll ? `NavbarPreset({ contained: ${contained}, left, center, right, collapseAt: "md", shrinkOnScroll: true, barPadding: "${config.paddingY} ${config.paddingX}", centerAbsolute: ${config.alignment === 'center'}, solidOnScroll: ${config.style === 'glass' ? 'false' : 'true'} })` : `NavbarPreset({ contained: ${contained}, left, center, right, collapseAt: "md", barPadding: "${config.paddingY} ${config.paddingX}", centerAbsolute: ${config.alignment === 'center'} })`}
}
`
  }

  const generateCode = () => {
    const isGlass = config.style === 'glass';
    const isBrutalist = config.style === 'brutalist';
    const isFloating = config.style === 'floating';
    
    return `import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="${cn(
      "w-full transition-all duration-300",
      config.sticky && "sticky top-0 z-50",
      isGlass ? "backdrop-blur-md border-b border-white/20 shadow-sm" :
      isBrutalist ? "bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" :
      isFloating ? "bg-white shadow-xl border border-gray-200 mt-4 mx-4 rounded-2xl" :
      "bg-white border-b border-gray-200"
    )}" style={{ 
      backgroundColor: isScrolled && ${isGlass} ? 'rgba(255, 255, 255, 0.9)' : '${config.backgroundColor}',
      paddingTop: isScrolled && ${config.shrinkOnScroll} ? '${config.paddingYScrolled}' : '${config.paddingY}',
      paddingBottom: isScrolled && ${config.shrinkOnScroll} ? '${config.paddingYScrolled}' : '${config.paddingY}',
      ${isFloating ? `borderRadius: '${config.borderRadius}'` : ''}
    }}>
      <div className="${config.fullWidth ? 'w-full px-6' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}">
        <div className="flex items-center h-full ${
          config.alignment === 'left' ? 'justify-start gap-8' :
          config.alignment === 'center' ? 'justify-center gap-8' :
          config.alignment === 'right' ? 'justify-end gap-8' :
          'justify-between'
        }">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold tracking-tight" style={{ color: '${config.textColor}' }}>
              ${config.logoText}
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            ${config.links.map(link => `
            <div 
              className="relative group"
              onMouseEnter={() => setActiveDropdown('${link.id}')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <a href="${link.href}" className="text-sm font-medium hover:opacity-70 transition-colors flex items-center gap-1" style={{ color: '${config.textColor}' }}>
                ${link.label}
                ${link.dropdown ? '<ChevronDown size={14} />' : ''}
              </a>
              ${link.dropdown ? `
              {activeDropdown === '${link.id}' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  ${link.dropdown.map(sub => `
                  <a href="${sub.href}" className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-indigo-600 transition-colors">
                    ${sub.label}
                  </a>`).join('')}
                </div>
              )}` : ''}
            </div>`).join('')}
            ${config.showCta ? `
            <a href="${config.ctaHref}" className="px-4 py-2 text-sm font-semibold text-white transition-all hover:scale-105" style={{ 
              backgroundColor: '${config.primaryColor}',
              borderRadius: '${config.borderRadius}'
            }}>
              ${config.ctaText}
            </a>` : ''}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md" style={{ color: '${config.textColor}' }}>
              {isOpen ? '<X size={24} />' : '<Menu size={24} />'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="px-4 pt-2 pb-6 space-y-1">
            ${config.links.map(link => `
            <a href="${link.href}" className="block px-3 py-4 text-base font-medium border-b border-gray-50" style={{ color: '${config.textColor}' }}>
              ${link.label}
            </a>
            ${link.dropdown ? `
            <div className="pl-4 bg-gray-50">
              ${link.dropdown.map(sub => `
              <a href="${sub.href}" className="block py-3 text-sm text-gray-500 border-b border-gray-100">
                ${sub.label}
              </a>`).join('')}
            </div>` : ''}`).join('')}
            ${config.showCta ? `
            <div className="pt-4 px-3">
              <a href="${config.ctaHref}" className="block w-full text-center px-4 py-3 text-base font-semibold text-white" style={{ 
                backgroundColor: '${config.primaryColor}',
                borderRadius: '${config.borderRadius}'
              }}>
                ${config.ctaText}
              </a>
            </div>` : ''}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyLE = () => {
    navigator.clipboard.writeText(generateLayoutEngineCode());
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
        aiPrompt={aiPrompt}
        setAiPrompt={setAiPrompt}
        isGenerating={isGenerating}
        generateWithAI={generateWithAI}
        importJson={importJson}
        setImportJson={setImportJson}
        handleImportJSON={handleImportJSON}
        addLink={addLink}
        addDropdownLink={addDropdownLink}
        removeLink={removeLink}
        removeDropdownLink={removeDropdownLink}
        updateLink={updateLink}
        updateDropdownLink={updateDropdownLink}
        setConfig={setConfig}
      />

      {/* Main Content / Preview */}
      <main className="flex-1 flex flex-col min-w-0 relative">
        {/* Preview Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
          <div className="flex items-center gap-4">
            <div className="flex p-1 bg-gray-100 rounded-lg">
              <button 
                onClick={() => setViewport('desktop')}
                className={cn("p-1.5 rounded-md transition-all", viewport === 'desktop' ? "bg-white shadow-sm text-indigo-600" : "text-gray-400 hover:text-gray-600")}
              >
                <Monitor size={18} />
              </button>
              <button 
                onClick={() => setViewport('tablet')}
                className={cn("p-1.5 rounded-md transition-all", viewport === 'tablet' ? "bg-white shadow-sm text-indigo-600" : "text-gray-400 hover:text-gray-600")}
              >
                <Tablet size={18} />
              </button>
              <button 
                onClick={() => setViewport('mobile')}
                className={cn("p-1.5 rounded-md transition-all", viewport === 'mobile' ? "bg-white shadow-sm text-indigo-600" : "text-gray-400 hover:text-gray-600")}
              >
                <Smartphone size={18} />
              </button>
            </div>
            <div className="h-4 w-px bg-gray-200" />
            <button 
              onClick={() => setIsFullscreen(!isFullscreen)}
              className={cn("p-1.5 rounded-md transition-all", isFullscreen ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-gray-600")}
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
              <ExternalLink size={18} className={isFullscreen ? "rotate-180" : ""} />
            </button>
            <div className="h-4 w-px bg-gray-200" />
            <button 
              onClick={() => setShowContent(!showContent)}
              className={cn("p-1.5 rounded-md transition-all", !showContent ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-gray-600")}
              title={showContent ? "Hide Page Content" : "Show Page Content"}
            >
              <Layout size={18} />
            </button>
            <div className="h-4 w-px bg-gray-200" />
            <span className="text-sm font-medium text-gray-500">
              {viewport === 'desktop' ? 'Desktop View (100%)' : viewport === 'tablet' ? 'Tablet View (768px)' : 'Mobile View (375px)'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setConfig(DEFAULT_CONFIG)}
              className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded-lg transition-all flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Reset
            </button>
            <button 
              onClick={() => setActiveTab('code')}
              className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all shadow-md shadow-indigo-100 flex items-center gap-2"
            >
              <Code2 size={16} />
              Export
            </button>
          </div>
        </header>

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
                    className={cn("flex-1 py-1.5 px-4 text-xs font-bold rounded-md transition-all", subTab === 'tailwind' ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700")}
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
                  {subTab === 'tailwind' ? generateCode() : generateLayoutEngineCode()}
                </SyntaxHighlighter>
              </div>
            </motion.div>
          ) : (
            <NavbarPreview config={config} viewport={viewport} showContent={showContent} />
          )}
        </div>
      </main>
    </div>
  );
}
