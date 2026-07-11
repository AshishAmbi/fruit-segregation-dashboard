import React from 'react';
import { Box, RotateCcw, ZoomIn, Move } from 'lucide-react';
import GlassCard from '@/components/common/GlassCard';
import Scene3D from '@/components/digitalTwin/Scene3D';

const ConveyorSimulation: React.FC = () => {
  return (
    <GlassCard padding="none" className="overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3.5"
        style={{ borderBottom: '1px solid var(--surface-border)' }}
      >
        <div className="flex items-center gap-2.5">
          <Box size={16} style={{ color: 'var(--accent-blue)' }} />
          <span className="text-white font-semibold text-sm">3D Digital Twin</span>
          <span
            className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
            style={{
              background: 'rgba(59,130,246,0.12)',
              color: 'var(--accent-blue)',
              border: '1px solid rgba(59,130,246,0.25)',
            }}
          >
            Simulation
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            <RotateCcw size={11} />
            <span>Orbit</span>
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            <ZoomIn size={11} />
            <span>Zoom</span>
          </div>
          <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--text-muted)' }}>
            <Move size={11} />
            <span>Pan</span>
          </div>
        </div>
      </div>

      {/* 3D Canvas */}
      <div style={{ height: '520px', position: 'relative' }}>
        <Scene3D />

        {/* Info overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 flex items-center justify-between px-5 py-2.5"
          style={{
            background: 'linear-gradient(transparent, rgba(8,16,30,0.95))',
            pointerEvents: 'none',
          }}
        >
          <span className="font-mono text-[11px]" style={{ color: 'var(--accent-blue)' }}>
            Independent simulation — not synchronized with Firebase
          </span>
          <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
            Three.js · React Three Fiber
          </span>
        </div>
      </div>
    </GlassCard>
  );
};

export default ConveyorSimulation;
