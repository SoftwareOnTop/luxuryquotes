import { View, Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, Modal } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import OakLeafStreak from './OakLeafStreak';
import PatronageModal from './PatronageModal';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 60) / 2;

interface ProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function ProfileModal({ visible, onClose }: ProfileModalProps) {
  const [activeTab, setActiveTab] = useState<'collection' | 'journal'>('collection');
  const [showPatronage, setShowPatronage] = useState(false);

  return (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.modalContainer}>
          <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            
            {/* Header Section */}
            <View style={styles.header}>
              <View style={styles.headerTop}>
                <TouchableOpacity style={styles.backButton} onPress={onClose}>
                  <Ionicons name="close-outline" size={24} color="#1A1A1A" />
                </TouchableOpacity>
                <View style={styles.headerTexts}>
                  <Text style={styles.headerTitle}>The Personal Archive</Text>
                  <Text style={styles.subHeader}>Collected Wisdom</Text>
                </View>
                <TouchableOpacity style={styles.editButton}>
                  <Ionicons name="create-outline" size={24} color="#1A1A1A" />
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
                        <Ionicons name="image-outline" size={32} color="#9CA3AF" />
                      </View>
                    </View>
                    <Text style={styles.itemTitle}>Portrait {item}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.spacer} />

          </ScrollView>
        </View>
      </Modal>

      <PatronageModal visible={showPatronage} onClose={() => setShowPatronage(false)} />
    </>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  container: {
    flex: 1,
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
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTexts: {
    flex: 1,
    marginHorizontal: 12,
  },
  headerTitle: {
    fontFamily: Fonts.headingBold,
    fontSize: 32,
    color: '#1A1A1A',
  },
  subHeader: {
    fontFamily: Fonts.body,
    fontSize: 15,
    color: '#6B7280',
    marginTop: 4,
  },
  editButton: {
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  streakContainer: {
    alignItems: 'flex-start',
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#1A1A1A',
  },
  tabText: {
    fontFamily: Fonts.body,
    fontSize: 15,
    color: '#6B7280',
  },
  activeTabText: {
    color: '#FFFFFF',
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
    marginBottom: 20,
  },
  frame: {
    width: '100%',
    aspectRatio: 0.8,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    overflow: 'hidden',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTitle: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: '#6B7280',
    textAlign: 'center',
  },
  patronageButton: {
    backgroundColor: '#1A1A1A',
    paddingVertical: 16,
    paddingHorizontal: 32,
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 20,
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  patronageButtonText: {
    fontFamily: Fonts.headingBold,
    color: '#FFFFFF',
    fontSize: 15,
    letterSpacing: 0.5,
  },
  spacer: {
    height: 40,
  },
});
