
import { useState } from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { FileImage, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

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
            <Button variant="link" onClick={() => navigate('/')}>Home</Button>
            <Button variant="link" onClick={() => navigate('/pricing')}>Pricing</Button>
            <Button variant="link" onClick={() => navigate('/about')}>About</Button>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={() => navigate('/login')}>Login</Button>
            <Button className="gradient-bg" onClick={() => navigate('/signup')}>Sign Up</Button>
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
      
      {/* Mobile menu */}
      <div className={cn(
        "md:hidden overflow-hidden transition-all duration-300 max-h-0 bg-white/80 backdrop-blur-md dark:bg-slate-900/80",
        isMenuOpen && "max-h-[400px]"
      )}>
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          <Button variant="ghost" className="justify-start" onClick={() => { navigate('/'); setIsMenuOpen(false); }}>Home</Button>
          <Button variant="ghost" className="justify-start" onClick={() => { navigate('/pricing'); setIsMenuOpen(false); }}>Pricing</Button>
          <Button variant="ghost" className="justify-start" onClick={() => { navigate('/about'); setIsMenuOpen(false); }}>About</Button>
          <div className="flex flex-col gap-2 pt-2 border-t">
            <Button variant="outline" onClick={() => { navigate('/login'); setIsMenuOpen(false); }}>Login</Button>
            <Button className="gradient-bg" onClick={() => { navigate('/signup'); setIsMenuOpen(false); }}>Sign Up</Button>
          </div>
        </div>
      </div>
    </header>
  );
}
