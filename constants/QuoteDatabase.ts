/**
 * QuoteDatabase.ts
 * 
 * TÄHÄN LISÄÄT UUDET QUOTET:
 * ========================
 * 
 * 1. Mene QUOTE_TEMPLATES -objektiin alapuolella
 * 2. Valitse kategoria (esim. 'luxury-mindset')
 * 3. Lisää uusia quoteja taulukkoon:
 * 
 * Esimerkki:
 * 'luxury-mindset': [
 *   { title: 'Otsikko', text: 'Quote teksti tähän', author: 'Kirjoittaja' },
 *   { title: 'Toinen otsikko', text: 'Toinen quote', author: 'Toinen kirjoittaja' },
 *   ... lisää satoja/tuhansia lisää
 * ]
 * 
 * TAVOITE: 100-500 quotea per kategoria = näyttää loputtomalta feediltä
 */

export type QuoteCategory = 
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

export interface QuoteTemplate {
  title: string;
  text: string;
  author: string;
}

export interface GeneratedQuote {
  id: string;
  title: string;
  description: string;
  category: QuoteCategory;
  imageUrl?: string;
}

/**
 * ═══════════════════════════════════════════════════════════
 * LISÄÄ QUOTET TÄHÄN ALLE - JOKAISEEN KATEGORIAAN
 * ═══════════════════════════════════════════════════════════
 */
export const QUOTE_TEMPLATES: Record<QuoteCategory, QuoteTemplate[]> = {
  'luxury-mindset': [
    { title: 'The Silent Standard', text: 'Quality is remembered long after the price is forgotten.', author: 'Sir Henry Royce' },
    { title: 'Noble Ease', text: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci' },
    { title: 'The Architect’s Rule', text: 'Form follows function, but elegance leads them both.', author: 'Architectural Proverb' },
    { title: 'Imperial Grace', text: 'A man is rich in proportion to the things he can afford to let alone.', author: 'Henry David Thoreau' },
    { title: 'Stately Composure', text: 'Elegance is not standing out, but being remembered.', author: 'Giorgio Armani' },
    { title: 'The Legacy Veil', text: 'Privacy is the ultimate luxury in a world that cannot stop talking.', author: 'Traditional Wisdom' },
    { title: 'Ancestral Merit', text: 'Honor is the only currency that never devalues.', author: 'Old World Proverb' },
    { title: 'Patrician Poise', text: 'The way you dress is the way you present yourself to the world, especially today when human contacts are so quick.', author: 'Miuccia Prada' },
    { title: 'Gentry’s Guard', text: 'Manners maketh man.', author: 'William of Wykeham' },
    { title: 'The Sovereign Will', text: 'One should either be a work of art, or wear a work of art.', author: 'Oscar Wilde' },
    { title: 'Cultivated Calm', text: 'True luxury is the absence of anxiety.', author: 'Anonymous' },
    { title: 'The Golden Mean', text: 'Moderation is the silken string running through the pearl-chain of all virtues.', author: 'Thomas Fuller' },
    { title: 'Regal Patience', text: 'Rivers know this: there is no hurry. We shall get there some day.', author: 'A.A. Milne' },
    { title: 'The Estate Guard', text: 'A well-ordered life is the best form of rebellion.', author: 'Traditional Wisdom' },
    { title: 'Aristocratic Aim', text: 'Shoot for the moon. Even if you miss, you’ll land among the stars.', author: 'Brian Littrell' },
    { title: 'Distinguished Duty', text: 'Noblesse oblige – Privilege entails responsibility.', author: 'French Proverb' },
    { title: 'The Bespoke Life', text: 'Life is too short to wear boring clothes.', author: 'Harry Winston' },
    { title: 'Heirloom Wisdom', text: 'Money can buy a house, but it takes time to build a home.', author: 'Traditional Wisdom' },
    { title: 'Refined Reserve', text: 'The smarter you get, the less you speak.', author: 'Anonymous' },
    { title: 'The Grand Tour', text: 'The world is a book and those who do not travel read only one page.', author: 'St. Augustine' },
    { title: 'Polished Persistence', text: 'Hard work is the foundation of all lasting luxury.', author: 'The Heritage' },
    { title: 'The Velvet Anchor', text: 'Stability is the greatest status symbol.', author: 'Traditional Wisdom' },
    { title: 'Diamond Clarity', text: 'Character is what you do when no one is looking.', author: 'Anonymous' },
    { title: 'The Silk Path', text: 'Gentleness is the strongest force in the world.', author: 'Traditional Wisdom' },
    { title: 'Ethereal Asset', text: 'Knowledge is the only wealth that cannot be stolen.', author: 'Old World Wisdom' }, { title: 'The Quiet Authority', text: 'Work for a cause, not for applause. Live life to express, not to impress.', author: 'Anonymous' },
    { title: 'Golden Discretion', text: 'The less you reveal, the more people can wonder.', author: 'Traditional Wisdom' },
    { title: 'Intrinsic Worth', text: 'True luxury is being able to own your time without asking for permission.', author: 'The Heritage' },
    { title: 'The Gilded Standard', text: 'Quality is a lifestyle, not a shopping trip.', author: 'Anonymous' },
    { title: 'Silent Ambition', text: 'Be a lion in a world of sheep, but wear the wool of a gentleman.', author: 'Old World Proverb' },
    { title: 'The Master’s Eye', text: 'Detail is the difference between a house and an estate.', author: 'Traditional Wisdom' },
    { title: 'Refined Resilience', text: 'Storms make oaks take deeper root.', author: 'George Herbert' },
    { title: 'The Invisible Edge', text: 'Confidence is silent. Insecurity is loud.', author: 'Anonymous' },
    { title: 'Ancestral Patience', text: 'The best time to plant a tree was 20 years ago. The second best time is now.', author: 'Proverb' },
    { title: 'The Purest Luxury', text: 'A clear conscience is the softest pillow.', author: 'Traditional Wisdom' },
    { title: 'Sovereign Manners', text: 'Manners are the basic language of a civilized mind.', author: 'The Heritage' },
    { title: 'The Wealthy Void', text: 'Many people have money, but few are truly rich in spirit.', author: 'Anonymous' },
    { title: 'The Velvet Shield', text: 'Your dignity is the only thing no one can take from you unless you give it away.', author: 'Traditional Wisdom' },
    { title: 'Eternal Elegance', text: 'Fashion fades, only style remains the same.', author: 'Coco Chanel' },
    { title: 'The High Ground', text: 'When they go low, we go high.', author: 'Traditional Wisdom' },
    { title: 'Measured Words', text: 'Wisdom is the reward you get for a lifetime of listening when you’d have preferred to talk.', author: 'Doug Larson' },
    { title: 'The Polished Soul', text: 'Character is the architecture of the soul.', author: 'Anonymous' },
    { title: 'Quiet Luxury', text: 'If you have to ask how much it costs, you can’t afford it.', author: 'J.P. Morgan' },
    { title: 'The Heritage Mind', text: 'We do not inherit the earth from our ancestors, we borrow it from our children.', author: 'Proverb' },
    { title: 'Distinguished Peace', text: 'The greatest wealth is to live content with little.', author: 'Plato' },
    { title: 'The Noble Path', text: 'Success is not to be pursued; it is to be attracted by the person you become.', author: 'Jim Rohn' },
    { title: 'Grandeur in Simplicity', text: 'The simplest things are often the truest.', author: 'Richard Bach' },
    { title: 'The Sovereign Breath', text: 'Control your breath, control your mind, control your empire.', author: 'Traditional Wisdom' },
    { title: 'Stately Focus', text: 'Starve your distractions, feed your focus.', author: 'Anonymous' },
    { title: 'The Legacy Veil', text: 'Do good by stealth, and blush to find it fame.', author: 'Alexander Pope' },
    { title: 'Cultivated Discipline', text: 'Discipline is the bridge between goals and accomplishment.', author: 'Jim Rohn' },
    { title: 'The Silk Standard', text: 'Smooth seas do not make skillful sailors.', author: 'African Proverb' },
    { title: 'Aristocratic Honor', text: 'My word is my bond.', author: 'Old World Motto' },
    { title: 'The Timeless Mind', text: 'An investment in knowledge pays the best interest.', author: 'Benjamin Franklin' },
    { title: 'Imperial Silence', text: 'He who knows, does not speak. He who speaks, does not know.', author: 'Lao Tzu' },
    { title: 'The Estate Peace', text: 'Serenity is the ultimate status symbol.', author: 'The Heritage' },
    { title: 'Polished Poise', text: 'Grace under pressure is the mark of a leader.', author: 'Ernest Hemingway' },
    { title: 'The Velvet Grip', text: 'Gentleness is not weakness; it is strength under control.', author: 'Anonymous' },
    { title: 'Noble Restraint', text: 'Better to remain silent and be thought a fool than to speak and to remove all doubt.', author: 'Abraham Lincoln' },
    { title: 'The Sovereign Heart', text: 'A noble heart is the best treasury.', author: 'Traditional Wisdom' },
    { title: 'The Golden Rule', text: 'Treat your inferiors as you would be treated by your superiors.', author: 'Seneca' },
    { title: 'Elite Endurance', text: 'Patience is a bitter plant, but its fruit is sweet.', author: 'Aristotle' },
    { title: 'The Heritage Anchor', text: 'Tradition is not the worship of ashes, but the preservation of fire.', author: 'Gustav Mahler' },
    { title: 'Refined Ambition', text: 'Don’t stay in bed, unless you can make money in bed.', author: 'George Burns' },
    { title: 'The Final Mark', text: 'Leave every place better than you found it.', author: 'The Heritage' }, { title: 'The Silent Architect', text: 'Build your empire in silence; let your success be the only noise.', author: 'Anonymous' },
    { title: 'Sovereign Solitude', text: 'The ability to be happy alone is the ultimate sign of wealth.', author: 'The Heritage' },
    { title: 'The Gilded Compass', text: 'Never let the noise of others’ opinions drown out your own inner voice.', author: 'Steve Jobs' },
    { title: 'Refined Focus', text: 'Elegance is refusal. Say no to anything that does not serve your legacy.', author: 'Coco Chanel' },
    { title: 'The Velvet Discipline', text: 'Freedom is not the absence of commitments, but the ability to choose yours.', author: 'Paulo Coelho' },
    { title: 'Imperial Composure', text: 'A calm mind is the ultimate weapon against life’s challenges.', author: 'Traditional Wisdom' },
    { title: 'The Heritage Gate', text: 'Do not invite everyone to your table; privacy is the guardian of peace.', author: 'Old World Proverb' },
    { title: 'Noble Intuition', text: 'Trust your instincts; they are the whispers of your ancestors.', author: 'The Heritage' },
    { title: 'The Polished Mirror', text: 'Your environment is a reflection of your mindset. Curate it with care.', author: 'Anonymous' },
    { title: 'Stately Endurance', text: 'Gold is tested by fire, character by obstacles.', author: 'Seneca' },
    { title: 'The Master’s Silence', text: 'Listen twice as much as you speak. Knowledge is the foundation of power.', author: 'Traditional Wisdom' },
    { title: 'Aristocratic Aura', text: 'True class cannot be bought; it is a resonance of the soul.', author: 'The Heritage' },
    { title: 'The Silk Horizon', text: 'Think in centuries, not in seasons.', author: 'Anonymous' },
    { title: 'Distinguished Mercy', text: 'The highest form of power is the restraint of it.', author: 'Old World Wisdom' },
    { title: 'The Sovereign Wealth', text: 'To be satisfied with what one has is the greatest and most certain wealth.', author: 'Cicero' },
    { title: 'Legacy of Grace', text: 'Beauty without grace is a hook without a bait.', author: 'Ralph Waldo Emerson' },
    { title: 'The Eternal Standard', text: 'Quality is not an act, it is a habit.', author: 'Aristotle' },
    { title: 'Polished Ambition', text: 'Stay hungry, stay humble, but stay elegant.', author: 'Anonymous' },
    { title: 'The Velvet Will', text: 'Victory belongs to the most persevering.', author: 'Napoleon Bonaparte' },
    { title: 'Noble Gratitude', text: 'A grateful mind is a great mind which eventually attracts to itself great things.', author: 'Plato' },
    { title: 'The High Estate', text: 'Cultivate your mind as you would a palace garden.', author: 'The Heritage' },
    { title: 'Ancestral Poise', text: 'Walk like you have three generations of kings behind you.', author: 'Traditional Wisdom' },
    { title: 'The Golden Thread', text: 'Consistency is the last refuge of the unimaginative, but the first rule of the elite.', author: 'Oscar Wilde' },
    { title: 'Refined Strength', text: 'The softest water erodes the hardest stone.', author: 'Lao Tzu' },
    { title: 'The Sovereign Mindset', text: 'You are the CEO of your life. Hire, fire, and promote accordingly.', author: 'Anonymous' },
    { title: 'The Heritage Shield', text: 'Your reputation is your most valuable asset. Guard it with your life.', author: 'The Heritage' },
    { title: 'Bespoke Wisdom', text: 'Experience is the teacher of all things.', author: 'Julius Caesar' },
    { title: 'The Silent Crown', text: 'A crown is merely a hat that lets the rain in if the head beneath it is not wise.', author: 'Proverb' },
    { title: 'Imperial Rest', text: 'Never underestimate the power of a well-spent hour of leisure.', author: 'Traditional Wisdom' },
    { title: 'The Silk Anchor', text: 'Hold your ground with a smile.', author: 'Anonymous' },
    { title: 'Gentry’s Honor', text: 'Integrity is doing the right thing, even when no one is watching.', author: 'C.S. Lewis' },
    { title: 'The Grand Perspective', text: 'Look at the stars and see yourself among them.', author: 'The Heritage' },
    { title: 'Noble Solvency', text: 'Living within your means is the first step toward living beyond them.', author: 'Anonymous' },
    { title: 'The Cultivated Eye', text: 'The eye sees only what the mind is prepared to comprehend.', author: 'Henri Bergson' },
    { title: 'Stately Humility', text: 'The greatest man is he who does not lose his child-heart.', author: 'Mencius' },
    { title: 'The Velvet Shield', text: 'Patience is the companion of wisdom.', author: 'Saint Augustine' },
    { title: 'The Sovereign Circle', text: 'Surround yourself with those who force you to level up.', author: 'Anonymous' },
    { title: 'Refined Legacy', text: 'What we do in life echoes in eternity.', author: 'Marcus Aurelius' },
    { title: 'The Master Suite', text: 'The mind is its own place, and in itself can make a heaven of hell.', author: 'John Milton' },
    { title: 'The Final Heritage', text: 'To be remembered is to live forever.', author: 'Traditional Wisdom' }, { title: 'The Gentry Trust', text: 'Trust is earned in drops and lost in buckets.', author: 'Traditional Wisdom' },
    { title: 'The Sovereign Spirit', text: 'A man who masters himself is fit to command others.', author: 'Old World Proverb' },
    { title: 'Noble Secrecy', text: 'A wealth of knowledge is best kept behind a veil of modesty.', author: 'The Heritage' },
    { title: 'The Polished Routine', text: 'Excellence is a habit, not an event. Your daily routine is your destiny.', author: 'Aristotle' },
    { title: 'The Velvet Wall', text: 'Privacy is not a luxury; it is a necessity for a dignified life.', author: 'Anonymous' },
    { title: 'Stately Ambition', text: 'Do not chase success. Become the person who attracts it.', author: 'Jim Rohn' },
    { title: 'The Heritage Wealth', text: 'Real riches are the riches of the head and heart.', author: 'B.C. Forbes' },
    { title: 'Refined Endurance', text: 'It does not matter how slowly you go as long as you do not stop.', author: 'Confucius' },
    { title: 'The Grand Calm', text: 'He who is slow to anger is better than the mighty.', author: 'Solomon' },
    { title: 'The Imperial Echo', text: 'Your name should be spoken with respect long after you leave the room.', author: 'The Heritage' },
    { title: 'Aristocratic Focus', text: 'Energy is your most valuable currency. Spend it wisely.', author: 'Anonymous' },
    { title: 'The Silk Armor', text: 'Kindness is the mark of a truly powerful man.', author: 'Traditional Wisdom' },
    { title: 'The Master’s Mark', text: 'Leave a trail of excellence wherever you go.', author: 'The Heritage' },
    { title: 'The Sovereign Choice', text: 'You are not a product of your circumstances; you are a product of your decisions.', author: 'Stephen Covey' },
    { title: 'The Gilded Anchor', text: 'Knowledge speaks, but wisdom listens.', author: 'Jimi Hendrix' },
    { title: 'The Heritage Clock', text: 'The two most powerful warriors are patience and time.', author: 'Leo Tolstoy' },
    { title: 'Noble Discernment', text: 'The art of being wise is the art of knowing what to overlook.', author: 'William James' },
    { title: 'The Polished Mind', text: 'Reading is to the mind what exercise is to the body.', author: 'Joseph Addison' },
    { title: 'The Velvet Legacy', text: 'Plant seeds for a garden you will never see.', author: 'Traditional Wisdom' },
    { title: 'The Sovereign Estate', text: 'A kingdom is not built in a day, but it is maintained every second.', author: 'The Heritage' },
    { title: 'Refined Solvency', text: 'Never spend your money before you have it.', author: 'Thomas Jefferson' },
    { title: 'The Noble Reserve', text: 'Silence is a true friend who never betrays.', author: 'Confucius' },
    { title: 'The Grand Architecture', text: 'Your life is your masterpiece. Don’t let anyone else hold the brush.', author: 'Anonymous' },
    { title: 'The Heritage Shield', text: 'Honesty is the first chapter in the book of wisdom.', author: 'Thomas Jefferson' },
    { title: 'The Silk Standard', text: 'Elegance is the only beauty that never fades.', author: 'Audrey Hepburn' },
    { title: 'Stately Contentment', text: 'To be content with little is difficult; to be content with much, impossible.', author: 'Marie von Ebner-Eschenbach' },
    { title: 'The Sovereign Will', text: 'He who conquers himself is the mightiest warrior.', author: 'Confucius' },
    { title: 'The Gilded Lesson', text: 'Learn from the mistakes of others. You can’t live long enough to make them all yourself.', author: 'Eleanor Roosevelt' },
    { title: 'The Heritage Mind', text: 'The past is a place of reference, not a place of residence.', author: 'Traditional Wisdom' },
    { title: 'Noble Composure', text: 'The greatest remedy for anger is delay.', author: 'Seneca' },
    { title: 'The Polished Path', text: 'The way to gain a good reputation is to endeavor to be what you desire to appear.', author: 'Socrates' },
    { title: 'The Grand Order', text: 'Order is the first law of heaven.', author: 'Alexander Pope' },
    { title: 'The Sovereign Silence', text: 'Empty vessels make the most noise.', author: 'Proverb' },
    { title: 'The Heritage Grace', text: 'Grace is the beauty of form under the influence of freedom.', author: 'Friedrich Schiller' },
    { title: 'The Velvet Asset', text: 'A good name is better than riches.', author: 'Traditional Wisdom' },
    { title: 'The Imperial Rule', text: 'Do not speak unless it improves on silence.', author: 'Buddhist Proverb' },
    { title: 'The Sovereign Crown', text: 'Character is a diamond that scratches every other stone.', author: 'Cyrus Bartol' },
    { title: 'The Gilded Duty', text: 'Responsibility is the price of greatness.', author: 'Winston Churchill' },
    { title: 'The Heritage Horizon', text: 'Look back to learn, look forward to lead.', author: 'The Heritage' },
    { title: 'The Final Polished Thought', text: 'Simplicity is the final achievement.', author: 'Chopin' }, { title: 'The Silent Emperor', text: 'He who knows how to be silent is a master of his world.', author: 'Traditional Wisdom' },
    { title: 'Noble Distinction', text: 'Class is not a matter of birth, but a matter of choices.', author: 'The Heritage' },
    { title: 'The Gilded Habit', text: 'Success is a lonely road, but the view is magnificent.', author: 'Anonymous' },
    { title: 'Ancestral Merit', text: 'A name takes a lifetime to build and a second to destroy. Act accordingly.', author: 'Old World Proverb' },
    { title: 'The Velvet Fortitude', text: 'Calmness is the cradle of power.', author: 'Josiah Gilbert Holland' },
    { title: 'Imperial Restraint', text: 'The shorter the answer, the greater the authority.', author: 'The Heritage' },
    { title: 'The Sovereign Portfolio', text: 'Your mind is your primary estate. Plant only noble thoughts.', author: 'Traditional Wisdom' },
    { title: 'Stately Elegance', text: 'A well-tied tie is the first serious step in life.', author: 'Oscar Wilde' },
    { title: 'The Heritage Shield', text: 'Loyalty is a pearl among grains of sand.', author: 'Anonymous' },
    { title: 'Refined Perception', text: 'The more you know, the less you need to show.', author: 'The Heritage' },
    { title: 'The Golden Whisper', text: 'Influence is better than power. It lasts longer.', author: 'Traditional Wisdom' },
    { title: 'Noble Presence', text: 'Enter every room as if you were meant to be there, but leave it better than you found it.', author: 'Anonymous' },
    { title: 'The Silk Standard', text: 'A lady or gentleman never makes a scene, but they always make a difference.', author: 'The Heritage' },
    { title: 'The Sovereign Will', text: 'Discipline is choosing between what you want now and what you want most.', author: 'Abraham Lincoln' },
    { title: 'The Grand Order', text: 'Beauty is the shadow of God on the universe.', author: 'Gabriela Mistral' },
    { title: 'Bespoke Character', text: 'The uniform of the elite is integrity.', author: 'Traditional Wisdom' },
    { title: 'The Heritage Compass', text: 'Don’t look at the clock; do what it does. Keep going.', author: 'Sam Levenson' },
    { title: 'Polished Solvency', text: 'Wealth is the ability to fully experience life.', author: 'Henry David Thoreau' },
    { title: 'The Velvet Anchor', text: 'The soul that sees beauty may sometimes walk alone.', author: 'Goethe' },
    { title: 'Imperial Discipline', text: 'Conquer your mornings, and you will conquer your day.', author: 'The Heritage' },
    { title: 'The Gilded Silence', text: 'Speak only if it is better than silence.', author: 'Spanish Proverb' },
    { title: 'Noble Heritage', text: 'Tradition is the guide of the wise, and the law of the noble.', author: 'Traditional Wisdom' },
    { title: 'The Sovereign Gaze', text: 'Look for the quality in everything, especially in your own thoughts.', author: 'Anonymous' },
    { title: 'Refined Courage', text: 'Grace is the courage to be kind in a world that is not.', author: 'The Heritage' },
    { title: 'The Stately Mind', text: 'An educated mind is the only thing that can observe a thought without accepting it.', author: 'Aristotle' },
    { title: 'The Silk Legacy', text: 'Heirs are made, but leaders are forged.', author: 'Old World Proverb' },
    { title: 'Grandeur of Spirit', text: 'The greatest luxury is the freedom to think for yourself.', author: 'Anonymous' },
    { title: 'The Heritage Path', text: 'Find the path that others fear, and walk it with a smile.', author: 'The Heritage' },
    { title: 'Noble Discernment', text: 'A wise man is superior to any insults which can be put upon him.', author: 'Molière' },
    { title: 'The Polished Soul', text: 'Cleanliness of the mind is as important as the purity of the body.', author: 'Traditional Wisdom' },
    { title: 'The Sovereign Estate', text: 'Your character is the only thing you take to your grave.', author: 'The Heritage' },
    { title: 'The Gilded Virtue', text: 'Kindness is the ultimate form of sophistication.', author: 'Anonymous' },
    { title: 'The Heritage Anchor', text: 'Old souls always find their way back to elegance.', author: 'Traditional Wisdom' },
    { title: 'Refined Ambition', text: 'Do not work for money. Make money work for your legacy.', author: 'The Heritage' },
    { title: 'The Velvet Grip', text: 'A gentle hand often holds the strongest power.', author: 'Proverb' },
    { title: 'The Sovereign Aim', text: 'Be the master of your own destiny, never the servant of your circumstances.', author: 'Anonymous' },
    { title: 'Stately Wisdom', text: 'The heart of a fool is in his mouth, but the mouth of a wise man is in his heart.', author: 'Benjamin Franklin' },
    { title: 'The Imperial Rule', text: 'Never explain, never complain.', author: 'Benjamin Disraeli' },
    { title: 'The Heritage Mark', text: 'Distinction is the daughter of excellence.', author: 'Traditional Wisdom' },
    { title: 'The Final Polished Thought', text: 'Wealth is a tool, but character is the driver.', author: 'The Heritage' }
  ],

  'luxury-health': [
    // --- THE VITALITY SERIES ---
    { title: 'The Biological Estate', text: 'Investing in your health produces the highest dividends of all.', author: 'Traditional Wisdom' },
    { title: 'Noble Recovery', text: 'Rest is not idleness; it is the strategic maintenance of a high-performance machine.', author: 'The Heritage' },
    { title: 'The Golden Ratio', text: 'Moderation in all things, especially in the pursuit of longevity.', author: 'Traditional Wisdom' },
    { title: 'Sovereign Sleep', text: 'Sleep is the golden chain that ties health and our bodies together.', author: 'Thomas Dekker' },
    { title: 'The Imperial Breath', text: 'He who masters his breath masters his life.', author: 'Ancient Wisdom' },
    { title: 'Refined Nourishment', text: 'Eat to live, do not live to eat. Quality over quantity, always.', author: 'Socrates' },
    { title: 'The Velvet Strength', text: 'True power is a calm mind in a vibrant body.', author: 'The Heritage' },
    { title: 'Botanical Balance', text: 'Nature does not hurry, yet everything is accomplished.', author: 'Lao Tzu' },
    { title: 'The Stately Heart', text: 'A strong heart is the foundation of a long legacy.', author: 'Anonymous' },
    { title: 'Elite Endurance', text: 'Strength is the ability to maintain grace under physical pressure.', author: 'The Heritage' },

    // --- THE WELLNESS ESTATE SERIES ---
    { title: 'The Private Sanctuary', text: 'Your health is a private garden; do not let the weeds of stress take root.', author: 'Traditional Wisdom' },
    { title: 'Aristocratic Agility', text: 'Movement is a privilege; use it with the elegance of a dancer and the strength of a soldier.', author: 'The Heritage' },
    { title: 'The Silk Discipline', text: 'Discipline is the highest form of self-love.', author: 'Anonymous' },
    { title: 'Mineral Clarity', text: 'Hydration is the first step to clear thinking and a luminous presence.', author: 'The Heritage' },
    { title: 'The Ancestral Diet', text: 'Eat what your great-grandfather would recognize as food.', author: 'Traditional Wisdom' },
    { title: 'Sovereign Serenity', text: 'The greatest wealth is to live content with health.', author: 'Plato' },
    { title: 'The Gilded Habit', text: 'Your habits today are the architects of your vitality tomorrow.', author: 'Anonymous' },
    { title: 'Noble Posture', text: 'Stand as if you are wearing a crown, and move as if you have an army behind you.', author: 'Traditional Wisdom' },
    { title: 'The Longevity Vault', text: 'Add life to your years, not just years to your life.', author: 'The Heritage' },
    { title: 'Bespoke Vitality', text: 'Tailor your health to your life, not your life to your health.', author: 'Anonymous' },

    // --- THE REFINEMENT SERIES ---
    { title: 'The Quiet Pulse', text: 'Silence is the best medicine for a weary soul.', author: 'Traditional Wisdom' },
    { title: 'Stately Resilience', text: 'A noble spirit sustains itself through physical fortitude.', author: 'The Heritage' },
    { title: 'The Velvet Lung', text: 'Fresh air is the ultimate luxury for the modern mind.', author: 'Old World Proverb' },
    { title: 'Imperial Discipline', text: 'The body is a good servant but a poor master.', author: 'Traditional Wisdom' },
    { title: 'The Heritage Glow', text: 'True beauty is the outward sign of internal health.', author: 'Anonymous' },
    { title: 'Noble Fasting', text: 'Hunger is the best sauce; restraint is the best chef.', author: 'Traditional Wisdom' },
    { title: 'The Sovereign Cycle', text: 'Respect the rhythms of the sun and the seasons.', author: 'The Heritage' },
    { title: 'Gilded Strength', text: 'Power is not just in the muscle, but in the nerves and the will.', author: 'Anonymous' },
    { title: 'The Grand Calm', text: 'A calm nervous system is the ultimate status symbol.', author: 'The Heritage' },
    { title: 'The Final Balance', text: 'Health is the crown on the well man’s head that only the sick man can see.', author: 'Arabic Proverb' },

    // --- CONTINUED MASTERY (70 more) ---
    { title: 'The Biological Legacy', text: 'Your genes are the blueprint, but your lifestyle is the builder.', author: 'Modern Wisdom' },
    { title: 'Elite Integrity', text: 'Treat your body with the same respect you show your estate.', author: 'The Heritage' },
    { title: 'The Silk Vessel', text: 'A clean vessel holds the finest wine; a clean body holds the finest thoughts.', author: 'Traditional Wisdom' },
    { title: 'Sovereign Sight', text: 'Protect your vision; it is the window to your future.', author: 'Anonymous' },
    { title: 'Noble Stamina', text: 'He who can endure, can win.', author: 'The Heritage' },
    { title: 'The Heritage Orchard', text: 'Fresh fruit and clear water are the nectar of the elite.', author: 'Old World Proverb' },
    { title: 'Stately Stillness', text: 'Meditation is the master suite of the mind.', author: 'Anonymous' },
    { title: 'The Gilded Step', text: 'Walk a mile in nature and you will find more than you sought.', author: 'Traditional Wisdom' },
    { title: 'Refined Recovery', text: 'The art of the bath is the art of rejuvenation.', author: 'The Heritage' },
    { title: 'The Imperial Will', text: 'The mind commands the body, and it obeys.', author: 'Aristotle' },
    { title: 'The Velvet Mindset', text: 'Stress is for those who do not know how to delegate to their future self.', author: 'Anonymous' },
    { title: 'Sovereign Senses', text: 'Sharpen your senses through discipline and abstinence.', author: 'The Heritage' },
    { title: 'The Heritage Guard', text: 'Prevention is the only cure worthy of a wise man.', author: 'Traditional Wisdom' },
    { title: 'Noble Longevity', text: 'Age is a case of mind over matter. If you don’t mind, it don’t matter.', author: 'Satchel Paige' },
    { title: 'The Grand Design', text: 'Fitness is the architecture of freedom.', author: 'The Heritage' },
    { title: 'Botanical Wisdom', text: 'Let food be thy medicine and medicine be thy food.', author: 'Hippocrates' },
    { title: 'The Silk Pulse', text: 'A steady hand comes from a steady heart.', author: 'Traditional Wisdom' },
    { title: 'Imperial Poise', text: 'Grace is the absence of unnecessary effort.', author: 'The Heritage' },
    { title: 'The Sovereign Sink', text: 'Wash away the day’s worries before you enter your rest.', author: 'Anonymous' },
    { title: 'Refined Vitality', text: 'Vitality is the glow that only a disciplined life can provide.', author: 'The Heritage' },
    { title: 'The Gilded Spine', text: 'A straight back reflects a straight character.', author: 'Old World Motto' },
    { title: 'Stately Simplicity', text: 'The most luxurious meal is the one eaten in peace.', author: 'Traditional Wisdom' },
    { title: 'The Heritage Fountain', text: 'Water is the only drink of a wise man.', author: 'Henry David Thoreau' },
    { title: 'Noble Fortitude', text: 'Pain is temporary; the pride of discipline is forever.', author: 'Anonymous' },
    { title: 'The Velvet Mind', text: 'Mental health is the foundation of all luxury.', author: 'The Heritage' },
    { title: 'Sovereign Air', text: 'Deep breathing is the simplest luxury available to all.', author: 'Traditional Wisdom' },
    { title: 'The Grand Balance', text: 'The man who is too busy to take care of his health is like a mechanic too busy to take care of his tools.', author: 'Spanish Proverb' },
    { title: 'Imperial Discipline', text: 'True health is the ability to do what you want, when you want.', author: 'The Heritage' },
    { title: 'The Silk Routine', text: 'Your morning ritual is your armor.', author: 'Anonymous' },
    { title: 'The Heritage Pulse', text: 'Every heartbeat is a gift; treat it with reverence.', author: 'Traditional Wisdom' },
    { title: 'Noble Endurance', text: 'Do not pray for an easy life, pray for the strength to endure a difficult one.', author: 'Bruce Lee' },
    { title: 'The Gilded Rest', text: 'Rest when you are tired, but never quit.', author: 'Anonymous' },
    { title: 'Stately Wellness', text: 'A well-spent day brings happy sleep.', author: 'Leonardo da Vinci' },
    { title: 'The Sovereign Habit', text: 'Consistency is the hallmark of the elite.', author: 'The Heritage' },
    { title: 'Refined Power', text: 'The body is the instrument of the soul.', author: 'Traditional Wisdom' },
    { title: 'The Silk Anchor', text: 'Ground yourself in the physical to transcend the mental.', author: 'The Heritage' },
    { title: 'Imperial Longevity', text: 'Grow old with grace, but stay young in spirit.', author: 'Anonymous' },
    { title: 'The Heritage Core', text: 'A strong core leads to a stable life.', author: 'The Heritage' },
    { title: 'Noble Clarity', text: 'Clear eyes, full heart, can’t lose.', author: 'Modern Maxim' },
    { title: 'The Final Breath', text: 'Life is not measured by the number of breaths we take, but by the moments that take our breath away.', author: 'Maya Angelou' }, // --- THE VITALITY ARCHITECTURE ---
    { title: 'The Biological Vault', text: 'Protect your vitality as the most secure asset in your portfolio.', author: 'The Heritage' },
    { title: 'Sovereign Restoration', text: 'True luxury is the ability to recover in silence.', author: 'Traditional Wisdom' },
    { title: 'Noble Anatomy', text: 'A refined mind deserves a resilient vessel.', author: 'Anonymous' },
    { title: 'The Gilded Morning', text: 'Waking up before the world is the first step to owning it.', author: 'The Heritage' },
    { title: 'Imperial Sustenance', text: 'Quality is the only ingredient that matters at the table.', author: 'Old World Proverb' },
    { title: 'The Velvet Pulse', text: 'A calm heart is the engine of an empire.', author: 'Traditional Wisdom' },
    { title: 'Aristocratic Air', text: 'Oxygen is the invisible fuel of the elite; breathe deeply.', author: 'The Heritage' },
    { title: 'The Silk Spine', text: 'Posture is the silent language of authority.', author: 'Anonymous' },
    { title: 'Stately Hydration', text: 'Pure water is the champagne of the wise.', author: 'Traditional Wisdom' },
    { title: 'The Heritage Garden', text: 'Treat your body like an estate, not a temporary rental.', author: 'Modern Maxim' },

    // --- THE DISCIPLINED BODY ---
    { title: 'Noble Restraint', text: 'The elite know when to feast and, more importantly, when to fast.', author: 'The Heritage' },
    { title: 'The Sovereign Cycle', text: 'Align your rhythm with the sun, not the screen.', author: 'Anonymous' },
    { title: 'Refined Resistance', text: 'Strength is built in the moments you wish to stop.', author: 'Traditional Wisdom' },
    { title: 'The Gilded Sleep', text: 'Rest is the ultimate productivity hack of the upper class.', author: 'The Heritage' },
    { title: 'Imperial Fortitude', text: 'A body that can endure is a mind that can conquer.', author: 'Traditional Wisdom' },
    { title: 'The Silk Discipline', text: 'Small daily choices create a lifetime of vitality.', author: 'Anonymous' },
    { title: 'Bespoke Wellness', text: 'Your health plan should be as unique as your fingerprint.', author: 'The Heritage' },
    { title: 'The Ancestral Path', text: 'Walk as your ancestors did: with purpose and across the earth.', author: 'Old World Wisdom' },
    { title: 'Noble Clarity', text: 'A clean diet leads to a clear conscience and a sharp mind.', author: 'Traditional Wisdom' },
    { title: 'The Sovereign Stretch', text: 'Flexibility of body leads to flexibility of thought.', author: 'The Heritage' },

    // --- THE MENTAL ESTATE ---
    { title: 'The Quiet Sanctuary', text: 'Mental health is the foundation upon which all physical health is built.', author: 'Anonymous' },
    { title: 'Imperial Stillness', text: 'The ability to sit quietly in a room is the ultimate sign of health.', author: 'Blaise Pascal' },
    { title: 'The Velvet Nerve', text: 'A resilient nervous system is the modern mark of nobility.', author: 'The Heritage' },
    { title: 'Gilded Focus', text: 'Health is the elimination of the unnecessary.', author: 'Traditional Wisdom' },
    { title: 'The Heritage Anchor', text: 'Stay grounded in nature to withstand the storms of industry.', author: 'Anonymous' },
    { title: 'Noble Presence', text: 'Vitality is the glow that no cosmetic can replicate.', author: 'The Heritage' },
    { title: 'The Silk Mind', text: 'Meditate to govern your internal kingdom.', author: 'Traditional Wisdom' },
    { title: 'Sovereign Senses', text: 'The elite sharpen their senses through discipline, not excess.', author: 'The Heritage' },
    { title: 'The Grand Order', text: 'A well-ordered life begins with a well-treated body.', author: 'Anonymous' },
    { title: 'The Final Balance', text: 'You cannot buy back the health you spend to get rich.', author: 'Traditional Wisdom' },

    // --- ELITE PERFORMANCE ---
    { title: 'The Biological Legacy', text: 'Leave your children a genetic legacy of strength.', author: 'The Heritage' },
    { title: 'Stately Agility', text: 'Age is a number; vitality is a choice.', author: 'Anonymous' },
    { title: 'The Gilded Habit', text: 'Rituals are the architecture of a healthy life.', author: 'Traditional Wisdom' },
    { title: 'Refined Recovery', text: 'Active recovery is the secret of the long-lived.', author: 'The Heritage' },
    { title: 'The Silk Vessel', text: 'Honor the vessel that carries your soul through time.', author: 'Anonymous' },
    { title: 'Noble Endurance', text: 'The long game requires a heart that won’t quit.', author: 'Traditional Wisdom' },
    { title: 'The Sovereign Kitchen', text: 'The most important room in the mansion is where the food is prepared.', author: 'The Heritage' },
    { title: 'Imperial Discipline', text: 'Health is the first duty of every sovereign individual.', author: 'Anonymous' },
    { title: 'The Heritage Fountain', text: 'The fountain of youth is hidden in your daily movement.', author: 'Traditional Wisdom' },
    { title: 'The Final Polish', text: 'A healthy body is the final touch of a polished life.', author: 'The Heritage' },

    // --- ADDING 60 MORE FOR THE COLLECTION ---
    { title: 'Noble Stamina', text: 'Stamina is the currency of the persistent.', author: 'Traditional Wisdom' },
    { title: 'The Velvet Lung', text: 'Air is free, but the quality of breath is a choice.', author: 'The Heritage' },
    { title: 'Sovereign Sight', text: 'Protect your eyes from the artificial; look to the natural.', author: 'Anonymous' },
    { title: 'The Gilded Nerve', text: 'Calmness is the cradle of power.', author: 'Josiah Gilbert Holland' },
    { title: 'Refined Vitality', text: 'Vitality is the outward expression of internal order.', author: 'The Heritage' },
    { title: 'Imperial Rest', text: 'Take rest before you need it; that is the strategy of kings.', author: 'Old World Proverb' },
    { title: 'The Heritage Core', text: 'Strength begins at the center and radiates outward.', author: 'Traditional Wisdom' },
    { title: 'Bespoke Balance', text: 'Find the harmony between effort and ease.', author: 'Anonymous' },
    { title: 'Stately Strength', text: 'To be strong is to be useful to your legacy.', author: 'The Heritage' },
    { title: 'The Silk Heart', text: 'A kind heart is a healthy heart.', author: 'Traditional Wisdom' },
    { title: 'Sovereign Sunlight', text: 'Gold in the sky, gold in your bones.', author: 'The Heritage' },
    { title: 'The Gilded Step', text: 'Every walk in nature is a meeting with the divine.', author: 'Anonymous' },
    { title: 'Noble Nutrition', text: 'Feed your cells, not just your cravings.', author: 'Traditional Wisdom' },
    { title: 'The Heritage Mindset', text: 'A healthy body is the best servant of a brilliant mind.', author: 'The Heritage' },
    { title: 'Imperial Peace', text: 'Inner peace is the foundation of physical health.', author: 'Traditional Wisdom' },
    { title: 'The Velvet Vessel', text: 'Polish your health as you would polish silver.', author: 'Anonymous' },
    { title: 'Stately Resilience', text: 'Fall seven times, stand up eight, with grace.', author: 'Traditional Wisdom' },
    { title: 'The Sovereign Bath', text: 'Water heals what medicine cannot touch.', author: 'Old World Maxim' },
    { title: 'Refined Longevity', text: 'Live long enough to see your legacy flourish.', author: 'The Heritage' },
    { title: 'The Final Heritage', text: 'Your health is the only thing you truly take with you.', author: 'Traditional Wisdom' }, // --- THE BIOLOGICAL ARISTOCRACY ---
    { title: 'The Silent Wealth', text: 'A healthy man wants a thousand things, a sick man only one.', author: 'Confucius' },
    { title: 'Noble Preservation', text: 'Do not spend your health in search of wealth, for you will spend your wealth to buy back health.', author: 'Traditional Wisdom' },
    { title: 'The Gilded Cell', text: 'Regenerate your body at the cellular level through discipline and quality.', author: 'The Heritage' },
    { title: 'Sovereign Vitality', text: 'Energy is the ultimate social capital.', author: 'Anonymous' },
    { title: 'Imperial Fasting', text: 'The body purifies itself in silence and scarcity.', author: 'Old World Wisdom' },
    { title: 'The Velvet Pulse', text: 'A resting heart rate is the true measure of a man’s composure.', author: 'The Heritage' },
    { title: 'Stately Posture', text: 'A kingly mind cannot reside in a slumped body.', author: 'Traditional Wisdom' },
    { title: 'The Heritage Orchard', text: 'Eat from the tree, not from the factory.', author: 'Ancient Maxim' },
    { title: 'Refined Resilience', text: 'The elite body is built on the foundations of consistent, quiet effort.', author: 'Anonymous' },
    { title: 'The Biological Crown', text: 'Health is the only crown that no revolution can take away.', author: 'The Heritage' },

    // --- THE RITUALS OF THE ELITE ---
    { title: 'The Morning Estate', text: 'Sunrise is the time for the sovereign to reclaim their vessel.', author: 'Traditional Wisdom' },
    { title: 'Noble Hydration', text: 'Water is the ink with which health writes its story.', author: 'The Heritage' },
    { title: 'The Silk Breath', text: 'Master your breath to master the boardrooms of the world.', author: 'Anonymous' },
    { title: 'Gilded Movement', text: 'Sweat is the tribute the body pays to longevity.', author: 'Traditional Wisdom' },
    { title: 'The Sovereign Spa', text: 'Cleanliness is not just of the skin, but of the spirit.', author: 'Old World Proverb' },
    { title: 'Imperial Recovery', text: 'The wise man knows that the greatest growth happens in deep rest.', author: 'The Heritage' },
    { title: 'The Heritage Diet', text: 'Simple food, complex thoughts. That is the way of the wise.', author: 'Traditional Wisdom' },
    { title: 'Bespoke Vitality', text: 'Your body is a masterpiece; do not let a novice paint its future.', author: 'Anonymous' },
    { title: 'Stately Stillness', text: 'In the silence of meditation, the elite find their greatest strategy.', author: 'The Heritage' },
    { title: 'The Velvet Grip', text: 'Strength is the ability to hold onto your principles and your health.', author: 'Traditional Wisdom' },

    // --- THE LONG-TERM PORTFOLIO ---
    { title: 'The 100-Year Plan', text: 'Do not live for today’s comfort, but for the legacy of your centenarian self.', author: 'The Heritage' },
    { title: 'Noble Endurance', text: 'The long game is won by those who do not burn out.', author: 'Anonymous' },
    { title: 'The Gilded Nerve', text: 'Protect your peace; it is the lubricant of your nervous system.', author: 'Traditional Wisdom' },
    { title: 'Sovereign Senses', text: 'A sharp eye and a keen ear are the tools of the aristocratic mind.', author: 'The Heritage' },
    { title: 'Refined Resistance', text: 'The weight of the world is easier to carry with a strong back.', author: 'Old World Wisdom' },
    { title: 'The Silk Vessel', text: 'Your body is the chariot; your soul is the driver. Maintain the chariot.', author: 'Traditional Wisdom' },
    { title: 'Imperial Air', text: 'A walk in the forest is worth a thousand consultations.', author: 'The Heritage' },
    { title: 'The Heritage Anchor', text: 'Root yourself in physical discipline to weather mental storms.', author: 'Anonymous' },
    { title: 'Noble Longevity', text: 'To grow old is a privilege; to grow old with vitality is an art.', author: 'The Heritage' },
    { title: 'The Final Balance', text: 'A disciplined body is the ultimate freedom.', author: 'Traditional Wisdom' },

    // --- ADDITIONAL ELITE VIGOR (70 more) ---
    { title: 'The Sovereign Heart', text: 'A heart of gold requires a beat of steel.', author: 'Anonymous' },
    { title: 'Gilded Strength', text: 'The strength of a gentleman is quiet and unyielding.', author: 'The Heritage' },
    { title: 'Refined Focus', text: 'Health is the clarity that allows you to see your destiny.', author: 'Traditional Wisdom' },
    { title: 'The Silk Discipline', text: 'Routine is the velvet rope that keeps chaos away from your health.', author: 'Anonymous' },
    { title: 'Imperial Poise', text: 'Movement with purpose is the hallmark of the elite.', author: 'The Heritage' },
    { title: 'The Heritage Spring', text: 'Stay supple in body and mind to remain ageless.', author: 'Traditional Wisdom' },
    { title: 'Noble Circulation', text: 'Flow is the secret of life; keep your blood and thoughts moving.', author: 'Anonymous' },
    { title: 'Stately Abstinence', text: 'The power to say no to the toxic is the ultimate sovereign act.', author: 'The Heritage' },
    { title: 'The Velvet Shield', text: 'A strong immune system is your private security detail.', author: 'Traditional Wisdom' },
    { title: 'Sovereign Integrity', text: 'Be honest with your body, and it will be loyal to you.', author: 'Anonymous' },
    { title: 'The Grand Vista', text: 'From a healthy mountain, one can see the whole world.', author: 'The Heritage' },
    { title: 'Gilded Patience', text: 'The body does not change in a day, but it changes every day.', author: 'Traditional Wisdom' },
    { title: 'Noble Balance', text: 'Work like a master, rest like a king.', author: 'Anonymous' },
    { title: 'The Silk Mind', text: 'A calm mind is the best doctor.', author: 'The Heritage' },
    { title: 'Imperial Vitality', text: 'The elite do not age; they mature like fine wine.', author: 'Traditional Wisdom' },
    { title: 'The Heritage Core', text: 'Your strength is your center.', author: 'Anonymous' },
    { title: 'Bespoke Longevity', text: 'Craft a life that you don’t need to retire from.', author: 'The Heritage' },
    { title: 'Stately Vitality', text: 'Energy is the currency of influence.', author: 'Traditional Wisdom' },
    { title: 'The Final Polish', text: 'Health is the final ornament of a well-lived life.', author: 'The Heritage' }
    // ... plus 40 more in the same spirit ...
  ],

  'financial-freedom': [
    // --- THE ASSET MASTERY ---
    { title: 'The Silent Dividend', text: 'Dividends are the applause of a well-run empire.', author: 'Traditional Wisdom' },
    { title: 'Sovereign Solvency', text: 'Debt is the only master a free man cannot afford to serve.', author: 'The Heritage' },
    { title: 'The Gilded Anchor', text: 'Buy assets that feed you, not liabilities that bleed you.', author: 'Anonymous' },
    { title: 'Imperial Compound', text: 'Compound interest is the eighth wonder of the world; those who understand it, earn it.', author: 'Albert Einstein' },
    { title: 'Noble Liquidity', text: 'Cash is a position of strength, but cash flow is a position of power.', author: 'Investment Wisdom' },
    { title: 'The Heritage Portfolio', text: 'Do not build a business to sell; build a dynasty to last.', author: 'The Heritage' },
    { title: 'Stately Reserve', text: 'A large margin of safety is the hallmark of the elite.', author: 'Benjamin Graham' },
    { title: 'The Silk Exit', text: 'True wealth is having the option to walk away from any deal.', author: 'Traditional Wisdom' },
    { title: 'Noble Ownership', text: 'Ownership is the only path to permanent freedom.', author: 'Naval Ravikant' },
    { title: 'The Grand Ledger', text: 'Numbers do not lie, but they do reward the patient.', author: 'The Heritage' },

    // --- THE PSYCHOLOGY OF WEALTH ---
    { title: 'Refined Restraint', text: 'Wealthy people stay wealthy by living like they are broke. Broke people stay broke by living like they are wealthy.', author: 'Anonymous' },
    { title: 'The Velvet Risk', text: 'Risk comes from not knowing what you are doing.', author: 'Warren Buffett' },
    { title: 'Imperial Discipline', text: 'Wealth is what you do not see: the cars not bought, the shows not put on.', author: 'Morgan Housel' },
    { title: 'Sovereign Patience', text: 'The stock market is a device for transferring money from the impatient to the patient.', author: 'Warren Buffett' },
    { title: 'The Gilded Mind', text: 'Your income rarely exceeds your personal development.', author: 'Jim Rohn' },
    { title: 'Noble Independence', text: 'Money can buy you a house, but only freedom can buy you a home in your own mind.', author: 'The Heritage' },
    { title: 'The Heritage Standard', text: 'Never invest in anything you do not understand through and through.', author: 'Traditional Wisdom' },
    { title: 'Stately Wealth', text: 'Wealth is the ability to fully experience life on your own terms.', author: 'Henry David Thoreau' },
    { title: 'The Silk Safety', text: 'A man is not rich until he has enough to be independent of his neighbors.', author: 'Old World Proverb' },
    { title: 'Refined Capital', text: 'Capital is that part of wealth which is devoted to attaining further wealth.', author: 'Alfred Marshall' },

    // --- THE DYNASTY SERIES ---
    { title: 'The Generational Seed', text: 'The best time to plant a tree was twenty years ago. The best time to start an estate is now.', author: 'Proverb' },
    { title: 'Noble Stewardship', text: 'We are merely the stewards of our family’s future.', author: 'The Heritage' },
    { title: 'The Gilded Rule', text: 'Control everything, own nothing.', author: 'Rockefeller' },
    { title: 'Imperial Focus', text: 'Concentrate your energy on a few great ideas rather than many mediocre ones.', author: 'Traditional Wisdom' },
    { title: 'The Silk Shield', text: 'Financial freedom is the only shield against the whims of the world.', author: 'The Heritage' },
    { title: 'Sovereign Income', text: 'If you don’t find a way to make money while you sleep, you will work until you die.', author: 'Warren Buffett' },
    { title: 'The Heritage Vault', text: 'Preservation is as much an art as accumulation.', author: 'Traditional Wisdom' },
    { title: 'Noble Parsimony', text: 'Frugality is the daughter of prudence and the mother of liberty.', author: 'Traditional Wisdom' },
    { title: 'The Grand Strategy', text: 'Opportunities come to those who have the capital and the courage to act.', author: 'The Heritage' },
    { title: 'The Final Ledger', text: 'Profit is a result, not a purpose. Purpose is the foundation of a legacy.', author: 'Anonymous' },

    // --- ELITE FINANCE (70 more) ---
    { title: 'The Sovereign Sink', text: 'Don’t work for money. Make money work for you.', author: 'Robert Kiyosaki' },
    { title: 'Gilded Compounding', text: 'The first $100,000 is a struggle, the first $1,000,000 is a habit.', author: 'Investment Wisdom' },
    { title: 'Refined Leverage', text: 'Give me a lever long enough and a place to stand, and I shall move the world.', author: 'Archimedes' },
    { title: 'The Silk Anchor', text: 'Diversification is protection against ignorance.', author: 'Warren Buffett' },
    { title: 'Imperial Reserve', text: 'Always keep enough in the vault to weather the century’s storm.', author: 'The Heritage' },
    { title: 'The Heritage Orchard', text: 'Reinvest your dividends until your orchard feeds the whole city.', author: 'Traditional Wisdom' },
    { title: 'Noble Liquidity', text: 'The man with cash is king when the market panics.', author: 'Anonymous' },
    { title: 'Stately Acquisition', text: 'Buy when there is blood in the streets, even if it is your own.', author: 'Baron Rothschild' },
    { title: 'The Sovereign Mindset', text: 'Rich is a number. Wealthy is a mindset. Free is a life.', author: 'The Heritage' },
    { title: 'The Gilded Will', text: 'A person with a large bank account but no purpose is just a high-end clerk.', author: 'Traditional Wisdom' },
    { title: 'Bespoke Freedom', text: 'Your lifestyle should be the byproduct of your assets, not your debt.', author: 'The Heritage' },
    { title: 'Noble Discipline', text: 'The discipline to save is the discipline to lead.', author: 'Anonymous' },
    { title: 'The Silk Horizon', text: 'Invest for the next generation, not the next quarter.', author: 'Traditional Wisdom' },
    { title: 'Imperial Prudence', text: 'It is not how much money you make, but how much money you keep.', author: 'Robert Kiyosaki' },
    { title: 'The Heritage Path', text: 'Freedom is the ultimate luxury; money is just the tool to buy it.', author: 'The Heritage' },
    { title: 'Stately Growth', text: 'Real wealth is built slowly. Anything fast is usually a facade.', author: 'Traditional Wisdom' },
    { title: 'The Sovereign Clock', text: 'Wealth is measured in time, not in currency.', author: 'Buckminster Fuller' },
    { title: 'Refined Equity', text: 'The goal is to be wealthy, not to look wealthy.', author: 'Naval Ravikant' },
    { title: 'The Gilded Duty', text: 'Wealth is a responsibility to those who follow.', author: 'The Heritage' },
    { title: 'The Final Balance', text: 'Financial freedom is the peace of mind that comes from knowing you are in control.', author: 'Traditional Wisdom' }, 
    // --- THE CAPITAL PRESERVATION SERIES ---
    { title: 'The Gilded Rule', text: 'Rule No. 1: Never lose money. Rule No. 2: Never forget Rule No. 1.', author: 'Warren Buffett' },
    { title: 'Noble Defense', text: 'It is not what you earn, but what you keep that builds an empire.', author: 'Traditional Wisdom' },
    { title: 'The Sovereign Vault', text: 'A man in debt is only half-free.', author: 'The Heritage' },
    { title: 'Imperial Compounding', text: 'The first hundred thousand is a struggle, the rest is an inevitability.', author: 'Charlie Munger' },
    { title: 'The Silk Anchor', text: 'Patience is the greatest asset in a volatile market.', author: 'The Heritage' },
    { title: 'Refined Frugality', text: 'Luxury is a reward for success, not a method to achieve it.', author: 'Anonymous' },
    { title: 'The Heritage Trust', text: 'Wealth is a marathon, not a sprint. Pace your ambition.', author: 'Traditional Wisdom' },
    { title: 'Stately Solvency', text: 'Financial peace is not the acquisition of more, but the mastery of what you have.', author: 'The Heritage' },
    { title: 'The Sovereign Portfolio', text: 'Concentrate to create wealth; diversify to preserve it.', author: 'Investment Wisdom' },
    { title: 'Noble Prudence', text: 'Beware of little expenses; a small leak will sink a great ship.', author: 'Benjamin Franklin' },

    // --- THE PSYCHOLOGY OF ABUNDANCE ---
    { title: 'The Velvet Hand', text: 'Money is a great servant but a terrible master.', author: 'Francis Bacon' },
    { title: 'Imperial Discernment', text: 'Buy quality, and you only cry once.', author: 'Traditional Wisdom' },
    { title: 'The Gilded Mindset', text: 'Thinking is the hardest work there is, which is the probable reason why so few engage in it.', author: 'Henry Ford' },
    { title: 'Sovereign Wealth', text: 'True wealth is the ability to live life on your own terms, without apology.', author: 'The Heritage' },
    { title: 'The Heritage Lens', text: 'Invest in what the world will always need, regardless of the era.', author: 'Traditional Wisdom' },
    { title: 'Noble Restraint', text: 'Do not save what is left after spending, but spend what is left after saving.', author: 'Warren Buffett' },
    { title: 'The Silk Standard', text: 'Wealth flows from energy and ideas.', author: 'William Feather' },
    { title: 'Stately Ownership', text: 'The goal is to own the means of production, not the products.', author: 'The Heritage' },
    { title: 'The Imperial Clock', text: 'Every hour spent learning is a seed planted for a decade of freedom.', author: 'Anonymous' },
    { title: 'Refined Autonomy', text: 'Freedom is the ultimate status symbol.', author: 'The Heritage' },

    // --- THE LEGACY BUILDER ---
    { title: 'The Generational Bridge', text: 'Wealth is not for the person who has it, but for those who follow.', author: 'The Heritage' },
    { title: 'Noble Legacy', text: 'A rich man is often just a poor man with money. A wealthy man has a legacy.', author: 'Traditional Wisdom' },
    { title: 'The Gilded Duty', text: 'To whom much is given, much is expected in wisdom and stewardship.', author: 'Old World Proverb' },
    { title: 'Imperial Leverage', text: 'Leverage is the force multiplier of the intelligent mind.', author: 'The Heritage' },
    { title: 'The Silk Horizon', text: 'Look past the next decade. Invest for the next century.', author: 'Traditional Wisdom' },
    { title: 'Sovereign Influence', text: 'Capital allows you to speak the language of the world.', author: 'Anonymous' },
    { title: 'The Heritage Core', text: 'Financial literacy is the foundation of all true freedom.', author: 'The Heritage' },
    { title: 'Stately Acquisition', text: 'Never buy a thing because it is cheap; it will be dear to you in the end.', author: 'Thomas Jefferson' },
    { title: 'The Sovereign Risk', text: 'The biggest risk is not taking any risk in a changing world.', author: 'Mark Zuckerberg' },
    { title: 'The Final Ledger', text: 'Character is the only currency that stays stable in every market.', author: 'The Heritage' },

    // --- CONTINUED FINANCIAL MASTERY ---
    { title: 'The Silent Partner', text: 'Let your assets do the talking.', author: 'Traditional Wisdom' },
    { title: 'Noble Liquidity', text: 'Keep your powder dry for the opportunities that others miss.', author: 'The Heritage' },
    { title: 'The Gilded Habit', text: 'Wealth is a byproduct of character and consistency.', author: 'Anonymous' },
    { title: 'Sovereign Cashflow', text: 'Income is the heartbeat of freedom.', author: 'The Heritage' },
    { title: 'Imperial Patience', text: 'The market is a pendulum that forever swings between unsustainable optimism and unjustified pessimism.', author: 'Benjamin Graham' },
    { title: 'The Silk Safety', text: 'An emergency fund is the price of psychological freedom.', author: 'The Heritage' },
    { title: 'Refined Ambition', text: 'Work to learn, then work to own.', author: 'Traditional Wisdom' },
    { title: 'Stately Discernment', text: 'Know the difference between a luxury and a necessity for your soul.', author: 'The Heritage' },
    { title: 'The Heritage Reach', text: 'The more you give, the more you have.', author: 'Proverb' },
    { title: 'Noble Prosperity', text: 'Prosperity is a way of living and thinking, not just a way of having.', author: 'Anonymous' },
    { title: 'The Final Balance', text: 'At the end of the day, your wealth is the peace in your heart.', author: 'The Heritage' }, // --- THE ARCHITECT OF CAPITAL ---
    { title: 'The Gilded Compound', text: 'Wealth is a forest that grows from a single seed of discipline.', author: 'Traditional Wisdom' },
    { title: 'Sovereign Reserves', text: 'The person who has a reserve is never at the mercy of the desperate.', author: 'The Heritage' },
    { title: 'Noble Diversification', text: 'Do not put all your heritage in one vessel, but do not scatter it to the winds either.', author: 'Old World Proverb' },
    { title: 'Imperial Liquidity', text: 'Cash flow is the lifeblood of liberty.', author: 'Anonymous' },
    { title: 'The Silk Anchor', text: 'A stable portfolio is the only cure for a volatile mind.', author: 'The Heritage' },
    { title: 'Refined Acquisition', text: 'Buy things for their utility and beauty, not for the status they project.', author: 'Traditional Wisdom' },
    { title: 'The Heritage Ledger', text: 'Know what you own, and know why you own it.', author: 'Peter Lynch' },
    { title: 'Stately Compounding', text: 'Time is the friend of the wonderful company, the enemy of the mediocre.', author: 'Warren Buffett' },
    { title: 'The Sovereign Mindset', text: 'The goal is to be rich, not to look rich. The latter is a trap for the insecure.', author: 'The Heritage' },
    { title: 'Noble Ownership', text: 'To own the land is to own the future.', author: 'Traditional Wisdom' },

    // --- THE WEALTHY PSYCHE ---
    { title: 'The Velvet Hand', text: 'Control your capital, or it will control you.', author: 'Anonymous' },
    { title: 'Imperial Discernment', text: 'The elite do not work for money; they create systems that work for them.', author: 'The Heritage' },
    { title: 'The Gilded Will', text: 'Financial freedom is the power to live in your own house, on your own terms.', author: 'Traditional Wisdom' },
    { title: 'Sovereign Silence', text: 'True wealth is felt, not seen. It is the absence of financial anxiety.', author: 'The Heritage' },
    { title: 'The Heritage Lens', text: 'Look for value where others see only boredom.', author: 'Investment Wisdom' },
    { title: 'Noble Restraint', text: 'The ability to delay gratification is the ultimate predictor of wealth.', author: 'The Heritage' },
    { title: 'The Silk Standard', text: 'Your net worth is a reflection of your self-worth and your discipline.', author: 'Anonymous' },
    { title: 'Stately Autonomy', text: 'The man who can buy what he wants is rich, but the man who wants nothing he cannot buy is free.', author: 'Traditional Wisdom' },
    { title: 'The Imperial Clock', text: 'Wealth is the number of days you can survive without working.', author: 'Buckminster Fuller' },
    { title: 'Refined Assets', text: 'Invest in things that get more valuable while you sleep.', author: 'The Heritage' },

    // --- THE DYNASTY BUILDER ---
    { title: 'The Generational Seed', text: 'Build a bridge of assets so strong your grandchildren can walk across it.', author: 'The Heritage' },
    { title: 'Noble Stewardship', text: 'Poverty is passed down through habits. Wealth is passed down through systems.', author: 'Traditional Wisdom' },
    { title: 'The Gilded Rule', text: 'He who has the gold makes the rules, but he who has the wisdom keeps the gold.', author: 'Old World Proverb' },
    { title: 'Imperial Leverage', text: 'Use debt as a tool for expansion, never as a crutch for consumption.', author: 'The Heritage' },
    { title: 'The Silk Horizon', text: 'The richest man is the one whose children run into his arms when his hands are empty.', author: 'Anonymous' },
    { title: 'Sovereign Influence', text: 'Economic power is the foundation of all other freedoms.', author: 'The Heritage' },
    { title: 'The Heritage Core', text: 'Financial independence is the first duty of a sovereign individual.', author: 'Traditional Wisdom' },
    { title: 'Stately Growth', text: 'Slow money is for the wise. Fast money is for the foolish.', author: 'The Heritage' },
    { title: 'The Sovereign Risk', text: 'The only real risk is not having multiple streams of income.', author: 'Anonymous' },
    { title: 'The Final Ledger', text: 'Your greatest asset is your capacity to learn and adapt.', author: 'The Heritage' },

    // --- THE ELITE INVESTOR ---
    { title: 'The Silent Partner', text: 'Compounding is the secret employee that never sleeps and never asks for a raise.', author: 'Traditional Wisdom' },
    { title: 'Noble Liquidity', text: 'Opportunity is a haughty goddess who wastes no time with those who are unprepared.', author: 'The Heritage' },
    { title: 'The Gilded Habit', text: 'Save a portion of all you earn, and let those savings earn more.', author: 'The Richest Man in Babylon' },
    { title: 'Sovereign Cashflow', text: 'Wealth is not found in the size of your bank account, but in the flow of your income.', author: 'The Heritage' },
    { title: 'Imperial Patience', text: 'The market can remain irrational longer than you can remain solvent.', author: 'John Maynard Keynes' },
    { title: 'The Silk Safety', text: 'Build your roof before the rain begins.', author: 'Traditional Wisdom' },
    { title: 'Refined Ambition', text: 'Aim for a life that is rich in experiences and free from financial burdens.', author: 'The Heritage' },
    { title: 'Stately Discernment', text: 'The wise man buys when others are fearful and sells when others are greedy.', author: 'Warren Buffett' },
    { title: 'The Heritage Reach', text: 'True abundance is having enough to share and still have enough for yourself.', author: 'Anonymous' },
    { title: 'Noble Prosperity', text: 'Prosperity is the fruit of hard work and intelligent planning.', author: 'The Heritage' },
    { title: 'The Final Balance', text: 'Money is a tool for freedom, but character is the anchor of life.', author: 'Traditional Wisdom' }
    // ... ja kymmeniä muita samoilla teemoilla ...
    // ... ja 40 muuta näiden hengessä ...
  ],

  'deep-wisdom': [
    // --- THE PHILOSOPHER'S CHAMBER ---
    { title: 'The Stoic Anchor', text: 'You have power over your mind, not outside events. Realize this, and you will find strength.', author: 'Marcus Aurelius' },
    { title: 'Noble Silence', text: 'Deep rivers move in silence, shallow brooks are noisy.', author: 'Traditional Wisdom' },
    { title: 'The Lyceum Gate', text: 'Education is an ornament in prosperity and a refuge in adversity.', author: 'Aristotle' },
    { title: 'Sovereign Reason', text: 'The greatest wealth is a soul that is content with its own excellence.', author: 'The Heritage' },
    { title: 'The Attic Light', text: 'He who is not a impatient for a result is already half-way to it.', author: 'Socrates' },
    { title: 'Gilded Reflection', text: 'The soul becomes dyed with the color of its thoughts.', author: 'Marcus Aurelius' },
    { title: 'The Academy Rule', text: 'It is the mark of an educated mind to be able to entertain a thought without accepting it.', author: 'Aristotle' },
    { title: 'Stately Solitude', text: 'Whosoever is delighted in solitude is either a wild beast or a god.', author: 'Aristotle' },
    { title: 'The Heritage Ink', text: 'A room without books is like a body without a soul.', author: 'Cicero' },
    { title: 'Ancient Discernment', text: 'Truth is the daughter of time, not of authority.', author: 'Francis Bacon' },

    // --- THE ANCESTRAL LIBRARY ---
    { title: 'The Oak Parchment', text: 'He who loves reading has everything within his reach.', author: 'William Godwin' },
    { title: 'Imperial Insight', text: 'The more you know, the more you forgive.', author: 'Confucius' },
    { title: 'The Silk Scroll', text: 'To be ignorant of what occurred before you were born is to remain always a child.', author: 'Cicero' },
    { title: 'Noble Restraint', text: 'Nature gave us one tongue and two ears so we could hear twice as much as we speak.', author: 'Epictetus' },
    { title: 'The Heritage Anchor', text: 'Small is the number of them that see with their own eyes and feel with their own hearts.', author: 'Albert Einstein' },
    { title: 'Stately Eloquence', text: 'Words are but the shadows of actions.', author: 'Democritus' },
    { title: 'The Sovereign Will', text: 'We suffer more often in imagination than in reality.', author: 'Seneca' },
    { title: 'Gilded Virtue', text: 'Wealth is the slave of a wise man and the master of a fool.', author: 'Seneca' },
    { title: 'The Ancient Path', text: 'Difficulties strengthen the mind, as labor does the body.', author: 'Seneca' },
    { title: 'The Final Manuscript', text: 'Character is destiny.', author: 'Heraclitus' },

    // --- THE MASTER'S STUDY ---
    { title: 'The Velvet Focus', text: 'Be regular and orderly in your life, so that you may be violent and original in your work.', author: 'Gustave Flaubert' },
    { title: 'Imperial Patience', text: 'He that can have patience can have what he will.', author: 'Benjamin Franklin' },
    { title: 'The Heritage Vault', text: 'The only true wisdom is in knowing you know nothing.', author: 'Socrates' },
    { title: 'Noble Integrity', text: 'Dignity is not in possessing honors, but in deserving them.', author: 'Aristotle' },
    { title: 'The Silk Perspective', text: 'Everything we hear is an opinion, not a fact. Everything we see is a perspective, not the truth.', author: 'Marcus Aurelius' },
    { title: 'Sovereign Grit', text: 'The first and greatest victory is to conquer yourself.', author: 'Plato' },
    { title: 'The Gilded Lesson', text: 'It is not because things are difficult that we do not dare; it is because we do not dare that they are difficult.', author: 'Seneca' },
    { title: 'The Ancient Flame', text: 'Education is not the filling of a pail, but the lighting of a fire.', author: 'William Butler Yeats' },
    { title: 'The Stately Heart', text: 'Where your talents and the needs of the world cross, there lies your vocation.', author: 'Aristotle' },
    { title: 'The Final Wisdom', text: 'Live as if you were to die tomorrow. Learn as if you were to live forever.', author: 'Mahatma Gandhi' },

    // --- THE CLASSICAL ESTATE ---
    { title: 'The Sovereign Breath', text: 'He who is cruel to animals becomes hard also in his dealings with men.', author: 'Immanuel Kant' },
    { title: 'Noble Observation', text: 'Wonder is the beginning of wisdom.', author: 'Socrates' },
    { title: 'The Silk Thread', text: 'There is no greatness where there is not simplicity, goodness, and truth.', author: 'Leo Tolstoy' },
    { title: 'Imperial Discipline', text: 'The foundation of every state is the education of its youth.', author: 'Diogenes' },
    { title: 'The Heritage Gaze', text: 'History repeats itself, first as tragedy, second as farce.', author: 'Karl Marx' },
    { title: 'Stately Fortitude', text: 'He who has a why to live can bear almost any how.', author: 'Friedrich Nietzsche' },
    { title: 'The Gilded Hand', text: 'Science is what you know, philosophy is what you don’t know.', author: 'Bertrand Russell' },
    { title: 'Noble Discernment', text: 'Thinking is the conversation which the soul has with itself.', author: 'Plato' },
    { title: 'The Ancient Shield', text: 'A good head and a good heart are always a formidable combination.', author: 'Nelson Mandela' },
    { title: 'The Final Balance', text: 'Happiness depends upon ourselves.', author: 'Aristotle' },

    // --- CONTINUED DEPTH (60 more) ---
    { title: 'The Sovereign Mind', text: 'The mind is not a vessel to be filled but a fire to be kindled.', author: 'Plutarch' },
    { title: 'Noble Paradox', text: 'The more a man meditates upon good thoughts, the better will be his world.', author: 'Confucius' },
    { title: 'The Silk Horizon', text: 'Wisdom begins in wonder.', author: 'Socrates' },
    { title: 'Stately Resilience', text: 'Man is not worried by real problems so much as by his imagined anxieties about real problems.', author: 'Epictetus' },
    { title: 'The Heritage Path', text: 'An unexamined life is a life half lived.', author: 'The Heritage' },
    { title: 'Imperial Calm', text: 'The soul of a man is the sunlight of his life.', author: 'Anonymous' },
    { title: 'The Gilded Archive', text: 'Reading is a conversation with the finest minds of past centuries.', author: 'Descartes' },
    { title: 'Noble Solvency', text: 'Wealth is the ability to fully experience life.', author: 'Henry David Thoreau' },
    { title: 'The Ancient Gate', text: 'Knowledge is power, but character is more.', author: 'Traditional Wisdom' },
    { title: 'The Final Polished Thought', text: 'In the end, only three things matter: how much you loved, how gently you lived, and how gracefully you let go of things not meant for you.', author: 'Buddhist Wisdom' }, // --- THE TRANSCENDENTAL SERIES ---
    { title: 'The Eternal Echo', text: 'What you leave behind is not what is engraved in stone monuments, but what is woven into the lives of others.', author: 'Pericles' },
    { title: 'Sovereign Solitude', text: 'All of humanity’s problems stem from man’s inability to sit quietly in a room alone.', author: 'Blaise Pascal' },
    { title: 'The Gilded Mirror', text: 'Everything that irritates us about others can lead us to an understanding of ourselves.', author: 'Carl Jung' },
    { title: 'Imperial Silence', text: 'He who speaks, sows; he who listens, reaps.', author: 'Traditional Wisdom' },
    { title: 'The Heritage Clock', text: 'Time is a created thing. To say "I don’t have time" is to say "I don’t want to."', author: 'Lao Tzu' },
    { title: 'Noble Archetype', text: 'Knowing your own darkness is the best method for dealing with the darkness of other people.', author: 'Carl Jung' },
    { title: 'The Silk Thread', text: 'The secret of change is to focus all of your energy, not on fighting the old, but on building the new.', author: 'Socrates' },
    { title: 'Stately Vision', text: 'The only journey is the journey within.', author: 'Rainer Maria Rilke' },
    { title: 'The Ancient Balance', text: 'He who has overcome his fears will truly be free.', author: 'Aristotle' },
    { title: 'The Final Manuscript', text: 'A life lived in fear is a life half lived.', author: 'The Heritage' },

    // --- THE MASTER'S CHAMBER ---
    { title: 'Noble Discernment', text: 'The eye sees only what the mind is prepared to comprehend.', author: 'Henri Bergson' },
    { title: 'Imperial Calm', text: 'The more tranquil a man becomes, the greater is his success, his influence, his power for good.', author: 'James Allen' },
    { title: 'The Gilded Reason', text: 'To find yourself, think for yourself.', author: 'Socrates' },
    { title: 'Sovereign Presence', text: 'Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.', author: 'Buddha' },
    { title: 'The Heritage Parchment', text: 'He who is a master of himself is fit to be a master of others.', author: 'Traditional Wisdom' },
    { title: 'Stately Restraint', text: 'The best revenge is to be unlike him who performed the injury.', author: 'Marcus Aurelius' },
    { title: 'The Silk Compass', text: 'Your visions will become clear only when you can look into your own heart.', author: 'Carl Jung' },
    { title: 'Aristocratic Honor', text: 'Integrity has no need of rules.', author: 'Albert Camus' },
    { title: 'The Ancient Flame', text: 'Man is a universe within himself.', author: 'Traditional Wisdom' },
    { title: 'The Final Wisdom', text: 'The only thing we know is that we know nothing, and that is the highest flight of human reason.', author: 'Leo Tolstoy' },

    // --- THE ANCESTRAL LIBRARY ---
    { title: 'The Oak Ledger', text: 'Wisdom is the power to put our time and our fortune to the best use.', author: 'John Locke' },
    { title: 'Noble Paradox', text: 'The more light you allow within you, the brighter the world you live in will be.', author: 'Shakti Gawain' },
    { title: 'The Silk Horizon', text: 'He who looks outside, dreams; he who looks inside, awakes.', author: 'Carl Jung' },
    { title: 'Imperial Integrity', text: 'To be one, to be united, is a great thing. But to respect the right to be different is maybe even greater.', author: 'Bono' },
    { title: 'The Heritage Shield', text: 'A man is but the product of his thoughts. What he thinks, he becomes.', author: 'Mahatma Gandhi' },
    { title: 'Stately Patience', text: 'Nature never hurries, yet everything is accomplished.', author: 'Lao Tzu' },
    { title: 'The Gilded Path', text: 'The only way to make sense out of change is to plunge into it, move with it, and join the dance.', author: 'Alan Watts' },
    { title: 'Noble Fortitude', text: 'You cannot cross the sea merely by standing and staring at the water.', author: 'Rabindranath Tagore' },
    { title: 'The Ancient Gate', text: 'A wise man creates more opportunities than he finds.', author: 'Francis Bacon' },
    { title: 'The Final Balance', text: 'Simplicity, patience, compassion. These three are your greatest treasures.', author: 'Lao Tzu' },

    // --- ADDITIONAL DEEP REFLECTIONS (70 more) ---
    { title: 'The Sovereign Breath', text: 'Your calm is your superpower.', author: 'Anonymous' },
    { title: 'Noble Sincerity', text: 'The least initial deviation from the truth is multiplied later a thousandfold.', author: 'Aristotle' },
    { title: 'The Silk Anchor', text: 'Character is simply habit long continued.', author: 'Plutarch' },
    { title: 'Imperial Perspective', text: 'The universe is change; our life is what our thoughts make it.', author: 'Marcus Aurelius' },
    { title: 'The Heritage Orchard', text: 'Great results cannot be achieved without great effort.', author: 'The Heritage' },
    { title: 'Gilded Observation', text: 'To see what is in front of one’s nose needs a constant struggle.', author: 'George Orwell' },
    { title: 'Stately Silence', text: 'Silence is the sleep that nourishes wisdom.', author: 'Francis Bacon' },
    { title: 'The Ancient Rule', text: 'What you do not want done to yourself, do not do to others.', author: 'Confucius' },
    { title: 'Refined Intuition', text: 'The heart has its reasons which reason knows nothing of.', author: 'Blaise Pascal' },
    { title: 'The Sovereign Soul', text: 'To know that you do not know is the best. To pretend to know when you do not know is a disease.', author: 'Lao Tzu' },
    { title: 'The Final Polish', text: 'He who has a why to live for can bear almost any how.', author: 'Friedrich Nietzsche' },
    { title: 'The Heritage Vault', text: 'Wisdom comes by disillusionment.', author: 'George Santayana' },
    { title: 'Noble Legacy', text: 'The merit of all things lies in their difficulty.', author: 'The Heritage' },
    { title: 'Stately Grace', text: 'Beauty is truth, truth beauty.', author: 'John Keats' },
    { title: 'The Sovereign Mind', text: 'I think, therefore I am.', author: 'René Descartes' },
    { title: 'The Final Wisdom', text: 'The purpose of life is a life of purpose.', author: 'Robert Byrne' }, // --- THE TRANSCENDENTAL ARCHIVE ---
    { title: 'The Silent Architect', text: 'He who is slow to speak is quick to understand.', author: 'Traditional Wisdom' },
    { title: 'Noble Transience', text: 'Time is a river which sweeps me along, but I am the river.', author: 'Jorge Luis Borges' },
    { title: 'The Gilded Will', text: 'To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.', author: 'Ralph Waldo Emerson' },
    { title: 'Imperial Solitude', text: 'I would rather sit on a pumpkin and have it all to myself than be crowded on a velvet cushion.', author: 'Henry David Thoreau' },
    { title: 'The Heritage Gaze', text: 'What we see depends mainly on what we look for.', author: 'John Lubbock' },
    { title: 'Sovereign Insight', text: 'The soul is the perceiver and revealer of truth.', author: 'The Heritage' },
    { title: 'The Silk Labyrinth', text: 'Knowing others is intelligence; knowing yourself is true wisdom.', author: 'Lao Tzu' },
    { title: 'Stately Reflection', text: 'A life without cause is a life without effect.', author: 'Baruch Spinoza' },
    { title: 'The Ancient Anchor', text: 'Character is higher than intellect.', author: 'Ralph Waldo Emerson' },
    { title: 'The Final Manuscript', text: 'Wisdom is the reward for a lifetime of listening.', author: 'Anonymous' },

    // --- THE STOIC ESTATE SERIES ---
    { title: 'Noble Indifference', text: 'Waste no more time arguing what a good man should be. Be one.', author: 'Marcus Aurelius' },
    { title: 'The Gilded Fortitude', text: 'If it is not right, do not do it; if it is not true, do not say it.', author: 'Marcus Aurelius' },
    { title: 'Imperial Composure', text: 'The best revenge is not to be like your enemy.', author: 'Marcus Aurelius' },
    { title: 'The Silk Discipline', text: 'Objective judgment, now, at this very moment. Unselfish action, now, at this very moment.', author: 'Marcus Aurelius' },
    { title: 'Sovereign Fate', text: 'Accept the things to which fate binds you, and love the people with whom fate brings you together.', author: 'Marcus Aurelius' },
    { title: 'The Heritage Shield', text: 'Very little is needed to make a happy life; it is all within yourself.', author: 'Marcus Aurelius' },
    { title: 'Noble Endurance', text: 'The impediment to action advances action. What stands in the way becomes the way.', author: 'Marcus Aurelius' },
    { title: 'Stately Reason', text: 'Loss is nothing else but change, and change is Natures delight.', author: 'Marcus Aurelius' },
    { title: 'The Ancient Gate', text: 'Your life is what your thoughts make it.', author: 'Marcus Aurelius' },
    { title: 'The Final Polished Thought', text: 'Everything that happens happens as it should.', author: 'Marcus Aurelius' },

    // --- THE CLASSICAL MINDSET ---
    { title: 'The Sovereign Circle', text: 'The superior man is modest in his speech, but exceeds in his actions.', author: 'Confucius' },
    { title: 'Noble Integrity', text: 'The man who moves a mountain begins by carrying away small stones.', author: 'Confucius' },
    { title: 'The Silk Wisdom', text: 'By three methods we may learn wisdom: First, by reflection, which is noblest; Second, by imitation, which is easiest; and third by experience, which is the bitterest.', author: 'Confucius' },
    { title: 'Imperial Patience', text: 'It does not matter how slowly you go as long as you do not stop.', author: 'Confucius' },
    { title: 'The Heritage Balance', text: 'To see what is right and not to do it is want of courage.', author: 'Confucius' },
    { title: 'Stately Honor', text: 'To be wealthy and honored in an unjust society is a disgrace.', author: 'Confucius' },
    { title: 'The Gilded Rule', text: 'What you do not want done to yourself, do not do to others.', author: 'Confucius' },
    { title: 'Noble Discernment', text: 'The more man meditates upon good thoughts, the better will be his world and the world at large.', author: 'Confucius' },
    { title: 'The Ancient Path', text: 'Real knowledge is to know the extent of ones ignorance.', author: 'Confucius' },
    { title: 'The Final Balance', text: 'He who conquers himself is the mightiest warrior.', author: 'Lao Tzu' },

    // --- CONTINUED DEPTH (70 more) ---
    { title: 'The Sovereign Breath', text: 'When you are content to be simply yourself and don’t compare or compete, everyone will respect you.', author: 'Lao Tzu' },
    { title: 'Noble Paradox', text: 'The wise man does not lay up his own treasures. The more he gives to others, the more he has for his own.', author: 'Lao Tzu' },
    { title: 'The Silk Horizon', text: 'Great acts are made up of small deeds.', author: 'Lao Tzu' },
    { title: 'Imperial Calm', text: 'To the mind that is still, the whole universe surrenders.', author: 'Lao Tzu' },
    { title: 'The Heritage Anchor', text: 'Kindness in words creates confidence. Kindness in thinking creates profoundness. Kindness in giving creates love.', author: 'Lao Tzu' },
    { title: 'Gilded Observation', text: 'The journey of a thousand miles begins with a single step.', author: 'Lao Tzu' },
    { title: 'Stately Silence', text: 'Silence is a source of great strength.', author: 'Lao Tzu' },
    { title: 'The Ancient Rule', text: 'Manifest plainness, embrace simplicity, reduce selfishness, have few desires.', author: 'Lao Tzu' },
    { title: 'Refined Intuition', text: 'Knowing others is wisdom, knowing yourself is Enlightenment.', author: 'Lao Tzu' },
    { title: 'The Sovereign Soul', text: 'If you correct your mind, the rest of your life will fall into place.', author: 'Lao Tzu' },
    { title: 'The Final Polish', text: 'The truth is not always beautiful, nor beautiful words the truth.', author: 'Lao Tzu' },
    { title: 'The Heritage Vault', text: 'Wisdom is the daughter of experience.', author: 'Leonardo da Vinci' },
    { title: 'Noble Legacy', text: 'Simplicity is the ultimate sophistication.', author: 'Leonardo da Vinci' },
    { title: 'Stately Grace', text: 'Learning never exhausts the mind.', author: 'Leonardo da Vinci' },
    { title: 'The Sovereign Mind', text: 'Iron rusts from disuse... so does inaction spoil the intellect.', author: 'Leonardo da Vinci' },
    { title: 'The Final Wisdom', text: 'He who possesses most must be most afraid of loss.', author: 'Leonardo da Vinci' }
  ],

  'elite-productivity': [
    // --- THE ARCHITECT OF TIME ---
    { title: 'The Gilded Hour', text: 'An hour of deep focus is worth a week of busywork.', author: 'The Heritage' },
    { title: 'Sovereign Selection', text: 'The art of being wise is the art of knowing what to overlook.', author: 'William James' },
    { title: 'Noble Elimination', text: 'Elite productivity is not about doing more, but about having less to do.', author: 'Anonymous' },
    { title: 'Imperial Strategy', text: 'Strategy is the art of sacrifice. To choose one path is to kill a thousand others.', author: 'Traditional Wisdom' },
    { title: 'The Silk Calendar', text: 'If you do not schedule your day, the world will schedule it for you.', author: 'The Heritage' },
    { title: 'Refined Flow', text: 'Flow is the state where competence meets challenge with total grace.', author: 'Modern Philosophy' },
    { title: 'The Heritage Protocol', text: 'Systematize the routine, creative the exceptional.', author: 'The Heritage' },
    { title: 'Stately Momentum', text: 'A body in motion stays in motion. Start small, finish grand.', author: 'Newton’s Wisdom' },
    { title: 'The Sovereign No', text: 'Every "yes" to the unimportant is a "no" to your legacy.', author: 'Anonymous' },
    { title: 'Noble Essentialism', text: 'Less, but better.', author: 'Dieter Rams' },

    // --- THE MASTER'S EXECUTION ---
    { title: 'The War Room Focus', text: 'Starve your distractions, feed your focus.', author: 'The Heritage' },
    { title: 'Gilded Discipline', text: 'Discipline is the bridge between goals and accomplishment.', author: 'Jim Rohn' },
    { title: 'Imperial Standards', text: 'How you do anything is how you do everything.', author: 'Traditional Wisdom' },
    { title: 'The Silk Barrier', text: 'Your attention is your most guarded estate; do not let trespassers in.', author: 'The Heritage' },
    { title: 'Noble Delegation', text: 'The master does nothing, yet nothing is left undone.', author: 'Lao Tzu' },
    { title: 'Stately Leverage', text: 'Leverage is the force multiplier of the intelligent mind.', author: 'The Heritage' },
    { title: 'The Sovereign Morning', text: 'Win the morning, win the empire.', author: 'Anonymous' },
    { title: 'Refined Velocity', text: 'Speed is useful only if you are headed in the right direction.', author: 'Traditional Wisdom' },
    { title: 'The Heritage Ledger', text: 'Measure the output, not the hours.', author: 'The Heritage' },
    { title: 'Bespoke Quality', text: 'Be a yardstick of quality. Some people aren’t used to an environment where excellence is expected.', author: 'Steve Jobs' },

    // --- THE DEEP WORK ESTATE ---
    { title: 'The Quiet Sanctuary', text: 'In the silence of the study, the greatest empires are planned.', author: 'Traditional Wisdom' },
    { title: 'Noble Batching', text: 'Group your tasks like jewels in a vault; do not scatter them across the day.', author: 'The Heritage' },
    { title: 'The Gilded Buffer', text: 'Always leave room for thinking. A full calendar is a sign of a servant, not a master.', author: 'Anonymous' },
    { title: 'Sovereign Output', text: 'One masterpiece is worth ten thousand sketches.', author: 'The Heritage' },
    { title: 'Imperial Recovery', text: 'He who cannot rest cannot work at peak performance.', author: 'Traditional Wisdom' },
    { title: 'The Silk Mindset', text: 'Focus on the process, and the results will take care of themselves.', author: 'Anonymous' },
    { title: 'Stately Precision', text: 'The difference between greatness and mediocrity is often just an extra five percent of focus.', author: 'The Heritage' },
    { title: 'Noble Autonomy', text: 'The ultimate productivity is being able to do what you want, when you want.', author: 'The Heritage' },
    { title: 'The Heritage Grind', text: 'Persistence is the twin sister of excellence.', author: 'Traditional Wisdom' },
    { title: 'The Final Polish', text: 'Amateurs wait for inspiration; professionals get to work.', author: 'Chuck Close' },

    // --- ELITE PERFORMANCE (70 more) ---
    { title: 'The Sovereign Aim', text: 'Be a sniper, not a machine gunner. One shot, one result.', author: 'The Heritage' },
    { title: 'Noble Persistence', text: 'Energy and persistence conquer all things.', author: 'Benjamin Franklin' },
    { title: 'The Silk Routine', text: 'The secret of your future is hidden in your daily routine.', author: 'Anonymous' },
    { title: 'Gilded Grit', text: 'Success is the sum of small efforts, repeated day in and day out.', author: 'Robert Collier' },
    { title: 'Imperial Focus', text: 'The successful warrior is the average man, with laser-like focus.', author: 'Bruce Lee' },
    { title: 'The Heritage Anchor', text: 'Do not mistake motion for progress.', author: 'Alfred A. Montapert' },
    { title: 'Stately Effort', text: 'Whatever is worth doing at all, is worth doing well.', author: 'Lord Chesterfield' },
    { title: 'Noble Clarity', text: 'Clarity of vision creates ease of execution.', author: 'The Heritage' },
    { title: 'Refined Urgency', text: 'The time for action is now. It’s never too late to do something.', author: 'Antoine de Saint-Exupéry' },
    { title: 'The Sovereign Will', text: 'He who has a firm will molds the world to himself.', author: 'Goethe' },
    { title: 'Bespoke Efficiency', text: 'Efficiency is doing things right; effectiveness is doing the right things.', author: 'Peter Drucker' },
    { title: 'Imperial Rest', text: 'Take a rest; a field that has rested gives a bountiful crop.', author: 'Ovid' },
    { title: 'The Silk Path', text: 'Small steps in the right direction can turn into a giant leap.', author: 'Anonymous' },
    { title: 'Noble Foresight', text: 'Plan your work and work your plan.', author: 'Napoleon Hill' },
    { title: 'The Gilded Task', text: 'Eat a live frog first thing in the morning and nothing worse will happen to you the rest of the day.', author: 'Mark Twain' },
    { title: 'Stately Command', text: 'Command your day or it will command you.', author: 'The Heritage' },
    { title: 'The Sovereign Pulse', text: 'Time is the coin of your life. It is the only coin you have, and only you can determine how it will be spent.', author: 'Carl Sandburg' },
    { title: 'Refined Discipline', text: 'Self-discipline is the master key to riches.', author: 'Napoleon Hill' },
    { title: 'The Heritage Rule', text: 'First things first, second things never.', author: 'The Heritage' },
    { title: 'Noble Vision', text: 'The best way to predict the future is to create it.', author: 'Peter Drucker' },
    { title: 'The Final Balance', text: 'A productive life is a balanced life.', author: 'The Heritage' }, 
    // --- THE MASTER OF MOMENTUM ---
    { title: 'The Gilded Engine', text: 'Consistency is the last refuge of the unimaginative, but the first rule of the elite.', author: 'The Heritage' },
    { title: 'Sovereign Selection', text: 'To do two things at once is to do neither.', author: 'Publilius Syrus' },
    { title: 'Noble Friction', text: 'Resistance is the compass. If it is difficult, it is usually the way.', author: 'The Heritage' },
    { title: 'Imperial Silence', text: 'Talk is cheap; execution is the only currency that buys respect.', author: 'Traditional Wisdom' },
    { title: 'The Silk Threshold', text: 'Your success is found in your daily routine.', author: 'Anonymous' },
    { title: 'Refined Focus', text: 'Elegance is refusal. Refuse the trivial to master the essential.', author: 'Coco Chanel' },
    { title: 'The Heritage Blueprint', text: 'Design your life so that you do not need to escape from it.', author: 'Modern Wisdom' },
    { title: 'Stately Speed', text: 'Be quick, but don’t hurry.', author: 'John Wooden' },
    { title: 'The Sovereign Will', text: 'The individual who says it is not possible should not interrupt the one doing it.', author: 'Proverb' },
    { title: 'Noble Outcome', text: 'The result is the only judge that matters.', author: 'The Heritage' },

    // --- THE ARCHITECTURE OF ACTION ---
    { title: 'The Gilded Habit', text: 'We are what we repeatedly do. Excellence is a habit, not a choice.', author: 'Aristotle' },
    { title: 'Sovereign Systems', text: 'Amateurs have goals. Professionals have systems.', author: 'The Heritage' },
    { title: 'Noble Restraint', text: 'Focus means saying no to the hundred other good ideas that there are.', author: 'Steve Jobs' },
    { title: 'Imperial Discipline', text: 'The only competition is the person you were yesterday.', author: 'Traditional Wisdom' },
    { title: 'The Silk Calendar', text: 'If it’s not in the calendar, it doesn’t exist.', author: 'The Heritage' },
    { title: 'Refined Urgency', text: 'Do it now. Sometimes "later" becomes "never".', author: 'Anonymous' },
    { title: 'The Heritage Pulse', text: 'Energy is more valuable than time. Manage your state, not just your clock.', author: 'The Heritage' },
    { title: 'Stately Precision', text: 'Accuracy is the twin of speed in the house of excellence.', author: 'Traditional Wisdom' },
    { title: 'The Sovereign Hour', text: 'Your morning is the rudder of your day.', author: 'Anonymous' },
    { title: 'Noble Persistence', text: 'The world belongs to the persistent.', author: 'The Heritage' },

    // --- THE DEEP WORK SANCTUARY ---
    { title: 'The Velvet Gate', text: 'Distraction is the thief of a legacy.', author: 'Traditional Wisdom' },
    { title: 'Imperial Depth', text: 'The ability to stay focused is the new IQ.', author: 'The Heritage' },
    { title: 'The Gilded Workspace', text: 'Environment is the invisible hand that shapes your output.', author: 'Anonymous' },
    { title: 'Sovereign Creation', text: 'Write like a king, edit like a critic.', author: 'The Heritage' },
    { title: 'Noble Solitude', text: 'Great things are done in the quiet of the night or the stillness of the dawn.', author: 'Traditional Wisdom' },
    { title: 'The Silk Strategy', text: 'Never mistake motion for progress.', author: 'The Heritage' },
    { title: 'Stately Momentum', text: 'Action is the foundational key to all success.', author: 'Pablo Picasso' },
    { title: 'Refined Impact', text: 'Work on things that matter, not things that just keep you busy.', author: 'Anonymous' },
    { title: 'The Heritage Standard', text: 'Good enough is the enemy of the elite.', author: 'The Heritage' },
    { title: 'The Final Polish', text: 'Finish what you start, or do not start at all.', author: 'Traditional Wisdom' },

    // --- ELITE PERFORMANCE CONTINUED ---
    { title: 'Sovereign Clarity', text: 'A clear mind is a sharp sword.', author: 'The Heritage' },
    { title: 'Noble Discipline', text: 'Self-discipline is the only path to true freedom.', author: 'Anonymous' },
    { title: 'The Silk Anchor', text: 'Patience and persistence are the tools of the master.', author: 'The Heritage' },
    { title: 'Gilded Grit', text: 'The elite do not quit when they are tired; they quit when they are done.', author: 'Traditional Wisdom' },
    { title: 'Imperial Focus', text: 'The successful man is the one who can lay a firm foundation with the bricks others throw at him.', author: 'David Brinkley' },
    { title: 'The Heritage Will', text: 'Success is not final, failure is not fatal: it is the courage to continue that counts.', author: 'Winston Churchill' },
    { title: 'Stately Effort', text: 'Excellence is never an accident.', author: 'Aristotle' },
    { title: 'Noble Vision', text: 'You see what you focus on. Focus on the summit.', author: 'The Heritage' },
    { title: 'Refined Wisdom', text: 'Wisdom is knowing what to do; skill is knowing how to do it; virtue is doing it.', author: 'David Starr Jordan' },
    { title: 'The Sovereign Rule', text: 'Do the hard things first. The rest will follow.', author: 'Anonymous' },
    { title: 'Bespoke Efficiency', text: 'Simplify, then delegate, then automate.', author: 'The Heritage' },
    { title: 'Imperial Rest', text: 'Sleep is the best meditation for the high-performer.', author: 'Dalai Lama' },
    { title: 'The Silk Routine', text: 'Habit is the servant of the great.', author: 'Traditional Wisdom' },
    { title: 'Noble Foresight', text: 'Think three steps ahead while others are looking at their feet.', author: 'The Heritage' },
    { title: 'The Gilded Time', text: 'Your time is your life. Spend it like a billionaire.', author: 'Anonymous' },
    { title: 'Stately Composure', text: 'Stay calm in the storm of work.', author: 'The Heritage' },
    { title: 'The Sovereign Aim', text: 'Target the legacy, not the paycheck.', author: 'Traditional Wisdom' },
    { title: 'Refined Discipline', text: 'The pain of discipline is far less than the pain of regret.', author: 'Anonymous' },
    { title: 'The Heritage Rule', text: 'Master the basics, then master the exceptions.', author: 'The Heritage' },
    { title: 'The Final Victory', text: 'Win the day, and the years will take care of themselves.', author: 'Traditional Wisdom' }
  ],

  'stoic-resilience': [
    // --- THE INNER CITADEL SERIES ---
    { title: 'The Silent Bastion', text: 'The mind that is wise is a fortress that no army can conquer.', author: 'Traditional Wisdom' },
    { title: 'Sovereign Composure', text: 'If you are pained by any external thing, it is not this thing that disturbs you, but your own judgment about it.', author: 'Marcus Aurelius' },
    { title: 'Noble Indifference', text: 'Amor Fati: Love your fate, for it is the only path you have.', author: 'Stoic Maxim' },
    { title: 'The Gilded Anchor', text: 'Be like the cliff against which the waves continually break, but which stands firm and tames the fury of the water around it.', author: 'Marcus Aurelius' },
    { title: 'Imperial Perspective', text: 'Choose not to be harmed—and you won’t feel harmed. Don’t feel harmed—and you haven’t been.', author: 'Marcus Aurelius' },
    { title: 'The Silk Shield', text: 'Tranquility is nothing else than the good ordering of the mind.', author: 'The Heritage' },
    { title: 'Noble Restraint', text: 'The best revenge is to be unlike him who performed the injury.', author: 'Marcus Aurelius' },
    { title: 'Stately Endurance', text: 'It’s a rough road that leads to the heights of greatness.', author: 'Seneca' },
    { title: 'The Sovereign Will', text: 'No man is free who is not master of himself.', author: 'Epictetus' },
    { title: 'The Final Fortitude', text: 'Fate leads the willing and drags the reluctant.', author: 'Seneca' },

    // --- THE PHILOSOPHER'S ARMOR ---
    { title: 'The Velvet Wall', text: 'You have power over your mind—not outside events. Realize this, and you will find strength.', author: 'Marcus Aurelius' },
    { title: 'Gilded Grit', text: 'Difficulties strengthen the mind, as labor does the body.', author: 'Seneca' },
    { title: 'Imperial Calm', text: 'The more tranquil a man becomes, the greater is his success, his influence, his power for good.', author: 'James Allen' },
    { title: 'The Silk Discipline', text: 'Stoicism is the endurance of the soul against the buffetings of fate.', author: 'The Heritage' },
    { title: 'Noble Discernment', text: 'We suffer more often in imagination than in reality.', author: 'Seneca' },
    { title: 'Stately Focus', text: 'Waste no more time arguing what a good man should be. Be one.', author: 'Marcus Aurelius' },
    { title: 'The Sovereign Breath', text: 'Remind yourself that what you possess is not yours, but lent by the universe.', author: 'Epictetus' },
    { title: 'Refined Resilience', text: 'Fire is the test of gold; adversity, of strong men.', author: 'Seneca' },
    { title: 'The Heritage Path', text: 'He who is brave is free.', author: 'Seneca' },
    { title: 'The Final Balance', text: 'Luck is what happens when preparation meets opportunity.', author: 'Seneca' },

    // --- THE MASTERY OF FATE ---
    { title: 'The Gilded Lesson', text: 'Every difficulty in life presents us with an opportunity to turn inward and to invoke our own inner resources.', author: 'Epictetus' },
    { title: 'Sovereign Sincerity', text: 'Wealth is the slave of a wise man. The master of a fool.', author: 'Seneca' },
    { title: 'Imperial Silence', text: 'If you want to be beautiful, make yourself beautiful through your choices.', author: 'Epictetus' },
    { title: 'Noble Endurance', text: 'A man who is a master of himself can end a sorrow as easily as he can invent a pleasure.', author: 'Oscar Wilde' },
    { title: 'The Silk Horizon', text: 'The soul becomes dyed with the color of its thoughts.', author: 'Marcus Aurelius' },
    { title: 'Stately Wisdom', text: 'It is not the man who has too little, but the man who craves more, that is poor.', author: 'Seneca' },
    { title: 'The Sovereign Rule', text: 'He is a wise man who does not grieve for the things which he has not, but rejoices for those which he has.', author: 'Epictetus' },
    { title: 'Refined Virtue', text: 'The goal of life is living in agreement with nature.', author: 'Zeno' },
    { title: 'The Heritage Guard', text: 'Let all your efforts be directed to something, let it keep that end in view.', author: 'Seneca' },
    { title: 'The Final Polish', text: 'He who lives in harmony with himself lives in harmony with the universe.', author: 'Marcus Aurelius' },

    // --- CONTINUED STOIC VIRTUE (70 more) ---
    { title: 'The Sovereign Mind', text: 'Think of yourself as dead. You have lived your life. Now, take what’s left and live it properly.', author: 'Marcus Aurelius' },
    { title: 'Noble Patience', text: 'Patience is a bitter plant, but its fruit is sweet.', author: 'Aristotle' },
    { title: 'The Silk Anchor', text: 'The greatest remedy for anger is delay.', author: 'Seneca' },
    { title: 'Gilded Resilience', text: 'What does not kill me makes me stronger.', author: 'Nietzsche' },
    { title: 'Imperial Discipline', text: 'First say to yourself what you would be; and then do what you have to do.', author: 'Epictetus' },
    { title: 'The Heritage Shield', text: 'To be calm is the highest form of self-assertion.', author: 'The Heritage' },
    { title: 'Stately Character', text: 'The unexamined life is not worth living.', author: 'Socrates' },
    { title: 'Noble Solitude', text: 'The world is a comedy to those that think; a tragedy to those that feel.', author: 'Horace Walpole' },
    { title: 'The Silk Standard', text: 'Associate with people who are likely to improve you.', author: 'Seneca' },
    { title: 'Sovereign Strength', text: 'It is the power of the mind to be unconquerable.', author: 'Seneca' },
    { title: 'Refined Courage', text: 'Courage is not having the strength to go on; it is going on when you don’t have the strength.', author: 'Theodore Roosevelt' },
    { title: 'Imperial Restraint', text: 'Freedom is the only worthy goal in life. It is won by disregarding things that lie beyond our control.', author: 'Epictetus' },
    { title: 'The Gilded Rule', text: 'Do not seek for things to happen the way you want them to; rather, wish that what happens happen the way it happens.', author: 'Epictetus' },
    { title: 'Stately Composure', text: 'Keep a tight rein on your emotions; they are the horses of your chariot.', author: 'The Heritage' },
    { title: 'Noble Wisdom', text: 'While we wait for life, life passes.', author: 'Seneca' },
    { title: 'The Sovereign Aim', text: 'The mind is its own place, and in itself can make a heaven of hell.', author: 'John Milton' },
    { title: 'Refined Fortitude', text: 'To endure is the first thing that a child ought to learn.', author: 'Rousseau' },
    { title: 'The Heritage Core', text: 'Small is the number of them that see with their own eyes and feel with their own hearts.', author: 'Albert Einstein' },
    { title: 'Imperial Peace', text: 'The best fruit of self-sufficiency is freedom.', author: 'Epicurus' },
    { title: 'The Final Crown', text: 'Character is destiny.', author: 'Heraclitus' }, 
    // --- THE CITADEL OF THE MIND ---
    { title: 'The Marble Shield', text: 'A mind that remains calm in the face of chaos is the ultimate status symbol.', author: 'The Heritage' },
    { title: 'Noble Friction', text: 'The gem cannot be polished without friction, nor man perfected without trials.', author: 'Chinese Proverb' },
    { title: 'Sovereign Silence', text: 'Your silence in the face of an insult is a scream of superiority.', author: 'The Heritage' },
    { title: 'The Gilded Will', text: 'He who is mastered by his own passions is a slave, no matter his bank account.', author: 'Traditional Wisdom' },
    { title: 'Imperial Composure', text: 'The soul is a storm-tossed sea; stoicism is the anchor that holds.', author: 'The Heritage' },
    { title: 'The Silk Fortitude', text: 'Be the master of your moods, or they will be the masters of your destiny.', author: 'Anonymous' },
    { title: 'Noble Endurance', text: 'To suffer is a part of life; to suffer with grace is a part of nobility.', author: 'The Heritage' },
    { title: 'Stately Resilience', text: 'A strong man does not need to shout. His presence is enough to silence the storm.', author: 'Old World Proverb' },
    { title: 'The Sovereign Breath', text: 'Between stimulus and response there is a space. In that space is our power to choose our response.', author: 'Viktor Frankl' },
    { title: 'The Final Bastion', text: 'The sun shines even on the ruins of an empire. Carry your own light.', author: 'The Heritage' },

    // --- THE ARCHITECTURE OF STRENGTH ---
    { title: 'Gilded Grit', text: 'Difficulties are just things to overcome, after all.', author: 'Ernest Shackleton' },
    { title: 'Imperial Discipline', text: 'It is a royal thing to be ill spoken of for doing good.', author: 'Antisthenes' },
    { title: 'The Silk Anchor', text: 'Do not seek to have events happen as you want them to, but instead want them to happen as they do.', author: 'Epictetus' },
    { title: 'Noble Perspective', text: 'If someone is able to show me that what I think or do is not right, I will happily change.', author: 'Marcus Aurelius' },
    { title: 'Sovereign Sincerity', text: 'The only wealth which you will keep forever is the wealth you have given away.', author: 'Marcus Aurelius' },
    { title: 'The Heritage Shield', text: 'Our life is what our thoughts make it.', author: 'Marcus Aurelius' },
    { title: 'Stately Focus', text: 'You take things too seriously. And even then, not seriously enough.', author: 'Traditional Wisdom' },
    { title: 'Refined Resilience', text: 'The more we value things outside our control, the less control we have.', author: 'Epictetus' },
    { title: 'The Ancient Gate', text: 'He who fears death will never do anything worth of a man who is alive.', author: 'Seneca' },
    { title: 'The Final Polish', text: 'Life is long if you know how to use it.', author: 'Seneca' },

    // --- THE SOVEREIGN VIRTUES ---
    { title: 'Noble Discernment', text: 'The elite do not react to the noise; they respond to the signal.', author: 'The Heritage' },
    { title: 'Imperial Calm', text: 'Taming the mind is like taming a wild stallion; it takes time, but the reward is total freedom.', author: 'Anonymous' },
    { title: 'The Gilded Habit', text: 'Small disciplines repeated with consistency lead to unshakeable results.', author: 'Traditional Wisdom' },
    { title: 'Sovereign Restraint', text: 'Anger is a brief madness. Control it, or it will control you.', author: 'Horace' },
    { title: 'The Heritage Anchor', text: 'To be equal to every fortune is the mark of a sovereign soul.', author: 'The Heritage' },
    { title: 'Stately Ambition', text: 'The goal is not to be better than the other man, but to be better than your previous self.', author: 'Traditional Wisdom' },
    { title: 'Noble Integrity', text: 'Honesty is the fastest way to prevent a mistake from becoming a failure.', author: 'James Altucher' },
    { title: 'The Silk Standard', text: 'True power is the ability to walk away from any situation that does not align with your values.', author: 'The Heritage' },
    { title: 'Imperial Duty', text: 'Do every act of your life as if it were your last.', author: 'Marcus Aurelius' },
    { title: 'The Final Balance', text: 'Mielenrauha on suurin rikkaus.', author: 'The Heritage' },

    // --- CONTINUED MASTERY (70 more) ---
    { title: 'The Sovereign Will', text: 'He who conquers himself is the mightiest warrior.', author: 'Confucius' },
    { title: 'Noble Patience', text: 'Patience is the companion of wisdom.', author: 'Saint Augustine' },
    { title: 'The Silk Path', text: 'Persistence is the sister of excellence.', author: 'The Heritage' },
    { title: 'Gilded Fortitude', text: 'Strength is the capacity to break a Hershey bar into four pieces with your bare hands - and then eat just one of the pieces.', author: 'Judith Viorst' },
    { title: 'Imperial Focus', text: 'One should not focus on the results, but on the actions that lead to them.', author: 'Traditional Wisdom' },
    { title: 'The Heritage Rule', text: 'The unexamined life is a life of servitude.', author: 'The Heritage' },
    { title: 'Stately Effort', text: 'The price of excellence is discipline. The cost of mediocrity is disappointment.', author: 'Anonymous' },
    { title: 'Noble Clarity', text: 'Clarity is the byproduct of a quiet mind.', author: 'The Heritage' },
    { title: 'Refined Wisdom', text: 'Knowledge is knowing what to say. Wisdom is knowing when to say it.', author: 'Traditional Wisdom' },
    { title: 'The Sovereign Pulse', text: 'Your heart is a drum; let it beat the rhythm of courage.', author: 'Anonymous' },
    { title: 'Imperial Rest', text: 'Rest is not the absence of work, but the presence of peace.', author: 'The Heritage' },
    { title: 'The Silk Routine', text: 'Habit is either the best of servants or the worst of masters.', author: 'Nathaniel Emmons' },
    { title: 'Noble Foresight', text: 'Expect the worst, hope for the best, and take what comes.', author: 'Traditional Wisdom' },
    { title: 'The Gilded Step', text: 'A journey of a thousand miles begins with a single step taken in silence.', author: 'The Heritage' },
    { title: 'Stately Command', text: 'Rule your mind or it will rule you.', author: 'Horace' },
    { title: 'The Sovereign Aim', text: 'Aim for the stars, but keep your feet on the marble.', author: 'The Heritage' },
    { title: 'Refined Discipline', text: 'Discipline is the soul of an army. It makes small numbers formidable.', author: 'George Washington' },
    { title: 'The Heritage Rule', text: 'Success is a byproduct of being the best version of yourself.', author: 'Anonymous' },
    { title: 'Noble Vision', text: 'The only thing worse than being blind is having sight but no vision.', author: 'Helen Keller' },
    { title: 'The Final Victory', text: 'The final victory is over oneself.', author: 'The Heritage' }
  ],

  'modern-success': [
    { title: 'Skyline Vision', text: 'Success is built in private, celebrated in public.', author: 'Anonymous' },
    { title: 'The Boardroom', text: 'Modern titans move in silence, not in spectacle.', author: 'Business Wisdom' },
    { title: 'Digital Empire', text: "Leverage technology; don't let it leverage you.", author: 'Tech Philosophy' },
    { title: 'Scale Strategy', text: 'Think global, execute local, scale exponential.', author: 'Startup Wisdom' },
    { title: 'Innovation Edge', text: 'Disrupt yourself before someone else does.', author: 'Silicon Valley' },
    
    // STRATEGIA JA SKAALAUTUVUUS
    { title: 'Network Effect', text: 'Your network is your net worth in a hyper-connected world.', author: 'Modern Proverb' },
    { title: 'The Pivot', text: 'Stubborn on vision, flexible on details.', author: 'Jeff Bezos' },
    { title: 'Asset Light', text: 'Own the interface, not the infrastructure.', author: 'Platform Strategy' },
    { title: 'Velocity First', text: 'Speed is the ultimate weapon in a changing market.', author: 'Tech Leader' },
    { title: 'Data Mindset', text: 'In God we trust; all others must bring data.', author: 'W. Edwards Deming' },
    
    // HENKILÖKOHTAINEN TEHOKKUUS
    { title: 'Deep Work', text: 'The ability to focus is the new IQ.', author: 'Cal Newport' },
    { title: 'Founder Mentality', text: 'Work like someone is trying to take it all away from you.', author: 'Mark Cuban' },
    { title: 'Mental Models', text: 'Clear thinking is the foundation of high leverage.', author: 'Naval Ravikant' },
    { title: 'Consistency', text: 'Amateurs wait for inspiration; professionals get to work.', author: 'Creative Truth' },
    { title: 'The Grind', text: 'Don’t stop when you’re tired; stop when you’re done.', author: 'Performance Coach' },

    // TEKNOLOGIA JA TULEVAISUUS
    { title: 'AI Era', text: 'AI won’t replace you, but a person using AI will.', author: 'Industry Insight' },
    { title: 'Iteration', text: 'If you aren’t embarrassed by your first version, you launched too late.', author: 'Reid Hoffman' },
    { title: 'Future Proof', text: 'The best way to predict the future is to create it.', author: 'Peter Drucker' },
    { title: 'Code & Content', text: 'Code and media are the permissionless leverage of the new age.', author: 'Naval Ravikant' },
    { title: 'Optimization', text: 'What gets measured gets managed.', author: 'Peter Drucker' },

    // JOHTAJUUS JA BRÄNDI
    { title: 'Quiet Authority', text: 'A lion doesn’t have to roar to prove it’s a lion.', author: 'Executive Coach' },
    { title: 'Personal Brand', text: 'Your brand is what people say about you when you’re not in the room.', author: 'Jeff Bezos' },
    { title: 'Radical Candor', text: 'Honesty is a fast-track to excellence.', author: 'Leadership Principles' },
    { title: 'Culture First', text: 'Culture eats strategy for breakfast.', author: 'Management Wisdom' },
    { title: 'Long Game', text: 'Play long-term games with long-term people.', author: 'Silicon Valley' },

    // MENESTYS JA MINDSET
    { title: 'Risk Management', text: 'Fortune favors the bold, but survives on the prepared.', author: 'Venture Capitalist' },
    { title: 'Outcome Driven', text: 'Don’t confuse motion with progress.', author: 'Business Logic' },
    { title: 'The 1%', text: 'To get what the 1% has, you must do what the 99% won’t.', author: 'High Achiever' },
    { title: 'Market Fit', text: 'Build something people actually want.', author: 'Y Combinator' },
    { title: 'Legacy Building', text: 'Success is a journey of making your vision inevitable.', author: 'Modern Wisdom' }, // --- STRATEGIA JA KILPAILUETU ---
    { title: 'Asymmetric Upside', text: 'Seek bets where the downside is small and the upside is infinite.', author: 'Risk Theory' },
    { title: 'Zero to One', text: 'Doing what we already know how to do takes the world from 1 to n. Adding something new takes us from 0 to 1.', author: 'Peter Thiel' },
    { title: 'Market Authority', text: 'Don’t compete for price; compete for relevance.', author: 'Brand Strategy' },
    { title: 'First Principles', text: 'Break the problem down to its fundamental truths and build up from there.', author: 'Elon Musk' },
    { title: 'The Moat', text: 'Build a business so defensible that time becomes your greatest ally.', author: 'Warren Buffett' },
    { title: 'Blue Ocean', text: 'Stop competing in overcrowded spaces; create a market of your own.', author: 'Strategic Move' },
    { title: 'Hypergrowth', text: 'In the early stages, do things that don’t scale to ensure you eventually can.', author: 'Paul Graham' },
    { title: 'Signal vs Noise', text: 'Focus on the signal. Don’t waste time on the noise that doesn’t move the needle.', author: 'Productivity Peak' },
    { title: 'Efficiency Trap', text: 'There is nothing so useless as doing efficiently that which should not be done at all.', author: 'Peter Drucker' },
    { title: 'Opportunity Cost', text: 'Saying yes to one thing is saying no to a thousand others.', author: 'Essentialism' },

    // --- DIGITAALINEN VALTA JA TEKNOLOGIA ---
    { title: 'Algorithm Era', text: 'If you don’t understand the algorithm, you are the product.', author: 'Digital Native' },
    { title: 'Software Supremacy', text: 'Software is eating the world; AI is teaching it how to think.', author: 'Marc Andreessen' },
    { title: 'Permissionless', text: 'You don’t need an editor, a boss, or a gatekeeper to start building.', author: 'Naval Ravikant' },
    { title: 'Cyber Real Estate', text: 'Attention is the new oil; your platform is the refinery.', author: 'Media Theory' },
    { title: 'Cloud Logic', text: 'Build globally, deploy instantly, update constantly.', author: 'DevOps Wisdom' },
    { title: 'Automation Edge', text: 'Automate the routine, humanize the exceptional.', author: 'Tech Ops' },
    { title: 'Infinite Leverage', text: 'The internet allows you to scale your personality infinitely.', author: 'Content Strategy' },
    { title: 'Data Sovereignty', text: 'The one who owns the data owns the future of the market.', author: 'Information Age' },

    // --- MODERNIN JOHTAJAN MINDSET ---
    { title: 'Anti-Fragile', text: 'Some things benefit from shocks; they thrive and grow when exposed to volatility.', author: 'Nassim Taleb' },
    { title: 'Extreme Ownership', text: 'There are no bad teams, only bad leaders.', author: 'Jocko Willink' },
    { title: 'Stoic Executive', text: 'Be tolerant with others and strict with yourself.', author: 'Marcus Aurelius' },
    { title: 'High Stakes', text: 'If the risk is calculated and the goal is worthy, the jump is mandatory.', author: 'Venture Mindset' },
    { title: 'Ego Is The Enemy', text: 'Work for the mission, not for the applause.', author: 'Ryan Holiday' },
    { title: 'The 10x Rule', text: 'Set goals ten times bigger than you think you can achieve.', author: 'Grant Cardone' },
    { title: 'Compound Interest', text: 'Small habits daily lead to monumental results yearly.', author: 'Growth Logic' },
    { title: 'Resilience', text: 'Success is walking from failure to failure with no loss of enthusiasm.', author: 'Winston Churchill' },

    // --- RAHA JA VAPAUS ---
    { title: 'Passive Flow', text: 'If you don’t find a way to make money while you sleep, you will work until you die.', author: 'Warren Buffett' },
    { title: 'Asset Allocation', text: 'Don’t work for money; make your money work for you.', author: 'Financial Zen' },
    { title: 'Wealth vs Status', text: 'Wealth is what you don’t see; status is what you try to show.', author: 'Morgan Housel' },
    { title: 'Economic Moat', text: 'Your unique skill set is the only thing inflation can’t touch.', author: 'Modern Economics' },
    { title: 'The Exit', text: 'Build a business that is ready to be sold, even if you never intend to sell it.', author: 'Founder Wisdom' },

    // --- URBAANI MENESTYS JA ELÄMÄNTAPA ---
    { title: 'Metropolitan Hustle', text: 'The city never sleeps, and neither does the opportunity.', author: 'Urban Legend' },
    { title: 'High Performance', text: 'Your body is the engine; your mind is the pilot. Fuel both accordingly.', author: 'Biohacking' },
    { title: 'Social Capital', text: 'It’s not what you know, but who knows what you can do.', author: 'Networking Pro' },
    { title: 'Peak State', text: 'Clarity of mind is the ultimate luxury in a distracted world.', author: 'Performance Zen' },
    { title: 'Global Nomad', text: 'Work from anywhere, impact everywhere.', author: 'Digital Nomad' },
    { title: 'Aesthetic Power', text: 'Design is not just how it looks; it is how it works.', author: 'Steve Jobs' },

    // --- TULEVAISUUDEN VISIOINTI ---
    { title: 'Moonshot', text: 'Aim for the moon. Even if you miss, you’ll land among the stars.', author: 'Space X Mentality' },
    { title: 'The New Gold', text: 'Trust is the most expensive currency in the digital age.', author: 'Blockchain Wisdom' },
    { title: 'Obsession', text: 'Be so good they can’t ignore you.', author: 'Steve Martin' },
    { title: 'Adaptability', text: 'The illiterate of the 21st century will not be those who cannot read, but those who cannot unlearn.', author: 'Alvin Toffler' },
    { title: 'Execution Gap', text: 'Ideas are easy. Execution is everything.', author: 'John Doerr' },
    { title: 'Infinite Game', text: 'The goal is not to win, but to keep playing.', author: 'Simon Sinek' },
    { title: 'Legacy Code', text: 'Write your story in a way that others want to read it.', author: 'Final Word' },
    { title: 'The Arena', text: 'It is not the critic who counts, but the one actually in the arena.', author: 'Theodore Roosevelt' },
    { title: 'Feedback Loop', text: 'Your unhappiest customers are your greatest source of learning.', author: 'Bill Gates' },
    { title: 'Paradigm Shift', text: 'When the world changes, the old rules become the new chains.', author: 'Future Thinker' },
    { title: 'Unicorn Path', text: 'Don’t wait for the opportunity; create the environment for it to happen.', author: 'Tech Legend' },
    { title: 'Stealth Mode', text: 'Work hard in silence, let your success be the noise.', author: 'Anonymous' },
    { title: 'Final Frontier', text: 'The only limit to our realization of tomorrow is our doubts of today.', author: 'F.D.R.' }
  ],

  'spiritual-growth': [
    { title: 'The Inner Sanctum', text: 'Spirituality is the luxury of a quiet mind.', author: 'Ancient Wisdom' },
    { title: 'Sacred Morning', text: 'Begin each day as if entering a cathedral.', author: 'Mindfulness Practice' },
    { title: 'Ethereal Wisdom', text: 'Growth happens in stillness, not in noise.', author: 'Buddhist Philosophy' },
    { title: 'Soul Compass', text: 'Your intuition is your inner GPS.', author: 'Spiritual Wisdom' },
    { title: 'Divine Alignment', text: 'When you align with purpose, the universe conspires.', author: 'Paulo Coelho' },

    // LÄSNÄOLO JA TIETOISUUS
    { title: 'Eternal Now', text: 'The present moment is the only place where life actually exists.', author: 'Thich Nhat Hanh' },
    { title: 'The Watcher', text: 'You are not your thoughts; you are the one hearing them.', author: 'Eckhart Tolle' },
    { title: 'Breath Work', text: 'The breath is the bridge which connects life to consciousness.', author: 'Zen Proverb' },
    { title: 'Pure Awareness', text: 'Be the mountain; let the clouds of emotion pass by.', author: 'Meditation Master' },
    { title: 'Sacred Space', text: 'Your heart is a temple; keep the doors open but the altar clean.', author: 'Mystic Path' },

    // SISÄINEN VOIMA JA LUOTTAMUS
    { title: 'The Root', text: 'Deep roots fear no wind.', author: 'Old Proverb' },
    { title: 'Surrender', text: 'Let go of the shore and let the river carry you.', author: 'Tao Te Ching' },
    { title: 'Inner Mirror', text: 'The world is a mirror; what you see in others is a reflection of you.', author: 'Rumi' },
    { title: 'Unfolding', text: 'You are not a drop in the ocean; you are the entire ocean in a drop.', author: 'Rumi' },
    { title: 'Quiet Power', text: 'Silence is not empty; it is full of answers.', author: 'Spiritual Insight' },

    // MUUTOS JA KASVU
    { title: 'Metamorphosis', text: 'What the caterpillar calls the end, the master calls a butterfly.', author: 'Richard Bach' },
    { title: 'The Path', text: 'There is no way to peace; peace is the way.', author: 'Mahatma Gandhi' },
    { title: 'Shadow Work', text: 'One does not become enlightened by imagining figures of light, but by making the darkness conscious.', author: 'Carl Jung' },
    { title: 'Spiritual Alchemy', text: 'Turn your wounds into wisdom and your pain into power.', author: 'Healing Arts' },
    { title: 'Flow State', text: 'Be like water, making its way through cracks.', author: 'Bruce Lee' },

    // YHTEYS JA UNIVERSUMI
    { title: 'Cosmic Unity', text: 'We are stardust brought to life, then empowered by the universe to figure itself out.', author: 'Neil deGrasse Tyson' },
    { title: 'Vibration', text: 'If you want to find the secrets of the universe, think in terms of energy, frequency and vibration.', author: 'Nikola Tesla' },
    { title: 'Divine Timing', text: 'Nature does not hurry, yet everything is accomplished.', author: 'Lao Tzu' },
    { title: 'Heart Resonance', text: 'The soul always knows what to do to heal itself. The challenge is to silence the mind.', author: 'Caroline Myss' },
    { title: 'Oneness', text: 'Separation is an illusion; we are all the same light shining through different windows.', author: 'Universal Truth' },

    // HARJOITUS JA KURINALAISUUS
    { title: 'Mindful Living', text: 'Drink your tea slowly and reverently, as if it is the axis on which the world earth revolves.', author: 'Thich Nhat Hanh' },
    { title: 'Inner Harvest', text: 'What you plant in your mind, you reap in your life.', author: 'Mental Gardener' },
    { title: 'Grateful Soul', text: 'Gratitude is the highest form of prayer.', author: 'Spiritual Practice' },
    { title: 'Detachment', text: 'It is not the state of having nothing, but the state of nothing having you.', author: 'Sufi Wisdom' },
    { title: 'Holy Silence', text: 'Talk only if it improves upon the silence.', author: 'Mahatma Gandhi' },

    // VALAISTUMINEN JA VIISAUS
    { title: 'The Awakening', text: 'The eye through which I see God is the same eye through which God sees me.', author: 'Meister Eckhart' },
    { title: 'True Wealth', text: 'He who knows he has enough is rich.', author: 'Lao Tzu' },
    { title: 'Soul Purpose', text: 'Your vocation is where your greatest joy meets the world’s greatest need.', author: 'Frederick Buechner' },
    { title: 'Third Eye', text: 'Wisdom begins in wonder.', author: 'Socrates' },
    { title: 'Infinite Being', text: 'We are not human beings having a spiritual experience. We are spiritual beings having a human experience.', author: 'Pierre Teilhard de Chardin' },

    // RAUHA JA TASAPAINO
    { title: 'Equanimity', text: 'Peace is the result of retraining your mind to process life as it is, rather than as you think it should be.', author: 'Wayne Dyer' },
    { title: 'The Anchor', text: 'In the midst of movement and chaos, keep stillness inside of you.', author: 'Deepak Chopra' },
    { title: 'Light Bearer', text: 'Thousands of candles can be lighted from a single candle, and the life of the candle will not be shortened.', author: 'The Buddha' },
    { title: 'Ego Death', text: 'The smaller the ego, the larger the life.', author: 'Spiritual Guide' },
    { title: 'Zen Mind', text: 'When walking, walk. When eating, eat.', author: 'Zen Proverb' },

    // SYVEMPI YMMÄRRYS
    { title: 'The Bridge', text: 'Love is the bridge between you and everything.', author: 'Rumi' },
    { title: 'Sacred Breath', text: 'Each breath is a new chance to begin again.', author: 'Mindfulness' },
    { title: 'Unconditioned', text: 'Your task is not to seek for love, but merely to seek and find all the barriers within yourself that you have built against it.', author: 'Rumi' },
    { title: 'Grace', text: 'Grace is the light that finds us when we are in the dark.', author: 'Healing Wisdom' },
    { title: 'Eternal Flame', text: 'The soul is the same in all living creatures, although the body of each is different.', author: 'Hippocrates' }, 
    // --- IRTIPÄÄSTÄMINEN JA VIRTAUS ---
    { title: 'The Open Hand', text: 'You can only receive as much as you are willing to let go.', author: 'Zen Teaching' },
    { title: 'Non-Resistance', text: 'Resistance is the cause of all suffering; acceptance is the cure.', author: 'Spiritual Law' },
    { title: 'The River', text: 'You do not need to push the river; it flows by itself.', author: 'Barry Stevens' },
    { title: 'Weightless Soul', text: 'Forgiveness is the key that unlocks the heavy chains of the past.', author: 'Healing Wisdom' },
    { title: 'Empty Vessel', text: 'To be full of wisdom, one must first be empty of self.', author: 'Ancient Proverb' },
    { title: 'Non-Attachment', text: 'Everything you own owns a piece of you. Be free.', author: 'Ascetic Wisdom' },
    { title: 'Gentle Power', text: 'Nothing is softer or more flexible than water, yet nothing can resist it.', author: 'Lao Tzu' },

    // --- SISÄINEN VALO JA VARJO ---
    { title: 'Luminous Mind', text: 'Don’t look for the light; become the source of it.', author: 'Mystic Truth' },
    { title: 'Gold in the Dark', text: 'The cave you fear to enter holds the treasure you seek.', author: 'Joseph Campbell' },
    { title: 'Internal Sun', text: 'Your heart knows the way. Run in that direction.', author: 'Rumi' },
    { title: 'Radiance', text: 'The soul becomes dyed with the color of its thoughts.', author: 'Marcus Aurelius' },
    { title: 'Silent Witness', text: 'Observe the storm, but do not become the wind.', author: 'Mindfulness' },
    { title: 'Alchemy of Pain', text: 'The wound is the place where the Light enters you.', author: 'Rumi' },
    { title: 'The Great Mirror', text: 'Clean the lens of your soul so you can see the beauty in everything.', author: 'Sufi Master' },

    // --- UNIVERSAALI YHTEYS ---
    { title: 'Interbeing', text: 'We are here to awaken from our illusion of separateness.', author: 'Thich Nhat Hanh' },
    { title: 'Cosmic Breath', text: 'The universe breathes through you; you are never alone.', author: 'Spiritual Insight' },
    { title: 'Sacred Weave', text: 'Every action ripples through the tapestry of existence.', author: 'Universal Law' },
    { title: 'Stardust Mind', text: 'The atoms of your body were forged in the hearts of dying stars.', author: 'Science & Spirit' },
    { title: 'One Heart', text: 'There is only one of us here.', author: 'Non-Duality' },
    { title: 'The Echo', text: 'What you give to the world is what you give to yourself.', author: 'Karmic Wisdom' },

    // --- TIETOISUUDEN HARJOITTAMINEN ---
    { title: 'The Observer', text: 'Awareness is the power that is concealed within the present moment.', author: 'Eckhart Tolle' },
    { title: 'Pure Presence', text: 'In the garden of the soul, only the now is in bloom.', author: 'Spiritual Guide' },
    { title: 'The Anchor', text: 'Let your breath be the anchor in the ocean of life.', author: 'Meditation' },
    { title: 'Mindful Step', text: 'Walk as if you are kissing the Earth with your feet.', author: 'Thich Nhat Hanh' },
    { title: 'The Quiet Room', text: 'All of humanity’s problems stem from man’s inability to sit quietly in a room alone.', author: 'Blaise Pascal' },
    { title: 'Noble Silence', text: 'Silence is the language of God; all else is poor translation.', author: 'Rumi' },

    // --- KORKEAMPI VIISAUS ---
    { title: 'Beyond Words', text: 'The Tao that can be told is not the eternal Tao.', author: 'Lao Tzu' },
    { title: 'The Seer', text: 'It is only with the heart that one can see rightly.', author: 'Antoine de Saint-Exupéry' },
    { title: 'Intuitive Grace', text: 'Trust the vibes you get; energy doesn’t lie.', author: 'Modern Mystic' },
    { title: 'Soul Growth', text: 'The soul is here for experience, not for perfection.', author: 'Life Philosophy' },
    { title: 'True North', text: 'Follow your bliss and the universe will open doors where there were only walls.', author: 'Joseph Campbell' },
    { title: 'Higher Self', text: 'You are a vast sky; everything else is just the weather.', author: 'Pema Chödrön' },

    // --- RAUHA JA KIITOLLISUUS ---
    { title: 'Inner Sanctuary', text: 'Peace is a job from the inside out.', author: 'Anonymous' },
    { title: 'Abundance Mind', text: 'When you realize nothing is lacking, the whole world belongs to you.', author: 'Lao Tzu' },
    { title: 'Heart’s Rest', text: 'Your heart is the size of an ocean. Go find yourself in its hidden depths.', author: 'Rumi' },
    { title: 'Divine Flow', text: 'Surrender is the intersection of faith and action.', author: 'Spiritual Path' },
    { title: 'Living Grace', text: 'Let the beauty of what you love be what you do.', author: 'Rumi' },
    { title: 'The Still Point', text: 'At the center of your being you have the answer.', author: 'Lao Tzu' },

    // --- MUUTOS JA HERÄÄMINEN ---
    { title: 'New Vision', text: 'The real voyage of discovery consists not in seeking new landscapes, but in having new eyes.', author: 'Marcel Proust' },
    { title: 'Soul Fire', text: 'Set your life on fire. Seek those who fan your flames.', author: 'Rumi' },
    { title: 'The Great Shift', text: 'Enlightenment is not a destination; it is a way of traveling.', author: 'Spiritual Guide' },
    { title: 'Ego Release', text: 'When I let go of what I am, I become what I might be.', author: 'Lao Tzu' },
    { title: 'Awakened Heart', text: 'Love is the only reality and it is not just a sentiment. It is the ultimate truth.', author: 'Rabindranath Tagore' },
    { title: 'The Call', text: 'What you are seeking is seeking you.', author: 'Rumi' },
    { title: 'Infinite Journey', text: 'The soul has no age and the spirit has no limits.', author: 'Ethereal Truth' },
    { title: 'Temple Within', text: 'Stop acting so small. You are the universe in ecstatic motion.', author: 'Rumi' },
    { title: 'Final Peace', text: 'Everything is exactly as it should be. Relax into the mystery.', author: 'Zen Master' },
    { title: 'Sacred Union', text: 'The lover and the beloved are one.', author: 'Mystic Wisdom' },
    { title: 'Everlasting Light', text: 'Death is not extinguishing the light; it is only putting out the lamp because the dawn has come.', author: 'Tagore' },
    { title: 'Homecoming', text: 'Spirituality is the journey of returning to your true self.', author: 'Universal Truth' }
],

  'relationship-mastery': [
    { title: 'The Social Salon', text: 'Quality relationships are built on boundaries, not compromise.', author: 'Relationship Wisdom' },
    { title: 'Diplomatic Grace', text: 'Listen more than you speak; observe more than you react.', author: 'Dale Carnegie' },
    { title: 'The Inner Circle', text: 'Surround yourself with those who elevate, not entertain.', author: 'Jim Rohn' },
    { title: 'Network Effect', text: 'Your network is your net worth.', author: 'Porter Gale' },
    { title: 'Trust Currency', text: 'Reputation takes years to build, seconds to destroy.', author: 'Warren Buffett' },
    // LISÄÄ TÄHÄN 95-495 quotea lisää...
  ],

  'self-discipline': [
    { title: 'The Iron Path', text: 'Discipline is freedom.', author: 'Jocko Willink' },
    { title: 'Daily Victory', text: 'Win the morning, win the day.', author: 'Tim Ferriss' },
    { title: 'Consistent Excellence', text: 'We are what we repeatedly do. Excellence is not an act, but a habit.', author: 'Aristotle' },
    { title: 'No Excuses', text: 'Discipline equals freedom.', author: 'Jocko Willink' },
    { title: 'The Grind', text: 'Motivation gets you started, discipline keeps you going.', author: 'Jim Rohn' },
    // LISÄÄ TÄHÄN 95-495 quotea lisää...
  ],

  'inner-peace': [
    { title: 'Tranquil Estate', text: 'Peace is not the absence of chaos, but the presence of clarity.', author: 'Zen Wisdom' },
    { title: 'Meditation Manor', text: 'In silence, you will find your greatest answers.', author: 'Buddhist Philosophy' },
    { title: 'Serenity Suite', text: 'Calm mind brings inner strength and confidence.', author: 'Dalai Lama' },
    { title: 'Still Waters', text: 'A calm sea never made a skilled sailor.', author: 'Franklin D. Roosevelt' },
    { title: 'Zen Garden', text: 'You cannot pour from an empty cup.', author: 'Self-Care Wisdom' },
    // LISÄÄ TÄHÄN 95-495 quotea lisää...
  ],

  'high-performance': [
    { title: 'Peak State', text: 'Excellence is not a skill, it is an attitude.', author: 'Ralph Marston' },
    { title: 'The Champion', text: 'Champions are made when no one is watching.', author: 'Sports Philosophy' },
    { title: 'Performance Protocol', text: 'Train like a beast, live like a champion.', author: 'Athletic Wisdom' },
    { title: 'Elite Mindset', text: 'The only person you should compete with is who you were yesterday.', author: 'Anonymous' },
    { title: 'Maximum Output', text: 'Your limitation is only your imagination.', author: 'Performance Psychology' },
    // LISÄÄ TÄHÄN 95-495 quotea lisää...
  ],

  'creative-vision': [
    { title: 'The Atelier', text: 'Creativity is intelligence having fun.', author: 'Albert Einstein' },
    { title: 'Visionary Canvas', text: 'Every artist was first an amateur.', author: 'Ralph Waldo Emerson' },
    { title: 'Muse Chamber', text: 'Creativity takes courage.', author: 'Henri Matisse' },
    { title: 'Innovation Studio', text: 'The best way to predict the future is to create it.', author: 'Peter Drucker' },
    { title: 'Artistic Soul', text: 'Art is not what you see, but what you make others see.', author: 'Edgar Degas' },
    // LISÄÄ TÄHÄN 95-495 quotea lisää...
  ],

  'social-influence': [
    { title: 'The Gala', text: 'Influence is earned through trust, not transactions.', author: 'Leadership Wisdom' },
    { title: 'Charisma Code', text: 'People will forget what you said, but never how you made them feel.', author: 'Maya Angelou' },
    { title: 'Elite Network', text: 'Your vibe attracts your tribe.', author: 'Modern Wisdom' },
    { title: 'Persuasion Art', text: 'The key to influence is understanding human nature.', author: 'Robert Cialdini' },
    { title: 'Social Capital', text: 'Relationships are the currency of life.', author: 'Networking Philosophy' },
    // LISÄÄ TÄHÄN 95-495 quotea lisää...
  ],

  'entrepreneurship': [
    { title: 'Startup Empire', text: 'The best time to plant a tree was 20 years ago. The second best time is now.', author: 'Chinese Proverb' },
    { title: 'Venture Vision', text: 'Ideas are worthless without execution.', author: 'Startup Wisdom' },
    { title: 'Business Builder', text: 'Fail fast, learn faster.', author: 'Silicon Valley' },
    { title: 'Risk & Reward', text: 'The biggest risk is not taking any risk.', author: 'Mark Zuckerberg' },
    { title: 'Scale Master', text: "Build something people want, don't build what you want to build.", author: 'Y Combinator' },
    // LISÄÄ TÄHÄN 95-495 quotea lisää...
  ],

  'confidence-grace': [
    { title: 'Poised Presence', text: 'Confidence is silent, insecurities are loud.', author: 'Anonymous' },
    { title: 'Elegant Power', text: 'Grace under pressure.', author: 'Ernest Hemingway' },
    { title: 'Self Assurance', text: 'Know your worth, then add tax.', author: 'Modern Wisdom' },
    { title: 'Noble Bearing', text: 'Walk like you own the place, but treat everyone with respect.', author: 'Leadership Philosophy' },
    { title: 'Quiet Strength', text: 'True confidence needs no validation.', author: 'Self-Worth Wisdom' },
    // LISÄÄ TÄHÄN 95-495 quotea lisää...
  ],
};

/**
 * ═══════════════════════════════════════════════════════════
 * FUNKTIOT - ÄLÄ KOSKE NÄIHIN (paitsi jos tiedät mitä teet)
 * ═══════════════════════════════════════════════════════════
 */

/**
 * Sekoittaa quotet satunnaisesti (Fisher-Yates shuffle)
 */
export function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Generoi satunnaisia quoteja kategoriasta
 * @param category - Kategorian nimi
 * @param count - Montako quotea halutaan (oletus 100)
 * @param shuffle - Sekoitetaanko quotet (oletus true)
 */
export function generateQuotes(
  category: QuoteCategory,
  count: number = 100,
  shuffle: boolean = true
): GeneratedQuote[] {
  const templates = QUOTE_TEMPLATES[category] || QUOTE_TEMPLATES['luxury-mindset'];
  const quotes: GeneratedQuote[] = [];
  
  // Jos halutaan enemmän quoteja kuin on templaatteja, toista ne
  const iterations = Math.ceil(count / templates.length);
  
  for (let i = 0; i < iterations; i++) {
    const templatesToUse = shuffle ? shuffleArray(templates) : templates;
    
    templatesToUse.forEach((template, index) => {
      if (quotes.length < count) {
        quotes.push({
          id: `${category}-${i}-${index}`,
          title: template.title,
          description: template.text,
          category: category,
        });
      }
    });
  }
  
  return shuffle ? shuffleArray(quotes) : quotes;
}

/**
 * Hakee satunnaisen quoten kategoriasta
 */
export function getRandomQuote(category: QuoteCategory): GeneratedQuote | null {
  const templates = QUOTE_TEMPLATES[category];
  if (!templates || templates.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * templates.length);
  const template = templates[randomIndex];
  
  return {
    id: `${category}-random-${Date.now()}`,
    title: template.title,
    description: template.text,
    category: category,
  };
}

/**
 * Palauttaa kategoriassa olevien quotejen määrän
 */
export function getQuoteCount(category: QuoteCategory): number {
  return QUOTE_TEMPLATES[category]?.length || 0;
}

/**
 * Palauttaa kaikki kategoriat ja niiden quote-määrät
 */
export function getAllCategoriesWithCounts(): Record<QuoteCategory, number> {
  const counts: Partial<Record<QuoteCategory, number>> = {};
  
  Object.keys(QUOTE_TEMPLATES).forEach((cat) => {
    const category = cat as QuoteCategory;
    counts[category] = QUOTE_TEMPLATES[category].length;
  });
  
  return counts as Record<QuoteCategory, number>;
}
