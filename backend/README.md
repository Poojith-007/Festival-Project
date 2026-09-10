# Festival Backend

TypeScript Express API for privileged FestivalProject operations.

## Commands

```powershell
npm install
npm run dev
npm run build
npm run start
npm run seed
```

Copy `.env.example` to `.env` and provide Firebase Admin credentials before using Firestore operations. The backend refuses protected operations when Firebase Admin is not configured.

All admin writes require a Firebase ID token and an active `adminUsers/{uid}` Firestore document with `role: "admin"`.
