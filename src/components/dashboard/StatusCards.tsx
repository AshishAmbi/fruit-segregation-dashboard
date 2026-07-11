import React from 'react';
import { Cpu, Wifi, Activity, Settings2 } from 'lucide-react';
import GlassCard from '@/components/common/GlassCard';
import StatusBadge from '@/components/common/StatusBadge';
import type { ComponentStatus } from '@/types';

interface StatusCardsProps {
  status: ComponentStatus;
}

const CARDS = [
  {
    key:   'esp32' as const,
    label: 'ESP32',
    sub:   'Microcontroller',
    Icon:  Cpu,
  },
  {
    key:   'firebase' as const,
    label: 'Firebase',
    sub:   'Realtime Database',
    Icon:  Wifi,
  },
  {
    key:   'conveyor' as const,
    label: 'Conveyor',
    sub:   'Belt Drive System',
    Icon:  Activity,
  },
  {
    key:   'servo' as const,
    label: 'Servo',
    sub:   'Sorting Gate',
    Icon:  Settings2,
  },
] as const;

const StatusCards: React.FC<StatusCardsProps> = ({ status }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {CARDS.map(({ key, label, sub, Icon }) => {
        const st = status[key];
        return (
          <GlassCard key={key} padding="md">
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: st === 'online'
                    ? 'rgba(34,197,94,0.12)'
                    : st === 'warning'
                    ? 'rgba(245,158,11,0.12)'
                    : 'rgba(71,85,105,0.15)',
                  border: `1px solid ${
                    st === 'online'
                      ? 'rgba(34,197,94,0.25)'
                      : st === 'warning'
                      ? 'rgba(245,158,11,0.25)'
                      : 'rgba(71,85,105,0.2)'
                  }`,
                }}
              >
                <Icon
                  size={18}
                  style={{
                    color: st === 'online'
                      ? '#22C55E'
                      : st === 'warning'
                      ? '#F59E0B'
                      : '#64748B',
                  }}
                />
              </div>
              <StatusBadge status={st} size="sm" />
            </div>
            <div>
              <p className="text-white font-semibold text-[15px]">{label}</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 2 }}>{sub}</p>
            </div>
          </GlassCard>
        );
      })}
    </div>
  );
};

export default StatusCards;
