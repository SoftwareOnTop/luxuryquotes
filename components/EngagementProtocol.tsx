import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface EngagementProtocolProps {
  selectedMode: 'text' | 'app';
  onChange: (mode: 'text' | 'app') => void;
}

export default function EngagementProtocol({ selectedMode, onChange }: EngagementProtocolProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>Notification delivery method</Text>
      
      <View style={styles.toggleContainer}>
        <TouchableOpacity 
          style={[
            styles.option,
            selectedMode === 'text' && styles.selectedOption,
            selectedMode !== 'text' && { opacity: 0.6 },
          ]}
          onPress={() => onChange('text')}
        >
          <View style={styles.optionIconContainer}>
            <Text style={styles.optionIcon}>📝</Text>
          </View>
          <View>
            <Text style={[
              styles.optionTitle,
              selectedMode === 'text' && styles.selectedOptionTitle,
            ]}>
              Notification Text
            </Text>
            <Text style={styles.optionSubtitle}>Quote delivered directly</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.dividerVertical} />

        <TouchableOpacity 
          style={[
            styles.option,
            selectedMode === 'app' && styles.selectedOption,
            selectedMode !== 'app' && { opacity: 0.6 },
          ]}
          onPress={() => onChange('app')}
        >
          <View style={styles.optionIconContainer}>
            <Text style={styles.optionIcon}>🚪</Text>
          </View>
          <View>
            <Text style={[
              styles.optionTitle,
              selectedMode === 'app' && styles.selectedOptionTitle,
            ]}>
              App Entry
            </Text>
            <Text style={styles.optionSubtitle}>Open app required</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  description: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 16,
    opacity: 0.8,
  },
  toggleContainer: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  option: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.gold,
    backgroundColor: Colors.offWhite,
    alignItems: 'center',
    gap: 12,
  },
  selectedOption: {
    backgroundColor: Colors.britishRacingGreen,
    borderColor: Colors.gold,
  },
  optionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.cream,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionIcon: {
    fontSize: 24,
  },
  optionTitle: {
    fontFamily: Fonts.headingBold,
    fontSize: 12,
    color: Colors.text.primary,
    marginBottom: 2,
  },
  selectedOptionTitle: {
    color: Colors.gold,
  },
  optionSubtitle: {
    fontFamily: Fonts.body,
    fontSize: 10,
    color: Colors.text.secondary,
    opacity: 0.7,
  },
  dividerVertical: {
    width: 1,
    height: 60,
    backgroundColor: Colors.gold,
    opacity: 0.2,
  },
});
