
import React, { useState, useEffect } from 'react';
import { DollarSign, Wallet, TrendingDown, AlertTriangle, ShieldCheck, PieChart, ArrowRight, History as HistoryIcon, Calculator, Edit2 } from 'lucide-react';
import { SavedBet } from '../types';

interface EconomyBetProps {
    history: SavedBet[];
}

const PRICE_TABLE: Record<string, number> = {
    'mega-sena': 6.00,
    'mega-virada': 6.00,
    'quina': 3.00,
    'lotofacil': 3.50,
    'dupla-sena': 3.00,
    'super-sete': 3.00,
    'loteca': 4.00,
    'lotomania': 3.00,
    'timemania': 3.50,
    'dia-de-sorte': 2.50,
    '+milionaria': 6.00,
    'mais-milionaria': 6.00
};

const EconomyBet: React.FC<EconomyBetProps> = ({ history }) => {
    // Inicializar estados a partir do localStorage
    const [income, setIncome] = useState<number>(() => {
        const saved = localStorage.getItem('economy_income');
        return saved ? Number(saved) : 0;
    });
    const [expenses, setExpenses] = useState<number>(() => {
        const saved = localStorage.getItem('economy_expenses');
        return saved ? Number(saved) : 0;
    });
    const [totalSpentInHistory, setTotalSpentInHistory] = useState<number>(0);
    const [isEditing, setIsEditing] = useState<boolean>(!(income > 0 || expenses > 0));

    useEffect(() => {
        // Calcular gasto total baseado no histórico
        const total = history.reduce((acc, bet) => {
            const price = PRICE_TABLE[bet.lotteryId.toLowerCase()] || 0;
            return acc + price;
        }, 0);
        setTotalSpentInHistory(total);
    }, [history]);

    // Persistir dados quando mudarem
    useEffect(() => {
        localStorage.setItem('economy_income', income.toString());
    }, [income]);

    useEffect(() => {
        localStorage.setItem('economy_expenses', expenses.toString());
    }, [expenses]);

    const surplus = income - expenses;
    const limit = surplus > 0 ? surplus * 0.2 : 0;
    const isOverLimit = totalSpentInHistory > limit && limit > 0;
    const isCrisis = surplus <= 0 && (income > 0 || expenses > 0);

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-2 flex items-center gap-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                        <Calculator size={24} className="text-emerald-600" />
                    </div>
                    Aposta Econômica
                </h1>
                <p className="text-gray-500">Jogue com inteligência e mantenha sua saúde financeira em dia.</p>
            </div>

            {/* Calculadora de Orçamento */}
            <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Wallet size={20} className="text-emerald-600" />
                        Sua Realidade Financeira
                    </h2>
                    {!isEditing && (income > 0 || expenses > 0) && (
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="text-xs font-bold text-loto-primary flex items-center gap-1 hover:underline"
                        >
                            <Edit2 size={12} /> Alterar dados
                        </button>
                    )}
                </div>

                {isEditing ? (
                    <div className="grid md:grid-cols-2 gap-6 mb-8 animate-in fade-in zoom-in-95 duration-300">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Renda Mensal (R$)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">R$</span>
                                <input 
                                    type="number" 
                                    value={income || ''} 
                                    onChange={(e) => setIncome(Number(e.target.value))}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-900 focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
                                    placeholder="0,00"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider ml-1">Total de Despesas (R$)</label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">R$</span>
                                <input 
                                    type="number" 
                                    value={expenses || ''} 
                                    onChange={(e) => setExpenses(Number(e.target.value))}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 font-bold text-gray-900 focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
                                    placeholder="0,00"
                                />
                            </div>
                        </div>
                        <div className="md:col-span-2">
                            <button 
                                onClick={() => setIsEditing(false)}
                                className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/10 active:scale-95"
                            >
                                SALVAR E ANALISAR
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-gray-50 rounded-2xl border border-gray-100 animate-in fade-in slide-in-from-top-2">
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Renda</p>
                            <p className="font-bold text-gray-900">R$ {income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase">Despesas</p>
                            <p className="font-bold text-gray-900">R$ {expenses.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                        <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">O que sobrou</p>
                        <p className={`text-xl font-bold ${surplus > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                            R$ {surplus.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                        <p className="text-[10px] font-bold text-emerald-800 uppercase mb-1">Limite Prudente (20%)</p>
                        <p className="text-xl font-bold text-emerald-700">
                            R$ {limit.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                        <p className="text-[10px] font-bold text-blue-800 uppercase mb-1">Gasto no Histórico</p>
                        <p className="text-xl font-bold text-blue-700">
                            R$ {totalSpentInHistory.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>
            </div>

            {/* Resultado da Análise */}
            <div className={`p-6 md:p-8 rounded-[32px] border transition-all shadow-sm ${
                isCrisis ? 'bg-red-50 border-red-100' : 
                isOverLimit ? 'bg-amber-50 border-amber-100' : 
                limit > 0 ? 'bg-emerald-50 border-emerald-100' : 
                'bg-white border-gray-100'
            }`}>
                {isCrisis ? (
                    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                            <AlertTriangle size={32} className="text-red-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-red-900 mb-2">Atenção Prioritária à Economia!</h3>
                            <p className="text-sm text-red-700 leading-relaxed">
                                Suas despesas são maiores ou iguais à sua renda. Recomendamos <b>suspender novas apostas</b> até que suas finanças estejam equilibradas. O Loto APP apoia o jogo responsável.
                            </p>
                        </div>
                    </div>
                ) : isOverLimit ? (
                    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
                            <TrendingDown size={32} className="text-amber-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-amber-900 mb-2">Limite Sugerido Excedido</h3>
                            <p className="text-sm text-amber-700 leading-relaxed">
                                Você já gastou <b>R$ {totalSpentInHistory.toFixed(2)}</b> em apostas, o que ultrapassa os 20% do seu saldo livre (R$ {limit.toFixed(2)}). Recomendamos cautela nos próximos jogos.
                            </p>
                        </div>
                    </div>
                ) : limit > 0 ? (
                    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                        <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center shrink-0">
                            <ShieldCheck size={32} className="text-emerald-600" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-emerald-900 mb-2">Saúde Financeira Excelente</h3>
                            <p className="text-sm text-emerald-700 leading-relaxed">
                                Seus gastos com loterias estão dentro da margem de segurança. Você ainda possui <b>R$ {(limit - totalSpentInHistory).toFixed(2)}</b> de limite prudente disponível para este mês.
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                            <PieChart size={32} className="text-gray-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 mb-2">Aguardando Dados</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Insira sua renda e despesas acima para que possamos analisar seu perfil de apostador e sugerir limites seguros.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {/* Dicas de Jogo Responsável */}
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <HistoryIcon size={20} className="text-loto-primary" />
                    Regras de Ouro do Apostador
                </h3>
                <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                        <div className="w-1.5 h-1.5 bg-loto-primary rounded-full mt-2 shrink-0"></div>
                        <p className="text-sm text-gray-600"><span className="font-bold text-gray-900">Nunca use dinheiro de contas essenciais:</span> Aluguel, comida e saúde devem vir sempre em primeiro lugar.</p>
                    </div>
                    <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                        <div className="w-1.5 h-1.5 bg-loto-primary rounded-full mt-2 shrink-0"></div>
                        <p className="text-sm text-gray-600"><span className="font-bold text-gray-900">Considere o gasto como lazer:</span> Trate o dinheiro da aposta como o valor de um cinema ou pizza.</p>
                    </div>
                    <div className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-2xl transition-colors">
                        <div className="w-1.5 h-1.5 bg-loto-primary rounded-full mt-2 shrink-0"></div>
                        <p className="text-sm text-gray-600"><span className="font-bold text-gray-900">Não tente recuperar perdas:</span> Se não ganhou hoje, não aumente o valor amanhã para "compensar".</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EconomyBet;
