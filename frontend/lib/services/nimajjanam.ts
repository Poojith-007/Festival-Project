import { doc, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db, isFirebaseConfigured } from '../firebase/client';

export function useProcessionStartAt(): number | null {
  const [target, setTarget] = useState<number | null>(null);

  useEffect(() => {
    if (!isFirebaseConfigured || !db) return;
    const unsubscribe = onSnapshot(doc(db, 'settings', 'nimajjanam'), (snapshot) => {
      const value = snapshot.data()?.processionStartAt;
      if (typeof value === 'number') setTarget(value);
      else if (value?.toMillis) setTarget(value.toMillis());
      else if (typeof value === 'string') {
        const parsed = Date.parse(value);
        setTarget(Number.isNaN(parsed) ? null : parsed);
      } else setTarget(null);
    }, () => setTarget(null));
    return unsubscribe;
  }, []);

  return target;
}

export function useProcessionCountdown(target: number | null): { hrs: number; min: number; sec: number } | null {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (!target) return;

    const update = () => {
      setNow(Date.now());
    };

    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, [target]);

  if (!target) return null;
  const totalSeconds = Math.floor(Math.max(0, target - now) / 1000);
  return {
    hrs: Math.floor(totalSeconds / 3600),
    min: Math.floor((totalSeconds % 3600) / 60),
    sec: totalSeconds % 60,
  };
}
