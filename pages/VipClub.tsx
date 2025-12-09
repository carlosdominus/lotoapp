
import React, { useState, useEffect } from 'react';
import { Crown, Copy, ShieldCheck, Trophy } from 'lucide-react';
import { ASSETS } from '../constants';

const BANNERS = [
    {
        id: 1,
        image: 'https://i.ibb.co/Z1WMBnzw/banner-whats-vertical-1-1.webp',
        link: 'https://chat.whatsapp.com/DBN9XdLnmYd2E08APFAS2P',
        alt: 'Grupo VIP WhatsApp'
    },
    {
        id: 2,
        image: 'https://i.ibb.co/9mxDYfn1/banner-telegram-vertical-1-1.webp',
        link: 'https://t.me/+FoQgj_4cigBmMmEx',
        alt: 'Grupo VIP Telegram'
    }
];

const VipClub: React.FC = () => {
    const [currentBanner, setCurrentBanner] = useState(0);

    // Auto-rotate banner
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Dados VIP Mockados
    const vipSignals = [
        { id: 1, lottery: 'Mega-Sena', numbers: '05 12 18 27 33 49', method: 'Quadrantes + Ciclo', time: 'Há 2 horas' },
        { id: 2, lottery: 'Lotofácil', numbers: '01 02 04 06 08 10 12 14 16 18 20 22 23 24 25', method: 'Fechamento Matemático', time: 'Há 4 horas' },
        { id: 3, lottery: 'Quina', numbers: '03 15 28 45 72', method: 'Números Quentes', time: 'Ontem' },
    ];

    // Dados de Ganhadores Mockados
    const recentWinners = [
        { id: 1, name: 'Roberto S.', amount: 'R$ 14.250,00', lottery: 'Quina', time: 'Há 25 min' },
        { id: 2, name: 'Ana Clara M.', amount: 'R$ 2.800,00', lottery: 'Lotofácil', time: 'Há 1 hora' },
        { id: 3, name: 'Carlos D.', amount: 'R$ 950,00', lottery: 'Lotomania', time: 'Há 2 horas' },
        { id: 4, name: 'J. Paulo', amount: 'R$ 45.000,00', lottery: 'Mega-Sena', time: 'Ontem' },
    ];

    return (
        <div className="space-y-4 animate-in fade-in duration-500 pb-12">
             {/* Header */}
             <div className="flex flex-col md:flex-row justify-between md:items-end gap-3">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-1 flex items-center gap-3">
                        <div className="p-2 bg-gray-900 rounded-lg text-yellow-400">
                            <Crown size={24} fill="currentColor" />
                        </div>
                        Clube VIP
                    </h1>
                    <p className="text-gray-500 text-sm">Sinais exclusivos e comunidade de elite.</p>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-green-50 border border-green-100 rounded-full text-green-700 text-xs font-bold uppercase tracking-wide self-start md:self-auto">
                    <ShieldCheck size={14} />
                    Membro Ativo
                </div>
            </div>

            {/* Banner Rotativo (Replaced Static Card) */}
            <div className="relative w-full rounded-3xl overflow-hidden shadow-lg shadow-blue-900/10 border border-gray-100 hover:shadow-xl transition-all group bg-gray-50">
                {/* CSS Grid stack to allow natural height based on image content */}
                <div className="grid grid-cols-1">
                    {BANNERS.map((banner, index) => (
                        <a 
                            key={banner.id}
                            href={banner.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`col-start-1 row-start-1 w-full transition-opacity duration-700 ease-in-out ${
                                index === currentBanner ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                            }`}
                        >
                            <img 
                                src={banner.image} 
                                alt={banner.alt} 
                                className="w-full h-auto block"
                            />
                            {/* Overlay sutil para hover */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                        </a>
                    ))}
                </div>
                
                {/* Dots Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {BANNERS.map((_, index) => (
                        <button
                            key={index}
                            onClick={(e) => { 
                                e.preventDefault(); 
                                setCurrentBanner(index); 
                            }}
                            className={`h-1.5 rounded-full transition-all duration-300 shadow-sm backdrop-blur-md ${
                                index === currentBanner 
                                    ? 'bg-white w-6 opacity-100' 
                                    : 'bg-white/40 w-1.5 hover:bg-white/60'
                            }`}
                            aria-label={`Ir para banner ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* VIP Signals List */}
            <div>
                <h3 className="font-bold text-base text-gray-900 mb-1 flex items-center gap-2 px-1">
                    <Crown size={18} className="text-yellow-500" />
                    Sinais VIP do Dia
                </h3>
                <p className="text-xs text-gray-500 px-1 mb-3">Mais comentados no clube hoje!</p>
                
                <div className="grid gap-3">
                    {vipSignals.map((signal) => (
                        <div key={signal.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <span className="text-[10px] font-bold text-loto-primary uppercase tracking-wider bg-loto-primary/10 px-1.5 py-0.5 rounded mb-1.5 inline-block">
                                        {signal.lottery}
                                    </span>
                                    <h4 className="font-mono text-gray-800 font-medium tracking-tight text-sm">{signal.numbers}</h4>
                                </div>
                                <button className="p-1.5 text-gray-400 hover:text-loto-primary hover:bg-gray-50 rounded-lg transition-colors" title="Copiar">
                                    <Copy size={16} />
                                </button>
                            </div>
                            
                            <div className="flex justify-between items-center border-t border-gray-50 pt-2 mt-1">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                    <p className="text-[10px] text-gray-500">Método: <span className="font-medium text-gray-700">{signal.method}</span></p>
                                </div>
                                <span className="text-[10px] text-gray-400 font-medium">{signal.time}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Galeria de Ganhadores (Preencher espaço) */}
            <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm">
                <h3 className="font-bold text-base text-gray-900 mb-4 flex items-center gap-2">
                    <Trophy size={18} className="text-loto-secondary" />
                    Galeria de Ganhadores VIP
                </h3>
                <div className="space-y-3">
                    {recentWinners.map((winner) => (
                        <div key={winner.id} className="flex items-center justify-between p-2.5 rounded-xl bg-gray-50 border border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center text-gray-600 font-bold text-[10px]">
                                    {winner.name.charAt(0)}
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-gray-800">{winner.name}</p>
                                    <p className="text-[10px] text-gray-500">{winner.lottery} • {winner.time}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className="block text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded border border-green-100">
                                    {winner.amount}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VipClub;
