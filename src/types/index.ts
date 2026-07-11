// ─── Machine Status ─────────────────────────────────────────────────────────
export type ConnectionStatus = 'online' | 'offline' | 'warning';

export interface ComponentStatus {
  esp32: ConnectionStatus;
  firebase: ConnectionStatus;
  conveyor: ConnectionStatus;
  servo: ConnectionStatus;
  lastPing?: string;
}

// ─── Fruit Data ──────────────────────────────────────────────────────────────
export type FruitName = 'Apple' | 'Orange' | 'Banana' | 'Mango' | 'Grape' | 'Unknown';
export type FruitColor = 'Red' | 'Orange' | 'Yellow' | 'Green' | 'Purple' | 'Unknown';
export type FruitGrade = 'Premium' | 'Standard' | 'Reject';
export type SortResult = 'Accepted' | 'Rejected';

export interface FruitDetection {
  id: string;
  name: FruitName;
  color: FruitColor;
  weight: number;        // grams
  grade: FruitGrade;
  confidence: number;    // 0–100
  timestamp: string;     // ISO string
  imageUrl?: string;
  result: SortResult;
}

export interface CurrentFruit {
  name: FruitName;
  color: FruitColor;
  weight: number;
  grade: FruitGrade;
  confidence: number;
  timestamp: string;
  imageUrl?: string;
}

// ─── Statistics ──────────────────────────────────────────────────────────────
export interface Statistics {
  totalProcessed: number;
  accepted: number;
  rejected: number;
  accuracy: number;      // 0–100
  todayProcessed: number;
  avgWeight: number;
  sessionStart: string;
}

// ─── History ─────────────────────────────────────────────────────────────────
export interface HistoryEntry extends FruitDetection {
  sessionId: string;
}

// ─── Firebase Machine Node ───────────────────────────────────────────────────
export interface MachineData {
  status: ComponentStatus;
  currentFruit: CurrentFruit | null;
  statistics: Statistics;
  lastUpdated: string;
}

// ─── Chart Data ──────────────────────────────────────────────────────────────
export interface ChartDataPoint {
  time: string;
  accepted: number;
  rejected: number;
  total: number;
}

export interface FruitDistribution {
  name: FruitName;
  count: number;
  percentage: number;
}

// ─── Digital Twin (Animation State, no Firebase) ─────────────────────────────
export type AnimPhase =
  | 'idle'
  | 'spawn'
  | 'convey-to-camera'
  | 'camera-scan'
  | 'convey-to-weight'
  | 'weight-measure'
  | 'convey-to-color'
  | 'color-scan'
  | 'convey-to-servo'
  | 'servo-sort'
  | 'fall-to-bin'
  | 'bounce'
  | 'fade-out';

export interface AnimState {
  phase: AnimPhase;
  fruitPos: [number, number, number];
  fruitVisible: boolean;
  fruitColor: string;
  servoAngle: number;           // radians
  weightPlatformY: number;      // offset
  colorSensorGlow: number;      // 0–1
  cameraFlash: number;          // 0–1
  targetBin: 'accepted' | 'rejected';
  progress: number;             // 0–1 within phase
}

// ─── Nav Link ─────────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  path: string;
}

// ─── Pagination ───────────────────────────────────────────────────────────────
export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
}
