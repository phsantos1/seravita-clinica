import React from 'react';
import { Instagram, Settings, Heart } from 'lucide-react';
import { ClinicConfig } from '../types';
import { SeravitaLogo } from './SeravitaLogo';

interface FooterProps {
  config: ClinicConfig;
  onOpenSettings: () => void;
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ config, onOpenSettings, onOpenBooking }) => {
  return (
    <footer className="bg-[#1c3831] text-white/80 py-16 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Signature (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <SeravitaLogo variant="light" showSubtitle={true} symbolSize={38} />

            <p className="font-serif italic text-base text-[#A6B9A8]">
              "Ser visto, ser ouvido, ser cuidado, Seravita."
            </p>

            <p className="text-xs text-white/60 leading-relaxed max-w-sm">
              Clínica médica multidisciplinar em São Paulo dedicada ao cuidado individualizado em
              Ortopedia, Dermatologia, Urologia, Cirurgia Vascular e Medicina de Família.
            </p>

            <div className="pt-2">
              <a
                href={config.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs text-white/80 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#A6B9A8]" />
                <span>@clinicaseravita</span>
              </a>
            </div>
          </div>

          {/* Specialties Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Especialidades
            </h4>
            <ul className="space-y-2 text-xs text-white/70">
              <li>
                <a href="#especialidades" className="hover:text-white transition-colors">
                  Ortopedia
                </a>
              </li>
              <li>
                <a href="#especialidades" className="hover:text-white transition-colors">
                  Dermatologia
                </a>
              </li>
              <li>
                <a href="#especialidades" className="hover:text-white transition-colors">
                  Urologia
                </a>
              </li>
              <li>
                <a href="#especialidades" className="hover:text-white transition-colors">
                  Cirurgia Vascular
                </a>
              </li>
              <li>
                <a href="#especialidades" className="hover:text-white transition-colors">
                  Medicina de Família
                </a>
              </li>
            </ul>
          </div>

          {/* Navigation & Contact Info (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white">
              Atendimento & Localização
            </h4>
            <div className="text-xs text-white/70 space-y-1.5 leading-relaxed">
              <p>{config.addressDisplay}</p>
              <p>{config.cityDisplay}</p>
              <p className="pt-1">Telefone: {config.phoneDisplay}</p>
              <p>WhatsApp: {config.whatsappDisplay}</p>
              <p className="pt-1 text-white/50">{config.hoursDisplay}</p>
            </div>

            <div className="pt-3">
              <button
                onClick={onOpenBooking}
                className="inline-block px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#23483F] bg-[#A6B9A8] hover:bg-white rounded-xs transition-colors cursor-pointer"
              >
                Solicitar Agendamento
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, LGPD compliance, and settings trigger */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-white/50">
          <p>© {new Date().getFullYear()} Clínica Seravita. Todos os direitos reservados.</p>

          <div className="flex items-center gap-4">
            <span>Privacidade & LGPD em Conformidade</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={onOpenSettings}
              className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              title="Ajustar dados de contato da clínica"
            >
              <Settings className="w-3 h-3" />
              <span>Configurações</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
