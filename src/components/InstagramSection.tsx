import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';
import { INSTAGRAM_POSTS } from '../data/seravitaData';
import { ClinicConfig } from '../types';

interface InstagramSectionProps {
  config: ClinicConfig;
}

export const InstagramSection: React.FC<InstagramSectionProps> = ({ config }) => {
  return (
    <section className="py-20 md:py-28 bg-[#F7F6F1] border-b border-[#23483F]/10">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.2em] text-[#23483F] uppercase mb-3">
              <Instagram className="w-4 h-4" />
              <span>Presença Digital</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#23483F] tracking-tight mb-2">
              Continue acompanhando a Seravita.
            </h2>
            <p className="text-sm sm:text-base text-[#343B38]/80 leading-relaxed">
              Informações, novidades e conteúdos sobre saúde e cuidado.
            </p>
          </div>

          <a
            href={config.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[#23483F] border border-[#23483F]/30 hover:bg-[#23483F]/5 rounded-xs transition-colors shrink-0 whitespace-nowrap"
          >
            <span>Acompanhar no Instagram</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Instagram Post Editorial Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INSTAGRAM_POSTS.map((post) => (
            <a
              key={post.id}
              href={config.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#FFFFFF] p-6 rounded-xs border border-[#23483F]/10 hover:border-[#23483F]/35 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-[#343B38]/60 mb-3">
                  <span className="font-mono text-[#23483F] font-semibold">{post.tag}</span>
                  <span>{post.date}</span>
                </div>
                <h3 className="font-serif text-lg text-[#23483F] group-hover:text-[#1b3831] mb-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-[#343B38]/80 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
              </div>

              <div className="pt-3 border-t border-[#23483F]/5 flex items-center justify-between text-[11px] text-[#23483F] font-medium">
                <span>@clinicaseravita</span>
                <span className="group-hover:translate-x-0.5 transition-transform">Ler post →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
