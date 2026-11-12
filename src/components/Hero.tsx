import React from 'react';
import { ArrowDownRight, Calendar, Stethoscope } from 'lucide-react';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreSpecialties: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreSpecialties }) => {
  return (
    <section id="inicio" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-[#F7F6F1]">
      {/* Subtle organic background contour lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg
          className="w-full h-full text-[#A6B9A8]/40"
          viewBox="0 0 1440 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-100 200 C 300 100, 600 450, 1100 250 C 1300 170, 1500 350, 1600 300"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />
          <path
            d="M-50 480 C 400 350, 800 650, 1200 450 C 1400 350, 1550 500, 1650 450"
            stroke="currentColor"
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Text & Editorial Presentation (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Kicker identifier without pill badge */}
            <div className="flex items-center gap-3 text-xs tracking-[0.2em] font-semibold text-[#23483F] uppercase mb-5">
              <span>Clínica Médica Multidisciplinar</span>
              <span className="text-[#A6B9A8]" aria-hidden="true">|</span>
              <span className="text-[#343B38]/80">São Paulo</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.12] text-[#23483F] tracking-tight mb-6 text-balance">
              Seu cuidado começa quando você é ouvido.
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#343B38]/90 font-normal leading-relaxed max-w-2xl mb-8">
              Na Seravita, diferentes especialidades se encontram para oferecer um atendimento
              atento às suas necessidades, com respeito, acolhimento e cuidado em cada etapa.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#23483F] hover:bg-[#1b3831] active:scale-[0.99] transition-all rounded-xs shadow-sm cursor-pointer whitespace-nowrap"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Consulta</span>
              </button>

              <button
                onClick={onExploreSpecialties}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#23483F] border border-[#23483F]/30 hover:bg-[#23483F]/5 transition-all rounded-xs cursor-pointer whitespace-nowrap"
              >
                <Stethoscope className="w-4 h-4 text-[#23483F]" />
                <span>Conhecer Especialidades</span>
              </button>
            </div>

            {/* Continuous Care Signature & Trust Marker */}
            <div className="pt-6 border-t border-[#23483F]/15 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-[1.5px] bg-[#23483F]"></span>
                <p className="font-serif italic text-base sm:text-lg text-[#23483F]">
                  "Ser visto, ser ouvido, ser cuidado, Seravita."
                </p>
              </div>

              <div className="text-xs text-[#343B38]/70 flex items-center gap-2">
                <span>5 Especialidades Médicas Integradas</span>
                <span aria-hidden="true">·</span>
                <span>Atendimento Presencial</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Humanized Photo Composition (5 cols on lg) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">
              {/* Organic Frame Accent */}
              <div className="absolute -top-3 -right-3 w-full h-full border border-[#23483F]/20 rounded-xs pointer-events-none hidden sm:block"></div>
              
              <div className="relative overflow-hidden rounded-xs bg-[#E9E4D9] shadow-md border border-[#23483F]/10 group">
                <img
                  src="/src/assets/images/seravita_hero_care_1794505784859.jpg"
                  alt="Consulta médica humanizada na Seravita: médica ouvindo atentamente a paciente em ambiente acolhedor"
                  referrerPolicy="no-referrer"
                  className="w-full h-[400px] sm:h-[480px] object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                />

                {/* Quiet bottom banner overlay */}
                <div className="absolute bottom-0 inset-x-0 p-5 bg-gradient-to-t from-[#23483F]/90 via-[#23483F]/60 to-transparent text-white">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold tracking-wider uppercase text-[#A6B9A8]">
                        Acolhimento & Atenção
                      </p>
                      <p className="text-sm font-medium text-white/95 mt-0.5">
                        Consultas sem pressa para ouvir a sua história.
                      </p>
                    </div>
                    <button
                      onClick={onOpenBooking}
                      className="p-2 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors shrink-0 cursor-pointer"
                      title="Ir para agendamento"
                    >
                      <ArrowDownRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Discreet floating note below image */}
              <div className="mt-4 flex items-center justify-between text-xs text-[#343B38]/70 px-1">
                <span>Ambiente planejado para o seu conforto</span>
                <span className="font-serif italic text-[#23483F]">São Paulo - SP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
