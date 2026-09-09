'use client';
import { useState } from 'react';
import { festivalDays } from '../../../data/days';

export default function AdminDaysPage() {
  const [days] = useState(festivalDays);

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
              <select className="border border-[#E8B973]/50 rounded-lg p-1 text-sm bg-white" defaultValue={day.status}>
                <option value="completed">Done</option>
                <option value="current">Live</option>
                <option value="upcoming">Upcoming</option>
              </select>
              <button className="bg-[#E8B973]/20 text-[#F05A0A] px-3 py-1 rounded-lg text-sm font-bold hover:bg-[#E8B973]/30">Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
