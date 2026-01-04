import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';

interface TheStreakSaverProps {
  active: boolean;
  onChange: (active: boolean) => void;
}

const LEVER_RANGE = 80; // degrees

export default function TheStreakSaver({ active, onChange }: TheStreakSaverProps) {
  const leverRotation = useSharedValue(active ? LEVER_RANGE : 0);

  const handleToggle = async () => {
    const newState = !active;
    leverRotation.value = withSpring(newState ? LEVER_RANGE : 0);
    onChange(newState);
    
    // Heavy haptic feedback
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  };

  const leverAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${leverRotation.value}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.description}>Activate mechanical streak preservation</Text>
      
      <TouchableOpacity 
        style={styles.leverWrapper}
        onPress={handleToggle}
        activeOpacity={0.8}
      >
        <View style={styles.leverBase}>
          {/* Base Plate */}
          <View style={styles.basePlate} />
          
          {/* Brass Hinge */}
          <View style={styles.hinge} />
          
          {/* Lever */}
          <Animated.View 
            style={[styles.leverContainer, leverAnimatedStyle]}
          >
            <View style={styles.lever} />
            
            {/* Lever Top Knob */}
            <View style={styles.leverKnob} />
          </Animated.View>

          {/* Engagement Indicator */}
          <View style={[
            styles.indicator,
            active && styles.indicatorActive,
          ]}>
            <View style={styles.indicatorDot} />
          </View>
        </View>
      </TouchableOpacity>

      {/* Status */}
      <View style={styles.statusContainer}>
        <Text style={[
          styles.statusText,
          active && styles.statusActive,
        ]}>
          {active ? '✓ PROTECTED' : '○ INACTIVE'}
        </Text>
      </View>
    </View>
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
  leverWrapper: {
    alignItems: 'center',
    marginVertical: 20,
  },
  leverBase: {
    width: 200,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  basePlate: {
    position: 'absolute',
    bottom: 20,
    width: 180,
    height: 8,
    backgroundColor: '#B8860B',
    borderRadius: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },
  hinge: {
    position: 'absolute',
    bottom: 27,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#D4AF37',
    borderWidth: 2,
    borderColor: '#B8860B',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 5,
  },
  leverContainer: {
    position: 'absolute',
    bottom: 33,
    width: 120,
    height: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  lever: {
    width: 14,
    height: 70,
    backgroundColor: '#B8860B',
    borderRadius: 7,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  leverKnob: {
    position: 'absolute',
    top: -8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#D4AF37',
    borderWidth: 2,
    borderColor: '#B8860B',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  indicator: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.offWhite,
    borderWidth: 2,
    borderColor: Colors.text.secondary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorActive: {
    backgroundColor: Colors.gold,
    borderColor: Colors.gold,
  },
  indicatorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.britishRacingGreen,
  },
  statusContainer: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.offWhite,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: Colors.text.secondary,
  },
  statusText: {
    fontFamily: Fonts.headingBold,
    fontSize: 12,
    color: Colors.text.secondary,
    letterSpacing: 1,
  },
  statusActive: {
    color: Colors.britishRacingGreen,
    borderLeftColor: Colors.gold,
  },
});
