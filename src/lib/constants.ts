import type { Segment } from './types';

export const SEGMENTS: Segment[] = [
  '1', '2', '5', '10',
  'CoinFlip', 'CashHunt', 'Pachinko', 'CrazyTime',
];

// Theoretical wheel probabilities — Evolution Gaming published RTP tables
export const BASE_RATES: Record<Segment, number> = {
  '1':         0.4444,
  '2':         0.2222,
  '5':         0.1111,
  '10':        0.0741,
  'CoinFlip':  0.0370,
  'CashHunt':  0.0370,
  'Pachinko':  0.0370,
  'CrazyTime': 0.0185,
};

export const SEGMENT_LABELS: Record<Segment, string> = {
  '1':         '1',
  '2':         '2',
  '5':         '5',
  '10':        '10',
  'CoinFlip':  'Coin Flip',
  'CashHunt':  'Cash Hunt',
  'Pachinko':  'Pachinko',
  'CrazyTime': 'Crazy Time',
};

export const SEGMENT_COLORS: Record<Segment, string> = {
  '1':         '#3b82f6',
  '2':         '#22c55e',
  '5':         '#f59e0b',
  '10':        '#ef4444',
  'CoinFlip':  '#8b5cf6',
  'CashHunt':  '#ec4899',
  'Pachinko':  '#14b8a6',
  'CrazyTime': '#f97316',
};

export const STAKE_LINK = 'https://stake.ac/?c=4GH1nePX';
