import type { User } from 'firebase/auth';
import { isFirebaseConfigured } from '../firebase/client';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const isApiConfigured = Boolean(apiBaseUrl);

async function request<T>(path: string, options: RequestInit = {}, user?: User | null): Promise<T> {
  if (!apiBaseUrl) throw new Error('NEXT_PUBLIC_API_BASE_URL is not configured.');

  const headers = new Headers(options.headers);
  headers.set('Content-Type', 'application/json');
  if (user && isFirebaseConfigured) {
    headers.set('Authorization', `Bearer ${await user.getIdToken()}`);
  }

  const response = await fetch(`${apiBaseUrl}${path}`, { ...options, headers });
  const body = await response.json() as { success: boolean; data?: T; error?: { message?: string } };
  if (!response.ok || !body.success) throw new Error(body.error?.message || 'The request failed.');
  return body.data as T;
}

export function fetchLiveFinance() {
  return request<{ donations: number; expenses: number }>('/api/finance');
}

export function saveLiveFinance(summary: { donations: number; expenses: number }, user: User) {
  return request('/api/admin/finance', { method: 'PUT', body: JSON.stringify(summary) }, user);
}

export function publishLiveAnnouncement(payload: Record<string, unknown>, user: User) {
  return request('/api/admin/announcements', { method: 'POST', body: JSON.stringify(payload) }, user);
}

export function fetchLiveAnnouncements() {
  return request<Array<Record<string, unknown>>>('/api/announcements');
}

export function createLiveEvent(payload: Record<string, unknown>, user: User) {
  return request('/api/admin/events', { method: 'POST', body: JSON.stringify(payload) }, user);
}

export function updateLiveEvent(eventId: string, payload: Record<string, unknown>, user: User) {
  return request(`/api/admin/events/${eventId}`, { method: 'PUT', body: JSON.stringify(payload) }, user);
}

export function deleteLiveEvent(eventId: string, user: User) {
  return request(`/api/admin/events/${eventId}`, { method: 'DELETE' }, user);
}
