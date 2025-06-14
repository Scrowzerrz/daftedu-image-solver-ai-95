
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
  yellow: "from-amber-500 to-orange-500",
  green: "from-green-500 to-emerald-500",
  purple: "from-purple-500 to-violet-500"
};

const bgClasses = {
  blue: "bg-blue-50 border-blue-100",
  yellow: "bg-amber-50 border-amber-100",
  green: "bg-green-50 border-green-100",
  purple: "bg-purple-50 border-purple-100"
};

const textClasses = {
  blue: "text-blue-600",
  yellow: "text-amber-600",
  green: "text-green-600",
  purple: "text-purple-600"
};

export function StatsCard({ icon: Icon, title, value, subtitle, color, delay = 0 }: StatsCardProps) {
  return (
    <Card 
      className={`group hover:shadow-lg cursor-pointer animate-fade-in border transition-all duration-300 hover:scale-[1.02] ${bgClasses[color]}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-center gap-4">
          <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${colorClasses[color]} flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow`}>
            <Icon className="h-7 w-7 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className={`text-2xl font-bold mb-1 ${textClasses[color]}`}>{value}</p>
            <p className="text-xs text-gray-500">{subtitle}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
