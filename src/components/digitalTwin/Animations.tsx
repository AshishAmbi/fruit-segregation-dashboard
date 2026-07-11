import { useRef, useState, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import { SCENE, ANIM, FRUIT_PALETTE } from './constants';

// ─── Easing functions ─────────────────────────────────────────────────────────
function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}
function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}
function easeIn(t: number): number {
  return t * t * t;
}
function bounce(t: number): number {
  if (t < 0.36) return 7.5625 * t * t;
  if (t < 0.73) { t -= 0.545; return 7.5625 * t * t + 0.75; }
  if (t < 0.9)  { t -= 0.818; return 7.5625 * t * t + 0.9375; }
  t -= 0.955;
  return 7.5625 * t * t + 0.984375;
}

// ─── Animation phases in order ────────────────────────────────────────────────
type Phase =
  | 'spawn'
  | 'to-camera'
  | 'camera-scan'
  | 'to-weight'
  | 'weight-measure'
  | 'to-color'
  | 'color-scan'
  | 'to-servo'
  | 'servo-sort'
  | 'fall'
  | 'bounce-anim'
  | 'fade'
  | 'pause';

const PHASE_DURATIONS: Record<Phase, number> = {
  'spawn':         ANIM.SPAWN,
  'to-camera':     ANIM.TO_CAMERA,
  'camera-scan':   ANIM.CAMERA_SCAN,
  'to-weight':     ANIM.TO_WEIGHT,
  'weight-measure': ANIM.WEIGHT,
  'to-color':      ANIM.TO_COLOR,
  'color-scan':    ANIM.COLOR_SCAN,
  'to-servo':      ANIM.TO_SERVO,
  'servo-sort':    ANIM.SERVO,
  'fall':          ANIM.FALL,
  'bounce-anim':   ANIM.BOUNCE,
  'fade':          ANIM.FADE,
  'pause':         ANIM.PAUSE,
};

const PHASE_ORDER: Phase[] = [
  'spawn', 'to-camera', 'camera-scan',
  'to-weight', 'weight-measure',
  'to-color', 'color-scan',
  'to-servo', 'servo-sort',
  'fall', 'bounce-anim', 'fade', 'pause',
];

// ─── Lerp helper ──────────────────────────────────────────────────────────────
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// ─── Exported state for rendering ─────────────────────────────────────────────
export interface TwinAnimState {
  fruitPos:           [number, number, number];
  fruitVisible:       boolean;
  fruitColor:         string;
  fruitEmissive:      string;
  fruitOpacity:       number;
  fruitScale:         number;
  fruitWobble:        number;
  cameraFlash:        number;   // 0–1
  weightDepression:   number;   // 0–1
  colorGlow:          number;   // 0–1
  servoAngle:         number;   // radians
  targetBin:          'accepted' | 'rejected';
  phase:              Phase;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useTwinAnimation(): TwinAnimState {
  const phaseRef      = useRef<Phase>('spawn');
  const phaseTimeRef  = useRef(0);
  const fruitIdx      = useRef(0);
  const isAccepted    = useRef(true);

  // Pick a random fruit at spawn
  const pickFruit = useCallback(() => {
    fruitIdx.current  = Math.floor(Math.random() * FRUIT_PALETTE.length);
    isAccepted.current = Math.random() > 0.2; // 80% accept rate
  }, []);

  // Initial call
  const initialized = useRef(false);
  if (!initialized.current) {
    initialized.current = true;
    pickFruit();
  }

  const [state, setState] = useState<TwinAnimState>(() => ({
    fruitPos:         [SCENE.SPAWN_X, SCENE.BELT_Y + 0.1, 0],
    fruitVisible:     false,
    fruitColor:       FRUIT_PALETTE[0].color,
    fruitEmissive:    FRUIT_PALETTE[0].emissive,
    fruitOpacity:     1,
    fruitScale:       1,
    fruitWobble:      0,
    cameraFlash:      0,
    weightDepression: 0,
    colorGlow:        0,
    servoAngle:       0,
    targetBin:        'accepted',
    phase:            'spawn',
  }));

  useFrame((_, delta) => {
    phaseTimeRef.current += delta;
    const phase    = phaseRef.current;
    const duration = PHASE_DURATIONS[phase];
    const t        = Math.min(phaseTimeRef.current / duration, 1);
    const palette  = FRUIT_PALETTE[fruitIdx.current];
    const accepted = isAccepted.current;

    let fruitPos:           [number, number, number] = [SCENE.SPAWN_X, SCENE.BELT_Y + 0.1, 0];
    let fruitVisible        = true;
    let fruitOpacity        = 1;
    let fruitScale          = 1;
    let fruitWobble         = 0;
    let cameraFlash         = 0;
    let weightDepression    = 0;
    let colorGlow           = 0;
    let servoAngle          = 0;
    const beltY             = SCENE.BELT_Y + 0.1;

    switch (phase) {
      case 'spawn':
        fruitPos    = [SCENE.SPAWN_X, beltY + lerp(-0.3, 0, easeOut(t)), 0];
        fruitOpacity = easeOut(t);
        fruitScale   = lerp(0.3, 1, easeOut(t));
        fruitVisible = true;
        break;

      case 'to-camera':
        fruitPos  = [lerp(SCENE.SPAWN_X, SCENE.CAMERA_X, easeInOut(t)), beltY, 0];
        fruitWobble = 0.5;
        break;

      case 'camera-scan':
        fruitPos    = [SCENE.CAMERA_X, beltY, 0];
        cameraFlash = t < 0.25 ? easeOut(t / 0.25) : t < 0.45 ? 1 - easeIn((t - 0.25) / 0.2) : 0;
        fruitWobble = 0;
        break;

      case 'to-weight':
        fruitPos  = [lerp(SCENE.CAMERA_X, SCENE.WEIGHT_X, easeInOut(t)), beltY, 0];
        fruitWobble = 0.5;
        break;

      case 'weight-measure':
        fruitPos  = [SCENE.WEIGHT_X, beltY, 0];
        weightDepression = t < 0.4
          ? easeOut(t / 0.4)
          : t < 0.75
          ? 1
          : lerp(1, 0, easeOut((t - 0.75) / 0.25));
        break;

      case 'to-color':
        fruitPos  = [lerp(SCENE.WEIGHT_X, SCENE.COLOR_X, easeInOut(t)), beltY, 0];
        fruitWobble = 0.5;
        break;

      case 'color-scan':
        fruitPos  = [SCENE.COLOR_X, beltY, 0];
        colorGlow = t < 0.3 ? easeOut(t / 0.3) : t < 0.7 ? 1 : lerp(1, 0, (t - 0.7) / 0.3);
        break;

      case 'to-servo':
        fruitPos    = [lerp(SCENE.COLOR_X, SCENE.SERVO_X, easeInOut(t)), beltY, 0];
        fruitWobble = 0.5;
        break;

      case 'servo-sort':
        fruitPos   = [SCENE.SERVO_X, beltY, 0];
        servoAngle = accepted
          ? 0
          : lerp(0, Math.PI * 0.55, easeInOut(Math.min(t / 0.5, 1)));
        break;

      case 'fall': {
        const targetZ = accepted ? SCENE.BIN_ACCEPT_Z : SCENE.BIN_REJECT_Z;
        const startX  = SCENE.SERVO_X;
        const endX    = accepted ? SCENE.BIN_ACCEPT_X : SCENE.BIN_REJECT_X;
        const et = easeIn(t);
        fruitPos = [
          lerp(startX, endX, t),
          beltY - et * (beltY - SCENE.BIN_Y - 0.4),
          lerp(0, targetZ, easeInOut(t)),
        ];
        servoAngle = accepted ? 0 : Math.PI * 0.55;
        break;
      }

      case 'bounce-anim': {
        const targetX = accepted ? SCENE.BIN_ACCEPT_X : SCENE.BIN_REJECT_X;
        const targetZ = accepted ? SCENE.BIN_ACCEPT_Z : SCENE.BIN_REJECT_Z;
        const bounceY = (1 - bounce(t)) * 0.12;
        fruitPos   = [targetX, SCENE.BIN_Y + 0.12 + bounceY, targetZ];
        servoAngle = accepted
          ? 0
          : lerp(Math.PI * 0.55, 0, easeOut(t)); // servo returns
        break;
      }

      case 'fade': {
        const targetX = accepted ? SCENE.BIN_ACCEPT_X : SCENE.BIN_REJECT_X;
        const targetZ = accepted ? SCENE.BIN_ACCEPT_Z : SCENE.BIN_REJECT_Z;
        fruitPos    = [targetX, SCENE.BIN_Y + 0.12, targetZ];
        fruitOpacity = 1 - t;
        break;
      }

      case 'pause':
        fruitVisible = false;
        fruitPos     = [SCENE.SPAWN_X, beltY, 0];
        break;
    }

    // Advance phase
    if (t >= 1) {
      const idx  = PHASE_ORDER.indexOf(phase);
      const next = PHASE_ORDER[(idx + 1) % PHASE_ORDER.length] as Phase;
      phaseRef.current     = next;
      phaseTimeRef.current = 0;
      if (next === 'spawn') pickFruit();
    }

    setState({
      fruitPos,
      fruitVisible,
      fruitColor:       palette.color,
      fruitEmissive:    palette.emissive,
      fruitOpacity,
      fruitScale,
      fruitWobble,
      cameraFlash,
      weightDepression,
      colorGlow,
      servoAngle,
      targetBin: accepted ? 'accepted' : 'rejected',
      phase,
    });
  });

  return state;
}
