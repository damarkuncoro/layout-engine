import { cn } from '../../utils/cn';

interface ContentProps {
  isDark: boolean;
}

export const PlaceholderContent = ({ isDark }: ContentProps) => (
  <div className={cn("flex-1 p-6 transition-colors duration-300", isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900")}>
    <div className="space-y-4">
      <div className={cn("h-8 w-1/3 rounded animate-pulse", isDark ? "bg-gray-700" : "bg-gray-200")} />
      <div className={cn("h-4 w-full rounded animate-pulse", isDark ? "bg-gray-700" : "bg-gray-100")} />
      <div className={cn("h-4 w-full rounded animate-pulse", isDark ? "bg-gray-700" : "bg-gray-100")} />
      <div className={cn("h-4 w-2/3 rounded animate-pulse", isDark ? "bg-gray-700" : "bg-gray-100")} />
    </div>
  </div>
);