import { SidebarConfig } from '../types';

export const generateLayoutEngineCode = (config: SidebarConfig) => {
  const groups = config.groups.map(group => 
    `{
      id: "${group.id}",
      title: "${group.title || ''}",
      items: [${group.items.map(item => 
        `{ id: "${item.id}", label: "${item.label.replace(/"/g, '\\"')}", href: "${item.href}"${item.badge ? `, badge: "${item.badge}"` : ''} }`
      ).join(", ")}]
    }`
  ).join(",\n    ")

  return `import React from "react"
import { Box, Flex, Sidebar } from "@damarkuncoro/layout-engine-react"

export default function MySidebar() {
  const groups = [
    ${groups}
  ]
  
  const header = ${config.showHeader ? `Box({ children: "${config.header?.logoText || 'Logo'}" })` : "null"}
  const footer = ${config.showFooter ? `Box({ children: "${config.footer?.text || ''}" })` : "null"}

  return Sidebar({
    groups,
    header,
    footer,
    width: "${config.width}",
    collapsed: ${config.collapsed},
    background: "${config.backgroundColor}",
    color: "${config.textColor}",
    padding: "${config.padding}"
  })
}
`
}

export const generateTailwindCode = (config: SidebarConfig) => {
  const isDark = config.theme === 'dark';
  const isBrutalist = config.style === 'brutalist';
  const isGlass = config.style === 'glass';
  const isFloating = config.style === 'floating';

  const groupsHtml = config.groups.map(group => {
    const itemsHtml = group.items.map(item => {
      return `
            <a 
              key="${item.id}"
              href="${item.href}"
              className={collapsed ? 'justify-center px-3 py-3' : 'px-3 py-2' + " flex items-center gap-3 rounded-lg ${isDark ? 'text-gray-300 hover:bg-gray-800' : 'text-gray-700 hover:bg-gray-100'} transition-colors"}
            >
              <span className={collapsed ? '' : 'shrink-0'}>${item.icon || '○'}</span>
              {!collapsed && (
                <>
                  <span className="flex-1 text-sm font-medium">${item.label}</span>
                  ${item.badge ? `
                  <span className="px-2 py-0.5 text-xs font-bold rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-200'}">
                    ${item.badge}
                  </span>
                  ` : ''}
                </>
              )}
            </a>`;
    }).join('');

    return `
        <div key="${group.id}" className="mb-6">
          {!collapsed && "${group.title || ''}" && (
            <h3 className="text-xs font-bold uppercase tracking-wider ${isDark ? 'text-gray-500' : 'text-gray-400'} mb-2 px-2">
              ${group.title}
            </h3>
          )}
          <nav className="space-y-1">
            ${itemsHtml}
          </nav>
        </div>`;
  }).join('');

  return `import React, { useState } from 'react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(${config.collapsed});

  return (
    <aside className="${isGlass ? 'backdrop-blur-md bg-white/80' : isBrutalist ? 'bg-yellow-400 border-4 border-black' : isFloating ? 'bg-gray-900 shadow-2xl' : isDark ? 'bg-gray-900' : 'bg-white'} flex flex-col h-full transition-all duration-300" style={{
      width: collapsed ? '80px' : '${config.width}',
      borderRight: '${config.borderWidth} solid ${config.borderColor}'
    }}>
      ${config.showHeader ? `
      <div className="p-6 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}">
        <h1 className={collapsed ? 'text-center text-xl' : 'text-xl font-bold'}>${config.header?.logoText || 'Logo'}</h1>
      </div>
      ` : ''}

      <div className="flex-1 overflow-y-auto p-4">
        ${groupsHtml}
      </div>

      ${config.showFooter ? `
      {!collapsed && (
        <div className="p-4 border-t ${isDark ? 'border-gray-700' : 'border-gray-200'}">
          <p className="text-xs text-gray-500">${config.footer?.text || ''}</p>
        </div>
      )}
      ` : ''}
      
      ${config.collapsible ? `
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="p-3 border-t ${isDark ? 'border-gray-700 text-gray-400 hover:text-white' : 'border-gray-200 text-gray-500 hover:text-gray-900'} transition-colors"
      >
        {collapsed ? '→' : '←'}
      </button>
      ` : ''}
    </aside>
  );
};

export default Sidebar;`;
}
