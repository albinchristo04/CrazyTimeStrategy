import { useState, useCallback } from 'react';
import { computeStats, extractResults } from '../lib/prediction';
import type { SegmentStats, PredictorResponse } from '../lib/types';
import PredictionGrid from './PredictionGrid';
import FrequencyChart from './FrequencyChart';
import GapTable from './GapTable';
import ManualInput from './ManualInput';
import ResultBadge from './ResultBadge';
import { STAKE_LINK } from '../lib/constants';

export default function Predictor() {
  const [results, setResults] = useState<string[]>([]);
  const [stats, setStats] = useState<SegmentStats[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [totalFetched, setTotalFetched] = useState(0);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/results');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: PredictorResponse = await res.json();
      if (data.error) throw new Error(data.error as string);
      const fetched = extractResults(data.rows);
      setResults(fetched);
      setStats(computeStats(fetched));
      setLastUpdated(new Date(data.updated_at).toLocaleTimeString());
      setTotalFetched(fetched.length);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch results');
    } finally {
      setLoading(false);
    }
  }, []);

  const handleManualAdd = useCallback((added: string[]) => {
    setResults(prev => {
      const merged = [...prev, ...added];
      setStats(computeStats(merged));
      return merged;
    });
  }, []);

  const hasData = stats.length > 0;

  return (
    <div className="w-full">
      {/* Header row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h2 className="text-xl font-bold text-slate-100 m-0">Live Result Tracker</h2>
          {lastUpdated && (
            <p className="text-xs text-slate-500 m-0">
              Updated {lastUpdated} · {totalFetched} results loaded
            </p>
          )}
        </div>
        <button
          onClick={refresh}
          disabled={loading}
          className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-900 font-bold px-6 py-2.5 rounded-lg transition flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Loading...
            </>
          ) : (
            '↻ Refresh Results'
          )}
        </button>
      </div>

      {error && (
        <div className="bg-red-900/30 border border-red-500/40 rounded-lg p-3 mb-4 text-red-300 text-sm">
          {error}
        </div>
      )}

      {!hasData && !loading && !error && (
        <div className="text-center py-16 text-slate-500">
          <p className="text-lg mb-2">No data loaded yet.</p>
          <p className="text-sm">Click "Refresh Results" to fetch live Crazy Time data, or use Manual Entry below.</p>
        </div>
      )}

      {hasData && (
        <>
          {/* Last 10 results ribbon */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            <span className="text-xs text-slate-500 self-center">Last 10:</span>
            {results.slice(-10).reverse().map((r, i) => (
              <ResultBadge key={i} segment={r} small />
            ))}
          </div>

          <PredictionGrid stats={stats} />

          {/* Stake CTA after prediction grid — highest-intent moment */}
          <a
            href={STAKE_LINK}
            target="_blank"
            rel="noopener sponsored"
            className="flex items-center justify-center gap-2 w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-6 rounded-xl transition my-4 text-center"
          >
            Play on Stake now — Live Crazy Time tables open →
          </a>

          <FrequencyChart stats={stats} />
          <GapTable stats={stats} />
        </>
      )}

      <ManualInput onAdd={handleManualAdd} />

      <p className="text-xs text-slate-500 mt-6 p-4 bg-slate-800/50 rounded-lg">
        <strong className="text-slate-400">Disclaimer:</strong> This tool analyses historical pattern data for educational purposes.
        Live casino RNG outcomes are statistically independent — no result is guaranteed. Play responsibly.
      </p>
    </div>
  );
}
