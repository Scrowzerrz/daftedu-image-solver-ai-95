
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  subtitle: string;
  color: "blue" | "yellow" | "green" | "purple";
  delay?: number;
}

const colorClasses = {
  blue: "from-blue-500 to-blue-600",
  yellow: "from-yellow-500 to-yellow-600",
  green: "from-green-500 to-green-600",
  purple: "from-purple-500 to-purple-600"
};

const bgClasses = {
  blue: "bg-blue-50",
  yellow: "bg-yellow-50",
  green: "bg-green-50",
  purple: "bg-purple-50"
};

export function StatsCard({ icon: Icon, title, value, subtitle, color, delay = 0 }: StatsCardProps) {
  return (
    <Card 
      className={`hover-scale cursor-pointer animate-fade-in border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${bgClasses[color]}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${colorClasses[color]} flex items-center justify-center shadow-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mb-1">{value}</p>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
