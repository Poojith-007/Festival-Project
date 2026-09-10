import type { NextFunction, Request, Response } from 'express';
import { auth, db } from '../firebase/admin.js';

export interface AuthenticatedRequest extends Request {
  user?: { uid: string; email?: string };
}

export async function requireAdmin(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  if (!auth || !db) {
    res.status(503).json({ success: false, error: { code: 'FIREBASE_NOT_CONFIGURED', message: 'Firebase Admin is not configured.' } });
    return;
  }

  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ success: false, error: { code: 'UNAUTHENTICATED', message: 'A Firebase ID token is required.' } });
    return;
  }

  try {
    const decoded = await auth.verifyIdToken(header.slice('Bearer '.length));
    const adminSnapshot = await db.collection('adminUsers').doc(decoded.uid).get();
    const admin = adminSnapshot.data();

    if (!adminSnapshot.exists || admin?.role !== 'admin' || admin.active !== true) {
      res.status(403).json({ success: false, error: { code: 'FORBIDDEN', message: 'You are not authorized to perform this action.' } });
      return;
    }

    req.user = { uid: decoded.uid, email: decoded.email };
    next();
  } catch {
    res.status(401).json({ success: false, error: { code: 'INVALID_TOKEN', message: 'The Firebase ID token is invalid or expired.' } });
  }
}
