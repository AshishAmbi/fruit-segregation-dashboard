import type {
  FruitName,
  FruitColor,
  FruitGrade,
  SortResult,
  HistoryEntry,
  Statistics,
  ComponentStatus,
  CurrentFruit,
  ChartDataPoint,
} from '@/types';

// ─── Navigation ───────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Home',       path: '/' },
  { label: 'Monitoring', path: '/monitoring' },
  { label: 'History',    path: '/history' },
  { label: 'About',      path: '/about' },
] as const;

// ─── Firebase Paths ───────────────────────────────────────────────────────────
export const FB_PATHS = {
  machine:        'machine',
  status:         'machine/status',
  currentFruit:   'machine/currentFruit',
  statistics:     'machine/statistics',
  history:        'history',
  cameraImages:   'cameraImages',
} as const;

// ─── Grade Thresholds (grams) ─────────────────────────────────────────────────
export const GRADE_CONFIG: Record<FruitGrade, { minWeight: number; maxWeight: number; label: string }> = {
  Premium:  { minWeight: 150, maxWeight: 500, label: 'Premium' },
  Standard: { minWeight: 80,  maxWeight: 150, label: 'Standard' },
  Reject:   { minWeight: 0,   maxWeight: 80,  label: 'Reject' },
};

// ─── Color Map ────────────────────────────────────────────────────────────────
export const FRUIT_COLORS: Record<FruitColor, string> = {
  Red:     '#EF4444',
  Orange:  '#F97316',
  Yellow:  '#EAB308',
  Green:   '#22C55E',
  Purple:  '#A855F7',
  Unknown: '#64748B',
};

// ─── Result Config ─────────────────────────────────────────────────────────────
export const RESULT_CONFIG: Record<SortResult, { color: string; bgClass: string }> = {
  Accepted: { color: '#22C55E', bgClass: 'badge-green' },
  Rejected: { color: '#EF4444', bgClass: 'badge-red'   },
};

// ─── Mock Current Status ──────────────────────────────────────────────────────
export const MOCK_STATUS: ComponentStatus = {
  esp32:    'online',
  firebase: 'online',
  conveyor: 'online',
  servo:    'online',
  lastPing: new Date().toISOString(),
};

// ─── Mock Current Fruit ───────────────────────────────────────────────────────
export const MOCK_CURRENT_FRUIT: CurrentFruit = {
  name:       'Apple',
  color:      'Red',
  weight:     182,
  grade:      'Premium',
  confidence: 94.7,
  timestamp:  new Date().toISOString(),
};

// ─── Mock Statistics ──────────────────────────────────────────────────────────
export const MOCK_STATISTICS: Statistics = {
  totalProcessed: 1284,
  accepted:       1147,
  rejected:       137,
  accuracy:       97.3,
  todayProcessed: 248,
  avgWeight:      163.4,
  sessionStart:   new Date(Date.now() - 4 * 3600_000).toISOString(),
};

// ─── Mock History ─────────────────────────────────────────────────────────────
const FRUIT_NAMES:  FruitName[]  = ['Apple', 'Orange', 'Banana', 'Mango', 'Grape'];
const FRUIT_COLORS_ARR: FruitColor[] = ['Red', 'Orange', 'Yellow', 'Green', 'Purple'];
const GRADES:       FruitGrade[] = ['Premium', 'Standard', 'Reject'];
const RESULTS:      SortResult[] = ['Accepted', 'Accepted', 'Accepted', 'Accepted', 'Rejected'];

function generateMockHistory(count: number): HistoryEntry[] {
  const entries: HistoryEntry[] = [];
  const now = Date.now();

  for (let i = 0; i < count; i++) {
    const name    = FRUIT_NAMES[Math.floor(Math.random() * FRUIT_NAMES.length)];
    const color   = FRUIT_COLORS_ARR[Math.floor(Math.random() * FRUIT_COLORS_ARR.length)];
    const grade   = GRADES[Math.floor(Math.random() * GRADES.length)];
    const result  = RESULTS[Math.floor(Math.random() * RESULTS.length)];
    const weight  = Math.round(60 + Math.random() * 280);
    const conf    = Math.round(82 + Math.random() * 17);
    const ts      = new Date(now - i * 85_000 - Math.random() * 30_000).toISOString();

    entries.push({
      id:        `entry-${i}`,
      sessionId: 'session-001',
      name,
      color,
      weight,
      grade,
      confidence: conf,
      timestamp:  ts,
      result,
    });
  }
  return entries;
}

export const MOCK_HISTORY: HistoryEntry[] = generateMockHistory(120);

// ─── Mock Chart Data ──────────────────────────────────────────────────────────
export function generateChartData(points = 24): ChartDataPoint[] {
  const data: ChartDataPoint[] = [];
  const now = Date.now();

  for (let i = points - 1; i >= 0; i--) {
    const total    = Math.round(40 + Math.random() * 60);
    const rejected = Math.round(total * (0.02 + Math.random() * 0.05));
    const accepted = total - rejected;
    const t        = new Date(now - i * 3600_000);

    data.push({
      time:     t.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      accepted,
      rejected,
      total,
    });
  }
  return data;
}

// ─── 3D Twin Constants ────────────────────────────────────────────────────────
export const TWIN = {
  // Conveyor belt extents
  BELT_LENGTH:       8.0,
  BELT_WIDTH:        0.9,
  BELT_HEIGHT:       0.08,
  BELT_Y:            1.05,
  FRAME_Y:           0.0,
  LEG_HEIGHT:        1.0,

  // Station X positions along conveyor
  SPAWN_X:          -3.6,
  CAMERA_X:         -1.6,
  WEIGHT_X:         -0.2,
  COLOR_X:           1.2,
  SERVO_X:           2.8,
  BIN_ACCEPT_X:      3.8,
  BIN_REJECT_X:      3.8,

  // Bin Y positions
  BIN_Y:             0.0,

  // Conveyor speed
  BELT_SPEED:        0.6, // units/sec

  // Animation phase durations (seconds)
  PHASE_SPAWN:          0.4,
  PHASE_TO_CAMERA:      1.8,
  PHASE_CAMERA_SCAN:    0.8,
  PHASE_TO_WEIGHT:      1.2,
  PHASE_WEIGHT:         0.7,
  PHASE_TO_COLOR:       1.2,
  PHASE_COLOR_SCAN:     0.6,
  PHASE_TO_SERVO:       1.4,
  PHASE_SERVO:          0.9,
  PHASE_FALL:           0.8,
  PHASE_BOUNCE:         0.5,
  PHASE_FADE:           0.5,
} as const;

// ─── Fruit color palette (for 3D twin) ────────────────────────────────────────
export const TWIN_FRUIT_COLORS = [
  '#DC2626', // Red apple
  '#EA580C', // Orange
  '#CA8A04', // Yellow banana
  '#16A34A', // Green mango
  '#7C3AED', // Purple grape
] as const;
