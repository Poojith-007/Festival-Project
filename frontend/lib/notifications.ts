import { getMessaging, getToken, isSupported, onMessage } from 'firebase/messaging';
import { app, isFirebaseConfigured } from './firebase/client';

export async function requestPushToken(): Promise<{ token: string | null; reason?: string }> {
  if (!isFirebaseConfigured || !app) return { token: null, reason: 'Firebase messaging is not configured.' };
  if (!('Notification' in window) || !('serviceWorker' in navigator)) return { token: null, reason: 'Push notifications are not supported in this browser.' };
  if (!process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY) return { token: null, reason: 'A Firebase Web Push VAPID key is not configured.' };
  if (!(await isSupported())) return { token: null, reason: 'Firebase messaging is not supported in this browser.' };

  const registration = await navigator.serviceWorker.ready;
  const messaging = getMessaging(app);
  const token = await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    serviceWorkerRegistration: registration,
  });
  return { token };
}

export async function listenForForegroundMessages(onNotification: (title: string, body: string) => void): Promise<() => void> {
  if (!isFirebaseConfigured || !app || !(await isSupported())) return () => {};
  return onMessage(getMessaging(app), (payload) => {
    onNotification(payload.notification?.title || 'Festival update', payload.notification?.body || 'A new festival update is available.');
  });
}
