import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { useState } from 'react';
import Animated, { FadeInDown, Layout } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface MorningReflectionProps {
  value: string;
  onChange: (time: string) => void;
}

export default function MorningReflection({ value, onChange }: MorningReflectionProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const minutes = [0, 15, 30, 45];

  const handleTimeSelect = (hour: number, minute: number) => {
    const timeStr = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
    onChange(timeStr);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Daily Awakening Time</Text>
      
      <TouchableOpacity 
        style={styles.timeDisplay}
        onPress={() => setIsOpen(!isOpen)}
      >
        <View style={styles.brassFrame}>
          <Text style={styles.timeText}>{value}</Text>
        </View>
      </TouchableOpacity>

      {isOpen && (
        <Animated.View 
          style={styles.pickerContainer}
          entering={FadeInDown.springify()}
        >
          <View style={styles.pickerScroll}>
            <View style={styles.columnContainer}>
              <Text style={styles.columnLabel}>Hours</Text>
              <ScrollView 
                style={styles.scroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
              >
                {hours.map((hour) => (
                  <TouchableOpacity
                    key={hour}
                    style={styles.timeOption}
                    onPress={() => handleTimeSelect(hour, parseInt(value.split(':')[1]))}
                  >
                    <Text style={[
                      styles.timeOptionText,
                      String(hour).padStart(2, '0') === value.split(':')[0] && styles.selectedOption
                    ]}>
                      {String(hour).padStart(2, '0')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            <View style={styles.columnContainer}>
              <Text style={styles.columnLabel}>Minutes</Text>
              <ScrollView 
                style={styles.scroll}
                scrollEventThrottle={16}
                showsVerticalScrollIndicator={false}
              >
                {minutes.map((minute) => (
                  <TouchableOpacity
                    key={minute}
                    style={styles.timeOption}
                    onPress={() => handleTimeSelect(parseInt(value.split(':')[0]), minute)}
                  >
                    <Text style={[
                      styles.timeOptionText,
                      String(minute).padStart(2, '0') === value.split(':')[1] && styles.selectedOption
                    ]}>
                      {String(minute).padStart(2, '0')}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 12,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  timeDisplay: {
    alignItems: 'center',
  },
  brassFrame: {
    width: 120,
    height: 80,
    borderWidth: 2,
    borderColor: '#B8860B',
    backgroundColor: Colors.offWhite,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    shadowColor: '#B8860B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  timeText: {
    fontFamily: Fonts.headingBold,
    fontSize: 32,
    color: Colors.britishRacingGreen,
  },
  pickerContainer: {
    marginTop: 16,
    backgroundColor: Colors.cream,
    borderRadius: 4,
    overflow: 'hidden',
  },
  pickerScroll: {
    flexDirection: 'row',
    height: 200,
  },
  columnContainer: {
    flex: 1,
    alignItems: 'center',
  },
  columnLabel: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.text.secondary,
    paddingVertical: 8,
  },
  scroll: {
    flex: 1,
  },
  timeOption: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
  timeOptionText: {
    fontFamily: Fonts.body,
    fontSize: 16,
    color: Colors.text.secondary,
  },
  selectedOption: {
    fontFamily: Fonts.headingBold,
    color: Colors.britishRacingGreen,
    fontSize: 18,
  },
});
