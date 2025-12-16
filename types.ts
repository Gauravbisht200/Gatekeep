export enum ContentType {
  YOUTUBE = 'YOUTUBE',
  FILE = 'FILE',
  COURSE = 'COURSE'
}

export interface LinkItem {
  id: string;
  influencerId: string;
  title: string;
  description: string;
  type: ContentType;
  url: string; // The destination or file URL
  thumbnailUrl?: string;
  isActive: boolean;
  createdAt: string;
  views: number;
}

export interface Lead {
  id: string;
  linkId: string;
  name: string;
  email: string;
  phone: string;
  capturedAt: string;
}

export interface User {
  id: string;
  name: string;
  handle: string;
  avatarUrl: string;
  email: string;
  joinedAt: string;
  subscriptionPlan: 'Free' | 'Pro' | 'Business';
}

export interface DashboardStats {
  totalLeads: number;
  totalViews: number;
  conversionRate: number;
  activeLinks: number;
}