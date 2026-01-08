// Run this with: npx ts-node scripts/uploadQuotesStandalone.ts
// Values embedded to avoid module resolution issues during script execution

import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, writeBatch } from "firebase/firestore";

// --- QUOTE DATA EMBEDDED START ---

type QuoteCategory = 
  | 'luxury-mindset'
  | 'luxury-health'
  | 'financial-freedom'
  | 'deep-wisdom'
  | 'elite-productivity'
  | 'stoic-resilience'
  | 'modern-success'
  | 'spiritual-growth'
  | 'relationship-mastery'
  | 'self-discipline'
  | 'inner-peace'
  | 'high-performance'
  | 'creative-vision'
  | 'social-influence'
  | 'entrepreneurship'
  | 'confidence-grace';

type Quote = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
};

const QUOTE_LIBRARY: Record<QuoteCategory, Quote[]> = {
  'luxury-mindset': [
    { id: 'lm-1', title: 'The Crown Estate', description: 'True wealth is measured in quiet confidence, not loud gestures.' },
    { id: 'lm-2', title: 'Sovereign Silence', description: 'Luxury begins where explanation ends.' },
    { id: 'lm-3', title: 'Gilded Restraint', description: 'Opulence is the art of knowing when to stop.' },
  ],
  'luxury-health': [
    { id: 'lh-1', title: 'Vitality Reserve', description: 'Health is the ultimate currency of the elite.' },
    { id: 'lh-2', title: 'The Private Spa', description: 'Your body is the only mansion you truly own.' },
    { id: 'lh-3', title: 'Botanical Legacy', description: 'Nourish yourself as you would tend an heirloom garden.' },
  ],
  'financial-freedom': [
    { id: 'ff-1', title: 'The Ledger', description: 'Money whispers to those who listen with patience.' },
    { id: 'ff-2', title: 'Compound Calm', description: 'Wealth accumulates in the quiet hours of discipline.' },
    { id: 'ff-3', title: 'Portfolio Peace', description: 'Financial freedom is permission to say no.' },
  ],
  'deep-wisdom': [
    { id: 'dw-1', title: 'Ancient Library', description: 'Wisdom is knowing what to ignore.' },
    { id: 'dw-2', title: 'The Oak Study', description: 'True knowledge ages like fine wine, not fast news.' },
    { id: 'dw-3', title: 'Manuscript Hall', description: 'Read fewer books deeply rather than many shallowly.' },
  ],
  'elite-productivity': [
    { id: 'ep-1', title: 'The War Room', description: 'Focus is the luxury of the disciplined.' },
    { id: 'ep-2', title: 'Precision Protocol', description: 'Elite work is 10% inspiration, 90% elimination.' },
    { id: 'ep-3', title: 'Executive Efficiency', description: 'Time is the only asset you cannot buy back.' },
  ],
  'stoic-resilience': [
    { id: 'sr-1', title: 'The Marble Hall', description: 'Control your reactions, not your circumstances.' },
    { id: 'sr-2', title: 'Iron Will', description: 'Stoicism is not coldness; it is clarity under fire.' },
    { id: 'sr-3', title: 'Fortress Mind', description: 'You are the architect of your inner citadel.' },
  ],
  'modern-success': [
    { id: 'ms-1', title: 'Skyline Vision', description: 'Success is built in private, celebrated in public.' },
    { id: 'ms-2', title: 'The Boardroom', description: 'Modern titans move in silence, not in spectacle.' },
    { id: 'ms-3', title: 'Digital Empire', description: "Leverage technology; don't let it leverage you." },
  ],
  'spiritual-growth': [
    { id: 'sg-1', title: 'The Inner Sanctum', description: 'Spirituality is the luxury of a quiet mind.' },
    { id: 'sg-2', title: 'Sacred Morning', description: 'Begin each day as if entering a cathedral.' },
    { id: 'sg-3', title: 'Ethereal Wisdom', description: 'Growth happens in stillness, not in noise.' },
  ],
  'relationship-mastery': [
    { id: 'rm-1', title: 'The Social Salon', description: 'Quality relationships are built on boundaries, not compromise.' },
    { id: 'rm-2', title: 'Diplomatic Grace', description: 'Listen more than you speak; observe more than you react.' },
    { id: 'rm-3', title: 'The Inner Circle', description: 'Surround yourself with those who elevate, not entertain.' },
  ],
  'self-discipline': [
    { id: 'sd-1', title: 'The Forge', description: "Discipline is doing what you said you'd do, long after the mood has left." },
    { id: 'sd-2', title: 'Routine Royalty', description: 'Small habits, compounded daily, build empires.' },
    { id: 'sd-3', title: 'Tempered Steel', description: 'Your greatest enemy is the comfort you refuse to leave.' },
  ],
  'inner-peace': [
    { id: 'ip-1', title: 'The Still Lake', description: 'Peace is not found; it is cultivated.' },
    { id: 'ip-2', title: 'Tranquil Chambers', description: 'Silence is the language of the soul.' },
    { id: 'ip-3', title: 'Serene Horizons', description: 'Let go of what you cannot control; master what you can.' },
  ],
  'high-performance': [
    { id: 'hp-1', title: 'The Fast Lane', description: 'Peak performance requires peak recovery.' },
    { id: 'hp-2', title: 'Velocity Mindset', description: 'Speed without direction is chaos; combine both for mastery.' },
    { id: 'hp-3', title: 'Precision Machine', description: 'Optimize your inputs; your outputs will follow.' },
  ],
  'creative-vision': [
    { id: 'cv-1', title: 'The Atelier', description: 'Creativity is discipline disguised as freedom.' },
    { id: 'cv-2', title: 'Canvas of Possibility', description: 'Every masterpiece begins with a blank page and courage.' },
    { id: 'cv-3', title: 'Visionary Studio', description: 'Create for yourself first; let the world catch up.' },
  ],
  'social-influence': [
    { id: 'si-1', title: 'The Network', description: 'Influence is earned through consistency, not charisma.' },
    { id: 'si-2', title: 'Global Presence', description: 'Your reputation precedes you; craft it carefully.' },
    { id: 'si-3', title: 'Cultural Capital', description: 'Lead by example, not by explanation.' },
  ],
  'entrepreneurship': [
    { id: 'en-1', title: 'The Venture', description: "Entrepreneurs don't wait for permission; they build the door." },
    { id: 'en-2', title: "Founder's Path", description: 'Risk is the price of progress; comfort is the cost of stagnation.' },
    { id: 'en-3', title: 'Empire Builder', description: 'Start small, think big, move fast.' },
  ],
  'confidence-grace': [
    { id: 'cg-1', title: 'The Grand Entrance', description: 'Confidence is quiet; insecurity is loud.' },
    { id: 'cg-2', title: 'Poised Elegance', description: 'Grace under pressure is the mark of true nobility.' },
    { id: 'cg-3', title: 'Sovereign Presence', description: 'Walk into every room as if you own it - mentally, not arrogantly.' },
  ],
};

// --- QUOTE DATA EMBEDDED END ---

const firebaseConfig = {
  apiKey: "AIzaSyBVtAUBuI6XBbbgJTJH01Sb4GVg2U1ZJ3I",
  authDomain: "motivationquotesapp-e4b7f.firebaseapp.com",
  projectId: "motivationquotesapp-e4b7f",
  storageBucket: "motivationquotesapp-e4b7f.firebasestorage.app",
  messagingSenderId: "963320354752",
  appId: "1:963320354752:web:7c5fac9bbf8003610e1a25"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function uploadQuotes() {
  console.log("Starting upload...");
  
  const batchLimit = 500;
  let batch = writeBatch(db);
  let count = 0;

  for (const [category, quotes] of Object.entries(QUOTE_LIBRARY)) {
    console.log(`Processing category: ${category}`);
    
    for (const quote of quotes) {
      const quoteRef = doc(db, "quotes", quote.id);
      batch.set(quoteRef, {
        ...quote,
        category: category,
        isPremium: Math.random() < 0.3 // Example: 30% are premium
      });
      
      count++;
      
      if (count >= batchLimit) {
        await batch.commit();
        console.log(`Committed batch of ${count} quotes.`);
        batch = writeBatch(db);
        count = 0;
      }
    }
  }

  if (count > 0) {
    await batch.commit();
    console.log(`Committed final batch of ${count} quotes.`);
  }

  console.log("Upload complete!");
}

uploadQuotes().catch(console.error);
