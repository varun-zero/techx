export interface CheckpointCoord {
  x: number; // percentage 0 - 100
  y: number; // percentage 0 - 100
}

export interface ExpeditionLabConfig {
  labId: string;
  sourceLab: string;
  name: string;
  title: string;
  description: string;
  mapImage: string;
  labImage: string;
  fragmentId: number;
  fragmentName: string;
  fragmentImage: string;
  checkpoints: Record<string, CheckpointCoord>;
}

export const expeditionLabs: Record<string, ExpeditionLabConfig> = {
  a: {
    labId: 'a',
    sourceLab: 'a',
    name: 'CHAPTER 01',
    title: "KING'S BAY",
    description: 'Uncover lost technological blueprints, wireless relays, and early hardware prototypes.',
    mapImage: '/assets/uncharted/world-map.jpg',
    labImage: '/assets/uncharted/world-map.jpg',
    fragmentId: 1,
    fragmentName: "FRAGMENT I — KING'S BAY MAP",
    fragmentImage: '/assets/uncharted/world-map.jpg',
    checkpoints: {
      a1: { x: 25.0, y: 38.0 }, // Trueconnect.jio (Americas North)
      a2: { x: 34.0, y: 62.0 }, // Drone (Americas South)
      a3: { x: 60.0, y: 32.0 }, // Samsung Ecosystem (Europe)
      a4: { x: 64.0, y: 48.0 }, // IP CAMERA (Africa)
      a5: { x: 78.0, y: 44.0 }, // 100 Billion Tech (India/Asia)
      a6: { x: 88.0, y: 52.0 }, // VSCode (East Asia / Japan)
      a7: { x: 50.0, y: 80.0 }, // Temperature Calibrator (South Compass)
    },
  },
  c: {
    labId: 'c',
    sourceLab: 'c',
    name: 'CHAPTER 02',
    title: 'LIBERTALIA',
    description: 'Explore ongoing hardware inventions, IoT telemetry, and smart home ecosystems.',
    mapImage: '/assets/uncharted/world-map.jpg',
    labImage: '/assets/uncharted/world-map.jpg',
    fragmentId: 2,
    fragmentName: 'FRAGMENT II — LIBERTALIA SEAL',
    fragmentImage: '/assets/uncharted/world-map.jpg',
    checkpoints: {
      c1: { x: 22.0, y: 32.0 }, // SimilaCure
      c2: { x: 30.0, y: 55.0 }, // Allotrak
      c3: { x: 42.0, y: 42.0 }, // Reliance Samarth
      c4: { x: 58.0, y: 30.0 }, // Video Door Phone
      c5: { x: 65.0, y: 52.0 }, // Motherboard Full Setup Raw - 1
      c6: { x: 76.0, y: 38.0 }, // Dial Club
      c7: { x: 84.0, y: 58.0 }, // The Hobby Tribe
      c8: { x: 50.0, y: 78.0 }, // Copilot
      c9: { x: 70.0, y: 70.0 }, // IOT Monitoring
    },
  },
  d: {
    labId: 'd',
    sourceLab: 'd',
    name: 'CHAPTER 03',
    title: 'NEW DEVON',
    description: 'Venture deep into high-security AI algorithms, neural tools, and experimental software.',
    mapImage: '/assets/uncharted/world-map.jpg',
    labImage: '/assets/uncharted/world-map.jpg',
    fragmentId: 3,
    fragmentName: 'FRAGMENT III — NEW DEVON KEYSTONE',
    fragmentImage: '/assets/uncharted/world-map.jpg',
    checkpoints: {
      d1: { x: 20.0, y: 28.0 }, // DND Services
      d2: { x: 32.0, y: 48.0 }, // Her Circle
      d3: { x: 40.0, y: 65.0 }, // Optimyz
      d4: { x: 58.0, y: 28.0 }, // RDiscovery
      d5: { x: 64.0, y: 48.0 }, // PaperPal
      d6: { x: 76.0, y: 36.0 }, // MDVR Camera Shivsahi
      d7: { x: 82.0, y: 55.0 }, // Motherboard Full Setup Raw - 2
      d8: { x: 88.0, y: 72.0 }, // OSM
      d9: { x: 50.0, y: 82.0 }, // Apple Ecosystem
      d10: { x: 68.0, y: 75.0 }, // EDQuest
    },
  },
};

export const comicAssets = {
  sky: '/assets/uncharted/intro-sky.webp',
  plane: '/assets/uncharted/plane.webp',
  jump: '/assets/uncharted/jump.webp',
  fall: '/assets/uncharted/fall.webp',
  mapFragment: '/assets/uncharted/map-fragment.webp',
  compass: '/assets/uncharted/compass.webp',
  key: '/assets/uncharted/key.webp',
};

export function getSubmittedFeedbackForUser(email: string): string[] {
  if (typeof window === 'undefined' || !email) return [];
  try {
    const key = `submittedFeedback_${email}`;
    return JSON.parse(localStorage.getItem(key) || '[]');
  } catch {
    return [];
  }
}

export function isLabCompleted(labId: string, email: string): boolean {
  const lab = expeditionLabs[labId];
  if (!lab) return false;
  const submitted = getSubmittedFeedbackForUser(email);
  const labProductIds = Object.keys(lab.checkpoints);
  return labProductIds.every((pid) => submitted.includes(pid));
}

export function getCompletedLabCount(email: string): number {
  return Object.keys(expeditionLabs).filter((labId) => isLabCompleted(labId, email)).length;
}

export function getLabDiscoveryProgress(labId: string, email: string): { completed: number; total: number } {
  const lab = expeditionLabs[labId];
  if (!lab) return { completed: 0, total: 0 };
  const submitted = getSubmittedFeedbackForUser(email);
  const labProductIds = Object.keys(lab.checkpoints);
  const completed = labProductIds.filter((pid) => submitted.includes(pid)).length;
  return { completed, total: labProductIds.length };
}
