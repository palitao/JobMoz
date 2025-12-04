import React from 'react';
import { Job } from '../types';
import { MapPin, Building2, Clock, Banknote, Star, Bookmark, Briefcase } from 'lucide-react';

interface JobCardProps {
  job: Job;
  onClick: (job: Job) => void;
  isSaved?: boolean;
  onToggleSave?: () => void;
}

export const JobCard: React.FC<JobCardProps> = ({ job, onClick, isSaved = false, onToggleSave }) => {
  return (
    <div 
      onClick={() => onClick(job)}
      className={`group relative bg-white rounded-2xl p-6 transition-all duration-300 cursor-pointer border
        ${job.featured 
          ? 'border-emerald-100 shadow-[0_4px_20px_rgba(16,185,129,0.08)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.12)] hover:-translate-y-1' 
          : 'border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-emerald-200'}
      `}
    >
      {/* Featured Badge */}
      {job.featured && (
         <div className="absolute top-0 right-0 bg-gradient-to-bl from-emerald-500 to-emerald-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-bl-2xl rounded-tr-2xl flex items-center gap-1 uppercase tracking-wider z-10 shadow-sm">
           <Star size={10} fill="currentColor" /> Destaque
         </div>
      )}

      <div className="flex justify-between items-start gap-4">
        {/* Company Logo Placeholder */}
        <div className="hidden sm:flex flex-shrink-0 w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl items-center justify-center text-slate-400 group-hover:border-emerald-100 group-hover:text-emerald-500 transition-colors">
          <Building2 size={24} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
             <span className="text-slate-400 text-xs font-medium">{job.postedAt}</span>
             {job.featured && <span className="w-1 h-1 bg-slate-300 rounded-full"></span>}
             {job.featured && <span className="text-emerald-600 text-xs font-bold tracking-tight">Recomendado</span>}
          </div>
          
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors truncate pr-8">
            {job.title}
          </h3>
          <p className="text-slate-500 text-sm font-medium mb-4 truncate">{job.company}</p>
          
          {/* Metadata Chips */}
          <div className="flex flex-wrap gap-2 text-xs font-medium text-slate-600">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:shadow-sm transition-all">
              <MapPin size={14} className="text-slate-400" />
              {job.location}
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:shadow-sm transition-all">
              <Clock size={14} className="text-slate-400" />
              {job.type}
            </span>
             {job.sector && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-white group-hover:shadow-sm transition-all">
                <Briefcase size={14} className="text-slate-400" />
                {job.sector}
              </span>
            )}
          </div>
          
          {/* Salary Badge */}
          {job.salaryRange && (
             <div className="mt-4 inline-flex items-center bg-slate-50 border border-slate-200 text-slate-700 px-3 py-1.5 rounded-full text-xs font-semibold group-hover:bg-emerald-50 group-hover:border-emerald-200 group-hover:text-emerald-800 transition-colors">
               <Banknote size={14} className="mr-2 text-emerald-500" />
               {job.salaryRange}
             </div>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex flex-col gap-2">
           <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave && onToggleSave();
            }}
            className={`p-2.5 rounded-full transition-all duration-200
              ${isSaved 
                ? 'text-emerald-600 bg-emerald-50 shadow-inner' 
                : 'text-slate-300 hover:text-emerald-600 hover:bg-emerald-50/50'
              }`}
            title={isSaved ? "Remover dos salvos" : "Salvar vaga"}
          >
            <Bookmark size={20} fill={isSaved ? "currentColor" : "none"} strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  );
};