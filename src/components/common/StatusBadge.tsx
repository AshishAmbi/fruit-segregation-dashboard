import React from 'react';
import type { ConnectionStatus } from '@/types';

interface StatusBadgeProps {
  status: ConnectionStatus;
  label?: string;
  size?: 'sm' | 'md';
}

const STATUS_CONFIG: Record<ConnectionStatus, { dot: string; text: string; label: string }> = {
  online:  { dot: '#22C55E', text: '#22C55E', label: 'Online'  },
  offline: { dot: '#64748B', text: '#64748B', label: 'Offline' },
  warning: { dot: '#F59E0B', text: '#F59E0B', label: 'Warning' },
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label, size = 'md' }) => {
  const cfg = STATUS_CONFIG[status];
  const dotSize = size === 'sm' ? 6 : 8;
  const fontSize = size === 'sm' ? 11 : 12;

  return (
    <span
      className="inline-flex items-center gap-1.5"
      style={{ fontSize, fontWeight: 600, color: cfg.text }}
    >
      <span
        style={{
          width:  dotSize,
          height: dotSize,
          borderRadius: '50%',
          background: cfg.dot,
          display: 'inline-block',
          boxShadow: status === 'online'
            ? `0 0 8px ${cfg.dot}`
            : status === 'warning'
            ? `0 0 6px ${cfg.dot}`
            : 'none',
          animation: status === 'online'
            ? 'pulse-dot 2s ease-in-out infinite'
            : status === 'warning'
            ? 'blink 1s ease infinite'
            : 'none',
        }}
      />
      {label ?? cfg.label}
    </span>
  );
};

export default StatusBadge;
