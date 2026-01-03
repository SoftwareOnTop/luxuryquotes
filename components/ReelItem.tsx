import { ResizeMode, Video } from 'expo-av';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { useRef, useState, useCallback } from 'react';
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
    videoUrl: string;
    title: string;
    description: string;
  };
  isActive: boolean;
}

export default function ReelItem({ item, isActive }: ReelItemProps) {
  const video = useRef<Video>(null);
  const [status, setStatus] = useState({});
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
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: item.videoUrl,
          }}
          useNativeControls={false}
          resizeMode={ResizeMode.COVER}
          isLooping
          shouldPlay={isActive}
          onPlaybackStatusUpdate={status => setStatus(() => status)}
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

        <View style={styles.actionsContainer}>
          {/* Like Button */}
          <TouchableOpacity style={styles.actionButton} onPress={handleLikePress}>
            <Ionicons 
              name={isLiked ? "heart" : "heart-outline"} 
              size={32} 
              color={isLiked ? Colors.gold : Colors.cream} 
            />
            <Text style={styles.actionText}>{isLiked ? "Liked" : "Like"}</Text>
          </TouchableOpacity>

          {/* Bookmark Button */}
          <TouchableOpacity style={styles.actionButton} onPress={handleBookmarkPress}>
            <Ionicons 
              name={isBookmarked ? "bookmark" : "bookmark-outline"} 
              size={32} 
              color={isBookmarked ? Colors.gold : Colors.cream} 
            />
            <Text style={styles.actionText}>Save</Text>
          </TouchableOpacity>

          {/* Theme Button - Signet Ring */}
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.signetRing}>
               <Ionicons name="disc-outline" size={24} color={Colors.gold} />
            </View>
            <Text style={styles.actionText}>Theme</Text>
          </TouchableOpacity>

          {/* Share Button - The Wax Seal */}
          <TouchableOpacity style={styles.actionButton} onPress={handleSharePress}>
            <Animated.View style={[styles.waxSeal, sealAnimatedStyle]}>
              <Ionicons name="ribbon" size={24} color="#3e0000" />
            </Animated.View>
            <Text style={styles.actionText}>Share</Text>
          </TouchableOpacity>
        </View>
      </View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height - 80, // Adjust for tab bar height roughly
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
    bottom: 40,
    left: 20,
    right: 80,
  },
  title: {
    fontFamily: Fonts.headingBold,
    color: Colors.cream,
    fontSize: 28,
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  description: {
    fontFamily: Fonts.body,
    color: Colors.champagneGold,
    fontSize: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  actionsContainer: {
    position: 'absolute',
    bottom: 40,
    right: 10,
    alignItems: 'center',
  },
  actionButton: {
    marginBottom: 20,
    alignItems: 'center',
  },
  signetRing: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  waxSeal: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#800000', // Wax Red
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#600000',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  actionText: {
    fontFamily: Fonts.body,
    color: Colors.cream,
    fontSize: 10,
    marginTop: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
