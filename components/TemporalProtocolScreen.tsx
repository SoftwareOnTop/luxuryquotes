import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
import TheChimesModal from './TheChimesModal';
import { ReminderItem } from './TheChimesModal';

const { width, height } = Dimensions.get('window');

export default function TemporalProtocolScreen() {
  const [morningTime, setMorningTime] = useState('06:00');
  const [commencementTime, setCommencementTime] = useState('08:00');
  const [conclusionTime, setConclusionTime] = useState('20:00');
  const [sourceMode, setSourceMode] = useState<'archive' | 'vault'>('archive');
  const [frequency, setFrequency] = useState(5);
  const [engagementMode, setEngagementMode] = useState<'text' | 'app'>('text');
  const [streakSaverActive, setStreakSaverActive] = useState(false);
  const [chimesModalVisible, setChimesModalVisible] = useState(false);
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
          <TouchableOpacity 
            style={styles.chimesButton}
            onPress={() => {
              setChimesModalVisible(true);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
            activeOpacity={0.7}
          >
            <View style={styles.chimesButtonLeft}>
              <Ionicons name="notifications" size={24} color="#000000" />
              <Text style={styles.chimesButtonText}>Configure Reminders</Text>
            </View>
            <Ionicons name="chevron-forward" size={22} color="#666666" />
          </TouchableOpacity>
        </View>

        <View style={styles.spacer} />

      </ScrollView>

      {/* The Chimes Modal */}
      <TheChimesModal 
        visible={chimesModalVisible}
        onClose={() => setChimesModalVisible(false)}
        reminders={reminders}
        onChange={(updatedReminders: ReminderItem[]) => {
          setReminders(updatedReminders);
        }}
      />

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
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#000000',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
  },
  headerTitle: {
    fontFamily: Fonts.headingBold,
    fontSize: 28,
    color: '#FFFFFF',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: '#CCCCCC',
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
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  sectionTitle: {
    fontFamily: Fonts.headingBold,
    fontSize: 17,
    color: '#000000',
    marginBottom: 16,
    letterSpacing: 0,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginBottom: 16,
  },
  spacer: {
    height: 40,
  },
  chimesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  chimesButtonLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  chimesButtonText: {
    fontFamily: Fonts.headingBold,
    fontSize: 15,
    color: '#000000',
  },
  actionContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  applyButton: {
    backgroundColor: '#000000',
    paddingVertical: 18,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  applyButtonText: {
    fontFamily: Fonts.headingBold,
    fontSize: 16,
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});
