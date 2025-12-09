import React from 'react';
import { X, MessageCircle, ExternalLink, Bell } from 'lucide-react';

interface NotificationPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

const NotificationPanel: React.FC<NotificationPanelProps> = ({ isOpen, onClose }) => {
    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-gray-900/20 z-[60] backdrop-blur-sm transition-opacity"
                    onClick={onClose}
                />
            )}

            {/* Panel */}
            <div className={`
                fixed top-0 right-0 h-full w-[320px] bg-white z-[70] shadow-2xl border-l border-gray-100 transform transition-transform duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)]
                ${isOpen ? 'translate-x-0' : 'translate-x-full'}
                flex flex-col
            `}>
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <div className="flex items-center gap-2 text-gray-900">
                        <Bell size={20} className="text-loto-primary" />
                        <h2 className="font-bold text-lg">Notificações</h2>
                    </div>
                    <button 
                        onClick={onClose}
                        className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Item de Notificação */}
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm relative group hover:border-loto-primary/30 transition-all">
                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-red-500"></div>
                        
                        <div className="flex items-start gap-3 mb-3">
                            <div className="p-2.5 bg-green-50 rounded-xl text-green-600 shrink-0">
                                <MessageCircle size={20} />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900 text-sm">Comunidade VIP</h3>
                                <span className="text-[10px] text-gray-400 font-medium">Agora mesmo</span>
                            </div>
                        </div>
                        
                        <p className="text-sm text-gray-600 leading-relaxed mb-3">
                            Novidades nos grupos de whatsapp e telegram, junte-se a comunidade!
                        </p>

                        <a 
                            href="https://chat.whatsapp.com/DBN9XdLnmYd2E08APFAS2P" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#25D366] px-4 py-2 rounded-xl hover:bg-[#20bd5a] transition-colors w-full justify-center shadow-sm shadow-green-500/20"
                        >
                            Entrar no Grupo
                            <ExternalLink size={14} />
                        </a>
                    </div>

                    <div className="text-center py-8">
                        <p className="text-xs text-gray-400">Você leu todas as notificações recentes.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotificationPanel;