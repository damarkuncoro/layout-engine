import { cn } from '../../utils/cn';

interface ContentProps {
  isDark: boolean;
}

export const SettingsContent = ({ isDark }: ContentProps) => (
  <div className={cn("flex-1 p-6 transition-colors duration-300", isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900")}>
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Settings</h2>
      <div className={cn("space-y-4", isDark ? "text-gray-300" : "text-gray-600")}>
        <p>Configure your application settings...</p>
      </div>
    </div>
  </div>
);