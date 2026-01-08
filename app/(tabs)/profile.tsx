import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';
import OakLeafStreak from '../../components/OakLeafStreak';
import PatronageModal from '../../components/PatronageModal';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 60) / 2;

export default function ProfileScreen() {
  const [activeTab, setActiveTab] = useState<'collection' | 'journal'>('collection');
  const [showPatronage, setShowPatronage] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        
        {/* Header Section */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back-outline" size={22} color={Colors.britishRacingGreen} />
            </TouchableOpacity>
            <View style={styles.headerTexts}>
              <Text style={styles.headerTitle}>The Personal Archive</Text>
              <Text style={styles.subHeader}>Collected Wisdom</Text>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Ionicons name="create-outline" size={24} color={Colors.britishRacingGreen} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.streakContainer}>
            <OakLeafStreak days={12} />
          </View>
        </View>

        {/* Patronage Trigger */}
        <TouchableOpacity style={styles.patronageButton} onPress={() => setShowPatronage(true)}>
          <Text style={styles.patronageButtonText}>Become a Patron</Text>
        </TouchableOpacity>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'collection' && styles.activeTab]}
            onPress={() => setActiveTab('collection')}
          >
            <Text style={[styles.tabText, activeTab === 'collection' && styles.activeTabText]}>
              The Collection
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'journal' && styles.activeTab]}
            onPress={() => setActiveTab('journal')}
          >
            <Text style={[styles.tabText, activeTab === 'journal' && styles.activeTabText]}>
              Journal
            </Text>
          </TouchableOpacity>
        </View>

        {/* The Curated Gallery - Liked Quotes */}
        <View style={styles.section}>
          <View style={styles.grid}>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <View key={item} style={styles.gridItem}>
                <View style={styles.frame}>
                  <View style={styles.placeholderImage}>
                    <Ionicons name="image-outline" size={32} color={Colors.gold} />
                  </View>
                </View>
                <Text style={styles.itemTitle}>Portrait {item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.spacer} />

      </ScrollView>

      <PatronageModal visible={showPatronage} onClose={() => setShowPatronage(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.cream, // Parchment background
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 30,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.britishRacingGreen,
    borderRadius: 20,
  },
  headerTexts: {
    flex: 1,
    marginHorizontal: 12,
  },
  headerTitle: {
    fontFamily: Fonts.headingBold,
    fontSize: 28,
    color: Colors.britishRacingGreen,
  },
  subHeader: {
    fontFamily: Fonts.bodyItalic,
    fontSize: 16,
    color: Colors.oxblood,
    marginTop: 4,
  },
  editButton: {
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.britishRacingGreen,
    borderRadius: 20,
  },
  streakContainer: {
    alignItems: 'flex-start',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 66, 37, 0.1)',
  },
  tab: {
    marginRight: 32,
    paddingBottom: 12,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.britishRacingGreen,
  },
  tabText: {
    fontFamily: Fonts.body,
    fontSize: 16,
    color: Colors.text.secondary,
    opacity: 0.6,
  },
  activeTabText: {
    color: Colors.britishRacingGreen,
    opacity: 1,
    fontFamily: Fonts.headingBold,
  },
  section: {
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: ITEM_WIDTH,
    marginBottom: 24,
  },
  frame: {
    width: '100%',
    aspectRatio: 0.8,
    backgroundColor: Colors.offWhite,
    borderWidth: 8,
    borderColor: '#E0D6C2', // Frame color
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  placeholderImage: {
    width: '90%',
    height: '90%',
    backgroundColor: '#F0EAD6',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  itemTitle: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.text.primary,
    textAlign: 'center',
  },
  patronageButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: Colors.britishRacingGreen,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  patronageButtonText: {
    fontFamily: Fonts.heading,
    color: Colors.britishRacingGreen,
    fontSize: 14,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  spacer: {
    height: 40,
  },
});
