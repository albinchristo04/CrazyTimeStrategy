import { useState } from 'react';
import { STAKE_LINK } from '../lib/constants';

type Risk = 'low' | 'medium' | 'high';

const RISK_CONFIG: Record<Risk, { pct: number; label: string; strategy: string; color: string }> = {
  low:    { pct: 0.01, label: 'Low Risk',    strategy: 'Conservative', color: '#22c55e' },
  medium: { pct: 0.02, label: 'Medium Risk', strategy: 'Balanced',     color: '#f59e0b' },
  high:   { pct: 0.05, label: 'High Risk',   strategy: 'Aggressive',   color: '#ef4444' },
};

export default function BankrollCalculator() {
  const [bankroll, setBankroll] = useState('');
  const [risk, setRisk] = useState<Risk>('medium');

  const amount = parseFloat(bankroll) || 0;
  const config = RISK_CONFIG[risk];
  const betSize = amount * config.pct;
  const sessions = amount > 0 ? Math.floor(1 / config.pct) : 0;

  return (
    <div className="bg-slate-800 rounded-xl p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-1 mt-0">Bankroll Calculator</h2>
      <p className="text-slate-400 text-sm mb-6">Enter your session bankroll to get recommended bet sizes.</p>

      <label className="block text-sm font-medium text-slate-300 mb-1">
        Session Bankroll ($)
      </label>
      <input
        type="number"
        min="0"
        value={bankroll}
        onChange={e => setBankroll(e.target.value)}
        placeholder="e.g. 500"
        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-2.5 text-slate-100 placeholder-slate-500 mb-6 focus:outline-none focus:border-amber-500"
      />

      <label className="block text-sm font-medium text-slate-300 mb-2">
        Risk Level
      </label>
      <div className="grid grid-cols-3 gap-2 mb-6">
        {(Object.keys(RISK_CONFIG) as Risk[]).map(r => (
          <button
            key={r}
            onClick={() => setRisk(r)}
            className={`py-2 rounded-lg text-sm font-semibold border transition ${
              risk === r
                ? 'border-amber-500 bg-amber-500/10 text-amber-400'
                : 'border-slate-600 text-slate-400 hover:border-slate-500'
            }`}
          >
            {RISK_CONFIG[r].label}
          </button>
        ))}
      </div>

      {amount > 0 ? (
        <div className="bg-slate-700/50 rounded-xl p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">Strategy</span>
            <span className="font-bold" style={{ color: config.color }}>{config.strategy}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">Recommended Bet</span>
            <span className="text-xl font-bold text-slate-100">${betSize.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">Bet % of Bankroll</span>
            <span className="font-semibold text-slate-200">{(config.pct * 100)}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-sm">Max Bets Before Bust</span>
            <span className="font-semibold text-slate-200">~{sessions}</span>
          </div>
          <div className="pt-3 border-t border-slate-600">
            <p className="text-xs text-slate-500">
              Stop-loss recommendation: stop after losing {risk === 'low' ? '30%' : risk === 'medium' ? '40%' : '50%'} of your bankroll
              (${(amount * (risk === 'low' ? 0.3 : risk === 'medium' ? 0.4 : 0.5)).toFixed(2)}).
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-slate-700/30 rounded-xl p-6 text-center text-slate-500 text-sm">
          Enter a bankroll amount to see your recommendation.
        </div>
      )}

      <a
        href={STAKE_LINK}
        target="_blank"
        rel="noopener sponsored"
        className="mt-6 flex items-center justify-center w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 rounded-xl transition"
      >
        Play Crazy Time on Stake →
      </a>
    </div>
  );
}
