// Types pour les données SMP
export interface SmpQueueItem {
  id: string;
  name: string;
  ip: string;
  discord: string;
  twist?: string;
  maxPlayers?: string;
  theme?: string;
  status?: 'pending' | 'in_review' | 'approved' | 'rejected';
  timestamp: any;
  updatedAt?: any;
}

export interface SmpPublicItem extends Omit<SmpQueueItem, 'maxPlayers' | 'theme'> {
  tier: number;
  date: string;
}

// Types pour les formulaires
export interface SmpFormData {
  name: string;
  ip: string;
  discord: string;
  twist?: string;
  maxPlayers?: string;
  theme?: string;
}

export interface SmpEditFormData {
  tier: number;
  twist: string;
  date: string;
}

// Types pour les messages d'état
export interface StatusMessage {
  text: string;
  isError: boolean;
}

// Types pour les paramètres d'URL
export interface PageParams {
  params: { [key: string]: string | string[] | undefined };
  searchParams: { [key: string]: string | string[] | undefined };
}
