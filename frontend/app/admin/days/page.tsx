'use client';
import { useState } from 'react';
import { festivalDays } from '../../../data/days';
import { doc, serverTimestamp, writeBatch } from 'firebase/firestore';
import { auth, db, isFirebaseConfigured } from '../../../lib/firebase/client';
import { createLiveEvent, deleteLiveEvent, isApiConfigured, updateLiveEvent } from '../../../lib/services/api';
import { useAdminAuth } from '../../../context/AdminAuthContext';

export default function AdminDaysPage() {
  const [days] = useState(festivalDays);
  const [savingDay, setSavingDay] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [editingDayId, setEditingDayId] = useState<string | null>(null);
  const [eventName, setEventName] = useState('');
  const [eventTime, setEventTime] = useState('');
  const { user } = useAdminAuth();

  const handleStatusChange = async (dayId: string, value: string) => {
    const selectedDay = days.find((day) => day.id === dayId);
    if (!selectedDay) return;
    setSavingDay(dayId);
    setMessage('');

    if (!isFirebaseConfigured || !auth?.currentUser || !db) {
      setMessage('Firebase is not configured. Day changes were not saved.');
      setSavingDay(null);
      return;
    }

    try {
      const firestore = db;
      const batch = writeBatch(firestore);
      const nextStatus = value === 'current' ? 'today' : value;
      days.forEach((day) => {
        const status = day.id === dayId ? nextStatus : day.dayNumber < selectedDay.dayNumber ? 'completed' : 'upcoming';
        batch.set(doc(firestore, 'days', day.id), { status, updatedAt: serverTimestamp() }, { merge: true });
      });
      batch.set(doc(firestore, 'festival', 'main'), { currentDay: selectedDay.dayNumber, updatedAt: serverTimestamp() }, { merge: true });
      await batch.commit();
      setMessage(`Day ${selectedDay.dayNumber} is now the current live day.`);
    } catch {
      setMessage('Day status could not be saved. Check your admin permissions.');
    } finally {
      setSavingDay(null);
    }
  };

  const handleAddEvent = async (dayNumber: number) => {
    if (!eventName.trim() || !eventTime.trim() || !user) {
      setMessage('Enter an event name and time after Firebase admin setup is complete.');
      return;
    }
    try {
      if (!isApiConfigured) throw new Error('API is not configured');
      await createLiveEvent({
        dayNumber,
        title: eventName.trim(),
        time: eventTime.trim(),
        sortOrder: 99,
      }, user);
      setEventName('');
      setEventTime('');
      setMessage(`Event added to Day ${dayNumber}.`);
    } catch {
      setMessage('The event could not be added. Check your admin permissions.');
    }
  };

  const handleRenameEvent = async (eventId: string, currentName: string) => {
    const nextName = window.prompt('Event name', currentName)?.trim();
    if (!nextName || !user || !isApiConfigured) return;
    try {
      await updateLiveEvent(eventId, { title: nextName }, user);
      setMessage('Event updated.');
    } catch {
      setMessage('The event could not be updated.');
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    if (!user || !isApiConfigured || !window.confirm('Delete this event?')) return;
    try {
      await deleteLiveEvent(eventId, user);
      setMessage('Event deleted.');
    } catch {
      setMessage('The event could not be deleted.');
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-[#2D1B11] mb-6">Manage Days</h1>
      <div className="bg-white rounded-xl shadow-sm border border-[#E8B973]/30 overflow-hidden">
        {days.map((day) => (
          <div key={day.id} className="p-4 border-b border-[#E8B973]/20 flex items-center justify-between hover:bg-[#FFF9F0]/50">
            <div>
              <h3 className="font-bold text-[#2D1B11]">Day {day.dayNumber}: {day.title}</h3>
              <p className="text-sm text-[#2D1B11]/60">{day.events.length} Schedule Items</p>
            </div>
            <div className="flex items-center gap-3">
              <select className="border border-[#E8B973]/50 rounded-lg p-1 text-sm bg-white" defaultValue={day.status} onChange={(event) => void handleStatusChange(day.id, event.target.value)} disabled={savingDay === day.id}>
                <option value="completed">Done</option>
                <option value="current">Live</option>
                <option value="upcoming">Upcoming</option>
              </select>
              <button type="button" onClick={() => setEditingDayId(editingDayId === day.id ? null : day.id)} className="bg-[#E8B973]/20 text-[#F05A0A] px-3 py-1 rounded-lg text-sm font-bold hover:bg-[#E8B973]/30">Edit</button>
            </div>
            {editingDayId === day.id && (
              <div className="mt-4 w-full border-t border-[#E8B973]/20 pt-4">
                <div className="space-y-2">
                  {day.events.map((event) => (
                    <div key={event.id} className="flex items-center gap-2 text-sm">
                      <span className="w-24 text-[#F05A0A] font-bold">{event.time}</span>
                      <span className="flex-1">{event.name}</span>
                      <button type="button" onClick={() => void handleRenameEvent(event.id, event.name)} className="text-xs font-bold text-[#F05A0A]">Rename</button>
                      <button type="button" onClick={() => void handleDeleteEvent(event.id)} className="text-xs font-bold text-red-600">Delete</button>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <input value={eventTime} onChange={(event) => setEventTime(event.target.value)} placeholder="07:00 PM" className="rounded-lg border border-[#E8B973]/50 p-2 text-sm" />
                  <input value={eventName} onChange={(event) => setEventName(event.target.value)} placeholder="Event name" className="min-w-48 flex-1 rounded-lg border border-[#E8B973]/50 p-2 text-sm" />
                  <button type="button" onClick={() => void handleAddEvent(day.dayNumber)} className="rounded-lg bg-[#F05A0A] px-3 py-2 text-sm font-bold text-white">Add Event</button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {message && <p className="mt-4 text-sm font-semibold text-[#F05A0A]">{message}</p>}
    </div>
  );
}
