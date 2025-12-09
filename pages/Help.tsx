
import React from 'react';
import { BookOpen } from 'lucide-react';

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
        </div>
    );
};

export default Help;