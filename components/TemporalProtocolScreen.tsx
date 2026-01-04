import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  FadeInDown,
  FadeOutUp,
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import MorningReflection from './MorningReflection';
import ScheduledWisdom from './ScheduledWisdom';
import TheReservoir from './TheReservoir';
import FrequencyMeter from './FrequencyMeter';
import EngagementProtocol from './EngagementProtocol';
import TheStreakSaver from './TheStreakSaver';
import TheChimes, { ReminderItem } from './TheChimes';

const { width, height } = Dimensions.get('window');

export default function TemporalProtocolScreen() {
  const [morningTime, setMorningTime] = useState('06:00');
  const [commencementTime, setCommencementTime] = useState('08:00');
  const [conclusionTime, setConclusionTime] = useState('20:00');
  const [sourceMode, setSourceMode] = useState<'archive' | 'vault'>('archive');
  const [frequency, setFrequency] = useState(5);
  const [engagementMode, setEngagementMode] = useState<'text' | 'app'>('text');
  const [streakSaverActive, setStreakSaverActive] = useState(false);
  const [reminders, setReminders] = useState<ReminderItem[]>([
    { id: '1', time: '09:00', label: 'Morning Wisdom', enabled: true },
    { id: '2', time: '12:00', label: 'Midday Reflection', enabled: true },
    { id: '3', time: '18:00', label: 'Evening Contemplation', enabled: false },
    { id: '4', time: '21:00', label: 'Nighttime Insight', enabled: false },
  ]);

  const handleApplyProtocols = async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    // Save settings logic here
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.britishRacingGreen} />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Temporal Protocol</Text>
        <Text style={styles.headerSubtitle}>Orchestrate Your Daily Wisdom</Text>
      </View>

      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
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
          <Text style={styles.sectionTitle}>IV. Frequency Meter</Text>
          <View style={styles.divider} />
          <FrequencyMeter 
            value={frequency}
            onChange={(freq: number) => {
              setFrequency(freq);
              Haptics.selectionAsync();
            }}
          />
        </View>

        {/* Engagement Protocol */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>V. Engagement Protocol</Text>
          <View style={styles.divider} />
          <EngagementProtocol 
            selectedMode={engagementMode}
            onChange={(mode: 'text' | 'app') => {
              setEngagementMode(mode);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
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

        {/* The Chimes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>VII. The Chimes</Text>
          <View style={styles.divider} />
          <TheChimes 
            reminders={reminders}
            onChange={(updatedReminders: ReminderItem[]) => {
              setReminders(updatedReminders);
              Haptics.selectionAsync();
            }}
          />
        </View>

        <View style={styles.spacer} />

      </ScrollView>

      {/* Apply Protocols Button */}
      <View style={styles.actionContainer}>
        <TouchableOpacity 
          style={styles.applyButton}
          onPress={handleApplyProtocols}
          activeOpacity={0.8}
        >
          <Text style={styles.applyButtonText}>APPLY PROTOCOLS</Text>
        </TouchableOpacity>
      </View>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  header: {
    backgroundColor: Colors.britishRacingGreen,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTitle: {
    fontFamily: Fonts.headingBold,
    fontSize: 28,
    color: Colors.cream,
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.gold,
    letterSpacing: 0.5,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingVertical: 24,
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
    height: 40,
  },
  actionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.cream,
    borderTopWidth: 1,
    borderTopColor: Colors.gold,
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
