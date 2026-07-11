import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { BarChart3, CheckCircle, XCircle, Target, TrendingUp } from 'lucide-react';
import GlassCard from '@/components/common/GlassCard';
import { generateChartData } from '@/constants';
import type { Statistics } from '@/types';

interface StatisticsProps {
  stats: Statistics;
}

const chartData = generateChartData(24);

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="glass-card"
      style={{ padding: '10px 14px', fontSize: 12 }}
    >
      <p style={{ color: 'var(--text-muted)', marginBottom: 6 }}>{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.name} className="flex items-center gap-2">
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: entry.color, display: 'inline-block' }} />
          <span style={{ color: 'var(--text-secondary)' }}>{entry.name}:</span>
          <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

const StatisticsPanel: React.FC<StatisticsProps> = ({ stats }) => {
  const cards = [
    {
      label: 'Total Processed',
      value: stats.totalProcessed.toLocaleString(),
      Icon:  BarChart3,
      color: '#3B82F6',
    },
    {
      label: 'Accepted',
      value: stats.accepted.toLocaleString(),
      Icon:  CheckCircle,
      color: '#22C55E',
    },
    {
      label: 'Rejected',
      value: stats.rejected.toLocaleString(),
      Icon:  XCircle,
      color: '#EF4444',
    },
    {
      label: 'Accuracy',
      value: `${stats.accuracy.toFixed(1)}%`,
      Icon:  Target,
      color: '#F59E0B',
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      {/* Stat mini cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map(({ label, value, Icon, color }) => (
          <GlassCard key={label} padding="md">
            <div className="flex items-center gap-2 mb-2">
              <Icon size={14} style={{ color }} />
              <span style={{ color: 'var(--text-muted)', fontSize: 11, letterSpacing: '0.04em' }}>
                {label}
              </span>
            </div>
            <p className="text-white font-bold text-xl font-mono">{value}</p>
          </GlassCard>
        ))}
      </div>

      {/* Throughput chart */}
      <GlassCard padding="md">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp size={15} style={{ color: 'var(--accent-blue)' }} />
          <span className="text-white font-semibold text-sm">24-Hour Throughput</span>
          <div className="ml-auto flex items-center gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
            <span className="flex items-center gap-1.5">
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', display: 'inline-block' }} />
              Accepted
            </span>
            <span className="flex items-center gap-1.5">
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#EF4444', display: 'inline-block' }} />
              Rejected
            </span>
          </div>
        </div>
        <div style={{ height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="acceptGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#22C55E" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="rejectGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#EF4444" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(99,139,199,0.08)" />
              <XAxis
                dataKey="time"
                tick={{ fill: '#475569', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
                interval={5}
              />
              <YAxis
                tick={{ fill: '#475569', fontSize: 10 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Area
                type="monotone"
                dataKey="accepted"
                name="Accepted"
                stroke="#22C55E"
                strokeWidth={1.5}
                fill="url(#acceptGrad)"
              />
              <Area
                type="monotone"
                dataKey="rejected"
                name="Rejected"
                stroke="#EF4444"
                strokeWidth={1.5}
                fill="url(#rejectGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>
    </div>
  );
};

export default StatisticsPanel;
