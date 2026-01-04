import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';

const { width } = Dimensions.get('window');

interface LanguageModalProps {
  visible: boolean;
  onClose: () => void;
  currentLanguage: string;
  onSelect: (language: string) => void;
}

const LANGUAGES = [
  { id: 'en', name: 'English (Oxford)' },
  { id: 'fi', name: 'Suomi' },
  { id: 'fr', name: 'Français' },
  { id: 'it', name: 'Italiano' },
  { id: 'de', name: 'Deutsch' },
  { id: 'es', name: 'Español' },
];

export default function LanguageModal({ visible, onClose, currentLanguage, onSelect }: LanguageModalProps) {
  
  const handleSelect = (name: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    onSelect(name);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Registry of Tongues</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={Colors.oxblood} />
            </TouchableOpacity>
          </View>

          <FlatList
            data={LANGUAGES}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity 
                style={styles.item} 
                onPress={() => handleSelect(item.name)}
                activeOpacity={0.7}
              >
                <Text style={[styles.itemText, item.name === currentLanguage && styles.itemTextActive]}>
                  {item.name}
                </Text>
                {item.name === currentLanguage && (
                  <Ionicons name="leaf" size={16} color={Colors.gold} />
                )}
              </TouchableOpacity>
            )}
            ItemSeparatorComponent={() => <View style={styles.divider} />}
            contentContainerStyle={styles.listContent}
          />

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    width: width * 0.85,
    backgroundColor: Colors.cream,
    paddingVertical: 24,
    paddingHorizontal: 0, // Full width dividers
    borderWidth: 1,
    borderColor: Colors.gold,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
    maxHeight: '70%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: Fonts.heading,
    fontSize: 22,
    color: Colors.britishRacingGreen,
  },
  closeButton: {
    padding: 4,
  },
  listContent: {
    paddingHorizontal: 24,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  itemText: {
    fontFamily: Fonts.body,
    fontSize: 18,
    color: Colors.text.primary,
  },
  itemTextActive: {
    fontFamily: Fonts.headingBold,
    color: Colors.britishRacingGreen,
  },
  divider: {
    height: 1, // Hairline
    backgroundColor: Colors.gold,
    opacity: 0.3,
  },
});
