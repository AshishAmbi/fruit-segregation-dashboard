import React from 'react';
import { Apple, Droplets, Scale, Star, Zap, Clock } from 'lucide-react';
import GlassCard from '@/components/common/GlassCard';
import { FRUIT_COLORS } from '@/constants';
import type { CurrentFruit } from '@/types';

interface FruitInfoProps {
  fruit: CurrentFruit | null;
}

const GRADE_COLORS = {
  Premium:  '#22C55E',
  Standard: '#F59E0B',
  Reject:   '#EF4444',
};

const FruitInfo: React.FC<FruitInfoProps> = ({ fruit }) => {
  if (!fruit) {
    return (
      <GlassCard padding="lg">
        <div className="flex items-center gap-2 mb-4">
          <Apple size={16} style={{ color: 'var(--accent-blue)' }} />
          <span className="text-white font-semibold text-sm">Fruit Detection</span>
        </div>
        <div className="flex flex-col items-center justify-center py-8 gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)' }}
          >
            <Apple size={22} style={{ color: 'var(--text-muted)' }} />
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>No fruit detected</p>
        </div>
      </GlassCard>
    );
  }

  const colorHex   = FRUIT_COLORS[fruit.color];
  const gradeColor = GRADE_COLORS[fruit.grade];
  const timestamp  = new Date(fruit.timestamp);

  const rows = [
    {
      icon:  <Apple   size={14} />,
      label: 'Fruit Name',
      value: fruit.name,
      mono:  false,
    },
    {
      icon:  <Droplets size={14} />,
      label: 'Detected Color',
      value: (
        <span className="flex items-center gap-2">
          <span
            style={{
              width: 10, height: 10, borderRadius: '50%',
              background: colorHex,
              display: 'inline-block',
              boxShadow: `0 0 6px ${colorHex}`,
            }}
          />
          {fruit.color}
        </span>
      ),
      mono: false,
    },
    {
      icon:  <Scale size={14} />,
      label: 'Weight',
      value: `${fruit.weight} g`,
      mono:  true,
    },
    {
      icon:  <Star  size={14} />,
      label: 'Grade',
      value: (
        <span style={{ color: gradeColor, fontWeight: 700 }}>
          {fruit.grade}
        </span>
      ),
      mono: false,
    },
    {
      icon:  <Zap  size={14} />,
      label: 'Confidence',
      value: (
        <span className="flex items-center gap-2">
          <div
            className="flex-1 rounded-full overflow-hidden"
            style={{ height: 4, background: 'rgba(59,130,246,0.15)', maxWidth: 60 }}
          >
            <div
              style={{
                width:  `${fruit.confidence}%`,
                height: '100%',
                background: fruit.confidence > 90
                  ? 'var(--accent-green)'
                  : fruit.confidence > 75
                  ? 'var(--accent-amber)'
                  : 'var(--accent-red)',
                borderRadius: '9999px',
                transition: 'width 0.5s ease',
              }}
            />
          </div>
          <span className="font-mono text-[13px]">{fruit.confidence.toFixed(1)}%</span>
        </span>
      ),
      mono: false,
    },
    {
      icon:  <Clock size={14} />,
      label: 'Timestamp',
      value: timestamp.toLocaleTimeString('en-US', { hour12: false }),
      mono:  true,
    },
  ];

  return (
    <GlassCard padding="md">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Apple size={16} style={{ color: 'var(--accent-blue)' }} />
        <span className="text-white font-semibold text-sm">Fruit Detection</span>
        <div className="ml-auto">
          <span
            className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase"
            style={{
              background: 'rgba(34,197,94,0.12)',
              color: '#22C55E',
              border: '1px solid rgba(34,197,94,0.25)',
              letterSpacing: '0.06em',
            }}
          >
            Detected
          </span>
        </div>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-0.5">
        {rows.map(({ icon, label, value, mono }, i) => (
          <div
            key={i}
            className="flex items-center justify-between py-2.5"
            style={{
              borderBottom: i < rows.length - 1
                ? '1px solid rgba(99,139,199,0.07)'
                : 'none',
            }}
          >
            <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
              {icon}
              <span style={{ fontSize: 12 }}>{label}</span>
            </div>
            <span
              style={{
                color:      'var(--text-primary)',
                fontSize:   13,
                fontFamily: mono ? 'var(--font-mono)' : undefined,
                fontWeight: 500,
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};

export default FruitInfo;
