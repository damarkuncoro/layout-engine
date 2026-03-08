/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from "react";
import { Hero } from "./Hero";
import { motion, AnimatePresence } from "motion/react";
import { 
  Monitor, 
  Layout, 
  Maximize, 
  Image as ImageIcon, 
  Video, 
  ShoppingBag, 
  Minus, 
  Mail, 
  BarChart3, 
  PenTool, 
  CreditCard, 
  Smartphone,
  ChevronRight,
  ArrowRight,
  Code,
  Eye,
  Settings2,
  Copy,
  Check
} from "lucide-react";

const VARIANTS = [
  { id: "centered", name: "Centered Hero", icon: Layout },
  { id: "split", name: "Split Hero", icon: Monitor },
  { id: "fullscreen", name: "Fullscreen Hero", icon: Maximize },
  { id: "background", name: "Background Image", icon: ImageIcon },
  { id: "video", name: "Video Hero", icon: Video },
  { id: "product", name: "Product Showcase", icon: ShoppingBag },
  { id: "minimal", name: "Minimal Hero", icon: Minus },
  { id: "form", name: "Hero with Form", icon: Mail },
  { id: "stats", name: "Hero with Stats", icon: BarChart3 },
  { id: "illustration", name: "Illustration Hero", icon: PenTool },
  { id: "card", name: "Card Hero", icon: CreditCard },
  { id: "app", name: "App Preview Hero", icon: Smartphone },
];

export function HeroBuilder() {
  const [activeVariant, setActiveVariant] = useState("centered");
  const [viewMode, setViewMode] = useState<"preview" | "code">("preview");
  const [copied, setCopied] = useState(false);
  
  // Live Content State
  const [content, setContent] = useState({
    title: "Build your next big idea with confidence",
    subtitle: "The most powerful layout engine for React developers. Create stunning landing pages in minutes with our modular component system.",
    cta: "Get Started",
    secondaryCta: "View Demo",
    accentColor: "indigo"
  });

  const handleCopy = () => {
    const code = generateCode();
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateCode = () => {
    const { title, subtitle, cta } = content;
    switch (activeVariant) {
      case "centered":
        return `<Hero align="center">
  <Hero.Title>${title}</Hero.Title>
  <Hero.Subtitle>${subtitle}</Hero.Subtitle>
  <Hero.Actions>
    <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold">${cta}</button>
  </Hero.Actions>
  <Hero.Image src="https://picsum.photos/seed/dashboard/1200/600" alt="Preview" />
</Hero>`;
      case "split":
        return `<Hero align="left">
  <div className="grid md:grid-cols-2 gap-12 items-center">
    <div>
      <Hero.Title>${title}</Hero.Title>
      <Hero.Subtitle>${subtitle}</Hero.Subtitle>
      <Hero.Actions>
        <button className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold">${cta}</button>
      </Hero.Actions>
    </div>
    <Hero.Image src="https://picsum.photos/seed/app/800/800" alt="App" />
  </div>
</Hero>`;
      default:
        return `// Code for ${activeVariant} variant...`;
    }
  };

  const renderHero = () => {
    const { title, subtitle, cta, secondaryCta } = content;
    
    switch (activeVariant) {
      case "centered":
        return (
          <Hero align="center">
            <Hero.Title>{title}</Hero.Title>
            <Hero.Subtitle>{subtitle}</Hero.Subtitle>
            <Hero.Actions>
              <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors">
                {cta}
              </button>
              <button className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50 transition-colors">
                {secondaryCta}
              </button>
            </Hero.Actions>
            <Hero.Image 
              src="https://picsum.photos/seed/dashboard/1200/600" 
              alt="Dashboard Preview" 
              className="max-w-5xl mx-auto"
            />
          </Hero>
        );

      case "split":
        return (
          <Hero align="left">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Hero.Title className="text-5xl md:text-6xl">{title}</Hero.Title>
                <Hero.Subtitle>{subtitle}</Hero.Subtitle>
                <Hero.Actions>
                  <button className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">
                    {cta}
                  </button>
                </Hero.Actions>
              </div>
              <Hero.Image 
                src="https://picsum.photos/seed/app/800/800" 
                alt="App Illustration" 
                className="mt-0"
              />
            </div>
          </Hero>
        );

      case "fullscreen":
        return (
          <Hero align="center" fullscreen className="bg-slate-900 text-white">
            <Hero.Background overlay={false}>
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-slate-900 to-slate-900" />
            </Hero.Background>
            <Hero.Title className="text-white">{title}</Hero.Title>
            <Hero.Subtitle className="text-slate-300">{subtitle}</Hero.Subtitle>
            <Hero.Actions>
              <button className="px-10 py-5 bg-white text-slate-900 rounded-full font-bold text-lg hover:scale-105 transition-transform">
                {cta}
              </button>
            </Hero.Actions>
          </Hero>
        );

      case "background":
        return (
          <Hero align="center" className="text-white">
            <Hero.Background>
              <img 
                src="https://picsum.photos/seed/travel/1920/1080" 
                alt="Travel Background" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </Hero.Background>
            <Hero.Title className="text-white">{title}</Hero.Title>
            <Hero.Subtitle className="text-slate-100">{subtitle}</Hero.Subtitle>
            <Hero.Actions>
              <button className="px-8 py-4 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-colors">
                {cta}
              </button>
            </Hero.Actions>
          </Hero>
        );

      case "video":
        return (
          <Hero align="center" className="text-white">
            <Hero.Background>
              <Hero.Video src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-background-with-blue-lines-and-dots-31584-large.mp4" />
            </Hero.Background>
            <Hero.Title className="text-white">{title}</Hero.Title>
            <Hero.Subtitle className="text-slate-200">{subtitle}</Hero.Subtitle>
            <Hero.Actions>
              <button className="px-8 py-4 bg-white text-slate-900 rounded-xl font-semibold hover:bg-slate-100 transition-colors">
                {cta}
              </button>
            </Hero.Actions>
          </Hero>
        );

      case "product":
        return (
          <Hero align="center">
            <div className="max-w-4xl mx-auto">
              <span className="inline-block px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-sm font-bold mb-6">NEW ARRIVAL</span>
              <Hero.Title>{title}</Hero.Title>
              <Hero.Subtitle>{subtitle}</Hero.Subtitle>
              <Hero.Actions>
                <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors">
                  {cta}
                </button>
              </Hero.Actions>
              <Hero.Image 
                src="https://picsum.photos/seed/headphones/1000/600" 
                alt="Product" 
                className="mt-12 rounded-3xl"
              />
            </div>
          </Hero>
        );

      case "minimal":
        return (
          <Hero align="center" className="py-32">
            <Hero.Title className="text-5xl md:text-7xl mb-4">{title}</Hero.Title>
            <Hero.Subtitle className="mb-12">{subtitle}</Hero.Subtitle>
            <Hero.Actions>
              <button className="group flex items-center gap-2 text-slate-900 font-bold text-xl hover:gap-4 transition-all">
                {cta} <ArrowRight className="w-6 h-6" />
              </button>
            </Hero.Actions>
          </Hero>
        );

      case "form":
        return (
          <Hero align="center">
            <Hero.Title>{title}</Hero.Title>
            <Hero.Subtitle>{subtitle}</Hero.Subtitle>
            <Hero.Form>
              <div className="flex p-1">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-3 outline-none text-slate-900"
                />
                <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800 transition-colors">
                  {cta}
                </button>
              </div>
            </Hero.Form>
            <p className="mt-4 text-sm text-slate-500">No spam. Unsubscribe at any time.</p>
          </Hero>
        );

      case "stats":
        return (
          <Hero align="left">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Hero.Title>{title}</Hero.Title>
                <Hero.Subtitle>{subtitle}</Hero.Subtitle>
                <Hero.Actions>
                  <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold">
                    {cta}
                  </button>
                </Hero.Actions>
              </div>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: "Active Users", value: "2.5M+" },
                  { label: "Countries", value: "180+" },
                  { label: "Uptime", value: "99.99%" },
                  { label: "API Calls", value: "10B+" },
                ].map((stat, i) => (
                  <div key={i} className="p-6 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                    <div className="text-xs text-slate-500 uppercase font-bold tracking-wider">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </Hero>
        );

      case "illustration":
        return (
          <Hero align="left">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Hero.Title>{title}</Hero.Title>
                <Hero.Subtitle>{subtitle}</Hero.Subtitle>
                <Hero.Actions>
                  <button className="px-8 py-4 bg-pink-500 text-white rounded-xl font-semibold hover:bg-pink-600 transition-colors">
                    {cta}
                  </button>
                </Hero.Actions>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-pink-100 rounded-full blur-3xl opacity-50 -z-10" />
                <Hero.Image 
                  src="https://picsum.photos/seed/art/800/800" 
                  alt="Illustration" 
                  className="mt-0 rounded-full aspect-square object-cover border-8 border-white shadow-xl"
                />
              </div>
            </div>
          </Hero>
        );

      case "card":
        return (
          <Hero align="center">
            <Hero.Title>{title}</Hero.Title>
            <Hero.Subtitle>{subtitle}</Hero.Subtitle>
            <div className="grid md:grid-cols-3 gap-6 mt-16">
              {[
                { title: "Analytics", desc: "Real-time insights into your users.", icon: BarChart3 },
                { title: "Payments", desc: "Secure and fast global payments.", icon: CreditCard },
                { title: "Support", desc: "24/7 dedicated customer support.", icon: Mail },
              ].map((card, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -5 }}
                  className="p-8 bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all text-left"
                >
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-6">
                    <card.icon className="w-6 h-6 text-slate-900" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{card.title}</h3>
                  <p className="text-slate-600">{card.desc}</p>
                </motion.div>
              ))}
            </div>
          </Hero>
        );

      case "app":
        return (
          <Hero align="center" className="bg-slate-50">
            <Hero.Title>{title}</Hero.Title>
            <Hero.Subtitle>{subtitle}</Hero.Subtitle>
            <Hero.Actions>
              <button className="px-8 py-4 bg-slate-900 text-white rounded-xl font-semibold">
                {cta}
              </button>
            </Hero.Actions>
            <div className="mt-16 relative max-w-sm mx-auto">
              <div className="absolute -inset-10 bg-indigo-500/20 rounded-full blur-3xl" />
              <img 
                src="https://picsum.photos/seed/mobile/400/800" 
                alt="App Preview" 
                className="relative rounded-[3rem] border-8 border-slate-900 shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>
          </Hero>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* Sidebar */}
      <aside className="w-full lg:w-80 border-r border-slate-200 bg-slate-50/50 flex flex-col lg:h-screen sticky top-0 z-20">
        <div className="p-6 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center">
              <Layout className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-slate-900">HeroCraft</h1>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Builder Engine</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Layout Selection */}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Layout className="w-3 h-3" /> Layout Variants
            </p>
            <div className="grid grid-cols-2 gap-2">
              {VARIANTS.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setActiveVariant(v.id)}
                  className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl text-[10px] font-bold transition-all border ${
                    activeVariant === v.id 
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100" 
                      : "bg-white text-slate-500 border-slate-200 hover:border-slate-300"
                  }`}
                >
                  <v.icon className="w-5 h-5" />
                  {v.name.split(' ')[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Content Editing */}
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Settings2 className="w-3 h-3" /> Live Content
            </p>
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Headline</label>
                <textarea 
                  value={content.title}
                  onChange={(e) => setContent({...content, title: e.target.value})}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none min-h-[80px]"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Subtitle</label>
                <textarea 
                  value={content.subtitle}
                  onChange={(e) => setContent({...content, subtitle: e.target.value})}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none min-h-[100px]"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-500 uppercase mb-1 block">Primary CTA</label>
                <input 
                  type="text"
                  value={content.cta}
                  onChange={(e) => setContent({...content, cta: e.target.value})}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-200 bg-white">
          <button 
            onClick={handleCopy}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? "Copied!" : "Copy JSX Code"}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative flex flex-col">
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Builder</span>
            <ChevronRight className="w-4 h-4" />
            <span className="font-semibold text-slate-900">{VARIANTS.find(v => v.id === activeVariant)?.name}</span>
          </div>
          
          <div className="flex bg-slate-100 p-1 rounded-lg">
            <button 
              onClick={() => setViewMode("preview")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                viewMode === "preview" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> Preview
            </button>
            <button 
              onClick={() => setViewMode("code")}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                viewMode === "code" ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-700"
              }`}
            >
              <Code className="w-3.5 h-3.5" /> Code
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-slate-100/30">
          <AnimatePresence mode="wait">
            {viewMode === "preview" ? (
              <motion.div
                key="preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="min-h-full"
              >
                {renderHero()}
              </motion.div>
            ) : (
              <motion.div
                key="code"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="p-8 max-w-4xl mx-auto"
              >
                <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-2xl">
                  <div className="flex items-center justify-between px-6 py-4 bg-slate-800 border-b border-slate-700">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">HeroComponent.tsx</span>
                    <button onClick={handleCopy} className="text-slate-400 hover:text-white transition-colors">
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <pre className="p-8 text-indigo-300 font-mono text-sm overflow-x-auto leading-relaxed">
                    <code>{generateCode()}</code>
                  </pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <footer className="p-6 border-t border-slate-200 bg-white flex items-center justify-between">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
            © 2026 HeroCraft Engine • Built with React & Tailwind
          </p>
          <div className="flex gap-4">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">System Online</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
