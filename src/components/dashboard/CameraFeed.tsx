import React, { useState, useEffect } from 'react';
import { Camera, RefreshCw, Maximize2 } from 'lucide-react';
import GlassCard from '@/components/common/GlassCard';

interface CameraFeedProps {
  imageUrl?: string | null;
  isLive?: boolean;
}

const CameraFeed: React.FC<CameraFeedProps> = ({ imageUrl, isLive = false }) => {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (imageUrl) setLastUpdate(new Date());
  }, [imageUrl]);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });

  return (
    <GlassCard padding="none" className="overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 py-3.5"
        style={{ borderBottom: '1px solid var(--surface-border)' }}
      >
        <div className="flex items-center gap-2.5">
          <Camera size={16} style={{ color: 'var(--accent-blue)' }} />
          <span className="text-white font-semibold text-sm">ESP32-CAM Feed</span>
          {isLive && (
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
              style={{
                background: 'rgba(239,68,68,0.15)',
                color: '#EF4444',
                border: '1px solid rgba(239,68,68,0.3)',
              }}
            >
              ● LIVE
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>
            {formatTime(lastUpdate)}
          </span>
          <button
            onClick={() => setLastUpdate(new Date())}
            className="p-1.5 rounded-md hover:bg-white/5 transition-colors"
            title="Refresh"
          >
            <RefreshCw size={13} style={{ color: 'var(--text-muted)' }} />
          </button>
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-md hover:bg-white/5 transition-colors"
            title="Fullscreen"
          >
            <Maximize2 size={13} style={{ color: 'var(--text-muted)' }} />
          </button>
        </div>
      </div>

      {/* Image Area */}
      <div
        className="relative scan-line-container"
        style={{
          aspectRatio: '4/3',
          background: '#08101E',
        }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Camera feed"
            className="w-full h-full object-cover"
            style={{ display: 'block' }}
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            {/* Placeholder grid */}
            <div
              className="w-full h-full absolute inset-0 industrial-grid"
              style={{ opacity: 0.4 }}
            />
            {/* Camera icon */}
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.2)' }}
            >
              <Camera size={28} style={{ color: 'var(--accent-blue)' }} />
            </div>
            <div className="text-center">
              <p className="text-white font-medium text-sm">Awaiting Camera Feed</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 4 }}>
                {isLive ? 'Connecting to Firebase Storage...' : 'Configure Firebase to enable live feed'}
              </p>
            </div>
            {/* Simulated scan lines */}
            <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03 }}>
              {Array.from({ length: 40 }, (_, i) => (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    left: 0, right: 0,
                    top: `${i * 2.5}%`,
                    height: 1,
                    background: '#FFFFFF',
                  }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Corner brackets — industrial HUD style */}
        {(['tl', 'tr', 'bl', 'br'] as const).map((corner) => (
          <div
            key={corner}
            style={{
              position:  'absolute',
              width:     20, height: 20,
              borderColor: 'var(--accent-blue)',
              borderStyle: 'solid',
              borderTopWidth:    corner.startsWith('t') ? 2 : 0,
              borderBottomWidth: corner.startsWith('b') ? 2 : 0,
              borderLeftWidth:   corner.endsWith('l')   ? 2 : 0,
              borderRightWidth:  corner.endsWith('r')   ? 2 : 0,
              top:    corner.startsWith('t') ? 8 : 'auto',
              bottom: corner.startsWith('b') ? 8 : 'auto',
              left:   corner.endsWith('l')   ? 8 : 'auto',
              right:  corner.endsWith('r')   ? 8 : 'auto',
            }}
          />
        ))}

        {/* Bottom info bar */}
        <div
          className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center justify-between"
          style={{ background: 'rgba(8,16,30,0.85)', borderTop: '1px solid rgba(59,130,246,0.12)' }}
        >
          <span className="font-mono text-[11px]" style={{ color: 'var(--accent-blue)' }}>
            ESP32-CAM · OV2640
          </span>
          <span className="font-mono text-[11px]" style={{ color: 'var(--text-muted)' }}>
            640×480 · 30fps
          </span>
        </div>
      </div>
    </GlassCard>
  );
};

export default CameraFeed;
