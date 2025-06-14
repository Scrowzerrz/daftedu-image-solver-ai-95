
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
import { BookOpen, Trophy, Target, Zap, TrendingUp, Users, Clock } from "lucide-react";

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Enhanced Hero Section */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="container mx-auto px-4 py-8 lg:py-12">
            <div className="max-w-4xl mx-auto">
              {/* Welcome Header */}
              <div className="text-center mb-8 animate-fade-in">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                  Bem-vindo ao DaftEdu
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-2">
                  Olá, <span className="font-semibold text-daft-600">{user.name || user.email?.split('@')[0]}</span>
                </p>
                <p className="text-gray-500">
                  Explore perguntas, compartilhe conhecimento e aprenda junto com a comunidade
                </p>
              </div>
              
              {/* Search and Actions */}
              <div className="bg-gray-50 rounded-2xl p-6 lg:p-8 animate-slide-up">
                <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center">
                  <div className="flex-1">
                    <SearchBar 
                      value={searchQuery}
                      onChange={setSearchQuery}
                      placeholder="Busque qualquer pergunta ou tópico..."
                    />
                  </div>
                  <div className="flex gap-3 flex-shrink-0">
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
        </div>

        <div className="container mx-auto px-4 py-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
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

          {/* Quick Stats Bar */}
          <div className="bg-white rounded-xl p-6 mb-8 shadow-sm border border-gray-200 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Atividade hoje</p>
                  <p className="text-xl font-bold text-gray-900">0 interações</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Users className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ranking atual</p>
                  <p className="text-xl font-bold text-gray-900">Iniciante</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tempo online</p>
                  <p className="text-xl font-bold text-gray-900">0 min hoje</p>
                </div>
              </div>
            </div>
          </div>

          {/* Daily Challenge */}
          <div className="bg-gradient-to-r from-daft-500 to-blue-500 rounded-xl p-6 mb-8 text-white shadow-lg animate-scale-in">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Trophy className="h-8 w-8" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-1">Desafio Diário</h3>
                  <p className="text-blue-100">Responda 5 perguntas para ganhar 50 pontos extras</p>
                </div>
              </div>
              <div className="flex flex-col items-center md:items-end gap-2">
                <div className="text-3xl font-bold">0/5</div>
                <div className="w-32 bg-white/20 rounded-full h-3">
                  <div className="bg-white h-3 rounded-full transition-all duration-500" style={{ width: "0%" }}></div>
                </div>
                <Button 
                  variant="outline" 
                  className="bg-white/10 border-white/30 text-white hover:bg-white/20 mt-2"
                >
                  Começar Agora
                </Button>
              </div>
            </div>
          </div>

          {/* Questions Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 animate-fade-in-up">
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
