import { useState } from 'react';
import { SEGMENTS, SEGMENT_LABELS, SEGMENT_COLORS } from '../lib/constants';
import type { Segment } from '../lib/types';

interface Props {
  onAdd: (results: string[]) => void;
}

export default function ManualInput({ onAdd }: Props) {
  const [textInput, setTextInput] = useState('');
  const [pending, setPending] = useState<string[]>([]);

  const addSegment = (seg: Segment) => {
    setPending(prev => [...prev, seg]);
  };

  const submit = () => {
    const fromText = textInput
      .split(',')
      .map(s => s.trim())
      .filter(s => SEGMENTS.includes(s as Segment));

    const combined = [...pending, ...fromText];
    if (combined.length > 0) {
      onAdd(combined);
      setPending([]);
      setTextInput('');
    }
  };

  const clear = () => {
    setPending([]);
    setTextInput('');
  };

  return (
    <div className="bg-slate-800 rounded-xl p-4 my-6">
      <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">
        Manual Entry
      </h3>

      {/* Quick-tap buttons */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        {SEGMENTS.map(seg => (
          <button
            key={seg}
            onClick={() => addSegment(seg as Segment)}
            className="py-2 px-3 rounded-lg text-sm font-bold text-slate-900 transition-transform active:scale-95"
            style={{ backgroundColor: SEGMENT_COLORS[seg as Segment] }}
          >
            {SEGMENT_LABELS[seg as Segment]}
          </button>
        ))}
      </div>

      {pending.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {pending.map((s, i) => (
            <span
              key={i}
              className="text-xs px-2 py-0.5 rounded-full font-bold text-slate-900"
              style={{ backgroundColor: SEGMENT_COLORS[s as Segment] }}
            >
              {SEGMENT_LABELS[s as Segment]}
            </span>
          ))}
        </div>
      )}

      {/* Text input */}
      <input
        type="text"
        value={textInput}
        onChange={e => setTextInput(e.target.value)}
        placeholder="Or type: 1, 2, CrazyTime, 5..."
        className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-sm text-slate-200 placeholder-slate-500 mb-3 focus:outline-none focus:border-amber-500"
      />

      <div className="flex gap-2">
        <button
          onClick={submit}
          className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-2 rounded-lg text-sm transition"
        >
          Add Results
        </button>
        <button
          onClick={clear}
          className="px-4 bg-slate-700 hover:bg-slate-600 text-slate-300 font-medium py-2 rounded-lg text-sm transition"
        >
          Clear
        </button>
      </div>
    </div>
  );
}
