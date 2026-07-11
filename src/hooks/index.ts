import { useState, useEffect } from 'react';
import { isFirebaseConfigured } from '@/firebase/config';
import {
  onStatusChange,
  onCurrentFruitChange,
  onStatisticsChange,
  onHistoryChange,
} from '@/firebase/service';
import {
  MOCK_STATUS,
  MOCK_CURRENT_FRUIT,
  MOCK_STATISTICS,
  MOCK_HISTORY,
} from '@/constants';
import type { ComponentStatus, CurrentFruit, Statistics, HistoryEntry } from '@/types';

// ─── useMachineStatus ─────────────────────────────────────────────────────────
export function useMachineStatus() {
  const [status, setStatus] = useState<ComponentStatus>(MOCK_STATUS);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured()) return;
    setIsLive(true);
    return onStatusChange(setStatus);
  }, []);

  return { status, isLive };
}

// ─── useCurrentFruit ─────────────────────────────────────────────────────────
export function useCurrentFruit() {
  const [fruit, setFruit] = useState<CurrentFruit | null>(MOCK_CURRENT_FRUIT);
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured()) return;
    setIsLive(true);
    return onCurrentFruitChange(setFruit);
  }, []);

  return { fruit, isLive };
}

// ─── useStatistics ────────────────────────────────────────────────────────────
export function useStatistics() {
  const [stats, setStats] = useState<Statistics>(MOCK_STATISTICS);
  const [isLive, setIsLive]  = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured()) return;
    setIsLive(true);
    return onStatisticsChange(setStats);
  }, []);

  return { stats, isLive };
}

// ─── useFruitHistory ─────────────────────────────────────────────────────────
export function useFruitHistory(limit = 100) {
  const [history, setHistory]  = useState<HistoryEntry[]>(MOCK_HISTORY);
  const [isLive, setIsLive]    = useState(false);
  const [loading, setLoading]  = useState(false);

  useEffect(() => {
    if (!isFirebaseConfigured()) return;
    setIsLive(true);
    setLoading(true);
    const unsubscribe = onHistoryChange((entries) => {
      setHistory(entries);
      setLoading(false);
    }, limit);
    return unsubscribe;
  }, [limit]);

  return { history, isLive, loading };
}

// ─── useFirebaseStatus ────────────────────────────────────────────────────────
export function useFirebaseStatus() {
  return {
    configured: isFirebaseConfigured(),
    message: isFirebaseConfigured()
      ? 'Connected to Firebase Realtime Database'
      : 'Firebase not configured — showing mock data. Add credentials to .env.local',
  };
}
