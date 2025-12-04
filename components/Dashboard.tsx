import React, { useState } from 'react';
import { User, Job } from '../types';
import { MOCK_JOBS, MOCK_APPLICATIONS } from '../constants';
import { Chat } from './Chat';
import { Pricing } from './Pricing';
import { JobCard } from './JobCard';
import { 
  User as UserIcon, Briefcase, FileText, Settings, 
  Users, MessageSquare, CreditCard, Filter, CheckCircle, XCircle, Bookmark,
  PieChart, TrendingUp, Building2
} from 'lucide-react';

interface DashboardProps {
  user: User;
  onNavigateToJob?: (job: Job) => void;
  onToggleSaveJob?: (jobId: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ user, onNavigateToJob, onToggleSaveJob }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const isCompany = user.role === 'company';
  const savedJobsList = MOCK_JOBS.filter(job => user.savedJobIds?.includes(job.id));

  const NavButton = ({ id, icon: Icon, label }: any) => (
    <button 
      onClick={() => setActiveTab(id)} 
      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-medium
        ${activeTab === id 
          ? 'bg-slate-900 text-white shadow-lg shadow-slate-200' 
          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}`}
    >
      <Icon size={18} className={activeTab === id ? 'text-emerald-400' : 'text-slate-400'} />
      <span>{label}</span>
    </button>
  );

  const StatCard = ({ label, value, icon: Icon, color }: any) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow">
      <div>
        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">{label}</p>
        <p className="text-3xl font-bold text-slate-800 tracking-tight">{value}</p>
      </div>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} bg-opacity-10`}>
        <Icon className={color.replace('bg-', 'text-')} size={24} />
      </div>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8 lg:py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="w-full lg:w-72 flex-shrink-0">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-24">
            <div className="flex flex-col items-center mb-8 text-center">
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-slate-100 p-1 border border-slate-200">
                  {user.avatar ? (
                     <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
                  ) : (
                     <div className="w-full h-full rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                       <UserIcon size={40} />
                     </div>
                  )}
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full"></div>
              </div>
              <h3 className="font-bold text-slate-900 text-lg">{user.name}</h3>
              <p className="text-sm text-slate-500">{isCompany ? 'Conta Empresarial' : 'Conta Candidato'}</p>
            </div>
            
            <nav className="space-y-1">
              <NavButton id="overview" icon={PieChart} label="Visão Geral" />
              {!isCompany && <NavButton id="profile" icon={UserIcon} label="Meu Perfil" />}
              {!isCompany && <NavButton id="applications" icon={Briefcase} label="Candidaturas" />}
              {!isCompany && <NavButton id="saved" icon={Bookmark} label="Vagas Salvas" />}
              {isCompany && <NavButton id="jobs" icon={Briefcase} label="Gerir Vagas" />}
              {isCompany && <NavButton id="candidates" icon={Users} label="Candidatos" />}
              <NavButton id="messages" icon={MessageSquare} label="Mensagens" />
              {isCompany && <NavButton id="billing" icon={CreditCard} label="Financeiro" />}
              <NavButton id="settings" icon={Settings} label="Configurações" />
            </nav>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 min-w-0">
          
          {/* CONTENT: Messages */}
          {activeTab === 'messages' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <header className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Mensagens</h2>
                <p className="text-slate-500">Gerencie suas conversas e negociações</p>
              </header>
              <Chat currentUser={user} />
            </div>
          )}

          {/* CONTENT: Billing */}
          {activeTab === 'billing' && isCompany && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <Pricing />
            </div>
          )}

          {/* CONTENT: Candidates */}
          {activeTab === 'candidates' && isCompany && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-4">
                <div>
                   <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Candidatos</h2>
                   <p className="text-slate-500">Visualizar aplicações recebidas</p>
                </div>
                <button className="flex items-center space-x-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-50 shadow-sm transition-all">
                  <Filter size={16} /> <span>Filtrar</span>
                </button>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50/50 border-b border-slate-100">
                      <tr>
                        <th className="px-6 py-4 font-semibold text-slate-600 uppercase text-xs tracking-wider">Candidato</th>
                        <th className="px-6 py-4 font-semibold text-slate-600 uppercase text-xs tracking-wider">Vaga</th>
                        <th className="px-6 py-4 font-semibold text-slate-600 uppercase text-xs tracking-wider">Data</th>
                        <th className="px-6 py-4 font-semibold text-slate-600 uppercase text-xs tracking-wider">Match</th>
                        <th className="px-6 py-4 font-semibold text-slate-600 uppercase text-xs tracking-wider">Status</th>
                        <th className="px-6 py-4 font-semibold text-slate-600 uppercase text-xs tracking-wider text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                      {MOCK_APPLICATIONS.map(app => (
                        <tr key={app.id} className="hover:bg-slate-50/80 transition-colors group">
                          <td className="px-6 py-4">
                            <div className="font-bold text-slate-900">{app.candidateName}</div>
                            <div className="text-xs text-slate-500">{app.candidateTitle}</div>
                          </td>
                          <td className="px-6 py-4 text-slate-600 font-medium">
                            {MOCK_JOBS.find(j => j.id === app.jobId)?.title}
                          </td>
                          <td className="px-6 py-4 text-slate-500">{app.date}</td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${app.matchScore}%` }}></div>
                              </div>
                              <span className="font-bold text-emerald-600 text-xs">{app.matchScore}%</span>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border
                              ${app.status === 'pending' ? 'bg-slate-50 text-slate-600 border-slate-200' : 
                                app.status === 'rejected' ? 'bg-red-50 text-red-600 border-red-100' : 
                                app.status === 'interview' ? 'bg-purple-50 text-purple-600 border-purple-100' :
                                'bg-emerald-50 text-emerald-600 border-emerald-100'}
                            `}>
                              {app.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                               <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                                 <CheckCircle size={18} />
                               </button>
                               <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                                 <XCircle size={18} />
                               </button>
                               <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                 <MessageSquare size={18} />
                               </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* CONTENT: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <header>
                <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Olá, {user.name.split(' ')[0]} 👋</h2>
                <p className="text-slate-500 mt-1">Aqui está o resumo da sua atividade hoje.</p>
              </header>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <StatCard 
                  label={isCompany ? "Vagas Ativas" : "Candidaturas"} 
                  value={isCompany ? "4" : "12"} 
                  icon={isCompany ? Briefcase : FileText} 
                  color="text-blue-600 bg-blue-100" 
                />
                <StatCard 
                  label={isCompany ? "Candidatos" : "Entrevistas"} 
                  value={isCompany ? "142" : "3"} 
                  icon={Users} 
                  color="text-purple-600 bg-purple-100" 
                />
                <StatCard 
                  label={isCompany ? "Visualizações" : "Vagas Salvas"} 
                  value={isCompany ? "3.4k" : user.savedJobIds?.length || 0} 
                  icon={isCompany ? TrendingUp : Bookmark} 
                  color="text-amber-600 bg-amber-100" 
                />
              </div>

              {!isCompany && (
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="font-bold text-lg text-slate-800">Candidaturas Recentes</h3>
                     <button className="text-sm text-emerald-600 font-medium hover:underline">Ver todas</button>
                  </div>
                  <div className="space-y-4">
                    {MOCK_JOBS.slice(0, 3).map((job, idx) => (
                      <div key={job.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                        <div className="flex items-start gap-4 mb-3 sm:mb-0">
                          <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center flex-shrink-0">
                            <Building2 size={20} className="text-slate-400" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-sm">{job.title}</h4>
                            <p className="text-xs text-slate-500 font-medium">{job.company}</p>
                          </div>
                        </div>
                        <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto">
                          <span className="text-xs text-slate-400">{job.postedAt}</span>
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border
                            ${idx === 0 ? 'bg-amber-50 text-amber-700 border-amber-100' : 
                              idx === 1 ? 'bg-purple-50 text-purple-700 border-purple-100' : 
                              'bg-slate-100 text-slate-600 border-slate-200'
                            }`}>
                            {idx === 0 ? 'Em Análise' : idx === 1 ? 'Entrevista' : 'Enviado'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* CONTENT: Saved Jobs */}
          {activeTab === 'saved' && !isCompany && (
             <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
               <header className="mb-6">
                 <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Vagas Salvas</h2>
                 <p className="text-slate-500">Oportunidades que você guardou para depois.</p>
               </header>
               
               {savedJobsList.length > 0 ? (
                 <div className="grid grid-cols-1 gap-4">
                   {savedJobsList.map(job => (
                     <JobCard 
                        key={job.id} 
                        job={job} 
                        onClick={(j) => onNavigateToJob && onNavigateToJob(j)}
                        isSaved={true}
                        onToggleSave={() => onToggleSaveJob && onToggleSaveJob(job.id)}
                     />
                   ))}
                 </div>
               ) : (
                 <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-16 text-center">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                       <Bookmark size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">Nenhuma vaga salva</h3>
                    <p className="text-slate-500 mt-2 max-w-md mx-auto">Explore as vagas disponíveis e clique no ícone de marcador para salvá-las aqui.</p>
                 </div>
               )}
             </div>
          )}
        </div>
      </div>
    </div>
  );
};