import { 
  Monitor, 
  Smartphone, 
  Tablet, 
  ExternalLink, 
  Layout, 
  RotateCcw, 
  Code2 
} from 'lucide-react';
import { cn } from '../lib/utils';

interface PreviewHeaderProps {
  viewport: 'mobile' | 'tablet' | 'desktop';
  setViewport: (v: 'mobile' | 'tablet' | 'desktop') => void;
  isFullscreen: boolean;
  setIsFullscreen: (v: boolean) => void;
  showContent: boolean;
  setShowContent: (v: boolean) => void;
  resetConfig: () => void;
  setActiveTab: (t: 'layout' | 'style' | 'links' | 'code') => void;
}

export const PreviewHeader = ({
  viewport,
  setViewport,
  isFullscreen,
  setIsFullscreen,
  showContent,
  setShowContent,
  resetConfig,
  setActiveTab
}: PreviewHeaderProps) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 z-10">
      <div className="flex items-center gap-4">
        <div className="flex p-1 bg-gray-100 rounded-lg">
          <button 
            onClick={() => setViewport('desktop')}
            className={cn("p-1.5 rounded-md transition-all", viewport === 'desktop' ? "bg-white shadow-sm text-indigo-600" : "text-gray-400 hover:text-gray-600")}
          >
            <Monitor size={18} />
          </button>
          <button 
            onClick={() => setViewport('tablet')}
            className={cn("p-1.5 rounded-md transition-all", viewport === 'tablet' ? "bg-white shadow-sm text-indigo-600" : "text-gray-400 hover:text-gray-600")}
          >
            <Tablet size={18} />
          </button>
          <button 
            onClick={() => setViewport('mobile')}
            className={cn("p-1.5 rounded-md transition-all", viewport === 'mobile' ? "bg-white shadow-sm text-indigo-600" : "text-gray-400 hover:text-gray-600")}
          >
            <Smartphone size={18} />
          </button>
        </div>
        <div className="h-4 w-px bg-gray-200" />
        <button 
          onClick={() => setIsFullscreen(!isFullscreen)}
          className={cn("p-1.5 rounded-md transition-all", isFullscreen ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-gray-600")}
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          <ExternalLink size={18} className={isFullscreen ? "rotate-180" : ""} />
        </button>
        <div className="h-4 w-px bg-gray-200" />
        <button 
          onClick={() => setShowContent(!showContent)}
          className={cn("p-1.5 rounded-md transition-all", !showContent ? "bg-indigo-600 text-white" : "text-gray-400 hover:text-gray-600")}
          title={showContent ? "Hide Page Content" : "Show Page Content"}
        >
          <Layout size={18} />
        </button>
        <div className="h-4 w-px bg-gray-200" />
        <span className="text-sm font-medium text-gray-500">
          {viewport === 'desktop' ? 'Desktop View (100%)' : viewport === 'tablet' ? 'Tablet View (768px)' : 'Mobile View (375px)'}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={resetConfig}
          className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded-lg transition-all flex items-center gap-2"
        >
          <RotateCcw size={16} />
          Reset
        </button>
        <button 
          onClick={() => setActiveTab('code')}
          className="px-4 py-2 text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-all shadow-md shadow-indigo-100 flex items-center gap-2"
        >
          <Code2 size={16} />
          Export
        </button>
      </div>
    </header>
  );
};
