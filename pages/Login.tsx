import React, { useState } from 'react';
import { User, Mail, Loader2 } from 'lucide-react';
import { ASSETS } from '../constants';

interface LoginProps {
    onLogin: (user: { name: string; email: string }) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!name || !email) {
            setError('Preencha todos os campos');
            setLoading(false);
            return;
        }

        try {
            await fetch('https://nen.auto-jornada.space/webhook/criar-conta', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email }),
            });
            localStorage.setItem('loto_user', JSON.stringify({ name, email }));
            onLogin({ name, email });
            
        } catch (err) {
            console.error(err);
            localStorage.setItem('loto_user', JSON.stringify({ name, email }));
            onLogin({ name, email });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen relative flex items-center justify-center p-6 bg-[#F5F7FA]">
            {/* Background Image Area - now just a top accent */}
            <div 
                className="absolute top-0 left-0 w-full h-[45vh] bg-cover bg-center rounded-b-[60px] overflow-hidden"
                style={{ backgroundImage: `url(${ASSETS.bgLogin})` }}
            >
                <div className="absolute inset-0 bg-[#1b4d3e]/90 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#F5F7FA]"></div>
            </div>

            <div className="relative z-10 w-full max-w-[400px] bg-white p-8 md:p-10 rounded-[40px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white">
                <div className="flex flex-col items-center mb-8">
                    <img 
                        src={ASSETS.logo} 
                        alt="Loto App Logo" 
                        className="w-20 h-20 mb-2 object-contain drop-shadow-sm hover:scale-105 transition-transform"
                    />
                    <h1 className="text-2xl font-bold text-[#1b4d3e] mb-4 tracking-tight">Loto APP</h1>
                    
                    <h2 className="text-xl font-bold text-gray-900 tracking-tight">Bem-vindo</h2>
                    <p className="text-gray-500 text-sm mt-1">Entre para começar a ganhar</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-wide">Nome Completo</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-loto-primary transition-colors" size={20} />
                            <input 
                                type="text" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-gray-50 text-gray-900 border border-gray-100 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-loto-primary/20 focus:border-loto-primary outline-none transition-all placeholder:text-gray-400 font-medium"
                                placeholder="Seu nome"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-xs font-bold text-gray-500 ml-1 uppercase tracking-wide">Email</label>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-3.5 text-gray-400 group-focus-within:text-loto-primary transition-colors" size={20} />
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-gray-50 text-gray-900 border border-gray-100 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-2 focus:ring-loto-primary/20 focus:border-loto-primary outline-none transition-all placeholder:text-gray-400 font-medium"
                                placeholder="seu@email.com"
                            />
                        </div>
                    </div>

                    {error && <p className="text-red-500 text-sm text-center font-medium bg-red-50 py-2 rounded-lg">{error}</p>}

                    <button 
                        type="submit" 
                        disabled={loading}
                        className="w-full bg-[#1b4d3e] hover:bg-[#153e31] text-white font-bold py-4 rounded-2xl shadow-xl shadow-[#1b4d3e]/20 hover:shadow-[#1b4d3e]/30 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 mt-4"
                    >
                        {loading ? <Loader2 className="animate-spin" /> : 'ENTRAR'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;