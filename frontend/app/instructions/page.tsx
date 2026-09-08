import { festivalInstructions } from '../../data/instructions';
import { AlertCircle } from 'lucide-react';

export default function InstructionsPage() {
  return (
    <div className="py-8 px-4 bg-ivory min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-brown mb-2 flex items-center gap-3">
          <AlertCircle size={32} className="text-saffron" />
          Important Instructions
        </h1>
        <p className="text-brown/70 mb-8">Please follow these guidelines for a safe and peaceful festival experience.</p>
        
        <div className="space-y-4">
          {festivalInstructions.map((instruction, index) => (
            <div key={instruction.id} className="bg-white rounded-xl p-5 border border-black/5 shadow-sm flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-saffron/10 text-saffron font-bold flex items-center justify-center shrink-0">
                {index + 1}
              </div>
              <p className="text-brown font-medium leading-relaxed pt-1">{instruction.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
