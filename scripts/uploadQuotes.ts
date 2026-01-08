// Run this with: npx ts-node scripts/uploadQuotes.ts
// Make sure you have filled in the firebaseConfig object below!

import { initializeApp } from "firebase/app";
import { getFirestore, doc, writeBatch } from "firebase/firestore";
import { QUOTE_TEMPLATES, type QuoteCategory } from "../constants/QuoteDatabase";

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

type UploadQuote = {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
};

function getQuoteLibrary(): Record<QuoteCategory, UploadQuote[]> {
  const out = {} as Record<QuoteCategory, UploadQuote[]>;
  for (const category of Object.keys(QUOTE_TEMPLATES) as QuoteCategory[]) {
    const templates = QUOTE_TEMPLATES[category];
    out[category] = templates.map((t, idx) => ({
      id: `${category}-${idx + 1}`,
      title: t.title,
      description: t.text,
    }));
  }
  return out;
}

async function uploadQuotes() {
  console.log("Starting upload...");
  
  const batchLimit = 500;
  let batch = writeBatch(db);
  let count = 0;

  const quoteLibrary = getQuoteLibrary();

  for (const category of Object.keys(quoteLibrary) as QuoteCategory[]) {
    const quotes = quoteLibrary[category];
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
