import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { getStorage } from 'firebase-admin/storage';
import { env, hasFirebaseAdminConfig } from '../config/env.js';
let app = null;
let auth = null;
let db = null;
let storage = null;
if (hasFirebaseAdminConfig) {
    app = getApps().length > 0
        ? getApps()[0]
        : initializeApp({
            credential: cert({
                projectId: env.FIREBASE_PROJECT_ID,
                clientEmail: env.FIREBASE_CLIENT_EMAIL,
                privateKey: env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            }),
        });
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
}
export { app, auth, db, storage };
