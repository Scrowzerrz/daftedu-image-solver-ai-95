
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SearchBar } from "@/components/dashboard/SearchBar";
import { FilterDropdown } from "@/components/dashboard/FilterDropdown";
import { QuestionsList } from "@/components/dashboard/QuestionsList";
import { NewQuestionButton } from "@/components/dashboard/NewQuestionButton";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { BookOpen, Trophy, Target, Zap } from "lucide-react";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-daft-50 to-blue-50">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-daft-600 border-t-transparent"></div>
          <p className="text-daft-600 font-medium">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 via-blue-50/30 to-daft-50/20">
      <Navbar />
      
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-daft-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 py-12">
            <div className="animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Olá, {user.name || user.email?.split('@')[0]}! 👋
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-2xl">
                Pronto para aprender algo novo hoje? Explore milhares de perguntas e respostas.
              </p>
            </div>
            
            {/* Search Section */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 animate-slide-up">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                <div className="flex-1 w-full">
                  <SearchBar 
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Pesquise qualquer pergunta... 🔍"
                  />
                </div>
                <div className="flex gap-3">
                  <FilterDropdown 
                    filters={filters}
                    onFiltersChange={setFilters}
                  />
                  <NewQuestionButton />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <StatsCard
              icon={BookOpen}
              title="Perguntas Respondidas"
              value="0"
              subtitle="Continue respondendo!"
              color="blue"
              delay={0}
            />
            <StatsCard
              icon={Trophy}
              title="Pontos Ganhos"
              value="0"
              subtitle="Ganhe mais pontos"
              color="yellow"
              delay={100}
            />
            <StatsCard
              icon={Target}
              title="Meta Diária"
              value="0/5"
              subtitle="Responda 5 perguntas"
              color="green"
              delay={200}
            />
            <StatsCard
              icon={Zap}
              title="Sequência"
              value="0 dias"
              subtitle="Mantenha o ritmo!"
              color="purple"
              delay={300}
            />
          </div>

          {/* Daily Challenge */}
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-6 mb-8 text-white animate-scale-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Trophy className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Desafio Diário</h3>
                  <p className="text-yellow-100">Responda 5 perguntas para ganhar 50 pontos</p>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">0/5</div>
                <div className="w-24 bg-white/20 rounded-full h-2 mt-2">
                  <div className="bg-white h-2 rounded-full transition-all duration-500" style={{ width: "0%" }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Questions List */}
          <div className="animate-fade-in-up">
            <QuestionsList 
              searchQuery={searchQuery}
              filters={filters}
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
