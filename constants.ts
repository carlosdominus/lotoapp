import { LotteryConfig } from './types';

export const LOTTERIES: Record<string, LotteryConfig> = {
  'mega-sena': {
    id: 'mega-sena',
    name: 'Mega-Sena',
    layout: 'simple',
    icon: 'M',
    color: '#00A859',
    nextDraw: 'Hoje',
    prize: 'R$ 20.000.000',
    cost: 'R$ 5,00',
    numeros: { min: 1, max: 60, quantidade: 6 }
  },
  'lotofacil': {
    id: 'lotofacil',
    name: 'Lotofácil',
    layout: 'simple',
    icon: 'L',
    color: '#930089',
    nextDraw: 'Hoje',
    prize: 'R$ 1.800.000',
    cost: 'R$ 3,00',
    numeros: { min: 1, max: 25, quantidade: 15 }
  },
  'quina': {
    id: 'quina',
    name: 'Quina',
    layout: 'simple',
    icon: 'Q',
    color: '#260085',
    nextDraw: 'Hoje',
    prize: 'R$ 600.000',
    cost: 'R$ 2,50',
    numeros: { min: 1, max: 80, quantidade: 5 }
  },
  'lotomania': {
    id: 'lotomania',
    name: 'Lotomania',
    layout: 'simple',
    icon: 'L',
    color: '#F78100',
    nextDraw: 'Amanhã',
    prize: 'R$ 1.600.000',
    cost: 'R$ 3,00',
    numeros: { min: 0, max: 99, quantidade: 50 } // Ajuste técnico: UI mostra 00-99, mas lógica interna 0-99
  },
  'timemania': {
    id: 'timemania',
    name: 'Timemania',
    layout: 'simple',
    icon: 'T',
    color: '#00A859',
    nextDraw: 'Hoje',
    prize: 'R$ 61.000.000',
    cost: 'R$ 3,50',
    numeros: { min: 1, max: 80, quantidade: 10 }
  },
  'dupla-sena': {
    id: 'dupla-sena',
    name: 'Dupla Sena',
    layout: 'simple',
    icon: 'D',
    color: '#A61324',
    nextDraw: 'Amanhã',
    prize: 'R$ 2.400.000',
    cost: 'R$ 2,50',
    numeros: { min: 1, max: 50, quantidade: 6 }
  },
  'dia-de-sorte': {
    id: 'dia-de-sorte',
    name: 'Dia de Sorte',
    layout: 'simple',
    icon: 'D',
    color: '#CB8E00',
    nextDraw: 'Hoje',
    prize: 'R$ 400.000',
    cost: 'R$ 2,50',
    numeros: { min: 1, max: 31, quantidade: 7 }
  },
  'super-sete': {
    id: 'super-sete',
    name: 'Super Sete',
    layout: 'columns',
    icon: 'S',
    color: '#BFDB38',
    nextDraw: 'Amanhã',
    prize: 'R$ 300.000',
    cost: 'R$ 2,50',
    numeros: { colunas: 7, digitos: 10 } // 0-9
  },
  'federal': {
    id: 'federal',
    name: 'Federal',
    layout: 'ticket',
    icon: 'F',
    color: '#003D7C',
    nextDraw: 'Quarta',
    prize: 'R$ 500.000',
    cost: 'R$ 5,00'
  },
  'loteca': {
    id: 'loteca',
    name: 'Loteca',
    layout: 'soccer',
    icon: 'L',
    color: '#8B0000',
    nextDraw: '13/12/2025',
    prize: 'R$ 1.000.000',
    cost: 'R$ 3,00',
    numeros: { quantidade: 14 } // 14 jogos
  },
  'mais-milionaria': {
    id: 'mais-milionaria',
    name: '+Milionária',
    layout: 'double',
    icon: '+M',
    color: '#4B0082',
    nextDraw: 'Amanhã',
    prize: 'R$ 11.000.000',
    cost: 'R$ 6,00',
    numeros: {
      principais: { min: 1, max: 50, quantidade: 6 },
      trevos: { min: 1, max: 6, quantidade: 2 }
    }
  }
};

export const MOCK_HISTORY = [
  { id: 1, lotteryId: 'mega-sena', numbers: [3, 8, 15, 22, 45, 58], date: '05/01/2025', status: 'Aguardando', concurso: '2779' },
  { id: 2, lotteryId: 'lotofacil', numbers: [1, 2, 3, 5, 7, 9, 11, 13, 14, 15, 18, 20, 22, 24, 25], date: '03/01/2025', status: 'Premiado', hits: 11, concurso: '3245' },
];

export const ASSETS = {
  logo: 'https://i.ibb.co/tTFpcS2V/logo-lotoapp.webp',
  bgLogin: 'https://i.ibb.co/KxPHJSFg/TREVO-DE-QUATRO-FOLHAS-produtor-garden.webp',
  telegramBanner: 'https://i.ibb.co/k6s0QW88/telegram-banner-c-Qlyw-J9-V.jpg'
};