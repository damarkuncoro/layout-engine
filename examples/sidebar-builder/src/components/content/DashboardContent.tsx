import { cn } from '../../utils/cn';

interface ContentProps {
  isDark: boolean;
}

export const DashboardContent = ({ isDark }: ContentProps) => (
  <div className={cn("flex-1 p-6 transition-colors duration-300", isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900")}>
    <div className="max-w-4xl mx-auto space-y-6">
      <div className={cn("p-6 rounded-xl border", isDark ? "bg-gray-800 border-gray-700" : "bg-white border-gray-200 shadow-sm")}>
        <h2 className="text-xl font-bold mb-4">Dashboard Overview</h2>
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Users', value: '12,345' },
            { label: 'Revenue', value: '$45,678' },
            { label: 'Growth', value: '+23%' }
          ].map((stat) => (
            <div key={stat.label} className={cn("p-4 rounded-lg", isDark ? "bg-gray-700" : "bg-gray-50")}>
              <div className={cn("text-sm", isDark ? "text-gray-400" : "text-gray-500")}>{stat.label}</div>
              <div className="text-2xl font-bold">{stat.value}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);