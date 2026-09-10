import { announcements as defaultAnnouncements } from '../data/announcements';
import type { Announcement } from '../types';

export interface StoredAnnouncement extends Announcement {
  title?: string;
}

export const announcementsStorageKey = 'festival_announcements';
const announcementsEventName = 'festival-announcements-updated';

export function readAnnouncements(): StoredAnnouncement[] {
  if (typeof window === 'undefined') return defaultAnnouncements;

  try {
    const stored = JSON.parse(localStorage.getItem(announcementsStorageKey) || 'null');
    if (Array.isArray(stored)) return stored;
  } catch {
    // Use the bundled announcements when stored data is invalid.
  }

  return defaultAnnouncements;
}

export function announcementsSnapshot(): string {
  return JSON.stringify(readAnnouncements());
}

export function saveAnnouncements(items: StoredAnnouncement[]): void {
  localStorage.setItem(announcementsStorageKey, JSON.stringify(items));
  window.dispatchEvent(new Event(announcementsEventName));
}

export function subscribeToAnnouncements(onChange: () => void): () => void {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === announcementsStorageKey) onChange();
  };
  const handleSameTabUpdate = () => onChange();

  window.addEventListener('storage', handleStorage);
  window.addEventListener(announcementsEventName, handleSameTabUpdate);
  return () => {
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener(announcementsEventName, handleSameTabUpdate);
  };
}
