import React, { useEffect, useState } from 'react';
import StatusCards from '@/components/dashboard/StatusCards';
import CameraFeed from '@/components/dashboard/CameraFeed';
import FruitInfo from '@/components/dashboard/FruitInfo';
import StatisticsPanel from '@/components/dashboard/Statistics';
import ConveyorSimulation from '@/components/dashboard/ConveyorSimulation';
import { useMachineStatus, useCurrentFruit, useStatistics, useFirebaseStatus } from '@/hooks';
import { getLatestCameraImageUrl } from '@/firebase/service';

const Monitoring: React.FC = () => {
  const { status, isLive: statusLive } = useMachineStatus();
  const { fruit, isLive: fruitLive } = useCurrentFruit();
  const { stats, isLive: statsLive } = useStatistics();
  const { message } = useFirebaseStatus();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  // Fetch initial camera image
  useEffect(() => {
    let mounted = true;
    const fetchImage = async () => {
      const url = await getLatestCameraImageUrl();
      if (mounted && url) setImageUrl(url);
    };
    fetchImage();
    
    // In a real app, you might want to poll for new images or listen to a database trigger
    // For now, we just fetch the latest on load.
    const interval = setInterval(fetchImage, 5000); // Poll every 5 seconds for demo
    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', paddingBottom: 40 }}>
      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 pt-8 pb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-white font-bold text-2xl mb-1">Live Monitoring Dashboard</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
              Real-time telemetry and control interface
            </p>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 rounded-lg" style={{ background: 'rgba(30,41,59,0.5)', border: '1px solid var(--surface-border)' }}>
             <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>System Message:</span>
             <span style={{ color: 'var(--accent-blue)', fontSize: 12, fontWeight: 500 }}>{message}</span>
          </div>
        </div>
      </div>

      {/* ── DASHBOARD GRID ──────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* LEFT COLUMN: Status, Camera, Info */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <StatusCards status={status} />
            <CameraFeed imageUrl={imageUrl} isLive={fruitLive} />
            <FruitInfo fruit={fruit} />
          </div>

          {/* RIGHT COLUMN: 3D Twin, Stats */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <ConveyorSimulation />
            <StatisticsPanel stats={stats} />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Monitoring;
