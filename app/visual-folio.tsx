import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  FlatList,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { setBackdrop } from '../constants/BackdropStore';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const GRID_GAP = 10;
const CARD_SIZE = (width - 16 * 2 - GRID_GAP * 2) / 3; // 3 per row

const THEMES = [
  // Luxury Collection
  { id: 'estate-manor', title: 'Estate Manor', tags: ['luxury', 'interior'], img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80' },
  { id: 'spa-sanctuary', title: 'Spa Sanctuary', tags: ['luxury', 'wellness'], img: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80' },
  { id: 'golden-towers', title: 'Golden Towers', tags: ['luxury', 'wealth'], img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80' },
  { id: 'grand-library', title: 'Grand Library', tags: ['luxury', 'wisdom'], img: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=80' },
  { id: 'modern-penthouse', title: 'Modern Penthouse', tags: ['luxury', 'modern'], img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80' },
  { id: 'mountain-lodge', title: 'Mountain Lodge', tags: ['luxury', 'nature'], img: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=800&q=80' },
  { id: 'skyline-suite', title: 'Skyline Suite', tags: ['luxury', 'urban'], img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80' },
  { id: 'zen-garden', title: 'Zen Garden', tags: ['luxury', 'calm'], img: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=800&q=80' },
  { id: 'romantic-villa', title: 'Romantic Villa', tags: ['luxury', 'elegant'], img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80' },
  { id: 'yacht-deck', title: 'Yacht Deck', tags: ['luxury', 'ocean'], img: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=800&q=80' },
  { id: 'alpine-view', title: 'Alpine View', tags: ['luxury', 'mountain'], img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80' },
  { id: 'motorsport', title: 'Motorsport', tags: ['luxury', 'performance'], img: 'https://images.unsplash.com/photo-1563461660947-507ef49e9c47?auto=format&fit=crop&w=800&q=80' },
  { id: 'art-gallery', title: 'Art Gallery', tags: ['luxury', 'creative'], img: 'https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&w=800&q=80' },
  { id: 'gala-evening', title: 'Gala Evening', tags: ['luxury', 'social'], img: 'https://images.unsplash.com/photo-1528702748617-c64d49f918af?auto=format&fit=crop&w=800&q=80' },
  { id: 'boardroom', title: 'Boardroom', tags: ['luxury', 'business'], img: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80' },
  { id: 'fashion-atelier', title: 'Fashion Atelier', tags: ['luxury', 'style'], img: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=800&q=80' },
  
  // Original themes
  { id: 'estate', title: 'Estate Dawn', tags: ['calm', 'green'], img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80' },
  { id: 'harbor', title: 'Harbor Mist', tags: ['blue', 'sea'], img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
  { id: 'atelier', title: 'Stone Atelier', tags: ['neutral', 'stone'], img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80' },
  { id: 'library', title: 'Library Quiet', tags: ['warm', 'wood'], img: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=80' },
  { id: 'nocturne', title: 'Nocturne', tags: ['dark', 'midnight'], img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80' },
  { id: 'pasture', title: 'Pasture Light', tags: ['pastoral', 'calm'], img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80&sat=-50' },
  { id: 'cliff', title: 'Cliffside', tags: ['dramatic', 'grey'], img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80&sharp=50' },
  { id: 'canopy', title: 'Canopy', tags: ['green', 'forest'], img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80&sat=-20' },
  { id: 'horizon', title: 'Horizon', tags: ['blue', 'minimal'], img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80&sat=-30' },
];

const CHIPS = ['all', 'luxury', 'calm', 'blue', 'green', 'warm', 'neutral', 'dark'];

export default function VisualFolio() {
  const [selectedId, setSelectedId] = useState(THEMES[0].id);
  const [query, setQuery] = useState('');
  const [chip, setChip] = useState('all');
  const router = useRouter();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return THEMES.filter((t) => {
      const matchesText = !q || t.title.toLowerCase().includes(q) || t.tags.some((tag) => tag.includes(q));
      const matchesChip = chip === 'all' || t.tags.includes(chip);
      return matchesText && matchesChip;
    });
  }, [query, chip]);

  const renderItem = ({ item }: { item: (typeof THEMES)[number] }) => {
    const active = item.id === selectedId;
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => {
          setSelectedId(item.id);
          setBackdrop(item.img);
        }}
        style={[styles.card, active && styles.cardActive]}
      >
        <Image source={{ uri: item.img }} style={styles.thumb} />
        <View style={styles.cardFooter}>
          <Text numberOfLines={1} style={styles.cardTitle}>{item.title}</Text>
          {active && <Ionicons name="checkmark-circle" size={20} color="#000000" />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>THE VISUAL FOLIO</Text>
        <Text style={styles.subtitle}>Pick a backdrop for Reels</Text>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#888888" />
        <TextInput
          placeholder="Search backdrops..."
          placeholderTextColor="#8A8A8A"
          value={query}
          onChangeText={setQuery}
          style={styles.searchInput}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipRow}>
        {CHIPS.map((c) => {
          const active = chip === c;
          return (
            <TouchableOpacity key={c} onPress={() => setChip(c)} style={[styles.chip, active && styles.chipActive]}>
              <Text style={[styles.chipText, active && styles.chipTextActive]}>{c}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={3}
        columnWrapperStyle={{ gap: GRID_GAP, marginBottom: GRID_GAP }}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.applyButton}
        activeOpacity={0.9}
        onPress={() => {
          const chosen = THEMES.find((t) => t.id === selectedId);
          if (chosen) setBackdrop(chosen.img);
          router.back();
        }}
      >
        <Text style={styles.applyText}>Return to Reels</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.headingBold,
    color: '#000000',
    letterSpacing: 2,
    fontSize: 20,
  },
  subtitle: {
    marginTop: 6,
    fontFamily: Fonts.body,
    color: '#888888',
    fontSize: 14,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 12,
    borderRadius: 12,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    height: 50,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontFamily: Fonts.body,
    fontSize: 15,
    color: '#000000',
  },
  chipRow: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    gap: 10,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    marginRight: 8,
  },
  chipActive: {
    backgroundColor: '#000000',
  },
  chipText: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: '#666666',
    textTransform: 'capitalize',
  },
  chipTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 100,
  },
  card: {
    width: CARD_SIZE, // Depends on Logic above
    height: CARD_SIZE + 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 8,
    // Modern Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardActive: {
    borderWidth: 2,
    borderColor: '#000000',
  },
  thumb: {
    width: '100%',
    height: CARD_SIZE,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  cardTitle: {
    fontFamily: Fonts.headingBold,
    fontSize: 12,
    color: '#000000',
  },
  applyButton: {
    marginHorizontal: 40,
    marginBottom: 40,
    backgroundColor: '#000000',
    borderRadius: 30,
    paddingVertical: 18,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  applyText: {
    fontFamily: Fonts.headingBold,
    color: '#FFFFFF',
    letterSpacing: 1,
    fontSize: 14,
  },
});
