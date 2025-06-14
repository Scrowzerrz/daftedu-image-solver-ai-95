
import { useState } from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { FileImage, Menu, X, User, LogOut, Home, DollarSign, Info, MessageSquare, Search, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  // Navbar for authenticated users
  if (user) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="flex items-center cursor-pointer" onClick={() => navigate('/dashboard')}>
                <FileImage className="h-8 w-8 text-daft-600" />
                <span className="font-bold text-xl ml-2 bg-gradient-to-r from-daft-600 to-blue-600 bg-clip-text text-transparent">
                  daftedu
                </span>
              </div>
            </div>

            {/* Desktop Navigation - Authenticated */}
            <nav className="hidden md:flex items-center gap-1">
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 text-gray-700 hover:text-daft-600 hover:bg-daft-50"
                onClick={() => navigate('/dashboard')}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 text-gray-700 hover:text-daft-600 hover:bg-daft-50"
              >
                <Search className="h-4 w-4" />
                Explorar
              </Button>
              <Button 
                variant="ghost" 
                className="flex items-center gap-2 text-gray-700 hover:text-daft-600 hover:bg-daft-50"
              >
                <MessageSquare className="h-4 w-4" />
                Perguntas
              </Button>
            </nav>

            {/* Right side - Authenticated */}
            <div className="hidden md:flex items-center gap-3">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2 hover:bg-gray-50">
                    <div className="w-6 h-6 bg-gradient-to-r from-daft-600 to-blue-600 rounded-full flex items-center justify-center">
                      <User className="h-3 w-3 text-white" />
                    </div>
                    <span className="text-sm font-medium">{user.name || user.email?.split('@')[0]}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5">
                    <p className="text-sm font-medium">{user.name || user.email?.split('@')[0]}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                    <Home className="h-4 w-4 mr-2" />
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" />
                    Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/pricing')}>
                    <DollarSign className="h-4 w-4 mr-2" />
                    Planos
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Mobile Menu Button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>

          {/* Mobile Menu - Authenticated */}
          <div className={cn(
            "md:hidden overflow-hidden transition-all duration-300 bg-white/95 backdrop-blur-md",
            isMenuOpen ? "max-h-[400px] mt-4" : "max-h-0"
          )}>
            <div className="py-4 space-y-3 border-t border-gray-200">
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2"
                onClick={() => { navigate('/dashboard'); setIsMenuOpen(false); }}
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="h-4 w-4" />
                Explorar
              </Button>
              <Button 
                variant="ghost" 
                className="w-full justify-start gap-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <MessageSquare className="h-4 w-4" />
                Perguntas
              </Button>
              
              <div className="border-t border-gray-200 pt-3 space-y-2">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{user.name || user.email?.split('@')[0]}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-4 w-4" />
                  Perfil
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2"
                  onClick={() => { navigate('/pricing'); setIsMenuOpen(false); }}
                >
                  <DollarSign className="h-4 w-4" />
                  Planos
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full justify-start gap-2 text-red-600"
                  onClick={() => { handleSignOut(); setIsMenuOpen(false); }}
                >
                  <LogOut className="h-4 w-4" />
                  Sair
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  // Navbar for non-authenticated users (original design)
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 dark:bg-slate-900/80 dark:border-slate-800">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center" onClick={() => navigate('/')} role="button">
            <FileImage className="h-7 w-7 text-daft-600" />
            <span className="font-bold text-xl ml-2 text-gradient">daftedu</span>
          </div>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-6">
            <Button variant="link" onClick={() => navigate('/')}>Início</Button>
            <Button variant="link" onClick={() => navigate('/pricing')}>Preços</Button>
            <Button variant="link" onClick={() => navigate('/about')}>Sobre</Button>
          </nav>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate('/login')}>Entrar</Button>
            <Button className="gradient-bg" onClick={() => navigate('/signup')}>Cadastrar</Button>
          </div>
        </div>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden" 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>
      
      {/* Mobile menu for non-authenticated users */}
      <div className={cn(
        "md:hidden overflow-hidden transition-all duration-300 max-h-0 bg-white/80 backdrop-blur-md dark:bg-slate-900/80",
        isMenuOpen && "max-h-[400px]"
      )}>
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          <Button variant="ghost" className="justify-start" onClick={() => { navigate('/'); setIsMenuOpen(false); }}>Início</Button>
          <Button variant="ghost" className="justify-start" onClick={() => { navigate('/pricing'); setIsMenuOpen(false); }}>Preços</Button>
          <Button variant="ghost" className="justify-start" onClick={() => { navigate('/about'); setIsMenuOpen(false); }}>Sobre</Button>
          
          <div className="flex flex-col gap-2 pt-2 border-t">
            <Button variant="outline" onClick={() => { navigate('/login'); setIsMenuOpen(false); }}>Entrar</Button>
            <Button className="gradient-bg" onClick={() => { navigate('/signup'); setIsMenuOpen(false); }}>Cadastrar</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
