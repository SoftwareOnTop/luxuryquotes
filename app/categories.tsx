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
const GRID_GAP = 12;
const CARD_SIZE = (width - 16 * 2 - GRID_GAP) / 2; // 2 per row

const CATEGORIES = [
  { id: 'heritage', title: 'Heritage', tags: ['legacy', 'classic'], img: 'https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?auto=format&fit=crop&w=800&q=80' },
  { id: 'atelier', title: 'Atelier', tags: ['craft', 'stone'], img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80' },
  { id: 'harbor', title: 'Harbor', tags: ['calm', 'blue'], img: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80' },
  { id: 'canopy', title: 'Canopy', tags: ['green', 'forest'], img: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80&sat=-20' },
  { id: 'vault', title: 'Vault', tags: ['dark', 'metal'], img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80&sharp=50' },
  { id: 'nocturne', title: 'Nocturne', tags: ['midnight', 'minimal'], img: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80&sat=-30' },
];

const CHIPS = ['all', 'legacy', 'green', 'blue', 'dark', 'minimal', 'craft'];

export default function CategoriesScreen() {
  const [selectedId, setSelectedId] = useState(CATEGORIES[0].id);
  const [query, setQuery] = useState('');
  const [chip, setChip] = useState('all');
  const router = useRouter();

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return CATEGORIES.filter((c) => {
      const matchesText = !q || c.title.toLowerCase().includes(q) || c.tags.some((t) => t.includes(q));
      const matchesChip = chip === 'all' || c.tags.includes(chip);
      return matchesText && matchesChip;
    });
  }, [query, chip]);

  const renderItem = ({ item }: { item: (typeof CATEGORIES)[number] }) => {
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
          {active && <Ionicons name="checkmark-circle" size={16} color={Colors.gold} />}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>THE CATEGORIES</Text>
        <Text style={styles.subtitle}>Curated sets of luxury moods</Text>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={16} color={Colors.champagneGold} />
        <TextInput
          placeholder="Search categories..."
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
        numColumns={2}
        columnWrapperStyle={{ gap: GRID_GAP, marginBottom: GRID_GAP }}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.applyButton}
        activeOpacity={0.9}
        onPress={() => {
          const chosen = CATEGORIES.find((c) => c.id === selectedId);
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
    backgroundColor: Colors.cream,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 12,
    paddingHorizontal: 16,
  },
  title: {
    fontFamily: Fonts.headingBold,
    color: Colors.text.primary,
    letterSpacing: 2,
    fontSize: 18,
  },
  subtitle: {
    marginTop: 6,
    fontFamily: Fonts.body,
    color: '#5F5F5F',
    fontSize: 13,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: Colors.champagneGold,
    backgroundColor: '#F9F7F2',
    paddingHorizontal: 10,
    height: 40,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: Fonts.body,
    fontSize: 13,
    color: Colors.text.primary,
  },
  chipRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#D8D2C5',
    backgroundColor: '#F1EDE2',
    marginRight: 8,
  },
  chipActive: {
    borderColor: Colors.gold,
    backgroundColor: '#FFFDF7',
  },
  chipText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: '#6B6455',
    textTransform: 'capitalize',
  },
  chipTextActive: {
    color: Colors.text.primary,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE + 30,
    backgroundColor: Colors.offWhite,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E0DACF',
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  cardActive: {
    borderColor: Colors.gold,
  },
  thumb: {
    width: '100%',
    height: CARD_SIZE,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  cardTitle: {
    fontFamily: Fonts.headingBold,
    fontSize: 12,
    color: Colors.text.primary,
  },
  applyButton: {
    marginHorizontal: 16,
    marginBottom: 24,
    backgroundColor: Colors.britishRacingGreen,
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  applyText: {
    fontFamily: Fonts.headingBold,
    color: '#FFFFFF',
    letterSpacing: 1,
    fontSize: 13,
  },
});
