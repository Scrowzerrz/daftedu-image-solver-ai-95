
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Filter, ChevronDown } from "lucide-react";

interface FilterDropdownProps {
  filters: {
    materia: string;
    status: string;
    nivel: string;
  };
  onFiltersChange: (filters: any) => void;
}

export function FilterDropdown({ filters, onFiltersChange }: FilterDropdownProps) {
  const materias = [
    "Todas as Matérias",
    "Matemática",
    "Português",
    "História",
    "Geografia",
    "Ciências",
    "Física",
    "Química",
    "Biologia",
    "Inglês",
    "Filosofia",
    "Sociologia"
  ];

  const statusOptions = [
    "Todos os Status",
    "Sem Resposta",
    "Com Resposta"
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="flex items-center gap-2 h-14 px-6 border-2 border-gray-200 rounded-xl bg-white/90 backdrop-blur-sm
                     hover:bg-white hover:border-daft-300 hover:shadow-md transition-all duration-300"
        >
          <Filter className="h-5 w-5" />
          <span className="hidden sm:inline font-medium">Filtros</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 border-0 shadow-xl rounded-xl bg-white/95 backdrop-blur-sm" align="end">
        <DropdownMenuLabel className="text-gray-900 font-semibold">Filtrar por</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="text-xs text-gray-500 uppercase font-medium px-3">
          Matéria
        </DropdownMenuLabel>
        {materias.map((materia) => (
          <DropdownMenuItem
            key={materia}
            onClick={() => onFiltersChange({ ...filters, materia: materia === "Todas as Matérias" ? "" : materia })}
            className={`cursor-pointer transition-colors ${
              filters.materia === materia ? "bg-daft-50 text-daft-700 font-medium" : "hover:bg-gray-50"
            }`}
          >
            {materia}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="text-xs text-gray-500 uppercase font-medium px-3">
          Status
        </DropdownMenuLabel>
        {statusOptions.map((status) => (
          <DropdownMenuItem
            key={status}
            onClick={() => onFiltersChange({ ...filters, status: status === "Todos os Status" ? "" : status })}
            className={`cursor-pointer transition-colors ${
              filters.status === status ? "bg-daft-50 text-daft-700 font-medium" : "hover:bg-gray-50"
            }`}
          >
            {status}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
