import { Specialty, Doctor, ClinicConfig } from '../types';

export const INITIAL_CLINIC_CONFIG: ClinicConfig = {
  name: 'Seravita',
  phoneDisplay: '(11) 97346-0066',
  phoneRaw: '5511973460066',
  whatsappDisplay: '(11) 97346-0066',
  whatsappRaw: '5511973460066',
  email: 'contato@clinicaseravita.com.br',
  addressDisplay: 'Rua Banco das Palmas, 401 — Térreo, Sala Principal',
  cityDisplay: 'Santana, São Paulo - SP, CEP 02016-020',
  hoursDisplay: 'Segunda a Sexta, das 08h às 18h | Sábados, das 08h às 14h',
  instagramUrl: 'https://www.instagram.com/clinicaseravita/',
  mapsUrl: 'https://maps.app.goo.gl/c813bTiKet5eKoVB8',
};

export const SPECIALTIES: Specialty[] = [
  {
    id: 'ortopedia',
    name: 'Ortopedia',
    slug: 'ortopedia',
    tagline: 'Movimento, estrutura e alívio funcional.',
    description:
      'Atendimento voltado à saúde dos ossos, articulações, músculos e estruturas responsáveis pelo movimento do corpo.',
    topics: [
      'Saúde musculoesquelética',
      'Dores articulares',
      'Avaliação ortopédica',
      'Mobilidade e funcionalidade',
    ],
    ctaLabel: 'AGENDAR ORTOPEDIA',
  },
  {
    id: 'dermatologia',
    name: 'Dermatologia',
    slug: 'dermatologia',
    tagline: 'Cuidado clínico e individualizado para a sua pele.',
    description:
      'Cuidados médicos com a pele, cabelos e unhas, considerando a saúde e as necessidades individuais de cada paciente.',
    topics: [
      'Saúde da pele',
      'Alterações dermatológicas',
      'Saúde dos cabelos e unhas',
      'Avaliação dermatológica',
    ],
    ctaLabel: 'AGENDAR DERMATOLOGIA',
  },
  {
    id: 'urologia',
    name: 'Urologia',
    slug: 'urologia',
    tagline: 'Atenção especializada com discrição e rigor clínico.',
    description:
      'Atendimento especializado na saúde do sistema urinário e na saúde masculina, considerando as particularidades de cada paciente.',
    topics: [
      'Saúde urinária',
      'Saúde masculina',
      'Avaliação urológica',
      'Acompanhamento especializado',
    ],
    ctaLabel: 'AGENDAR UROLOGIA',
  },
  {
    id: 'cirurgia-vascular',
    name: 'Cirurgia Vascular',
    slug: 'cirurgia-vascular',
    tagline: 'Precisão e cuidado na circulação e saúde dos vasos.',
    description:
      'Especialidade dedicada à avaliação e ao cuidado das condições que afetam artérias, veias e vasos linfáticos.',
    topics: [
      'Saúde vascular',
      'Circulação sanguínea',
      'Avaliação de varizes',
      'Acompanhamento vascular',
    ],
    ctaLabel: 'AGENDAR CIRURGIA VASCULAR',
  },
  {
    id: 'medicina-de-familia',
    name: 'Medicina de Família',
    slug: 'medicina-de-familia',
    tagline: 'Visão integral da sua saúde em todas as etapas da vida.',
    description:
      'Uma abordagem integral do cuidado, considerando a saúde da pessoa em diferentes fases da vida e seu contexto familiar.',
    topics: [
      'Acompanhamento de saúde',
      'Prevenção',
      'Cuidados contínuos',
      'Avaliação integral do paciente',
    ],
    ctaLabel: 'AGENDAR MEDICINA DE FAMÍLIA',
  },
];

export const DOCTORS: Doctor[] = [
  {
    id: 'primeiro-disponivel',
    name: 'Primeiro Horário Disponível',
    specialtyId: 'todas',
    specialtyName: 'Equipe Seravita Multidisciplinar',
    crm: 'Corpo Clínico Integrado',
    presentation:
      'Indicação do profissional da equipe Seravita com a data mais próxima para a especialidade solicitada.',
    isPlaceholder: false,
  },
  {
    id: 'med-ortopedia-1',
    name: 'Corpo Clínico — Ortopedia',
    specialtyId: 'ortopedia',
    specialtyName: 'Ortopedia & Traumatologia',
    crm: 'CRM/SP • RQE Registrado',
    presentation:
      'Médico especialista com dedicação à saúde musculoesquelética, coluna, ombro e membros, com foco em reabilitação e qualidade de vida.',
    isPlaceholder: true,
  },
  {
    id: 'med-dermato-1',
    name: 'Corpo Clínico — Dermatologia',
    specialtyId: 'dermatologia',
    specialtyName: 'Dermatologia Clínica',
    crm: 'CRM/SP • RQE Registrado',
    presentation:
      'Atendimento atento a doenças da pele, prevenção, cuidados capilares e ungueais, unindo precisão diagnóstica ao acolhimento.',
    isPlaceholder: true,
  },
  {
    id: 'med-uro-1',
    name: 'Corpo Clínico — Urologia',
    specialtyId: 'urologia',
    specialtyName: 'Urologia Geral e Masculina',
    crm: 'CRM/SP • RQE Registrado',
    presentation:
      'Acompanhamento especializado do trato urinário e saúde masculina em ambiente seguro, pautado pelo diálogo claro e respeitoso.',
    isPlaceholder: true,
  },
  {
    id: 'med-vascular-1',
    name: 'Corpo Clínico — Cirurgia Vascular',
    specialtyId: 'cirurgia-vascular',
    specialtyName: 'Angiologia & Cirurgia Vascular',
    crm: 'CRM/SP • RQE Registrado',
    presentation:
      'Avaliação minuciosa de circulação venosa e arterial, tratamento de queixas vasculares com foco no bem-estar funcional e conforto diário.',
    isPlaceholder: true,
  },
  {
    id: 'med-familia-1',
    name: 'Corpo Clínico — Medicina de Família',
    specialtyId: 'medicina-de-familia',
    specialtyName: 'Medicina de Família e Comunidade',
    crm: 'CRM/SP • RQE Registrado',
    presentation:
      'Médico assistencialista dedicado à saúde integral do indivíduo e seus vínculos familiares, coordenando cuidados preventivos contínuos.',
    isPlaceholder: true,
  },
];

export const GALLERY_ITEMS = [
  {
    id: 'facade',
    title: 'Fachada e Entrada da Clínica',
    category: 'Estrutura Seravita — Santana',
    description:
      'Entrada contemporânea com acessibilidade completa, fachada elegante em pedra natural e vegetação tropical acolhedora em Santana, São Paulo.',
    imageSrc: '/src/assets/images/seravita_clinic_facade_1794506435241.jpg',
  },
  {
    id: 'reception-lounge',
    title: 'Lounge de Recepção & Espera',
    category: 'Ambiente de Acolhimento',
    description:
      'Atendimento humanizado em ambiente amplo com painéis de madeira natural, poltronas confortáveis e iluminação suave.',
    imageSrc: '/src/assets/images/seravita_santana_interior_1794506435019.jpg',
  },
  {
    id: 'consulting',
    title: 'Consultórios de Escuta Individualizada',
    category: 'Salas de Atendimento',
    description:
      'Ambientes projetados para consultas aprofundadas, sem pressa, priorizando a privacidade e a escuta atenta das necessidades de cada pessoa.',
    imageSrc: '/src/assets/images/seravita_consulting_room_1794505785280.jpg',
  },
  {
    id: 'care-space',
    title: 'Espaços de Conexão e Cuidado',
    category: 'Estrutura Seravita',
    description:
      'Integração harmoniosa de luz natural, tonalidades calmantes e ergonomia para proporcionar uma experiência serena de atendimento à saúde.',
    imageSrc: '/src/assets/images/seravita_hero_care_1794505784859.jpg',
  },
  {
    id: 'reception-warm',
    title: 'Recepção e Lounge de Entrada',
    category: 'Acolhimento Seravita',
    description:
      'Espaço projetado com elementos em madeira natural, iluminação indireta e conforto pensado para tranquilizar desde o primeiro instante.',
    imageSrc: '/src/assets/images/seravita_reception_1794505785148.jpg',
  },
];

export const FAQ_ITEMS = [
  {
    question: 'Quais especialidades a Seravita oferece?',
    answer:
      'A Seravita conta com atendimento nas especialidades de Ortopedia, Dermatologia, Urologia, Cirurgia Vascular e Medicina de Família. Nosso propósito é integrar essas frentes médicas para cuidar do paciente de forma ampla e acolhedora.',
  },
  {
    question: 'Como faço para agendar uma consulta?',
    answer:
      'O agendamento pode ser solicitado diretamente pelo sistema disponível neste site: basta selecionar a especialidade, o profissional de preferência, a data e o turno desejados e preencher seus dados de contato. Você também pode solicitar via WhatsApp oficial da clínica.',
  },
  {
    question: 'Posso escolher o profissional?',
    answer:
      'Sim. Na etapa de escolha de profissional, você pode optar por um profissional específico da área ou pela opção "Primeiro horário disponível" para que nossa equipe priorize o atendimento na data mais breve.',
  },
  {
    question: 'Como consultar os horários disponíveis?',
    answer:
      'Nosso calendário interativo exibe as datas e turnos com disponibilidade de atendimento. Como a agenda médica pode ter alterações dinâmicas e encaixes, a solicitação enviada é rapidamente verificada pela nossa equipe de acolhimento para confirmação.',
  },
  {
    question: 'Como funciona a confirmação do agendamento?',
    answer:
      'Após o envio da sua solicitação pelo site ou WhatsApp, nossa equipe administrativa confere a agenda em tempo real e entra em contato via telefone ou WhatsApp para confirmar a data, o horário exato e orientar sobre a consulta.',
  },
  {
    question: 'Onde fica localizada a clínica?',
    answer:
      'A Seravita está sediada em São Paulo - SP, em região de fácil acesso com infraestrutura completa para o conforto dos pacientes. O endereço detalhado, mapa de acesso e pontos de referência estão disponíveis na seção de Contato.',
  },
  {
    question: 'Como entro em contato com a equipe?',
    answer:
      'Você pode falar com nossa recepção por telefone, WhatsApp oficial, e-mail institucional ou através do nosso Instagram oficial (@clinicaseravita). Nossa equipe está sempre pronta para ouvir suas dúvidas.',
  },
];

export const INSTAGRAM_POSTS = [
  {
    id: 1,
    tag: 'Medicina de Família',
    title: 'A escuta atenta como primeiro ato médico',
    excerpt: 'Por que o tempo dedicado à sua história é fundamental para um diagnóstico preciso e um plano de cuidado eficiente.',
    date: 'São Paulo',
  },
  {
    id: 2,
    tag: 'Ortopedia',
    title: 'Movimento sem dor: o valor da prevenção articular',
    excerpt: 'Pequenos hábitos diários e acompanhamento ergonômico que preservam a funcionalidade dos ossos e articulações.',
    date: 'São Paulo',
  },
  {
    id: 3,
    tag: 'Dermatologia',
    title: 'A pele reflete o bem-estar do organismo',
    excerpt: 'Avaliação clínica minuciosa que vai além da estética para proteger a saúde de pele, cabelos e unhas.',
    date: 'São Paulo',
  },
  {
    id: 4,
    tag: 'Cirurgia Vascular',
    title: 'Circulação sanguínea e longevidade ativa',
    excerpt: 'Identificar sintomas precoces de alterações vasculares é essencial para manter as pernas leves e saudáveis.',
    date: 'São Paulo',
  },
];
