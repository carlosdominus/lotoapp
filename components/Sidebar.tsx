
import React from 'react';
import { Home, Ticket, Zap, Crown, History, X, LogOut, Bot, BookOpen, Calculator } from 'lucide-react';
import { ASSETS } from '../constants';
import { User } from '../types';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    currentPage: string;
    onNavigate: (page: string) => void;
    onLogout: () => void;
    user: User | null;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, currentPage, onNavigate, onLogout, user }) => {
    const menuItems = [
        { id: 'dashboard', label: 'Início', icon: Home },
        { id: 'help', label: 'Como usar o App', icon: BookOpen },
        { id: 'lotteries', label: 'Loterias', icon: Ticket },
        { id: 'turbo', label: 'Sistema Turbo', icon: Zap },
        { id: 'autopilot', label: 'Autopiloto', icon: Bot },
        { id: 'economy', label: 'Aposta Econômica', icon: Calculator },
        { id: 'vip', label: 'Clube VIP', icon: Crown },
        { id: 'history', label: 'Histórico', icon: History },
    ];

    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-gray-900/20 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed top-0 left-0 h-full w-[280px] bg-white z-50 shadow-2xl lg:shadow-none lg:border-r border-gray-200/60 transform transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 lg:static flex flex-col
            `}>
                <div className="p-8 pb-4 flex justify-between items-center shrink-0">
                    <div 
                        className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity"
                        onClick={() => {
                            onNavigate('dashboard');
                            if (window.innerWidth < 1024) onClose();
                        }}
                    >
                         <img 
                            src={ASSETS.logo} 
                            alt="Loto APP" 
                            className="w-10 h-10 object-contain drop-shadow-sm"
                         />
                         <div className="flex flex-col">
                             <span className="font-bold text-lg text-gray-900 leading-none">LOTO APP</span>
                             <span className="text-[10px] text-gray-400 font-medium tracking-wide mt-1">PREMIUM EDITION</span>
                         </div>
                    </div>
                    <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-gray-800 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* User Profile Card */}
                {user && (
                    <div className="px-4 mb-2 shrink-0">
                        <button 
                            onClick={() => {
                                onNavigate('history');
                                if (window.innerWidth < 1024) onClose();
                            }}
                            className="w-full bg-gray-50 hover:bg-gray-100 border border-gray-100 p-3 rounded-2xl flex items-center gap-3 transition-all text-left group"
                        >
                            <div className="w-10 h-10 rounded-full bg-loto-primary text-white flex items-center justify-center font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
                                {user.name.charAt(0)}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-gray-900 truncate">{user.name}</p>
                                <p className="text-[10px] text-gray-500 truncate font-medium">{user.email}</p>
                            </div>
                        </button>
                    </div>
                )}

                <nav className="px-4 space-y-1.5 mt-2 flex-1 overflow-y-auto no-scrollbar">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                onNavigate(item.id);
                                if (window.innerWidth < 1024) onClose();
                            }}
                            className={`
                                w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-200 group
                                ${currentPage === item.id 
                                    ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/10' 
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
                            `}
                        >
                            <item.icon 
                                size={20} 
                                strokeWidth={currentPage === item.id ? 2.5 : 2}
                                className={currentPage === item.id ? 'text-loto-secondary' : 'group-hover:text-gray-700'} 
                            />
                            <span className={`font-medium ${currentPage === item.id ? 'font-semibold' : ''}`}>{item.label}</span>
                        </button>
                    ))}
                </nav>

                <div className="p-4 shrink-0">
                    <button 
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-3.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 mb-2"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Sair da conta</span>
                    </button>
                    
                    <div className="px-4 pt-2 border-t border-gray-100">
                        <p className="text-[10px] text-gray-400 font-medium">Versão 1.0.2</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
