
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
    "Todos os níveis",
    "Sem Resposta",
    "Com Resposta"
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 h-12 px-4">
          <Filter className="h-4 w-4" />
          <span className="hidden sm:inline">Filtros</span>
          <ChevronDown className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="text-xs text-gray-500 uppercase">
          Matéria
        </DropdownMenuLabel>
        {materias.map((materia) => (
          <DropdownMenuItem
            key={materia}
            onClick={() => onFiltersChange({ ...filters, materia: materia === "Todas as Matérias" ? "" : materia })}
            className={filters.materia === materia ? "bg-daft-50" : ""}
          >
            {materia}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuLabel className="text-xs text-gray-500 uppercase">
          Status
        </DropdownMenuLabel>
        {statusOptions.map((status) => (
          <DropdownMenuItem
            key={status}
            onClick={() => onFiltersChange({ ...filters, status: status === "Todos os níveis" ? "" : status })}
            className={filters.status === status ? "bg-daft-50" : ""}
          >
            {status}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
