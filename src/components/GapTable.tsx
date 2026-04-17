import { SEGMENT_LABELS } from '../lib/constants';
import type { SegmentStats, Segment } from '../lib/types';

interface Props {
  stats: SegmentStats[];
}

export default function GapTable({ stats }: Props) {
  return (
    <div className="bg-slate-800 rounded-xl p-4 my-6 overflow-x-auto">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
        Gap Analysis
      </h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-slate-500 text-xs border-b border-slate-700">
            <th className="text-left pb-2">Segment</th>
            <th className="text-right pb-2">Last Hit (rounds ago)</th>
            <th className="text-right pb-2">Avg Gap</th>
            <th className="text-right pb-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {stats.map(s => {
            const label = SEGMENT_LABELS[s.segment as Segment];
            const isOverdue = s.lastSeen > s.avgGap * 1.5;
            return (
              <tr key={s.segment} className="border-b border-slate-700/50">
                <td className="py-2 font-medium text-slate-200">{label}</td>
                <td className="py-2 text-right text-slate-300">{s.lastSeen}</td>
                <td className="py-2 text-right text-slate-400">{s.avgGap.toFixed(0)}</td>
                <td className="py-2 text-right">
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    isOverdue
                      ? 'bg-red-500/20 text-red-300'
                      : 'bg-slate-700 text-slate-400'
                  }`}>
                    {isOverdue ? 'OVERDUE' : 'OK'}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
