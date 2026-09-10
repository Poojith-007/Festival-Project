'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Megaphone, Image as ImageIcon, ShieldCheck, ToggleLeft, Users, DollarSign, ArrowRight } from 'lucide-react';
import { festivalDays } from '../../data/days';
import { readFinanceSummary, saveFinanceSummary } from '../../lib/finance';
import { isApiConfigured, saveLiveFinance } from '../../lib/services/api';
import { useAdminAuth } from '../../context/AdminAuthContext';

export default function AdminPage() {
  const [activeDay, setActiveDay] = useState<number>(4);
  const [volunteerStatus, setVolunteerStatus] = useState<Record<string, boolean>>({
    'v1': true,
    'v2': false,
    'v3': true
  });
  const [finance, setFinance] = useState(readFinanceSummary);
  const [financeSaved, setFinanceSaved] = useState(false);
  const [financeError, setFinanceError] = useState('');
  const { user } = useAdminAuth();

  const handleFinanceSave = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFinanceError('');
    const nextFinance = {
      donations: Math.max(0, Number(finance.donations) || 0),
      expenses: Math.max(0, Number(finance.expenses) || 0),
    };
    try {
      if (isApiConfigured && user) await saveLiveFinance(nextFinance, user);
      saveFinanceSummary(nextFinance);
      setFinance(nextFinance);
      setFinanceSaved(true);
      window.setTimeout(() => setFinanceSaved(false), 2500);
    } catch {
      setFinanceError('Finance could not be saved to the live database. Check the backend connection and try again.');
    }
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto py-4">
      
      {/* ========================================================= */}
      {/* SLIDE 9: Admin Dashboard Overview - 3 Cards Side by Side  */}
      {/* ========================================================= */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#F05A0A] font-telugu mb-2">
          Page 7: Admin Dashboard Overview
        </h1>
        <p className="text-sm text-[#2D1B11]/70 mb-8">
          Manage day schedules, live broadcasts, and storage uploads from the festival control room.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Manage Days */}
          <Link 
            href="/admin/days"
            className="group bg-white rounded-3xl p-8 border border-[#E8B973]/50 shadow-xs hover:border-[#F05A0A] transition-all flex flex-col items-center text-center hover:shadow-md cursor-pointer"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#F05A0A]/10 text-[#F05A0A] flex items-center justify-center mb-6 group-hover:bg-[#F05A0A] group-hover:text-white transition-colors">
              <Calendar size={32} />
            </div>
            <h2 className="text-xl font-bold text-[#F05A0A] mb-3">
              Manage Days
            </h2>
            <p className="text-sm text-[#2D1B11]/75 leading-relaxed mb-6">
              List view of Days 1-9. Tapping a day opens a form to edit Title, Schedule items, and current Day Status (Live/Upcoming/Done).
            </p>
            <div className="mt-auto text-xs font-bold text-[#F05A0A] flex items-center gap-1 group-hover:underline">
              <span>Open Day Manager</span>
              <ArrowRight size={14} />
            </div>
          </Link>

          {/* Card 2: Announcements */}
          <Link 
            href="/admin/announcements"
            className="group bg-white rounded-3xl p-8 border border-[#E8B973]/50 shadow-xs hover:border-[#F05A0A] transition-all flex flex-col items-center text-center hover:shadow-md cursor-pointer"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#F05A0A]/10 text-[#F05A0A] flex items-center justify-center mb-6 group-hover:bg-[#F05A0A] group-hover:text-white transition-colors">
              <Megaphone size={32} />
            </div>
            <h2 className="text-xl font-bold text-[#F05A0A] mb-3">
              Announcements
            </h2>
            <p className="text-sm text-[#2D1B11]/75 leading-relaxed mb-6">
              Form UI: Title input, Textarea for message, Priority Radio buttons (Normal/Emergency), and &quot;Publish + Push Notification&quot; submit button.
            </p>
            <div className="mt-auto text-xs font-bold text-[#F05A0A] flex items-center gap-1 group-hover:underline">
              <span>Create Announcement</span>
              <ArrowRight size={14} />
            </div>
          </Link>

          {/* Card 3: Gallery Upload */}
          <Link 
            href="/admin/gallery"
            className="group bg-white rounded-3xl p-8 border border-[#E8B973]/50 shadow-xs hover:border-[#F05A0A] transition-all flex flex-col items-center text-center hover:shadow-md cursor-pointer"
          >
            <div className="w-16 h-16 rounded-2xl bg-[#F05A0A]/10 text-[#F05A0A] flex items-center justify-center mb-6 group-hover:bg-[#F05A0A] group-hover:text-white transition-colors">
              <ImageIcon size={32} />
            </div>
            <h2 className="text-xl font-bold text-[#F05A0A] mb-3">
              Gallery Upload
            </h2>
            <p className="text-sm text-[#2D1B11]/75 leading-relaxed mb-6">
              Form UI: File selector (multiple), Dropdown to assign to a specific Day, Caption input, and Upload button connecting to Firebase Storage.
            </p>
            <div className="mt-auto text-xs font-bold text-[#F05A0A] flex items-center gap-1 group-hover:underline">
              <span>Upload Photos</span>
              <ArrowRight size={14} />
            </div>
          </Link>

        </div>
      </div>

      {/* ========================================================= */}
      {/* SLIDE 10: Admin Dashboard Features Checklist               */}
      {/* ========================================================= */}
      <div className="bg-white rounded-3xl p-8 border border-[#E8B973]/40 shadow-xs space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-[#F05A0A] font-telugu mb-2">
            Admin Dashboard Features Checklist
          </h2>
          <p className="text-sm text-[#2D1B11]/70">
            Phase 1 & Phase 2 administrative tooling specifications
          </p>
        </div>

        <div className="space-y-6 divide-y divide-[#E8B973]/20">
          
          {/* Feature 1: Authentication Route */}
          <div className="pt-6 first:pt-0 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#F05A0A] flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck size={22} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base text-[#2D1B11]">
                Authentication Route
              </h3>
              <p className="text-sm text-[#2D1B11]/75 mt-1">
                The <code className="bg-[#FFF9F0] px-1.5 py-0.5 rounded text-[#F05A0A] font-mono text-xs border border-[#E8B973]/40">/admin</code> path must be protected by Firebase Auth. Only registered committee phone numbers or emails can access this.
              </p>
              <div className="mt-2 text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full inline-block">
                ✓ UI Ready for Firebase Auth Integration
              </div>
            </div>
          </div>

          {/* Feature 2: Day State Toggler */}
          <div className="pt-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#F05A0A] flex items-center justify-center shrink-0 mt-0.5">
              <ToggleLeft size={22} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base text-[#2D1B11]">
                Day State Toggler
              </h3>
              <p className="text-sm text-[#2D1B11]/75 mt-1 mb-3">
                Admin needs a simple switch mechanism to change which day is currently flagged as &quot;TODAY&quot; on the public home screen.
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-[#2D1B11]/60">Select Flagged Day:</span>
                {festivalDays.map(day => (
                  <button
                    key={day.id}
                    onClick={() => setActiveDay(day.dayNumber)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${
                      activeDay === day.dayNumber
                        ? 'bg-[#F05A0A] text-white border-[#F05A0A] shadow-2xs'
                        : 'bg-white text-[#2D1B11]/70 border-[#E8B973]/40 hover:bg-[#FFF9F0]'
                    }`}
                  >
                    Day {day.dayNumber} {activeDay === day.dayNumber && '★'}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Feature 3: Volunteer Manager (Phase 2) */}
          <div className="pt-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#F05A0A] flex items-center justify-center shrink-0 mt-0.5">
              <Users size={22} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base text-[#2D1B11]">
                Volunteer Manager (Phase 2)
              </h3>
              <p className="text-sm text-[#2D1B11]/75 mt-1 mb-3">
                A UI table listing volunteer names, assigned tasks (e.g., Decoration, Parking), and a status toggle (Active/Completed).
              </p>
              
              <div className="border border-[#E8B973]/30 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-[#FFF9F0] border-b border-[#E8B973]/30 text-[#F05A0A]">
                    <tr>
                      <th className="p-2.5 font-bold">Volunteer Name</th>
                      <th className="p-2.5 font-bold">Assigned Task</th>
                      <th className="p-2.5 font-bold text-right">Status Toggle</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E8B973]/15">
                    {[
                      { id: 'v1', name: 'Ravi Kumar', task: 'Pooja Mandapam Decoration' },
                      { id: 'v2', name: 'Suresh Varma', task: 'Parking & Crowd Queue' },
                      { id: 'v3', name: 'Anil Reddy', task: 'Prasadam Distribution Counter' }
                    ].map(v => (
                      <tr key={v.id} className="hover:bg-[#FFF9F0]/50">
                        <td className="p-2.5 font-semibold text-[#2D1B11]">{v.name}</td>
                        <td className="p-2.5 text-[#2D1B11]/70">{v.task}</td>
                        <td className="p-2.5 text-right">
                          <button
                            onClick={() => setVolunteerStatus(prev => ({ ...prev, [v.id]: !prev[v.id] }))}
                            className={`px-2.5 py-1 rounded-full font-bold cursor-pointer transition-colors ${
                              volunteerStatus[v.id]
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-600'
                            }`}
                          >
                            {volunteerStatus[v.id] ? 'Active' : 'Completed'}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Feature 4: Finance Tracker */}
          <div className="pt-6 flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#F05A0A] flex items-center justify-center shrink-0 mt-0.5">
              <DollarSign size={22} />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-base text-[#2D1B11]">
                Finance Tracker
              </h3>
              <p className="text-sm text-[#2D1B11]/75 mt-1 mb-3">
                Update the live donations and expenses shown on the public Wallet tab.
              </p>

              <form onSubmit={handleFinanceSave} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <label className="p-3 bg-[#FFF9F0] border border-[#E8B973]/30 rounded-xl font-semibold text-[#2D1B11]">
                    Donations Received
                    <input
                      type="number"
                      min="0"
                      value={finance.donations}
                      onChange={(event) => setFinance({ ...finance, donations: Number(event.target.value) })}
                      className="mt-2 w-full rounded-lg border border-[#E8B973]/50 bg-white p-2 text-base font-bold text-green-700"
                    />
                  </label>
                  <label className="p-3 bg-[#FFF9F0] border border-[#E8B973]/30 rounded-xl font-semibold text-[#2D1B11]">
                    Expenses
                    <input
                      type="number"
                      min="0"
                      value={finance.expenses}
                      onChange={(event) => setFinance({ ...finance, expenses: Number(event.target.value) })}
                      className="mt-2 w-full rounded-lg border border-[#E8B973]/50 bg-white p-2 text-base font-bold text-red-600"
                    />
                  </label>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <button type="submit" className="rounded-lg bg-[#F05A0A] px-4 py-2 text-sm font-bold text-white hover:bg-[#D04A08]">
                    Save Finance Updates
                  </button>
                  {financeSaved && <span className="text-sm font-semibold text-green-700">Saved. Wallet updated.</span>}
                  {financeError && <span className="text-sm font-semibold text-red-600">{financeError}</span>}
                </div>
              </form>

              <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-[#FFF9F0] border border-[#E8B973]/30 rounded-xl">
                  <span className="text-[#2D1B11]/60 block font-semibold mb-1">Current Balance</span>
                  <span className="text-base font-bold text-[#F05A0A]">₹ {(finance.donations - finance.expenses).toLocaleString('en-IN')}</span>
                </div>
                <div className="p-3 bg-[#FFF9F0] border border-[#E8B973]/30 rounded-xl sm:col-span-2">
                  <span className="text-[#2D1B11]/60 block font-semibold mb-1">How to update</span>
                  <span className="text-[#2D1B11]/75">Enter the latest amounts and select Save Finance Updates. Open the public Wallet tab to see the new balance.</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
