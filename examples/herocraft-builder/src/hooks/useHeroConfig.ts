import { useState } from 'react';
import { HeroConfig } from '../types';

export function useHeroConfig(initialConfig: HeroConfig) {
  const [config, setConfig] = useState<HeroConfig>(initialConfig);

  const updateConfig = (updates: Partial<HeroConfig>) => {
    setConfig(prev => {
      const newConfig = { ...prev, ...updates };
      if (updates.variant) {
        switch (updates.variant) {
          case 'centered':
          case 'cards':
          case 'app-preview':
            newConfig.pattern = 'centered';
            break;
          case 'fullscreen':
          case 'background':
          case 'video':
            newConfig.pattern = 'fullscreen';
            break;
          case 'minimal':
            newConfig.pattern = 'minimal';
            break;
          default:
            newConfig.pattern = 'split';
        }
      }
      return newConfig;
    });
  };

  return {
    config,
    updateConfig
  };
}
