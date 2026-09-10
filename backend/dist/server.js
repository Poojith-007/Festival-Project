import express from 'express';
import cors from 'cors';
import { env, hasFirebaseAdminConfig } from './config/env.js';
import { db } from './firebase/admin.js';
import { requireAdmin } from './middleware/auth.js';
const app = express();
app.use(cors({ origin: env.FRONTEND_ORIGIN }));
app.use(express.json({ limit: '1mb' }));
app.get('/health', (_req, res) => {
    res.json({ success: true, firebaseConfigured: hasFirebaseAdminConfig });
});
app.get('/api/festival', async (_req, res) => {
    if (!db) {
        res.status(503).json({ success: false, error: { code: 'FIREBASE_NOT_CONFIGURED', message: 'Live festival data is not configured.' } });
        return;
    }
    const snapshot = await db.collection('festival').doc('main').get();
    res.json({ success: true, data: snapshot.exists ? snapshot.data() : null });
});
app.get('/api/days', async (_req, res) => {
    if (!db) {
        res.status(503).json({ success: false, error: { code: 'FIREBASE_NOT_CONFIGURED', message: 'Live festival data is not configured.' } });
        return;
    }
    const snapshot = await db.collection('days').orderBy('dayNumber').get();
    res.json({ success: true, data: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) });
});
app.get('/api/announcements', async (_req, res) => {
    if (!db) {
        res.status(503).json({ success: false, error: { code: 'FIREBASE_NOT_CONFIGURED', message: 'Live announcements are not configured.' } });
        return;
    }
    const snapshot = await db.collection('announcements')
        .where('published', '==', true)
        .orderBy('createdAt', 'desc')
        .limit(50)
        .get();
    res.json({ success: true, data: snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) });
});
app.get('/api/finance', async (_req, res) => {
    if (!db) {
        res.status(503).json({ success: false, error: { code: 'FIREBASE_NOT_CONFIGURED', message: 'Live finance data is not configured.' } });
        return;
    }
    const snapshot = await db.collection('settings').doc('finance').get();
    res.json({ success: true, data: snapshot.exists ? snapshot.data() : { donations: 20000, expenses: 10000 } });
});
app.use('/api/admin', requireAdmin);
app.put('/api/admin/festival', async (req, res) => {
    if (!db) {
        res.status(503).json({ success: false, error: { code: 'FIREBASE_NOT_CONFIGURED', message: 'Firebase Admin is not configured.' } });
        return;
    }
    await db.collection('festival').doc('main').set({ ...req.body, updatedBy: req.user?.uid, updatedAt: new Date() }, { merge: true });
    res.json({ success: true });
});
app.put('/api/admin/finance', async (req, res) => {
    if (!db) {
        res.status(503).json({ success: false, error: { code: 'FIREBASE_NOT_CONFIGURED', message: 'Firebase Admin is not configured.' } });
        return;
    }
    const donations = Number(req.body.donations);
    const expenses = Number(req.body.expenses);
    if (!Number.isFinite(donations) || donations < 0 || !Number.isFinite(expenses) || expenses < 0) {
        res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'Donations and expenses must be non-negative numbers.' } });
        return;
    }
    await db.collection('settings').doc('finance').set({ donations, expenses, updatedBy: req.user?.uid, updatedAt: new Date() });
    res.json({ success: true, data: { donations, expenses } });
});
app.post('/api/admin/announcements', async (req, res) => {
    if (!db) {
        res.status(503).json({ success: false, error: { code: 'FIREBASE_NOT_CONFIGURED', message: 'Firebase Admin is not configured.' } });
        return;
    }
    const { title, message, priority, dayNumber, published = true } = req.body;
    if (typeof title !== 'string' || typeof message !== 'string' || !['normal', 'important', 'emergency'].includes(priority)) {
        res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'Title, message, and valid priority are required.' } });
        return;
    }
    const reference = await db.collection('announcements').add({ title, message, priority, dayNumber: dayNumber ?? null, published, createdBy: req.user?.uid, createdAt: new Date(), updatedAt: new Date() });
    res.status(201).json({ success: true, data: { id: reference.id } });
});
app.post('/api/admin/events', async (req, res) => {
    if (!db) {
        res.status(503).json({ success: false, error: { code: 'FIREBASE_NOT_CONFIGURED', message: 'Firebase Admin is not configured.' } });
        return;
    }
    const { dayNumber, title, time, description = '', sortOrder = 0 } = req.body;
    if (!Number.isInteger(Number(dayNumber)) || Number(dayNumber) < 1 || typeof title !== 'string' || !title.trim() || typeof time !== 'string' || !time.trim()) {
        res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'Day number, title, and time are required.' } });
        return;
    }
    const reference = await db.collection('events').add({ dayNumber: Number(dayNumber), title: title.trim(), time: time.trim(), description, sortOrder: Number(sortOrder) || 0, createdBy: req.user?.uid, createdAt: new Date(), updatedAt: new Date() });
    res.status(201).json({ success: true, data: { id: reference.id } });
});
app.put('/api/admin/events/:eventId', async (req, res) => {
    if (!db) {
        res.status(503).json({ success: false, error: { code: 'FIREBASE_NOT_CONFIGURED', message: 'Firebase Admin is not configured.' } });
        return;
    }
    const eventId = typeof req.params.eventId === 'string' ? req.params.eventId : '';
    const { title, time, description, sortOrder } = req.body;
    if (!eventId) {
        res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'Event ID is required.' } });
        return;
    }
    if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
        res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'Event title must be a non-empty string.' } });
        return;
    }
    await db.collection('events').doc(eventId).set({ ...(title === undefined ? {} : { title: title.trim() }), ...(time === undefined ? {} : { time }), ...(description === undefined ? {} : { description }), ...(sortOrder === undefined ? {} : { sortOrder: Number(sortOrder) || 0 }), updatedBy: req.user?.uid, updatedAt: new Date() }, { merge: true });
    res.json({ success: true });
});
app.delete('/api/admin/events/:eventId', async (req, res) => {
    if (!db) {
        res.status(503).json({ success: false, error: { code: 'FIREBASE_NOT_CONFIGURED', message: 'Firebase Admin is not configured.' } });
        return;
    }
    const eventId = typeof req.params.eventId === 'string' ? req.params.eventId : '';
    if (!eventId) {
        res.status(400).json({ success: false, error: { code: 'INVALID_INPUT', message: 'Event ID is required.' } });
        return;
    }
    await db.collection('events').doc(eventId).delete();
    res.json({ success: true });
});
app.listen(env.PORT, () => {
    console.log(`Festival backend listening on port ${env.PORT}`);
    if (!hasFirebaseAdminConfig)
        console.warn('Firebase Admin is not configured; protected data operations are disabled.');
});
