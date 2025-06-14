
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
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 group-focus-within:text-daft-500 transition-colors" />
      <Input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="pl-12 h-14 text-lg border-2 border-gray-200 rounded-xl bg-white/90 backdrop-blur-sm 
                   focus:border-daft-500 focus:ring-4 focus:ring-daft-100 transition-all duration-300
                   hover:bg-white hover:shadow-md placeholder:text-gray-400"
      />
    </div>
  );
}
