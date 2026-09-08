import { festivalConfig } from '../../data/festival';

export default function AboutPage() {
  return (
    <div className="py-8 px-4 bg-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-brown mb-6 flex items-center gap-3">
          <span className="text-4xl">🕉️</span>
          About Our Festival
        </h1>
        
        <div className="prose prose-brown max-w-none">
          <p className="text-lg text-brown/80 leading-relaxed mb-6 font-medium">
            The {festivalConfig.festivalName} is a grand 7-day celebration held annually in {festivalConfig.villageName}, bringing together devotees, families, and visitors in a spirit of unity and devotion.
          </p>
          
          <div className="bg-ivory rounded-2xl p-6 md:p-8 border border-saffron/20 mb-8">
            <h3 className="text-xl font-bold text-saffron mb-4">A 7-Day Journey</h3>
            <p className="text-brown/70 leading-relaxed mb-4">
              Our festival spans seven days of rich cultural and spiritual programs. From the early morning Suprabhatam to the evening Maha Aarti, every moment is filled with devotion. The community comes together to participate in special pujas, soul-stirring bhajans, and grand Annadanam.
            </p>
            <p className="text-brown/70 leading-relaxed">
              The celebration culminates on the 7th day with the spectacular Maha Nimajjanam, a grand procession where we bid farewell to Lord Ganesha, praying for his return the following year.
            </p>
          </div>
          
          <h3 className="text-xl font-bold text-brown mb-4">Community Participation</h3>
          <p className="text-brown/70 leading-relaxed mb-4">
            This festival is made possible by the dedicated efforts of our volunteers, the generous support of our donors, and the enthusiastic participation of every single person in the village. It is not just an event; it is the heartbeat of our community.
          </p>
        </div>
      </div>
    </div>
  );
}
