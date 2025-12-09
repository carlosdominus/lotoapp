import React, { useState, useEffect, useRef } from 'react';
import { LotteryType } from '../types';
import { LOTTERIES } from '../constants';
import { generateCombination, analyzeTrend } from '../services/geminiService';
import { ArrowLeft, Sparkles, Brain, Copy, Loader2, BarChart2, CheckCircle2, Repeat } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, Tooltip, CartesianGrid } from 'recharts';

interface LotteryDetailProps {
    lotteryId: LotteryType;
    onBack: () => void;
    onSave: (lotteryId: LotteryType, numbers: number[]) => void;
}

const LotteryDetail: React.FC<LotteryDetailProps> = ({ lotteryId, onBack, onSave }) => {
    const config = LOTTERIES[lotteryId];
    const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
    const justificationRef = useRef<HTMLDivElement>(null);
    
    const [activeTab, setActiveTab] = useState<'analysis' | 'generator'>('analysis');
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedData, setGeneratedData] = useState<any>(null);
    const [trendAnalysis, setTrendAnalysis] = useState<string>('');
    const [loadingAnalysis, setLoadingAnalysis] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [autoSavedMessage, setAutoSavedMessage] = useState(false);

    // Mock stats
    const [hotNumbers, setHotNumbers] = useState<number[]>([]);
    const [coldNumbers, setColdNumbers] = useState<number[]>([]);
    const [repeatedNumbers, setRepeatedNumbers] = useState<number[]>([]);
    const [frequencyData, setFrequencyData] = useState<{name: string, value: number}[]>([]);

    useEffect(() => {
        const init = async () => {
            setLoadingAnalysis(true);
            const trend = await analyzeTrend(lotteryId);
            setTrendAnalysis(trend);
            
            if (config.layout === 'simple' || config.layout === 'double') {
                const max = config.numeros?.max || 50;
                const min = config.numeros?.min || 1;
                const pool = Array.from({length: max - min + 1}, (_, i) => i + min);
                
                const shuffled = [...pool].sort(() => Math.random() - 0.5);
                setHotNumbers(shuffled.slice(0, 8));
                setColdNumbers(shuffled.slice(8, 16));
                setRepeatedNumbers(shuffled.slice(16, 20).sort((a,b) => a - b));

                const ranges = 5;
                const step = Math.ceil((max - min + 1) / ranges);
                const freq = [];
                for(let i=0; i<ranges; i++) {
                    const start = min + (i * step);
                    const end = Math.min(max, start + step - 1);
                    freq.push({
                        name: `${start}-${end}`,
                        value: Math.floor(Math.random() * 50) + 20
                    });
                }
                setFrequencyData(freq);
            }
            
            setLoadingAnalysis(false);
            setSelectedNumbers([]);
            setGeneratedData(null);
            setIsSaved(false);
            setAutoSavedMessage(false);
        };
        init();
    }, [lotteryId]);

    // Scroll to justification when generated
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

    const handleSuperSeteClick = (colIndex: number, digit: number) => {
        const current = selectedNumbers.length === 7 ? [...selectedNumbers] : Array(7).fill(-1);
        current[colIndex] = digit;
        setSelectedNumbers(current);
    };

    const handleLotecaClick = (gameIndex: number, choice: number) => {
        const current = selectedNumbers.length === 14 ? [...selectedNumbers] : Array(14).fill(-1);
        current[gameIndex] = choice;
        setSelectedNumbers(current);
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

            // AUTO-SAVE LOGIC
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
        if (config.layout === 'double') {
             toSave = selectedNumbers.map(n => Math.abs(n));
        }
        
        // Copiar para área de transferência
        const textToCopy = `${config.name}: ${toSave.join(', ')}`;
        navigator.clipboard.writeText(textToCopy);
        
        onSave(lotteryId, toSave);
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
        if (config.layout === 'columns') return selectedNumbers.length === 7 && !selectedNumbers.includes(-1);
        if (config.layout === 'soccer') return selectedNumbers.length === 14 && !selectedNumbers.includes(-1);
        return false;
    };

    const countOdds = () => {
        if (config.layout === 'double') return selectedNumbers.filter(n => n > 0 && n % 2 !== 0).length;
        if (config.layout === 'simple') return selectedNumbers.filter(n => n % 2 !== 0).length;
        return 0;
    };
    const countEvens = () => {
        if (config.layout === 'double') return selectedNumbers.filter(n => n > 0 && n % 2 === 0).length;
        if (config.layout === 'simple') return selectedNumbers.filter(n => n % 2 === 0).length;
        return 0;
    };

    const renderSimpleGrid = () => {
        const { min, max } = config.numeros!;
        const range = Array.from({ length: max! - min! + 1 }, (_, i) => i + min!);
        return (
            <div className="grid grid-cols-5 gap-3">
                {range.map(num => (
                    <button
                        key={num}
                        onClick={() => handleNumberClick(num)}
                        className={`
                            h-12 rounded-2xl font-bold text-sm transition-all duration-300
                            ${selectedNumbers.includes(num) 
                                ? 'bg-loto-primary text-white shadow-lg shadow-loto-primary/30 transform scale-105' 
                                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}
                        `}
                    >
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
                            <button
                                key={num}
                                onClick={() => handleNumberClick(num, 'main')}
                                className={`h-10 rounded-xl font-bold text-xs transition-all ${selectedNumbers.includes(num) ? 'bg-loto-primary text-white' : 'bg-gray-50 text-gray-600'}`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-gray-800 mb-3 text-sm">Trevos (1-6)</h4>
                    <div className="flex gap-3">
                        {trevoRange.map(num => (
                            <button
                                key={num}
                                onClick={() => handleNumberClick(num, 'trevo')}
                                className={`w-12 h-12 rounded-xl font-bold text-sm transition-all flex items-center justify-center ${selectedNumbers.includes(-num) ? 'bg-purple-600 text-white shadow-lg' : 'bg-purple-50 text-purple-800 border border-purple-100'}`}
                            >
                                🍀 {num}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const renderSuperSete = () => {
        const cols = Array.from({ length: 7 }, (_, i) => i);
        const digits = Array.from({ length: 10 }, (_, i) => i);
        return (
            <div className="overflow-x-auto pb-4">
                <div className="flex gap-4 min-w-max">
                    {cols.map(col => (
                        <div key={col} className="flex flex-col gap-2">
                            <span className="text-xs font-bold text-center text-gray-400 uppercase">Col {col+1}</span>
                            {digits.map(digit => (
                                <button
                                    key={digit}
                                    onClick={() => handleSuperSeteClick(col, digit)}
                                    className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${selectedNumbers[col] === digit ? 'bg-loto-primary text-white' : 'bg-gray-50 text-gray-600'}`}
                                >
                                    {digit}
                                </button>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    const renderLoteca = () => {
        const games = Array.from({ length: 14 }, (_, i) => i + 1);
        return (
            <div className="space-y-2">
                {games.map((game, i) => (
                    <div key={game} className="flex items-center justify-between bg-gray-50 p-2 rounded-xl">
                        <span className="text-xs font-bold text-gray-400 w-6">#{game}</span>
                        <div className="flex gap-2">
                            {[1, 0, 2].map(choice => (
                                <button
                                    key={choice}
                                    onClick={() => handleLotecaClick(i, choice)}
                                    className={`w-12 h-8 rounded-lg font-bold text-xs transition-all ${selectedNumbers[i] === choice ? 'bg-loto-primary text-white' : 'bg-white text-gray-600 border border-gray-200'}`}
                                >
                                    {choice === 0 ? 'X' : choice}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="pb-24 animate-in slide-in-from-right-10 duration-500">
             {/* Header */}
             <div className="bg-white/80 backdrop-blur-xl -mx-6 -mt-6 -mx-6 md:-mt-8 lg:-mt-10 px-6 py-4 border-b border-gray-100 flex items-center gap-4 mb-6 sticky top-0 z-20 shadow-sm">
                <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                    <ArrowLeft size={24} className="text-gray-600" />
                </button>
                <div>
                    <h1 className="text-xl font-bold text-gray-900">{config.name}</h1>
                    <p className="text-xs text-gray-500 font-medium">{config.prize} • {config.nextDraw}</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex p-1 gap-2 bg-gray-100 rounded-2xl mb-8">
                <button 
                    onClick={() => setActiveTab('analysis')}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'analysis' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <Brain size={18} />
                    Inteligência
                </button>
                <button 
                    onClick={() => setActiveTab('generator')}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'generator' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
                >
                    <Sparkles size={18} />
                    Gerador
                </button>
            </div>

            {activeTab === 'analysis' ? (
                <div className="space-y-6">
                    {/* Trend Analysis */}
                    <div className="bg-white p-6 rounded-3xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                            <Sparkles size={20} className="text-purple-500" />
                            Tendências da Semana
                        </h3>
                        {loadingAnalysis ? (
                            <div className="space-y-3 animate-pulse">
                                <div className="h-4 bg-gray-100 rounded w-full"></div>
                                <div className="h-4 bg-gray-100 rounded w-5/6"></div>
                                <div className="h-4 bg-gray-100 rounded w-4/6"></div>
                            </div>
                        ) : (
                            <p className="text-sm text-gray-600 leading-relaxed font-medium">
                                {trendAnalysis}
                            </p>
                        )}
                    </div>

                    {(config.layout === 'simple' || config.layout === 'double') && (
                        <>
                            {/* Hot/Cold Numbers */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-green-50 p-5 rounded-3xl border border-green-100">
                                    <h4 className="text-green-800 font-bold text-sm mb-3 flex items-center gap-2">
                                        <span>🔥</span> Quentes
                                    </h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {hotNumbers.map(n => (
                                            <span key={n} className="bg-white text-green-700 text-xs font-bold w-7 h-7 rounded-lg shadow-sm flex items-center justify-center">{n}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-blue-50 p-5 rounded-3xl border border-blue-100">
                                    <h4 className="text-blue-800 font-bold text-sm mb-3 flex items-center gap-2">
                                        <span>❄️</span> Atrasados
                                    </h4>
                                    <div className="flex flex-wrap gap-1.5">
                                        {coldNumbers.map(n => (
                                            <span key={n} className="bg-white text-blue-700 text-xs font-bold w-7 h-7 rounded-lg shadow-sm flex items-center justify-center">{n}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Repetidas do Anterior */}
                            <div className="bg-amber-50 p-5 rounded-3xl border border-amber-100">
                                <h4 className="text-amber-800 font-bold text-sm mb-3 flex items-center gap-2">
                                    <Repeat size={16} />
                                    Repetidas do Anterior
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {repeatedNumbers.map(n => (
                                        <span key={n} className="bg-white text-amber-700 text-sm font-bold w-8 h-8 rounded-lg shadow-sm flex items-center justify-center border border-amber-100">{n}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Gráfico de Frequência */}
                            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <BarChart2 size={20} className="text-gray-400" />
                                    Frequência por Dezena
                                </h3>
                                <div className="h-64 w-full">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={frequencyData}>
                                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                            <XAxis dataKey="name" tick={{fontSize: 10}} />
                                            <Tooltip />
                                            <Bar dataKey="value" fill={config.color} radius={[4, 4, 0, 0]} />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            ) : (
                <div className="space-y-6">
                    {/* Generator Statistics Panel */}
                    {(config.layout === 'simple' || config.layout === 'double') && (
                        <div className="grid grid-cols-3 gap-3">
                            <div className="bg-gray-900 text-white p-3 rounded-2xl text-center">
                                <p className="text-[10px] uppercase font-bold text-gray-400">Selecionados</p>
                                <p className="text-lg font-bold">
                                    {config.layout === 'double' 
                                        ? `${selectedNumbers.filter(n=>n>0).length}/6` 
                                        : `${selectedNumbers.length}/${config.numeros?.quantidade}`}
                                </p>
                            </div>
                            <div className="bg-white border border-gray-200 p-3 rounded-2xl text-center">
                                <p className="text-[10px] uppercase font-bold text-gray-400">Ímpares</p>
                                <p className="text-lg font-bold text-gray-800">{countOdds()}</p>
                            </div>
                            <div className="bg-white border border-gray-200 p-3 rounded-2xl text-center">
                                <p className="text-[10px] uppercase font-bold text-gray-400">Pares</p>
                                <p className="text-lg font-bold text-gray-800">{countEvens()}</p>
                            </div>
                        </div>
                    )}

                    <div className="bg-white p-6 rounded-[32px] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] border border-gray-100">
                        {config.layout === 'simple' && renderSimpleGrid()}
                        {config.layout === 'double' && renderDoubleGrid()}
                        {config.layout === 'columns' && renderSuperSete()}
                        {config.layout === 'soccer' && renderLoteca()}
                        {config.layout === 'ticket' && (
                            <div className="text-center py-8">
                                <p className="text-gray-500 font-medium mb-4">A Federal utiliza bilhetes prontos.</p>
                                <div className="text-4xl font-bold text-loto-primary tracking-widest bg-gray-50 p-4 rounded-2xl inline-block">
                                    {generatedData ? generatedData.numbers[0].toString().padStart(5, '0') : '00000'}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* AI Justification Display - MOVED HERE for better visibility */}
                    <div ref={justificationRef} className="scroll-mt-32">
                        {generatedData && generatedData.justificativa && (
                            <div className="mb-6 bg-green-50 p-5 rounded-3xl border border-green-100 animate-in slide-in-from-bottom-5 fade-in shadow-sm">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-green-100 rounded-full text-green-600 shrink-0">
                                        <Sparkles size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-green-800 mb-1">Análise da IA</h4>
                                        <p className="text-sm text-green-900 font-medium leading-relaxed">{generatedData.justificativa}</p>
                                        <p className="text-[10px] text-green-600 font-bold mt-2 uppercase tracking-wide">
                                            Probabilidade Calculada: {generatedData.probabilidade}/10
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="fixed bottom-0 left-0 w-full p-6 bg-white border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] lg:static lg:shadow-none lg:border-0 lg:p-0 lg:bg-transparent z-40">
                         {/* Auto-Save Notification */}
                         {autoSavedMessage && (
                             <div className="mb-4 bg-blue-50 text-blue-700 px-4 py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-2 animate-bounce">
                                 <CheckCircle2 size={14} /> Jogo salvo automaticamente!
                             </div>
                         )}

                         <div className="flex gap-4">
                            {((isSelectionComplete() || config.layout === 'ticket')) && (
                                <button 
                                    onClick={handleSave}
                                    className={`p-4 rounded-2xl transition-all ${isSaved ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:scale-95'}`}
                                >
                                    {isSaved ? <CheckCircle2 size={24} /> : <Copy size={24} />}
                                </button>
                            )}
                            <button 
                                onClick={handleGenerate}
                                disabled={isGenerating}
                                className="flex-1 bg-loto-primary text-white py-4 rounded-2xl font-bold shadow-xl shadow-loto-primary/30 hover:bg-[#153e31] active:scale-95 transition-all flex items-center justify-center gap-3"
                            >
                                {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles />}
                                GERAR COM IA
                            </button>
                         </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LotteryDetail;