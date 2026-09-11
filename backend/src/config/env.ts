import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(4000),

  // Frontend URLs allowed to access the backend
  FRONTEND_DEV_ORIGIN: z
    .string()
    .url()
    .default('http://localhost:3000'),

  FRONTEND_PROD_ORIGIN: z
    .string()
    .url()
    .default('https://festival-project.vercel.app'),

  FIREBASE_PROJECT_ID: z.string().min(1).optional(),
  FIREBASE_CLIENT_EMAIL: z.string().email().optional(),
  FIREBASE_PRIVATE_KEY: z.string().min(1).optional(),
});

export const env = envSchema.parse(process.env);

export const hasFirebaseAdminConfig = Boolean(
  env.FIREBASE_PROJECT_ID &&
  env.FIREBASE_CLIENT_EMAIL &&
  env.FIREBASE_PRIVATE_KEY,
);
