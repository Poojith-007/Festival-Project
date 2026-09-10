import { db } from './firebase/admin.js';

if (!db) {
  throw new Error('Firebase Admin is not configured. Copy backend/.env.example to backend/.env and provide service-account values before seeding.');
}

const batch = db.batch();
const now = new Date();

batch.set(db.collection('festival').doc('main'), {
  name: 'Sri Vinayaka Chavithi Mahotsavam',
  nameTelugu: 'శ్రీ వినాయక చవితి మహోత్సవాలు',
  year: 2026,
  villageName: 'Suryaraopet',
  status: 'upcoming',
  currentDay: 1,
  totalDays: 9,
  startDate: '2026-09-14',
  endDate: '2026-09-22',
  updatedAt: now,
});

batch.set(db.collection('settings').doc('finance'), {
  donations: 20000,
  expenses: 10000,
  updatedAt: now,
});

for (let dayNumber = 1; dayNumber <= 9; dayNumber += 1) {
  const dayId = `day-${dayNumber}`;
  const status = dayNumber === 1 ? 'today' : dayNumber < 1 ? 'completed' : 'upcoming';
  batch.set(db.collection('days').doc(dayId), {
    dayNumber,
    title: dayNumber === 9 ? 'Maha Nimajjanam' : `Festival Day ${dayNumber}`,
    titleTelugu: dayNumber === 9 ? 'మహా నిమజ్జనం' : `${dayNumber}వ రోజు ఉత్సవం`,
    theme: dayNumber === 9 ? 'Procession and immersion' : 'Devotion and community celebration',
    description: 'Festival schedule to be confirmed by the organizing committee.',
    status,
    date: `2026-09-${String(13 + dayNumber).padStart(2, '0')}`,
    createdAt: now,
    updatedAt: now,
  });
}

await batch.commit();
console.log('Seeded festival singleton and finance settings. Add days/events/content through the admin workflow before production use.');
