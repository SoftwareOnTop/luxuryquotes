import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';
import SettingsSection from '../../components/SettingsSection';
import SettingsItem from '../../components/SettingsItem';
import PatronageModal from '../../components/PatronageModal';
import TheEliteLedgerModal from '../../components/TheEliteLedgerModal';
import TemporalProtocolSettings from '../../components/TemporalProtocolSettings';
import AcousticsModal from '../../components/AcousticsModal';
import IdentityModal from '../../components/IdentityModal';
import LanguageModal from '../../components/LanguageModal';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function SettingsScreen() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [eliteLedgerVisible, setEliteLedgerVisible] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [identityModalVisible, setIdentityModalVisible] = useState(false);
  const [acousticsModalVisible, setAcousticsModalVisible] = useState(false);
  const [chimesModalVisible, setChimesModalVisible] = useState(false);

  const [selectedLanguage, setSelectedLanguage] = useState('English (Oxford)');
  const [selectedIdentity, setSelectedIdentity] = useState('Sir');
  const [volume, setVolume] = useState(0.5);
  const [atmosphere, setAtmosphere] = useState('study');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const savedLanguage = await AsyncStorage.getItem('settings.language');
      const savedIdentity = await AsyncStorage.getItem('settings.identity');
      const savedVolume = await AsyncStorage.getItem('settings.volume');
      const savedAtmosphere = await AsyncStorage.getItem('settings.atmosphere');

      if (savedLanguage) setSelectedLanguage(savedLanguage);
      if (savedIdentity) setSelectedIdentity(savedIdentity);
      if (savedVolume) setVolume(parseFloat(savedVolume));
      if (savedAtmosphere) setAtmosphere(savedAtmosphere);
    } catch (e) {
      console.error('Failed to load settings', e);
    }
  };

  const saveSetting = async (key: string, value: string) => {
    try {
      await AsyncStorage.setItem(`settings.${key}`, value);
    } catch (e) {
      console.error('Failed to save setting', e);
    }
  };

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    saveSetting('language', language);
  };

  const handleIdentitySelect = (identity: string) => {
    setSelectedIdentity(identity);
    saveSetting('identity', identity);
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    saveSetting('volume', newVolume.toString());
  };

  const handleAtmosphereChange = (newAtmosphere: string) => {
    setAtmosphere(newAtmosphere);
    saveSetting('atmosphere', newAtmosphere);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back-outline" size={22} color={Colors.britishRacingGreen} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>The Master Suite</Text>
          <View style={styles.monogramContainer}>
            <Text style={styles.monogram}>A.S.</Text>
          </View>
          <Text style={styles.memberSince}>Member since 1924</Text>
        </View>

        {/* I. Estate & Status */}
        <SettingsSection title="I. Estate & Status">
          <SettingsItem icon="create-outline" title="Legacy Account" subtitle="Personal details & heritage" />
          <SettingsItem icon="shield-checkmark-outline" title="Vault Security" subtitle="Biometric & encryption" />
          <SettingsItem 
            icon="ribbon-outline" 
            title="The Patronage" 
            subtitle="Manage Subscription" 
            onPress={() => setModalVisible(true)}
          />
        </SettingsSection>

        {/* II. The Daily Discipline */}
        <SettingsSection title="II. The Daily Discipline">
          <SettingsItem icon="hourglass-outline" title="Daily Practice" subtitle="Routines & goals" />
          <SettingsItem 
            icon="musical-notes-outline" 
            title="Acoustics" 
            subtitle="The Orchestration" 
            onPress={() => setAcousticsModalVisible(true)}
          />
          <SettingsItem 
            icon="globe-outline" 
            title="Native Tongue" 
            subtitle={selectedLanguage} 
            onPress={() => setLanguageModalVisible(true)}
          />
          <SettingsItem 
            icon="person-circle-outline" 
            title="Identity" 
            subtitle={selectedIdentity} 
            onPress={() => setIdentityModalVisible(true)}
          />
        </SettingsSection>

        {/* III. Governance & Focus */}
        <SettingsSection title="III. Governance & Focus">
          <SettingsItem icon="notifications-off-outline" title="The Silence" subtitle="Muted content" />
          <SettingsItem 
            icon="time-outline" 
            title="The Chimes" 
            subtitle="Reminders" 
            onPress={() => setChimesModalVisible(true)}
          />
        </SettingsSection>

        <View style={styles.footer}>
          <Text style={styles.version}>Version 1.0.0 (Build 1924)</Text>
        </View>

      </ScrollView>

      <PatronageModal visible={modalVisible} onClose={() => setModalVisible(false)} />
      <TheEliteLedgerModal visible={eliteLedgerVisible} onClose={() => setEliteLedgerVisible(false)} />
      <AcousticsModal 
        visible={acousticsModalVisible} 
        onClose={() => setAcousticsModalVisible(false)}
        currentVolume={volume}
        currentAtmosphere={atmosphere}
        onVolumeChange={handleVolumeChange}
        onAtmosphereChange={handleAtmosphereChange}
      />
      <IdentityModal 
        visible={identityModalVisible} 
        onClose={() => setIdentityModalVisible(false)}
        currentIdentity={selectedIdentity}
        onSelect={handleIdentitySelect}
      />
      <LanguageModal 
        visible={languageModalVisible} 
        onClose={() => setLanguageModalVisible(false)}
        currentLanguage={selectedLanguage}
        onSelect={handleLanguageSelect}
      />

      {/* Chimes Modal */}
      <Modal visible={chimesModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>The Chimes</Text>
              <TouchableOpacity onPress={() => setChimesModalVisible(false)}>
                <Ionicons name="close" size={24} color={Colors.oxblood} />
              </TouchableOpacity>
            </View>

            <TemporalProtocolSettings onClose={() => setChimesModalVisible(false)} />
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    padding: 20,
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 20,
    padding: 8,
    borderWidth: 1,
    borderColor: Colors.britishRacingGreen,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.8)',
  },
  headerTitle: {
    fontFamily: Fonts.headingBold,
    fontSize: 28,
    color: Colors.britishRacingGreen,
    marginBottom: 16,
  },
  monogramContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.offWhite,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  monogram: {
    fontFamily: Fonts.headingBold,
    fontSize: 32,
    color: Colors.oxblood,
  },
  memberSince: {
    fontFamily: Fonts.bodyItalic,
    fontSize: 14,
    color: Colors.text.secondary,
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  version: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.text.secondary,
    opacity: 0.5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: Colors.cream,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    height: '90%', // Give it more height for the complex settings
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  modalTitle: {
    fontFamily: Fonts.subheadingItalic,
    fontSize: 24,
    color: Colors.oxblood,
  },
  languageList: {
    alignItems: 'center',
    marginBottom: 32,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    width: '100%',
    justifyContent: 'center',
  },
  languageText: {
    fontFamily: Fonts.body,
    fontSize: 18,
    color: Colors.text.primary,
  },
  selectedLanguageText: {
    fontFamily: Fonts.headingBold,
    color: Colors.britishRacingGreen,
    textDecorationLine: 'underline',
    textDecorationColor: Colors.gold,
  },
  sealIcon: {
    marginLeft: 8,
  },
  confirmButton: {
    borderWidth: 1,
    borderColor: Colors.gold,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 'auto',
  },
  confirmButtonText: {
    fontFamily: Fonts.heading,
    fontSize: 16,
    color: Colors.britishRacingGreen,
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  identityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  identityOption: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: Colors.text.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIdentityOption: {
    backgroundColor: Colors.britishRacingGreen,
    borderColor: Colors.gold,
  },
  identityText: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.text.primary,
  },
  selectedIdentityText: {
    color: Colors.gold,
    fontFamily: Fonts.headingBold,
  },
  acousticsContainer: {
    marginTop: 20,
  },
  volumeLabel: {
    fontFamily: Fonts.body,
    fontSize: 16,
    color: Colors.text.primary,
    marginBottom: 16,
  },
  sliderTrack: {
    height: 2,
    backgroundColor: Colors.text.secondary,
    width: '100%',
    position: 'relative',
  },
  sliderFill: {
    height: 2,
    backgroundColor: Colors.gold,
    position: 'absolute',
    left: 0,
  },
  sliderThumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: Colors.cream,
    borderWidth: 2,
    borderColor: Colors.gold,
    position: 'absolute',
    top: -7,
    marginLeft: -8,
  },
});
