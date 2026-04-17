import { SEGMENT_LABELS, SEGMENT_COLORS } from '../lib/constants';
import type { SegmentStats, Segment } from '../lib/types';

interface Props {
  stats: SegmentStats[];
}

export default function FrequencyChart({ stats }: Props) {
  const maxExpected = Math.max(...stats.map(s => s.expected));
  const scale = 100 / (maxExpected * 1.2);

  return (
    <div className="bg-slate-800 rounded-xl p-4 my-6">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
        Actual vs Expected Frequency
      </h3>
      <div className="space-y-3">
        {stats.map(s => {
          const color = SEGMENT_COLORS[s.segment as Segment];
          const label = SEGMENT_LABELS[s.segment as Segment];
          const actualW = Math.min(s.frequency * scale * 100, 100);
          const expectedW = Math.min(s.expected * scale * 100, 100);
          return (
            <div key={s.segment}>
              <div className="flex justify-between text-xs text-slate-400 mb-1">
                <span className="font-semibold" style={{ color }}>{label}</span>
                <span>{(s.frequency * 100).toFixed(1)}% actual / {(s.expected * 100).toFixed(1)}% expected</span>
              </div>
              {/* Actual bar */}
              <div className="w-full bg-slate-700 rounded-full h-2 mb-1">
                <div
                  className="h-2 rounded-full transition-all"
                  style={{ width: `${actualW}%`, backgroundColor: color }}
                />
              </div>
              {/* Expected bar (outline) */}
              <div className="w-full bg-slate-700 rounded-full h-1">
                <div
                  className="h-1 rounded-full"
                  style={{ width: `${expectedW}%`, backgroundColor: `${color}55` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="text-xs text-slate-500 mt-4">
        Solid bar = actual frequency. Faded bar = theoretical expected.
      </p>
    </div>
  );
}
