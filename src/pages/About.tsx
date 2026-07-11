import React from 'react';
import { Target, Lightbulb, ShieldCheck, Layers, GitBranch, Terminal } from 'lucide-react';
import GlassCard from '@/components/common/GlassCard';

const About: React.FC = () => {
  const objectives = [
    {
      icon: <Target size={20} className="text-blue-500" />,
      title: "Automated Sorting",
      desc: "Eliminate manual sorting errors by using machine learning and precision sensors."
    },
    {
      icon: <Lightbulb size={20} className="text-amber-500" />,
      title: "Real-time Analytics",
      desc: "Provide instant feedback on yield, quality distribution, and system performance."
    },
    {
      icon: <ShieldCheck size={20} className="text-green-500" />,
      title: "Quality Control",
      desc: "Ensure only produce meeting strict weight and color criteria reach the accepted bin."
    }
  ];

  const futureScope = [
    "Integration with enterprise ERP systems for inventory management.",
    "Deployment of a robotic arm for gentler handling of delicate fruits.",
    "Expansion of the ML model to detect surface defects and bruising.",
    "Implementation of predictive maintenance algorithms for conveyor components."
  ];

  return (
    <div style={{ paddingTop: 64, minHeight: '100vh', paddingBottom: 60 }}>
      {/* ── HEADER ──────────────────────────────────────────────────────────── */}
      <div className="max-w-[1400px] mx-auto px-6 pt-12 pb-10 text-center">
        <h1 className="text-white font-bold text-3xl md:text-4xl mb-4">About the Project</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: 16, maxWidth: 600, margin: '0 auto' }}>
          An intelligent industrial IoT solution designed to streamline the sorting and quality control of fresh produce.
        </p>
      </div>

      <div className="max-w-[1400px] mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content Column */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <GlassCard padding="lg">
              <div className="flex items-center gap-3 mb-6">
                <Layers className="text-blue-500" size={24} />
                <h2 className="text-xl font-semibold text-white">Project Overview</h2>
              </div>
              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  The Fruit Segregation Monitoring System (FSMS) is a comprehensive IoT and mechatronics project developed to demonstrate modern automation principles. It replaces manual, error-prone fruit sorting with a robust, data-driven pipeline.
                </p>
                <p>
                  At its core, the system utilizes an ESP32 microcontroller orchestrating a suite of sensors. As produce moves along the conveyor belt, it is subjected to a three-stage inspection: computer vision classification (via ESP32-CAM), precise weight measurement (via an HX711 load cell), and color/ripeness validation (via a TCS3200 sensor).
                </p>
                <p>
                  Data from these sensors is aggregated locally and evaluated against configurable quality thresholds. The physical sorting is executed by a high-torque servo gate, while the telemetry is simultaneously streamed to a Firebase Realtime Database.
                </p>
                <p>
                  This dashboard serves as the HMI (Human-Machine Interface), providing operators with a real-time view of the sorting process, historical logs, and a live 3D digital twin of the machine state.
                </p>
              </div>
            </GlassCard>

            <div className="grid md:grid-cols-3 gap-4">
              {objectives.map((obj, i) => (
                <GlassCard key={i} padding="md" className="flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center mb-4 border border-slate-700">
                    {obj.icon}
                  </div>
                  <h3 className="text-white font-medium mb-2">{obj.title}</h3>
                  <p className="text-xs text-slate-400">{obj.desc}</p>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="flex flex-col gap-8">
            <GlassCard padding="lg">
               <div className="flex items-center gap-3 mb-6">
                <Terminal className="text-purple-500" size={20} />
                <h2 className="text-lg font-semibold text-white">Software Stack</h2>
              </div>
              <ul className="space-y-3">
                {[
                  { label: "Frontend Framework", value: "React 19 + TypeScript" },
                  { label: "Build Tool", value: "Vite" },
                  { label: "Styling", value: "Tailwind CSS + Custom CSS" },
                  { label: "3D Rendering", value: "Three.js + R3F" },
                  { label: "Charting", value: "Recharts" },
                  { label: "Backend/Database", value: "Firebase Realtime DB" },
                  { label: "Image Storage", value: "Firebase Storage" }
                ].map((item, i) => (
                   <li key={i} className="flex flex-col">
                      <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">{item.label}</span>
                      <span className="text-sm text-slate-200">{item.value}</span>
                   </li>
                ))}
              </ul>
            </GlassCard>

            <GlassCard padding="lg">
               <div className="flex items-center gap-3 mb-6">
                <GitBranch className="text-green-500" size={20} />
                <h2 className="text-lg font-semibold text-white">Future Scope</h2>
              </div>
              <ul className="space-y-3 text-sm text-slate-300">
                {futureScope.map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-blue-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </GlassCard>
          </div>

        </div>
      </div>
    </div>
  );
};

export default About;
