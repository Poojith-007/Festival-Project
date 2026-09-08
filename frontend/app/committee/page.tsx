import { committeeMembers } from '../../data/committee';
import { Users } from 'lucide-react';

export default function CommitteePage() {
  return (
    <div className="py-8 px-4 bg-ivory min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-brown mb-2 flex items-center gap-3">
          <Users size={32} className="text-saffron" />
          Organizing Committee
        </h1>
        <p className="text-brown/70 mb-8">The dedicated team behind the festival organization.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {committeeMembers.map((member) => (
            <div key={member.id} className="bg-white rounded-2xl p-6 border border-black/5 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-saffron/10 flex items-center justify-center shrink-0 border border-saffron/20">
                <Users className="text-saffron/50" size={24} />
              </div>
              <div>
                <div className="text-xs font-bold text-saffron uppercase tracking-wider mb-1">{member.role}</div>
                <h3 className="font-bold text-brown text-lg">{member.name}</h3>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center p-8 bg-white rounded-2xl border border-dashed border-brown/20">
          <p className="text-brown/70 font-medium">
            Along with hundreds of dedicated volunteers from our community.
          </p>
        </div>
      </div>
    </div>
  );
}
