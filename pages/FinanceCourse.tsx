
import React, { useState } from 'react';
import { GraduationCap, PlayCircle, ChevronDown, ChevronUp, CheckCircle, ShieldCheck, Star } from 'lucide-react';

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
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Hero Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-2 flex items-center gap-3">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                            <GraduationCap size={24} className="text-indigo-600" />
                        </div>
                        Educação Financeira VIP
                    </h1>
                    <p className="text-gray-500 text-sm">Transforme sua relação com o dinheiro e jogue com maestria.</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="text-right">
                        <p className="text-[10px] font-bold text-gray-400 uppercase">Seu Progresso</p>
                        <p className="text-sm font-bold text-gray-900">{progress}% Concluído</p>
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-gray-100 flex items-center justify-center relative">
                        <svg className="absolute inset-0 w-12 h-12 -rotate-90">
                            <circle
                                cx="24"
                                cy="24"
                                r="20"
                                stroke="#4f46e5"
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray="125.6"
                                strokeDashoffset={125.6 - (125.6 * progress) / 100}
                                strokeLinecap="round"
                                className="transition-all duration-700 ease-in-out"
                            />
                        </svg>
                        <span className="text-[10px] font-bold text-indigo-600">{completed.length}/5</span>
                    </div>
                </div>
            </div>

            {/* Introductory Card */}
            <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[32px] p-8 text-white shadow-xl shadow-indigo-200">
                <div className="flex items-start gap-4 mb-4">
                    <Star className="text-yellow-400 fill-yellow-400" size={24} />
                    <h2 className="text-xl font-bold">Domine suas Finanças</h2>
                </div>
                <p className="text-indigo-50 leading-relaxed text-sm mb-6">
                    A diferença entre um apostador comum e um ganhador profissional está na gestão. 
                    Este curso exclusivo foi desenhado para que você tenha controle total sobre sua banca e sua vida financeira.
                </p>
                <div className="flex items-center gap-3 text-sm font-medium bg-white/10 w-fit px-4 py-2 rounded-full backdrop-blur-sm">
                    <ShieldCheck size={18} /> Conteúdo Exclusivo Premium
                </div>
            </div>

            {/* Modules List */}
            <div className="space-y-4">
                {MODULES.map((module) => (
                    <div 
                        key={module.id} 
                        className={`bg-white rounded-[24px] border transition-all duration-300 overflow-hidden ${
                            expandedId === module.id ? 'border-indigo-200 shadow-md ring-1 ring-indigo-50' : 'border-gray-100 shadow-sm hover:border-gray-200'
                        }`}
                    >
                        <button 
                            onClick={() => toggleModule(module.id)}
                            className="w-full p-5 flex items-center justify-between text-left group"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-colors ${
                                    completed.includes(module.id) ? 'bg-green-100 text-green-600' : 'bg-gray-50 text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-600'
                                }`}>
                                    {completed.includes(module.id) ? <CheckCircle size={20} /> : module.id}
                                </div>
                                <div>
                                    <h3 className={`font-bold transition-colors ${expandedId === module.id ? 'text-indigo-600' : 'text-gray-900'}`}>
                                        {module.title}
                                    </h3>
                                    <span className="text-[10px] text-gray-400 font-bold uppercase">Módulo Liberado</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div 
                                    onClick={(e) => toggleComplete(module.id, e)}
                                    className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase transition-all ${
                                        completed.includes(module.id) 
                                            ? 'bg-green-50 text-green-600' 
                                            : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                                    }`}
                                >
                                    {completed.includes(module.id) ? 'Concluída' : 'Marcar como vista'}
                                </div>
                                {expandedId === module.id ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                            </div>
                        </button>

                        {expandedId === module.id && (
                            <div className="px-5 pb-5 animate-in slide-in-from-top-2 duration-300">
                                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                                    {module.description}
                                </p>
                                
                                <div 
                                    className={`rounded-2xl overflow-hidden bg-gray-900 shadow-2xl relative group mx-auto ${module.aspectRatio === "133.33%" ? 'max-w-[340px]' : 'w-full'}`}
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

                                <div className="mt-4 flex justify-end">
                                    <button 
                                        onClick={() => toggleComplete(module.id, { stopPropagation: () => {} } as any)}
                                        className="text-xs font-bold text-indigo-600 flex items-center gap-2 hover:underline"
                                    >
                                        <PlayCircle size={14} /> Reassistir aula
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Motivation Footer */}
            <div className="py-10 text-center">
                <p className="text-sm text-gray-400 italic">"O conhecimento é o único investimento que nunca perde valor."</p>
            </div>
        </div>
    );
};

export default FinanceCourse;
