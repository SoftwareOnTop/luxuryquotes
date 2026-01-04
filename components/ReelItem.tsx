import { StyleSheet, View, Text, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { useCallback, useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withSpring, 
  withSequence,
  withTiming,
  withDelay,
  runOnJS
} from 'react-native-reanimated';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

interface ReelItemProps {
  item: {
    id: string;
    imageUrl: string;
    title: string;
    description: string;
  };
  isActive: boolean;
}

export default function ReelItem({ item, isActive }: ReelItemProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  // Animation values
  const heartScale = useSharedValue(0);
  const sealScale = useSharedValue(1);

  const onDoubleTap = useCallback(() => {
    setIsLiked(true);
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

  const handleLikePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsLiked(!isLiked);
  };

  const handleBookmarkPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsBookmarked(!isBookmarked);
  };

  const handleSharePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    // "Break" the seal animation
    sealScale.value = withSequence(
      withTiming(1.2, { duration: 100 }),
      withTiming(1, { duration: 100 })
    );
    // Open share menu logic here
  };

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: Math.max(heartScale.value, 0) }],
  }));

  const sealAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: sealScale.value }],
  }));

  return (
    <GestureDetector gesture={doubleTapGesture}>
      <View style={styles.container}>
        <ImageBackground
          source={{ uri: item.imageUrl }}
          style={styles.video}
          resizeMode="cover"
          blurRadius={isActive ? 0 : 1}
        />
        
        {/* Grain/Filter Overlay */}
        <View style={styles.overlay} />

        {/* Big Heart Animation */}
        <View style={styles.centerHeartContainer}>
          <Animated.View style={[styles.centerHeart, heartAnimatedStyle]}>
            <Ionicons name="heart" size={100} color={Colors.cream} />
          </Animated.View>
        </View>

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>

        <View style={styles.actionsBar}>
          <TouchableOpacity style={[styles.pillButton, styles.pillLeft]} onPress={handleBookmarkPress}>
            <Ionicons
              name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
              size={20}
              color={isBookmarked ? Colors.gold : Colors.cream}
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.pillButton, styles.pillCenter]} onPress={handleLikePress}>
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              size={22}
              color={isLiked ? Colors.gold : Colors.cream}
            />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.pillButton, styles.pillRight]} onPress={handleSharePress}>
            <Animated.View style={sealAnimatedStyle}>
              <Ionicons name="share-social-outline" size={20} color={Colors.cream} />
            </Animated.View>
          </TouchableOpacity>
        </View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: Colors.britishRacingGreen,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(66, 37, 0, 0.1)', // Sepia/Warm tint
  },
  centerHeartContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 20,
    pointerEvents: 'none',
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
  actionsBar: {
    position: 'absolute',
    bottom: 36,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 30,
  },
  pillButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: Colors.gold,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
  },
  pillLeft: {
    alignSelf: 'flex-end',
  },
  pillCenter: {
    alignSelf: 'center',
    marginHorizontal: 16,
  },
  pillRight: {
    alignSelf: 'flex-end',
  },
});
