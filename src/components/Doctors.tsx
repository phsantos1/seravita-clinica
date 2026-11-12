import React from 'react';
import { Stethoscope, Calendar, ShieldCheck, ArrowRight } from 'lucide-react';
import { DOCTORS } from '../data/seravitaData';

interface DoctorsProps {
  onSelectBooking: (specialtyId?: string) => void;
}

export const Doctors: React.FC<DoctorsProps> = ({ onSelectBooking }) => {
  // Exclude "primeiro-disponivel" general slot from the doctors editorial roster
  const clinicalStaff = DOCTORS.filter((d) => d.id !== 'primeiro-disponivel');

  return (
    <section id="equipe" className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#23483F]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 md:mb-18">
          <div className="text-xs font-semibold tracking-[0.2em] text-[#23483F] uppercase mb-3">
            Corpo Clínico Integrado
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-[#23483F] tracking-tight leading-[1.18] mb-4 text-balance">
            Por trás de cada cuidado, pessoas.
          </h2>
          <p className="text-base sm:text-lg text-[#343B38]/80 leading-relaxed font-normal">
            Conheça os profissionais que fazem parte da equipe Seravita. Atendimento médico com
            tempo dedicado, ética e rigor técnico.
          </p>
        </div>

        {/* Accreditation Notice as mandated by ethics guidelines */}
        <div className="p-4 rounded-xs bg-[#F7F6F1] border border-[#23483F]/10 text-xs text-[#343B38]/80 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#23483F] shrink-0" />
            <span>
              Todos os médicos da Seravita possuem registro ativo no CRM/SP e título de especialista
              (RQE) registrado pelo Conselho Federal de Medicina.
            </span>
          </div>
          <span className="text-[11px] font-mono text-[#23483F]/70 shrink-0">
            DIRETORIA TÉCNICA MÉDICA
          </span>
        </div>

        {/* Clinical Roster Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {clinicalStaff.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-[#F7F6F1] rounded-xs border border-[#23483F]/10 p-7 flex flex-col justify-between hover:border-[#23483F]/30 hover:shadow-xs transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xs bg-[#A6B9A8]/25 text-[#23483F] flex items-center justify-center group-hover:bg-[#23483F] group-hover:text-white transition-colors">
                    <Stethoscope className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-medium text-[#23483F]/70 uppercase tracking-wider">
                    {doctor.crm}
                  </span>
                </div>

                <h3 className="font-serif text-xl text-[#23483F] mb-1">
                  {doctor.name}
                </h3>
                <p className="text-xs font-semibold text-[#343B38]/80 uppercase tracking-wider mb-4">
                  {doctor.specialtyName}
                </p>

                <p className="text-xs sm:text-sm text-[#343B38]/85 leading-relaxed mb-6">
                  {doctor.presentation}
                </p>
              </div>

              <div className="pt-4 border-t border-[#23483F]/10 flex items-center justify-between">
                <span className="text-[11px] text-[#343B38]/60">
                  São Paulo - SP
                </span>
                <button
                  type="button"
                  onClick={() => onSelectBooking(doctor.specialtyId)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#23483F] hover:text-[#1b3831] uppercase tracking-wider cursor-pointer group-hover:translate-x-1 transition-transform"
                >
                  <span>Agendar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}

          {/* Multidisciplinary Team Slot */}
          <div className="bg-[#23483F] text-white rounded-xs p-7 flex flex-col justify-between shadow-xs">
            <div>
              <div className="w-12 h-12 rounded-xs bg-white/10 text-[#A6B9A8] flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl text-white mb-1">
                Atendimento Integrado
              </h3>
              <p className="text-xs font-semibold text-[#A6B9A8] uppercase tracking-wider mb-4">
                Discussão Interdisciplinar
              </p>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed mb-6">
                Casos clínicos complexos são debatidos conjuntamente entre ortopedistas, vasculares,
                dermatologistas e médicos de família para traçar o plano terapêutico mais seguro e
                completo.
              </p>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <span className="text-[11px] text-white/60">
                Cuidado Integral
              </span>
              <button
                type="button"
                onClick={() => onSelectBooking()}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#A6B9A8] hover:text-white uppercase tracking-wider cursor-pointer"
              >
                <span>Solicitar consulta</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
