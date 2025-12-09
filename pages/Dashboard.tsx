
import React, { useState, useEffect } from 'react';
import { LOTTERIES } from '../constants';
import { ArrowRight, Star, Trophy, TrendingUp, Zap, Bot, Sparkles, Inbox, BookOpen, PlayCircle, X } from 'lucide-react';
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

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate, history }) => {
    // Recommendation updated to Timemania as requested
    const recommended = { ...LOTTERIES['timemania'], prize: 'R$ 61 Milhões' };
    const [budget, setBudget] = useState<string>('');
    const [currentBanner, setCurrentBanner] = useState(0);
    const [showTutorialPopup, setShowTutorialPopup] = useState(false);

    // Helpers Autopiloto
    const budgetVal = Number(budget);
    const calculatedGames = Math.floor(budgetVal / 4.5);
    const calculatedLotteries = budgetVal >= 100 ? 5 : budgetVal >= 50 ? 4 : budgetVal >= 30 ? 3 : 2;

    const handleAutopilotStart = (val?: number) => {
        const finalBudget = val || budgetVal;
        if (!finalBudget || finalBudget < 10) return;
        
        localStorage.setItem('autopilot_start_budget', finalBudget.toString());
        onNavigate('autopilot');
    };

    // Auto-rotate banner
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentBanner((prev) => (prev + 1) % BANNERS.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    // Check for first access popup
    useEffect(() => {
        const hasSeenTutorial = localStorage.getItem('has_seen_tutorial_popup');
        if (!hasSeenTutorial) {
            // Delay slighty for better UX
            const timer = setTimeout(() => {
                setShowTutorialPopup(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleScrollToTutorial = () => {
        const element = document.getElementById('tutorial-video');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            localStorage.setItem('has_seen_tutorial_popup', 'true');
            setShowTutorialPopup(false);
        }
    };

    const handleDismissTutorial = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent triggering the scroll
        localStorage.setItem('has_seen_tutorial_popup', 'true');
        setShowTutorialPopup(false);
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20 relative">
            {/* 1. Header */}
            <div className="flex flex-col gap-1">
                <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Olá, {user.name.split(' ')[0]}! 👋</h1>
                <p className="text-gray-500 font-medium">Sua sorte está te esperando hoje.</p>
            </div>

            {/* 2. Banner Rotativo */}
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

            {/* 3. Grid of Lotteries (MOVED UP) */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                        <Trophy size={20} className="text-gray-400" />
                        Loterias
                    </h3>
                    <button onClick={() => onNavigate('lotteries')} className="text-sm font-semibold text-loto-primary hover:opacity-80">Ver todas (11) →</button>
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
                <button 
                    onClick={() => onNavigate('lotteries')}
                    className="w-full mt-4 bg-gray-50 text-gray-600 font-bold py-3 rounded-2xl hover:bg-gray-100 transition-all text-sm"
                >
                    Ver todas as loterias
                </button>
            </div>

            {/* 4. Recommendation of the Day (Was System Turbo) */}
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

                <div className="relative overflow-hidden rounded-[32px] bg-[#1b4d3e] text-white shadow-[0_20px_40px_-10px_rgba(27,77,62,0.4)] transition-transform hover:scale-[1.01] duration-300">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-40 h-40 bg-loto-secondary/20 rounded-full translate-y-1/3 -translate-x-1/4 blur-2xl"></div>
                    
                    <div className="relative p-8 flex flex-col items-start">
                        <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 border border-white/10 shadow-sm mb-6">
                            <Star size={12} className="text-yellow-400 fill-yellow-400" />
                            OPORTUNIDADE ALTA
                        </span>

                        <div className="mb-6">
                            <p className="text-sm text-gray-300 uppercase tracking-widest font-semibold mb-2">Prêmio Estimado</p>
                            <p className="text-3xl md:text-5xl font-bold text-loto-secondary drop-shadow-sm tracking-tight whitespace-nowrap">{recommended.prize}</p>
                        </div>
                        
                        <h2 className="text-4xl font-bold mb-3 tracking-tight">{recommended.name}</h2>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="flex text-yellow-400 gap-0.5">
                                <Star size={18} fill="currentColor" />
                                <Star size={18} fill="currentColor" />
                                <Star size={18} fill="currentColor" />
                                <Star size={18} fill="currentColor" />
                                <Star size={18} fill="currentColor" className="opacity-40" />
                            </div>
                            <span className="text-sm font-bold bg-white/10 px-2 py-0.5 rounded text-white">9.8/10</span>
                        </div>

                        <button 
                            onClick={() => onNavigate('lotteries', { id: recommended.id })}
                            className="w-full bg-white text-loto-primary font-bold py-4 rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2 shadow-lg"
                        >
                            VER COMBINAÇÃO
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>
            </div>

            {/* 5. Autopiloto Widget */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[32px] p-6 border border-blue-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                    <Bot size={120} />
                </div>
                
                <div className="flex items-center justify-between mb-6 relative z-10">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 bg-blue-100 rounded-lg">
                            <Bot size={20} className="text-blue-600" />
                        </div>
                        <h2 className="text-lg font-bold text-blue-900">Autopiloto de Ganhos</h2>
                    </div>
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">Premium</span>
                </div>

                <div className="space-y-4 relative z-10">
                    <div>
                        <p className="text-sm text-blue-800 font-medium mb-3">Defina seu orçamento semanal:</p>
                        <div className="flex gap-2 mb-3">
                            {[30, 50, 100].map(val => (
                                <button 
                                    key={val}
                                    onClick={() => { setBudget(val.toString()); handleAutopilotStart(val); }}
                                    className="flex-1 bg-white text-blue-600 font-bold py-2 rounded-xl border border-blue-100 hover:bg-blue-600 hover:text-white transition-all text-sm shadow-sm"
                                >
                                    R$ {val}
                                </button>
                            ))}
                        </div>
                        <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">R$</span>
                            <input 
                                type="number" 
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                placeholder="Outro valor..."
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-blue-200 bg-white text-gray-900 font-bold focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-gray-400 shadow-sm"
                            />
                        </div>
                    </div>

                    {budgetVal > 0 && (
                        <div className="bg-white p-4 rounded-2xl border border-blue-100 shadow-sm">
                            <div className="flex items-center gap-2 text-sm text-blue-900 font-bold mb-2">
                                <Sparkles size={16} className="text-yellow-500" />
                                Previsão de Entrega:
                            </div>
                            <ul className="text-xs text-gray-700 space-y-1 ml-6 list-disc font-medium">
                                <li><b>{calculatedGames} jogos</b> otimizados</li>
                                <li>Distribuídos em <b>{calculatedLotteries} loterias</b></li>
                                <li>Probabilidade Turbo aplicada</li>
                            </ul>
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-3">
                        <button 
                            onClick={() => handleAutopilotStart()}
                            disabled={!budgetVal || budgetVal < 10}
                            className="bg-blue-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            <Zap size={18} fill="currentColor" />
                            GERAR
                        </button>
                        <button 
                            onClick={() => onNavigate('autopilot')}
                            className="bg-white text-blue-600 font-bold py-3 rounded-xl border border-blue-100 hover:bg-blue-50 transition-all"
                        >
                            Ver detalhes
                        </button>
                    </div>
                </div>
            </div>

            {/* 6. Recent Results / History */}
            <div className="bg-white rounded-[32px] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
                        <TrendingUp size={22} className="text-gray-400" />
                        Histórico Recente
                    </h3>
                    <button onClick={() => onNavigate('history')} className="text-sm font-semibold text-loto-primary hover:opacity-80">Ver tudo →</button>
                </div>
                
                {history.length > 0 ? (
                    <div className="space-y-4">
                        {/* Display only last 3 items */}
                        {history.slice(0, 3).map((game) => (
                            <div key={game.id} onClick={() => onNavigate('history')} className="group hover:bg-gray-50 p-4 rounded-2xl transition-colors -mx-4 cursor-pointer border border-transparent hover:border-gray-100">
                                <div className="flex justify-between mb-3 items-center">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: LOTTERIES[game.lotteryId]?.color || '#999' }}></div>
                                        <span className="font-bold text-gray-800">{LOTTERIES[game.lotteryId]?.name}</span>
                                    </div>
                                    <span className={`text-xs font-bold px-2 py-1 rounded-full ${game.status === 'Premiado' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                                        {game.status}
                                    </span>
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {game.numbers.map((n: number) => (
                                        <span key={n} className="w-8 h-8 bg-gray-100 group-hover:bg-white group-hover:shadow-sm rounded-full flex items-center justify-center text-xs font-bold text-gray-700 border border-transparent group-hover:border-gray-200 transition-all">
                                            {n}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                        <div className="p-3 bg-white rounded-full shadow-sm mb-3">
                            <Inbox size={24} className="text-gray-300" />
                        </div>
                        <p className="text-gray-400 font-medium text-sm">você não gerou jogos recentemente</p>
                    </div>
                )}
            </div>

            {/* 7. Tutorial Video */}
            <div id="tutorial-video" className="bg-white rounded-[32px] p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
                        <BookOpen size={22} className="text-blue-500" />
                        Como usar o App
                    </h3>
                </div>
                
                <div className="rounded-2xl overflow-hidden bg-gray-100 shadow-inner max-w-sm mx-auto">
                    <div style={{position: 'relative', paddingTop: '216.52777777777777%'}}>
                        <iframe 
                            id="panda-35c91f8c-5ffa-41e4-a188-001ea8bac3e7-dash" 
                            src="https://player-vz-30ca375c-0dd.tv.pandavideo.com.br/embed/?v=35c91f8c-5ffa-41e4-a188-001ea8bac3e7" 
                            style={{border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} 
                            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" 
                            allowFullScreen={true}
                            // @ts-ignore
                            fetchPriority="high"
                        ></iframe>
                    </div>
                </div>
            </div>

            {/* Tutorial Popup - First Access Only */}
            {showTutorialPopup && (
                <div className="fixed bottom-4 left-4 z-40 animate-bounce">
                    <div 
                        onClick={handleScrollToTutorial}
                        className="bg-gray-900 text-white px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition-all border border-gray-700/50"
                    >
                        <PlayCircle size={16} className="text-loto-secondary" />
                        <span className="font-bold text-xs pr-1">Aprenda a gerar jogos</span>
                        <button 
                            onClick={handleDismissTutorial}
                            className="p-1 text-gray-500 hover:text-white rounded-full hover:bg-white/10 transition-colors"
                        >
                            <X size={12} />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
