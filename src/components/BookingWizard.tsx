import React, { useState, useEffect } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Send,
  RotateCcw,
  Shield,
  FileCheck2,
  Stethoscope,
  Info,
} from 'lucide-react';
import { SPECIALTIES, DOCTORS } from '../data/seravitaData';
import { ClinicConfig, BookingState, BookingSubmission } from '../types';

interface BookingWizardProps {
  initialSpecialtyId?: string;
  config: ClinicConfig;
  onClearInitialSpecialty?: () => void;
}

export const BookingWizard: React.FC<BookingWizardProps> = ({
  initialSpecialtyId,
  config,
  onClearInitialSpecialty,
}) => {
  // Current Step: 1 to 7
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Booking Form State
  const [booking, setBooking] = useState<BookingState>({
    specialtyId: '',
    specialtyName: '',
    doctorId: '',
    doctorName: '',
    date: '',
    timeSlot: '',
    patientName: '',
    patientPhone: '',
    patientEmail: '',
    notes: '',
    lgpdConsent: true,
  });

  // Completed submission data (for Step 7)
  const [submission, setSubmission] = useState<BookingSubmission | null>(null);

  // Form error message
  const [formError, setFormError] = useState<string | null>(null);

  // Calendar State
  const [calendarMonth, setCalendarMonth] = useState<Date>(() => new Date());

  // Listen to initialSpecialtyId prop
  useEffect(() => {
    if (initialSpecialtyId) {
      const spec = SPECIALTIES.find((s) => s.id === initialSpecialtyId);
      if (spec) {
        setBooking((prev) => ({
          ...prev,
          specialtyId: spec.id,
          specialtyName: spec.name,
        }));
        setCurrentStep(2);
      }
    }
  }, [initialSpecialtyId]);

  // Available Doctors for selected specialty
  const availableDoctors = DOCTORS.filter(
    (doc) => doc.specialtyId === 'todas' || doc.specialtyId === booking.specialtyId
  );

  // Available Time Slots
  const morningSlots = ['08:00', '09:00', '10:00', '11:00'];
  const afternoonSlots = ['13:30', '14:30', '15:30', '16:30', '17:30'];

  // Calendar helper functions
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const nextMonth = () => {
    setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    const today = new Date();
    const isCurrentMonth =
      calendarMonth.getFullYear() === today.getFullYear() &&
      calendarMonth.getMonth() === today.getMonth();
    if (!isCurrentMonth) {
      setCalendarMonth(new Date(calendarMonth.getFullYear(), calendarMonth.getMonth() - 1, 1));
    }
  };

  // Calendar day generator
  const renderCalendarDays = () => {
    const year = calendarMonth.getFullYear();
    const month = calendarMonth.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayIndex = getFirstDayOfMonth(year, month);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const days = [];

    // Empty cells before month starts
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 sm:h-11" />);
    }

    // Days of month
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      currentDate.setHours(0, 0, 0, 0);

      const dayOfWeek = currentDate.getDay(); // 0 is Sunday
      const isPast = currentDate < today;
      const isSunday = dayOfWeek === 0;
      const isAvailable = !isPast && !isSunday;

      const dateString = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const isSelected = booking.date === dateString;
      const isToday = currentDate.getTime() === today.getTime();

      days.push(
        <button
          key={day}
          disabled={!isAvailable}
          type="button"
          onClick={() => {
            setBooking((prev) => ({ ...prev, date: dateString }));
            setFormError(null);
          }}
          className={`h-10 sm:h-11 rounded-xs flex flex-col items-center justify-center text-xs sm:text-sm font-medium transition-all ${
            isSelected
              ? 'bg-[#23483F] text-white font-bold shadow-xs'
              : isAvailable
              ? 'hover:bg-[#A6B9A8]/20 text-[#343B38] cursor-pointer'
              : 'text-[#343B38]/25 cursor-not-allowed bg-transparent'
          } ${isToday && !isSelected ? 'border border-[#23483F]/30' : ''}`}
        >
          <span>{day}</span>
          {isAvailable && !isSelected && (
            <span className="w-1 h-1 rounded-full bg-[#A6B9A8] mt-0.5" />
          )}
        </button>
      );
    }

    return days;
  };

  // Handle specialty selection (Step 1 -> 2)
  const handleSelectSpecialty = (specId: string, specName: string) => {
    setBooking((prev) => ({
      ...prev,
      specialtyId: specId,
      specialtyName: specName,
      doctorId: '',
      doctorName: '',
    }));
    setFormError(null);
    setCurrentStep(2);
  };

  // Handle doctor selection (Step 2 -> 3)
  const handleSelectDoctor = (docId: string, docName: string) => {
    setBooking((prev) => ({
      ...prev,
      doctorId: docId,
      doctorName: docName,
    }));
    setFormError(null);
    setCurrentStep(3);
  };

  // Validate and submit request
  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();

    if (!booking.patientName.trim()) {
      setFormError('Por favor, informe seu nome completo.');
      return;
    }
    if (!booking.patientPhone.trim() || booking.patientPhone.replace(/\D/g, '').length < 10) {
      setFormError('Por favor, informe um telefone válido com DDD para contato.');
      return;
    }
    if (!booking.lgpdConsent) {
      setFormError('É necessário autorizar o contato da equipe da clínica para prosseguir.');
      return;
    }

    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const protocol = `SVT-SP-${randomCode}`;

    const submissionData: BookingSubmission = {
      ...booking,
      protocolNumber: protocol,
      createdAt: new Date().toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'solicitada',
    };

    setSubmission(submissionData);
    setCurrentStep(7);
    setFormError(null);
  };

  // Format date for display in PT-BR
  const formatDisplayDate = (dateStr: string) => {
    if (!dateStr) return '';
    const [y, m, d] = dateStr.split('-');
    return `${d}/${m}/${y}`;
  };

  // Reset booking form
  const handleReset = () => {
    setBooking({
      specialtyId: '',
      specialtyName: '',
      doctorId: '',
      doctorName: '',
      date: '',
      timeSlot: '',
      patientName: '',
      patientPhone: '',
      patientEmail: '',
      notes: '',
      lgpdConsent: true,
    });
    setSubmission(null);
    setCurrentStep(1);
    setFormError(null);
    if (onClearInitialSpecialty) onClearInitialSpecialty();
  };

  // WhatsApp Message Composer
  const generateWhatsAppMessage = () => {
    if (!submission) return '';
    return encodeURIComponent(
      `Olá! Gostaria de confirmar minha solicitação de agendamento na Clínica Seravita:\n\n` +
      `📋 Protocolo: ${submission.protocolNumber}\n` +
      `🩺 Especialidade: ${submission.specialtyName}\n` +
      `👤 Profissional: ${submission.doctorName}\n` +
      `📅 Data desejada: ${formatDisplayDate(submission.date)}\n` +
      `⏰ Horário preferencial: ${submission.timeSlot}\n\n` +
      `Dados do Paciente:\n` +
      `• Nome: ${submission.patientName}\n` +
      `• Telefone: ${submission.patientPhone}\n` +
      (submission.patientEmail ? `• E-mail: ${submission.patientEmail}\n` : '') +
      (submission.notes ? `• Observação: ${submission.notes}\n` : '') +
      `\nAguardando o retorno da equipe Seravita.`
    );
  };

  return (
    <section id="agendamento" className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#23483F]/10 relative">
      <div className="max-w-4xl mx-auto px-6 sm:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold tracking-[0.2em] text-[#23483F] uppercase mb-2">
            Sistema de Agendamento Seravita
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#23483F] tracking-tight mb-3">
            Solicite sua consulta médica
          </h2>
          <p className="text-sm sm:text-base text-[#343B38]/80">
            Siga os passos abaixo para escolher sua especialidade e indicar a melhor data. Nossa
            equipe entrará em contato para confirmar sua reserva.
          </p>
        </div>

        {/* Progress Indicator (Steps 1 to 6) */}
        {currentStep < 7 && (
          <div className="mb-10">
            <div className="flex items-center justify-between text-xs font-medium text-[#343B38]/70 mb-2">
              <span>Etapa {currentStep} de 6</span>
              <span className="font-mono text-[#23483F]">
                {currentStep === 1 && 'Especialidade'}
                {currentStep === 2 && 'Profissional'}
                {currentStep === 3 && 'Data da Consulta'}
                {currentStep === 4 && 'Turno / Horário'}
                {currentStep === 5 && 'Seus Dados'}
                {currentStep === 6 && 'Revisão'}
              </span>
            </div>
            <div className="w-full bg-[#E9E4D9] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#23483F] h-full transition-all duration-300"
                style={{ width: `${(currentStep / 6) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Wizard Main Container */}
        <div className="bg-[#F7F6F1] rounded-xs border border-[#23483F]/15 p-6 sm:p-10 shadow-xs min-h-[460px] flex flex-col justify-between">
          {/* STEP 1: Escolha da Especialidade */}
          {currentStep === 1 && (
            <div className="animate-in fade-in duration-200">
              <div className="mb-6">
                <span className="text-[11px] font-mono text-[#23483F] uppercase tracking-wider">
                  Etapa 01
                </span>
                <h3 className="font-serif text-2xl text-[#23483F] mt-1">
                  Qual especialidade você procura?
                </h3>
                <p className="text-xs sm:text-sm text-[#343B38]/80 mt-1">
                  Selecione uma das cinco especialidades médicas disponíveis na Seravita.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-8">
                {SPECIALTIES.map((spec) => (
                  <button
                    key={spec.id}
                    type="button"
                    onClick={() => handleSelectSpecialty(spec.id, spec.name)}
                    className={`p-4 text-left rounded-xs border transition-all cursor-pointer flex flex-col justify-between group ${
                      booking.specialtyId === spec.id
                        ? 'bg-[#FFFFFF] border-[#23483F] shadow-xs'
                        : 'bg-[#FFFFFF] border-[#23483F]/10 hover:border-[#23483F]/40'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <h4 className="font-serif text-lg text-[#23483F] group-hover:text-[#1b3831]">
                          {spec.name}
                        </h4>
                        <span className="text-xs text-[#23483F] opacity-0 group-hover:opacity-100 transition-opacity">
                          Selecionar →
                        </span>
                      </div>
                      <p className="text-xs text-[#343B38]/75 line-clamp-2 leading-relaxed">
                        {spec.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Escolha do Profissional */}
          {currentStep === 2 && (
            <div className="animate-in fade-in duration-200">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-mono text-[#23483F] uppercase tracking-wider">
                    Etapa 02 — {booking.specialtyName}
                  </span>
                  <h3 className="font-serif text-2xl text-[#23483F] mt-1">
                    Escolha a preferência de atendimento
                  </h3>
                  <p className="text-xs sm:text-sm text-[#343B38]/80 mt-1">
                    Selecione um profissional específico ou opte pelo primeiro horário disponível.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="text-xs text-[#23483F] hover:underline flex items-center gap-1 cursor-pointer pt-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Trocar especialidade</span>
                </button>
              </div>

              {/* Informative notice regarding accredited clinical board */}
              <div className="p-3.5 rounded-xs bg-[#FFFFFF] border border-[#23483F]/10 text-xs text-[#343B38]/80 mb-5 flex items-start gap-2.5">
                <Info className="w-4 h-4 text-[#23483F] shrink-0 mt-0.5" />
                <span>
                  O corpo clínico da Seravita é formado por médicos especialistas com registro ativo
                  e títulos chancelados pelas respectivas sociedades médicas.
                </span>
              </div>

              <div className="space-y-3 mb-8">
                {availableDoctors.map((doc) => (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => handleSelectDoctor(doc.id, doc.name)}
                    className={`w-full p-4.5 text-left rounded-xs border transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                      booking.doctorId === doc.id
                        ? 'bg-[#FFFFFF] border-[#23483F] shadow-xs ring-1 ring-[#23483F]'
                        : 'bg-[#FFFFFF] border-[#23483F]/10 hover:border-[#23483F]/40'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-10 h-10 rounded-xs bg-[#A6B9A8]/20 text-[#23483F] flex items-center justify-center shrink-0 mt-0.5">
                        <Stethoscope className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-serif text-base sm:text-lg text-[#23483F]">
                            {doc.name}
                          </h4>
                        </div>
                        <p className="text-xs text-[#343B38]/70 mt-0.5">
                          {doc.specialtyName} · <span className="font-mono">{doc.crm}</span>
                        </p>
                        <p className="text-xs text-[#343B38]/80 mt-1.5 leading-relaxed">
                          {doc.presentation}
                        </p>
                      </div>
                    </div>

                    <div className="sm:self-center shrink-0">
                      <span className="inline-block px-3 py-1.5 text-xs font-semibold text-[#23483F] bg-[#A6B9A8]/20 rounded-xs">
                        Selecionar
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Escolha da Data */}
          {currentStep === 3 && (
            <div className="animate-in fade-in duration-200">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-mono text-[#23483F] uppercase tracking-wider">
                    Etapa 03 — {booking.specialtyName}
                  </span>
                  <h3 className="font-serif text-2xl text-[#23483F] mt-1">
                    Escolha a data da consulta
                  </h3>
                  <p className="text-xs sm:text-sm text-[#343B38]/80 mt-1">
                    Atendimento de segunda a sábado. Escolha o dia de sua conveniência.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="text-xs text-[#23483F] hover:underline flex items-center gap-1 cursor-pointer pt-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Voltar</span>
                </button>
              </div>

              {/* Calendar Container */}
              <div className="bg-[#FFFFFF] p-6 rounded-xs border border-[#23483F]/12 shadow-xs max-w-md mx-auto mb-8">
                {/* Month Navigator */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#23483F]/10">
                  <h4 className="font-serif text-lg text-[#23483F] capitalize">
                    {calendarMonth.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}
                  </h4>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={prevMonth}
                      className="p-1.5 text-[#343B38]/70 hover:text-[#23483F] hover:bg-[#F7F6F1] rounded-xs transition-colors cursor-pointer"
                      title="Mês anterior"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={nextMonth}
                      className="p-1.5 text-[#343B38]/70 hover:text-[#23483F] hover:bg-[#F7F6F1] rounded-xs transition-colors cursor-pointer"
                      title="Próximo mês"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Weekday Headers */}
                <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold text-[#343B38]/60 uppercase tracking-wider mb-2">
                  <div>Dom</div>
                  <div>Seg</div>
                  <div>Ter</div>
                  <div>Qua</div>
                  <div>Qui</div>
                  <div>Sex</div>
                  <div>Sáb</div>
                </div>

                {/* Calendar Days Grid */}
                <div className="grid grid-cols-7 gap-1">{renderCalendarDays()}</div>

                {/* Calendar Legend */}
                <div className="mt-4 pt-3 border-t border-[#23483F]/5 flex items-center justify-between text-[11px] text-[#343B38]/70">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#23483F]" /> Selecionado
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#A6B9A8]" /> Disponível
                  </span>
                  <span className="text-[#343B38]/40">Domingos fechados</span>
                </div>
              </div>

              {/* Navigation button */}
              <div className="flex items-center justify-between pt-4 border-t border-[#23483F]/10">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 text-xs font-medium text-[#343B38] hover:text-[#23483F] transition-colors cursor-pointer"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  disabled={!booking.date}
                  onClick={() => setCurrentStep(4)}
                  className={`px-6 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
                    booking.date
                      ? 'bg-[#23483F] hover:bg-[#1b3831] text-white shadow-xs'
                      : 'bg-[#23483F]/20 text-white/50 cursor-not-allowed'
                  }`}
                >
                  Continuar para Horário →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Escolha do Horário */}
          {currentStep === 4 && (
            <div className="animate-in fade-in duration-200">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-mono text-[#23483F] uppercase tracking-wider">
                    Etapa 04 — Data: {formatDisplayDate(booking.date)}
                  </span>
                  <h3 className="font-serif text-2xl text-[#23483F] mt-1">
                    Qual o seu turno ou horário preferencial?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#343B38]/80 mt-1">
                    Indique o horário de maior conveniência para você.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="text-xs text-[#23483F] hover:underline flex items-center gap-1 cursor-pointer pt-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Mudar data</span>
                </button>
              </div>

              {/* Realism Notice: appointment pending confirmation */}
              <div className="p-3.5 rounded-xs bg-[#FFFFFF] border border-[#23483F]/10 text-xs text-[#343B38]/80 mb-6 flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-[#23483F] shrink-0 mt-0.5" />
                <span>
                  O horário selecionado representa sua preferência. Nossa recepção entrará em contato
                  para confirmar a vaga exata na agenda médica.
                </span>
              </div>

              <div className="space-y-6 mb-8">
                {/* Morning Slots */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#23483F] mb-3">
                    Manhã (08h às 12h)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {morningSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setBooking((prev) => ({ ...prev, timeSlot: slot }))}
                        className={`py-3 px-4 rounded-xs border text-xs font-semibold transition-all cursor-pointer ${
                          booking.timeSlot === slot
                            ? 'bg-[#23483F] border-[#23483F] text-white shadow-xs'
                            : 'bg-[#FFFFFF] border-[#23483F]/15 text-[#343B38] hover:border-[#23483F]/40'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Afternoon Slots */}
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-[#23483F] mb-3">
                    Tarde (13h30 às 18h)
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {afternoonSlots.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setBooking((prev) => ({ ...prev, timeSlot: slot }))}
                        className={`py-3 px-4 rounded-xs border text-xs font-semibold transition-all cursor-pointer ${
                          booking.timeSlot === slot
                            ? 'bg-[#23483F] border-[#23483F] text-white shadow-xs'
                            : 'bg-[#FFFFFF] border-[#23483F]/15 text-[#343B38] hover:border-[#23483F]/40'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation button */}
              <div className="flex items-center justify-between pt-4 border-t border-[#23483F]/10">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2 text-xs font-medium text-[#343B38] hover:text-[#23483F] transition-colors cursor-pointer"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  disabled={!booking.timeSlot}
                  onClick={() => setCurrentStep(5)}
                  className={`px-6 py-2.5 text-xs font-semibold uppercase tracking-wider rounded-xs transition-all cursor-pointer ${
                    booking.timeSlot
                      ? 'bg-[#23483F] hover:bg-[#1b3831] text-white shadow-xs'
                      : 'bg-[#23483F]/20 text-white/50 cursor-not-allowed'
                  }`}
                >
                  Continuar para Seus Dados →
                </button>
              </div>
            </div>
          )}

          {/* STEP 5: Dados do Paciente */}
          {currentStep === 5 && (
            <div className="animate-in fade-in duration-200">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-mono text-[#23483F] uppercase tracking-wider">
                    Etapa 05 — Identificação
                  </span>
                  <h3 className="font-serif text-2xl text-[#23483F] mt-1">
                    Como podemos contatar você?
                  </h3>
                  <p className="text-xs sm:text-sm text-[#343B38]/80 mt-1">
                    Solicitamos apenas os dados estritamente necessários para o agendamento da sua consulta.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="text-xs text-[#23483F] hover:underline flex items-center gap-1 cursor-pointer pt-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Voltar</span>
                </button>
              </div>

              {formError && (
                <div className="p-3.5 rounded-xs bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2 mb-5">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#343B38] mb-1.5">
                    Nome Completo *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#343B38]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      placeholder="Ex: Maria Clara de Souza"
                      value={booking.patientName}
                      onChange={(e) => {
                        setBooking({ ...booking, patientName: e.target.value });
                        setFormError(null);
                      }}
                      className="w-full bg-[#FFFFFF] border border-[#23483F]/20 rounded-xs pl-10 pr-4 py-2.5 text-sm text-[#343B38] focus:outline-hidden focus:border-[#23483F] focus:ring-1 focus:ring-[#23483F]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#343B38] mb-1.5">
                      Telefone / WhatsApp com DDD *
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-[#343B38]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        required
                        placeholder="(11) 97346-0066"
                        value={booking.patientPhone}
                        onChange={(e) => {
                          setBooking({ ...booking, patientPhone: e.target.value });
                          setFormError(null);
                        }}
                        className="w-full bg-[#FFFFFF] border border-[#23483F]/20 rounded-xs pl-10 pr-4 py-2.5 text-sm text-[#343B38] focus:outline-hidden focus:border-[#23483F] focus:ring-1 focus:ring-[#23483F]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#343B38] mb-1.5">
                      E-mail (opcional)
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-[#343B38]/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        placeholder="seuemail@exemplo.com"
                        value={booking.patientEmail}
                        onChange={(e) => setBooking({ ...booking, patientEmail: e.target.value })}
                        className="w-full bg-[#FFFFFF] border border-[#23483F]/20 rounded-xs pl-10 pr-4 py-2.5 text-sm text-[#343B38] focus:outline-hidden focus:border-[#23483F] focus:ring-1 focus:ring-[#23483F]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#343B38] mb-1.5">
                    Observações de Preferência (opcional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ex: prefiro contato no período da manhã; primeira consulta na especialidade."
                    value={booking.notes}
                    onChange={(e) => setBooking({ ...booking, notes: e.target.value })}
                    className="w-full bg-[#FFFFFF] border border-[#23483F]/20 rounded-xs px-3.5 py-2 text-xs sm:text-sm text-[#343B38] focus:outline-hidden focus:border-[#23483F] focus:ring-1 focus:ring-[#23483F]"
                  />
                  <p className="text-[11px] text-[#343B38]/60 mt-1">
                    Não é necessário incluir informações de histórico ou dados clínicos confidenciais.
                  </p>
                </div>

                {/* LGPD Consent */}
                <div className="p-3.5 rounded-xs bg-[#FFFFFF] border border-[#23483F]/10">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={booking.lgpdConsent}
                      onChange={(e) => setBooking({ ...booking, lgpdConsent: e.target.checked })}
                      className="mt-0.5 rounded-xs text-[#23483F] focus:ring-[#23483F]"
                    />
                    <span className="text-xs text-[#343B38]/80 leading-relaxed">
                      Concordo com o tratamento dos dados estritamente para a finalidade de contato e
                      confirmação da consulta pela Clínica Seravita, em conformidade com a LGPD.
                    </span>
                  </label>
                </div>
              </div>

              {/* Navigation button */}
              <div className="flex items-center justify-between pt-4 border-t border-[#23483F]/10">
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-4 py-2 text-xs font-medium text-[#343B38] hover:text-[#23483F] transition-colors cursor-pointer"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    if (!booking.patientName.trim()) {
                      setFormError('Por favor, informe seu nome completo.');
                      return;
                    }
                    if (!booking.patientPhone.trim()) {
                      setFormError('Por favor, informe seu telefone com DDD.');
                      return;
                    }
                    setFormError(null);
                    setCurrentStep(6);
                  }}
                  className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#23483F] hover:bg-[#1b3831] rounded-xs shadow-xs transition-colors cursor-pointer"
                >
                  Revisar Solicitação →
                </button>
              </div>
            </div>
          )}

          {/* STEP 6: Revisão dos Dados */}
          {currentStep === 6 && (
            <div className="animate-in fade-in duration-200">
              <div className="mb-6 flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-mono text-[#23483F] uppercase tracking-wider">
                    Etapa 06 — Revisão
                  </span>
                  <h3 className="font-serif text-2xl text-[#23483F] mt-1">
                    Confirme os dados da sua solicitação
                  </h3>
                  <p className="text-xs sm:text-sm text-[#343B38]/80 mt-1">
                    Verifique as informações antes de enviar para nossa equipe de atendimento.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="text-xs text-[#23483F] hover:underline flex items-center gap-1 cursor-pointer pt-1"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                  <span>Editar dados</span>
                </button>
              </div>

              {/* Summary Card */}
              <div className="bg-[#FFFFFF] rounded-xs border border-[#23483F]/15 p-6 shadow-xs divide-y divide-[#23483F]/10 mb-6">
                <div className="pb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] font-semibold text-[#343B38]/60 uppercase tracking-wider">
                      Especialidade
                    </span>
                    <p className="font-serif text-lg text-[#23483F] mt-0.5">
                      {booking.specialtyName}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-[#343B38]/60 uppercase tracking-wider">
                      Profissional
                    </span>
                    <p className="font-serif text-lg text-[#23483F] mt-0.5">
                      {booking.doctorName}
                    </p>
                  </div>
                </div>

                <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] font-semibold text-[#343B38]/60 uppercase tracking-wider">
                      Data da Consulta
                    </span>
                    <p className="text-sm font-semibold text-[#343B38] mt-0.5 flex items-center gap-1.5">
                      <CalendarIcon className="w-4 h-4 text-[#23483F]" />
                      <span>{formatDisplayDate(booking.date)}</span>
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-[#343B38]/60 uppercase tracking-wider">
                      Horário Desejado
                    </span>
                    <p className="text-sm font-semibold text-[#343B38] mt-0.5 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-[#23483F]" />
                      <span>{booking.timeSlot}</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-[11px] font-semibold text-[#343B38]/60 uppercase tracking-wider">
                      Paciente
                    </span>
                    <p className="text-sm font-semibold text-[#343B38] mt-0.5">
                      {booking.patientName}
                    </p>
                  </div>
                  <div>
                    <span className="text-[11px] font-semibold text-[#343B38]/60 uppercase tracking-wider">
                      Telefone com DDD
                    </span>
                    <p className="text-sm font-semibold text-[#343B38] mt-0.5">
                      {booking.patientPhone}
                    </p>
                  </div>
                </div>

                {booking.patientEmail && (
                  <div className="pt-3">
                    <span className="text-[11px] font-semibold text-[#343B38]/60 uppercase tracking-wider">
                      E-mail de Contato
                    </span>
                    <p className="text-xs text-[#343B38] mt-0.5">{booking.patientEmail}</p>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#23483F]/10">
                <button
                  type="button"
                  onClick={() => setCurrentStep(5)}
                  className="w-full sm:w-auto px-4 py-2 text-xs font-medium text-[#343B38] hover:text-[#23483F] transition-colors cursor-pointer text-center"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={handleSubmitRequest}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#23483F] hover:bg-[#1b3831] rounded-xs shadow-md transition-all cursor-pointer"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Confirmar Solicitação</span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 7: Confirmação & Integração WhatsApp */}
          {currentStep === 7 && submission && (
            <div className="animate-in zoom-in-95 duration-300 py-4 text-center">
              <div className="w-14 h-14 rounded-full bg-[#23483F] text-white flex items-center justify-center mx-auto mb-4 shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              {/* Exact wording mandated by the prompt for request pending confirmation */}
              <h3 className="font-serif text-2xl sm:text-3xl text-[#23483F] mb-2">
                Recebemos sua solicitação!
              </h3>
              <p className="text-sm sm:text-base text-[#343B38]/85 max-w-xl mx-auto mb-6">
                Nossa equipe entrará em contato para confirmar a disponibilidade na agenda médica.
              </p>

              {/* Ticket / Protocol Box */}
              <div className="max-w-md mx-auto bg-[#FFFFFF] rounded-xs border border-[#23483F]/15 p-5 text-left shadow-xs mb-8">
                <div className="flex items-center justify-between border-b border-[#23483F]/10 pb-3 mb-3">
                  <span className="text-[11px] font-semibold text-[#343B38]/60 uppercase tracking-wider">
                    Protocolo Seravita
                  </span>
                  <span className="font-mono text-sm font-bold text-[#23483F]">
                    {submission.protocolNumber}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-[#343B38]">
                  <div className="flex justify-between">
                    <span className="text-[#343B38]/60">Especialidade:</span>
                    <span className="font-medium text-[#23483F]">{submission.specialtyName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#343B38]/60">Profissional:</span>
                    <span className="font-medium text-[#23483F]">{submission.doctorName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#343B38]/60">Data preferencial:</span>
                    <span className="font-medium text-[#23483F]">
                      {formatDisplayDate(submission.date)} às {submission.timeSlot}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#343B38]/60">Paciente:</span>
                    <span className="font-medium">{submission.patientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#343B38]/60">Telefone cadastrado:</span>
                    <span className="font-medium">{submission.patientPhone}</span>
                  </div>
                </div>
              </div>

              {/* Functional WhatsApp Integration Button */}
              <div className="max-w-md mx-auto space-y-3">
                <a
                  href={`https://wa.me/${config.whatsappRaw}?text=${generateWhatsAppMessage()}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs font-semibold uppercase tracking-wider text-white bg-[#23483F] hover:bg-[#1b3831] rounded-xs shadow-md transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>Enviar Solicitação via WhatsApp</span>
                </a>

                <p className="text-[11px] text-[#343B38]/60">
                  Clique no botão acima para agilizar a confirmação enviando o protocolo diretamente ao
                  WhatsApp da clínica ({config.whatsappDisplay}).
                </p>

                <div className="pt-4 border-t border-[#23483F]/10 flex items-center justify-center">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs text-[#23483F] hover:underline cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Realizar outro agendamento</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
