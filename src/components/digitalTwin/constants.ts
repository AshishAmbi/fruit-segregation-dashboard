// ─── Material Presets ─────────────────────────────────────────────────────────
export const MAT = {
  aluminium: {
    color:     '#8898AA',
    metalness: 0.85,
    roughness: 0.25,
  },
  brushedAluminium: {
    color:     '#9AACBC',
    metalness: 0.9,
    roughness: 0.35,
  },
  steel: {
    color:     '#7A8FA6',
    metalness: 0.95,
    roughness: 0.15,
  },
  rubber: {
    color:     '#1C2833',
    metalness: 0.0,
    roughness: 0.95,
  },
  plastic: {
    color:     '#263348',
    metalness: 0.05,
    roughness: 0.6,
  },
  concrete: {
    color:     '#3D4555',
    metalness: 0.0,
    roughness: 0.9,
  },
  sensorHousing: {
    color:     '#1A2533',
    metalness: 0.2,
    roughness: 0.5,
  },
  led: {
    color:      '#00E5FF',
    emissive:   '#00E5FF',
    emissiveIntensity: 2.0,
    metalness: 0.0,
    roughness: 0.0,
  },
  greenLed: {
    color:      '#22C55E',
    emissive:   '#22C55E',
    emissiveIntensity: 2.0,
    metalness: 0.0,
    roughness: 0.0,
  },
  bin: {
    accepted: { color: '#1A3A2A', metalness: 0.1, roughness: 0.7 },
    rejected: { color: '#3A1A1A', metalness: 0.1, roughness: 0.7 },
  },
} as const;

// ─── Scene geometry constants ──────────────────────────────────────────────────
export const SCENE = {
  CONVEYOR_LENGTH: 8.4,
  CONVEYOR_WIDTH:  0.9,
  BELT_Y:          1.06,
  FRAME_Y:         0.5,
  LEG_HEIGHT:      1.0,
  LEG_Y:          -0.0,

  // X positions along the conveyor
  SPAWN_X:    -3.7,
  CAMERA_X:   -1.8,
  WEIGHT_X:   -0.3,
  COLOR_X:     1.1,
  SERVO_X:     2.7,
  END_X:       4.0,

  // Bins
  BIN_ACCEPT_X:  4.4,
  BIN_ACCEPT_Z: -1.1,
  BIN_REJECT_X:  4.4,
  BIN_REJECT_Z:  1.1,
  BIN_Y:         0.18,

  // Camera stand
  CAM_STAND_X:  -1.8,
  CAM_STAND_H:   1.8,

  // Weight platform
  WEIGHT_PLATFORM_Y: 1.06,
} as const;

// ─── Animation timing (seconds) ───────────────────────────────────────────────
export const ANIM = {
  SPAWN:       0.35,
  TO_CAMERA:   1.6,
  CAMERA_SCAN: 0.9,
  TO_WEIGHT:   1.1,
  WEIGHT:      0.75,
  TO_COLOR:    1.1,
  COLOR_SCAN:  0.65,
  TO_SERVO:    1.3,
  SERVO:       0.85,
  FALL:        0.75,
  BOUNCE:      0.45,
  FADE:        0.4,
  PAUSE:       0.3,

  get TOTAL(): number {
    return (
      this.SPAWN + this.TO_CAMERA + this.CAMERA_SCAN +
      this.TO_WEIGHT + this.WEIGHT +
      this.TO_COLOR + this.COLOR_SCAN +
      this.TO_SERVO + this.SERVO +
      this.FALL + this.BOUNCE + this.FADE + this.PAUSE
    );
  },
} as const;

// ─── Fruit Colors (3D sphere tints) ───────────────────────────────────────────
export const FRUIT_PALETTE = [
  { color: '#DC2626', emissive: '#7F1D1D', name: 'Apple' },
  { color: '#EA580C', emissive: '#7C2D12', name: 'Orange' },
  { color: '#CA8A04', emissive: '#713F12', name: 'Mango' },
  { color: '#16A34A', emissive: '#14532D', name: 'Lime' },
  { color: '#7C3AED', emissive: '#4C1D95', name: 'Grape' },
] as const;
