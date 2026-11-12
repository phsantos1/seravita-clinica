import React, { useState } from 'react';
import {
  Activity,
  Sparkles,
  Droplet,
  HeartPulse,
  Users2,
  Calendar,
  ArrowRight,
  Info,
} from 'lucide-react';
import { SPECIALTIES } from '../data/seravitaData';
import { Specialty } from '../types';
import { SpecialtyModal } from './SpecialtyModal';

interface SpecialtiesProps {
  onSelectBooking: (specialtyId: string) => void;
}

export const Specialties: React.FC<SpecialtiesProps> = ({ onSelectBooking }) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);

  const getSpecialtyIcon = (id: string) => {
    switch (id) {
      case 'ortopedia':
        return <Activity className="w-5 h-5" />;
      case 'dermatologia':
        return <Sparkles className="w-5 h-5" />;
      case 'urologia':
        return <Droplet className="w-5 h-5" />;
      case 'cirurgia-vascular':
        return <HeartPulse className="w-5 h-5" />;
      case 'medicina-de-familia':
        return <Users2 className="w-5 h-5" />;
      default:
        return <Activity className="w-5 h-5" />;
    }
  };

  // 1 Featured Specialty: Medicina de Família (Integral care)
  const featuredSpecialty = SPECIALTIES.find((s) => s.id === 'medicina-de-familia') || SPECIALTIES[0];
  const gridSpecialties = SPECIALTIES.filter((s) => s.id !== 'medicina-de-familia');

  return (
    <section id="especialidades" className="py-20 md:py-28 bg-[#F7F6F1] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 md:mb-18">
          <div className="text-xs font-semibold tracking-[0.2em] text-[#23483F] uppercase mb-3">
            Atendimento Multidisciplinar
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-[#23483F] tracking-tight leading-[1.18] mb-4 text-balance">
            Especialidades que cuidam de você.
          </h2>
          <p className="text-base sm:text-lg text-[#343B38]/80 leading-relaxed font-normal">
            Encontre a especialidade que atende à sua necessidade. Diferentes áreas que trabalham de
            forma integrada para o seu bem-estar completo.
          </p>
        </div>

        {/* Asymmetric Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Featured Large Card: Medicina de Família (Spans 12 cols, with horizontal layout on desktop) */}
          <div className="lg:col-span-12 bg-[#FFFFFF] rounded-xs border border-[#23483F]/12 p-8 sm:p-10 shadow-xs hover:border-[#23483F]/30 transition-all duration-300">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xs bg-[#23483F] text-white flex items-center justify-center">
                    {getSpecialtyIcon(featuredSpecialty.id)}
                  </div>
                  <div className="text-xs font-mono uppercase tracking-wider text-[#23483F]/80">
                    Especialidade em Destaque Integral
                  </div>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#23483F] mb-3">
                  05. {featuredSpecialty.name}
                </h3>
                <p className="text-sm sm:text-base text-[#343B38] leading-relaxed mb-6 max-w-2xl">
                  {featuredSpecialty.description}
                </p>

                {/* 4 topics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  {featuredSpecialty.topics.map((topic, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-[#343B38]/85 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#A6B9A8]" />
                      <span>{topic}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-end gap-3 lg:border-l lg:border-[#23483F]/10 lg:pl-8">
                <div className="p-4 rounded-xs bg-[#F7F6F1] border border-[#23483F]/5 text-xs text-[#343B38]/80 leading-relaxed mb-2">
                  "O médico de família é o profissional de referência que acompanha você e sua família ao longo dos anos, conhecendo seu histórico de perto."
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
                  <button
                    onClick={() => onSelectBooking(featuredSpecialty.id)}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#23483F] hover:bg-[#1b3831] rounded-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{featuredSpecialty.ctaLabel}</span>
                  </button>

                  <button
                    onClick={() => setSelectedSpecialty(featuredSpecialty)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-[#23483F] border border-[#23483F]/20 hover:bg-[#23483F]/5 rounded-xs transition-colors cursor-pointer"
                  >
                    <Info className="w-3.5 h-3.5" />
                    <span>Ver detalhes clínicos</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Grid of other 4 specialties (2x2 on desktop, col-span-6 each) */}
          {gridSpecialties.map((spec, index) => {
            const indexNumber = String(index + 1).padStart(2, '0');
            return (
              <div
                key={spec.id}
                className="lg:col-span-6 bg-[#FFFFFF] rounded-xs border border-[#23483F]/10 p-7 sm:p-8 flex flex-col justify-between hover:border-[#23483F]/30 hover:shadow-xs transition-all duration-300 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-8 h-8 rounded-xs bg-[#A6B9A8]/20 text-[#23483F] flex items-center justify-center group-hover:bg-[#23483F] group-hover:text-white transition-colors">
                      {getSpecialtyIcon(spec.id)}
                    </div>
                    <span className="font-mono text-xs text-[#343B38]/50">
                      {indexNumber}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#23483F] mb-2.5">
                    {spec.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#343B38] leading-relaxed mb-5 min-h-[50px]">
                    {spec.description}
                  </p>

                  {/* 4 topics */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6 pt-4 border-t border-[#23483F]/5">
                    {spec.topics.map((topic, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#343B38]/80">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#A6B9A8]" />
                        <span className="truncate">{topic}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-[#23483F]/10 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => onSelectBooking(spec.id)}
                    className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#23483F] hover:bg-[#1b3831] rounded-xs transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{spec.ctaLabel}</span>
                  </button>

                  <button
                    onClick={() => setSelectedSpecialty(spec)}
                    className="w-full sm:w-auto p-2.5 text-xs font-medium text-[#23483F] hover:bg-[#23483F]/5 rounded-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                    title="Mais informações sobre esta especialidade"
                  >
                    <span>Detalhes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Specialty In-Depth Modal */}
      <SpecialtyModal
        specialty={selectedSpecialty}
        onClose={() => setSelectedSpecialty(null)}
        onSelectBooking={onSelectBooking}
      />
    </section>
  );
};
