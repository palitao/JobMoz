import React, { useState, useEffect } from 'react';
import { Menu, X, Briefcase, User, Search, Home, Wand2, Bell, LogOut, ChevronRight } from 'lucide-react';
import { User as UserType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: UserType | null;
  onNavigate: (page: string) => void;
  currentPage: string;
  onLogout: () => void;
  onLogin: () => void;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  user, 
  onNavigate, 
  currentPage,
  onLogout,
  onLogin
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const NavItem = ({ page, icon: Icon, label }: { page: string, icon: any, label: string }) => (
    <button
      onClick={() => {
        onNavigate(page);
        setIsMobileMenuOpen(false);
      }}
      className={`group flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium
        ${currentPage === page 
          ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}`}
    >
      <Icon size={18} className={currentPage === page ? 'text-emerald-100' : 'text-slate-400 group-hover:text-slate-600'} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      {/* Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b
          ${scrolled || isMobileMenuOpen ? 'bg-white/90 backdrop-blur-md border-slate-200/60 shadow-sm' : 'bg-transparent border-transparent'}
        `}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => onNavigate('home')}>
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 group-hover:scale-105 transition-transform duration-200">
                <Briefcase className="text-white" size={22} />
              </div>
              <span className={`text-xl font-bold tracking-tight transition-colors ${scrolled || isMobileMenuOpen ? 'text-slate-900' : 'text-slate-900 md:text-white'}`}>
                JobMoz
              </span>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center p-1.5 bg-white/80 backdrop-blur-md rounded-full border border-slate-200/60 shadow-sm mx-4">
              <NavItem page="home" icon={Home} label="Início" />
              <NavItem page="jobs" icon={Search} label="Vagas" />
              <NavItem page="ai-studio" icon={Wand2} label="Estúdio IA" />
              {user && <NavItem page="dashboard" icon={User} label="Painel" />}
            </nav>

            {/* Auth Buttons / Notifications */}
            <div className="hidden md:flex items-center space-x-5">
              {user ? (
                <>
                  <button className={`relative transition-colors ${scrolled ? 'text-slate-500 hover:text-emerald-600' : 'text-white hover:text-emerald-200'}`}>
                    <Bell size={22} />
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                  </button>
                  <div className="flex items-center space-x-3 pl-5 border-l border-slate-200/30">
                    <span className={`text-sm font-semibold ${scrolled ? 'text-slate-700' : 'text-white'}`}>
                      {user.name.split(' ')[0]}
                    </span>
                    {user.avatar ? (
                      <img src={user.avatar} alt="" className="w-9 h-9 rounded-full border-2 border-white shadow-sm" />
                    ) : (
                      <div className="w-9 h-9 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold border-2 border-white">
                        {user.name[0]}
                      </div>
                    )}
                    <button 
                      onClick={onLogout}
                      className={`transition-colors ${scrolled ? 'text-slate-400 hover:text-red-500' : 'text-white/70 hover:text-red-300'}`}
                      title="Sair"
                    >
                      <LogOut size={20} />
                    </button>
                  </div>
                </>
              ) : (
                <button 
                  onClick={onLogin}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm"
                >
                  Entrar / Registar
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button 
              className={`md:hidden p-2 rounded-lg transition-colors ${scrolled || isMobileMenuOpen ? 'text-slate-900 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-100 animate-in slide-in-from-top-2 duration-200 shadow-xl">
            <div className="p-4 space-y-2">
              <button onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }} className="flex items-center w-full p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium">
                <Home className="mr-3 text-emerald-500" size={20} /> Início
              </button>
              <button onClick={() => { onNavigate('jobs'); setIsMobileMenuOpen(false); }} className="flex items-center w-full p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium">
                <Search className="mr-3 text-emerald-500" size={20} /> Vagas
              </button>
              <button onClick={() => { onNavigate('ai-studio'); setIsMobileMenuOpen(false); }} className="flex items-center w-full p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium">
                <Wand2 className="mr-3 text-emerald-500" size={20} /> Estúdio IA
              </button>
              {user && (
                <button onClick={() => { onNavigate('dashboard'); setIsMobileMenuOpen(false); }} className="flex items-center w-full p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-medium">
                  <User className="mr-3 text-emerald-500" size={20} /> Painel
                </button>
              )}
              
              <div className="border-t border-slate-100 my-2 pt-2">
                {user ? (
                   <button onClick={onLogout} className="flex items-center w-full p-3 rounded-xl hover:bg-red-50 text-red-600 font-medium">
                     <LogOut className="mr-3" size={20} /> Sair
                   </button>
                ) : (
                   <button onClick={() => { onLogin(); setIsMobileMenuOpen(false); }} className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold shadow-md">
                     Entrar / Registar
                   </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-0">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-white font-bold text-xl mb-6 flex items-center space-x-2">
              <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                <Briefcase size={16} className="text-white" />
              </div>
              <span className="tracking-tight">JobMoz</span>
            </h3>
            <p className="text-sm leading-relaxed mb-6 text-slate-500">
              Conectamos os melhores talentos às empresas líderes em Moçambique através de tecnologia de ponta.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide text-sm uppercase">Candidatos</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Procurar Vagas</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Criar CV Profissional</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Alertas de Emprego</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Dicas de Carreira</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide text-sm uppercase">Empresas</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Publicar Vaga</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Pesquisar Talentos</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Planos e Preços</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Soluções Corporativas</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-6 tracking-wide text-sm uppercase">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Termos de Uso</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Cookies</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition-colors">Contacto</a></li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center md:text-left flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
          <p>© 2024 JobMoz Lda. Todos os direitos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span>Maputo, Moçambique</span>
            <span>+258 84 123 4567</span>
          </div>
        </div>
      </footer>
    </div>
  );
};