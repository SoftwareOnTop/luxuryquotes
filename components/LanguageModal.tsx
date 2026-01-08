import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
          
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Registry of Tongues</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={26} color="#000000" />
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
                    <Ionicons name="checkmark-circle" size={22} color="#000000" />
                  )}
                </TouchableOpacity>
              )}
              ItemSeparatorComponent={() => <View style={styles.divider} />}
              contentContainerStyle={styles.listContent}
            />

          </View>
        </View>
      </GestureHandlerRootView>
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
    backgroundColor: '#FFFFFF',
    paddingVertical: 24,
    paddingHorizontal: 0,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
    maxHeight: '70%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 24,
  },
  title: {
    fontFamily: Fonts.headingBold,
    fontSize: 24,
    color: '#000000',
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
    paddingVertical: 18,
  },
  itemText: {
    fontFamily: Fonts.body,
    fontSize: 17,
    color: '#333333',
  },
  itemTextActive: {
    fontFamily: Fonts.headingBold,
    color: '#000000',
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
  },
});
