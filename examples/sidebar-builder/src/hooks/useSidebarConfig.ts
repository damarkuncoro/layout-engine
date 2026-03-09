import { useState, useEffect } from 'react';
import { SidebarConfig, SidebarItem, SidebarGroup, DEFAULT_CONFIG } from '../types';

const STORAGE_KEY = 'sidebarcraft_config';

export function useSidebarConfig() {
  const [config, setConfig] = useState<SidebarConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const updateConfig = (updates: Partial<SidebarConfig>) => {
    setConfig((prev: SidebarConfig) => ({ ...prev, ...updates }));
  };

  const addGroup = () => {
    const newGroup: SidebarGroup = {
      id: Math.random().toString(36).substring(2, 9),
      title: 'New Group',
      items: []
    };
    updateConfig({ groups: [...config.groups, newGroup] });
  };

  const addItemToGroup = (groupId: string) => {
    const newItem: SidebarItem = {
      id: Math.random().toString(36).substring(2, 9),
      label: 'New Item',
      href: '#'
    };
    updateConfig({
      groups: config.groups.map((g: SidebarGroup) => {
        if (g.id === groupId) {
          return { ...g, items: [...g.items, newItem] };
        }
        return g;
      })
    });
  };

  const removeGroup = (groupId: string) => {
    updateConfig({ groups: config.groups.filter((g: SidebarGroup) => g.id !== groupId) });
  };

  const removeItem = (groupId: string, itemId: string) => {
    updateConfig({
      groups: config.groups.map((g: SidebarGroup) => {
        if (g.id === groupId) {
          return { ...g, items: g.items.filter((i: SidebarItem) => i.id !== itemId) };
        }
        return g;
      })
    });
  };

  const updateGroup = (groupId: string, title: string) => {
    updateConfig({
      groups: config.groups.map((g: SidebarGroup) => g.id === groupId ? { ...g, title } : g)
    });
  };

  const updateItem = (groupId: string, itemId: string, label: string) => {
    updateConfig({
      groups: config.groups.map((g: SidebarGroup) => {
        if (g.id === groupId) {
          return {
            ...g,
            items: g.items.map((i: SidebarItem) => i.id === itemId ? { ...i, label } : i)
          };
        }
        return g;
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
    addGroup,
    addItemToGroup,
    removeGroup,
    removeItem,
    updateGroup,
    updateItem,
    handleImportJSON,
    resetConfig
  };
}