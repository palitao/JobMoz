import React from 'react';
import { PLANS, MOCK_TRANSACTIONS, AD_PRICING } from '../constants';
import { Check, CreditCard, Megaphone, Zap } from 'lucide-react';

export const Pricing: React.FC = () => {

  return (
    <div className="space-y-16">
      {/* Introduction */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Escolha o Plano Ideal</h2>
        <p className="text-lg text-slate-500 leading-relaxed">
          Potencialize o recrutamento da sua empresa com as melhores ferramentas de Moçambique.
          Flexibilidade total, cancele quando quiser.
        </p>
      </div>

      {/* Job Plans */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8">
        {PLANS.map(plan => (
          <div 
            key={plan.id} 
            className={`relative flex flex-col h-full bg-white rounded-2xl transition-all duration-300
              ${plan.recommended 
                ? 'border-2 border-emerald-500 shadow-xl shadow-emerald-100 scale-105 z-10' 
                : 'border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1'
              } p-8`}
          >
            {plan.recommended && (
              <div className="absolute top-0 right-1/2 translate-x-1/2 -mt-4">
                <span className="bg-emerald-600 text-white text-[11px] font-extrabold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md flex items-center gap-1">
                  <Zap size={12} fill="currentColor" /> Recomendado
                </span>
              </div>
            )}
            
            <div className="mb-6">
               <h3 className={`text-lg font-bold ${plan.recommended ? 'text-emerald-700' : 'text-slate-900'}`}>{plan.name}</h3>
               <div className="mt-4 flex items-baseline">
                 <span className="text-4xl font-extrabold text-slate-900 tracking-tight">{plan.price}</span>
                 {plan.price !== '0 MT' && <span className="text-slate-400 text-sm ml-2">/pacote</span>}
               </div>
               <p className="text-xs font-medium text-slate-500 mt-2 uppercase tracking-wide">
                 {plan.duration}
               </p>
            </div>
            
            <div className="flex-1">
              <ul className="space-y-4 mb-8">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-start text-sm text-slate-600 group">
                    <div className={`mr-3 mt-0.5 p-0.5 rounded-full ${plan.recommended ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400 group-hover:text-emerald-500 group-hover:bg-emerald-50'} transition-colors`}>
                      <Check size={12} strokeWidth={3} />
                    </div>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all duration-200
              ${plan.recommended 
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-200' 
                : 'bg-slate-50 text-slate-700 hover:bg-slate-900 hover:text-white'
              }`}>
              Selecionar Plano
            </button>
          </div>
        ))}
      </div>

      {/* Ads & Monetization Section */}
      <div className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
           <div className="flex items-center gap-5">
             <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-blue-200 transform rotate-3">
               <Megaphone size={32} />
             </div>
             <div>
               <h3 className="text-2xl font-bold text-slate-900">Soluções de Publicidade</h3>
               <p className="text-slate-500 mt-1">Destaque sua marca para milhares de profissionais.</p>
             </div>
           </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
           {AD_PRICING.map(ad => (
             <div key={ad.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
               <div className="flex justify-between items-start mb-4">
                 <div>
                   <h4 className="font-bold text-slate-800">{ad.title}</h4>
                   <p className="text-xs text-slate-400 font-medium uppercase tracking-wide mt-1">{ad.type}</p>
                 </div>
                 <div className="text-emerald-600 font-bold bg-emerald-50 px-3 py-1 rounded-full text-sm">
                   {ad.price}
                 </div>
               </div>
               <p className="text-sm text-slate-500 border-t border-slate-50 pt-4 mt-2">
                 {ad.details}
               </p>
             </div>
           ))}
        </div>
      </div>

      {/* Payment Methods */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 bg-white rounded-2xl p-8 border border-slate-100 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-6 flex items-center gap-2 text-lg">
            <CreditCard size={20} className="text-emerald-600" />
            Métodos de Pagamento
          </h3>
          <div className="flex flex-wrap gap-4">
            {['M-Pesa', 'e-Mola', 'Visa', 'Mastercard'].map((method, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-50 pl-2 pr-5 py-2 rounded-xl border border-slate-100 hover:border-slate-300 transition-colors cursor-default">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-[10px] shadow-sm
                  ${method === 'M-Pesa' ? 'bg-red-600' : method === 'e-Mola' ? 'bg-orange-500' : 'bg-slate-800'}
                `}>
                  {method === 'M-Pesa' ? 'M' : method === 'e-Mola' ? 'e' : <CreditCard size={18} />}
                </div>
                <span className="font-semibold text-slate-700 text-sm">{method}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
           <div className="px-8 py-5 border-b border-slate-100 bg-slate-50/50">
             <h3 className="font-bold text-slate-900">Histórico Recente</h3>
           </div>
           <div className="p-0">
             <table className="w-full text-sm text-left">
               <tbody className="divide-y divide-slate-50">
                 {MOCK_TRANSACTIONS.map(tx => (
                   <tr key={tx.id} className="hover:bg-slate-50 transition-colors">
                     <td className="px-8 py-4 text-slate-500 text-xs">{tx.date}</td>
                     <td className="px-8 py-4 font-medium text-slate-800">{tx.description}</td>
                     <td className="px-8 py-4 text-right font-bold text-slate-900">{tx.amount}</td>
                   </tr>
                 ))}
               </tbody>
             </table>
           </div>
        </div>
      </div>
    </div>
  );
};