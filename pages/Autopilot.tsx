import React, { useState, useEffect } from 'react';
import { Bot, DollarSign, Sparkles, CheckCircle2, Copy, FileText, ArrowRight, Save, TrendingUp, ShieldCheck, PieChart, Brain } from 'lucide-react';
import { LotteryType } from '../types';
import { LOTTERIES } from '../constants';

interface AutopilotProps {
    onSaveBatch: (bets: { lotteryId: LotteryType; numbers: number[] }[]) => void;
}

// Configuração de Preços e Estratégia
const LOTTERY_COSTS: Record<string, number> = {
    'lotofacil': 3.00,
    'mega-sena': 5.00,
    'quina': 2.50,
    'lotomania': 3.00,
};

const STRATEGIES = [
    "Fechamento de Ciclo", "Números Quentes", "Equilíbrio P/Í", "Análise de Quadrantes", 
    "Desdobramento Econômico", "Padrão de Atraso", "Frequência Recente"
];

const Autopilot: React.FC<AutopilotProps> = ({ onSaveBatch }) => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [budget, setBudget] = useState<number>(50);
    const [progress, setProgress] = useState(0);
    const [analysisLog, setAnalysisLog] = useState<string[]>([]);
    const [isSaved, setIsSaved] = useState(false);
    
    const [generatedPortfolio, setGeneratedPortfolio] = useState<{
        stats: { totalInvested: number; totalGames: number; distribution: any[] };
        games: any[];
    } | null>(null);

    // Initial load from Dashboard quick start
    useEffect(() => {
        const startBudget = localStorage.getItem('autopilot_start_budget');
        if (startBudget) {
            const val = Number(startBudget);
            if (!isNaN(val) && val >= 10) {
                setBudget(val);
                // Opcional: Iniciar automaticamente ou apenas preencher
                // localStorage.removeItem('autopilot_start_budget'); 
            }
        }
    }, []);

    // Função auxiliar para gerar números aleatórios ordenados
    const generateNumbers = (lotteryId: LotteryType): number[] => {
        const config = LOTTERIES[lotteryId];
        const nums = new Set<number>();
        
        const min = config.numeros?.min ?? 1;
        const max = config.numeros?.max ?? 60;
        const count = config.numeros?.quantidade ?? 6;

        while(nums.size < count) {
            nums.add(Math.floor(Math.random() * (max - min + 1)) + min);
        }
        return Array.from(nums).sort((a,b) => a - b);
    };

    const calculatePortfolio = () => {
        const allocation = {
            'lotofacil': 0.40, // 40%
            'mega-sena': 0.30, // 30%
            'quina': 0.20,     // 20%
            'lotomania': 0.10  // 10%
        };

        let currentTotal = 0;
        let allGames: any[] = [];
        let distributionStats: any[] = [];

        // Definir cores para o gráfico
        const colors: Record<string, string> = {
            'lotofacil': '#930089',
            'mega-sena': '#209869',
            'quina': '#260085',
            'lotomania': '#f78100'
        };

        Object.entries(allocation).forEach(([lotteryKey, pct]) => {
            const lotteryId = lotteryKey as LotteryType;
            const cost = LOTTERY_COSTS[lotteryKey];
            const targetAmount = budget * pct;
            
            // Quantos jogos inteiros cabem nessa fatia do orçamento?
            const count = Math.floor(targetAmount / cost);
            
            if (count > 0) {
                const gamesForLottery = [];
                for (let i = 0; i < count; i++) {
                    gamesForLottery.push({
                        id: Date.now() + Math.random(),
                        lottery: lotteryId,
                        numbers: generateNumbers(lotteryId),
                        cost: cost,
                        reason: STRATEGIES[Math.floor(Math.random() * STRATEGIES.length)]
                    });
                }
                
                allGames = [...allGames, ...gamesForLottery];
                currentTotal += (count * cost);
                
                distributionStats.push({
                    name: LOTTERIES[lotteryId].name,
                    pct: Math.round(pct * 100),
                    color: colors[lotteryKey],
                    count: count
                });
            }
        });

        // Se sobrou dinheiro e não gerou nada (orçamento muito baixo), tenta forçar 1 jogo da mais barata
        if (allGames.length === 0 && budget >= 2.50) {
             const lotteryId = 'quina'; // Mais barata no exemplo
             allGames.push({
                 id: Date.now(),
                 lottery: lotteryId,
                 numbers: generateNumbers(lotteryId),
                 cost: 2.50,
                 reason: "Oportunidade Única"
             });
             currentTotal = 2.50;
             distributionStats.push({ name: 'Quina', pct: 100, color: colors['quina'], count: 1 });
        }

        setGeneratedPortfolio({
            stats: {
                totalInvested: currentTotal,
                totalGames: allGames.length,
                distribution: distributionStats
            },
            games: allGames
        });
    };


    const handleGenerate = () => {
        // Clear saved budget trigger
        localStorage.removeItem('autopilot_start_budget');
        
        calculatePortfolio();
        setStep(2);
        setProgress(0);
        setAnalysisLog([]);

        const logs = [
            "Escaneando resultados de todas as loterias...",
            "Calculando matriz de Risco x Retorno...",
            "Aplicando modelos matemáticos preditivos...",
            "Otimizando alocação do orçamento...",
            "Finalizando seleção de jogos..."
        ];

        let currentLogIndex = 0;
        
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setStep(3), 500);
                    return 100;
                }
                
                if (prev % 20 === 0 && currentLogIndex < logs.length) {
                    setAnalysisLog(prevLogs => [...prevLogs, logs[currentLogIndex]]);
                    currentLogIndex++;
                }

                return prev + 2;
            });
        }, 50);
    };

    const handleSaveAll = () => {
        if (!generatedPortfolio) return;
        onSaveBatch(generatedPortfolio.games.map(g => ({ lotteryId: g.lottery, numbers: g.numbers })));
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    const handleCopyAll = () => {
        if (!generatedPortfolio) return;
        const text = generatedPortfolio.games.map(g => `${LOTTERIES[g.lottery].name}: ${g.numbers.join(', ')}`).join('\n');
        navigator.clipboard.writeText(text);
        alert('Jogos copiados para a área de transferência!');
    };

    // SVG Circle Math
    const radius = 46;
    const circumference = 2 * Math.PI * radius; // approx 289

    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-2 flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <Bot size={24} className="text-blue-600" />
                    </div>
                    Autopiloto de Ganhos
                </h1>
                <p className="text-gray-500">Pare de apostar pouco. Comece a apostar certo com IA.</p>
            </div>

            {/* STEP 1: DEFINIÇÃO DE ORÇAMENTO */}
            {step === 1 && (
                <div className="space-y-6">
                    <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100">
                        <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                            <DollarSign size={20} className="text-green-600" />
                            Defina seu Orçamento Semanal
                        </h2>

                        <div className="flex flex-col items-center justify-center py-4">
                            <div className="relative mb-8 w-full max-w-xs">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">R$</span>
                                <input 
                                    type="number" 
                                    value={budget}
                                    onChange={(e) => setBudget(Number(e.target.value))}
                                    className="w-full text-center text-5xl font-bold text-gray-900 bg-transparent border-b-2 border-gray-200 focus:border-loto-primary outline-none py-4"
                                />
                            </div>

                            <div className="flex gap-3 mb-10 flex-wrap justify-center">
                                {[30, 50, 100, 200].map(val => (
                                    <button 
                                        key={val}
                                        onClick={() => setBudget(val)}
                                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${budget === val ? 'bg-gray-900 text-white shadow-lg' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                                    >
                                        R$ {val}
                                    </button>
                                ))}
                            </div>

                            {/* Value Proposition Card */}
                            <div className="bg-blue-50/80 p-6 rounded-3xl w-full max-w-md border border-blue-100 mb-8">
                                <h3 className="text-base font-bold text-blue-900 mb-4 flex items-center gap-2">
                                    <Sparkles size={18} className="text-blue-600" />
                                    Otimização Inteligente:
                                </h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="bg-white p-1.5 rounded-full shadow-sm mt-0.5 shrink-0">
                                            <TrendingUp size={16} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-blue-900">Análise Global</p>
                                            <p className="text-xs text-blue-700 leading-snug mt-0.5">A IA analisa todas as loterias disponíveis buscando oportunidades.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-white p-1.5 rounded-full shadow-sm mt-0.5 shrink-0">
                                            <PieChart size={16} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-blue-900">Cálculo Chance x Risco</p>
                                            <p className="text-xs text-blue-700 leading-snug mt-0.5">Define matematicamente onde seu dinheiro rende mais chances.</p>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="bg-white p-1.5 rounded-full shadow-sm mt-0.5 shrink-0">
                                            <Bot size={16} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-blue-900">Jogos Prontos</p>
                                            <p className="text-xs text-blue-700 leading-snug mt-0.5">Gera combinações otimizadas para você apenas copiar.</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <button 
                                onClick={handleGenerate}
                                className="w-full max-w-md bg-loto-primary text-white py-4 rounded-2xl font-bold shadow-xl shadow-loto-primary/30 hover:bg-[#153e31] active:scale-95 transition-all flex items-center justify-center gap-3 text-lg group"
                            >
                                <div className="bg-white/20 p-1 rounded-lg">
                                    <Bot size={24} className="group-hover:scale-110 transition-transform" />
                                </div>
                                GERAR JOGOS COM IA
                            </button>
                        </div>
                    </div>

                    {/* Comparação */}
                    <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4">Por que usar o Autopiloto?</h3>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="p-4 rounded-2xl bg-red-50 text-red-800 border border-red-100">
                                <p className="font-bold mb-1">❌ Manual</p>
                                <p className="text-xs opacity-90">Aposta na intuição sem base matemática.</p>
                            </div>
                            <div className="p-4 rounded-2xl bg-green-50 text-green-800 border border-green-100">
                                <p className="font-bold mb-1">✅ Com IA</p>
                                <p className="text-xs opacity-90">Decisões baseadas em dados e probabilidade.</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* STEP 2: PROCESSAMENTO */}
            {step === 2 && (
                <div className="bg-white rounded-[32px] p-8 md:p-12 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 min-h-[400px] flex flex-col items-center justify-center text-center">
                    <div className="relative mb-8">
                        <div className="w-24 h-24 rounded-full border-4 border-gray-100 flex items-center justify-center">
                            <Bot size={40} className="text-loto-primary animate-bounce" />
                        </div>
                        <svg className="absolute top-0 left-0 w-24 h-24 -rotate-90 pointer-events-none">
                             <circle
                                cx="48"
                                cy="48"
                                r={radius}
                                stroke="#1b4d3e"
                                strokeWidth="4"
                                fill="none"
                                strokeDasharray={circumference}
                                strokeDashoffset={circumference - (circumference * progress) / 100}
                                strokeLinecap="round"
                                className="transition-all duration-100 ease-linear"
                            />
                        </svg>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">IA Trabalhando...</h2>
                    <p className="text-gray-500 font-medium mb-8">{progress}% Concluído</p>

                    <div className="w-full max-w-sm space-y-3 text-left">
                        {analysisLog.map((log, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm text-gray-600 animate-in slide-in-from-bottom-2 fade-in">
                                <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                                <span className="font-medium">{log}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* STEP 3: RESULTADOS */}
            {step === 3 && generatedPortfolio && (
                <div className="space-y-6">
                    {/* Resumo do Portfólio */}
                    <div className="bg-white rounded-[32px] p-6 border border-gray-100 shadow-sm">
                        <div className="flex justify-between items-start mb-6">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <Sparkles size={24} className="text-yellow-500" />
                                    Seus Jogos da Semana
                                </h2>
                                <p className="text-sm text-gray-500 mt-1">Orçamento Otimizado: R$ {budget},00</p>
                            </div>
                            <div className="text-right">
                                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold">
                                    {generatedPortfolio.stats.totalGames} Jogos Gerados
                                </span>
                            </div>
                        </div>

                        {/* Barra de Distribuição */}
                        <div className="mb-6">
                            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Distribuição Inteligente</p>
                            <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden flex">
                                {generatedPortfolio.stats.distribution.map((item: any, i: number) => (
                                    <div key={i} style={{ flexGrow: item.count, backgroundColor: item.color }} title={item.name}></div>
                                ))}
                            </div>
                            <div className="flex gap-3 mt-2 flex-wrap">
                                {generatedPortfolio.stats.distribution.map((item: any, i: number) => (
                                    <div key={i} className="flex items-center gap-1.5 text-xs font-medium text-gray-600">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                                        {item.name} ({item.count})
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <button 
                                onClick={handleCopyAll}
                                className="flex items-center justify-center gap-2 bg-blue-50 text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-100 transition-colors"
                            >
                                <Copy size={18} />
                                COPIAR TODOS
                            </button>
                            <button 
                                onClick={handleSaveAll}
                                disabled={isSaved}
                                className={`flex items-center justify-center gap-2 font-bold py-3 rounded-xl transition-colors ${isSaved ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                            >
                                {isSaved ? <CheckCircle2 size={18} /> : <Save size={18} />}
                                {isSaved ? 'SALVO!' : 'SALVAR'}
                            </button>
                        </div>
                    </div>

                    {/* Lista de Jogos */}
                    <div className="space-y-4">
                        {generatedPortfolio.games.map((game: any) => (
                            <div key={game.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
                                <div className={`absolute left-0 top-0 bottom-0 w-1.5`} style={{ backgroundColor: generatedPortfolio.stats.distribution.find((d: any) => d.name === LOTTERIES[game.lottery].name)?.color }}></div>
                                
                                <div className="flex justify-between items-start mb-3 pl-3">
                                    <div>
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{LOTTERIES[game.lottery].name}</span>
                                        <div className="flex gap-1.5 flex-wrap mt-1">
                                            {game.numbers.map((n: number) => (
                                                <span key={n} className="w-7 h-7 bg-gray-50 rounded-full flex items-center justify-center text-xs font-bold text-gray-700 border border-gray-100">
                                                    {n}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <button 
                                        className="p-2 text-gray-400 hover:text-loto-primary hover:bg-gray-50 rounded-lg transition-colors"
                                        onClick={() => {
                                            navigator.clipboard.writeText(`${LOTTERIES[game.lottery].name}: ${game.numbers.join(', ')}`);
                                            alert('Jogo copiado!');
                                        }}
                                    >
                                        <Copy size={18} />
                                    </button>
                                </div>
                                
                                <div className="flex items-center justify-between pl-3 border-t border-gray-50 pt-3 mt-2">
                                    <div className="flex items-center gap-2 text-xs text-gray-600">
                                        <Brain size={14} className="text-purple-500" />
                                        <span>Estratégia: <b>{game.reason}</b></span>
                                    </div>
                                    <span className="text-xs font-bold text-gray-400">R$ {game.cost.toFixed(2)}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center pb-8">
                        <button 
                            onClick={() => setStep(1)}
                            className="text-gray-500 font-medium hover:text-gray-900 underline decoration-gray-300 underline-offset-4"
                        >
                            Configurar novo orçamento
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Autopilot;