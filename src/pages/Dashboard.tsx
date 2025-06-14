
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { FilterDropdown } from "@/components/dashboard/FilterDropdown";
import { QuestionsList } from "@/components/dashboard/QuestionsList";
import { NewQuestionButton } from "@/components/dashboard/NewQuestionButton";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    materia: "",
    status: "",
    nivel: ""
  });

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-daft-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-20 pb-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo de volta, {user.name || user.email}!
          </h1>
          <p className="text-gray-600">
            Questões e respostas para todas as matérias
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            <div className="flex-1 w-full">
              <SearchBar 
                value={searchQuery}
                onChange={setSearchQuery}
                placeholder="Pesquise a resposta para qualquer pergunta..."
              />
            </div>
            <div className="flex gap-2">
              <FilterDropdown 
                filters={filters}
                onFiltersChange={setFilters}
              />
              <NewQuestionButton />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">📚</span>
              </div>
              <div>
                <p className="text-sm text-gray-600">Responda a 5 perguntas de qualquer matéria para conseguir</p>
                <p className="font-semibold">50 pts</p>
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "0%" }}></div>
              </div>
              <span className="text-sm text-gray-500 ml-3">0/5</span>
              <Button size="sm" className="ml-3">
                COMEÇAR
              </Button>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <QuestionsList 
          searchQuery={searchQuery}
          filters={filters}
        />
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
