
import React, { useState } from 'react';
import { GraduationCap, PlayCircle, ChevronDown, ChevronUp, CheckCircle, ShieldCheck, Star, Trophy } from 'lucide-react';

interface Module {
    id: number;
    title: string;
    description: string;
    videoId: string;
    aspectRatio: string;
}

const MODULES: Module[] = [
    {
        id: 1,
        title: "AULA 1 Poupança vs CDI",
        description: "Descubra por que a poupança não é mais um investimento viável e como o CDI pode fazer seu dinheiro render muito mais com a mesma segurança.",
        videoId: "1e5283a1-30cf-418c-93b8-f7213b0e5c36",
        aspectRatio: "133.33%"
    },
    {
        id: 2,
        title: "AULA 2 Armadilhas financeiras",
        description: "Aprenda a identificar e evitar os erros mais comuns que drenam o seu patrimônio silenciosamente todos os meses.",
        videoId: "f4809cc2-49fe-4272-81a7-1874b21dff9f",
        aspectRatio: "133.33%"
    },
    {
        id: 3,
        title: "AULA 3 Controle de gastos",
        description: "Um guia prático para dominar seu fluxo de caixa, eliminar desperdícios e fazer sobrar dinheiro para o que realmente importa.",
        videoId: "afab11aa-7054-4c32-a1b5-3136bd2e7cb3",
        aspectRatio: "133.33%"
    },
    {
        id: 4,
        title: "AULA 4 Fundos Imobiliários",
        description: "Como viver de aluguel sem ter um imóvel físico. Entenda como funcionam os FIIs e como montar sua primeira carteira de dividendos.",
        videoId: "e4fb3457-10e2-49e3-a887-e289b5fda02a",
        aspectRatio: "133.33%"
    },
    {
        id: 5,
        title: "AULA 5 Plano de 6 meses",
        description: "O passo a passo detalhado para você organizar sua vida financeira e atingir seus primeiros grandes objetivos em apenas um semestre.",
        videoId: "382e3a0f-9293-409f-a99c-5330be62ee52",
        aspectRatio: "133.33%"
    }
];

const FinanceCourse: React.FC = () => {
    const [expandedId, setExpandedId] = useState<number | null>(1);
    const [completed, setCompleted] = useState<number[]>([]);

    const toggleModule = (id: number) => {
        setExpandedId(expandedId === id ? null : id);
    };

    const toggleComplete = (id: number, e: React.MouseEvent) => {
        e.stopPropagation();
        setCompleted(prev => 
            prev.includes(id) ? prev.filter(mid => mid !== id) : [...prev, id]
        );
    };

    const progress = Math.round((completed.length / MODULES.length) * 100);

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-24">
            {/* Header unificado sem a barra branca isolada */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-indigo-600 rounded-2xl text-white shadow-lg shadow-indigo-200">
                        <GraduationCap size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 tracking-tight leading-tight">Educação Financeira VIP</h1>
                        <p className="text-sm text-gray-500 font-medium">Domine seu dinheiro e jogue com maestria.</p>
                    </div>
                </div>

                {/* Progress bar mais discreta e integrada */}
                <div className="bg-white/40 backdrop-blur-sm p-4 rounded-3xl border border-white flex items-center justify-between gap-4">
                    <div className="flex-1">
                        <div className="flex justify-between items-center mb-1.5">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Seu Progresso Atual</span>
                            <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">{progress}% Concluído</span>
                        </div>
                        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-indigo-600 rounded-full transition-all duration-1000 ease-out"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="shrink-0 w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center">
                        <Trophy size={18} className="text-indigo-600" />
                    </div>
                </div>
            </div>

            {/* Banner de destaque */}
            <div className="bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-[32px] p-6 text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                        <Star className="text-yellow-400 fill-yellow-400" size={18} />
                        <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">Conteúdo Premium</span>
                    </div>
                    <h2 className="text-lg font-bold mb-3 leading-snug">A diferença entre um apostador e um vencedor profissional está na gestão.</h2>
                    <p className="text-indigo-100/80 text-xs leading-relaxed mb-0">
                        Este treinamento foi desenhado para que você tenha controle total sobre sua banca e vida financeira.
                    </p>
                </div>
            </div>

            {/* Lista de Aulas */}
            <div className="space-y-3">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2 mb-4">Cronograma de Aulas</h3>
                {MODULES.map((module) => (
                    <div 
                        key={module.id} 
                        className={`bg-white rounded-[24px] border transition-all duration-300 overflow-hidden ${
                            expandedId === module.id ? 'border-indigo-200 shadow-lg ring-1 ring-indigo-50' : 'border-gray-100 shadow-sm hover:bg-gray-50/50'
                        }`}
                    >
                        <button 
                            onClick={() => toggleModule(module.id)}
                            className="w-full p-4 flex items-center justify-between text-left group"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition-colors ${
                                    completed.includes(module.id) ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                                }`}>
                                    {completed.includes(module.id) ? <CheckCircle size={18} /> : module.id}
                                </div>
                                <div>
                                    <h3 className={`text-sm font-bold transition-colors ${expandedId === module.id ? 'text-indigo-600' : 'text-gray-900'}`}>
                                        {module.title}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                                        <span className="text-[10px] text-gray-400 font-bold uppercase">Módulo Liberado</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <div 
                                    onClick={(e) => toggleComplete(module.id, e)}
                                    className={`px-2.5 py-1.5 rounded-lg text-[9px] font-bold uppercase transition-all ${
                                        completed.includes(module.id) 
                                            ? 'bg-green-50 text-green-600' 
                                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                    }`}
                                >
                                    {completed.includes(module.id) ? 'Concluída' : 'Marcar Vista'}
                                </div>
                                {expandedId === module.id ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                            </div>
                        </button>

                        {expandedId === module.id && (
                            <div className="px-4 pb-5 animate-in slide-in-from-top-2 duration-300">
                                <p className="text-xs text-gray-500 mb-4 leading-relaxed bg-gray-50 p-3 rounded-xl border border-gray-100">
                                    {module.description}
                                </p>
                                
                                <div 
                                    className="rounded-2xl overflow-hidden bg-gray-900 shadow-2xl relative group mx-auto max-w-[340px]"
                                    style={{ position: 'relative', paddingTop: module.aspectRatio }}
                                >
                                    <iframe 
                                        id={`panda-${module.videoId}`}
                                        src={`https://player-vz-30ca375c-0dd.tv.pandavideo.com.br/embed/?v=${module.videoId}`} 
                                        style={{ border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} 
                                        allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" 
                                        allowFullScreen={true}
                                    ></iframe>
                                </div>

                                <div className="mt-4 flex justify-center">
                                    <button 
                                        onClick={() => toggleComplete(module.id, { stopPropagation: () => {} } as any)}
                                        className="text-[10px] font-bold text-indigo-600 flex items-center gap-2 hover:bg-indigo-50 px-3 py-1.5 rounded-full transition-colors"
                                    >
                                        <PlayCircle size={14} /> Reassistir esta aula
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="py-8 text-center">
                <div className="inline-flex items-center gap-2 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    <ShieldCheck size={14} className="text-indigo-400" />
                    Ambiente de Aprendizado Seguro
                </div>
            </div>
        </div>
    );
};

export default FinanceCourse;
