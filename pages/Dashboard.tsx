
import React, { useState, useEffect } from 'react';
import { LOTTERIES } from '../constants';
import { ArrowRight, Star, Trophy, Zap, Bot, BookOpen, PlayCircle, X, Ticket, History as HistoryIcon, ShieldCheck, Inbox } from 'lucide-react';
import { SavedBet } from '../types';

interface DashboardProps {
    user: { name: string };
    onNavigate: (page: string, params?: any) => void;
    history: SavedBet[];
}

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

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate, history }) => {
    const recommended = { ...LOTTERIES['timemania'], prize: 'R$ 61 Milhões' };
    const [currentBanner, setCurrentBanner] = useState(0);
    const [showTutorialPopup, setShowTutorialPopup] = useState(false);
    const [showPersistentFAB, setShowPersistentFAB] = useState(false);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const hasSeenTutorial = localStorage.getItem('has_seen_tutorial_popup');
        if (!hasSeenTutorial) {
            const timer = setTimeout(() => {
                setShowTutorialPopup(true);
            }, 1500);
            return () => clearTimeout(timer);
        } else {
            setShowPersistentFAB(true);
        }
    }, []);

    const handleScrollToTutorial = () => {
        const element = document.getElementById('tutorial-video');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            localStorage.setItem('has_seen_tutorial_popup', 'true');
            setShowTutorialPopup(false);
            setShowPersistentFAB(true);
        }
    };

    const handleDismissTutorial = (e: React.MouseEvent) => {
        e.stopPropagation();
        localStorage.setItem('has_seen_tutorial_popup', 'true');
        setShowTutorialPopup(false);
        setShowPersistentFAB(true);
    };

    const lastGame = history.length > 0 ? history[0] : null;

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20 relative">
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Olá, {user.name.split(' ')[0]}! 👋</h1>
                <p className="text-gray-500 font-medium">Sua sorte está te esperando hoje.</p>
            </div>

            <div className="relative w-full rounded-3xl overflow-hidden shadow-lg shadow-blue-900/10 border border-gray-100 hover:shadow-xl transition-all group bg-gray-50">
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
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                        </a>
                    ))}
                </div>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {BANNERS.map((_, index) => (
                        <button
                            key={index}
                            onClick={(e) => { e.preventDefault(); setCurrentBanner(index); }}
                            className={`h-1.5 rounded-full transition-all duration-300 shadow-sm backdrop-blur-md ${
                                index === currentBanner ? 'bg-white w-6 opacity-100' : 'bg-white/40 w-1.5 hover:bg-white/60'
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* Loterias Section */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Trophy size={20} className="text-gray-400" />
                        Loterias
                    </h3>
                    <button onClick={() => onNavigate('lotteries')} className="text-sm font-semibold text-loto-primary hover:opacity-80">Ver todas ({Object.keys(LOTTERIES).length}) →</button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Object.values(LOTTERIES).slice(0, 4).map((lottery) => (
                        <button
                            key={lottery.id}
                            onClick={() => onNavigate('lotteries', { id: lottery.id })}
                            className="bg-white p-5 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 hover:border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all text-left group h-full flex flex-col justify-between min-h-[160px]"
                        >
                            <div className="w-12 h-12 rounded-2xl mb-4 flex items-center justify-center text-white font-bold shadow-md transform group-hover:scale-110 transition-transform" style={{ backgroundColor: lottery.color }}>
                                {lottery.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 group-hover:text-loto-primary transition-colors text-lg truncate">{lottery.name}</h4>
                                <p className="text-sm font-semibold text-green-600 mt-1">{lottery.prize}</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Sistema Turbo Section */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-amber-100 rounded-lg">
                            <Zap size={20} className="text-amber-600 fill-amber-600" />
                        </div>
                        <h2 className="text-lg font-bold text-gray-900">Sistema Turbo</h2>
                    </div>
                    <button onClick={() => onNavigate('turbo')} className="text-sm font-semibold text-loto-primary hover:opacity-80">Ir para Sistema Turbo →</button>
                </div>
                <div className="relative overflow-hidden rounded-[32px] bg-[#1b4d3e] text-white p-8 shadow-xl">
                    <h2 className="text-4xl font-bold mb-3 tracking-tight">{recommended.name}</h2>
                    <p className="text-loto-secondary text-2xl font-bold mb-6">{recommended.prize}</p>
                    <button 
                        onClick={() => onNavigate('lotteries', { id: recommended.id })}
                        className="w-full bg-white text-loto-primary font-bold py-4 rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                    >
                        VER COMBINAÇÃO <ArrowRight size={20} />
                    </button>
                </div>
            </div>

            {/* AUTOPILOTO PREVIEW */}
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100 overflow-hidden relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full translate-x-1/2 -translate-y-1/2 -z-0 opacity-50"></div>
                <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-blue-600 rounded-2xl text-white shadow-lg shadow-blue-600/20">
                                <Bot size={24} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-lg">Autopiloto de Ganhos</h3>
                                <p className="text-xs text-gray-500 font-medium">Análise 100% automatizada pela IA</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 mb-6">
                        <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-2 text-blue-600 mb-1">
                                <ShieldCheck size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Segurança</span>
                            </div>
                            <p className="text-xs text-gray-600 leading-snug">Gestão de banca otimizada para diminuir perdas.</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-2xl border border-gray-100">
                            <div className="flex items-center gap-2 text-blue-600 mb-1">
                                <Star size={14} />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Potencial</span>
                            </div>
                            <p className="text-xs text-gray-600 leading-snug">Foca nas loterias com maior chance de acerto.</p>
                        </div>
                    </div>

                    <button 
                        onClick={() => onNavigate('autopilot')}
                        className="w-full bg-blue-600 text-white font-bold py-3.5 rounded-2xl hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/10 active:scale-95"
                    >
                        CONFIGURAR AUTOPILOTO <ArrowRight size={18} />
                    </button>
                </div>
            </div>

            {/* HISTÓRICO PREVIEW */}
            <div className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-gray-100 rounded-xl text-gray-600">
                            <HistoryIcon size={20} />
                        </div>
                        <h3 className="font-bold text-gray-900">Seus Jogos Recentes</h3>
                    </div>
                    <button onClick={() => onNavigate('history')} className="text-xs font-bold text-loto-primary hover:opacity-80 uppercase tracking-wide">Ver histórico completo</button>
                </div>

                {lastGame ? (
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-gray-200 transition-all" onClick={() => onNavigate('history')}>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold shadow-sm" style={{ backgroundColor: LOTTERIES[lastGame.lotteryId]?.color || '#ccc' }}>
                                {LOTTERIES[lastGame.lotteryId]?.icon || 'L'}
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 text-sm">{LOTTERIES[lastGame.lotteryId]?.name}</h4>
                                <p className="text-[10px] text-gray-400 font-medium">{lastGame.date}</p>
                            </div>
                        </div>
                        <div className="flex gap-1">
                            {lastGame.numbers.slice(0, 5).map((n, i) => (
                                <span key={i} className="w-6 h-6 rounded-full bg-white border border-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-600 shadow-sm">
                                    {n}
                                </span>
                            ))}
                            {lastGame.numbers.length > 5 && <span className="text-[10px] text-gray-400 font-bold self-center ml-1">+{lastGame.numbers.length - 5}</span>}
                        </div>
                    </div>
                ) : (
                    <div className="py-6 flex flex-col items-center justify-center bg-gray-50/50 rounded-2xl border border-dashed border-gray-200">
                        <Inbox size={32} className="text-gray-200 mb-2" />
                        <p className="text-xs text-gray-400 font-medium">Nenhum jogo salvo ainda.</p>
                        <button onClick={() => onNavigate('lotteries')} className="text-[10px] font-bold text-loto-primary mt-2 uppercase">Gerar meu primeiro jogo</button>
                    </div>
                )}
            </div>

            {/* Tutorial Video Section */}
            <div id="tutorial-video" className="bg-white rounded-[32px] p-6 shadow-sm border border-gray-100">
                <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg mb-6">
                    <BookOpen size={22} className="text-blue-500" /> Como usar o App
                </h3>
                <div className="rounded-2xl overflow-hidden bg-gray-100 max-w-sm mx-auto">
                    <div style={{position: 'relative', paddingTop: '216.52777777777777%'}}>
                        <iframe 
                            src="https://player-vz-30ca375c-0dd.tv.pandavideo.com.br/embed/?v=35c91f8c-5ffa-41e4-a188-001ea8bac3e7" 
                            style={{border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} 
                            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" 
                            allowFullScreen={true}
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* Tutorial Popup - First Access Only */}
            {showTutorialPopup && (
                <div className="fixed bottom-6 left-6 z-40 animate-small-bounce">
                    <div 
                        onClick={handleScrollToTutorial}
                        className="bg-gray-900 text-white px-5 py-3 rounded-full shadow-2xl flex items-center gap-3 cursor-pointer hover:bg-gray-800 transition-all border border-gray-700/50"
                    >
                        <PlayCircle size={18} className="text-loto-secondary" />
                        <span className="font-bold text-sm pr-1">Aprenda a gerar jogos</span>
                        <button onClick={handleDismissTutorial} className="p-1 text-gray-500 hover:text-white rounded-full transition-colors">
                            <X size={14} />
                        </button>
                    </div>
                </div>
            )}

            {/* Persistent FAB - Appears after tutorial */}
            {showPersistentFAB && !showTutorialPopup && (
                <div className="fixed bottom-6 left-6 z-40 animate-small-bounce">
                    <button 
                        onClick={() => onNavigate('lotteries')}
                        className="bg-loto-primary text-white px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-3 hover:bg-loto-dark transition-all border border-white/10 active:scale-95"
                    >
                        <Ticket size={20} className="text-loto-secondary" />
                        <span className="font-bold text-sm">Pegar jogo pronto</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
