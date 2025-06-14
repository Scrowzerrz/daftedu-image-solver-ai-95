
import { useState } from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { FileImage, Menu, X, User, LogOut } from 'lucide-react';
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
          
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {user.name || user.email}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="outline" onClick={() => navigate('/login')}>Entrar</Button>
              <Button className="gradient-bg" onClick={() => navigate('/signup')}>Cadastrar</Button>
            </div>
          )}
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
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden overflow-hidden transition-all duration-300 max-h-0 bg-white/80 backdrop-blur-md dark:bg-slate-900/80",
        isMenuOpen && "max-h-[400px]"
      )}>
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          <Button variant="ghost" className="justify-start" onClick={() => { navigate('/'); setIsMenuOpen(false); }}>Início</Button>
          <Button variant="ghost" className="justify-start" onClick={() => { navigate('/pricing'); setIsMenuOpen(false); }}>Preços</Button>
          <Button variant="ghost" className="justify-start" onClick={() => { navigate('/about'); setIsMenuOpen(false); }}>Sobre</Button>
          
          {user ? (
            <div className="flex flex-col gap-2 pt-2 border-t">
              <Button variant="ghost" className="justify-start" onClick={() => { navigate('/dashboard'); setIsMenuOpen(false); }}>
                Dashboard
              </Button>
              <Button variant="ghost" className="justify-start" onClick={() => { handleSignOut(); setIsMenuOpen(false); }}>
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-2 border-t">
              <Button variant="outline" onClick={() => { navigate('/login'); setIsMenuOpen(false); }}>Entrar</Button>
              <Button className="gradient-bg" onClick={() => { navigate('/signup'); setIsMenuOpen(false); }}>Cadastrar</Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
