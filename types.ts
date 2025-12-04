export type UserRole = 'candidate' | 'company';

export interface Education {
  id: string;
  institution: string;
  degree: string;
  startDate: string;
  endDate: string;
  current: boolean;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  verified?: boolean;
  savedJobIds?: string[];
  
  // Candidate Profile
  title?: string; // e.g. "Senior React Developer"
  bio?: string;
  location?: string;
  skills?: string[];
  education?: Education[];
  experience?: Experience[];
  cvUrl?: string;

  // Company Profile
  companyName?: string; // if different from name
  companyDescription?: string;
  website?: string;
  sector?: string;
  currentPlan?: 'free' | 'bronze' | 'silver' | 'gold';
}

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'Tempo Inteiro' | 'Meio Período' | 'Remoto' | 'Freelance';
  salaryRange?: string;
  postedAt: string;
  description: string;
  requirements?: string[];
  featured?: boolean;
  sector?: string;
  applicantsCount?: number;
}

export type ApplicationStatus = 'pending' | 'viewed' | 'interview' | 'rejected' | 'accepted';

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  candidateName: string;
  candidateTitle: string;
  date: string;
  status: ApplicationStatus;
  matchScore?: number; // 0-100
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  senderName: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface PaymentTransaction {
  id: string;
  date: string;
  amount: string;
  method: 'M-Pesa' | 'e-Mola' | 'Visa' | 'Mastercard';
  description: string;
  status: 'completed' | 'pending' | 'failed';
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  duration: string;
  features: string[];
  color: string;
  recommended?: boolean;
}

export interface AIPricing {
  id: string;
  title: string;
  price: string;
  description: string;
}

export interface AdPricing {
  id: string;
  title: string;
  price: string;
  type: 'subscription' | 'cpc' | 'cpm';
  details: string;
}