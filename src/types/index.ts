export interface Specialty {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  topics: string[];
  ctaLabel: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialtyId: string;
  specialtyName: string;
  crm: string;
  presentation: string;
  isPlaceholder: boolean;
  avatarSeed?: string;
}

export interface BookingState {
  specialtyId: string;
  specialtyName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  timeSlot: string;
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  notes?: string;
  lgpdConsent: boolean;
}

export interface BookingSubmission extends BookingState {
  protocolNumber: string;
  createdAt: string;
  status: 'solicitada' | 'confirmada';
}

export interface ClinicConfig {
  name: string;
  phoneDisplay: string;
  phoneRaw: string;
  whatsappDisplay: string;
  whatsappRaw: string;
  email: string;
  addressDisplay: string;
  cityDisplay: string;
  hoursDisplay: string;
  instagramUrl: string;
  mapsUrl?: string;
}
