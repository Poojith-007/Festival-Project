# Sri Vinayaka Chavithi Mahotsavam 2026

Phase 2 preserves the approved Next.js UI and adds the foundation for Firebase-backed festival data.

## Current Status

Completed in code:

- Firebase modular client initialization with environment checks
- TypeScript Express backend with Firebase Admin initialization
- Public API endpoints for festival, days, announcements, and finance
- Authenticated admin API middleware using Firebase ID tokens and `adminUsers/{uid}` authorization
- Admin login route using Firebase Email/Password authentication
- Firestore and Storage security rules
- Firestore index configuration
- Explicit development seed command
- Public Wallet and Updates hydration from the backend when configured
- Local fallback data when Firebase is not configured
- Firebase Storage gallery upload with Firestore metadata
- Realtime admin gallery metadata list and coordinated deletion
- Firestore-backed single-current-day status updates
- Basic offline application-shell service worker registration
- Realtime Firestore days/events adapter with bundled fallback
- Backend event create/update/delete API
- Timestamp-driven Nimajjanam countdown from `settings/nimajjanam.processionStartAt`
- Optional Firebase Messaging token foundation using a public VAPID key

Still requires manual Firebase setup:

- Firebase project and Web App creation
- Authentication provider and admin user creation
- Firestore and Storage enablement
- `adminUsers/{uid}` authorization document
- Environment values and rules deployment
- Cloud Messaging/VAPID configuration for real push notifications
- `settings/nimajjanam` procession timestamp configuration

## Requirements

- Node.js 20 or newer
- npm
- Firebase project for live data

## Install

```powershell
cd frontend
npm install

cd ../backend
npm install
```

## Local Development Without Firebase

The frontend continues to render its bundled festival content and local browser fallback data:

```powershell
cd frontend
npm run dev
```

The backend can start in configuration-warning mode, but live and admin operations return a clear `FIREBASE_NOT_CONFIGURED` response:

```powershell
cd backend
npm run dev
```

## Firebase Configuration

1. Create a Firebase project.
2. Register a Web App and copy its public configuration.
3. Enable Authentication and the Email/Password provider.
4. Create a Firestore database.
5. Enable Firebase Storage and configure its location/plan.
6. Create an authorized admin account in Authentication.
7. Copy the account UID and create `adminUsers/{uid}` in Firestore:

```json
{
  "email": "admin@example.com",
  "role": "admin",
  "active": true
}
```

8. Copy `frontend/.env.example` to `frontend/.env.local` and fill the `NEXT_PUBLIC_FIREBASE_*` values.
9. Copy `backend/.env.example` to `backend/.env` and fill the Firebase Admin service-account environment values.
10. Deploy rules and indexes from the repository root:

```powershell
firebase deploy --only firestore:rules,firestore:indexes,storage
```

The Firebase CLI installation and project selection are manual setup steps. No credentials are included in this repository.

For the countdown, create `settings/nimajjanam` with a `processionStartAt` Firestore timestamp. Until it exists, the public UI shows an unavailable countdown instead of a fake time.

For push notifications, add the Firebase Web Push certificate key as `NEXT_PUBLIC_FIREBASE_VAPID_KEY`. A Firebase Messaging service-worker deployment and a backend token-delivery endpoint are still required before production push delivery.

## Seed Development Data

After backend Firebase Admin configuration is available:

```powershell
cd backend
npm run seed
```

The seed command is explicit and does not run automatically. Review it before using it against a production project.

## Routes

Public routes include `/`, `/days`, `/updates`, `/gallery`, `/nimajjanam`, and `/money`.

Admin routes include `/admin/login`, `/admin`, `/admin/days`, `/admin/announcements`, and `/admin/gallery`.

Unauthenticated admin users are redirected to `/admin/login` when Firebase is configured. API authorization is independently enforced by Firebase Admin token verification and the `adminUsers` collection.

## Validation

```powershell
cd frontend
npm run lint
npm run build

cd ../backend
npm run test
npm run build
```

## Known Limitations

- Firebase Console setup and credentials are not available in this workspace.
- FCM push delivery and service-worker messaging integration remain foundation work; the existing UI is preserved and no fake success is reported.
- Gallery uploads require Firebase Storage configuration and an authorized admin account.
- The service worker provides shell/cache resilience; Firestore offline persistence and FCM messaging still require the next integration pass.
- Local fallback storage is browser-local and is not shared across devices when Firebase is unavailable.
- The existing UI contains two image optimization warnings for `<img>` usage.
