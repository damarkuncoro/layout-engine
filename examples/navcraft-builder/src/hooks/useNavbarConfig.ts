import { useState, useEffect } from 'react';
import { NavbarConfig, NavLink, DEFAULT_CONFIG } from '../types';

const STORAGE_KEY = 'navcraft_config';

export function useNavbarConfig() {
  const [config, setConfig] = useState<NavbarConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

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

  const handleImportJSON = (json: string, onSuccess?: () => void) => {
    try {
      const parsed = JSON.parse(json);
      if (parsed && typeof parsed === 'object' && parsed.style) {
        setConfig({ ...DEFAULT_CONFIG, ...parsed });
        onSuccess?.();
      } else {
        alert("Invalid JSON format. Please check the structure.");
      }
    } catch (e) {
      alert("Invalid JSON. Please ensure it's a valid JSON string.");
    }
  };

  const resetConfig = () => setConfig(DEFAULT_CONFIG);

  return {
    config,
    updateConfig,
    addLink,
    addDropdownLink,
    removeLink,
    removeDropdownLink,
    updateLink,
    updateDropdownLink,
    handleImportJSON,
    resetConfig
  };
}
