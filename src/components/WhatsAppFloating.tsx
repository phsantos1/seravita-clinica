import React from 'react';
import { MessageCircle } from 'lucide-react';
import { ClinicConfig } from '../types';

interface WhatsAppFloatingProps {
  config: ClinicConfig;
}

export const WhatsAppFloating: React.FC<WhatsAppFloatingProps> = ({ config }) => {
  const message = encodeURIComponent(
    'Olá! Acessei o site da Seravita e gostaria de obter informações sobre os atendimentos e agendamentos.'
  );
  const whatsappUrl = `https://wa.me/${config.whatsappRaw}?text=${message}`;

  return (
    <aside
      aria-label="Atendimento rápido via WhatsApp"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-30"
    >
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a Clínica Seravita no WhatsApp"
        className="group flex items-center gap-2.5 bg-[#23483F] hover:bg-[#1b3831] text-white p-3.5 sm:px-4 sm:py-3 rounded-full shadow-lg hover:shadow-xl border border-white/20 transition-all duration-300 hover:scale-105"
      >
        <MessageCircle className="w-5 h-5 text-[#A6B9A8] group-hover:text-white transition-colors" />
        <span className="hidden sm:inline-block text-xs font-semibold tracking-wide pr-1">
          WhatsApp Seravita
        </span>
      </a>
    </aside>
  );
};
