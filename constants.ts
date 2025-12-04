import { Job, Application, Message, PaymentTransaction, Plan, AIPricing, AdPricing } from './types';

export const PROVINCES = [
  "Maputo Cidade", "Maputo Província", "Gaza", "Inhambane", 
  "Sofala", "Manica", "Tete", "Zambézia", "Nampula", 
  "Cabo Delgado", "Niassa"
];

export const CATEGORIES = [
  "Tecnologia & TI", "Finanças & Contabilidade", "Engenharia", 
  "Saúde", "Vendas & Marketing", "Recursos Humanos", "Administração", "Logística"
];

export const MOCK_JOBS: Job[] = [
  {
    id: '1',
    title: 'Desenvolvedor Senior React',
    company: 'TechMoz Solutions',
    location: 'Maputo Cidade',
    type: 'Tempo Inteiro',
    salaryRange: '80.000 - 120.000 MZN',
    postedAt: '2024-05-10',
    description: 'Procuramos um desenvolvedor experiente em React e TypeScript para liderar nossa equipe de frontend. O candidato ideal deve ter forte conhecimento em arquitetura de software e otimização de performance.',
    requirements: ['5+ anos de experiência em React', 'TypeScript avançado', 'Experiência com Tailwind CSS', 'Inglês fluente'],
    featured: true,
    sector: "Tecnologia & TI",
    applicantsCount: 12
  },
  {
    id: '2',
    title: 'Contabilista Sénior',
    company: 'Banco Nacional',
    location: 'Beira, Sofala',
    type: 'Tempo Inteiro',
    salaryRange: '60.000 - 90.000 MZN',
    postedAt: '2024-05-12',
    description: 'Gestão de contas e auditoria interna. Responsável por garantir a conformidade com as normas fiscais moçambicanas.',
    requirements: ['Licenciatura em Contabilidade', 'Certificação OCAM', 'Experiência em PHC ou Primavera'],
    featured: false,
    sector: "Finanças & Contabilidade",
    applicantsCount: 8
  },
  {
    id: '3',
    title: 'Gestor de Vendas',
    company: 'Distribuidora do Norte',
    location: 'Nampula',
    type: 'Meio Período',
    salaryRange: 'Comissão + Ajuda de Custo',
    postedAt: '2024-05-14',
    description: 'Expansão de mercado na zona norte. Procuramos alguém dinâmico e com viatura própria.',
    requirements: ['Experiência em vendas FMCG', 'Carta de condução', 'Disponibilidade para viajar'],
    featured: false,
    sector: "Vendas & Marketing",
    applicantsCount: 25
  },
  {
    id: '4',
    title: 'Engenheiro Civil',
    company: 'Construções Zambeze',
    location: 'Tete',
    type: 'Tempo Inteiro',
    salaryRange: '100.000+ MZN',
    postedAt: '2024-05-15',
    description: 'Supervisão de obras de infraestrutura e gestão de equipas no terreno.',
    requirements: ['Inscrição na Ordem dos Engenheiros', 'Experiência em obras de estradas', 'Domínio de AutoCAD'],
    featured: true,
    sector: "Engenharia",
    applicantsCount: 5
  }
];

export const MOCK_APPLICATIONS: Application[] = [
  { id: 'a1', jobId: '1', candidateId: 'u2', candidateName: 'João Manganhela', candidateTitle: 'Fullstack Developer', date: '2024-05-15', status: 'interview', matchScore: 95 },
  { id: 'a2', jobId: '1', candidateId: 'u3', candidateName: 'Maria Silva', candidateTitle: 'Frontend Dev', date: '2024-05-16', status: 'pending', matchScore: 78 },
  { id: 'a3', jobId: '2', candidateId: 'u4', candidateName: 'Carlos Tembe', candidateTitle: 'Contabilista Junior', date: '2024-05-14', status: 'rejected', matchScore: 40 },
];

export const MOCK_MESSAGES: Message[] = [
  { id: 'm1', senderId: 'u2', receiverId: 'me', senderName: 'João Manganhela', content: 'Bom dia, gostaria de saber mais sobre a vaga de React.', timestamp: '10:30', read: false },
  { id: 'm2', senderId: 'me', receiverId: 'u2', senderName: 'Eu', content: 'Olá João! Claro, o que gostaria de saber?', timestamp: '10:35', read: true },
  { id: 'm3', senderId: 'u3', receiverId: 'me', senderName: 'Maria Silva', content: 'Segunda-feira disponível para entrevista?', timestamp: 'Ontem', read: true },
];

export const MOCK_TRANSACTIONS: PaymentTransaction[] = [
  { id: 't1', date: '2024-05-01', amount: '450 MT', method: 'M-Pesa', description: 'Pacote Bronze', status: 'completed' },
  { id: 't2', date: '2024-04-01', amount: '150 MT', method: 'e-Mola', description: 'Pack 5 Fotos IA', status: 'completed' },
];

export const PLANS: Plan[] = [
  { 
    id: 'free', 
    name: 'Gratuito', 
    price: '0 MT', 
    duration: 'Mensal',
    features: ['3 vagas / mês', 'Sem destaque', 'Gestão básica'], 
    color: 'bg-slate-100' 
  },
  { 
    id: 'bronze', 
    name: 'Bronze', 
    price: '450 MT', 
    duration: 'Mensal (30 dias)',
    features: ['15 vagas totais', '4 destaques básicos', 'Validade: 30 dias', 'Acesso a CVs'], 
    color: 'bg-orange-100',
    recommended: false
  },
  { 
    id: 'silver', 
    name: 'Prata', 
    price: '1.000 MT', 
    duration: '2 Meses (60 dias)',
    features: ['40 vagas totais', '7 destaques premium', 'Análise básica de CV', 'Melhor posicionamento', 'Validade: 60 dias'], 
    color: 'bg-slate-200',
    recommended: false
  },
  { 
    id: 'gold', 
    name: 'Ouro', 
    price: '2.500 MT', 
    duration: '75 Dias',
    features: ['Vagas ilimitadas', 'Destaques ilimitados', 'Anúncios grátis (30 dias)', 'Relatórios avançados', 'Suporte Prioritário'], 
    color: 'bg-yellow-100',
    recommended: true
  }
];

export const AI_PRICING: AIPricing[] = [
  { id: 'single', title: 'Pack Único', price: '50 MT', description: '1 Foto editada' },
  { id: 'pack5', title: 'Pack Económico', price: '150 MT', description: '5 Fotos editadas (30 MT/foto)' },
  { id: 'sub', title: 'Assinatura IA', price: '300 MT', description: 'Fotos ilimitadas / mês' },
];

export const AD_PRICING: AdPricing[] = [
  { id: 'banner', title: 'Banner Topo', price: '1.200 MT', type: 'subscription', details: 'Mensal' },
  { id: 'sidebar', title: 'Sidebar', price: '800 MT', type: 'subscription', details: 'Mensal' },
  { id: 'footer', title: 'Rodapé', price: '600 MT', type: 'subscription', details: 'Mensal' },
  { id: 'native', title: 'Anúncio Nativo', price: '1.000 MT', type: 'subscription', details: 'Entre vagas (Mensal)' },
  { id: 'cpc', title: 'Custo por Clique (CPC)', price: '5 MT', type: 'cpc', details: 'Por clique único' },
  { id: 'cpm', title: 'CPM', price: '80 - 150 MT', type: 'cpm', details: 'Por 1000 impressões' },
];