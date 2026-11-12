import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Specialties } from './components/Specialties';
import { HowItWorks } from './components/HowItWorks';
import { BookingWizard } from './components/BookingWizard';
import { Doctors } from './components/Doctors';
import { ClinicGallery } from './components/ClinicGallery';
import { ContactSection } from './components/ContactSection';
import { FAQ } from './components/FAQ';
import { InstagramSection } from './components/InstagramSection';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { WhatsAppFloating } from './components/WhatsAppFloating';
import { ClinicSettingsModal } from './components/ClinicSettingsModal';
import { INITIAL_CLINIC_CONFIG } from './data/seravitaData';
import { ClinicConfig } from './types';

export default function App() {
  // Clinic Config state with localStorage persistence
  const [clinicConfig, setClinicConfig] = useState<ClinicConfig>(() => {
    try {
      const stored = localStorage.getItem('seravita_clinic_config');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.whatsappRaw === '5511987654321' || !parsed.mapsUrl) {
          const upgraded = {
            ...INITIAL_CLINIC_CONFIG,
            ...parsed,
            phoneDisplay: '(11) 97346-0066',
            phoneRaw: '5511973460066',
            whatsappDisplay: '(11) 97346-0066',
            whatsappRaw: '5511973460066',
            addressDisplay: INITIAL_CLINIC_CONFIG.addressDisplay,
            cityDisplay: INITIAL_CLINIC_CONFIG.cityDisplay,
            mapsUrl: INITIAL_CLINIC_CONFIG.mapsUrl,
          };
          localStorage.setItem('seravita_clinic_config', JSON.stringify(upgraded));
          return upgraded;
        }
        return { ...INITIAL_CLINIC_CONFIG, ...parsed };
      }
      return INITIAL_CLINIC_CONFIG;
    } catch {
      return INITIAL_CLINIC_CONFIG;
    }
  });

  // Settings modal visibility
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Pre-selected specialty ID to send into BookingWizard
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState<string | undefined>(undefined);

  const handleSaveConfig = (updated: ClinicConfig) => {
    setClinicConfig(updated);
    try {
      localStorage.setItem('seravita_clinic_config', JSON.stringify(updated));
    } catch (err) {
      console.error('Failed to save clinic config to localStorage', err);
    }
  };

  const scrollToBooking = (specialtyId?: string) => {
    if (specialtyId) {
      setSelectedSpecialtyId(specialtyId);
    }
    const element = document.getElementById('agendamento');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSpecialties = () => {
    const element = document.getElementById('especialidades');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F6F1] text-[#343B38] flex flex-col selection:bg-[#A6B9A8]/30 selection:text-[#23483F]">
      {/* Fixed Header */}
      <Header
        config={clinicConfig}
        onOpenBooking={() => scrollToBooking()}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenBooking={() => scrollToBooking()}
          onExploreSpecialties={scrollToSpecialties}
        />

        {/* 2. Institutional About Section */}
        <About />

        {/* 3. Medical Specialties Section */}
        <Specialties onSelectBooking={(specId) => scrollToBooking(specId)} />

        {/* 4. How It Works Step-by-Step */}
        <HowItWorks onOpenBooking={() => scrollToBooking()} />

        {/* 5. Booking System (Central Functional Wizard) */}
        <BookingWizard
          initialSpecialtyId={selectedSpecialtyId}
          config={clinicConfig}
          onClearInitialSpecialty={() => setSelectedSpecialtyId(undefined)}
        />

        {/* 6. Medical Staff / Team Presentation */}
        <Doctors onSelectBooking={(specId) => scrollToBooking(specId)} />

        {/* 7. Clinic Gallery / Spaces */}
        <ClinicGallery />

        {/* 8. Contact & Location with Google Maps */}
        <ContactSection
          config={clinicConfig}
          onOpenBooking={() => scrollToBooking()}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* 9. Verified FAQs */}
        <FAQ config={clinicConfig} />

        {/* 10. Instagram & Digital Presence */}
        <InstagramSection config={clinicConfig} />

        {/* 11. Final Conversion CTA */}
        <FinalCTA
          config={clinicConfig}
          onOpenBooking={() => scrollToBooking()}
        />
      </main>

      {/* Footer */}
      <Footer
        config={clinicConfig}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenBooking={() => scrollToBooking()}
      />

      {/* Persistent WhatsApp Floating Button */}
      <WhatsAppFloating config={clinicConfig} />

      {/* Config / Customization Modal */}
      <ClinicSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        config={clinicConfig}
        onSaveConfig={handleSaveConfig}
      />
    </div>
  );
}
