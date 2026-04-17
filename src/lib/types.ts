export type Segment =
  | '1' | '2' | '5' | '10'
  | 'CoinFlip' | 'CashHunt' | 'Pachinko' | 'CrazyTime';

export interface SegmentStats {
  segment: Segment;
  count: number;
  frequency: number;
  expected: number;
  lastSeen: number;
  avgGap: number;
  score: number;
}

export interface RawRow {
  result: string;
  [key: string]: unknown;
}

export interface PredictorResponse {
  updated_at: string;
  rows: RawRow[];
  count: number;
}
