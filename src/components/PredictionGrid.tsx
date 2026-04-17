import { SEGMENT_LABELS, SEGMENT_COLORS } from '../lib/constants';
import { getSegmentStatus } from '../lib/prediction';
import type { SegmentStats, Segment } from '../lib/types';

const STATUS_STYLES: Record<string, string> = {
  OVERDUE: 'bg-red-500/20 text-red-300 border border-red-500/40',
  COLD:    'bg-blue-500/20 text-blue-300 border border-blue-500/40',
  HOT:     'bg-amber-500/20 text-amber-300 border border-amber-500/40',
  NORMAL:  'bg-slate-700/50 text-slate-400',
};

interface Props {
  stats: SegmentStats[];
}

export default function PredictionGrid({ stats }: Props) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
      {stats.map((s, i) => {
        const status = getSegmentStatus(s);
        const color = SEGMENT_COLORS[s.segment as Segment];
        const label = SEGMENT_LABELS[s.segment as Segment];
        return (
          <div
            key={s.segment}
            className="bg-slate-800 rounded-xl p-4 flex flex-col gap-2 border border-slate-700"
          >
            <div className="flex items-center justify-between">
              <span
                className="text-lg font-bold"
                style={{ color }}
              >
                {label}
              </span>
              {i === 0 && (
                <span className="text-xs bg-amber-500 text-slate-900 px-2 py-0.5 rounded-full font-bold">
                  TOP
                </span>
              )}
            </div>

            {/* Score bar */}
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="h-2 rounded-full transition-all"
                style={{ width: `${s.score}%`, backgroundColor: color }}
              />
            </div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Score: <span className="text-slate-200 font-semibold">{s.score.toFixed(0)}</span></span>
              <span>{(s.frequency * 100).toFixed(1)}% / {(s.expected * 100).toFixed(1)}%</span>
            </div>

            <span className={`text-xs px-2 py-0.5 rounded-full self-start ${STATUS_STYLES[status]}`}>
              {status}
            </span>
          </div>
        );
      })}
    </div>
  );
}
