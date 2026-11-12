import React from 'react';
import { X, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { Specialty } from '../types';

interface SpecialtyModalProps {
  specialty: Specialty | null;
  onClose: () => void;
  onSelectBooking: (specialtyId: string) => void;
}

export const SpecialtyModal: React.FC<SpecialtyModalProps> = ({
  specialty,
  onClose,
  onSelectBooking,
}) => {
  if (!specialty) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#23483F]/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#FFFFFF] rounded-xs shadow-xl border border-[#23483F]/15 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#F7F6F1] px-6 sm:px-8 py-6 border-b border-[#23483F]/10 flex items-start justify-between gap-4">
          <div>
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#23483F]">
              Especialidade Médica Seravita
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#23483F] mt-1">
              {specialty.name}
            </h3>
            <p className="text-xs sm:text-sm text-[#343B38]/80 mt-1 italic">
              {specialty.tagline}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#343B38]/60 hover:text-[#23483F] hover:bg-[#23483F]/5 rounded-sm transition-colors cursor-pointer"
            aria-label="Fechar detalhes"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 sm:px-8 py-6 space-y-6">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#343B38]/70 mb-2">
              Sobre o Atendimento
            </h4>
            <p className="text-sm sm:text-base text-[#343B38] leading-relaxed">
              {specialty.description}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#343B38]/70 mb-3">
              Áreas de Avaliação e Cuidado
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {specialty.topics.map((topic, i) => (
                <div
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-xs bg-[#F7F6F1] border border-[#23483F]/5 text-xs text-[#343B38]"
                >
                  <CheckCircle2 className="w-4 h-4 text-[#23483F] shrink-0 mt-0.5" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xs bg-[#A6B9A8]/15 border border-[#A6B9A8]/30 text-xs text-[#23483F] flex items-center justify-between gap-3">
            <span>
              Consultas individuais dedicadas à sua saúde, com tempo adequado de escuta e diagnóstico.
            </span>
            <span className="font-serif italic font-semibold shrink-0">São Paulo</span>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#F7F6F1] px-6 sm:px-8 py-4 border-t border-[#23483F]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-medium text-[#343B38] hover:text-[#23483F] transition-colors cursor-pointer"
          >
            Voltar
          </button>
          <button
            onClick={() => {
              onClose();
              onSelectBooking(specialty.id);
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#23483F] hover:bg-[#1b3831] rounded-xs shadow-xs transition-colors cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Agendar Consulta em {specialty.name}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
