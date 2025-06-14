
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Pesquisar..." }: SearchBarProps) {
  return (
    <div className="relative group">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-daft-600 transition-colors duration-200" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-12 h-12 text-base border-2 border-gray-200 rounded-xl bg-white
                   focus:border-daft-500 focus:ring-4 focus:ring-daft-100 transition-all duration-300
                   hover:border-gray-300 hover:shadow-sm placeholder:text-gray-400
                   focus:outline-none focus:ring-opacity-50"
      />
    </div>
  );
}
