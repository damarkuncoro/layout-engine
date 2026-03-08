import { HeroConfig } from '../types';
import { Hero as LE_Hero } from "@damarkuncoro/hero-engine";
import { renderNodeToReact } from "@damarkuncoro/layout-engine-react";

interface HeroPreviewProps {
  config: HeroConfig;
  viewport: 'mobile' | 'tablet' | 'desktop';
}

export const HeroPreview = ({ config, viewport }: HeroPreviewProps) => {
  const viewportWidth = viewport === 'mobile' ? 375 : viewport === 'tablet' ? 767 : 1200;

  const heroNode = LE_Hero({
    pattern: config.pattern,
    title: (
      <span style={{ color: config.textColor, fontSize: '2.5rem', fontWeight: 800, lineHeight: 1.2 }}>
        {config.title}
      </span>
    ),
    description: (
      <span style={{ color: config.textColor, opacity: 0.8, fontSize: '1.125rem', lineHeight: 1.6 }}>
        {config.description}
      </span>
    ),
    visual: config.visualType === 'image' ? (
      <img 
        src={config.visualUrl} 
        alt="Hero Visual" 
        className="rounded-2xl shadow-2xl object-cover w-full h-auto max-h-[500px]"
        style={{ borderRadius: config.borderRadius }}
      />
    ) : null,
    actions: config.actions.map(action => ({
      id: action.id,
      label: action.label,
      href: action.href,
      onClick: () => console.log('Action clicked:', action.label)
    })),
    background: config.backgroundColor,
    paddingY: config.paddingY,
    paddingX: config.paddingX,
    viewportWidth,
    reverse: config.reverse,
    style: {
      ...(config.style === 'brutalist' && {
        border: '4px solid #000',
        boxShadow: '12px 12px 0px 0px #000',
      }),
      ...(config.style === 'glass' && {
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      })
    }
  });

  return (
    <div className="w-full h-full overflow-y-auto bg-gray-50 flex items-center justify-center p-4">
      <div 
        className="bg-white shadow-2xl overflow-hidden transition-all duration-300 mx-auto"
        style={{ width: viewportWidth }}
      >
        {renderNodeToReact(heroNode)}
      </div>
    </div>
  );
};
