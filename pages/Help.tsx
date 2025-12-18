
import React from 'react';
import { BookOpen, HelpCircle, ShieldCheck } from 'lucide-react';

const Help: React.FC = () => {
    return (
        <div className="space-y-10 animate-in fade-in duration-500 pb-20">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight mb-2 flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                        <BookOpen size={24} className="text-blue-600" />
                    </div>
                    Centro de Aprendizado
                </h1>
                <p className="text-gray-500">Tudo o que você precisa saber para extrair o máximo do Loto APP.</p>
            </div>

            {/* Tutorial 1 */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm">1</div>
                    <h2 className="text-xl font-bold text-gray-900">Como usar o App</h2>
                </div>
                <div className="bg-white rounded-[32px] p-4 md:p-6 shadow-sm border border-gray-100 overflow-hidden max-w-md mx-auto">
                    <div style={{position: 'relative', paddingTop: '216.52777777777777%'}} className="rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
                        <iframe 
                            src="https://player-vz-30ca375c-0dd.tv.pandavideo.com.br/embed/?v=35c91f8c-5ffa-41e4-a188-001ea8bac3e7" 
                            style={{border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} 
                            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" 
                            allowFullScreen={true}
                        ></iframe>
                    </div>
                </div>
            </section>

            {/* Tutorial 2 */}
            <section className="space-y-4">
                <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-sm">2</div>
                    <h2 className="text-xl font-bold text-gray-900">Como apostar online e por quê</h2>
                </div>
                <div className="bg-white rounded-[32px] p-4 md:p-6 shadow-sm border border-gray-100 overflow-hidden max-w-md mx-auto">
                    <div style={{position: 'relative', paddingTop: '216.52777777777777%'}} className="rounded-2xl overflow-hidden bg-gray-100 shadow-inner">
                        <iframe 
                            id="panda-47d3ce57-d53a-4f2b-933e-d03c042d142d" 
                            src="https://player-vz-30ca375c-0dd.tv.pandavideo.com.br/embed/?v=47d3ce57-d53a-4f2b-933e-d03c042d142d" 
                            style={{border: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}} 
                            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture" 
                            allowFullScreen={true} 
                            width="100%" 
                            height="100%" 
                            // @ts-ignore
                            fetchpriority="high"
                        ></iframe>
                    </div>
                    <div className="mt-6 space-y-3">
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-3">
                            <ShieldCheck className="text-green-600 shrink-0" size={20} />
                            <div>
                                <p className="font-bold text-sm text-gray-900">Segurança Total</p>
                                <p className="text-xs text-gray-500">Evite filas e guarde seus recibos digitalmente de forma segura.</p>
                            </div>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-start gap-3">
                            <HelpCircle className="text-blue-600 shrink-0" size={20} />
                            <div>
                                <p className="font-bold text-sm text-gray-900">Praticidade</p>
                                <p className="text-xs text-gray-500">Aposte de onde estiver, 24 horas por dia, direto pelo celular.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Help;
