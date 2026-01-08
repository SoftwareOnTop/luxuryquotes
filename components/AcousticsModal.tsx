import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { useState, useEffect } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, runOnJS } from 'react-native-reanimated';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';

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

  const sliderWidth = width - 80;
  const knobPosition = useSharedValue(currentVolume * sliderWidth);

  // Sync knob position when volume changes externally (e.g. initial load)
  useEffect(() => {
    if (visible) {
      knobPosition.value = withSpring(currentVolume * sliderWidth, {
        damping: 20,
        stiffness: 90,
      });
    }
  }, [visible, currentVolume, sliderWidth]);

  const pan = Gesture.Pan()
    .onBegin(() => {
      // Visual feedback on touch start
    })
    .onChange((e) => {
      let newPos = e.x;
      if (newPos < 0) newPos = 0;
      if (newPos > sliderWidth) newPos = sliderWidth;
      knobPosition.value = newPos;
    })
    .onEnd(() => {
      // Update volume only when gesture ends
      runOnJS(onVolumeChange)(knobPosition.value / sliderWidth);
      runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light);
    });

  const knobStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: knobPosition.value }],
    };
  });

  const fillStyle = useAnimatedStyle(() => {
    return {
      width: `${(knobPosition.value / sliderWidth) * 100}%`,
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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
          
          <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>The Orchestration</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={26} color="#000000" />
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Master Volume</Text>
            <View style={styles.sliderContainer}>
              <View style={styles.track} />
              <Animated.View style={[styles.fill, fillStyle]} />
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
      </GestureHandlerRootView>
    </Modal>
  );
}

function AtmosphereOption({ label, active, onPress, icon }: { label: string, active: boolean, onPress: () => void, icon: any }) {
  return (
    <TouchableOpacity 
      style={[styles.option, active && styles.optionActive]} 
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.optionContent}>
        <Ionicons name={icon} size={22} color={active ? '#FFFFFF' : '#666666'} />
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
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 28,
    paddingBottom: 0,
  },
  title: {
    fontFamily: Fonts.headingBold,
    fontSize: 24,
    color: '#000000',
  },
  closeButton: {
    padding: 4,
  },
  section: {
    marginBottom: 28,
  },
  sectionTitle: {
    fontFamily: Fonts.headingBold,
    fontSize: 16,
    color: '#000000',
    marginBottom: 20,
  },
  sliderContainer: {
    height: 40,
    justifyContent: 'center',
  },
  track: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    width: '100%',
    position: 'absolute',
  },
  fill: {
    height: 6,
    backgroundColor: '#000000',
    borderRadius: 3,
    position: 'absolute',
    left: 0,
  },
  knobContainer: {
    position: 'absolute',
    left: -16,
  },
  knob: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 3,
    borderColor: '#000000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 4,
  },
  togglesContainer: {
    gap: 12,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 18,
    backgroundColor: '#FAFAFA',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 16,
  },
  optionActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  optionLabel: {
    fontFamily: Fonts.body,
    fontSize: 16,
    color: '#333333',
  },
  optionLabelActive: {
    color: '#FFFFFF',
    fontFamily: Fonts.headingBold,
  },
  activeIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
  },
});
