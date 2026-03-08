import { useState, useEffect, useRef } from 'react';
import { 
  ChevronDown,
  Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { NavbarConfig } from '../types';
import { cn } from '../lib/utils';
import { 
  Navbar as LE_Navbar,
} from "@damarkuncoro/navbar-engine";
import { 
  renderNodeToReact, 
  StatsGridPreset,
  ProductGridPreset,
  BlogPostPreset,
  DashboardLayout,
  LandingLayout,
  AuthLayout
} from "@damarkuncoro/layout-engine-react";

interface NavbarPreviewProps {
  config: NavbarConfig;
  viewport: 'mobile' | 'tablet' | 'desktop';
  showContent: boolean;
}

export const NavbarPreview = ({ config, viewport, showContent }: NavbarPreviewProps) => {
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
          <div className={cn("min-h-full transition-colors duration-300", bgClass)}>
            <LandingLayout 
              hero={
                <div className="text-center space-y-4 py-20 px-6">
                  <h1 className="text-4xl font-extrabold tracking-tight">Scale your business faster</h1>
                  <p className={cn("text-lg max-w-2xl mx-auto", textMutedClass)}>Build beautiful interfaces with our headless layout engine primitives.</p>
                  <div className="flex justify-center gap-4 mt-8">
                    <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-bold hover:bg-indigo-700 transition-colors">Get Started</button>
                    <button className={cn("px-6 py-3 border rounded-lg font-bold transition-colors", isDark ? "bg-gray-800 border-gray-700 text-white" : "bg-white border-gray-200 text-gray-900")}>Learn More</button>
                  </div>
                </div>
              }
              features={
                <div className="px-6 pb-20">
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
              }
            />
          </div>
        );
      case 'dashboard':
        return (
          <div className={cn("min-h-full transition-colors duration-300", bgClass)}>
            <DashboardLayout 
              header={null}
              sidebar={
                <div className={cn("w-64 border-r h-full p-4 space-y-2 hidden lg:block", borderClass)}>
                  {['Overview', 'Analytics', 'Customers', 'Reports', 'Settings'].map(item => (
                    <div key={item} className={cn("px-4 py-2 rounded-lg text-sm font-medium cursor-pointer", item === 'Overview' ? "bg-indigo-50 text-indigo-600" : textMutedClass)}>
                      {item}
                    </div>
                  ))}
                </div>
              }
              children={
                <div className="p-6 space-y-6">
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
              }
            />
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
