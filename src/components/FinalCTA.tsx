import React from 'react';
import { Calendar, MessageCircle, ArrowRight } from 'lucide-react';
import { ClinicConfig } from '../types';

interface FinalCTAProps {
  config: ClinicConfig;
  onOpenBooking: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ config, onOpenBooking }) => {
  const whatsappUrl = `https://wa.me/${config.whatsappRaw}?text=${encodeURIComponent(
    'Olá! Acessei o site da Seravita e gostaria de obter informações sobre os atendimentos e agendamentos.'
  )}`;

  return (
    <section className="py-24 md:py-32 bg-[#23483F] text-white relative overflow-hidden">
      {/* Discreet organic watermark in background */}
      <div className="absolute inset-0 pointer-events-none opacity-10">
        <svg
          className="w-full h-full text-white"
          viewBox="0 0 1000 600"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M-100 300 C 200 100, 500 500, 800 200 C 950 100, 1100 300, 1200 250" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-6 sm:px-8 text-center relative z-10">
        <span className="text-xs font-semibold tracking-[0.25em] text-[#A6B9A8] uppercase mb-4 inline-block">
          Cuidado Individualizado em São Paulo
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight mb-6 text-balance">
          Seu cuidado merece atenção.
        </h2>

        <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-10">
          Escolha a especialidade e dê o próximo passo para cuidar da sua saúde com uma equipe médica
          atenta, respeitosa e acolhedora.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-[#23483F] bg-[#FFFFFF] hover:bg-[#F7F6F1] active:scale-[0.99] rounded-xs shadow-md transition-all cursor-pointer whitespace-nowrap"
          >
            <Calendar className="w-4 h-4" />
            <span>Agendar Minha Consulta</span>
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs font-semibold uppercase tracking-wider text-white border border-white/30 hover:bg-white/10 rounded-xs transition-all whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 text-[#A6B9A8]" />
            <span>Falar com a Seravita</span>
          </a>
        </div>

        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-2 text-xs text-white/60">
          <span className="font-serif italic text-sm text-[#A6B9A8]">
            "Ser visto, ser ouvido, ser cuidado, Seravita."
          </span>
        </div>
      </div>
    </section>
  );
};
