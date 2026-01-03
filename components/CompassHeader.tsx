import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withTiming,
  Easing
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

const CATEGORIES = ['Legacy', 'Opulence', 'Vitality'];

interface CompassHeaderProps {
  onCategoryChange: (category: string) => void;
}

export default function CompassHeader({ onCategoryChange }: CompassHeaderProps) {
  const [currentIndex, setCurrentIndex] = useState(1); // Start with Opulence (Luxury)
  const rotation = useSharedValue(0);

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const nextIndex = (currentIndex + 1) % CATEGORIES.length;
    setCurrentIndex(nextIndex);
    onCategoryChange(CATEGORIES[nextIndex]);
    
    // Rotate compass
    rotation.value = withSpring(rotation.value + 120);
  };

  const compassStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} style={styles.compassContainer}>
        <Animated.View style={[styles.compassIcon, compassStyle]}>
          <Ionicons name="compass-outline" size={32} color={Colors.gold} />
        </Animated.View>
      </TouchableOpacity>
      
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>
          {CATEGORIES[currentIndex].toUpperCase()}
        </Text>
        <View style={styles.separator} />
        <Text style={styles.subText}>COLLECTION</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compassContainer: {
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  compassIcon: {
    // Animated rotation applies here
  },
  categoryContainer: {
    alignItems: 'center',
  },
  categoryText: {
    fontFamily: Fonts.headingBold,
    color: Colors.cream,
    fontSize: 16,
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  separator: {
    width: 20,
    height: 1,
    backgroundColor: Colors.gold,
    marginVertical: 4,
  },
  subText: {
    fontFamily: Fonts.body,
    color: Colors.champagneGold,
    fontSize: 10,
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
});
