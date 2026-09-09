export default function AdminGalleryPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold text-[#2D1B11] mb-6">Gallery Upload</h1>
      
      <div className="bg-white rounded-xl shadow-sm border border-[#E8B973]/30 p-6 mb-8">
        <h2 className="font-bold text-xl mb-4">Upload New Photos</h2>
        <div className="space-y-4">
          <div className="border-2 border-dashed border-[#E8B973] rounded-xl p-8 text-center bg-[#FFF9F0]/50 hover:bg-[#FFF9F0] cursor-pointer transition-colors">
            <span className="text-4xl mb-2 block opacity-50">📁</span>
            <p className="font-bold text-[#F05A0A]">Click to select multiple files</p>
            <p className="text-sm text-[#2D1B11]/60">or drag and drop here</p>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-[#2D1B11] mb-1">Select Day</label>
            <select className="w-full border border-[#E8B973]/50 rounded-lg p-2 bg-white">
              <option value="all">All / General</option>
              <option value="1">Day 1</option>
              <option value="2">Day 2</option>
              <option value="3">Day 3</option>
              <option value="4">Day 4</option>
              <option value="nimajjanam">Nimajjanam</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-bold text-[#2D1B11] mb-1">Optional Caption (applied to all)</label>
            <input type="text" className="w-full border border-[#E8B973]/50 rounded-lg p-2" placeholder="e.g. Evening Aarti..." />
          </div>
          
          <button className="w-full bg-[#F05A0A] text-white font-bold py-3 rounded-xl hover:bg-[#D04A08] transition-colors mt-4">
            Upload to Gallery
          </button>
        </div>
      </div>
    </div>
  );
}
