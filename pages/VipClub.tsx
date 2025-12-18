
import React, { useState, useEffect } from 'react';
import { Crown, Copy, ShieldCheck, Trophy } from 'lucide-react';
import { ASSETS } from '../constants';

const BANNERS = [
    {
        id: 1,
        image: 'https://i.ibb.co/Z1WMBnzw/banner-whats-vertical-1-1.webp',
        link: 'https://chat.whatsapp.com/FrMfiOjv0bz8AFRUgfcvSb',
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

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const vipSignals = [
        { id: 1, lottery: 'Mega-Sena', numbers: '05 12 18 27 33 49', method: 'Quadrantes + Ciclo', time: 'Há 2 horas' },
        { id: 2, lottery: 'Lotofácil', numbers: '01 02 04 06 08 10 12 14 16 18 20 22 23 24 25', method: 'Fechamento Matemático', time: 'Há 4 horas' },
        { id: 3, lottery: 'Quina', numbers: '03 15 28 45 72', method: 'Números Quentes', time: 'Ontem' },
    ];

    const recentWinners = [
        { id: 1, name: 'Roberto S.', amount: 'R$ 14.250,00', lottery: 'Quina', time: 'Há 25 min' },
        { id: 2, name: 'Ana Clara M.', amount: 'R$ 2.800,00', lottery: 'Lotofácil', time: 'Há 1 hora' },
    ];

    return (
        <div className="space-y-4 animate-in fade-in duration-500 pb-12">
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
                    <ShieldCheck size={14} /> Membro Ativo
                </div>
            </div>

            <div className="relative w-full rounded-3xl overflow-hidden shadow-lg shadow-blue-900/10 border border-gray-100 group bg-gray-50">
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
                            <img src={banner.image} alt={banner.alt} className="w-full h-auto block" />
                        </a>
                    ))}
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {BANNERS.map((_, index) => (
                        <button key={index} className={`h-1.5 rounded-full transition-all duration-300 ${index === currentBanner ? 'bg-white w-6' : 'bg-white/40 w-1.5'}`} />
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-bold text-base text-gray-900 mb-3 px-1 flex items-center gap-2">
                    <Crown size={18} className="text-yellow-500" /> Sinais VIP do Dia
                </h3>
                <div className="grid gap-3">
                    {vipSignals.map((signal) => (
                        <div key={signal.id} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                            <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] font-bold text-loto-primary uppercase bg-loto-primary/10 px-2 py-0.5 rounded">{signal.lottery}</span>
                                <button className="text-gray-400"><Copy size={16} /></button>
                            </div>
                            <h4 className="font-mono text-gray-800 font-medium text-sm">{signal.numbers}</h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VipClub;