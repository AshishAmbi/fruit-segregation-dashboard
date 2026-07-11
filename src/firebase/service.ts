import { ref, onValue, off, push, query, orderByChild, limitToLast, type DatabaseReference } from 'firebase/database';
import { ref as storageRef, getDownloadURL, listAll } from 'firebase/storage';
import { database, storage, isFirebaseConfigured } from './config';
import { FB_PATHS } from '@/constants';
import type { ComponentStatus, CurrentFruit, Statistics, HistoryEntry } from '@/types';

// ─── Helpers ──────────────────────────────────────────────────────────────────
function dbRef(path: string): DatabaseReference {
  if (!isFirebaseConfigured()) {
    throw new Error('Firebase is not configured. Add credentials to .env.local');
  }
  return ref(database, path);
}

// ─── Status Listener ──────────────────────────────────────────────────────────
export function onStatusChange(
  callback: (status: ComponentStatus) => void
): () => void {
  const statusRef = dbRef(FB_PATHS.status);
  onValue(statusRef, (snap) => {
    if (snap.exists()) callback(snap.val() as ComponentStatus);
  });
  return () => off(statusRef);
}

// ─── Current Fruit Listener ────────────────────────────────────────────────────
export function onCurrentFruitChange(
  callback: (fruit: CurrentFruit | null) => void
): () => void {
  const fruitRef = dbRef(FB_PATHS.currentFruit);
  onValue(fruitRef, (snap) => {
    callback(snap.exists() ? (snap.val() as CurrentFruit) : null);
  });
  return () => off(fruitRef);
}

// ─── Statistics Listener ──────────────────────────────────────────────────────
export function onStatisticsChange(
  callback: (stats: Statistics) => void
): () => void {
  const statsRef = dbRef(FB_PATHS.statistics);
  onValue(statsRef, (snap) => {
    if (snap.exists()) callback(snap.val() as Statistics);
  });
  return () => off(statsRef);
}

// ─── History Listener (last N entries) ────────────────────────────────────────
export function onHistoryChange(
  callback: (entries: HistoryEntry[]) => void,
  limit = 100
): () => void {
  const histRef  = dbRef(FB_PATHS.history);
  const histQuery = query(histRef, orderByChild('timestamp'), limitToLast(limit));
  onValue(histQuery, (snap) => {
    if (!snap.exists()) { callback([]); return; }
    const entries: HistoryEntry[] = [];
    snap.forEach((child) => {
      entries.push({ id: child.key ?? '', ...child.val() } as HistoryEntry);
    });
    callback(entries.reverse());
  });
  return () => off(histRef);
}

// ─── Write History Entry ──────────────────────────────────────────────────────
export async function pushHistoryEntry(entry: Omit<HistoryEntry, 'id'>): Promise<string> {
  const histRef = dbRef(FB_PATHS.history);
  const result  = await push(histRef, entry);
  return result.key ?? '';
}

// ─── Camera Image URL ─────────────────────────────────────────────────────────
export async function getLatestCameraImageUrl(): Promise<string | null> {
  if (!isFirebaseConfigured()) return null;
  try {
    const imagesRef = storageRef(storage, FB_PATHS.cameraImages);
    const list      = await listAll(imagesRef);
    if (list.items.length === 0) return null;
    const latest    = list.items[list.items.length - 1];
    return await getDownloadURL(latest);
  } catch {
    return null;
  }
}

export async function getCameraImageUrl(filename: string): Promise<string | null> {
  if (!isFirebaseConfigured()) return null;
  try {
    const imgRef = storageRef(storage, `${FB_PATHS.cameraImages}/${filename}`);
    return await getDownloadURL(imgRef);
  } catch {
    return null;
  }
}
