
import { LotteryConfig } from './types';

export const LOTTERIES: Record<string, LotteryConfig> = {
  'mega-virada': {
    id: 'mega-virada',
    name: 'Mega da Virada',
    layout: 'simple',
    icon: 'V',
    color: '#FFD700',
    nextDraw: '31/12',
    prize: 'R$ 850.000.000',
    cost: 'R$ 6,00',
    numeros: { min: 1, max: 60, quantidade: 6 }
  },
  'mega-sena': {
    id: 'mega-sena',
    name: 'Mega-Sena',
    layout: 'simple',
    icon: 'M',
    color: '#00A859',
    nextDraw: 'Hoje',
    prize: 'R$ 20.000.000',
    cost: 'R$ 6,00',
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
    cost: 'R$ 3,50',
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
    cost: 'R$ 3,00',
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
    numeros: { min: 0, max: 99, quantidade: 50 }
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
    cost: 'R$ 3,00',
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
    cost: 'R$ 3,00',
    numeros: { colunas: 7, digitos: 10 }
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
  },
  'loteca': {
    id: 'loteca',
    name: 'Loteca',
    layout: 'soccer',
    icon: 'L',
    color: '#8B0000',
    nextDraw: '13/12/2025',
    prize: 'R$ 1.000.000',
    cost: 'R$ 4,00',
    numeros: { quantidade: 14 }
  }
};

export const ASSETS = {
  logo: 'https://i.ibb.co/tTFpcS2V/logo-lotoapp.webp',
  bgLogin: 'https://i.ibb.co/KxPHJSFg/TREVO-DE-QUATRO-FOLHAS-produtor-garden.webp',
  telegramBanner: 'https://i.ibb.co/k6s0QW88/telegram-banner-c-Qlyw-J9-V.jpg'
};
