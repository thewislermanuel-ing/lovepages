export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  subtitle: string;
  date?: string;
  category: 'todos' | 'aventuras' | 'romance' | 'detalles';
  aspectRatio: 'square' | 'portrait' | 'landscape';
  description: string;
  heartCount: number;
  isCustom?: boolean;
}

export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  tag: string;
  quote?: string;
}

export interface FavoriteActivity {
  id: string;
  title: string;
  tagline: string;
  description: string;
  imageUrl: string;
  iconName: string;
  whySpecial: string;
}

export interface SecretNote {
  id: string;
  title: string;
  content: string;
  date: string;
  icon: 'sunflower' | 'lily' | 'heart' | 'infinity';
  isPreloaded?: boolean;
}

export interface LoveLetter {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
  envelopeColor: 'amber' | 'rose' | 'cream' | 'golden';
  seal: 'sunflower' | 'lily' | 'heart' | 'infinity';
  isPreloaded?: boolean;
}

export interface QuickNote {
  id: string;
  title: string;
  content: string;
  date: string;
  color: 'yellow' | 'peach' | 'rose' | 'amber';
  tag: string;
  pinned?: boolean;
}

export interface LoveAffirmation {
  id: string;
  text: string;
  author: string;
}

