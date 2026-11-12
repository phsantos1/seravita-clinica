import React, { useState } from 'react';
import { Maximize2, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/seravitaData';

export const ClinicGallery: React.FC = () => {
  const [activeModalIndex, setActiveModalIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setActiveModalIndex(index);
  };

  const closeLightbox = () => {
    setActiveModalIndex(null);
  };

  const nextImage = () => {
    if (activeModalIndex !== null) {
      setActiveModalIndex((activeModalIndex + 1) % GALLERY_ITEMS.length);
    }
  };

  const prevImage = () => {
    if (activeModalIndex !== null) {
      setActiveModalIndex(
        (activeModalIndex - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
      );
    }
  };

  return (
    <section id="espaco" className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#23483F]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 md:mb-18">
          <div className="text-xs font-semibold tracking-[0.2em] text-[#23483F] uppercase mb-3">
            Estrutura & Conforto
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] text-[#23483F] tracking-tight leading-[1.18] mb-4 text-balance">
            Um espaço pensado para acolher.
          </h2>
          <p className="text-base sm:text-lg text-[#343B38]/80 leading-relaxed font-normal">
            Ambientes planejados para oferecer tranquilidade, conforto e privacidade durante todo o
            tempo de sua permanência na clínica.
          </p>
        </div>

        {/* Gallery Grid with Varied Sizing */}
        <div className="space-y-6">
          {/* Top Row: 7-col Marquee Facade & 5-col Reception Lounge */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Facade with Seravita Signage */}
            <div
              onClick={() => openLightbox(0)}
              className="md:col-span-7 group relative overflow-hidden rounded-xs bg-[#E9E4D9] border border-[#23483F]/10 cursor-pointer min-h-[340px] sm:min-h-[420px]"
            >
              <img
                src={GALLERY_ITEMS[0].imageSrc}
                alt={GALLERY_ITEMS[0].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#23483F]/90 via-[#23483F]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-7 text-white flex items-end justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#A6B9A8]">
                    {GALLERY_ITEMS[0].category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl mt-1 text-white">
                    {GALLERY_ITEMS[0].title}
                  </h3>
                  <p className="text-xs text-white/85 mt-1 max-w-md line-clamp-2">
                    {GALLERY_ITEMS[0].description}
                  </p>
                </div>
                <span className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xs transition-colors shrink-0">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>
            </div>

            {/* Reception Lounge */}
            <div
              onClick={() => openLightbox(1)}
              className="md:col-span-5 group relative overflow-hidden rounded-xs bg-[#E9E4D9] border border-[#23483F]/10 cursor-pointer min-h-[340px] sm:min-h-[420px]"
            >
              <img
                src={GALLERY_ITEMS[1].imageSrc}
                alt={GALLERY_ITEMS[1].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#23483F]/90 via-[#23483F]/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-7 text-white flex items-end justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#A6B9A8]">
                    {GALLERY_ITEMS[1].category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl mt-1 text-white">
                    {GALLERY_ITEMS[1].title}
                  </h3>
                  <p className="text-xs text-white/85 mt-1 max-w-md line-clamp-2">
                    {GALLERY_ITEMS[1].description}
                  </p>
                </div>
                <span className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xs transition-colors shrink-0">
                  <Maximize2 className="w-4 h-4" />
                </span>
              </div>
            </div>
          </div>

          {/* Bottom Row: 3 Consultation & Care Spaces */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_ITEMS.slice(2).map((item, idx) => {
              const actualIndex = idx + 2;
              return (
                <div
                  key={item.id}
                  onClick={() => openLightbox(actualIndex)}
                  className="group relative overflow-hidden rounded-xs bg-[#E9E4D9] border border-[#23483F]/10 cursor-pointer h-[240px]"
                >
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#23483F]/85 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute bottom-0 inset-x-0 p-5 text-white flex items-end justify-between">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#A6B9A8]">
                        {item.category}
                      </span>
                      <h4 className="font-serif text-base sm:text-lg mt-0.5 text-white">
                        {item.title}
                      </h4>
                    </div>
                    <span className="p-2 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-xs transition-colors shrink-0">
                      <Maximize2 className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Location & maps banner below gallery */}
        <div className="mt-8 pt-5 border-t border-[#23483F]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#343B38]/80">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#23483F]" />
            <span>
              <strong>Localização da Clínica:</strong> Rua Banco das Palmas, 401 — Santana, São Paulo - SP (CEP 02016-020)
            </span>
          </div>

          <a
            href="https://maps.app.goo.gl/c813bTiKet5eKoVB8"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold text-[#23483F] hover:underline"
          >
            <span>Ver no Google Maps</span>
            <span>↗</span>
          </a>
        </div>
      </div>

      {/* Lightbox Modal */}
      {activeModalIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#23483F]/90 backdrop-blur-md animate-in fade-in duration-200"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full bg-[#FFFFFF] rounded-xs overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[380px] sm:h-[500px] bg-black">
              <img
                src={GALLERY_ITEMS[activeModalIndex].imageSrc}
                alt={GALLERY_ITEMS[activeModalIndex].title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />

              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors cursor-pointer"
                aria-label="Fechar ampliação"
              >
                <X className="w-5 h-5" />
              </button>

              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors cursor-pointer"
                aria-label="Imagem anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors cursor-pointer"
                aria-label="Próxima imagem"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-[#F7F6F1] flex items-center justify-between border-t border-[#23483F]/10">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#23483F]">
                  {GALLERY_ITEMS[activeModalIndex].category}
                </span>
                <h3 className="font-serif text-xl text-[#23483F]">
                  {GALLERY_ITEMS[activeModalIndex].title}
                </h3>
                <p className="text-xs text-[#343B38]/80 mt-1 max-w-xl">
                  {GALLERY_ITEMS[activeModalIndex].description}
                </p>
              </div>
              <span className="font-mono text-xs text-[#343B38]/60 shrink-0">
                {activeModalIndex + 1} / {GALLERY_ITEMS.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
