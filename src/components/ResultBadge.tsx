import { SEGMENT_COLORS, SEGMENT_LABELS } from '../lib/constants';
import type { Segment } from '../lib/types';

interface Props {
  segment: string;
  small?: boolean;
}

export default function ResultBadge({ segment, small = false }: Props) {
  const color = SEGMENT_COLORS[segment as Segment] ?? '#64748b';
  const label = SEGMENT_LABELS[segment as Segment] ?? segment;
  const size = small ? 'text-xs px-2 py-0.5' : 'text-sm px-3 py-1';

  return (
    <span
      className={`inline-flex items-center justify-center font-bold rounded-full ${size}`}
      style={{ backgroundColor: color, color: '#0f172a' }}
    >
      {label}
    </span>
  );
}
