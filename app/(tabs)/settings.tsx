import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../../config/firebase';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Components
import SettingsSection from '../../components/SettingsSection';
import SettingsItem from '../../components/SettingsItem';
import PatronageModal from '../../components/PatronageModal';
import TheEliteLedgerModal from '../../components/TheEliteLedgerModal';
import TemporalProtocolSettings from '../../components/TemporalProtocolSettings';
import AcousticsModal from '../../components/AcousticsModal';
import IdentityModal from '../../components/IdentityModal';
import LanguageModal from '../../components/LanguageModal';

export default function SettingsScreen() {
  const router = useRouter();
  const { user } = useAuth();

  // Modal Visibility States
  const [patronageVisible, setPatronageVisible] = useState(false);
  const [eliteLedgerVisible, setEliteLedgerVisible] = useState(false);
  const [languageVisible, setLanguageVisible] = useState(false);
  const [identityVisible, setIdentityVisible] = useState(false);
  const [acousticsVisible, setAcousticsVisible] = useState(false);
  const [temporalVisible, setTemporalVisible] = useState(false);

  // Settings Values
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

  // Handlers
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

  const handleLogout = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
              router.replace('/login');
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          },
        },
      ]
    );
  };

  // Generic Alert for placeholder features
  const showFeatureInfo = (title: string, message: string) => {
    Alert.alert(title, message, [{ text: 'Understood' }]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>Settings</Text>
            <TouchableOpacity 
              style={styles.logoutButton} 
              onPress={handleLogout}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
            </TouchableOpacity>
          </View>
          <View style={styles.profileCard}>
            <View style={styles.avatarContainer}>
              <Ionicons name="person" size={32} color="#000" />
            </View>
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{user?.email || 'Guest Member'}</Text>
              <Text style={styles.profileSubtitle}>Premium Estate</Text>
            </View>
          </View>
        </View>

        {/* I. Estate & Status */}
        <SettingsSection title="I. Estate & Status">
          <SettingsItem 
            icon="create-outline" 
            title="Legacy Account" 
            subtitle="Personal details & heritage"
            onPress={() => setEliteLedgerVisible(true)}
          />
          <SettingsItem 
            icon="shield-checkmark-outline" 
            title="Vault Security" 
            subtitle="Biometric & encryption" 
            onPress={() => showFeatureInfo('Vault Security', 'Your digital vault is secured with biometric encryption.')}
          />
          <SettingsItem 
            icon="ribbon-outline" 
            title="The Patronage" 
            subtitle="Manage Subscription" 
            onPress={() => setPatronageVisible(true)}
          />
        </SettingsSection>

        {/* II. The Daily Discipline */}
        <SettingsSection title="II. The Daily Discipline">
          <SettingsItem 
            icon="hourglass-outline" 
            title="Daily Practice" 
            subtitle="Routines & goals" 
            onPress={() => showFeatureInfo('Daily Practice', 'Track your daily streaks and wisdom in your Profile.')}
          />
          <SettingsItem 
            icon="musical-notes-outline" 
            title="Acoustics" 
            subtitle="The Orchestration" 
            onPress={() => {
              console.log('Opening Acoustics Modal');
              setAcousticsVisible(true);
            }}
          />
          <SettingsItem 
            icon="globe-outline" 
            title="Native Tongue" 
            subtitle={selectedLanguage} 
            onPress={() => {
              console.log('Opening Language Modal');
              setLanguageVisible(true);
            }}
          />
          <SettingsItem 
            icon="person-circle-outline" 
            title="Identity" 
            subtitle={selectedIdentity} 
            onPress={() => {
              console.log('Opening Identity Modal');
              setIdentityVisible(true);
            }}
          />
        </SettingsSection>

        {/* III. Governance & Focus */}
        <SettingsSection title="III. Governance & Focus">
          <SettingsItem 
            icon="notifications-off-outline" 
            title="The Silence" 
            subtitle="Muted content" 
            onPress={() => showFeatureInfo('The Silence', 'Content filters are currently active.')}
          />
          <SettingsItem 
            icon="time-outline" 
            title="The Chimes" 
            subtitle="Reminders & Protocols" 
            onPress={() => {
              console.log('Opening Chimes Modal');
              setTemporalVisible(true);
            }}
          />
        </SettingsSection>

        <View style={styles.footer}>
          <Text style={styles.version}>Version 1.0.0 (Build 1924)</Text>
        </View>

      </ScrollView>

      {/* Modals */}
      <PatronageModal 
        visible={patronageVisible} 
        onClose={() => setPatronageVisible(false)} 
      />
      
      <TheEliteLedgerModal 
        visible={eliteLedgerVisible} 
        onClose={() => setEliteLedgerVisible(false)} 
      />
      
      <AcousticsModal 
        visible={acousticsVisible} 
        onClose={() => setAcousticsVisible(false)}
        currentVolume={volume}
        currentAtmosphere={atmosphere}
        onVolumeChange={handleVolumeChange}
        onAtmosphereChange={handleAtmosphereChange}
      />
      
      <IdentityModal 
        visible={identityVisible} 
        onClose={() => setIdentityVisible(false)}
        currentIdentity={selectedIdentity}
        onSelect={handleIdentitySelect}
      />
      
      <LanguageModal 
        visible={languageVisible} 
        onClose={() => setLanguageVisible(false)}
        currentLanguage={selectedLanguage}
        onSelect={handleLanguageSelect}
      />

      {/* Temporal Protocol (The Chimes) Modal */}
      <Modal 
        visible={temporalVisible} 
        animationType="slide" 
        transparent={true}
        onRequestClose={() => setTemporalVisible(false)}
      >
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>The Chimes</Text>
                <TouchableOpacity onPress={() => setTemporalVisible(false)}>
                  <Ionicons name="close" size={26} color="#000000" />
                </TouchableOpacity>
              </View>
              <TemporalProtocolSettings onClose={() => setTemporalVisible(false)} />
            </View>
          </View>
        </GestureHandlerRootView>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    padding: 24,
    backgroundColor: '#FFFFFF',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerTitle: {
    fontFamily: Fonts.headingBold,
    fontSize: 32,
    color: '#000000',
  },
  logoutButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: '#FFF5F5',
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F8F8F8',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: Fonts.headingBold,
    fontSize: 18,
    color: '#000000',
    marginBottom: 4,
  },
  profileSubtitle: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: '#888888',
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
    backgroundColor: '#F5F5F5',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    height: '90%',
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
    marginBottom: 24,
  },
  modalTitle: {
    fontFamily: Fonts.headingBold,
    fontSize: 24,
    color: '#000000',
  },
});
