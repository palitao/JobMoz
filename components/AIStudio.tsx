import React, { useState, useRef, useEffect } from 'react';
import { Upload, Wand2, Download, AlertCircle, Loader2, Image as ImageIcon, CheckCircle, X, Sparkles } from 'lucide-react';
import { editImageWithGemini } from '../services/geminiService';
import { AI_PRICING } from '../constants';

export const AIStudio: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const successTimerRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      if (successTimerRef.current) clearTimeout(successTimerRef.current);
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setGeneratedImage(null);
        setError(null);
        setShowSuccess(false);
        if (successTimerRef.current) clearTimeout(successTimerRef.current);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;
    if (!prompt.trim()) {
      setError("Por favor, descreva como deseja editar a imagem.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setShowSuccess(false);
    if (successTimerRef.current) clearTimeout(successTimerRef.current);

    try {
      const result = await editImageWithGemini(selectedImage, prompt);
      setGeneratedImage(result);
      setShowSuccess(true);
      successTimerRef.current = window.setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    } catch (err: any) {
      setError(err.message || "Falha ao processar imagem com Gemini.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="inline-flex items-center justify-center p-4 bg-white rounded-3xl mb-6 shadow-xl shadow-emerald-100 border border-emerald-50 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-tr from-emerald-100 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <Wand2 className="text-emerald-600 relative z-10" size={40} />
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Estúdio IA JobMoz</h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Transforme fotos profissionais e logotipos com a potência da Inteligência Artificial.
        </p>
      </div>

      {/* Pricing Cards Mini */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-12">
         {AI_PRICING.map(pkg => (
           <div key={pkg.id} className="bg-white border border-slate-100 p-5 rounded-2xl shadow-sm text-center hover:shadow-md transition-shadow hover:border-emerald-200 group">
             <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{pkg.title}</div>
             <div className="text-2xl font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">{pkg.price}</div>
             <p className="text-xs text-slate-400 mt-1">{pkg.description}</p>
           </div>
         ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Input Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 flex flex-col h-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-sm">1</div>
            <h3 className="font-bold text-xl text-slate-900">Carregar Imagem</h3>
          </div>

          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`
              flex-1 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center p-8 cursor-pointer transition-all duration-300
              min-h-[320px] mb-8 relative overflow-hidden
              ${selectedImage ? 'border-emerald-400 bg-slate-50' : 'border-slate-200 hover:border-emerald-400 hover:bg-slate-50 group'}
            `}
          >
            {selectedImage ? (
              <img 
                src={selectedImage} 
                alt="Original" 
                className="max-h-[300px] object-contain rounded-lg shadow-sm relative z-10" 
              />
            ) : (
              <div className="text-center text-slate-400 relative z-10">
                <div className="w-20 h-20 bg-slate-100 group-hover:bg-white group-hover:shadow-md transition-all rounded-full flex items-center justify-center mx-auto mb-6">
                  <Upload size={32} className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
                </div>
                <p className="font-semibold text-slate-700 text-lg mb-2">Clique para carregar</p>
                <p className="text-sm">PNG, JPG (Máx 5MB)</p>
              </div>
            )}
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              className="hidden" 
              accept="image/*" 
            />
          </div>

          <div className="space-y-4">
             <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-sm">2</div>
                <label className="font-bold text-xl text-slate-900">Instrução Mágica</label>
             </div>
             <div className="relative">
               <textarea
                 value={prompt}
                 onChange={(e) => setPrompt(e.target.value)}
                 placeholder="Ex: Adicione um terno azul escuro, torne o fundo um escritório moderno, melhore a iluminação do rosto..."
                 className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:border-transparent outline-none resize-none h-32 transition-all shadow-inner"
               />
               <Sparkles className="absolute right-4 bottom-4 text-emerald-400 opacity-50" size={20} />
             </div>
             
             <button
               onClick={handleGenerate}
               disabled={!selectedImage || isLoading || !prompt}
               className={`w-full py-4 rounded-xl font-bold text-white flex items-center justify-center space-x-2 transition-all duration-300 transform active:scale-[0.98]
                 ${!selectedImage || !prompt || isLoading 
                   ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                   : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-lg shadow-emerald-200'}
               `}
             >
               {isLoading ? (
                 <>
                   <Loader2 className="animate-spin" size={20} />
                   <span>Processando IA...</span>
                 </>
               ) : (
                 <>
                   <Wand2 size={20} />
                   <span>Gerar Edição</span>
                 </>
               )}
             </button>
          </div>
          
          {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-700 text-sm rounded-xl flex items-start gap-3 border border-red-100">
              <AlertCircle size={18} className="mt-0.5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Output Section */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 flex flex-col h-full relative overflow-hidden">
           {/* Background decorative pattern */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-50 rounded-full blur-3xl -z-0 opacity-50 translate-x-1/3 -translate-y-1/3"></div>

           <div className="flex items-center gap-3 mb-6 relative z-10">
             <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-sm">3</div>
             <h3 className="font-bold text-xl text-slate-900">Resultado</h3>
           </div>
           
           <div className="flex-1 bg-slate-50/50 rounded-2xl flex items-center justify-center p-6 min-h-[400px] border border-slate-200/60 relative overflow-hidden group z-10">
             {generatedImage ? (
               <img 
                 src={generatedImage} 
                 alt="Generated" 
                 className="max-h-full max-w-full object-contain rounded-lg shadow-2xl animate-in zoom-in duration-500" 
               />
             ) : (
               <div className="text-center text-slate-400">
                 {isLoading ? (
                    <div className="flex flex-col items-center">
                      <div className="relative w-20 h-20 mb-6">
                        <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
                        <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
                      </div>
                      <p className="font-medium text-slate-600 animate-pulse">A magia está a acontecer...</p>
                      <p className="text-sm mt-2">Isso pode levar alguns segundos.</p>
                    </div>
                 ) : (
                   <>
                     <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-100 opacity-50">
                        <ImageIcon size={40} />
                     </div>
                     <p>A imagem editada aparecerá aqui</p>
                   </>
                 )}
               </div>
             )}
           </div>

           {generatedImage && (
             <div className="mt-8 relative z-10">
                {showSuccess && (
                  <div className="mb-4 p-4 bg-emerald-50 text-emerald-900 rounded-xl flex items-center justify-between border border-emerald-100 animate-in slide-in-from-top-2 duration-300">
                    <div className="flex items-center gap-3">
                      <div className="bg-emerald-100 p-1 rounded-full"><CheckCircle size={16} className="text-emerald-600" /></div>
                      <span className="font-medium text-sm">Imagem gerada com sucesso!</span>
                    </div>
                    <button onClick={() => setShowSuccess(false)} className="text-emerald-500 hover:text-emerald-700 transition-colors">
                      <X size={18} />
                    </button>
                  </div>
                )}
               <a 
                 href={generatedImage} 
                 download="jobmoz-edited.png"
                 className="block w-full py-4 bg-slate-900 text-white text-center rounded-xl font-bold hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
               >
                 <Download size={20} />
                 Baixar Imagem
               </a>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};