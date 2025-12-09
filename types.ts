export type LotteryType = 
  | 'mega-sena' 
  | 'lotofacil' 
  | 'quina' 
  | 'lotomania' 
  | 'timemania' 
  | 'dupla-sena' 
  | 'dia-de-sorte' 
  | 'super-sete' 
  | 'federal' 
  | 'loteca' 
  | 'mais-milionaria';

export interface User {
  name: string;
  email: string;
}

export interface LotteryConfig {
  id: LotteryType;
  name: string;
  layout: 'simple' | 'double' | 'columns' | 'ticket' | 'soccer';
  color: string;
  nextDraw: string;
  prize: string;
  icon: string;
  cost: string;
  
  // Configurações numéricas específicas
  numeros?: {
    min?: number;
    max?: number;
    quantidade?: number; // Para grids simples
    
    // Para +Milionária
    principais?: { min: number; max: number; quantidade: number };
    trevos?: { min: number; max: number; quantidade: number };
    
    // Para Super Sete
    colunas?: number;
    digitos?: number;
  };
}

export interface SavedBet {
  id: number;
  lotteryId: LotteryType;
  numbers: number[]; // Para Loteca: 1=Col1, 0=Meio, 2=Col2
  date: string;
  concurso?: string;
  status: 'Aguardando' | 'Premiado' | 'Não Premiado';
  hits?: number;
  source?: 'manual' | 'autopilot';
}

export interface AnalysisResult {
  hot: number[];
  cold: number[];
  oddEvenRatio: string;
}

export interface GeneratedCombination {
  numbers: number[];
  reasoning: string;
  patterns: string[];
}