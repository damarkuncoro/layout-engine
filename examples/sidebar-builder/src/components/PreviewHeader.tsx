import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Maximize2, 
  Minimize2, 
  RotateCcw,
  Eye,
  EyeOff
} from 'lucide-react';
import { cn } from '../lib/utils';

interface PreviewHeaderProps {
  viewport: 'mobile' | 'tablet' | 'desktop';
  setViewport: (viewport: 'mobile' | 'tablet' | 'desktop') => void;
  isFullscreen: boolean;
  setIsFullscreen: (fullscreen: boolean) => void;
  showContent: boolean;
  setShowContent: (show: boolean) => void;
  resetConfig: () => void;
}

export const PreviewHeader = ({
  viewport,
  setViewport,
  isFullscreen,
  setIsFullscreen,
  showContent,
  setShowContent,
  resetConfig
}: PreviewHeaderProps) => {
  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewport('desktop')}
            className={cn(
              "p-2 rounded-lg transition-all",
              viewport === 'desktop' ? "bg-emerald-100 text-emerald-600" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            )}
            title="Desktop view"
          >
            <Monitor size={18} />
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={cn(
              "p-2 rounded-lg transition-all",
              viewport === 'tablet' ? "bg-emerald-100 text-emerald-600" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            )}
            title="Tablet view"
          >
            <Tablet size={18} />
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={cn(
              "p-2 rounded-lg transition-all",
              viewport === 'mobile' ? "bg-emerald-100 text-emerald-600" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
            )}
            title="Mobile view"
          >
            <Smartphone size={18} />
          </button>
        </div>
        
        <div className="h-6 w-px bg-gray-200" />
        
        <button
          onClick={() => setShowContent(!showContent)}
          className={cn(
            "p-2 rounded-lg transition-all",
            showContent ? "bg-emerald-100 text-emerald-600" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
          )}
          title={showContent ? "Hide content" : "Show content"}
        >
          {showContent ? <Eye size={18} /> : <EyeOff size={18} />}
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={resetConfig}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
          title="Reset to default"
        >
          <RotateCcw size={18} />
        </button>
        
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
          title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
        >
          {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
        </button>
      </div>
    </header>
  );
};