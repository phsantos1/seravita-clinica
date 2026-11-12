import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';
import { FAQ_ITEMS } from '../data/seravitaData';
import { ClinicConfig } from '../types';

interface FAQProps {
  config: ClinicConfig;
}

export const FAQ: React.FC<FAQProps> = ({ config }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#23483F]/10">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-xs font-semibold tracking-[0.2em] text-[#23483F] uppercase mb-3">
            Dúvidas Frequentes
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#23483F] tracking-tight mb-4">
            Perguntas Frequentes
          </h2>
          <p className="text-sm sm:text-base text-[#343B38]/80 leading-relaxed">
            Reunimos as principais respostas sobre o funcionamento da clínica, agendamentos e
            especialidades médicas.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5 mb-10">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-[#F7F6F1] rounded-xs border border-[#23483F]/10 overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleAccordion(index)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-hidden"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg text-[#23483F] font-medium">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#23483F] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 pt-0 text-xs sm:text-sm text-[#343B38]/85 leading-relaxed border-t border-[#23483F]/5">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Additional Help Prompt */}
        <div className="p-6 rounded-xs bg-[#F7F6F1] border border-[#23483F]/15 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <h4 className="font-serif text-lg text-[#23483F]">Ainda tem alguma dúvida?</h4>
            <p className="text-xs text-[#343B38]/80 mt-0.5">
              Nossa equipe de recepção está à disposição para orientar você.
            </p>
          </div>
          <a
            href={`https://wa.me/${config.whatsappRaw}?text=${encodeURIComponent(
              'Olá! Acessei o site da Seravita e gostaria de tirar uma dúvida.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#23483F] hover:bg-[#1b3831] rounded-xs transition-colors whitespace-nowrap"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Falar com Atendimento</span>
          </a>
        </div>
      </div>
    </section>
  );
};
