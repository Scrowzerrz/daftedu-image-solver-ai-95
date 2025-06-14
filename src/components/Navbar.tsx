
import { useState } from 'react';
import { Button } from './ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { FileImage, Menu, X, User, LogOut, Home, BookOpen, Target } from 'lucide-react';
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
  const location = useLocation();
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
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center cursor-pointer" onClick={() => navigate('/dashboard')}>
              <FileImage className="h-7 w-7 text-daft-600" />
              <span className="font-bold text-xl ml-2 bg-gradient-to-r from-daft-600 to-blue-600 bg-clip-text text-transparent">
                daftedu
              </span>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <nav className="flex items-center gap-6">
              <Button 
                variant={location.pathname === '/dashboard' ? 'default' : 'ghost'} 
                size="sm"
                onClick={() => navigate('/dashboard')}
                className="flex items-center gap-2"
              >
                <Home className="h-4 w-4" />
                Dashboard
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="flex items-center gap-2"
              >
                <BookOpen className="h-4 w-4" />
                Perguntas
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                className="flex items-center gap-2"
              >
                <Target className="h-4 w-4" />
                Desafios
              </Button>
            </nav>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {user.name || user.email?.split('@')[0]}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  <Home className="h-4 w-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
        
        {/* Mobile menu for authenticated users */}
        <div className={cn(
          "md:hidden overflow-hidden transition-all duration-300 max-h-0 bg-white/95 backdrop-blur-md border-t border-gray-200",
          isMenuOpen && "max-h-[400px]"
        )}>
          <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
            <Button 
              variant={location.pathname === '/dashboard' ? 'default' : 'ghost'} 
              className="justify-start gap-2" 
              onClick={() => { navigate('/dashboard'); setIsMenuOpen(false); }}
            >
              <Home className="h-4 w-4" />
              Dashboard
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <BookOpen className="h-4 w-4" />
              Perguntas
            </Button>
            <Button variant="ghost" className="justify-start gap-2">
              <Target className="h-4 w-4" />
              Desafios
            </Button>
            
            <div className="flex flex-col gap-2 pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-600 px-3">
                {user.name || user.email?.split('@')[0]}
              </p>
              <Button 
                variant="ghost" 
                className="justify-start gap-2" 
                onClick={() => { handleSignOut(); setIsMenuOpen(false); }}
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
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
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
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
