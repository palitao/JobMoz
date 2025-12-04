import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { Layout } from './components/Layout';
import { JobCard } from './components/JobCard';
import { AIStudio } from './components/AIStudio';
import { Dashboard } from './components/Dashboard';
import { AuthModal } from './components/AuthModal';
import { MOCK_JOBS, PROVINCES, CATEGORIES } from './constants';
import { User, Job } from './types';
import { Search, Filter, MapPin, Briefcase, X, CheckCircle, UploadCloud, Clock, Building2, Banknote, FileText, ChevronRight } from 'lucide-react';

// --- Helper Components ---

const AdBanner: React.FC<{ format?: 'horizontal' | 'sidebar' }> = ({ format = 'horizontal' }) => {
  if (format === 'sidebar') {
    return (
      <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 text-center flex flex-col items-center justify-center min-h-[300px] shadow-sm">
        <span className="text-[10px] font-bold text-slate-300 uppercase mb-2 tracking-widest">Publicidade</span>
        <div className="w-full h-full bg-white border border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-300 text-sm font-medium p-4">
           Espaço para Anúncio (300x600)
        </div>
      </div>
    );
  }
  return (
    <div className="w-full bg-gradient-to-r from-slate-50 to-white rounded-2xl py-10 border border-slate-100 text-center my-8 shadow-sm">
      <span className="text-[10px] font-bold text-slate-300 uppercase mb-2 block tracking-widest">Publicidade</span>
      <h3 className="text-slate-400 font-medium">Anuncie sua empresa aqui</h3>
    </div>
  );
};

// --- Modals ---

const ApplyModal: React.FC<{ job: Job; isOpen: boolean; onClose: () => void }> = ({ job, isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep(2);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 border border-white/20">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
             <div>
               <h3 className="text-2xl font-bold text-slate-900 tracking-tight">Candidatura</h3>
               <p className="text-slate-500 text-sm mt-1 font-medium">{job.title} • {job.company}</p>
             </div>
             <button onClick={onClose} className="p-2 bg-slate-50 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"><X size={20}/></button>
          </div>

          {step === 1 ? (
            <form onSubmit={handleSubmit} className="space-y-6">
               <div className="bg-emerald-50/50 border border-emerald-100 rounded-xl p-4 text-sm text-emerald-800 flex gap-3">
                 <CheckCircle size={20} className="text-emerald-500 flex-shrink-0" />
                 <span>Seus dados de perfil serão enviados automaticamente.</span>
               </div>
               
               <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-slate-50 hover:border-emerald-400 transition-all cursor-pointer group">
                  <div className="w-14 h-14 bg-white shadow-sm border border-slate-100 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud className="text-emerald-500" size={24} />
                  </div>
                  <p className="font-bold text-slate-700">Carregar CV</p>
                  <p className="text-xs text-slate-400 mt-1">PDF ou DOCX (Máx 5MB)</p>
               </div>

               <div className="space-y-2">
                 <label className="text-sm font-bold text-slate-700">Carta de Apresentação <span className="text-slate-400 font-normal">(Opcional)</span></label>
                 <textarea 
                   className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white outline-none h-32 resize-none transition-all"
                   placeholder="Olá, gostaria de me candidatar porque..."
                 ></textarea>
               </div>

               <button 
                 type="submit" 
                 disabled={isSubmitting}
                 className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
               >
                 {isSubmitting ? 'Enviando...' : 'Confirmar Candidatura'}
               </button>
            </form>
          ) : (
            <div className="text-center py-8">
               <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-in zoom-in duration-300">
                 <CheckCircle className="text-green-600" size={40} />
               </div>
               <h3 className="text-2xl font-bold text-slate-900 mb-2">Sucesso!</h3>
               <p className="text-slate-500 mb-8">Sua candidatura foi enviada. Boa sorte!</p>
               <button onClick={onClose} className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors">
                 Voltar para Vagas
               </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const JobDetailsModal: React.FC<{ job: Job | null; onClose: () => void; onApply: () => void; isSaved?: boolean; onToggleSave?: () => void }> = ({ job, onClose, onApply, isSaved, onToggleSave }) => {
  if (!job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-4xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-8 duration-300">
        
        {/* Header */}
        <div className="bg-white border-b border-slate-100 p-6 md:p-8 flex justify-between items-start sticky top-0 z-10">
          <div className="flex gap-5 items-start">
             <div className="w-16 h-16 md:w-20 md:h-20 bg-white shadow-sm rounded-2xl flex items-center justify-center border border-slate-100 flex-shrink-0">
               <Building2 size={32} className="text-slate-400" />
             </div>
             <div>
               <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">{job.title}</h2>
               <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 text-slate-500 mt-2 text-sm font-medium">
                 <span className="text-emerald-600 font-bold flex items-center gap-1"><Building2 size={14}/> {job.company}</span>
                 <span className="hidden md:inline text-slate-300">•</span>
                 <span className="flex items-center gap-1"><MapPin size={14}/> {job.location}</span>
               </div>
             </div>
          </div>
          <button onClick={onClose} className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-400 hover:text-slate-600 transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
           <div className="flex flex-wrap gap-3 mb-10">
             <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 flex items-center gap-2 text-sm font-semibold text-slate-700">
               <Clock size={16} className="text-slate-400" /> {job.type}
             </div>
             <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 flex items-center gap-2 text-sm font-semibold text-slate-700">
               <Banknote size={16} className="text-slate-400" /> {job.salaryRange || 'A combinar'}
             </div>
             <div className="bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 flex items-center gap-2 text-sm font-semibold text-slate-700">
               <Briefcase size={16} className="text-slate-400" /> {job.sector || 'Geral'}
             </div>
           </div>

           <div className="prose prose-slate prose-lg max-w-none">
             <h3 className="text-xl font-bold text-slate-900 mb-4">Sobre a Vaga</h3>
             <p className="text-slate-600 leading-relaxed mb-8">{job.description}</p>
             
             {job.requirements && (
               <>
                <h3 className="text-xl font-bold text-slate-900 mb-4">Requisitos</h3>
                <ul className="space-y-3 mb-8">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></div>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
               </>
             )}
           </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 md:p-8 border-t border-slate-100 bg-white flex flex-col md:flex-row justify-between items-center gap-4">
           <div className="text-sm text-slate-400 font-medium">
             Publicado: <span className="text-slate-600">{job.postedAt}</span>
           </div>
           <div className="flex gap-4 w-full md:w-auto">
             <button 
                onClick={onToggleSave}
                className={`flex-1 md:flex-none px-6 py-3.5 border rounded-xl font-bold transition-all ${isSaved ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'}`}
             >
               {isSaved ? 'Salva' : 'Salvar'}
             </button>
             <button 
               onClick={onApply}
               className="flex-1 md:flex-none px-10 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-200 transition-all transform hover:-translate-y-0.5"
             >
               Candidatar-se
             </button>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Pages ---

interface PageProps {
  onNavigate: (p: string) => void;
  user: User | null;
  onToggleSaveJob?: (id: string) => void;
  onOpenAuth?: () => void;
}

const HomePage: React.FC<PageProps> = ({ onNavigate, user, onToggleSaveJob, onOpenAuth }) => (
  <div className="pb-12">
    {/* Hero Section */}
    <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-900 to-slate-950 text-white pt-24 pb-32 px-4 relative overflow-hidden">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]"></div>
         <div className="absolute bottom-[0%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="container mx-auto max-w-5xl relative z-10 text-center">
        <span className="inline-block py-1 px-3 rounded-full bg-slate-800/50 border border-slate-700 text-emerald-400 text-xs font-bold tracking-widest uppercase mb-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          #1 em Moçambique
        </span>
        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-1000">
          Construa o seu futuro <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">profissional hoje.</span>
        </h1>
        <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
          Conectamos os melhores talentos às empresas mais inovadoras de Maputo, Beira e Nampula.
        </p>
        
        {/* Floating Search Bar */}
        <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl shadow-2xl border border-white/10 flex flex-col md:flex-row gap-2 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-200">
          <div className="flex-1 flex items-center px-4 bg-white rounded-xl h-14 shadow-sm group focus-within:ring-2 ring-emerald-500/50 transition-all">
            <Search className="text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={22} />
            <input 
              type="text" 
              placeholder="Cargo, competências ou empresa" 
              className="bg-transparent w-full outline-none text-slate-800 placeholder-slate-400 ml-3 font-medium"
            />
          </div>
          <div className="flex-1 flex items-center px-4 bg-white rounded-xl h-14 shadow-sm group focus-within:ring-2 ring-emerald-500/50 transition-all border-l md:border-l-0 border-t md:border-t-0 border-slate-100">
            <MapPin className="text-slate-400 group-focus-within:text-emerald-600 transition-colors" size={22} />
            <select className="bg-transparent w-full outline-none text-slate-800 cursor-pointer ml-3 font-medium appearance-none">
              <option value="">Todas as Províncias</option>
              {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
            <ChevronRight className="text-slate-300 rotate-90" size={16} />
          </div>
          <button 
            onClick={() => onNavigate('jobs')}
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 rounded-xl font-bold transition-all h-14 shadow-lg hover:shadow-emerald-500/25 md:w-auto w-full"
          >
            Pesquisar
          </button>
        </div>
      </div>
    </div>

    {/* Featured Jobs */}
    <div className="container mx-auto px-4 mt-20">
      <div className="flex justify-between items-end mb-8 px-2">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Vagas em Destaque</h2>
          <p className="text-slate-500 mt-2">Oportunidades selecionadas recentemente.</p>
        </div>
        <button 
          onClick={() => onNavigate('jobs')} 
          className="text-emerald-600 font-bold hover:text-emerald-700 flex items-center text-sm bg-emerald-50 px-4 py-2 rounded-full hover:bg-emerald-100 transition-colors"
        >
          Ver todas <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
        {MOCK_JOBS.filter(j => j.featured).map(job => (
          <JobCard 
            key={job.id} 
            job={job} 
            onClick={() => onNavigate('jobs')} 
            isSaved={user?.savedJobIds?.includes(job.id)}
            onToggleSave={() => user ? onToggleSaveJob?.(job.id) : onOpenAuth?.()}
          />
        ))}
      </div>
    </div>

    {/* Categories Grid (New) */}
    <div className="container mx-auto px-4 mt-24">
       <h2 className="text-3xl font-bold text-slate-900 tracking-tight mb-8 text-center">Explore por Setor</h2>
       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
         {CATEGORIES.slice(0, 8).map((cat, i) => (
           <div key={i} className="group bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all cursor-pointer text-center">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-emerald-50 transition-colors">
                <Briefcase size={24} className="text-slate-400 group-hover:text-emerald-600" />
              </div>
              <h3 className="font-bold text-slate-700 group-hover:text-emerald-700">{cat}</h3>
           </div>
         ))}
       </div>
    </div>

    {/* Ad Banner */}
    <div className="container mx-auto px-4 mt-20">
      <AdBanner />
    </div>
  </div>
);

const JobsPage: React.FC<PageProps> = ({ user, onToggleSaveJob, onOpenAuth }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProv, setFilterProv] = useState('');
  const [filterCat, setFilterCat] = useState('');
  const [filterTypes, setFilterTypes] = useState<string[]>([]);
  const [filterMinSalary, setFilterMinSalary] = useState<number>(0);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  // Modal State
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [isApplyOpen, setIsApplyOpen] = useState(false);

  const getMinSalary = (str?: string): number => {
    if (!str) return 0;
    const match = str.match(/(\d[\d\.,]*)/);
    if (!match) return 0;
    const numStr = match[0].replace(/[.,]/g, '');
    return parseInt(numStr, 10);
  };

  const handleTypeChange = (type: string) => {
    setFilterTypes(prev => 
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };
  
  const removeFilterType = (t: string) => setFilterTypes(prev => prev.filter(x => x !== t));

  const filteredJobs = MOCK_JOBS.filter(job => {
    const query = searchQuery.toLowerCase();
    const matchesSearch = !query || 
      job.title.toLowerCase().includes(query) || 
      job.company.toLowerCase().includes(query) ||
      job.description.toLowerCase().includes(query);

    if (!matchesSearch) return false;
    if (filterProv && !job.location.includes(filterProv)) return false;
    if (filterCat && !job.sector?.includes(filterCat) && !job.title.includes(filterCat)) return false;
    if (filterTypes.length > 0 && !filterTypes.includes(job.type)) return false;
    if (filterMinSalary > 0) {
      const jobSalary = getMinSalary(job.salaryRange);
      if (jobSalary < filterMinSalary) return false;
    }
    return true;
  });

  const handleOpenJob = (job: Job) => {
    setSelectedJob(job);
  };

  const handleApplyClick = () => {
    setIsApplyOpen(true);
    setSelectedJob(null); 
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setFilterProv('');
    setFilterCat('');
    setFilterTypes([]);
    setFilterMinSalary(0);
  };

  return (
    <>
    <div className="bg-slate-50 min-h-screen">
      {/* Header Search Area */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-30 shadow-sm">
        <div className="container mx-auto px-4 py-4">
           <div className="flex gap-4">
             <div className="flex-1 relative">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
               <input 
                 type="text" 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 placeholder="Pesquisar cargo, empresa..."
                 className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all"
               />
             </div>
             <button 
               onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
               className="md:hidden px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-600 font-bold flex items-center gap-2"
             >
               <Filter size={20} />
             </button>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`
            fixed inset-0 z-40 bg-white p-6 transform transition-transform duration-300 md:relative md:transform-none md:bg-transparent md:p-0 md:w-72 md:block md:z-0 overflow-y-auto
            ${mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}>
            <div className="flex justify-between items-center md:hidden mb-6">
              <h2 className="text-xl font-bold text-slate-900">Filtros</h2>
              <button onClick={() => setMobileFiltersOpen(false)}><X size={24} className="text-slate-400" /></button>
            </div>

            <div className="space-y-8">
              <div className="bg-white md:bg-transparent md:border-0 rounded-2xl md:rounded-none p-4 md:p-0">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-900 flex items-center gap-2"><Filter size={18} className="text-emerald-500"/> Filtros</h3>
                  {(filterProv || filterCat || filterTypes.length > 0 || filterMinSalary > 0) && (
                    <button onClick={clearAllFilters} className="text-xs text-emerald-600 font-bold hover:underline">Limpar</button>
                  )}
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Setor / Área</label>
                    <select 
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:border-emerald-500 outline-none shadow-sm"
                      value={filterCat}
                      onChange={e => setFilterCat(e.target.value)}
                    >
                      <option value="">Todas</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Província</label>
                    <select 
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:border-emerald-500 outline-none shadow-sm"
                      value={filterProv}
                      onChange={e => setFilterProv(e.target.value)}
                    >
                      <option value="">Todas</option>
                      {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Tipo de Vaga</label>
                    <div className="space-y-3">
                      {['Tempo Inteiro', 'Meio Período', 'Remoto', 'Freelance'].map(t => (
                        <label key={t} className="flex items-center space-x-3 cursor-pointer group">
                          <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${filterTypes.includes(t) ? 'bg-emerald-500 border-emerald-500' : 'border-slate-300 bg-white'}`}>
                            {filterTypes.includes(t) && <CheckCircle size={14} className="text-white" />}
                          </div>
                          <input 
                            type="checkbox" 
                            checked={filterTypes.includes(t)}
                            onChange={() => handleTypeChange(t)}
                            className="hidden" 
                          />
                          <span className={`text-sm transition-colors ${filterTypes.includes(t) ? 'text-slate-900 font-bold' : 'text-slate-600 group-hover:text-emerald-600'}`}>
                            {t}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Salário Mínimo</label>
                    <select 
                      className="w-full bg-white border border-slate-200 rounded-xl p-3 text-sm focus:border-emerald-500 outline-none shadow-sm"
                      value={filterMinSalary}
                      onChange={e => setFilterMinSalary(Number(e.target.value))}
                    >
                      <option value={0}>Qualquer</option>
                      <option value={20000}>20.000+ MZN</option>
                      <option value={50000}>50.000+ MZN</option>
                      <option value={80000}>80.000+ MZN</option>
                      <option value={100000}>100.000+ MZN</option>
                    </select>
                  </div>
                </div>
              </div>
              
              {/* Sidebar Ad */}
              <div className="hidden md:block sticky top-24">
                <AdBanner format="sidebar" />
              </div>
            </div>
          </div>

          {/* Job List */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-end mb-6">
               <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                 {filteredJobs.length} {filteredJobs.length === 1 ? 'Vaga Encontrada' : 'Vagas Encontradas'}
               </h1>
            </div>

            {/* Active Filters Feedback */}
            {(filterProv || filterCat || filterTypes.length > 0 || filterMinSalary > 0) && (
              <div className="flex flex-wrap gap-2 mb-6">
                {filterProv && (
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center border border-emerald-100">
                    {filterProv}
                    <button onClick={() => setFilterProv('')} className="ml-2 hover:bg-emerald-200 rounded-full p-0.5"><X size={12}/></button>
                  </span>
                )}
                {filterCat && (
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center border border-emerald-100">
                    {filterCat}
                    <button onClick={() => setFilterCat('')} className="ml-2 hover:bg-emerald-200 rounded-full p-0.5"><X size={12}/></button>
                  </span>
                )}
                {filterMinSalary > 0 && (
                  <span className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center border border-emerald-100">
                    Min: {filterMinSalary.toLocaleString()} MZN
                    <button onClick={() => setFilterMinSalary(0)} className="ml-2 hover:bg-emerald-200 rounded-full p-0.5"><X size={12}/></button>
                  </span>
                )}
                {filterTypes.map(t => (
                  <span key={t} className="bg-emerald-50 text-emerald-700 text-xs font-bold px-3 py-1.5 rounded-full flex items-center border border-emerald-100">
                    {t}
                    <button onClick={() => removeFilterType(t)} className="ml-2 hover:bg-emerald-200 rounded-full p-0.5"><X size={12}/></button>
                  </span>
                ))}
              </div>
            )}

            <div className="space-y-4">
              {filteredJobs.length > 0 ? (
                filteredJobs.map((job, index) => (
                  <React.Fragment key={job.id}>
                    <JobCard 
                      job={job} 
                      onClick={() => handleOpenJob(job)} 
                      isSaved={user?.savedJobIds?.includes(job.id)}
                      onToggleSave={() => user ? onToggleSaveJob?.(job.id) : onOpenAuth?.()}
                    />
                    {/* Insert Ad after 3rd item */}
                    {index === 2 && <AdBanner />}
                  </React.Fragment>
                ))
              ) : (
                <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-16 text-center">
                   <div className="mx-auto w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                     <Search className="text-slate-300" size={40} />
                   </div>
                   <h3 className="text-xl font-bold text-slate-900">Nenhuma vaga encontrada</h3>
                   <p className="text-slate-500 mt-2 max-w-sm mx-auto">Tente ajustar os seus termos de pesquisa ou remover alguns filtros.</p>
                   <button 
                      onClick={clearAllFilters}
                      className="mt-6 px-6 py-2 bg-emerald-50 text-emerald-700 rounded-lg font-bold hover:bg-emerald-100 transition-colors"
                   >
                     Limpar todos os filtros
                   </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Modals */}
    <JobDetailsModal 
      job={selectedJob} 
      onClose={() => setSelectedJob(null)} 
      onApply={handleApplyClick}
      isSaved={selectedJob && user?.savedJobIds?.includes(selectedJob.id)}
      onToggleSave={() => selectedJob && (user ? onToggleSaveJob?.(selectedJob.id) : onOpenAuth?.())}
    />
    
    <ApplyModal 
      job={selectedJob || MOCK_JOBS[0]} 
      isOpen={isApplyOpen} 
      onClose={() => setIsApplyOpen(false)} 
    />
    </>
  );
};

// --- Main App Logic ---

const AppContent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleLoginSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
    setIsAuthOpen(false);
    navigate('/dashboard');
  };

  const handleToggleSaveJob = (jobId: string) => {
    if (!user) return;
    const currentSaved = user.savedJobIds || [];
    const isSaved = currentSaved.includes(jobId);
    let newSaved;
    if (isSaved) {
      newSaved = currentSaved.filter(id => id !== jobId);
    } else {
      newSaved = [...currentSaved, jobId];
    }
    setUser({ ...user, savedJobIds: newSaved });
  };

  const currentPage = location.pathname.substring(1) || 'home';

  return (
    <Layout 
      user={user} 
      onNavigate={(page) => navigate(page === 'home' ? '/' : `/${page}`)}
      currentPage={currentPage}
      onLogin={() => setIsAuthOpen(true)}
      onLogout={handleLogout}
    >
      <Routes>
        <Route path="/" element={
            <HomePage 
              onNavigate={(page) => navigate(page === 'home' ? '/' : `/${page}`)} 
              user={user}
              onToggleSaveJob={handleToggleSaveJob}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          } 
        />
        <Route path="/jobs" element={
            <JobsPage 
              onNavigate={(page) => navigate(page === 'home' ? '/' : `/${page}`)}
              user={user}
              onToggleSaveJob={handleToggleSaveJob}
              onOpenAuth={() => setIsAuthOpen(true)}
            />
          } 
        />
        <Route path="/ai-studio" element={<AIStudio />} />
        <Route path="/dashboard" element={
            user ? 
            <Dashboard 
              user={user} 
              onNavigateToJob={(job) => {
                 navigate('/jobs');
              }}
              onToggleSaveJob={handleToggleSaveJob}
            /> : 
            <Navigate to="/" />
          } 
        />
      </Routes>

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
        onLoginSuccess={handleLoginSuccess}
      />
    </Layout>
  );
};

export default function App() {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
}