import React, { useState, useEffect } from 'react';
import { Menu, X, CalendarCheck, Settings2, Phone } from 'lucide-react';
import { ClinicConfig } from '../types';
import { SeravitaLogo } from './SeravitaLogo';

interface HeaderProps {
  config: ClinicConfig;
  onOpenBooking: () => void;
  onOpenSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({ config, onOpenBooking, onOpenSettings }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Início', href: '#inicio' },
    { label: 'A Clínica', href: '#sobre' },
    { label: 'Especialidades', href: '#especialidades' },
    { label: 'Profissionais', href: '#equipe' },
    { label: 'Estrutura', href: '#espaco' },
    { label: 'Contato', href: '#contato' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F7F6F1]/95 backdrop-blur-md shadow-xs border-b border-[#23483F]/10 py-3.5'
          : 'bg-[#F7F6F1]/80 backdrop-blur-xs py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Single element Brand Wordmark with Logo */}
          <a
            href="#inicio"
            className="group whitespace-nowrap shrink-0 transition-opacity hover:opacity-90"
            aria-label="Seravita - Página Inicial"
          >
            <SeravitaLogo variant="dark" showSubtitle={true} symbolSize={34} />
          </a>

          {/* Zone 2: 4-6 concise single-line nav links */}
          <nav className="hidden lg:flex items-center gap-7 text-[13.5px] font-medium tracking-wide text-[#343B38]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-[#23483F] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#23483F] hover:after:w-full after:transition-all after:duration-200 whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Clinic WhatsApp Direct Quick Dial */}
            <a
              href={`https://wa.me/${config.whatsappRaw}?text=${encodeURIComponent(
                'Olá! Acessei o site da Seravita e gostaria de obter informações sobre os atendimentos e agendamentos.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#23483F] hover:text-[#23483F]/80 font-medium px-2.5 py-1.5 rounded-sm transition-colors"
              title="Falar no WhatsApp"
            >
              <Phone className="w-3.5 h-3.5 text-[#A6B9A8]" />
              <span className="whitespace-nowrap">{config.whatsappDisplay}</span>
            </a>

            <button
              onClick={onOpenSettings}
              title="Configurações da clínica (Telefone/WhatsApp)"
              className="p-2 text-[#343B38]/60 hover:text-[#23483F] transition-colors rounded-sm cursor-pointer"
              aria-label="Configurações de contato da clínica"
            >
              <Settings2 className="w-4 h-4" />
            </button>

            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-4.5 py-2.5 text-xs font-semibold tracking-wider uppercase text-white bg-[#23483F] hover:bg-[#1b3831] active:scale-[0.99] transition-all rounded-xs shadow-xs cursor-pointer whitespace-nowrap shrink-0"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Agendar consulta</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#343B38] hover:text-[#23483F] focus:outline-hidden cursor-pointer"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#23483F]/10 bg-[#F7F6F1] px-6 pt-3 pb-6 shadow-md animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col divide-y divide-[#23483F]/10 text-sm font-medium text-[#343B38]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-3 hover:text-[#23483F] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-5 pt-4 border-t border-[#23483F]/10 flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 text-center text-xs font-semibold tracking-wider uppercase text-white bg-[#23483F] hover:bg-[#1b3831] transition-colors rounded-xs shadow-xs"
            >
              Agendar consulta
            </button>
            <a
              href={`https://wa.me/${config.whatsappRaw}?text=${encodeURIComponent(
                'Olá! Acessei o site da Seravita e gostaria de obter informações sobre os atendimentos e agendamentos.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-2.5 text-center text-xs font-medium text-[#23483F] border border-[#23483F]/20 hover:bg-[#A6B9A8]/10 transition-colors rounded-xs"
            >
              Falar no WhatsApp: {config.whatsappDisplay}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
