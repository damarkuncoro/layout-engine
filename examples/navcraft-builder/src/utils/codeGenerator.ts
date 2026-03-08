import { NavbarConfig } from '../types';
import { cn } from '../lib/utils';

export const generateLayoutEngineCode = (config: NavbarConfig) => {
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

export const generateTailwindCode = (config: NavbarConfig) => {
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
}
