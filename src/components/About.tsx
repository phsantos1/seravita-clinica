import React from 'react';
import { HeartHandshake, Eye, Ear, ShieldCheck } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="sobre" className="py-20 md:py-28 bg-[#FFFFFF] relative border-y border-[#23483F]/10">
      {/* Decorative continuous curve in background */}
      <div className="absolute top-0 right-0 w-1/3 h-full overflow-hidden pointer-events-none opacity-30">
        <svg
          viewBox="0 0 400 600"
          className="w-full h-full text-[#A6B9A8]"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M400 50 C 250 150, 150 350, 200 550" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Image of the serene reception / architectural care environment */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="overflow-hidden rounded-xs bg-[#E9E4D9] shadow-sm border border-[#23483F]/10">
                <img
                  src="/src/assets/images/seravita_clinic_facade_1794506435241.jpg"
                  alt="Fachada e entrada da Clínica Seravita em Santana, São Paulo"
                  referrerPolicy="no-referrer"
                  className="w-full h-[360px] sm:h-[420px] object-cover"
                />
              </div>

              {/* Quiet caption underneath */}
              <div className="mt-4 flex items-center justify-between text-xs text-[#343B38]/70">
                <span>Fachada e recepção da Clínica Seravita</span>
                <span className="font-mono text-[11px] text-[#23483F]">SANTANA · SÃO PAULO</span>
              </div>
            </div>
          </div>

          {/* Right Column: Institutional philosophy and principles */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="text-xs font-semibold tracking-[0.2em] text-[#23483F] uppercase mb-4">
              A Filosofia Seravita
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-[#23483F] leading-[1.2] tracking-tight mb-8 text-balance">
              Um cuidado que começa pela escuta.
            </h2>

            <div className="space-y-5 text-base sm:text-lg text-[#343B38]/90 font-normal leading-relaxed mb-10">
              <p>
                Acreditamos que cada pessoa tem uma história, necessidades e expectativas
                diferentes. Por isso, valorizamos uma relação de cuidado baseada na escuta, na
                atenção e no respeito à individualidade de cada paciente.
              </p>
              <p className="text-base text-[#343B38]/80">
                Na Seravita, reunimos diferentes especialidades médicas para facilitar o acesso ao
                cuidado e oferecer uma experiência de atendimento mais próxima e organizada.
              </p>
            </div>

            {/* 4 Pillars of the Seravita Signature: Ser Visto, Ser Ouvido, Ser Cuidado, Viver com Saúde */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-[#23483F]/10">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-xs bg-[#A6B9A8]/20 flex items-center justify-center text-[#23483F]">
                  <Eye className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg text-[#23483F]">Ser visto</h3>
                <p className="text-xs text-[#343B38]/75 leading-relaxed">
                  Reconhecimento da sua individualidade e respeito ao seu momento de vida.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-xs bg-[#A6B9A8]/20 flex items-center justify-center text-[#23483F]">
                  <Ear className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg text-[#23483F]">Ser ouvido</h3>
                <p className="text-xs text-[#343B38]/75 leading-relaxed">
                  Tempo adequado para compreender seus sintomas, hábitos e preocupações.
                </p>
              </div>

              <div className="space-y-2">
                <div className="w-8 h-8 rounded-xs bg-[#A6B9A8]/20 flex items-center justify-center text-[#23483F]">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h3 className="font-serif text-lg text-[#23483F]">Ser cuidado</h3>
                <p className="text-xs text-[#343B38]/75 leading-relaxed">
                  Condutas médicas fundamentadas, orientações claras e acompanhamento contínuo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
