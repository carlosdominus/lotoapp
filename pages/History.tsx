import React from 'react';
import { LOTTERIES } from '../constants';
import { Trash2, Search, Inbox, Bot } from 'lucide-react';
import { SavedBet } from '../types';

interface HistoryProps {
    history: SavedBet[];
    onClear: () => void;
}

const History: React.FC<HistoryProps> = ({ history, onClear }) => {
    return (
        <div className="p-4 pb-24 animate-in fade-in duration-500">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Seus Jogos</h2>
                <div className="flex gap-2">
                    {history.length > 0 && (
                        <button 
                            onClick={onClear}
                            className="p-2 bg-red-50 hover:bg-red-100 rounded-full shadow-sm text-red-500 transition-colors"
                            title="Limpar histórico"
                        >
                            <Trash2 size={20} />
                        </button>
                    )}
                </div>
             </div>

             {history.length === 0 ? (
                 <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                     <Inbox size={64} className="mb-4 text-gray-200" />
                     <p className="font-medium">Nenhum jogo salvo ainda.</p>
                     <p className="text-sm">Gere combinações e salve para ver aqui.</p>
                 </div>
             ) : (
                <div className="space-y-4">
                    {history.map((game) => {
                        const lottery = LOTTERIES[game.lotteryId];
                        return (
                            <div key={game.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative overflow-hidden group hover:border-loto-primary/30 transition-colors">
                                <div className={`absolute top-0 left-0 w-1.5 h-full`} style={{ backgroundColor: lottery.color }}></div>
                                
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="font-bold text-gray-800">{lottery.name}</h3>
                                            {game.source === 'autopilot' && (
                                                <span className="bg-blue-50 text-blue-600 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 font-bold border border-blue-100">
                                                    <Bot size={10} />
                                                    Autopiloto
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-400">{game.date} • {game.concurso}</p>
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                                        game.status === 'Premiado' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                                    }`}>
                                        {game.status}
                                    </span>
                                </div>

                                <div className="flex gap-1.5 flex-wrap mb-4">
                                    {game.numbers.map(n => (
                                        <span key={n} className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-sm font-medium text-gray-700 bg-gray-50">
                                            {n}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex justify-between items-center border-t border-gray-50 pt-3">
                                    {game.status === 'Premiado' && (
                                        <span className="text-sm font-bold text-loto-primary">🎉 {game.hits} Acertos!</span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
             )}
        </div>
    );
};

export default History;