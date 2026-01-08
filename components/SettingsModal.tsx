import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import SettingsSection from './SettingsSection';
import SettingsItem from './SettingsItem';
import PatronageModal from './PatronageModal';
import TheEliteLedgerModal from './TheEliteLedgerModal';
import TemporalProtocolSettings from './TemporalProtocolSettings';
import AcousticsModal from './AcousticsModal';
import IdentityModal from './IdentityModal';
import LanguageModal from './LanguageModal';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  onLogout?: () => void;
}

export default function SettingsModal({ visible, onClose, onLogout }: SettingsModalProps) {
  const { user } = useAuth();
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
    if (visible) {
      loadSettings();
    }
  }, [visible]);

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

  const handleLogout = async () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut(auth);
              onClose();
              onLogout?.();
            } catch (error) {
              console.error('Logout error:', error);
              Alert.alert('Error', 'Failed to sign out. Please try again.');
            }
          }
        }
      ]
    );
  };

  // Generic Alert for placeholder features
  const showFeatureInfo = (title: string, message: string) => {
    Alert.alert(title, message, [{ text: 'Understood' }]);
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
      presentationStyle="fullScreen"
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.modalContainer}>
          <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.headerTop}>
                <View style={styles.titleContainer}>
                  <Text style={styles.headerTitle}>Settings</Text>
                </View>
                <View style={styles.headerButtons}>
                  <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Ionicons name="log-out-outline" size={22} color="#FF3B30" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Ionicons name="close-outline" size={26} color="#000" />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.profileCard}>
                <View style={styles.avatarContainer}>
                  <Ionicons name="person" size={32} color="#FFF" />
                </View>
                <View style={styles.profileInfo}>
                  <Text style={styles.profileName}>{user?.email || 'User'}</Text>
                  <Text style={styles.profileSubtitle}>Premium Member</Text>
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
                onPress={() => {
                  console.log('Opening Patronage Modal');
                  setModalVisible(true);
                }}
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
                  setAcousticsModalVisible(true);
                }}
              />
              <SettingsItem 
                icon="globe-outline" 
                title="Native Tongue" 
                subtitle={selectedLanguage} 
                onPress={() => {
                  console.log('Opening Language Modal');
                  setLanguageModalVisible(true);
                }}
              />
              <SettingsItem 
                icon="person-circle-outline" 
                title="Identity" 
                subtitle={selectedIdentity} 
                onPress={() => {
                  console.log('Opening Identity Modal');
                  setIdentityModalVisible(true);
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
                subtitle="Reminders" 
                onPress={() => {
                  console.log('Opening Chimes Modal');
                  setChimesModalVisible(true);
                }}
              />
            </SettingsSection>

            <View style={styles.footer}>
              <Text style={styles.version}>Version 1.0.0 (Build 1924)</Text>
            </View>

          </ScrollView>

          {/* Modals rendered inside GestureHandlerRootView */}
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
          <Modal 
            visible={chimesModalVisible} 
            animationType="slide" 
            transparent={true}
            onRequestClose={() => setChimesModalVisible(false)}
            presentationStyle="overFullScreen"
          >
            <GestureHandlerRootView style={{ flex: 1 }}>
              <View style={styles.chimesModalContainer}>
                <View style={styles.chimesModalContent}>
                  <View style={styles.modalHeader}>
                    <Text style={styles.modalTitle}>The Chimes</Text>
                    <TouchableOpacity onPress={() => setChimesModalVisible(false)}>
                      <Ionicons name="close" size={26} color="#1A1A1A" />
                    </TouchableOpacity>
                  </View>

                  <TemporalProtocolSettings onClose={() => setChimesModalVisible(false)} />
                </View>
              </View>
            </GestureHandlerRootView>
          </Modal>

        </View>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: 60,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    padding: 24,
    backgroundColor: 'transparent',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  titleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontFamily: Fonts.headingBold,
    fontSize: 36,
    color: '#1A1A1A',
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logoutButton: {
    padding: 8,
    backgroundColor: '#FFE5E5',
    borderRadius: 20,
  },
  closeButton: {
    padding: 8,
    backgroundColor: '#E5E5EA',
    borderRadius: 20,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1A1A1A',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  avatarContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#444',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontFamily: Fonts.headingBold,
    fontSize: 18,
    color: '#FFFFFF',
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
  chimesModalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  chimesModalContent: {
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
