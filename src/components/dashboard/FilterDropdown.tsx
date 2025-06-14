
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

  const hasActiveFilters = filters.materia || filters.status || filters.nivel;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className={`flex items-center gap-2 h-12 px-6 border-2 rounded-xl bg-white
                     hover:bg-gray-50 hover:border-daft-300 hover:shadow-sm transition-all duration-300
                     ${hasActiveFilters ? 'border-daft-500 bg-daft-50 text-daft-700' : 'border-gray-200'}`}
        >
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline font-medium">
            {hasActiveFilters ? 'Filtros Ativos' : 'Filtros'}
          </span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-64 border-0 shadow-xl rounded-xl bg-white p-2" align="end">
        <DropdownMenuLabel className="text-gray-900 font-semibold px-3 py-2">Filtrar por</DropdownMenuLabel>
        <DropdownMenuSeparator className="my-2" />
        
        <DropdownMenuLabel className="text-xs text-gray-500 uppercase font-medium px-3 py-1">
          Matéria
        </DropdownMenuLabel>
        {materias.map((materia) => (
          <DropdownMenuItem
            key={materia}
            onClick={() => onFiltersChange({ ...filters, materia: materia === "Todas as Matérias" ? "" : materia })}
            className={`cursor-pointer transition-colors rounded-lg mx-1 px-3 py-2 ${
              (filters.materia === materia || (materia === "Todas as Matérias" && !filters.materia)) 
                ? "bg-daft-100 text-daft-700 font-medium" 
                : "hover:bg-gray-100"
            }`}
          >
            {materia}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator className="my-2" />
        
        <DropdownMenuLabel className="text-xs text-gray-500 uppercase font-medium px-3 py-1">
          Status
        </DropdownMenuLabel>
        {statusOptions.map((status) => (
          <DropdownMenuItem
            key={status}
            onClick={() => onFiltersChange({ ...filters, status: status === "Todos os Status" ? "" : status })}
            className={`cursor-pointer transition-colors rounded-lg mx-1 px-3 py-2 ${
              (filters.status === status || (status === "Todos os Status" && !filters.status))
                ? "bg-daft-100 text-daft-700 font-medium" 
                : "hover:bg-gray-100"
            }`}
          >
            {status}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
