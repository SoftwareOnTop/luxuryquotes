import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { useCallback, useEffect } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withSequence,
  withTiming,
  withDelay,
  runOnJS,
  FadeIn,
  FadeOut
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface ReelItemProps {
  item: {
    id: string;
    imageUrl?: string;
    title: string;
    description: string;
  };
  isActive: boolean;
}

export default function ReelItem({ item, isActive }: ReelItemProps) {
  // Animation values for double-tap heart
  const heartScale = useSharedValue(0);
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withTiming(isActive ? 1 : 0.3, { duration: 300 });
  }, [isActive]);

  const onDoubleTap = useCallback(() => {
    heartScale.value = withSequence(
      withSpring(1),
      withDelay(500, withTiming(0))
    );
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  const doubleTapGesture = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd(() => {
      runOnJS(onDoubleTap)();
    });

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(heartScale.value, 0) }],
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <GestureDetector gesture={doubleTapGesture}>
      <View style={styles.container}>
        {/* Big Heart Animation */}
        <View style={styles.centerHeartContainer} pointerEvents="none">
          <Animated.View style={[styles.centerHeart, heartAnimatedStyle]}>
            <Ionicons name="heart" size={100} color={Colors.cream} />
          </Animated.View>
        </View>

        {/* Text Content with Fade Animation */}
        <Animated.View style={[styles.contentContainer, contentAnimatedStyle]}>
          <Animated.Text 
            entering={FadeIn.duration(400)} 
            exiting={FadeOut.duration(200)}
            style={styles.title}
          >
            {item.title}
          </Animated.Text>
          <Animated.Text 
            entering={FadeIn.duration(400).delay(100)} 
            exiting={FadeOut.duration(200)}
            style={styles.description}
          >
            {item.description}
          </Animated.Text>
        </Animated.View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerHeartContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
  },
  centerHeart: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  contentContainer: {
    position: 'absolute',
    top: '40%',
    left: 24,
    right: 24,
    alignItems: 'center',
  },
  title: {
    fontFamily: Fonts.headingBold,
    color: Colors.cream,
    fontSize: 30,
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.65)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
    textAlign: 'center',
  },
  description: {
    fontFamily: Fonts.body,
    color: Colors.champagneGold,
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.65)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 6,
    textAlign: 'center',
  },
});
