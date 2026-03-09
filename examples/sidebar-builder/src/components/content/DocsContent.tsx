import { cn } from '../../utils/cn';

interface ContentProps {
  isDark: boolean;
}

export const DocsContent = ({ isDark }: ContentProps) => (
  <div className={cn("flex-1 p-6 transition-colors duration-300 overflow-auto", isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900")}>
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Documentation</h2>
      <div className={cn("prose", isDark ? "prose-invert" : "prose-gray")}>
        <p>Welcome to the documentation...</p>
      </div>
    </div>
  </div>
);