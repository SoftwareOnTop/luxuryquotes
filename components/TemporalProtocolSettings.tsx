import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { useState } from 'react';
import * as Haptics from 'expo-haptics';
import MorningReflection from './MorningReflection';
import ScheduledWisdom from './ScheduledWisdom';
import TheReservoir from './TheReservoir';
import FrequencyMeter from './FrequencyMeter';
import EngagementProtocol from './EngagementProtocol';
import TheStreakSaver from './TheStreakSaver';

export default function TemporalProtocolSettings({ onClose }: { onClose: () => void }) {
  const [morningTime, setMorningTime] = useState('06:00');
  const [commencementTime, setCommencementTime] = useState('08:00');
  const [conclusionTime, setConclusionTime] = useState('20:00');
  const [sourceMode, setSourceMode] = useState<'archive' | 'vault'>('archive');
  const [frequency, setFrequency] = useState(5);
  const [engagementMode, setEngagementMode] = useState<'text' | 'app'>('text');
  const [streakSaverActive, setStreakSaverActive] = useState(false);

  const handleApplyProtocols = async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onClose();
  };

  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.description}>
          Orchestrate your daily wisdom delivery.
        </Text>

        {/* Morning Reflection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>I. Morning Reflection</Text>
          <View style={styles.divider} />
          <MorningReflection 
            value={morningTime} 
            onChange={(time: string) => {
              setMorningTime(time);
              Haptics.selectionAsync();
            }} 
          />
        </View>

        {/* Scheduled Wisdom */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>II. Scheduled Wisdom</Text>
          <View style={styles.divider} />
          <ScheduledWisdom 
            commencementTime={commencementTime}
            conclusionTime={conclusionTime}
            onCommencementChange={(time: string) => {
              setCommencementTime(time);
              Haptics.selectionAsync();
            }}
            onConclusionChange={(time: string) => {
              setConclusionTime(time);
              Haptics.selectionAsync();
            }}
          />
        </View>

        {/* The Reservoir */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>III. The Reservoir</Text>
          <View style={styles.divider} />
          <TheReservoir 
            selectedMode={sourceMode}
            onChange={(mode: 'archive' | 'vault') => {
              setSourceMode(mode);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
          />
        </View>

        {/* Frequency Meter */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>IV. Frequency</Text>
          <View style={styles.divider} />
          <FrequencyMeter 
            value={frequency}
            onChange={(val: number) => {
              setFrequency(val);
              Haptics.selectionAsync();
            }}
          />
        </View>

        {/* Engagement Protocol */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>V. Engagement Protocol</Text>
          <View style={styles.divider} />
          <EngagementProtocol 
            mode={engagementMode}
            onChange={(mode: 'text' | 'app') => {
              setEngagementMode(mode);
              Haptics.selectionAsync();
            }}
          />
        </View>

        {/* The Streak Saver */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VI. The Streak Saver</Text>
          <View style={styles.divider} />
          <TheStreakSaver 
            active={streakSaverActive}
            onChange={(active: boolean) => {
              setStreakSaverActive(active);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
            }}
          />
        </View>

        <View style={styles.spacer} />
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.applyButton} onPress={handleApplyProtocols}>
          <Text style={styles.applyButtonText}>Apply Protocols</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  description: {
    fontFamily: Fonts.bodyItalic,
    fontSize: 14,
    color: Colors.text.secondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  section: {
    marginBottom: 32,
    backgroundColor: Colors.offWhite,
    borderRadius: 8,
    padding: 16,
    borderLeftWidth: 3,
    borderLeftColor: Colors.gold,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontFamily: Fonts.headingBold,
    fontSize: 16,
    color: Colors.oxblood,
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.gold,
    marginBottom: 16,
    opacity: 0.3,
  },
  spacer: {
    height: 20,
  },
  footer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.gold,
    backgroundColor: Colors.cream,
  },
  applyButton: {
    backgroundColor: Colors.britishRacingGreen,
    borderWidth: 2,
    borderColor: Colors.gold,
    paddingVertical: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  applyButtonText: {
    fontFamily: Fonts.headingBold,
    fontSize: 14,
    color: Colors.gold,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
});
