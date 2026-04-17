import { SEGMENTS, BASE_RATES } from './constants';
import type { Segment, SegmentStats, RawRow } from './types';

export function extractResults(rows: RawRow[]): string[] {
  return rows.map(r => String(r.result)).filter(Boolean);
}

export function computeStats(results: string[]): SegmentStats[] {
  const total = results.length;
  if (total === 0) return [];

  const recent50 = results.slice(-50);

  return SEGMENTS.map((seg: Segment): SegmentStats => {
    const count = results.filter(r => r === seg).length;
    const frequency = total > 0 ? count / total : 0;
    const expected = BASE_RATES[seg];
    const avgGap = expected > 0 ? 1 / expected : 9999;

    const lastSeen = (() => {
      for (let i = results.length - 1; i >= 0; i--) {
        if (results[i] === seg) return results.length - 1 - i;
      }
      return total;
    })();

    // Signal 1 — base rate weight (40 pts max)
    const s1 = expected * 40;

    // Signal 2 — gap boost: overdue segments score higher (30 pts max)
    const overdueFactor = lastSeen / avgGap;
    const s2 = Math.min(overdueFactor, 3) * 10;

    // Signal 3 — cold correction: below-expected segments score higher (20 pts max)
    const coldFactor = expected / (frequency || 0.001);
    const s3 = Math.min(coldFactor, 3) * 6.67;

    // Signal 4 — recent dampening: hot in last 50 rounds scores lower (subtract up to 10)
    const recentCount = recent50.filter(r => r === seg).length;
    const recentFreq = recent50.length > 0 ? recentCount / recent50.length : 0;
    const hotFactor = recentFreq / (expected || 0.001);
    const s4 = Math.min(hotFactor, 2) * 5;

    const rawScore = s1 + s2 + s3 - s4;
    const score = Math.max(0, Math.min(100, rawScore));

    return { segment: seg, count, frequency, expected, lastSeen, avgGap, score };
  }).sort((a, b) => b.score - a.score);
}

export function getSegmentStatus(stats: SegmentStats): 'OVERDUE' | 'COLD' | 'HOT' | 'NORMAL' {
  if (stats.lastSeen > stats.avgGap * 1.8) return 'OVERDUE';
  if (stats.frequency < stats.expected * 0.7) return 'COLD';
  if (stats.frequency > stats.expected * 1.3) return 'HOT';
  return 'NORMAL';
}
