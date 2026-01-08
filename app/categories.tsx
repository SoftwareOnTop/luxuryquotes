import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { useRouter } from 'expo-router';
import { setQuoteCategory, QuoteCategory, CATEGORY_META } from '../constants/QuoteStore';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');
const GRID_GAP = 12;
const CARD_SIZE = (width - 16 * 2 - GRID_GAP * 3) / 4; // 4 per row

type FilterType = 'all' | 'popular' | 'trending';

export default function CategoriesScreen() {
  const [selectedId, setSelectedId] = useState<QuoteCategory>(CATEGORY_META[0].id);
  const [filter, setFilter] = useState<FilterType>('all');
  const [search, setSearch] = useState('');
  const router = useRouter();

  const filteredCategories = useMemo(() => {
    let result = CATEGORY_META;

    // Apply search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(cat => 
        cat.title.toLowerCase().includes(q) || 
        cat.tags.some(tag => tag.toLowerCase().includes(q))
      );
    }

    // Apply filter
    if (filter !== 'all') {
      result = result.filter(cat => cat.tags.includes(filter));
    }

    return result;
  }, [search, filter]);

  const handleSelect = (id: QuoteCategory) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedId(id);
    setQuoteCategory(id);
  };

const renderItem = ({ item }: { item: typeof CATEGORY_META[number] }) => {
    const active = item.id === selectedId;
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => handleSelect(item.id)}
        style={[styles.card, active && styles.cardActive]}
      >
        <View style={styles.iconCircle}>
          <Ionicons name={item.icon as any} size={24} color={active ? '#000000' : '#888888'} />
        </View>
        <Text numberOfLines={2} style={[styles.cardTitle, active && styles.cardTitleActive]}>
          {item.title}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>THE THEMES</Text>
        <Text style={styles.subtitle}>Select your quote collection</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={16} color="#8A8A8A" style={styles.searchIcon} />
        <TextInput
          placeholder="Search themes..."
          placeholderTextColor="#A0A0A0"
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={18} color="#A0A0A0" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filter Pills */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        contentContainerStyle={styles.filterRow}
      >
        {(['all', 'popular', 'trending'] as FilterType[]).map((f) => (
          <TouchableOpacity
            key={f}
            onPress={() => {
              Haptics.selectionAsync();
              setFilter(f);
            }}
            style={[styles.filterPill, filter === f && styles.filterPillActive]}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>
              {f === 'all' ? 'All Themes' : f === 'popular' ? 'Most Popular' : 'Trending'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Grid */}
      <FlatList
        data={filteredCategories}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={4}
        columnWrapperStyle={styles.gridRow}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Apply Button */}
      <TouchableOpacity
        style={styles.applyButton}
        activeOpacity={0.9}
        onPress={() => {
          Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          router.back();
        }}
      >
        <Text style={styles.applyText}>Apply & Return</Text>
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
    backgroundColor: '#FFFFFF',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 20,
    paddingHorizontal: 16,
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontFamily: Fonts.body,
    fontSize: 15,
    color: '#000000',
  },
  filterRow: {
    paddingHorizontal: 24,
    paddingBottom: 20,
    gap: 10,
  },
  filterPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
  },
  filterPillActive: {
    backgroundColor: '#000000',
  },
  filterText: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: '#666666',
    letterSpacing: 0.5,
  },
  filterTextActive: {
    color: '#FFFFFF',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 120,
  },
  gridRow: {
    gap: GRID_GAP,
    marginBottom: GRID_GAP,
  },
  card: {
    width: CARD_SIZE,
    height: CARD_SIZE + 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    // Modern Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardActive: {
    backgroundColor: '#F8F8F8',
    borderColor: '#000',
    borderWidth: 1.5,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: '#333333',
    textAlign: 'center',
    lineHeight: 14,
  },
  cardTitleActive: {
    fontFamily: Fonts.headingBold,
    color: '#000000',
  },
  applyButton: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    backgroundColor: '#000000',
    borderRadius: 30, // Totally rounded
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
