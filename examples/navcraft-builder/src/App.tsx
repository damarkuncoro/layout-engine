import { useState, useEffect, useRef } from 'react';
import { 
  Settings2, 
  Layout, 
  Code2, 
  Plus, 
  Trash2, 
  MoveVertical,
  ChevronDown,
  Monitor,
  Smartphone,
  Tablet,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Search,
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NavbarConfig, NavbarStyle, NavLink, DEFAULT_CONFIG, PRESETS } from './types';
import { cn } from './lib/utils';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  Navbar as LE_Navbar,
} from "@damarkuncoro/navbar-engine";
import { 
  renderNodeToReact, 
  StatsGridPreset,
  ProductGridPreset,
  BlogPostPreset,
} from "@damarkuncoro/layout-engine-react";

// --- Components ---

const NavbarPreview = ({ config, viewport, showContent }: { config: NavbarConfig; viewport: 'mobile' | 'tablet' | 'desktop'; showContent: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      setIsScrolled(container.scrollTop > 50);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [viewport]);

  const navNode = LE_Navbar({
    variant: config.style === 'glass' ? 'transparent' : config.theme === 'dark' ? 'dark' : config.style === 'minimal' ? 'light' : 'solid',
    background: config.backgroundColor,
    height: 'auto',
    barPadding: `${isScrolled && config.shrinkOnScroll ? config.paddingYScrolled : config.paddingY} ${viewport === 'desktop' ? config.paddingX : '1rem'}`,
    position: config.sticky ? 'sticky' : 'static',
    elevation: config.style === 'modern',
    border: config.style !== 'minimal',
    contained: !config.fullWidth,
    scrolled: isScrolled,
    shrinkOnScroll: config.shrinkOnScroll,
    solidOnScroll: config.style === 'glass',
    viewportWidth: viewport === 'mobile' ? 375 : viewport === 'tablet' ? 768 : 1200,
    collapseAt: viewport === 'mobile' ? 'sm' : 'md',
    menuOpen: isOpen,
    onMenuToggle: () => setIsOpen(!isOpen),
    centerAbsolute: config.alignment === 'center',
    left: (
      <div className="flex-shrink-0 flex items-center">
        {config.logoType === 'text' ? (
          <span className="text-xl font-bold tracking-tight" style={{ color: config.textColor }}>
            {config.logoText}
          </span>
        ) : (
          <img className="h-8 w-auto" src={config.logoUrl} alt="Logo" referrerPolicy="no-referrer" />
        )}
      </div>
    ),
    center: (
      <div className={cn(
        "flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8",
        viewport !== 'desktop' && "px-4 py-4"
      )}>
        {config.links.map((link) => (
          <div 
            key={link.id} 
            className="relative group w-full md:w-auto"
            onMouseEnter={() => setActiveDropdown(link.id)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <a
              href={link.href}
              className="text-sm font-medium transition-colors hover:opacity-70 flex items-center justify-between md:justify-start gap-1 w-full"
              style={{ color: config.textColor }}
            >
              {link.label}
              {link.dropdown && <ChevronDown size={14} className={cn("transition-transform", activeDropdown === link.id && "rotate-180")} />}
            </a>

            {link.dropdown && (
              <AnimatePresence>
                {activeDropdown === link.id && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={cn(
                      "md:absolute top-full left-0 mt-2 w-full md:w-48 rounded-xl shadow-xl border py-2 z-50",
                      config.theme === 'dark' ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100"
                    )}
                  >
                    {link.dropdown.map((sub) => (
                      <a
                        key={sub.id}
                        href={sub.href}
                        className={cn(
                          "block px-4 py-2 text-sm transition-colors",
                          config.theme === 'dark' ? "text-gray-300 hover:bg-gray-800 hover:text-white" : "text-gray-600 hover:bg-gray-50 hover:text-indigo-600"
                        )}
                      >
                        {sub.label}
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        ))}
        {config.showCta && viewport !== 'desktop' && (
          <div className="pt-4 w-full">
            <a
              href={config.ctaHref}
              className="block w-full text-center px-4 py-3 text-sm font-semibold text-white"
              style={{ 
                backgroundColor: config.primaryColor,
                borderRadius: config.borderRadius 
              }}
            >
              {config.ctaText}
            </a>
          </div>
        )}
      </div>
    ),
    right: (
      <div className="flex items-center gap-4">
        {config.showSearch && (
          <div className={cn(
            "hidden lg:flex items-center px-3 py-1.5 rounded-lg border transition-all",
            config.theme === 'dark' ? "bg-white/5 border-white/10" : "bg-gray-100 border-gray-200"
          )}>
            <Search size={14} className="text-gray-400 mr-2" />
            <input 
              type="text" 
              placeholder={config.searchPlaceholder}
              className="bg-transparent border-none outline-none text-xs w-32 focus:w-48 transition-all"
              style={{ color: config.textColor }}
            />
          </div>
        )}
        {config.showCta && (
          <a
            href={config.ctaHref}
            className="hidden md:inline-block px-4 py-2 text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95"
            style={{ 
              backgroundColor: config.primaryColor,
              borderRadius: config.borderRadius 
              }}
            >
              {config.ctaText}
            </a>
          )}
        </div>
      ),
    style: {
      borderRadius: config.style === 'floating' ? config.borderRadius : undefined,
      marginTop: config.style === 'floating' ? '1rem' : undefined,
      marginRight: config.style === 'floating' ? '1rem' : undefined,
      marginLeft: config.style === 'floating' ? '1rem' : undefined,
      boxShadow: config.style === 'brutalist' ? '8px 8px 0px 0px rgba(0,0,0,1)' : undefined,
      border: config.style === 'brutalist' ? '4px solid black' : undefined,
    }
  });

  const renderContent = () => {
    const isDark = config.theme === 'dark';
    const bgClass = isDark ? "bg-black text-white" : "bg-gray-50 text-gray-900";
    const cardBgClass = isDark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-100";
    const textMutedClass = isDark ? "text-gray-400" : "text-gray-500";
    const borderClass = isDark ? "border-gray-800" : "border-gray-100";

    switch (config.pageContext) {
      case 'landing':
        return (
          <div className={cn("space-y-20 py-12 min-h-full transition-colors duration-300", bgClass)}>
            <div className="text-center space-y-4 px-6">
              <h1 className="text-4xl font-extrabold tracking-tight">Scale your business faster</h1>
              <p className={cn("text-lg max-w-2xl mx-auto", textMutedClass)}>Build beautiful interfaces with our headless layout engine primitives.</p>
              <div className="flex justify-center gap-4">
                <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors">Get Started</button>
                <button className={cn("px-6 py-3 border rounded-lg font-bold transition-colors", isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900")}>Learn More</button>
              </div>
            </div>
            <div className="px-6">
              <ProductGridPreset 
                products={[
                  <div key="1" className={cn("p-4 rounded-xl border shadow-sm space-y-3 transition-colors", cardBgClass)}>
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=300&fit=crop" className="rounded-lg w-full aspect-video object-cover" alt="" />
                    <div className="font-bold">Premium UI Kit</div>
                    <div className="text-indigo-500 font-bold">$49</div>
                  </div>,
                  <div key="2" className={cn("p-4 rounded-xl border shadow-sm space-y-3 transition-colors", cardBgClass)}>
                    <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop" className="rounded-lg w-full aspect-video object-cover" alt="" />
                    <div className="font-bold">Layout Engine Pro</div>
                    <div className="text-indigo-500 font-bold">$99</div>
                  </div>,
                  <div key="3" className={cn("p-4 rounded-xl border shadow-sm space-y-3 transition-colors", cardBgClass)}>
                    <img src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=400&h=300&fit=crop" className="rounded-lg w-full aspect-video object-cover" alt="" />
                    <div className="font-bold">Design System</div>
                    <div className="text-indigo-500 font-bold">$149</div>
                  </div>,
                ]}
              />
            </div>
          </div>
        );
      case 'dashboard':
        return (
          <div className={cn("p-6 space-y-6 min-h-full transition-colors duration-300", bgClass)}>
            <StatsGridPreset 
              stats={[
                <div key="1" className={cn("p-6 rounded-xl border shadow-sm transition-colors", cardBgClass)}>
                  <div className={cn("text-sm", textMutedClass)}>Total Revenue</div>
                  <div className="text-2xl font-bold">$45,231</div>
                  <div className="text-xs text-emerald-500 font-medium">+12.5%</div>
                </div>,
                <div key="2" className={cn("p-6 rounded-xl border shadow-sm transition-colors", cardBgClass)}>
                  <div className={cn("text-sm", textMutedClass)}>Active Users</div>
                  <div className="text-2xl font-bold">2,431</div>
                  <div className="text-xs text-emerald-500 font-medium">+3.2%</div>
                </div>,
                <div key="3" className={cn("p-6 rounded-xl border shadow-sm transition-colors", cardBgClass)}>
                  <div className={cn("text-sm", textMutedClass)}>Conversion Rate</div>
                  <div className="text-2xl font-bold">18.2%</div>
                  <div className="text-xs text-rose-500 font-medium">-1.4%</div>
                </div>,
              ]}
              columns={3}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={cn("p-6 rounded-xl border shadow-sm h-64 transition-colors", cardBgClass)}>
                <div className={cn("h-4 w-1/3 rounded mb-4", isDark ? "bg-gray-800" : "bg-gray-100")} />
                <div className={cn("h-full w-full rounded flex items-center justify-center transition-colors", isDark ? "bg-gray-800/50 text-gray-700" : "bg-gray-50 text-gray-300")}>Chart Placeholder</div>
              </div>
              <div className={cn("p-6 rounded-xl border shadow-sm h-64 transition-colors", cardBgClass)}>
                <div className={cn("h-4 w-1/3 rounded mb-4", isDark ? "bg-gray-800" : "bg-gray-100")} />
                <div className={cn("h-full w-full rounded flex items-center justify-center transition-colors", isDark ? "bg-gray-800/50 text-gray-700" : "bg-gray-50 text-gray-300")}>Chart Placeholder</div>
              </div>
            </div>
          </div>
        );
      case 'blog':
        return (
          <div className={cn("min-h-full py-12 transition-colors duration-300", bgClass)}>
            <div className="max-w-4xl mx-auto px-6">
              <BlogPostPreset 
                title={<h1 className="text-3xl font-extrabold">Building Scalable UI Engines</h1>}
                meta={<div className={cn("text-sm", textMutedClass)}>By Damar Kuncoro • March 8, 2026</div>}
                content={
                  <div className={cn("space-y-4 leading-relaxed transition-colors", isDark ? "text-gray-300" : "text-gray-600")}>
                    <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=400&fit=crop" className="rounded-2xl w-full object-cover mb-8" alt="" />
                    <p>Layout engines are the future of UI development. By separating the logic of how components are placed from the actual rendering, we create systems that are truly platform-agnostic...</p>
                    <p>In this article, we explore the core concepts of primitives, structures, and patterns that make up a modern layout system.</p>
                  </div>
                }
              />
            </div>
          </div>
        );
      case 'auth':
        return (
          <div className={cn("min-h-full flex items-center justify-center p-6 transition-colors duration-300", bgClass)}>
            <div className={cn("w-full max-w-md p-8 rounded-2xl border shadow-xl space-y-6 transition-colors", cardBgClass)}>
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">Welcome back</h2>
                <p className={textMutedClass}>Enter your details to access your account</p>
              </div>
              <div className="space-y-4">
                <input type="email" placeholder="Email address" className={cn("w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-colors", isDark ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-gray-50 border-gray-200 text-gray-900")} />
                <input type="password" placeholder="Password" className={cn("w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 transition-colors", isDark ? "bg-gray-800 border-gray-700 text-white placeholder-gray-500" : "bg-gray-50 border-gray-200 text-gray-900")} />
                <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-colors">Sign In</button>
              </div>
              <p className={cn("text-center text-sm", textMutedClass)}>Don't have an account? <span className="text-indigo-500 font-bold cursor-pointer hover:text-indigo-400">Sign up</span></p>
            </div>
          </div>
        );
      default:
        return showContent ? (
          <div className={cn("p-8 space-y-8 min-h-full transition-colors duration-300", bgClass)}>
            <div className="space-y-4">
              <div className={cn("h-8 w-1/3 rounded animate-pulse", isDark ? "bg-gray-800" : "bg-gray-200")} />
              <div className={cn("h-4 w-full rounded animate-pulse", isDark ? "bg-gray-800" : "bg-gray-100")} />
              <div className={cn("h-4 w-full rounded animate-pulse", isDark ? "bg-gray-800" : "bg-gray-100")} />
              <div className={cn("h-4 w-2/3 rounded animate-pulse", isDark ? "bg-gray-800" : "bg-gray-100")} />
            </div>
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className={cn("aspect-video rounded-xl animate-pulse", isDark ? "bg-gray-800" : "bg-gray-200")} />
              <div className={cn("aspect-video rounded-xl animate-pulse", isDark ? "bg-gray-800" : "bg-gray-200")} />
            </div>
          </div>
        ) : null;
    }
  };

  return (
    <div className={cn(
      "relative transition-all duration-300 overflow-hidden",
      viewport === 'mobile' ? 'w-[375px] h-[667px] border-8 border-gray-800 rounded-[3rem] bg-gray-50' : 
      viewport === 'tablet' ? 'w-[768px] h-[1024px] border-8 border-gray-800 rounded-3xl bg-gray-50' : 
      'w-full h-full bg-gray-50'
    )}>
      <div 
        ref={scrollContainerRef}
        className="h-full overflow-y-auto custom-scrollbar relative"
      >
        {renderNodeToReact(navNode)}
        {renderContent()}
      </div>
    </div>
  );
};

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

  const generateWithAI = async () => {
    if (!aiPrompt.trim()) return;
    setIsGenerating(true);
    try {
      // Catatan: Di lingkungan produksi, API Key harus dikelola melalui backend/env
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

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImportJSON = (json: string) => {
    try {
      const parsed = JSON.parse(json);
      // Basic validation
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

  const updateConfig = (updates: Partial<NavbarConfig>) => {
    setConfig(prev => ({ ...prev, ...updates }));
  };

  const addLink = () => {
    const newLink: NavLink = {
      id: Math.random().toString(36).substr(2, 9),
      label: 'New Link',
      href: '#'
    };
    updateConfig({ links: [...config.links, newLink] });
  };

  const addDropdownLink = (parentId: string) => {
    const newSubLink: NavLink = {
      id: Math.random().toString(36).substr(2, 9),
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
              {isOpen ? <X size={24} /> : <Menu size={24} />}
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

  return (
    <div className="flex h-screen bg-[#F9FAFB] text-[#111827] font-sans overflow-hidden">
      {/* Sidebar */}
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
                          <span className="text-xs font-medium">Scrolled Padding</span>
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
                      className="p-1 hover:bg-indigo-50 text-indigo-600 rounded-md transition-colors"
                    >
                      <Plus size={18} />
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
                className="space-y-4"
              >
                <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                  <button 
                    onClick={() => setSubTab('tailwind')}
                    className={cn("flex-1 py-1.5 text-xs font-bold rounded-md transition-all", subTab === 'tailwind' ? "bg-white shadow-sm text-indigo-600" : "text-gray-500 hover:text-gray-700")}
                  >
                    Tailwind
                  </button>
                  <button 
                    onClick={() => setSubTab('le')}
                    className={cn("flex-1 py-1.5 text-xs font-bold rounded-md transition-all", subTab === 'le' ? "bg-white shadow-sm text-emerald-600" : "text-gray-500 hover:text-gray-700")}
                  >
                    Layout Engine
                  </button>
                  <button 
                    onClick={handleCopyJSON}
                    className="flex-1 py-1.5 text-xs font-bold rounded-md text-gray-500 hover:text-gray-700 transition-all flex items-center justify-center gap-1"
                  >
                    {copied ? <Check size={12} /> : <Copy size={12} />}
                    JSON
                  </button>
                </div>

                <div className="relative group">
                  <div className="absolute right-2 top-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={subTab === 'tailwind' ? handleCopy : handleCopyLE}
                      className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg text-white transition-all border border-white/20"
                    >
                      {subTab === 'tailwind' ? (copied ? <Check size={14} /> : <Copy size={14} />) : (copiedLE ? <Check size={14} /> : <Copy size={14} />)}
                    </button>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-gray-800 text-[10px] sm:text-xs">
                    <SyntaxHighlighter 
                      language="tsx" 
                      style={vscDarkPlus}
                      customStyle={{ margin: 0, padding: '1.5rem', borderRadius: '0.75rem', maxHeight: '400px' }}
                    >
                      {subTab === 'tailwind' ? generateCode() : generateLayoutEngineCode()}
                    </SyntaxHighlighter>
                  </div>
                </div>

                <div className={cn("p-4 rounded-xl border", subTab === 'tailwind' ? "bg-indigo-50 border-indigo-100 text-indigo-700" : "bg-emerald-50 border-emerald-100 text-emerald-700")}>
                  <p className="text-xs leading-relaxed font-medium">
                    {subTab === 'tailwind' 
                      ? "Stand-alone React component using Tailwind CSS utility classes. Zero dependencies."
                      : "Uses @damarkuncoro/navbar-engine and layout-engine-react for a cleaner, composable structure."}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <button className="w-full py-2.5 text-sm font-semibold text-gray-600 border border-gray-200 rounded-xl hover:bg-white transition-all flex items-center justify-center gap-2">
            <ExternalLink size={14} />
            Documentation
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 z-10">
          <div className="flex items-center gap-4">
            <div className="flex bg-gray-100 p-1 rounded-lg">
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
        <div className="flex-1 overflow-auto p-12 flex items-start justify-center bg-[#F3F4F6] pattern-grid">
          {activeTab === 'code' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-4xl bg-[#1E1E1E] rounded-2xl shadow-2xl overflow-hidden border border-gray-800"
            >
              <div className="flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-[#252526]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-4 text-xs font-mono text-gray-400">Navbar.tsx</span>
                </div>
                <button 
                  onClick={handleCopy}
                  className="text-xs font-medium text-gray-400 hover:text-white flex items-center gap-1.5"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="p-4 max-h-[600px] overflow-auto custom-scrollbar">
                <SyntaxHighlighter 
                  language="tsx" 
                  style={vscDarkPlus}
                  customStyle={{ background: 'transparent', padding: 0, fontSize: '13px' }}
                >
                  {generateCode()}
                </SyntaxHighlighter>
              </div>
            </motion.div>
          ) : (
            <NavbarPreview config={config} viewport={viewport} showContent={showContent} />
          )}
        </div>

        {/* Floating Tips */}
        <div className="absolute bottom-6 right-6 flex flex-col gap-2 pointer-events-none">
          <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-lg border border-gray-100 text-xs font-medium text-gray-500 flex items-center gap-2 animate-bounce">
            <Settings2 size={14} className="text-indigo-600" />
            Try changing the "Base Style" to see variations!
          </div>
        </div>
      </main>

      <style>{`
        .pattern-grid {
          background-image: radial-gradient(#E5E7EB 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1e1e1e;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #333;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #444;
        }
      `}</style>
    </div>
  );
}
