import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LotteriesList from './pages/LotteriesList';
import Sidebar from './components/Sidebar';
import NotificationPanel from './components/NotificationPanel';
import { Menu, Bell, HelpCircle, ArrowLeft } from 'lucide-react';
import { User, LotteryType, SavedBet, LotteryConfig } from './types';
import LotteryDetail from './pages/LotteryDetail';
import TurboSystem from './pages/TurboSystem';
import VipClub from './pages/VipClub';
import History from './pages/History';
import Autopilot from './pages/Autopilot';
import EconomyBet from './pages/EconomyBet';
import FinanceCourse from './pages/FinanceCourse';
import Help from './pages/Help';
import { ASSETS, LOTTERIES } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [currentLotteryId, setCurrentLotteryId] = useState<LotteryType | null>(null);
  const [history, setHistory] = useState<SavedBet[]>([]);
  
  // Estados para dados dinâmicos da API
  const [dynamicNotifications, setDynamicNotifications] = useState<any[]>([]);
  const [dynamicLotteries, setDynamicLotteries] = useState<Record<string, Partial<LotteryConfig>>>({});
  const [turboData, setTurboData] = useState<any>(null);

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('loto_user');
    if (savedUser) setUser(JSON.parse(savedUser));
    
    const savedHistory = localStorage.getItem('loto_history');
    if (savedHistory) {
        try { setHistory(JSON.parse(savedHistory)); } catch (e) { setHistory([]); }
    }

    const fetchAllDynamicData = async () => {
        try {
            // 1. Notificações
            fetch('api.php?endpoint=notifications')
                .then(r => r.ok ? r.json() : null)
                .then(data => data && setDynamicNotifications(data))
                .catch(() => {});
            
            // 2. Prêmios e Datas das Loterias
            fetch('api.php?endpoint=lotteries')
                .then(r => r.ok ? r.json() : null)
                .then(data => data && setDynamicLotteries(data))
                .catch(() => {});
            
            // 3. Sistema Turbo
            fetch('api.php?endpoint=turbo')
                .then(r => r.ok ? r.json() : null)
                .then(data => data && setTurboData(data))
                .catch(() => {});
            
        } catch (error) {
            console.log("Remote API integration error.");
        }
    };
    fetchAllDynamicData();
  }, []);

  useEffect(() => {
      if (scrollContainerRef.current) scrollContainerRef.current.scrollTo(0, 0);
  }, [currentPage, currentLotteryId]);

  const getLotteryConfig = (id: string): LotteryConfig => {
      const base = LOTTERIES[id];
      const dynamic = dynamicLotteries[id];
      if (!dynamic) return base;
      return { ...base, ...dynamic };
  };

  const handleLogin = (newUser: User) => setUser(newUser);
  const handleLogout = () => {
    localStorage.removeItem('loto_user');
    setUser(null);
  };

  const handleNavigate = (page: string, params?: any) => {
    setCurrentPage(page);
    if (page === 'lotteries' && params?.id) {
        setCurrentLotteryId(params.id);
    } else {
        setCurrentLotteryId(null);
    }
  };

  const handleSaveBet = (lotteryId: LotteryType, numbers: number[]) => {
    const newBet: SavedBet = {
        id: Date.now(),
        lotteryId,
        numbers,
        date: new Date().toLocaleDateString('pt-BR'),
        status: 'Aguardando',
        concurso: 'Próximo',
        source: 'manual'
    };
    setHistory(prev => {
        const updated = [newBet, ...prev];
        localStorage.setItem('loto_history', JSON.stringify(updated));
        return updated;
    });
  };

  const handleSaveBatchBets = (bets: { lotteryId: LotteryType; numbers: number[] }[]) => {
    const newBets: SavedBet[] = bets.map((bet, index) => ({
        id: Date.now() + index,
        lotteryId: bet.lotteryId,
        numbers: bet.numbers,
        date: new Date().toLocaleDateString('pt-BR'),
        status: 'Aguardando',
        concurso: 'Próximo',
        source: 'autopilot'
    }));
    setHistory(prev => {
        const updated = [...newBets, ...prev];
        localStorage.setItem('loto_history', JSON.stringify(updated));
        return updated;
    });
  };

  if (!user) return <Login onLogin={handleLogin} />;

  const renderContent = () => {
      switch(currentPage) {
          case 'dashboard': return <Dashboard user={user} onNavigate={handleNavigate} history={history} dynamicLotteries={dynamicLotteries} />;
          case 'lotteries':
              if (currentLotteryId) {
                  return (
                    <LotteryDetail 
                        lotteryId={currentLotteryId} 
                        dynamicConfig={getLotteryConfig(currentLotteryId)}
                        onBack={() => setCurrentLotteryId(null)} 
                        onSave={handleSaveBet} 
                    />
                  );
              }
              return <LotteriesList onNavigate={handleNavigate} dynamicLotteries={dynamicLotteries} />;
          case 'turbo': return <TurboSystem data={turboData} />;
          case 'autopilot': return <Autopilot onSaveBatch={handleSaveBatchBets} />;
          case 'economy': return <EconomyBet history={history} />;
          case 'finance-course': return <FinanceCourse />;
          case 'vip': return <VipClub />;
          case 'history': return <History history={history} onClear={() => setHistory([])} />;
          case 'help': return <Help />;
          default: return <Dashboard user={user} onNavigate={handleNavigate} history={history} dynamicLotteries={dynamicLotteries} />;
      }
  };

  return (
    <div className="flex min-h-screen bg-[#F5F7FA] font-sans text-gray-900 antialiased selection:bg-loto-primary/20">
        <Sidebar 
            isOpen={isSidebarOpen} 
            onClose={() => setIsSidebarOpen(false)}
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            user={user}
        />
        
        <NotificationPanel 
            isOpen={isNotificationsOpen}
            onClose={() => setIsNotificationsOpen(false)}
            dynamicNotifications={dynamicNotifications}
        />

        <div className="flex-1 flex flex-col h-[100dvh] overflow-hidden relative">
            <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-100 p-4 flex items-center justify-between z-30 lg:hidden h-[72px]">
                <div className="flex items-center gap-3">
                    <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                        <Menu size={24} />
                    </button>
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleNavigate('dashboard')}>
                        <img src={ASSETS.logo} alt="Loto APP" className="w-8 h-8 object-contain" />
                        <span className="font-bold text-loto-primary tracking-tight text-lg">Loto APP</span>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <button onClick={() => setIsNotificationsOpen(true)} className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600">
                        <Bell size={22} />
                        <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse shadow-sm"></span>
                    </button>
                    <button onClick={() => handleNavigate('help')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 text-gray-600">
                        <HelpCircle size={22} />
                    </button>
                </div>
            </header>

            <main ref={scrollContainerRef} className="flex-1 overflow-y-auto no-scrollbar pt-[72px] lg:pt-0 bg-[#F5F7FA]">
                <div className="max-w-3xl mx-auto w-full p-6 md:p-8 lg:p-10">
                    {currentPage !== 'dashboard' && !currentLotteryId && (
                        <button 
                            onClick={() => handleNavigate('dashboard')}
                            className="flex items-center gap-2 text-gray-400 hover:text-loto-primary font-bold mb-6 transition-all active:scale-95 group px-1"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm">Voltar ao Início</span>
                        </button>
                    )}
                    {renderContent()}
                </div>
            </main>
        </div>
    </div>
  );
};

export default App;
