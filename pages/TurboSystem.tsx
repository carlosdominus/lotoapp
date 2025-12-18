
import React from 'react';
import { Zap, Calendar, Star, CheckCircle2, Copy, BarChart3, Trophy } from 'lucide-react';

interface TurboSystemProps {
    data: any; // Dados vindos da API
}

const TurboSystem: React.FC<TurboSystemProps> = ({ data }) => {
    // Data Dinâmica fallback caso API falhe
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
        .replace(/^\w/, (c) => c.toUpperCase());

    // Fallback Data
    const defaultData = {
        featured: {
            lottery: 'Mega da Virada',
            concurso: '3000',
            prize: 'R$ 850 Milhões',
            probability: 99.8,
            numbers: [10, 25, 30, 42, 55, 60],
            reasons: [
                "Fechamento de Ciclo Anual",
                "Maior Probabilidade da Década",
                "Filtro de IA em Nível Máximo"
            ]
        },
        comparative: [
            { name: 'Mega da Virada', score: 99.8, stars: 5 },
            { name: 'Timemania', score: 92.2, stars: 5 },
            { name: 'Lotofácil', score: 88.5, stars: 4 },
            { name: 'Quina', score: 71.5, stars: 3 },
            { name: 'Lotomania', score: 65.8, stars: 3 },
        ],
        calendar: [
            { day: 'Hoje', game: 'Mega da Virada', score: '99.8%', status: 'ready' },
            { day: 'Amanhã', game: 'Timemania', score: '94.5%', status: 'notify' },
            { day: 'Quarta', game: 'Lotofácil', score: '93.1%', status: 'pending' },
        ]
    };

    const activeData = data || defaultData;
    const featured = activeData.featured;

    // Sincroniza o primeiro item do comparativo com o destaque
    const sortedComparative = [...activeData.comparative];
    const featuredInCompIndex = sortedComparative.findIndex(c => c.name === featured.lottery);
    if (featuredInCompIndex > -1) {
        const item = sortedComparative.splice(featuredInCompIndex, 1)[0];
        sortedComparative.unshift(item);
    }

    const handleCopy = () => {
        const text = `JOGO TURBO HOJE (${featured.lottery}): ${featured.numbers.join(' ')}`;
        navigator.clipboard.writeText(text);
        alert('Jogo copiado com sucesso!');
    };

    const recentWinners = [
        { name: 'Luciana F.', game: 'Lotofácil', prize: 'R$ 1,8 Mi', time: 'Há 15 min' },
        { name: 'Roberto S.', game: 'Lotofácil', prize: 'R$ 1.250,00', time: 'Há 5h' },
        { name: 'João D.', game: 'Quina', prize: 'R$ 14.500,00', time: 'Ontem' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-2 flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                        <Zap size={24} className="text-amber-600 fill-amber-600" />
                    </div>
                    Sistema Turbo
                </h1>
                <p className="text-gray-500">A melhor oportunidade do dia filtrada pela nossa IA.</p>
            </div>

            {/* HERO CARD - DINÂMICO */}
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1b4d3e] to-[#0f2e24] text-white shadow-2xl shadow-[#1b4d3e]/30">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
                
                <div className="relative p-6 md:p-8">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className="inline-flex items-center gap-1.5 bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-xs font-bold tracking-wider shadow-lg shadow-amber-400/20 mb-3">
                                <Star size={12} fill="currentColor" />
                                JOGO TURBO DE HOJE
                            </span>
                            <p className="text-gray-300 text-sm font-medium">{formattedDate}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Prêmio Estimado</p>
                            <p className="text-2xl font-bold text-loto-secondary">{featured.prize}</p>
                        </div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1 space-y-6">
                            <div>
                                <h2 className="text-4xl font-bold mb-2">{featured.lottery}</h2>
                                <div className="flex items-center gap-3 text-sm text-gray-300">
                                    <span>Concurso: {featured.concurso}</span>
                                    <span>•</span>
                                    <span>Análise Concluída</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-bold text-gray-300">Confiança IA</span>
                                    <span className="text-xl font-bold text-loto-secondary">{featured.probability}%</span>
                                </div>
                                <div className="h-3 bg-gray-900/50 rounded-full overflow-hidden border border-white/5">
                                    <div className="h-full bg-gradient-to-r from-loto-secondary to-green-400 rounded-full" style={{ width: `${featured.probability}%` }}></div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                {(featured.reasons || []).map((reason: string, i: number) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-gray-200">
                                        <CheckCircle2 size={16} className="text-loto-secondary shrink-0" />
                                        <span>{reason}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="lg:w-80 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 text-center">Combinação Recomendada</p>
                                <div className="flex flex-wrap justify-center gap-2 mb-8">
                                    {(featured.numbers || []).map((n: number) => (
                                        <span key={n} className="w-9 h-9 flex items-center justify-center bg-white text-[#1b4d3e] rounded-full font-bold text-sm shadow-sm">
                                            {n}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            
                            <button 
                                onClick={handleCopy}
                                className="w-full bg-loto-secondary text-[#1b4d3e] font-bold py-4 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg active:scale-95"
                            >
                                <Copy size={18} />
                                COPIAR JOGO
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* COMPARATIVE SECTION - DINÂMICO */}
            <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart3 size={20} className="text-gray-400" />
                    Comparativo Probabilístico
                </h3>
                <div className="space-y-3">
                    {sortedComparative.map((comp: any) => (
                        <div key={comp.name} className={`flex items-center justify-between p-3 rounded-xl transition-colors ${comp.name === featured.lottery ? 'bg-gray-50' : ''}`}>
                            <span className={`font-medium ${comp.name === featured.lottery ? 'text-gray-900 font-bold' : 'text-gray-500'}`}>
                                {comp.name}
                            </span>
                            <div className="flex items-center gap-4">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={14} className={`${i < comp.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} />
                                    ))}
                                </div>
                                <span className={`text-sm font-bold w-12 text-right ${comp.name === featured.lottery ? 'text-green-600' : 'text-gray-400'}`}>
                                    {comp.score}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* CALENDAR - DINÂMICO */}
                <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Calendar size={20} className="text-blue-500" />
                        Próximas Oportunidades
                    </h3>
                    <div className="space-y-4">
                        {(activeData.calendar || []).map((item: any, i: number) => (
                            <div key={i} className="flex justify-between items-center text-sm">
                                <div className="flex flex-col">
                                    <span className="font-bold text-gray-800">{item.day}</span>
                                    <span className="text-xs text-gray-400">{item.game} {item.score && `| ${item.score}`}</span>
                                </div>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded-lg uppercase ${item.status === 'ready' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                                    {item.status === 'ready' ? 'Liberado' : 'Em Análise'}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Trophy size={20} className="text-amber-500" />
                        Ganhadores Reais
                    </h3>
                    <div className="space-y-3">
                        {recentWinners.map((w, i) => (
                            <div key={i} className="p-3 bg-green-50/50 rounded-xl border border-green-100 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-green-700 font-bold text-xs shadow-sm border border-green-100">
                                        {w.name.charAt(0)}
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-gray-900 leading-tight">{w.name}</p>
                                        <p className="text-[10px] text-gray-500 font-medium">{w.game}</p>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-green-700">{w.prize}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TurboSystem;
