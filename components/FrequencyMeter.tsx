import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { useEffect } from 'react';

interface FrequencyMeterProps {
  value: number;
  onChange: (value: number) => void;
}

const { width } = Dimensions.get('window');
const GAUGE_WIDTH = width - 80;
const NEEDLE_LENGTH = 100;

export default function FrequencyMeter({ value, onChange }: FrequencyMeterProps) {
  const needleRotation = useSharedValue(0);

  // Convert value (1-10) to rotation (-90 to 90 degrees)
  const updateNeedle = (newValue: number) => {
    const rotation = interpolate(newValue, [1, 10], [-90, 90], Extrapolate.CLAMP);
    needleRotation.value = withSpring(rotation);
  };

  useEffect(() => {
    updateNeedle(value);
  }, [value]);

  const needleAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${needleRotation.value}deg` }],
    };
  });

  const handleGesture = (x: number) => {
    // Map touch position directly to value 1-10
    // Left side of screen -> 1
    // Right side of screen -> 10
    // Using a range with some padding to make it easier to hit extremes
    let newValue = interpolate(
      x,
      [40, width - 40],
      [1, 10],
      Extrapolate.CLAMP
    );
    
    newValue = Math.round(newValue);
    
    if (newValue !== value) {
      onChange(newValue);
      Haptics.selectionAsync();
    }
  };

  const pan = Gesture.Pan()
    .onUpdate((event) => {
      runOnJS(handleGesture)(event.x);
    });

  return (
    <GestureDetector gesture={pan}>
      <View style={styles.container}>
        <Text style={styles.description}>Daily notification frequency</Text>
        
        <View style={styles.gaugeContainer}>
          {/* Gauge Background */}
          <View style={styles.gaugeBackground}>
            {/* Left Arc */}
            <View style={styles.arcLeft} />
            
            {/* Needle */}
            <Animated.View 
              style={[styles.needleContainer, needleAnimatedStyle]}
            >
              <View style={styles.needle} />
            </Animated.View>

            {/* Right Arc */}
            <View style={styles.arcRight} />
          </View>

          {/* Value Display */}
          <View style={styles.valueDisplay}>
            <Text style={styles.valueNumber}>{value}</Text>
            <Text style={styles.valueLabel}>per day</Text>
          </View>
        </View>

        {/* Scale Markers */}
        <View style={styles.scaleContainer}>
          <Text style={styles.scaleMark}>1</Text>
          <Text style={styles.scaleMark}>3</Text>
          <Text style={styles.scaleMark}>5</Text>
          <Text style={styles.scaleMark}>7</Text>
          <Text style={styles.scaleMark}>10</Text>
        </View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  description: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 16,
    opacity: 0.8,
  },
  gaugeContainer: {
    width: GAUGE_WIDTH,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gaugeBackground: {
    width: GAUGE_WIDTH,
    height: 120,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  arcLeft: {
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: GAUGE_WIDTH / 2,
    height: 60,
    borderBottomLeftRadius: GAUGE_WIDTH / 2,
    borderWidth: 2,
    borderColor: Colors.gold,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  arcRight: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: GAUGE_WIDTH / 2,
    height: 60,
    borderBottomRightRadius: GAUGE_WIDTH / 2,
    borderWidth: 2,
    borderColor: Colors.gold,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  needleContainer: {
    position: 'absolute',
    bottom: -NEEDLE_LENGTH, // Pivot point at the center of this container
    width: 2,
    height: NEEDLE_LENGTH * 2, // Double height to center the pivot
    zIndex: 10,
    justifyContent: 'flex-start', // Needle occupies the top half
    alignItems: 'center',
  },
  needle: {
    width: 4, // Slightly thicker for better visibility
    height: NEEDLE_LENGTH,
    backgroundColor: Colors.oxblood,
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  valueDisplay: {
    alignItems: 'center',
    marginTop: 16,
  },
  valueNumber: {
    fontFamily: Fonts.headingBold,
    fontSize: 36,
    color: Colors.britishRacingGreen,
  },
  valueLabel: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 4,
  },
  scaleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: GAUGE_WIDTH,
    marginTop: 12,
    paddingHorizontal: 12,
  },
  scaleMark: {
    fontFamily: Fonts.body,
    fontSize: 11,
    color: Colors.text.secondary,
    opacity: 0.6,
  },
});
