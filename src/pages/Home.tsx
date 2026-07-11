import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity, Cpu, Camera, Scale, Palette, Wifi,
  ArrowRight, ChevronRight, BarChart3, Zap,
} from 'lucide-react';
import GlassCard from '@/components/common/GlassCard';

// ─── Hero animated background nodes ──────────────────────────────────────────
const FloatingNodes: React.FC = () => {
  const nodes = Array.from({ length: 14 }, (_, i) => ({
    id: i,
    x:  Math.random() * 100,
    y:  Math.random() * 100,
    size: 3 + Math.random() * 5,
    delay: Math.random() * 4,
    duration: 4 + Math.random() * 4,
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {nodes.map((n) => (
        <div
          key={n.id}
          className="absolute rounded-full"
          style={{
            left:    `${n.x}%`,
            top:     `${n.y}%`,
            width:   n.size,
            height:  n.size,
            background: 'rgba(59,130,246,0.6)',
            animation: `gridFloat ${n.duration}s ${n.delay}s ease-in-out infinite`,
            boxShadow: '0 0 8px rgba(59,130,246,0.4)',
          }}
        />
      ))}
      {/* Connection lines SVG */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.08 }}>
        {nodes.slice(0, 8).map((n, i) => {
          const next = nodes[(i + 1) % 8];
          return (
            <line
              key={i}
              x1={`${n.x}%`} y1={`${n.y}%`}
              x2={`${next.x}%`} y2={`${next.y}%`}
              stroke="#3B82F6"
              strokeWidth="1"
            />
          );
        })}
      </svg>
    </div>
  );
};

// ─── Feature Card ─────────────────────────────────────────────────────────────
const FeatureCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  desc: string;
  delay?: number;
}> = ({ icon, title, desc, delay = 0 }) => (
  <GlassCard
    className="animate-fade-in-up"
    style={{ animationDelay: `${delay}ms` }}
    padding="lg"
  >
    <div
      className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
      style={{ background: 'rgba(59,130,246,0.12)', border: '1px solid rgba(59,130,246,0.2)' }}
    >
      {icon}
    </div>
    <h3 className="text-white font-semibold text-[15px] mb-2">{title}</h3>
    <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.7 }}>{desc}</p>
  </GlassCard>
);

// ─── Hardware Item ────────────────────────────────────────────────────────────
const HardwareItem: React.FC<{ name: string; role: string; icon: React.ReactNode }> = ({
  name, role, icon,
}) => (
  <div
    className="flex items-center gap-4 p-4 rounded-xl"
    style={{
      background: 'rgba(30,41,59,0.4)',
      border: '1px solid rgba(99,139,199,0.1)',
      transition: 'border-color 0.2s',
    }}
    onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(59,130,246,0.3)')}
    onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(99,139,199,0.1)')}
  >
    <div
      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{ background: 'rgba(59,130,246,0.1)', border: '1px solid rgba(59,130,246,0.15)' }}
    >
      {icon}
    </div>
    <div>
      <p className="text-white font-semibold text-sm">{name}</p>
      <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 1 }}>{role}</p>
    </div>
    <ChevronRight size={14} className="ml-auto" style={{ color: 'var(--text-muted)' }} />
  </div>
);

// ─── Process Step ─────────────────────────────────────────────────────────────
const ProcessStep: React.FC<{
  step: number; title: string; desc: string; last?: boolean;
}> = ({ step, title, desc, last = false }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
        style={{
          background: 'linear-gradient(135deg, #3B82F6, #6366F1)',
          color: 'white',
          boxShadow: '0 0 16px rgba(59,130,246,0.3)',
        }}
      >
        {step}
      </div>
      {!last && (
        <div
          className="w-px flex-1 mt-2"
          style={{ background: 'linear-gradient(to bottom, rgba(59,130,246,0.4), transparent)', minHeight: 40 }}
        />
      )}
    </div>
    <div className="pb-8">
      <h4 className="text-white font-semibold text-[15px] mb-1">{title}</h4>
      <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.7 }}>{desc}</p>
    </div>
  </div>
);

// ─── Home Page ────────────────────────────────────────────────────────────────
const Home: React.FC = () => {
  return (
    <div style={{ paddingTop: 64 }}>
      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-[90vh] flex items-center"
        style={{ background: 'linear-gradient(180deg, rgba(15,23,42,0) 0%, var(--bg-primary) 100%)' }}
      >
        <FloatingNodes />
        {/* Industrial grid */}
        <div className="absolute inset-0 industrial-grid" style={{ opacity: 0.3 }} />

        <div className="relative max-w-[1400px] mx-auto px-6 py-20 w-full">
          <div className="max-w-3xl">
            {/* Label */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-8 animate-fade-in-down"
              style={{
                background: 'rgba(59,130,246,0.1)',
                border:     '1px solid rgba(59,130,246,0.25)',
                fontSize:   11,
                fontWeight: 700,
                letterSpacing: '0.12em',
                color:      'var(--accent-blue)',
                textTransform: 'uppercase',
              }}
            >
              <Activity size={11} />
              Industrial IoT Monitoring System
            </div>

            {/* Heading */}
            <h1
              className="font-black leading-tight mb-6 animate-fade-in-up animate-delay-100"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
            >
              <span className="text-gradient">Fruit Segregation</span>
              <br />
              <span className="text-white">Monitoring System</span>
            </h1>

            <p
              className="mb-10 leading-relaxed animate-fade-in-up animate-delay-200"
              style={{ color: 'var(--text-secondary)', fontSize: 'clamp(15px, 1.5vw, 18px)', maxWidth: 560 }}
            >
              Real-time automated fruit sorting with computer vision, weight detection,
              and color analysis. Powered by ESP32, Firebase, and a fully independent
              3D digital twin.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 animate-fade-in-up animate-delay-300">
              <Link to="/monitoring" className="btn-primary">
                <Activity size={16} />
                Live Monitoring
                <ArrowRight size={15} />
              </Link>
              <Link to="/history" className="btn-secondary">
                <BarChart3 size={16} />
                View History
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="flex gap-8 mt-12 animate-fade-in-up animate-delay-400">
              {[
                { label: 'Accuracy', value: '97.3%' },
                { label: 'Per Minute', value: '~12 fruits' },
                { label: 'Uptime', value: '99.8%' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="text-white font-bold text-xl font-mono">{value}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 2 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: 'rgba(15,23,42,0.5)' }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="text-center mb-14">
            <p className="section-label">Core Capabilities</p>
            <h2 className="text-white font-bold text-3xl mt-2">
              Industrial-Grade Features
            </h2>
            <p className="mt-3" style={{ color: 'var(--text-muted)', fontSize: 15 }}>
              Every component engineered for precision, reliability, and real-time performance.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            <FeatureCard
              icon={<Camera size={20} style={{ color: 'var(--accent-blue)' }} />}
              title="Computer Vision"
              desc="ESP32-CAM captures high-resolution images of each fruit. ML model classifies fruit type with 94%+ confidence in real-time."
              delay={0}
            />
            <FeatureCard
              icon={<Palette size={20} style={{ color: '#A855F7' }} />}
              title="Color Detection"
              desc="TCS3200 color sensor reads precise RGB values to determine ripeness stage and classify fruit grade automatically."
              delay={100}
            />
            <FeatureCard
              icon={<Scale size={20} style={{ color: '#F59E0B' }} />}
              title="Weight Detection"
              desc="Load cell with HX711 ADC provides ±0.5g accuracy measurement. Used to assign quality grade: Premium, Standard, or Reject."
              delay={200}
            />
            <FeatureCard
              icon={<Wifi size={20} style={{ color: '#22C55E' }} />}
              title="IoT Monitoring"
              desc="All sensor data streams via WiFi to Firebase Realtime Database. Dashboard updates within 200ms of a detection event."
              delay={300}
            />
            <FeatureCard
              icon={<Cpu size={20} style={{ color: '#EF4444' }} />}
              title="ESP32 Control"
              desc="Dual-core microcontroller manages conveyor speed, servo gate, sensor polling, and WiFi simultaneously at 240MHz."
              delay={400}
            />
            <FeatureCard
              icon={<Activity size={20} style={{ color: 'var(--accent-blue)' }} />}
              title="Realtime Database"
              desc="Firebase Realtime Database streams live machine state, fruit detections, and aggregate statistics to any connected client."
              delay={500}
            />
          </div>
        </div>
      </section>

      {/* ── HARDWARE ──────────────────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="section-label">Hardware Stack</p>
              <h2 className="text-white font-bold text-3xl mt-2 mb-4">
                Purpose-Built Components
              </h2>
              <p className="mb-8" style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.8 }}>
                Every hardware component was selected for industrial reliability, cost-efficiency,
                and integration simplicity. The system runs on 5V USB power with room-temperature calibration.
              </p>
              <div className="flex flex-col gap-3">
                <HardwareItem
                  icon={<Cpu size={16} style={{ color: 'var(--accent-blue)' }} />}
                  name="ESP32-WROOM-32"
                  role="Main microcontroller — WiFi + BLE + dual-core"
                />
                <HardwareItem
                  icon={<Camera size={16} style={{ color: '#A855F7' }} />}
                  name="ESP32-CAM (OV2640)"
                  role="2MP camera module — image capture + WiFi"
                />
                <HardwareItem
                  icon={<Scale size={16} style={{ color: '#F59E0B' }} />}
                  name="HX711 + Load Cell"
                  role="24-bit ADC — weight up to 5kg at ±0.5g"
                />
                <HardwareItem
                  icon={<Palette size={16} style={{ color: '#22C55E' }} />}
                  name="TCS3200 Color Sensor"
                  role="RGB detection — 10kHz output frequency"
                />
                <HardwareItem
                  icon={<Zap size={16} style={{ color: '#EF4444' }} />}
                  name="MG996R Servo Motor"
                  role="180° rotation — 2.2kg·cm torque — sorting gate"
                />
                <HardwareItem
                  icon={<Activity size={16} style={{ color: 'var(--accent-blue)' }} />}
                  name="DC Geared Motor + Belt"
                  role="12V conveyor drive — adjustable speed via PWM"
                />
              </div>
            </div>

            {/* Right column — system diagram */}
            <div>
              <GlassCard padding="lg">
                <div className="section-label mb-6">System Architecture</div>
                {/* Simplified node diagram */}
                <div className="flex flex-col items-center gap-3">
                  {[
                    { label: 'Sensors', nodes: ['ESP32-CAM', 'Color Sensor', 'Load Cell'], color: '#3B82F6' },
                    { label: 'Controller', nodes: ['ESP32-WROOM-32'], color: '#6366F1' },
                    { label: 'Actuators', nodes: ['Servo Gate', 'Conveyor Belt'], color: '#F59E0B' },
                    { label: 'Cloud', nodes: ['Firebase RTDB', 'Firebase Storage'], color: '#22C55E' },
                    { label: 'Dashboard', nodes: ['This Website'], color: '#A855F7' },
                  ].map(({ label, nodes, color }, i) => (
                    <div key={i} className="w-full">
                      <div className="flex items-center gap-2 mb-2">
                        <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
                        <span style={{ color: 'var(--text-muted)', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                          {label}
                        </span>
                      </div>
                      <div className="flex gap-2 flex-wrap">
                        {nodes.map((n) => (
                          <span
                            key={n}
                            className="px-3 py-1.5 rounded-lg text-[12px] font-medium"
                            style={{
                              background: `${color}15`,
                              border: `1px solid ${color}30`,
                              color,
                            }}
                          >
                            {n}
                          </span>
                        ))}
                      </div>
                      {i < 4 && (
                        <div className="flex justify-center my-2">
                          <div style={{ width: 1, height: 18, background: 'rgba(99,139,199,0.2)' }} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* ── WORKING PRINCIPLE ─────────────────────────────────────────────── */}
      <section className="py-24" style={{ background: 'rgba(15,23,42,0.5)' }}>
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <p className="section-label">Working Principle</p>
              <h2 className="text-white font-bold text-3xl mt-2 mb-10">
                Automated Sorting Process
              </h2>
              <div>
                <ProcessStep step={1} title="Fruit Placement"
                  desc="Fruit is placed on the infeed end of the conveyor belt. The belt moves at a controlled speed to present each fruit to sensors." />
                <ProcessStep step={2} title="Image Capture & Classification"
                  desc="As the fruit passes under the ESP32-CAM gantry, a photo is captured. The ML model identifies the fruit type and confidence score." />
                <ProcessStep step={3} title="Weight Measurement"
                  desc="The fruit rests on the load cell platform for ~0.5 seconds. The HX711 ADC reads the weight and assigns a quality grade." />
                <ProcessStep step={4} title="Color Analysis"
                  desc="The TCS3200 sensor illuminates the fruit with LEDs and reads the reflected RGB values to confirm ripeness and color grade." />
                <ProcessStep step={5} title="Sorting Decision"
                  desc="The ESP32 evaluates all sensor data and commands the servo gate to direct the fruit to the accepted or rejected bin." />
                <ProcessStep step={6} title="Data Logging" last
                  desc="All detection data — image, weight, color, grade, timestamp — is written to Firebase Realtime Database for live dashboard display." />
              </div>
            </div>
            <div className="flex items-start">
              <GlassCard padding="lg" className="w-full">
                <p className="section-label mb-6">Grade Classification Logic</p>
                <div className="flex flex-col gap-4">
                  {[
                    {
                      grade: 'Premium',
                      rule:  'Weight ≥ 150g AND Confidence ≥ 90% AND Color = Expected',
                      color: '#22C55E',
                      result: 'Accepted',
                    },
                    {
                      grade: 'Standard',
                      rule:  'Weight 80–150g OR Confidence 75–89% OR Minor color variance',
                      color: '#F59E0B',
                      result: 'Accepted',
                    },
                    {
                      grade: 'Reject',
                      rule:  'Weight < 80g OR Confidence < 75% OR Unexpected color reading',
                      color: '#EF4444',
                      result: 'Rejected',
                    },
                  ].map(({ grade, rule, color, result }) => (
                    <div
                      key={grade}
                      className="rounded-xl p-4"
                      style={{ background: `${color}0A`, border: `1px solid ${color}20` }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span style={{ color, fontWeight: 700, fontSize: 14 }}>{grade}</span>
                        <span
                          className="px-2 py-0.5 rounded-full text-[10px] font-bold"
                          style={{
                            background: result === 'Accepted' ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)',
                            color: result === 'Accepted' ? '#22C55E' : '#EF4444',
                          }}
                        >
                          → {result}
                        </span>
                      </div>
                      <p style={{ color: 'var(--text-muted)', fontSize: 12, lineHeight: 1.7 }}>{rule}</p>
                    </div>
                  ))}
                </div>
              </GlassCard>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────────────────── */}
      <footer
        className="py-10"
        style={{ borderTop: '1px solid var(--surface-border)' }}
      >
        <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg, #3B82F6, #6366F1)' }}
            >
              <Cpu size={14} className="text-white" />
            </div>
            <div>
              <p className="text-white font-bold text-sm">FSMS</p>
              <p style={{ color: 'var(--text-muted)', fontSize: 11 }}>Fruit Segregation Monitoring System</p>
            </div>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: 12 }}>
            Built with React 19 · Three.js · Firebase · TypeScript
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: 12 }}>
            Engineering Final Year Project · IoT Portfolio
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
