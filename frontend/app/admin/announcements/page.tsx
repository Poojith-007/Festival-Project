export default function AdminAnnouncementsPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-[#2D1B11] mb-6">Announcements</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-[#E8B973]/30 p-6 mb-8">
        <h2 className="font-bold text-xl mb-4">Create New Announcement</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-[#2D1B11] mb-1">Title</label>
            <input type="text" className="w-full border border-[#E8B973]/50 rounded-lg p-2" placeholder="e.g. Program Change" />
          </div>
          <div>
            <label className="block text-sm font-bold text-[#2D1B11] mb-1">Message</label>
            <textarea className="w-full border border-[#E8B973]/50 rounded-lg p-2 h-24" placeholder="Enter announcement text..."></textarea>
          </div>
          <div>
            <label className="block text-sm font-bold text-[#2D1B11] mb-1">Priority</label>
            <select className="w-full border border-[#E8B973]/50 rounded-lg p-2 bg-white">
              <option value="normal">Normal</option>
              <option value="important">Important</option>
              <option value="emergency">Emergency</option>
            </select>
          </div>
          <button className="w-full bg-[#F05A0A] text-white font-bold py-3 rounded-xl hover:bg-[#D04A08] transition-colors mt-4">
            Publish + Push Notification
          </button>
        </div>
      </div>
    </div>
  );
}
