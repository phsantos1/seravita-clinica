import React from 'react';
import { Calendar, Stethoscope, UserCheck, CheckCircle, ArrowDown } from 'lucide-react';

interface HowItWorksProps {
  onOpenBooking: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenBooking }) => {
  const steps = [
    {
      number: '01',
      title: 'Escolha a Especialidade',
      description: 'Encontre a área médica que deseja consultar.',
      icon: <Stethoscope className="w-5 h-5 text-[#23483F]" />,
    },
    {
      number: '02',
      title: 'Selecione o Profissional',
      description: 'Conheça os profissionais disponíveis.',
      icon: <UserCheck className="w-5 h-5 text-[#23483F]" />,
    },
    {
      number: '03',
      title: 'Escolha a Data',
      description: 'Consulte as opções de atendimento.',
      icon: <Calendar className="w-5 h-5 text-[#23483F]" />,
    },
    {
      number: '04',
      title: 'Aguarde a Confirmação',
      description: 'Receba o retorno da clínica com as informações do atendimento.',
      icon: <CheckCircle className="w-5 h-5 text-[#23483F]" />,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-[#F7F6F1] border-b border-[#23483F]/10 relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="text-xs font-semibold tracking-[0.2em] text-[#23483F] uppercase mb-3">
            Passo a Passo
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.5rem] text-[#23483F] tracking-tight mb-4">
            Agendar seu atendimento é simples.
          </h2>
          <p className="text-sm sm:text-base text-[#343B38]/80 leading-relaxed">
            Uma jornada clara, transparente e acolhedora desde o primeiro clique até a sua consulta.
          </p>
        </div>

        {/* Steps Grid with Continuous Visual Line */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-12 left-12 right-12 h-[1.5px] bg-[#23483F]/20 -z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div
                key={step.number}
                className="bg-[#FFFFFF] p-7 rounded-xs border border-[#23483F]/10 flex flex-col justify-between hover:border-[#23483F]/30 transition-all shadow-2xs group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xs bg-[#A6B9A8]/25 flex items-center justify-center group-hover:bg-[#23483F] group-hover:text-white transition-colors">
                      {step.icon}
                    </div>
                    <span className="font-mono text-sm font-bold text-[#23483F]/40">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-[#23483F] mb-2">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#343B38]/80 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#23483F]/5 flex items-center justify-between text-[11px] text-[#343B38]/50">
                  <span>Etapa {idx + 1} de 4</span>
                  <span className="text-[#23483F] font-medium">Seravita</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA to start booking */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenBooking}
            className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#23483F] hover:bg-[#1b3831] rounded-xs shadow-xs transition-colors cursor-pointer"
          >
            <span>Iniciar Agendamento Agora</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
