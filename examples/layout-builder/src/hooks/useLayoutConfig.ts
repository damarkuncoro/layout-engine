import { useState, useEffect, useCallback } from 'react'
import { LayoutConfig, LayoutElement, DEFAULT_LAYOUT_CONFIG } from '../types'

const STORAGE_KEY = 'layout-builder-config';

export function useLayoutConfig() {
  const [config, setConfig] = useState<LayoutConfig>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_LAYOUT_CONFIG;
      }
    }
    return DEFAULT_LAYOUT_CONFIG;
  });

  const [history, setHistory] = useState<LayoutConfig[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const updateConfig = useCallback((updates: Partial<LayoutConfig>) => {
    setConfig((prev) => {
      const next = { ...prev, ...updates };
      setHistory((h) => [...h.slice(0, historyIndex + 1), prev]);
      setHistoryIndex((i) => i + 1);
      return next;
    });
  }, [historyIndex]);

  const updateElement = useCallback((id: string, updates: Partial<LayoutElement>) => {
    setConfig((prev) => {
      const next = {
        ...prev,
        children: prev.children.map((el) => (el.id === id ? { ...el, ...updates } : el)),
      };
      setHistory((h) => [...h.slice(0, historyIndex + 1), prev]);
      setHistoryIndex((i) => i + 1);
      return next;
    });
  }, [historyIndex]);

  const addElement = useCallback(() => {
    const newId = (config.children.length + 1).toString()
    setConfig((prev) => {
      const next = {
        ...prev,
        children: [
          ...prev.children,
          {
            id: newId,
            type: 'box' as const,
            content: `New Element ${newId}`,
            backgroundColor: '#ffffff',
            padding: '1rem',
          },
        ],
      };
      setHistory((h) => [...h.slice(0, historyIndex + 1), prev]);
      setHistoryIndex((i) => i + 1);
      return next;
    });
  }, [config.children.length, historyIndex]);

  const removeElement = useCallback((id: string) => {
    setConfig((prev) => {
      const next = {
        ...prev,
        children: prev.children.filter((el) => el.id !== id),
      };
      setHistory((h) => [...h.slice(0, historyIndex + 1), prev]);
      setHistoryIndex((i) => i + 1);
      return next;
    });
  }, [historyIndex]);

  const addPreset = useCallback((type: '3-cols' | 'hero' | 'sidebar') => {
    const startId = config.children.length + 1;
    let newElements: LayoutElement[] = [];

    if (type === '3-cols') {
      newElements = [
        { id: `${startId}`, type: 'box' as const, content: 'Col 1', backgroundColor: '#ffffff', padding: '1rem' },
        { id: `${startId + 1}`, type: 'box' as const, content: 'Col 2', backgroundColor: '#ffffff', padding: '1rem' },
        { id: `${startId + 2}`, type: 'box' as const, content: 'Col 3', backgroundColor: '#ffffff', padding: '1rem' },
      ];
    } else if (type === 'hero') {
      newElements = [
        { id: `${startId}`, type: 'box' as const, content: '🔥 Hero Title', backgroundColor: '#3b82f6', padding: '3rem', direction: 'column' as const, textAlign: 'center' as const, color: '#ffffff', fontSize: '2.5rem' },
      ];
    }

    setConfig((prev) => {
      const next = {
        ...prev,
        children: [...prev.children, ...newElements],
      };
      setHistory((h) => [...h.slice(0, historyIndex + 1), prev]);
      setHistoryIndex((i) => i + 1);
      return next;
    });
  }, [config.children.length, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex >= 0) {
      const prev = history[historyIndex];
      setConfig(prev);
      setHistoryIndex((i) => i - 1);
    }
  }, [history, historyIndex]);

  return {
    config,
    canUndo: historyIndex >= 0,
    updateConfig,
    updateElement,
    addElement,
    removeElement,
    addPreset,
    undo
  }
}
