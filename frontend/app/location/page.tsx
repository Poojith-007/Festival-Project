import { festivalLocation } from '../../data/location';
import { MapPin, Navigation } from 'lucide-react';

export default function LocationPage() {
  return (
    <div className="py-8 px-4 bg-ivory min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-brown mb-8 flex items-center gap-3">
          <MapPin size={32} className="text-saffron" />
          Festival Venue
        </h1>
        
        <div className="bg-white rounded-2xl p-6 md:p-8 border border-black/5 shadow-sm mb-6">
          <h2 className="text-2xl font-bold text-brown mb-2">{festivalLocation.venue}</h2>
          <p className="text-lg text-brown/70 mb-1">{festivalLocation.village}</p>
          <p className="text-brown/60 mb-8">{festivalLocation.address}</p>
          
          <button className="flex items-center justify-center w-full sm:w-auto gap-2 bg-saffron text-white px-6 py-3 rounded-full font-medium hover:bg-saffron/90 transition shadow-sm">
            <Navigation size={18} />
            Get Directions
          </button>
        </div>

        <div className="aspect-video bg-brown/5 rounded-2xl border border-black/5 flex flex-col items-center justify-center text-brown/40 p-4 text-center">
          <MapPin size={48} className="mb-4 opacity-50" />
          <p>Map visualization will be enabled closer to the festival.</p>
        </div>
      </div>
    </div>
  );
}
