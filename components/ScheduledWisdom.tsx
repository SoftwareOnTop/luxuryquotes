import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { useState } from 'react';
import Animated, { FadeInDown } from 'react-native-reanimated';

interface ScheduledWisdomProps {
  commencementTime: string;
  conclusionTime: string;
  onCommencementChange: (time: string) => void;
  onConclusionChange: (time: string) => void;
}

export default function ScheduledWisdom({
  commencementTime,
  conclusionTime,
  onCommencementChange,
  onConclusionChange,
}: ScheduledWisdomProps) {
  const [activePickerType, setActivePickerType] = useState<'commencement' | 'conclusion' | null>(null);

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const renderTimePicker = (
    type: 'commencement' | 'conclusion',
    currentTime: string,
    onChange: (time: string) => void
  ) => {
    if (activePickerType !== type) return null;

    return (
      <Animated.View 
        style={styles.pickerContainer}
        entering={FadeInDown.springify()}
      >
        <ScrollView 
          style={styles.picker}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
        >
          {hours.map((hour) => (
            <TouchableOpacity
              key={hour}
              style={styles.hourOption}
              onPress={() => {
                onChange(`${String(hour).padStart(2, '0')}:00`);
                setActivePickerType(null);
              }}
            >
              <Text style={[
                styles.hourText,
                String(hour).padStart(2, '0') === currentTime.split(':')[0] && styles.selectedHour
              ]}>
                {String(hour).padStart(2, '0')}:00
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.description}>Define your notification window</Text>
      
      <View style={styles.timeRange}>
        <View style={styles.timeColumn}>
          <Text style={styles.timeLabel}>Commencement</Text>
          <TouchableOpacity 
            style={styles.timeButton}
            onPress={() => setActivePickerType(activePickerType === 'commencement' ? null : 'commencement')}
          >
            <Text style={styles.timeButtonText}>{commencementTime}</Text>
          </TouchableOpacity>
          {renderTimePicker('commencement', commencementTime, onCommencementChange)}
        </View>

        <View style={styles.separator}>
          <View style={styles.separatorLine} />
          <Text style={styles.separatorText}>to</Text>
          <View style={styles.separatorLine} />
        </View>

        <View style={styles.timeColumn}>
          <Text style={styles.timeLabel}>Conclusion</Text>
          <TouchableOpacity 
            style={styles.timeButton}
            onPress={() => setActivePickerType(activePickerType === 'conclusion' ? null : 'conclusion')}
          >
            <Text style={styles.timeButtonText}>{conclusionTime}</Text>
          </TouchableOpacity>
          {renderTimePicker('conclusion', conclusionTime, onConclusionChange)}
        </View>
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
  timeRange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timeColumn: {
    flex: 1,
  },
  timeLabel: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.text.secondary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  timeButton: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: Colors.gold,
    backgroundColor: Colors.offWhite,
    borderRadius: 4,
    alignItems: 'center',
  },
  timeButtonText: {
    fontFamily: Fonts.headingBold,
    fontSize: 16,
    color: Colors.britishRacingGreen,
  },
  separator: {
    alignItems: 'center',
    gap: 8,
  },
  separatorLine: {
    width: 20,
    height: 1,
    backgroundColor: Colors.gold,
    opacity: 0.5,
  },
  separatorText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.text.secondary,
  },
  pickerContainer: {
    marginTop: 12,
    backgroundColor: Colors.cream,
    borderRadius: 4,
    maxHeight: 200,
    overflow: 'hidden',
  },
  picker: {
    maxHeight: 200,
  },
  hourOption: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gold,
  },
  hourText: {
    fontFamily: Fonts.body,
    fontSize: 16,
    color: Colors.text.secondary,
  },
  selectedHour: {
    fontFamily: Fonts.headingBold,
    color: Colors.britishRacingGreen,
    fontSize: 17,
  },
});
