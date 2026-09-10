import { collection, onSnapshot, orderBy, query, type DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { festivalDays } from '../../data/days';
import type { FestivalDay, FestivalEvent } from '../../types';
import { db, isFirebaseConfigured } from '../firebase/client';

function mapEvent(data: DocumentData, id: string): FestivalEvent {
  return {
    id,
    time: String(data.time || ''),
    name: String(data.title || data.name || ''),
    description: typeof data.description === 'string' ? data.description : undefined,
    icon: typeof data.icon === 'string' ? data.icon : undefined,
  };
}

function mergeLiveDays(dayDocuments: DocumentData[], eventDocuments: DocumentData[]): FestivalDay[] {
  return festivalDays.map((fallbackDay) => {
    const liveDay = dayDocuments.find((item) => Number(item.dayNumber) === fallbackDay.dayNumber);
    const liveEvents = eventDocuments
      .filter((item) => Number(item.dayNumber) === fallbackDay.dayNumber)
      .sort((a, b) => Number(a.sortOrder || 0) - Number(b.sortOrder || 0));

    return liveDay
      ? {
          ...fallbackDay,
          title: String(liveDay.title || fallbackDay.title),
          shortDescription: String(liveDay.description || liveDay.theme || fallbackDay.shortDescription),
          date: String(liveDay.date || fallbackDay.date),
          status: liveDay.status === 'today' ? 'current' : liveDay.status,
          image: typeof liveDay.imageUrl === 'string' ? liveDay.imageUrl : fallbackDay.image,
          announcement: typeof liveDay.announcement === 'string' ? liveDay.announcement : fallbackDay.announcement,
          events: liveEvents.length ? liveEvents.map((event) => mapEvent(event, String(event.id))) : fallbackDay.events,
        }
      : fallbackDay;
  });
}

export function useLiveFestivalDays(): FestivalDay[] {
  const [days, setDays] = useState(festivalDays);

  useEffect(() => {
    if (!isFirebaseConfigured || !db) return;
    const firestore = db;
    const daysQuery = query(collection(firestore, 'days'), orderBy('dayNumber'));
    const eventsQuery = query(collection(firestore, 'events'), orderBy('sortOrder'));
    let liveDays: DocumentData[] = [];
    let liveEvents: DocumentData[] = [];

    const update = () => setDays(mergeLiveDays(liveDays, liveEvents));
    const unsubscribeDays = onSnapshot(daysQuery, (snapshot) => {
      liveDays = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
      update();
    });
    const unsubscribeEvents = onSnapshot(eventsQuery, (snapshot) => {
      liveEvents = snapshot.docs.map((item) => ({ id: item.id, ...item.data() }));
      update();
    });

    return () => {
      unsubscribeDays();
      unsubscribeEvents();
    };
  }, []);

  return days;
}
