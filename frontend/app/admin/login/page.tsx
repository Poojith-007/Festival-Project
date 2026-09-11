'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminAuth } from '../../../context/AdminAuthContext';

export default function AdminLoginPage() {
  const router = useRouter();
  const { signIn, configured, error: configurationError } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await signIn(email, password);
      router.replace('/admin');
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : 'Sign-in failed. Check the email and password, then try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F0] flex items-center justify-center px-4 py-12">
      <form onSubmit={handleSubmit} className="w-full max-w-md rounded-2xl border border-[#E8B973]/50 bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold text-[#F05A0A] mb-2">Admin Login</h1>
        <p className="text-sm text-[#2D1B11]/70 mb-6">Sign in with an authorized committee account.</p>
        {!configured && <p className="rounded-lg bg-orange-50 p-3 text-sm text-orange-800 mb-4">{configurationError}</p>}
        <div className="space-y-4">
          <label className="block text-sm font-bold text-[#2D1B11]">
            Email
            <input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} className="mt-1 w-full rounded-lg border border-[#E8B973]/50 p-3" />
          </label>
          <label className="block text-sm font-bold text-[#2D1B11]">
            Password
            <input type="password" required value={password} onChange={(event) => setPassword(event.target.value)} className="mt-1 w-full rounded-lg border border-[#E8B973]/50 p-3" />
          </label>
          {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
          <button type="submit" disabled={!configured || submitting} className="w-full rounded-xl bg-[#F05A0A] py-3 font-bold text-white hover:bg-[#D04A08] disabled:cursor-not-allowed disabled:opacity-50">
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
    </div>
  );
}
