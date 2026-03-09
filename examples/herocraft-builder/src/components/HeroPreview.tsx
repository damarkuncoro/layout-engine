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
    title: config.title,
    description: config.description,
    visual: config.visualType === 'image' ? config.visualUrl : null,
    video: config.visualType === 'video' ? config.videoUrl : undefined,
    actions: config.actions.map(action => ({
      id: action.id,
      label: action.label,
      href: action.href,
      variant: action.variant as any,
      onClick: () => console.log('Action clicked:', action.label)
    })),
    stats: config.variant === 'stats' ? config.stats : [],
    background: config.backgroundColor,
    visualOverlay: config.visualOverlay,
    paddingY: (config.pattern === 'fullscreen' || config.variant === 'background' || config.variant === 'video') ? '0' : config.paddingY,
    paddingX: config.paddingX,
    viewportWidth,
    reverse: config.reverse,
    style: {
      color: config.textColor,
      ...(config.style === 'brutalist' && {
        border: '4px solid #000',
        boxShadow: '12px 12px 0px 0px #000',
      }),
      ...(config.style === 'glass' && {
        backdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
      }),
      ...(config.pattern === 'fullscreen' && {
        height: '100%',
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
