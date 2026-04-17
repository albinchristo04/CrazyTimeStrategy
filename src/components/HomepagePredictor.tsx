import { useState, useEffect } from 'react';
import { extractResults, computeStats } from '../lib/prediction';
import { SEGMENT_LABELS, SEGMENT_COLORS } from '../lib/constants';
import type { PredictorResponse, SegmentStats, Segment } from '../lib/types';
import ResultBadge from './ResultBadge';

export default function HomepagePredictor() {
  const [lastFive, setLastFive] = useState<string[]>([]);
  const [topPick, setTopPick] = useState<SegmentStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/results')
      .then(r => r.json())
      .then((data: PredictorResponse) => {
        if (data.error) throw new Error();
        const results = extractResults(data.rows);
        setLastFive(results.slice(-5).reverse());
        const stats = computeStats(results);
        if (stats.length > 0) setTopPick(stats[0]);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-slate-800 rounded-xl p-4 flex items-center gap-3 text-slate-500">
        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
        </svg>
        <span className="text-sm">Loading live data...</span>
      </div>
    );
  }

  if (error || lastFive.length === 0) {
    return (
      <a
        href="/crazy-time-predictor"
        className="block bg-slate-800 border border-amber-500/30 rounded-xl p-4 hover:border-amber-500/60 transition"
      >
        <p className="text-sm text-slate-400 m-0">
          See live Crazy Time stats and pattern analysis →
        </p>
      </a>
    );
  }

  return (
    <a
      href="/crazy-time-predictor"
      className="block bg-slate-800 border border-slate-700 hover:border-amber-500/40 rounded-xl p-4 transition group"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Last 5 Results</span>
        <span className="text-xs text-amber-400 group-hover:text-amber-300 transition">View full tracker →</span>
      </div>

      <div className="flex gap-1.5 mb-3">
        {lastFive.map((r, i) => (
          <ResultBadge key={i} segment={r} small />
        ))}
      </div>

      {topPick && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-slate-700">
          <span className="text-xs text-slate-500">Top prediction:</span>
          <span
            className="text-sm font-bold px-2 py-0.5 rounded-full text-slate-900"
            style={{ backgroundColor: SEGMENT_COLORS[topPick.segment as Segment] }}
          >
            {SEGMENT_LABELS[topPick.segment as Segment]}
          </span>
          <span className="text-xs text-slate-500">Score: {topPick.score.toFixed(0)}/100</span>
        </div>
      )}
    </a>
  );
}
