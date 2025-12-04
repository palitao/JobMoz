import React, { useState } from 'react';
import { 
  X, Mail, Lock, User, Phone, ArrowRight, Eye, EyeOff, 
  CheckCircle, Smartphone, Chrome, Facebook, Linkedin,
  Briefcase, UserPlus, ShieldCheck, KeyRound
} from 'lucide-react';
import { authService, validatePassword } from '../services/authService';
import { UserRole, User as UserType } from '../types';

type AuthView = 'login' | 'register' | 'verify' | 'forgot-password';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserType) => void;
  initialView?: AuthView;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onLoginSuccess, initialView = 'login' }) => {
  const [view, setView] = useState<AuthView>(initialView);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  
  // Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    role: 'candidate' as UserRole,
    terms: false
  });
  
  const [verificationCode, setVerificationCode] = useState('');

  if (!isOpen) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const user = await authService.login(formData.email, formData.password);
      onLoginSuccess(user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Erro ao entrar.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await authService.register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
        termsAccepted: formData.terms
      });
      setView('verify');
    } catch (err: any) {
      setError(err.message || 'Erro ao criar conta.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await authService.verifyAccount(verificationCode);
      const user: UserType = {
        id: 'new-user',
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        role: formData.role,
        verified: true,
        avatar: `https://ui-avatars.com/api/?name=${formData.name.replace(' ', '+')}&background=0D9488&color=fff`
      };
      onLoginSuccess(user);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Código inválido.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await authService.recoverPassword(formData.email);
      alert(`Link de recuperação enviado para ${formData.email}`);
      setView('login');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-white/20 relative">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors z-10">
            <X size={20} />
        </button>

        {/* Dynamic Header with Icon */}
        <div className="relative px-8 pt-10 pb-2 text-center">
          <div className="mx-auto w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-emerald-100 group transform transition-transform hover:scale-105 hover:rotate-3 duration-300">
              {view === 'login' && <Briefcase className="text-emerald-600" size={32} />}
              {view === 'register' && <UserPlus className="text-emerald-600" size={32} />}
              {view === 'verify' && <ShieldCheck className="text-emerald-600" size={32} />}
              {view === 'forgot-password' && <KeyRound className="text-emerald-600" size={32} />}
          </div>
          
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mb-2">
            {view === 'login' && 'Bem-vindo de volta'}
            {view === 'register' && 'Criar Conta'}
            {view === 'verify' && 'Verificação de Segurança'}
            {view === 'forgot-password' && 'Recuperar Senha'}
          </h2>
          <p className="text-slate-500 text-sm max-w-xs mx-auto">
            {view === 'login' && 'Aceda à sua conta JobMoz para gerir a sua carreira.'}
            {view === 'register' && 'Junte-se à maior plataforma de emprego de Moçambique.'}
            {view === 'verify' && 'Introduza o código de segurança enviado para o seu contacto.'}
            {view === 'forgot-password' && 'Digite seu e-mail para receber as instruções.'}
          </p>
        </div>

        {/* Content */}
        <div className="px-8 pb-10 pt-6">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 text-sm rounded-xl flex items-start gap-3 animate-in slide-in-from-top-2">
              <span className="mt-1 block w-2 h-2 rounded-full bg-red-500 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* LOGIN VIEW */}
          {view === 'login' && (
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wide">E-mail</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    placeholder="exemplo@email.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 ml-1 uppercase tracking-wide">Senha</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                    placeholder="••••••••"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm pt-1">
                <label className="flex items-center space-x-2 cursor-pointer text-slate-600 select-none hover:text-slate-900 transition-colors">
                  <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 border-slate-300 cursor-pointer" />
                  <span className="font-medium">Lembrar-me</span>
                </label>
                <button type="button" onClick={() => setView('forgot-password')} className="text-emerald-600 hover:text-emerald-700 font-bold text-xs hover:underline uppercase tracking-wide">
                  Esqueceu a senha?
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
              >
                {isLoading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mx-auto" /> : 'Entrar na Conta'}
              </button>

              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
                <div className="relative flex justify-center text-xs uppercase tracking-widest font-bold"><span className="bg-white px-4 text-slate-400">Ou continue com</span></div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <button type="button" className="group flex items-center justify-center py-3 border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all text-slate-600">
                  <Chrome size={22} className="group-hover:scale-110 transition-transform" />
                </button>
                <button type="button" className="group flex items-center justify-center py-3 border border-slate-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all text-blue-600">
                  <Facebook size={22} className="group-hover:scale-110 transition-transform" />
                </button>
                <button type="button" className="group flex items-center justify-center py-3 border border-slate-200 rounded-xl hover:bg-blue-50 hover:border-blue-200 transition-all text-blue-700">
                  <Linkedin size={22} className="group-hover:scale-110 transition-transform" />
                </button>
              </div>

              <p className="text-center text-sm text-slate-600 mt-6">
                Não tem conta? <button type="button" onClick={() => setView('register')} className="text-emerald-600 font-bold hover:underline ml-1">Registar agora</button>
              </p>
            </form>
          )}

          {/* REGISTER VIEW */}
          {view === 'register' && (
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Role Selection */}
              <div className="flex bg-slate-100 p-1.5 rounded-xl mb-6">
                <button 
                  type="button" 
                  onClick={() => setFormData({...formData, role: 'candidate'})}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${formData.role === 'candidate' ? 'bg-white shadow-sm text-emerald-700 ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Candidato
                </button>
                <button 
                  type="button" 
                  onClick={() => setFormData({...formData, role: 'company'})}
                  className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all ${formData.role === 'company' ? 'bg-white shadow-sm text-emerald-700 ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  Empresa
                </button>
              </div>

              <div className="space-y-4">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                    placeholder={formData.role === 'candidate' ? "Nome Completo" : "Nome da Empresa"}
                  />
                </div>

                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                    placeholder="E-mail"
                  />
                </div>

                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                    placeholder="Telefone (+258...)"
                  />
                </div>

                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                  <input
                    type="password"
                    required
                    value={formData.password}
                    onChange={e => setFormData({...formData, password: e.target.value})}
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none"
                    placeholder="Senha (min. 8 caracteres)"
                  />
                </div>
              </div>

              <label className="flex items-start space-x-3 cursor-pointer text-slate-600 text-sm mt-2 px-1 hover:text-slate-900 transition-colors">
                <input 
                  type="checkbox" 
                  checked={formData.terms}
                  onChange={e => setFormData({...formData, terms: e.target.checked})}
                  className="mt-1 rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4 border-slate-300 cursor-pointer" 
                />
                <span className="leading-tight">Li e aceito os <a href="#" className="text-emerald-600 font-bold hover:underline">Termos de Uso</a> e <a href="#" className="text-emerald-600 font-bold hover:underline">Política de Privacidade</a>.</span>
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transform hover:-translate-y-0.5 mt-6 disabled:opacity-70"
              >
                {isLoading ? 'Criando conta...' : 'Criar Conta'}
              </button>

              <p className="text-center text-sm text-slate-600 mt-4">
                Já tem conta? <button type="button" onClick={() => setView('login')} className="text-emerald-600 font-bold hover:underline ml-1">Entrar</button>
              </p>
            </form>
          )}

          {/* VERIFY VIEW */}
          {view === 'verify' && (
            <form onSubmit={handleVerify} className="space-y-8 text-center pt-2">
              <div className="px-4">
                <p className="text-slate-600 text-sm mb-6">
                  Introduza o código de 6 dígitos que enviámos para: <br/>
                  <strong className="text-slate-900">{formData.email}</strong>
                </p>

                <input
                  type="text"
                  required
                  maxLength={6}
                  value={verificationCode}
                  onChange={e => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                  className="w-full text-center text-4xl tracking-[0.5em] font-bold py-4 border-2 border-slate-200 rounded-2xl focus:border-emerald-500 focus:ring-0 outline-none text-slate-800 placeholder-slate-200 transition-all hover:border-slate-300"
                  placeholder="000000"
                  autoFocus
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-200 disabled:opacity-70 transform hover:-translate-y-0.5"
              >
                {isLoading ? 'Verificando...' : 'Confirmar Código'}
              </button>

              <button type="button" onClick={() => authService.resendCode(formData.email)} className="text-sm text-slate-500 hover:text-emerald-600 font-medium transition-colors">
                Não recebeu o código? Reenviar
              </button>
            </form>
          )}

          {/* FORGOT PASSWORD VIEW */}
          {view === 'forgot-password' && (
            <form onSubmit={handleForgotPassword} className="space-y-6 pt-2">
               <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" size={20} />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
                  placeholder="Seu e-mail registado"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                {isLoading ? 'Enviando...' : 'Enviar Link de Recuperação'}
              </button>

              <button 
                type="button" 
                onClick={() => setView('login')}
                className="w-full text-center text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
              >
                Voltar para o Login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};