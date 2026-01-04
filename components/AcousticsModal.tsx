import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const { width } = Dimensions.get('window');

interface AcousticsModalProps {
  visible: boolean;
  onClose: () => void;
  currentVolume: number;
  currentAtmosphere: string;
  onVolumeChange: (volume: number) => void;
  onAtmosphereChange: (atmosphere: string) => void;
}

type Atmosphere = 'silence' | 'study' | 'sonata';

export default function AcousticsModal({ 
  visible, 
  onClose, 
  currentVolume, 
  currentAtmosphere, 
  onVolumeChange, 
  onAtmosphereChange 
}: AcousticsModalProps) {

  const handleVolumeChange = (newVolume: number) => {
    onVolumeChange(newVolume);
    if (Math.random() > 0.8) { // Don't vibrate on every single frame
       Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const sliderWidth = width - 80;
  const knobPosition = useSharedValue(currentVolume * sliderWidth);

  // Sync knob position when volume changes externally (e.g. initial load)
  if (visible && Math.abs(knobPosition.value - currentVolume * sliderWidth) > 10) {
      knobPosition.value = currentVolume * sliderWidth;
  }

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      let newPos = e.x;
      if (newPos < 0) newPos = 0;
      if (newPos > sliderWidth) newPos = sliderWidth;
      knobPosition.value = newPos;
      runOnJS(handleVolumeChange)(newPos / sliderWidth);
    });

  const knobStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: knobPosition.value }],
    };
  });

  const handleAtmosphereChange = (newAtmosphere: Atmosphere) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    onAtmosphereChange(newAtmosphere);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>The Orchestration</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={Colors.oxblood} />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Master Volume</Text>
            <View style={styles.sliderContainer}>
              <View style={styles.track} />
              <View style={[styles.fill, { width: `${currentVolume * 100}%` }]} />
              <GestureDetector gesture={pan}>
                <Animated.View style={[styles.knobContainer, knobStyle]}>
                  <View style={styles.knob} />
                </Animated.View>
              </GestureDetector>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Atmosphere</Text>
            <View style={styles.togglesContainer}>
              <AtmosphereOption 
                label="The Silence" 
                active={currentAtmosphere === 'silence'} 
                onPress={() => handleAtmosphereChange('silence')}
                icon="volume-mute-outline"
              />
              <AtmosphereOption 
                label="The Study" 
                active={currentAtmosphere === 'study'} 
                onPress={() => handleAtmosphereChange('study')}
                icon="book-outline"
              />
              <AtmosphereOption 
                label="The Sonata" 
                active={currentAtmosphere === 'sonata'} 
                onPress={() => handleAtmosphereChange('sonata')}
                icon="musical-notes-outline"
              />
            </View>
          </View>

        </View>
      </View>
    </Modal>
  );
}

function AtmosphereOption({ label, active, onPress, icon }: { label: string, active: boolean, onPress: () => void, icon: any }) {
  return (
    <TouchableOpacity 
      style={[styles.option, active && styles.optionActive]} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <View style={styles.optionContent}>
        <Ionicons name={icon} size={20} color={active ? Colors.gold : Colors.oxblood} />
        <Text style={[styles.optionLabel, active && styles.optionLabelActive]}>{label}</Text>
      </View>
      {active && <View style={styles.activeIndicator} />}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    width: width * 0.9,
    backgroundColor: Colors.cream,
    borderRadius: 2,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.gold,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 175, 55, 0.3)',
    paddingBottom: 16,
  },
  title: {
    fontFamily: Fonts.headingBold,
    fontSize: 24,
    color: Colors.britishRacingGreen,
  },
  closeButton: {
    padding: 4,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontFamily: Fonts.bodyItalic,
    fontSize: 16,
    color: Colors.text.secondary,
    marginBottom: 16,
  },
  sliderContainer: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: 4,
    backgroundColor: '#E0D8C0',
    borderRadius: 2,
    width: '100%',
    position: 'absolute',
  },
  fill: {
    height: 4,
    backgroundColor: Colors.britishRacingGreen,
    borderRadius: 2,
    position: 'absolute',
    left: 0,
  },
  knobContainer: {
    position: 'absolute',
    left: -15, // Center the 30px knob
  },
  knob: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FDFBF7', // Ivory
    borderWidth: 1,
    borderColor: '#D4AF37', // Gold
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  togglesContainer: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
    borderRadius: 2,
  },
  optionActive: {
    backgroundColor: Colors.britishRacingGreen,
    borderColor: Colors.gold,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionLabel: {
    fontFamily: Fonts.body,
    fontSize: 16,
    color: Colors.text.primary,
  },
  optionLabelActive: {
    color: Colors.gold,
    fontFamily: Fonts.bodyBold,
  },
  activeIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.gold,
  },
});
