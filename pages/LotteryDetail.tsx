
import React, { useState, useEffect, useRef } from 'react';
import { LotteryType, LotteryConfig } from '../types';
import { LOTTERIES } from '../constants';
import { generateCombination, analyzeTrend } from '../services/geminiService';
import { ArrowLeft, Sparkles, Brain, Copy, Loader2, CheckCircle2 } from 'lucide-react';

interface LotteryDetailProps {
    lotteryId: LotteryType;
    dynamicConfig?: LotteryConfig; // Recebe a config já mesclada
    onBack: () => void;
    onSave: (lotteryId: LotteryType, numbers: number[]) => void;
}

const LotteryDetail: React.FC<LotteryDetailProps> = ({ lotteryId, dynamicConfig, onBack, onSave }) => {
    // Usa a config dinâmica se disponível, senão a estática
    const config = dynamicConfig || LOTTERIES[lotteryId];
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
    const justificationRef = useRef<HTMLDivElement>(null);
    
    const [activeTab, setActiveTab] = useState<'analysis' | 'generator'>('generator');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedData, setGeneratedData] = useState<any>(null);
    const [trendAnalysis, setTrendAnalysis] = useState<string>('');
    const [loadingAnalysis, setLoadingAnalysis] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [autoSavedMessage, setAutoSavedMessage] = useState(false);

    useEffect(() => {
        const init = async () => {
            setLoadingAnalysis(true);
            const trend = await analyzeTrend(lotteryId);
            setTrendAnalysis(trend);
            setLoadingAnalysis(false);
            setSelectedNumbers([]);
            setGeneratedData(null);
            setIsSaved(false);
            setAutoSavedMessage(false);
        };
        init();
    }, [lotteryId]);

    useEffect(() => {
        if (generatedData && justificationRef.current) {
            setTimeout(() => {
                justificationRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }, 100);
        }
    }, [generatedData]);

    const handleNumberClick = (num: number, section?: 'main' | 'trevo' | 'col') => {
        setIsSaved(false);
        setAutoSavedMessage(false);
        
        if (config.layout === 'simple') {
            const maxSelect = config.numeros?.quantidade || 0;
            if (selectedNumbers.includes(num)) {
                setSelectedNumbers(prev => prev.filter(n => n !== num));
            } else if (selectedNumbers.length < maxSelect) {
                setSelectedNumbers(prev => [...prev, num].sort((a,b) => a-b));
            }
        } 
        else if (config.layout === 'double') {
             if (section === 'main') {
                 const main = selectedNumbers.filter(n => n > 0);
                 const trevos = selectedNumbers.filter(n => n < 0);
                 if (main.includes(num)) {
                     setSelectedNumbers([...main.filter(n => n !== num), ...trevos]);
                 } else if (main.length < (config.numeros?.principais?.quantidade || 6)) {
                     setSelectedNumbers([...main, num, ...trevos]);
                 }
             } else if (section === 'trevo') {
                 const val = -num;
                 const main = selectedNumbers.filter(n => n > 0);
                 const trevos = selectedNumbers.filter(n => n < 0);
                 if (trevos.includes(val)) {
                     setSelectedNumbers([...main, ...trevos.filter(n => n !== val)]);
                 } else if (trevos.length < (config.numeros?.trevos?.quantidade || 2)) {
                     setSelectedNumbers([...main, ...trevos, val]);
                 }
             }
        }
    };

    const handleGenerate = async () => {
        setIsGenerating(true);
        setIsSaved(false);
        setAutoSavedMessage(false);
        const result = await generateCombination(lotteryId);
        
        if (result) {
            setGeneratedData(result);
            let finalNumbers: number[] = [];
            if (config.layout === 'double') {
                const nums = result.numbers.slice(0, 6);
                const trevos = result.numbers.slice(6).map((n: number) => -n);
                finalNumbers = [...nums, ...trevos];
            } else {
                finalNumbers = result.numbers;
            }
            setSelectedNumbers(finalNumbers);

            let toSave = [...finalNumbers];
            if (config.layout === 'double') {
                toSave = finalNumbers.map(n => Math.abs(n));
            }
            onSave(lotteryId, toSave);
            setAutoSavedMessage(true);
            setTimeout(() => setAutoSavedMessage(false), 5000);
        }
        setIsGenerating(false);
    };

    const handleSave = () => {
        let toSave = [...selectedNumbers];
        if (config.layout === 'double') toSave = selectedNumbers.map(n => Math.abs(n));
        const textToCopy = `${config.name}: ${toSave.join(', ')}`;
        navigator.clipboard.writeText(textToCopy);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    const isSelectionComplete = () => {
        if (config.layout === 'simple') return selectedNumbers.length === config.numeros?.quantidade;
        if (config.layout === 'double') {
            const main = selectedNumbers.filter(n => n > 0).length;
            const trevo = selectedNumbers.filter(n => n < 0).length;
            return main === 6 && trevo === 2;
        }
        return false;
    };

    const renderSimpleGrid = () => {
        const { min, max } = config.numeros!;
        const range = Array.from({ length: max! - min! + 1 }, (_, i) => i + min!);
        return (
            <div className="grid grid-cols-5 gap-3">
                {range.map(num => (
                    <button key={num} onClick={() => handleNumberClick(num)} className={`h-12 rounded-2xl font-bold text-sm transition-all ${selectedNumbers.includes(num) ? 'bg-loto-primary text-white shadow-lg transform scale-105' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}>
                        {num.toString().padStart(2, '0')}
                    </button>
                ))}
            </div>
        );
    };

    const renderDoubleGrid = () => {
        const mainRange = Array.from({ length: 50 }, (_, i) => i + 1);
        const trevoRange = Array.from({ length: 6 }, (_, i) => i + 1);
        return (
            <div className="space-y-6">
                <div>
                    <h4 className="font-bold text-gray-800 mb-3 text-sm">Números (1-50)</h4>
                    <div className="grid grid-cols-5 gap-2">
                        {mainRange.map(num => (
                            <button key={num} onClick={() => handleNumberClick(num, 'main')} className={`h-10 rounded-xl font-bold text-xs transition-all ${selectedNumbers.includes(num) ? 'bg-loto-primary text-white' : 'bg-gray-50 text-gray-600'}`}>{num}</button>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-gray-800 mb-3 text-sm">Trevos (1-6)</h4>
                    <div className="flex gap-3">
                        {trevoRange.map(num => (
                            <button key={num} onClick={() => handleNumberClick(num, 'trevo')} className={`w-12 h-12 rounded-xl font-bold text-sm transition-all flex items-center justify-center ${selectedNumbers.includes(-num) ? 'bg-purple-600 text-white shadow-lg' : 'bg-purple-50 text-purple-800 border border-purple-100'}`}>🍀 {num}</button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="pb-24 animate-in slide-in-from-right-10 duration-500">
             <div className="bg-white/80 backdrop-blur-xl -mx-6 -mt-6 -mx-6 md:-mt-8 lg:-mt-10 px-6 py-4 border-b border-gray-100 flex items-center gap-4 mb-6 sticky top-0 z-20 shadow-sm">
                <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={24} className="text-gray-600" />
                </button>
                <div>
                    <h1 className="text-xl font-bold text-gray-900">{config.name}</h1>
                    <p className="text-xs text-gray-500 font-medium">{config.prize} • {config.nextDraw}</p>
                </div>
            </div>

            <div className="flex p-1 gap-2 bg-gray-100 rounded-2xl mb-8">
                <button onClick={() => setActiveTab('generator')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'generator' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                    <Sparkles size={18} /> Gerador
                </button>
                <button onClick={() => setActiveTab('analysis')} className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'analysis' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}>
                    <Brain size={18} /> Inteligência
                </button>
            </div>

            {activeTab === 'analysis' ? (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-3xl border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Sparkles size={20} className="text-purple-500" /> Tendências
                        </h3>
                        {loadingAnalysis ? (
                            <div className="flex justify-center py-4"><Loader2 className="animate-spin text-gray-300" /></div>
                        ) : (
                            <p className="text-sm text-gray-600 font-medium">{trendAnalysis}</p>
                        )}
                    </div>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="bg-white p-6 rounded-[32px] border border-gray-100">
                        {config.layout === 'simple' && renderSimpleGrid()}
                        {config.layout === 'double' && renderDoubleGrid()}
                    </div>
                    <div ref={justificationRef} className="scroll-mt-32">
                        {generatedData && generatedData.justificativa && (
                            <div className="bg-green-50 p-5 rounded-3xl border border-green-100 animate-in slide-in-from-bottom-5">
                                <h4 className="text-sm font-bold text-green-800 mb-1">Análise da IA</h4>
                                <p className="text-sm text-green-900 font-medium">{generatedData.justificativa}</p>
                            </div>
                        )}
                    </div>
                    <div className="fixed bottom-0 left-0 w-full p-6 bg-white border-t border-gray-100 lg:static lg:bg-transparent lg:border-0 z-40">
                         <div className="flex gap-4">
                            {(isSelectionComplete() || config.layout === 'ticket') && (
                                <button onClick={handleSave} className={`p-4 rounded-2xl transition-all ${isSaved ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-900'}`}>
                                    {isSaved ? <CheckCircle2 size={24} /> : <Copy size={24} />}
                                </button>
                            )}
                            <button onClick={handleGenerate} disabled={isGenerating} className="flex-1 bg-loto-primary text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3">
                                {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles />} GERAR COM IA
                            </button>
                         </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LotteryDetail;
