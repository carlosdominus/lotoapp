
import React from 'react';
import { BookOpen, MessageCircle, HelpCircle } from 'lucide-react';

const Help: React.FC = () => {
    return (
        <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-2 flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <BookOpen size={24} className="text-blue-600" />
                    </div>
                    Como usar o App
                </h1>
                <p className="text-gray-500">Assista o tutorial abaixo para dominar todas as ferramentas.</p>
            </div>

            {/* Video Container */}
            <div className="bg-white rounded-[32px] p-4 md:p-6 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden max-w-sm mx-auto">
                <div style={{position: 'relative', paddingTop: '216.4814814814815%'}} className="rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
                    <iframe 
                        id="panda-4f5af67d-2118-4ee1-b758-ef5d49b55327" 
                        src="https://player-vz-30ca375c-0dd.tv.pandavideo.com.br/embed/?v=4f5af67d-2118-4ee1-b758-ef5d49b55327" 
                        style={{border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} 
                        allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" 
                        allowFullScreen={true}
                        // @ts-ignore
                        fetchPriority="high"
                    ></iframe>
                </div>
            </div>

            {/* Support Section */}
            <div className="bg-orange-50 rounded-[32px] p-6 border border-orange-100 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                <div className="p-4 bg-white rounded-full shadow-sm text-orange-500 shrink-0">
                    <HelpCircle size={32} />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Ainda com dúvidas?</h3>
                    <p className="text-gray-600 mb-4 font-medium">
                        Nos chame no <span className="font-bold text-orange-600 bg-orange-100 px-1 rounded">círculo laranja</span> para suporte ou se preferir no nosso WhatsApp.
                    </p>
                    <a 
                        href="https://wa.me/15557934518" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold hover:bg-[#20bd5a] transition-colors shadow-lg shadow-green-500/20 active:scale-95"
                    >
                        <MessageCircle size={20} />
                        Chamar no WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Help;
