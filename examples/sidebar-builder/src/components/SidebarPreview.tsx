import { useState } from 'react';
import { 
  LayoutDashboard,
  BarChart,
  Users,
  User,
  Shield,
  Bell,
  Settings,
  Home,
  FileText,
  HelpCircle
} from 'lucide-react';
import { DashboardContent } from './content/DashboardContent';
import { SettingsContent } from './content/SettingsContent';
import { DocsContent } from './content/DocsContent';
import { PlaceholderContent } from './content/PlaceholderContent';
import { SidebarConfig } from '../types';
import { cn } from '../utils/cn';

interface SidebarPreviewProps {
  config: SidebarConfig;
  isDark: boolean;
  isBrutalist: boolean;
  isGlass: boolean;
  isFloating: boolean;
  viewport: 'mobile' | 'tablet' | 'desktop';
  showContent: boolean;
}

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  LayoutDashboard,
  BarChart,
  Users,
  User,
  Shield,
  Bell,
  Settings,
  Home,
  FileText,
  HelpCircle
};

export const SidebarPreview = ({ 
  config, 
  isDark,
  isBrutalist,
  isGlass,
  isFloating,
  viewport, 
  showContent 
}: SidebarPreviewProps) => {
  const [collapsed, setCollapsed] = useState(config.collapsed);
  const [activeItem, setActiveItem] = useState<string | null>('1-1');

  const getContainerStyle = () => {
    const baseStyle: Record<string, string> = {
      display: 'flex',
      height: '100%',
      width: '100%',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    };

    if (isGlass) {
      return {
        ...baseStyle,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        borderRight: `${config.borderWidth} solid ${config.borderColor}`,
      };
    }

    if (isBrutalist) {
      return {
        ...baseStyle,
        backgroundColor: config.backgroundColor,
        borderRight: `4px solid ${config.borderColor || '#000'}`,
        boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)',
      };
    }

    if (isFloating) {
      return {
        ...baseStyle,
        backgroundColor: config.backgroundColor,
        borderRight: 'none',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      };
    }

    return {
      ...baseStyle,
      backgroundColor: config.backgroundColor,
      borderRight: `${config.borderWidth} solid ${config.borderColor}`,
    };
  };

  const sidebarWidth = collapsed ? '80px' : config.width;

  const renderSidebar = () => (
    <aside
      className="flex flex-col h-full transition-all duration-300"
      style={{
        width: sidebarWidth,
        ...getContainerStyle(),
      }}
    >
      {/* Header */}
      {config.showHeader && (
        <div 
          className={cn(
            "flex items-center justify-center border-b shrink-0",
            isDark ? "border-gray-700" : "border-gray-200"
          )}
          style={{ padding: collapsed ? '20px 10px' : '24px' }}
        >
          {config.header?.logoType === 'text' ? (
            <h1 
              className={cn(
                "font-bold tracking-tight whitespace-nowrap overflow-hidden",
                collapsed ? "text-center text-lg" : "text-xl"
              )}
              style={{ color: config.textColor }}
            >
              {collapsed ? config.header?.logoText?.charAt(0) || 'L' : config.header?.logoText || 'Logo'}
            </h1>
          ) : config.header?.logoUrl ? (
            <img 
              src={config.header.logoUrl} 
              alt="Logo" 
              className={cn("object-contain", collapsed ? "w-8 h-8" : "h-8")}
            />
          ) : null}
        </div>
      )}

      {/* Navigation Groups */}
      <div 
        className="flex-1 overflow-y-auto py-4"
        style={{ padding: collapsed ? '8px' : config.padding }}
      >
        {config.groups.map((group) => (
          <div key={group.id} className={cn("mb-6", collapsed && "flex flex-col items-center")}>
            {/* Group Title */}
            {!collapsed && group.title && (
              <h3 
                className="text-xs font-bold uppercase tracking-wider mb-3 px-3"
                style={{ color: isDark ? '#6b7280' : '#9ca3af' }}
              >
                {group.title}
              </h3>
            )}

            {/* Items */}
            <nav className="space-y-1">
              {group.items.map((item) => {
                const IconComponent = item.icon ? ICON_MAP[item.icon] : null;
                const isActive = activeItem === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveItem(item.id)}
                    className={cn(
                      "w-full flex items-center gap-3 rounded-lg transition-all",
                      collapsed ? "justify-center p-3" : "px-3 py-2.5",
                      isActive 
                        ? (isDark ? "bg-gray-800" : "bg-gray-100")
                        : (isDark ? "text-gray-400 hover:text-white hover:bg-gray-800" : "text-gray-600 hover:bg-gray-100")
                    )}
                    style={{
                      color: isActive ? config.primaryColor : (isDark ? '#9ca3af' : config.textColor),
                      backgroundColor: isActive 
                        ? (isDark ? `${config.primaryColor}20` : `${config.primaryColor}15`)
                        : 'transparent'
                    }}
                  >
                    {IconComponent ? (
                      <IconComponent size={18} className={collapsed ? "" : "shrink-0"} />
                    ) : (
                      <span className={collapsed ? "" : "w-[18px]"}>○</span>
                    )}
                    
                    {!collapsed && (
                      <>
                        <span className="flex-1 text-left text-sm font-medium whitespace-nowrap">
                          {item.label}
                        </span>
                        {item.badge && (
                          <span 
                            className="px-2 py-0.5 text-xs font-bold rounded-full"
                            style={{ 
                              backgroundColor: isDark ? '#374151' : '#f3f4f6',
                              color: isDark ? '#d1d5db' : '#6b7280'
                            }}
                          >
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        ))}
      </div>

      {/* Footer */}
      {config.showFooter && !collapsed && (
        <div 
          className={cn(
            "p-4 border-t shrink-0",
            isDark ? "border-gray-700" : "border-gray-200"
          )}
        >
          <p 
            className="text-xs text-center"
            style={{ color: isDark ? '#6b7280' : '#9ca3af' }}
          >
            {config.footer?.text || '© 2026 SidebarCraft'}
          </p>
        </div>
      )}

      {/* Collapsible Toggle */}
      {config.collapsible && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "flex items-center justify-center border-t shrink-0 transition-colors",
            collapsed ? "p-3" : "p-3",
            isDark 
              ? "border-gray-700 text-gray-400 hover:text-white" 
              : "border-gray-200 text-gray-500 hover:text-gray-900"
          )}
        >
          {collapsed ? <span>→</span> : <span>←</span>}
        </button>
      )}
    </aside>
  );

  const renderContent = () => {
    switch (config.pageContext) {
      case 'dashboard':
        return <DashboardContent isDark={isDark} />;
      case 'settings':
        return <SettingsContent isDark={isDark} />;
      case 'docs':
        return <DocsContent isDark={isDark} />;
      default:
        return showContent ? <PlaceholderContent isDark={isDark} /> : null;
    }
  };

  return (
    <div 
      className={cn(
        "relative transition-all duration-300 overflow-hidden",
        viewport === 'mobile' ? 'w-[375px] h-[667px] border-8 border-gray-800 rounded-[3rem]' : 
        viewport === 'tablet' ? 'w-[768px] h-[1024px] border-8 border-gray-800 rounded-3xl' : 
        'w-full h-full'
      )}
      style={{
        backgroundColor: isDark ? '#111827' : '#f3f4f6'
      }}
    >
      <div className="flex h-full overflow-hidden">
        {renderSidebar()}
        {renderContent()}
      </div>
    </div>
  );
};