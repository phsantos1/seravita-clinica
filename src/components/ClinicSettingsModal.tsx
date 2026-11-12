import React, { useState } from 'react';
import { X, Save, RotateCcw, Building, Phone, MessageCircle, MapPin } from 'lucide-react';
import { ClinicConfig } from '../types';
import { INITIAL_CLINIC_CONFIG } from '../data/seravitaData';

interface ClinicSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: ClinicConfig;
  onSaveConfig: (updated: ClinicConfig) => void;
}

export const ClinicSettingsModal: React.FC<ClinicSettingsModalProps> = ({
  isOpen,
  onClose,
  config,
  onSaveConfig,
}) => {
  const [formData, setFormData] = useState<ClinicConfig>({ ...config });
  const [savedNotice, setSavedNotice] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Normalize raw phone numbers (digits only)
    const cleanedRawWhatsapp = formData.whatsappRaw.replace(/\D/g, '');
    const cleanedRawPhone = formData.phoneRaw.replace(/\D/g, '');

    const updated: ClinicConfig = {
      ...formData,
      whatsappRaw: cleanedRawWhatsapp || '5511987654321',
      phoneRaw: cleanedRawPhone || '551132807000',
    };

    onSaveConfig(updated);
    setSavedNotice(true);
    setTimeout(() => {
      setSavedNotice(false);
      onClose();
    }, 900);
  };

  const handleReset = () => {
    setFormData({ ...INITIAL_CLINIC_CONFIG });
    onSaveConfig({ ...INITIAL_CLINIC_CONFIG });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#23483F]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#FFFFFF] rounded-xs shadow-2xl border border-[#23483F]/15 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#F7F6F1] px-6 py-5 border-b border-[#23483F]/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Building className="w-5 h-5 text-[#23483F]" />
            <div>
              <h3 className="font-serif text-lg text-[#23483F]">
                Configuração dos Dados da Clínica
              </h3>
              <p className="text-[11px] text-[#343B38]/70">
                Ajuste os canais de contato e o número de WhatsApp oficial
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#343B38]/60 hover:text-[#23483F] rounded-xs transition-colors cursor-pointer"
            aria-label="Fechar configurações"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="p-3 bg-[#A6B9A8]/15 border border-[#A6B9A8]/30 rounded-xs text-xs text-[#23483F]">
            Conforme especificado, os dados de contato definitivos da Seravita podem ser atualizados
            aqui a qualquer momento para testes ou homologação.
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#343B38] mb-1">
              WhatsApp Oficial (Exibição)
            </label>
            <div className="relative">
              <MessageCircle className="w-4 h-4 text-[#343B38]/50 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.whatsappDisplay}
                onChange={(e) => setFormData({ ...formData, whatsappDisplay: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs border border-[#23483F]/20 rounded-xs focus:ring-1 focus:ring-[#23483F] focus:outline-hidden"
                placeholder="(11) 97346-0066"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#343B38] mb-1">
              WhatsApp Oficial (DDI + DDD + Número apenas dígitos)
            </label>
            <input
              type="text"
              value={formData.whatsappRaw}
              onChange={(e) => setFormData({ ...formData, whatsappRaw: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-[#23483F]/20 rounded-xs font-mono focus:ring-1 focus:ring-[#23483F] focus:outline-hidden"
              placeholder="5511973460066"
            />
            <span className="text-[10px] text-[#343B38]/60 mt-0.5 block">
              Usado para links diretos via wa.me (Exemplo: 5511973460066)
            </span>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#343B38] mb-1">
              Telefone de Atendimento
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-[#343B38]/50 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.phoneDisplay}
                onChange={(e) => setFormData({ ...formData, phoneDisplay: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs border border-[#23483F]/20 rounded-xs focus:ring-1 focus:ring-[#23483F] focus:outline-hidden"
                placeholder="(11) 97346-0066"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#343B38] mb-1">
              Endereço / Bairro
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-[#343B38]/50 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={formData.addressDisplay}
                onChange={(e) => setFormData({ ...formData, addressDisplay: e.target.value })}
                className="w-full pl-9 pr-3 py-2 text-xs border border-[#23483F]/20 rounded-xs focus:ring-1 focus:ring-[#23483F] focus:outline-hidden"
                placeholder="Av. Brigadeiro Luís Antônio, 2800 — Jardim Paulista"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#343B38] mb-1">
              Horários de Atendimento
            </label>
            <input
              type="text"
              value={formData.hoursDisplay}
              onChange={(e) => setFormData({ ...formData, hoursDisplay: e.target.value })}
              className="w-full px-3 py-2 text-xs border border-[#23483F]/20 rounded-xs focus:ring-1 focus:ring-[#23483F] focus:outline-hidden"
              placeholder="Segunda a Sexta, das 07h30 às 19h30 | Sábados, das 08h às 13h"
            />
          </div>

          {/* Action Buttons */}
          <div className="pt-4 border-t border-[#23483F]/10 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="text-xs text-[#343B38]/70 hover:text-[#23483F] inline-flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Restaurar Padrão</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-medium text-[#343B38] hover:text-[#23483F] cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-[#23483F] hover:bg-[#1b3831] rounded-xs shadow-xs cursor-pointer"
              >
                <Save className="w-3.5 h-3.5" />
                <span>{savedNotice ? 'Salvo!' : 'Salvar Alterações'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
