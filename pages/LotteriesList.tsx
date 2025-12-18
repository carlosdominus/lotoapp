
import React from 'react';
import { LOTTERIES } from '../constants';
import { Trophy } from 'lucide-react';
import { LotteryType } from '../types';

interface LotteriesListProps {
    onNavigate: (page: string, params?: { id: LotteryType }) => void;
    dynamicLotteries: any;
}

const LotteriesList: React.FC<LotteriesListProps> = ({ onNavigate, dynamicLotteries }) => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            <div className="flex flex-col gap-1 mb-6">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
                    <Trophy size={28} className="text-amber-500" />
                    Loterias Disponíveis
                </h1>
                <p className="text-gray-500 font-medium">Escolha sua loteria favorita para analisar.</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.values(LOTTERIES).map((lottery) => {
                    // Mescla com dados dinâmicos
                    const dyn = dynamicLotteries[lottery.id] || {};
                    const prize = dyn.prize || lottery.prize;
                    const nextDraw = dyn.nextDraw || lottery.nextDraw;

                    return (
                        <button
                            key={lottery.id}
                            onClick={() => onNavigate('lotteries', { id: lottery.id as LotteryType })}
                            className="bg-white p-5 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-loto-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all text-left group flex flex-col justify-between min-h-[160px] relative overflow-hidden"
                        >
                            <div className={`absolute top-0 left-0 w-1.5 h-full`} style={{ backgroundColor: lottery.color }}></div>
                            
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-md transform group-hover:scale-110 transition-transform" style={{ backgroundColor: lottery.color }}>
                                    {lottery.icon}
                                </div>
                            </div>
                            
                            <div>
                                <h4 className="font-bold text-gray-900 group-hover:text-loto-primary transition-colors text-lg truncate">{lottery.name}</h4>
                                <p className="text-sm font-semibold text-green-600 mt-1">{prize}</p>
                                <p className="text-xs text-gray-400 mt-2 font-medium">Sorteio: {nextDraw}</p>
                            </div>
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default LotteriesList;
