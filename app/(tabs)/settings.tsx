import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';
import SettingsSection from '../../components/SettingsSection';
import SettingsItem from '../../components/SettingsItem';
import PatronageModal from '../../components/PatronageModal';
import { useState } from 'react';

export default function SettingsScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        
        {/* Header */}
        <View style={styles.header}>
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
            subtitle="Elite Membership" 
            onPress={() => setModalVisible(true)}
          />
        </SettingsSection>

        {/* II. The Daily Discipline */}
        <SettingsSection title="II. The Daily Discipline">
          <SettingsItem icon="hourglass-outline" title="Daily Practice" subtitle="Routines & goals" />
          <SettingsItem icon="musical-notes-outline" title="Acoustics" subtitle="Classical & Nature" />
          <SettingsItem icon="globe-outline" title="Native Tongue" subtitle="Language" />
          <SettingsItem icon="person-circle-outline" title="Identity" subtitle="Sir / Lady / Individual" />
        </SettingsSection>

        {/* III. Governance & Focus */}
        <SettingsSection title="III. Governance & Focus">
          <SettingsItem icon="notifications-off-outline" title="The Silence" subtitle="Muted content" />
          <SettingsItem icon="time-outline" title="The Chimes" subtitle="Reminders" />
        </SettingsSection>

        {/* IV. The Inner Circle */}
        <SettingsSection title="IV. The Inner Circle">
          <SettingsItem icon="share-social-outline" title="The Network" subtitle="Invite friends" />
          <SettingsItem icon="star-outline" title="Leave a Testament" subtitle="Review" />
          <View style={styles.socialRow}>
             {/* Social Icons Placeholder */}
             <Text style={styles.socialText}>[IG] [X] [YT] [LinkedIn]</Text>
          </View>
        </SettingsSection>

        {/* V. The Ledger */}
        <SettingsSection title="V. The Ledger">
          <SettingsItem icon="book-outline" title="The Codex" subtitle="Help & Support" />
          <SettingsItem icon="document-text-outline" title="Privacy Policy & Terms" subtitle="Legal documents" />
        </SettingsSection>

        <View style={styles.footer}>
          <Text style={styles.version}>Version 1.0.0 (1924)</Text>
        </View>

      </ScrollView>

      <PatronageModal visible={modalVisible} onClose={() => setModalVisible(false)} />
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
    backgroundColor: Colors.cream,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 40,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gold,
    marginBottom: 20,
  },
  headerTitle: {
    fontFamily: Fonts.heading,
    fontSize: 24,
    color: Colors.britishRacingGreen,
    marginBottom: 20,
  },
  monogramContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: Colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: Colors.offWhite,
  },
  monogram: {
    fontFamily: Fonts.headingBold,
    fontSize: 32,
    color: Colors.oxblood,
  },
  memberSince: {
    fontFamily: Fonts.subheadingItalic,
    fontSize: 16,
    color: Colors.text.secondary,
  },
  socialRow: {
    padding: 20,
    alignItems: 'center',
  },
  socialText: {
    fontFamily: Fonts.body,
    color: Colors.gold,
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  version: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.text.secondary,
    opacity: 0.5,
  },
});
