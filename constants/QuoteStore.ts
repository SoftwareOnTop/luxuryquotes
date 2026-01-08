import { generateQuotes, shuffleArray, type QuoteCategory as QC, type GeneratedQuote } from './QuoteDatabase';

type QuoteCategory = QC;

type Quote = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
};

type CategoryMeta = {
  id: QuoteCategory;
  title: string;
  icon: string;
  tags: string[];
};

type Listener = (payload: { category: QuoteCategory; quotes: Quote[] }) => void;

export const CATEGORY_META: CategoryMeta[] = [
  { id: 'luxury-mindset', title: 'Luxury Mindset', icon: 'trophy', tags: ['popular', 'trending'] },
  { id: 'luxury-health', title: 'Luxury Health', icon: 'leaf', tags: ['wellness'] },
  { id: 'financial-freedom', title: 'Financial Freedom', icon: 'cash', tags: ['popular', 'wealth'] },
  { id: 'deep-wisdom', title: 'Deep Wisdom', icon: 'book', tags: ['classic'] },
  { id: 'elite-productivity', title: 'Elite Productivity', icon: 'flash', tags: ['trending', 'performance'] },
  { id: 'stoic-resilience', title: 'Stoic Resilience', icon: 'shield', tags: ['mindset'] },
  { id: 'modern-success', title: 'Modern Success', icon: 'business', tags: ['trending'] },
  { id: 'spiritual-growth', title: 'Spiritual Growth', icon: 'sparkles', tags: ['wellness'] },
  { id: 'relationship-mastery', title: 'Relationship Mastery', icon: 'heart', tags: ['social'] },
  { id: 'self-discipline', title: 'Self-Discipline', icon: 'diamond', tags: ['popular', 'mindset'] },
  { id: 'inner-peace', title: 'Inner Peace', icon: 'water', tags: ['wellness'] },
  { id: 'high-performance', title: 'High-Performance', icon: 'car-sport', tags: ['trending', 'performance'] },
  { id: 'creative-vision', title: 'Creative Vision', icon: 'color-palette', tags: ['creative'] },
  { id: 'social-influence', title: 'Social Influence', icon: 'globe', tags: ['social'] },
  { id: 'entrepreneurship', title: 'Entrepreneurship', icon: 'rocket', tags: ['popular', 'wealth'] },
  { id: 'confidence-grace', title: 'Confidence & Grace', icon: 'ribbon', tags: ['mindset'] },
];

// Välimuisti generoituille quoteille (estää tarpeettomat uudelleengeneraatiot)
let cachedQuotes: Record<QuoteCategory, Quote[]> = {} as Record<QuoteCategory, Quote[]>;
let category: QuoteCategory = 'luxury-mindset';
const listeners: Listener[] = [];

/**
 * Hakee quotet kategoriasta
 * Generoi 200 satunnaista quotea per kategoria (sekoitettu)
 */
export function getQuotes(): Quote[] {
  if (!cachedQuotes[category]) {
    // Generoi 200 satunnaista quotea kategorialle
    const generated = generateQuotes(category, 200, true);
    cachedQuotes[category] = generated.map(q => ({
      id: q.id,
      title: q.title,
      description: q.description,
      imageUrl: undefined,
    }));
  }
  return cachedQuotes[category];
}

export function getQuoteCategory(): QuoteCategory {
  return category;
}

export function setQuoteCategory(next: QuoteCategory) {
  if (next === category) return;
  category = next;
  
  // Generoi uudet quotet jos ei ole vielä cache:ssa
  if (!cachedQuotes[next]) {
    const generated = generateQuotes(next, 200, true);
    cachedQuotes[next] = generated.map(q => ({
      id: q.id,
      title: q.title,
      description: q.description,
      imageUrl: undefined,
    }));
  }
  
  const payload = { category, quotes: cachedQuotes[category] };
  listeners.forEach((listener) => listener(payload));
}

/**
 * Lataa lisää quoteja nykyiselle kategorialle
 * Kutsutaan kun käyttäjä on swipannut lähes listan loppuun
 */
export function loadMoreQuotes(count: number = 100): Quote[] {
  const moreQuotes = generateQuotes(category, count, true);
  const mapped = moreQuotes.map(q => ({
    id: q.id,
    title: q.title,
    description: q.description,
    imageUrl: undefined,
  }));
  
  // Lisää cache:en
  if (!cachedQuotes[category]) {
    cachedQuotes[category] = mapped;
  } else {
    cachedQuotes[category] = [...cachedQuotes[category], ...mapped];
  }
  
  return mapped;
}

/**
 * Tyhjentää cachen (vapauttaa muistia)
 */
export function clearQuoteCache() {
  cachedQuotes = {} as Record<QuoteCategory, Quote[]>;
}

export function subscribeQuotes(listener: Listener) {
  listeners.push(listener);
  return () => {
    const idx = listeners.indexOf(listener);
    if (idx !== -1) listeners.splice(idx, 1);
  };
}

export type { QuoteCategory, Quote, CategoryMeta };
