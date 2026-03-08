import { HeroConfig } from '../types';

export const generateLayoutEngineCode = (config: HeroConfig) => {
  return `import React from "react"
import { Box, Hero } from "@damarkuncoro/hero-engine-react"

export default function MyHero() {
  return Hero({
    pattern: "${config.pattern}",
    title: "${config.title.replace(/"/g, '\\"')}",
    description: "${config.description.replace(/"/g, '\\"')}",
    visual: ${config.visualType === 'image' ? `"${config.visualUrl}"` : 'null'},
    actions: [
      ${config.actions.map(a => `{ id: "${a.id}", label: "${a.label.replace(/"/g, '\\"')}", href: "${a.href}", variant: "${a.variant}" }`).join(",\n      ")}
    ],
    background: "${config.backgroundColor}",
    paddingY: "${config.paddingY}",
    paddingX: "${config.paddingX}",
    reverse: ${config.reverse},
    style: {
      borderRadius: "${config.borderRadius}",
      ${config.style === 'brutalist' ? 'border: "4px solid #000", boxShadow: "12px 12px 0px 0px #000"' : ''}
    }
  })
}
`
}

export const generateTailwindCode = (config: HeroConfig) => {
  const isSplit = config.pattern === 'split';
  const isCentered = config.pattern === 'centered';
  const isFullscreen = config.pattern === 'fullscreen';
  const isOverlap = config.pattern === 'overlap';

  return `import React from 'react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-20 px-6" style={{ backgroundColor: '${config.backgroundColor}' }}>
      <div className="max-w-7xl mx-auto">
        <div className="${
          isSplit ? `flex flex-col ${config.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-12` :
          isCentered ? 'text-center flex flex-col items-center gap-8' :
          isFullscreen ? 'h-screen flex items-center justify-center' :
          'relative'
        }">
          <div className="${isSplit ? 'lg:w-1/2' : isCentered ? 'max-w-3xl' : ''}">
            <h1 className="text-4xl lg:text-6xl font-extrabold mb-6" style={{ color: '${config.textColor}' }}>
              ${config.title}
            </h1>
            <p className="text-lg opacity-80 mb-8" style={{ color: '${config.textColor}' }}>
              ${config.description}
            </p>
            <div className="flex flex-wrap gap-4 ${isCentered ? 'justify-center' : ''}">
              ${config.actions.map(action => `
              <a href="${action.href}" className="px-6 py-3 font-bold transition-all hover:scale-105" style={{ 
                backgroundColor: '${action.variant === 'primary' ? config.primaryColor : 'transparent'}',
                color: '${action.variant === 'primary' ? '#fff' : config.textColor}',
                border: '${action.variant === 'outline' ? `2px solid ${config.primaryColor}` : 'none'}',
                borderRadius: '${config.borderRadius}'
              }}>
                ${action.label}
              </a>`).join('')}
            </div>
          </div>
          
          ${config.visualType === 'image' ? `
          <div className="${isSplit ? 'lg:w-1/2' : ''}">
            <img 
              src="${config.visualUrl}" 
              alt="Hero Visual" 
              className="rounded-2xl shadow-2xl w-full object-cover"
              style={{ borderRadius: '${config.borderRadius}' }}
            />
          </div>` : ''}
        </div>
      </div>
    </section>
  );
};

export default Hero;`;
}
