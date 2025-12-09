import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import LotteriesList from './pages/LotteriesList';
import Sidebar from './components/Sidebar';
import NotificationPanel from './components/NotificationPanel';
import { Menu, Bell, HelpCircle } from 'lucide-react';
import { User, LotteryType, SavedBet } from './types';
import LotteryDetail from './pages/LotteryDetail';
import TurboSystem from './pages/TurboSystem';
import VipClub from './pages/VipClub';
import History from './pages/History';
import Autopilot from './pages/Autopilot';
import Help from './pages/Help';
import { ASSETS } from './constants';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [currentLotteryId, setCurrentLotteryId] = useState<LotteryType | null>(null);
  const [history, setHistory] = useState<SavedBet[]>([]);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('loto_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    const savedHistory = localStorage.getItem('loto_history');
    if (savedHistory) {
        try {
            setHistory(JSON.parse(savedHistory));
        } catch (e) {
            console.error("Error parsing history", e);
            setHistory([]);
        }
    }
  }, []);

  useEffect(() => {
      if (scrollContainerRef.current) {
          scrollContainerRef.current.scrollTo(0, 0);
      }
  }, [currentPage, currentLotteryId]);

  const handleLogin = (newUser: User) => {
    setUser(newUser);
  };

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
    
    // Usar functional update para garantir estado fresco
    setHistory(prevHistory => {
        const updated = [newBet, ...prevHistory];
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
    
    setHistory(prevHistory => {
        const updated = [...newBets, ...prevHistory];
        localStorage.setItem('loto_history', JSON.stringify(updated));
        return updated;
    });
  };

  const handleClearHistory = () => {
      setHistory([]);
      localStorage.removeItem('loto_history');
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
      switch(currentPage) {
          case 'dashboard':
              return <Dashboard user={user} onNavigate={handleNavigate} history={history} />;
          case 'lotteries':
              if (currentLotteryId) {
                  return <LotteryDetail 
                    lotteryId={currentLotteryId} 
                    onBack={() => setCurrentLotteryId(null)} 
                    onSave={handleSaveBet}
                  />;
              }
              return <LotteriesList onNavigate={handleNavigate} />;
          case 'turbo':
              return <TurboSystem />;
          case 'autopilot':
              return <Autopilot onSaveBatch={handleSaveBatchBets} />;
          case 'vip':
              return <VipClub />;
          case 'history':
              return <History history={history} onClear={handleClearHistory} />;
          case 'help':
              return <Help />;
          default:
              return <Dashboard user={user} onNavigate={handleNavigate} history={history} />;
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
        />

        {/* 
            Changed h-screen to h-[100dvh] for better mobile support.
            Header is now fixed on mobile, and main has top padding.
        */}
        <div className="flex-1 flex flex-col h-[100dvh] overflow-hidden relative">
            <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-gray-100 p-4 flex items-center justify-between z-30 lg:hidden h-[72px]">
                <div className="flex items-center gap-3">
                    <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors">
                        <Menu size={24} />
                    </button>
                    
                    <div 
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => handleNavigate('dashboard')}
                    >
                        <img src={ASSETS.logo} alt="Loto APP" className="w-8 h-8 object-contain" />
                        <span className="font-bold text-loto-primary tracking-tight text-lg hidden min-[360px]:inline">Loto APP</span>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => setIsNotificationsOpen(true)}
                        className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600"
                    >
                        <Bell size={22} />
                        <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                    </button>

                    <button 
                        onClick={() => handleNavigate('help')}
                        className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-600"
                    >
                        <HelpCircle size={22} />
                    </button>

                    <button 
                        onClick={() => setIsSidebarOpen(true)}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 shadow-sm active:scale-95 transition-transform"
                    >
                        {user.name.charAt(0)}
                    </button>
                </div>
            </header>

            {/* Added pt-[72px] for mobile to account for fixed header */}
            <main ref={scrollContainerRef} className="flex-1 overflow-y-auto no-scrollbar scroll-smooth pt-[72px] lg:pt-0">
                <div className="max-w-3xl mx-auto w-full p-6 md:p-8 lg:p-10">
                    {renderContent()}
                </div>
            </main>
        </div>
    </div>
  );
};

export default App;