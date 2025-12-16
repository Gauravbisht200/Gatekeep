import { LinkItem, Lead, User, ContentType } from '../types';

const STORAGE_KEYS = {
  LINKS: 'gatekeep_links',
  LEADS: 'gatekeep_leads',
  USER: 'gatekeep_user',
};

// Initial Seed Data
const MOCK_USER: User = {
  id: 'user_1',
  name: 'Sarah Creator',
  handle: '@sarahcreates',
  email: 'sarah@example.com',
  avatarUrl: 'https://picsum.photos/id/64/200/200',
  joinedAt: new Date(Date.now() - 86400000 * 180).toISOString(), // Joined 180 days ago
  subscriptionPlan: 'Pro',
};

const INITIAL_LINKS: LinkItem[] = [
  {
    id: 'link_1',
    influencerId: 'user_1',
    title: '2024 Social Media Strategy Guide',
    description: 'My complete PDF guide to growing on Instagram in 2024.',
    type: ContentType.FILE,
    url: '#', // Mock file URL
    isActive: true,
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    views: 1240,
    thumbnailUrl: 'https://picsum.photos/id/20/800/600',
  },
  {
    id: 'link_2',
    influencerId: 'user_1',
    title: 'Exclusive: Editing Masterclass',
    description: 'A 30-minute deep dive into my editing workflow.',
    type: ContentType.YOUTUBE,
    url: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Rick Roll as placeholder
    isActive: true,
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    views: 850,
    thumbnailUrl: 'https://picsum.photos/id/30/800/600',
  },
];

const INITIAL_LEADS: Lead[] = [
  { id: 'l1', linkId: 'link_1', name: 'John Doe', email: 'john@test.com', phone: '555-0101', capturedAt: new Date(Date.now() - 100000).toISOString() },
  { id: 'l2', linkId: 'link_1', name: 'Jane Smith', email: 'jane@test.com', phone: '555-0102', capturedAt: new Date(Date.now() - 200000).toISOString() },
  { id: 'l3', linkId: 'link_2', name: 'Bob Wilson', email: 'bob@test.com', phone: '555-0103', capturedAt: new Date(Date.now() - 50000).toISOString() },
];

// Helper to initialize storage
const initStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.USER)) {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(MOCK_USER));
    localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(INITIAL_LINKS));
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify(INITIAL_LEADS));
  }
};

initStorage();

export const dataService = {
  getUser: (): User => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER) || '{}');
  },

  getLinks: (): LinkItem[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LINKS) || '[]');
  },

  getLinkById: (id: string): LinkItem | undefined => {
    const links = JSON.parse(localStorage.getItem(STORAGE_KEYS.LINKS) || '[]');
    return links.find((l: LinkItem) => l.id === id);
  },

  createLink: (link: Omit<LinkItem, 'id' | 'createdAt' | 'views' | 'influencerId'>) => {
    const links = dataService.getLinks();
    const user = dataService.getUser();
    const newLink: LinkItem = {
      ...link,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      views: 0,
      influencerId: user.id,
    };
    localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify([newLink, ...links]));
    return newLink;
  },

  deleteLink: (id: string) => {
    const links = dataService.getLinks().filter(l => l.id !== id);
    localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(links));
  },

  getLeads: (): Lead[] => {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.LEADS) || '[]');
  },

  addLead: (lead: Omit<Lead, 'id' | 'capturedAt'>) => {
    const leads = dataService.getLeads();
    const newLead: Lead = {
      ...lead,
      id: Math.random().toString(36).substr(2, 9),
      capturedAt: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEYS.LEADS, JSON.stringify([newLead, ...leads]));
    
    // Increment view count for the link mostly for simulation
    const links = dataService.getLinks().map(l => {
        if(l.id === lead.linkId) {
            return { ...l, views: l.views + 1 };
        }
        return l;
    });
    localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(links));
    
    return newLead;
  },
  
  incrementViews: (linkId: string) => {
      const links = dataService.getLinks().map(l => {
          if(l.id === linkId) {
              return { ...l, views: l.views + 1 };
          }
          return l;
      });
      localStorage.setItem(STORAGE_KEYS.LINKS, JSON.stringify(links));
  }
};