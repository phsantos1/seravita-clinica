import React from 'react';
import {
  MapPin,
  Phone,
  MessageCircle,
  Clock,
  Instagram,
  Navigation,
  Calendar,
  Settings,
} from 'lucide-react';
import { ClinicConfig } from '../types';

interface ContactSectionProps {
  config: ClinicConfig;
  onOpenBooking: () => void;
  onOpenSettings: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  config,
  onOpenBooking,
  onOpenSettings,
}) => {
  const whatsappUrl = `https://wa.me/${config.whatsappRaw}?text=${encodeURIComponent(
    'Olá! Acessei o site da Seravita e gostaria de obter informações sobre os atendimentos e agendamentos.'
  )}`;

  const mapsDirectionsUrl =
    config.mapsUrl || 'https://maps.app.goo.gl/c813bTiKet5eKoVB8';

  return (
    <section id="contato" className="py-20 md:py-28 bg-[#F7F6F1] border-b border-[#23483F]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 md:mb-18">
          <div className="text-xs font-semibold tracking-[0.2em] text-[#23483F] uppercase mb-3">
            Localização & Canais de Atendimento
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-[#23483F] tracking-tight leading-[1.18] mb-4 text-balance">
            Estamos aqui para cuidar de você.
          </h2>
          <p className="text-base sm:text-lg text-[#343B38]/80 leading-relaxed font-normal">
            Entre em contato para tirar dúvidas, agendar sua consulta ou conhecer melhor as
            especialidades médicas da Seravita.
          </p>
        </div>

        {/* 2-Column Layout: Details & Embedded Google Maps */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Contact Cards (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Address Card */}
            <div className="bg-[#FFFFFF] p-6 rounded-xs border border-[#23483F]/10 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xs bg-[#A6B9A8]/20 text-[#23483F] flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#343B38]/70">
                    Endereço
                  </h3>
                  <p className="text-sm font-medium text-[#23483F] mt-1 leading-snug">
                    {config.addressDisplay}
                  </p>
                  <p className="text-xs text-[#343B38]/80 mt-0.5">
                    {config.cityDisplay}
                  </p>
                </div>
              </div>
            </div>

            {/* Direct Phone & WhatsApp */}
            <div className="bg-[#FFFFFF] p-6 rounded-xs border border-[#23483F]/10 shadow-xs space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xs bg-[#A6B9A8]/20 text-[#23483F] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#343B38]/70">
                    Telefone Fixo
                  </h3>
                  <a
                    href={`tel:${config.phoneRaw}`}
                    className="text-sm font-semibold text-[#23483F] hover:underline mt-0.5 block"
                  >
                    {config.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t border-[#23483F]/5 flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xs bg-[#A6B9A8]/20 text-[#23483F] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#343B38]/70">
                    WhatsApp Oficial
                  </h3>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-semibold text-[#23483F] hover:underline mt-0.5 block"
                  >
                    {config.whatsappDisplay}
                  </a>
                </div>
              </div>
            </div>

            {/* Hours of Operation */}
            <div className="bg-[#FFFFFF] p-6 rounded-xs border border-[#23483F]/10 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xs bg-[#A6B9A8]/20 text-[#23483F] flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#343B38]/70">
                    Horário de Atendimento
                  </h3>
                  <p className="text-xs text-[#343B38]/90 mt-1 leading-relaxed">
                    {config.hoursDisplay}
                  </p>
                </div>
              </div>
            </div>

            {/* Instagram Link Card */}
            <div className="bg-[#FFFFFF] p-6 rounded-xs border border-[#23483F]/10 shadow-xs">
              <div className="flex items-start gap-3.5">
                <div className="w-9 h-9 rounded-xs bg-[#A6B9A8]/20 text-[#23483F] flex items-center justify-center shrink-0">
                  <Instagram className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-[#343B38]/70">
                    Instagram Oficial
                  </h3>
                  <a
                    href={config.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs sm:text-sm font-semibold text-[#23483F] hover:underline mt-0.5 block"
                  >
                    @clinicaseravita
                  </a>
                </div>
              </div>
            </div>

            {/* Config modifier prompt */}
            <div className="text-right">
              <button
                type="button"
                onClick={onOpenSettings}
                className="text-[11px] text-[#343B38]/60 hover:text-[#23483F] inline-flex items-center gap-1 cursor-pointer"
              >
                <Settings className="w-3 h-3" />
                <span>Configurar dados de contato da clínica</span>
              </button>
            </div>
          </div>

          {/* Right Column: Google Maps & 3 Requested Action Buttons (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Google Map Frame */}
            <div className="rounded-xs overflow-hidden border border-[#23483F]/15 shadow-sm bg-[#E9E4D9] h-[340px] sm:h-[400px]">
              <iframe
                title="Localização da Clínica Seravita em Santana, São Paulo - SP"
                src="https://maps.google.com/maps?q=Rua%20Banco%20das%20Palmas%2C%20401%2C%20Santana%2C%20S%C3%A3o%20Paulo%20-%20SP&t=&z=16&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* 3 Explicit Action Buttons from Prompt: [COMO CHEGAR], [FALAR COM A CLÍNICA], [AGENDAR CONSULTA] */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#23483F] bg-[#FFFFFF] border border-[#23483F]/25 hover:bg-[#23483F]/5 rounded-xs shadow-2xs transition-all text-center"
              >
                <Navigation className="w-4 h-4" />
                <span>Como Chegar</span>
              </a>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-[#23483F] bg-[#FFFFFF] border border-[#23483F]/25 hover:bg-[#23483F]/5 rounded-xs shadow-2xs transition-all text-center"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Falar com a Clínica</span>
              </a>

              <button
                onClick={onOpenBooking}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#23483F] hover:bg-[#1b3831] rounded-xs shadow-xs transition-all cursor-pointer text-center"
              >
                <Calendar className="w-4 h-4" />
                <span>Agendar Consulta</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
