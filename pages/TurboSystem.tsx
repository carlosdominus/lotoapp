
import React, { useState } from 'react';
import { Zap, Calendar, Bell, ArrowRight, CheckCircle2, TrendingUp, Trophy, Star, ShieldCheck, ArrowLeft, Copy, BarChart3, AlertTriangle } from 'lucide-react';
import { LOTTERIES } from '../constants';

const TurboSystem: React.FC = () => {
    const [showAnalysis, setShowAnalysis] = useState(false);

    // Data Dinâmica
    const today = new Date();
    const formattedDate = today.toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })
        .replace(/^\w/, (c) => c.toUpperCase());

    // Auxiliar para datas do calendário
    const getFutureDate = (days: number) => {
        const date = new Date(today);
        date.setDate(date.getDate() + days);
        const weekday = date.toLocaleDateString('pt-BR', { weekday: 'long' }).replace(/^\w/, (c) => c.toUpperCase());
        const dayMonth = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
        return `${weekday} (${dayMonth})`;
    };

    // Atualizado para Timemania
    const todayGame = {
        lottery: 'Timemania',
        concurso: '2329',
        date: formattedDate,
        drawTime: '21h',
        prize: 'R$ 61.000.000',
        probability: 98.2,
        // Nova combinação otimizada de 10 números
        numbers: [3, 12, 18, 29, 33, 47, 52, 64, 71, 77],
        reasons: [
            "Fechamento de Ciclo ativo (faltam 2)",
            "Padrão Ímpar/Par perfeito (5/5)",
            "Números Quentes da zona 30-50",
            "Coração de Time equilibrado"
        ],
        cost: 3.50,
        timing: "Até 20h"
    };

    // Comparativo atualizado
    const comparative = [
        { name: 'Timemania', score: 98.2, stars: 5 },
        { name: 'Lotofácil', score: 88.5, stars: 4 },
        { name: 'Mega-Sena', score: 85.2, stars: 4 },
        { name: 'Quina', score: 71.5, stars: 3 },
        { name: 'Lotomania', score: 65.8, stars: 3 },
    ];

    // Calendário atualizado
    const calendar = [
        { day: 'Hoje', game: 'Timemania', score: '98.2%', status: 'ready' },
        { day: getFutureDate(1), game: 'Mega-Sena', score: '94.5%', status: 'notify' },
        { day: getFutureDate(2), game: 'Mega-Sena', score: '93.1%', status: 'notify' },
        { day: getFutureDate(3), game: 'Lotofácil', score: '86.5%', status: 'pending' },
    ];

    const history = [
        { date: 'Ontem', game: 'Timemania', prob: '94.7%', result: 'Acertou 4 (Quadra)', prize: 'R$ 380' },
        { date: 'Anteontem', game: 'Mega-Sena', prob: '91.2%', result: 'Acertou 5 (Quina)', prize: 'R$ 58.400' },
    ];

    const handleCopy = () => {
        const text = `JOGO TURBO HOJE (${todayGame.lottery}): ${todayGame.numbers.join(' ')}`;
        navigator.clipboard.writeText(text);
        alert('Jogo copiado com sucesso!');
    };

    if (showAnalysis) {
        return (
            <div className="animate-in slide-in-from-right duration-300 pb-12">
                <button 
                    onClick={() => setShowAnalysis(false)}
                    className="flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 font-medium"
                >
                    <ArrowLeft size={20} />
                    Voltar para o Jogo
                </button>

                <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Relatório Técnico</span>
                            <h2 className="text-2xl font-bold text-gray-900">Análise Turbo - {todayGame.lottery}</h2>
                        </div>
                        <div className="bg-green-50 text-green-700 px-4 py-2 rounded-xl font-bold text-xl border border-green-100">
                            148/150
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Ciclo */}
                        <div className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                            <div className="bg-red-100 p-3 rounded-xl h-fit">
                                <TrendingUp className="text-red-600" size={24} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-bold text-gray-900">Fechamento de Ciclo</h3>
                                    <span className="text-green-600 font-bold">+30 pts</span>
                                </div>
                                <div className="space-y-1 text-sm text-gray-600">
                                    <p>• Status: <span className="font-bold text-red-500">CRÍTICO</span></p>
                                    <p>• Faltam sair: 2 números chaves</p>
                                    <p>• Impacto: <span className="font-bold">MUITO ALTO ⚠️</span></p>
                                </div>
                            </div>
                        </div>

                        {/* Acumulação */}
                        <div className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                            <div className="bg-yellow-100 p-3 rounded-xl h-fit">
                                <Star className="text-yellow-600" size={24} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-bold text-gray-900">Acumulação Monstro</h3>
                                    <span className="text-green-600 font-bold">+18 pts</span>
                                </div>
                                <div className="space-y-1 text-sm text-gray-600">
                                    <p>• Prêmio: {todayGame.prize}</p>
                                    <p>• Maior prêmio acumulado do mês.</p>
                                </div>
                            </div>
                        </div>

                        {/* Performance Recente (Ex-ROI) */}
                         <div className="flex gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100">
                            <div className="bg-blue-100 p-3 rounded-xl h-fit">
                                <BarChart3 className="text-blue-600" size={24} />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className="font-bold text-gray-900">Performance Recente</h3>
                                    <span className="text-green-600 font-bold">+12 pts</span>
                                </div>
                                <div className="space-y-1 text-sm text-gray-600">
                                    <p>• Últimos 90 dias: Alta assertividade no Time do Coração.</p>
                                    <p>• Impacto: MÉDIO</p>
                                </div>
                            </div>
                        </div>

                        {/* Conclusão */}
                        <div className="bg-[#1b4d3e] text-white p-6 rounded-2xl mt-8">
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <CheckCircle2 size={20} className="text-loto-secondary" />
                                Conclusão da IA
                            </h3>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                A {todayGame.lottery} hoje apresenta a <strong className="text-white">MAIOR PROBABILIDADE</strong> de ganho com um prêmio extraordinário de {todayGame.prize}. O fechamento de ciclo cria uma oportunidade estatística rara.
                            </p>
                            <div className="flex justify-between items-center pt-4 border-t border-white/10">
                                <span className="text-sm text-gray-400">Recomendação:</span>
                                <span className="font-bold text-loto-secondary">APOSTAR FORTE HOJE</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-2 flex items-center gap-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                        <Zap size={24} className="text-amber-600 fill-amber-600" />
                    </div>
                    Sistema Turbo
                </h1>
                <p className="text-gray-500">O jogo mais inteligente do dia, escolhido por IA.</p>
            </div>

            {/* HERO CARD - JOGO DO DIA */}
            <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1b4d3e] to-[#0f2e24] text-white shadow-2xl shadow-[#1b4d3e]/30">
                {/* Background FX */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
                
                <div className="relative p-6 md:p-8">
                    {/* Top Bar */}
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <span className="inline-flex items-center gap-1.5 bg-amber-400 text-amber-900 px-3 py-1 rounded-full text-xs font-bold tracking-wider shadow-lg shadow-amber-400/20 mb-3">
                                <Star size={12} fill="currentColor" />
                                JOGO TURBO DE HOJE
                            </span>
                            <p className="text-gray-300 text-sm font-medium">{todayGame.date}</p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-gray-400 uppercase tracking-wider font-bold mb-1">Prêmio Estimado</p>
                            <p className="text-2xl font-bold text-loto-secondary">{todayGame.prize}</p>
                        </div>
                    </div>

                    {/* Main Content Split */}
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Left: Info & Stats */}
                        <div className="flex-1 space-y-6">
                            <div>
                                <h2 className="text-4xl font-bold mb-2">{todayGame.lottery}</h2>
                                <div className="flex items-center gap-3 text-sm text-gray-300">
                                    <span>Conc: {todayGame.concurso}</span>
                                    <span>•</span>
                                    <span>Sorteio: {todayGame.drawTime}</span>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex justify-between items-end">
                                    <span className="text-sm font-bold text-gray-300">Probabilidade Turbo</span>
                                    <span className="text-xl font-bold text-loto-secondary">{todayGame.probability}%</span>
                                </div>
                                <div className="h-3 bg-gray-900/50 rounded-full overflow-hidden border border-white/5">
                                    <div 
                                        className="h-full bg-gradient-to-r from-loto-secondary to-green-400 rounded-full shadow-[0_0_15px_rgba(41,239,96,0.4)]" 
                                        style={{ width: `${todayGame.probability}%` }}
                                    ></div>
                                </div>
                                <p className="text-xs text-gray-400 mt-1">
                                    Este é o jogo com MAIOR probabilidade de ganho HOJE.
                                </p>
                            </div>

                            <div className="space-y-2">
                                {todayGame.reasons.map((reason, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-gray-200">
                                        <CheckCircle2 size={16} className="text-loto-secondary shrink-0" />
                                        <span>{reason}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right: The Game */}
                        <div className="lg:w-80 bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex flex-col justify-between">
                            <div>
                                <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 text-center">Sua Combinação Otimizada</p>
                                <div className="flex flex-wrap justify-center gap-2 mb-6">
                                    {todayGame.numbers.map(n => (
                                        <span key={n} className="w-9 h-9 flex items-center justify-center bg-white text-[#1b4d3e] rounded-full font-bold text-sm shadow-sm">
                                            {n}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex justify-between text-xs text-gray-300 mb-6 px-2">
                                    <span>Custo: R$ {todayGame.cost.toFixed(2)}</span>
                                    <span>Horário: {todayGame.timing}</span>
                                </div>
                            </div>
                            
                            <div className="space-y-3">
                                <button 
                                    onClick={handleCopy}
                                    className="w-full bg-loto-secondary text-[#1b4d3e] font-bold py-3.5 rounded-xl hover:bg-white transition-colors flex items-center justify-center gap-2 shadow-lg"
                                >
                                    <Copy size={18} />
                                    COPIAR JOGO
                                </button>
                                <button 
                                    onClick={() => setShowAnalysis(true)}
                                    className="w-full bg-transparent border border-white/30 text-white font-semibold py-3 rounded-xl hover:bg-white/5 transition-colors text-sm"
                                >
                                    VER ANÁLISE DETALHADA
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* COMPARATIVE SECTION */}
            <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart3 size={20} className="text-gray-400" />
                    Comparativo do Dia
                </h3>
                <div className="space-y-3">
                    {comparative.map((comp) => (
                        <div key={comp.name} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
                            <div className="flex items-center gap-3">
                                <span className={`font-medium ${comp.name === todayGame.lottery ? 'text-gray-900 font-bold' : 'text-gray-500'}`}>
                                    {comp.name}
                                </span>
                                {comp.name === todayGame.lottery && (
                                    <span className="bg-loto-primary/10 text-loto-primary text-[10px] font-bold px-2 py-0.5 rounded">RECOMENDADO</span>
                                )}
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex gap-0.5">
                                    {[...Array(5)].map((_, i) => (
                                        <Star 
                                            key={i} 
                                            size={14} 
                                            className={`${i < comp.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-200 fill-gray-200'}`} 
                                        />
                                    ))}
                                </div>
                                <span className={`text-sm font-bold w-12 text-right ${comp.name === todayGame.lottery ? 'text-green-600' : 'text-gray-400'}`}>
                                    {comp.score}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
                <p className="text-center text-xs text-gray-400 mt-4">
                    Por isso recomendamos a <b>Timemania</b> hoje. É matematicamente superior.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {/* CALENDAR */}
                <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Calendar size={20} className="text-blue-500" />
                        Calendário Turbo
                    </h3>
                    <div className="space-y-4">
                        {calendar.map((item, i) => (
                            <div key={i} className="flex justify-between items-center text-sm">
                                <div className="flex flex-col">
                                    <span className="font-bold text-gray-800">{item.day}</span>
                                    {item.status === 'ready' ? (
                                        <span className="text-xs text-green-600 font-medium flex items-center gap-1">
                                            <Zap size={10} fill="currentColor" /> {item.game} | {item.score}
                                        </span>
                                    ) : item.status === 'notify' ? (
                                        <span className="text-xs text-gray-400">{item.game} (Previsto)</span>
                                    ) : (
                                        <span className="text-xs text-gray-300">Aguardando análise</span>
                                    )}
                                </div>
                                {item.status === 'ready' ? (
                                    <button className="text-xs bg-gray-900 text-white px-3 py-1.5 rounded-lg font-bold">VER</button>
                                ) : (
                                    <button className="text-xs text-gray-400 hover:text-blue-500 flex items-center gap-1">
                                        <Bell size={12} /> Avisar
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* HISTORY */}
                <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <Trophy size={20} className="text-amber-500" />
                        Histórico Recente
                    </h3>
                    <div className="space-y-3">
                        {history.map((h, i) => (
                            <div key={i} className="p-3 bg-green-50/50 rounded-xl border border-green-100">
                                <div className="flex justify-between mb-1">
                                    <span className="text-xs font-bold text-gray-500">{h.date} - {h.game}</span>
                                    <span className="text-xs font-bold text-green-700 bg-white px-2 rounded shadow-sm">{h.prize}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-800">{h.result}</span>
                                    <span className="text-xs text-gray-400">Prob: {h.prob}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Value Prop */}
            <div className="bg-blue-50 rounded-[32px] p-6 border border-blue-100 text-center">
                <ShieldCheck size={32} className="text-blue-600 mx-auto mb-3" />
                <h3 className="font-bold text-blue-900 mb-2">Por que o Sistema Turbo funciona?</h3>
                <p className="text-sm text-blue-800/80 leading-relaxed mb-4">
                    Diferente de jogar aleatoriamente, o Turbo foca em <b>Qualidade</b> ao invés de Quantidade.
                    A IA analisa milhões de cenários para encontrar a única "janela de oportunidade" perfeita do dia.
                </p>
                <div className="text-xs font-bold text-blue-400 uppercase tracking-widest">Sniper Mode Activated</div>
            </div>
        </div>
    );
};

export default TurboSystem;
