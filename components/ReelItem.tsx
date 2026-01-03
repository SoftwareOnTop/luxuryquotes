import { ResizeMode, Video } from 'expo-av';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { useRef, useState } from 'react';

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

  return (
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

      <View style={styles.contentContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>

      <View style={styles.actionsContainer}>
        {/* Theme Button - Signet Ring */}
        <TouchableOpacity style={styles.actionButton}>
          <View style={styles.signetRing}>
             <Ionicons name="disc-outline" size={24} color={Colors.gold} />
          </View>
          <Text style={styles.actionText}>Theme</Text>
        </TouchableOpacity>

        {/* Share Button - Coat of Arms */}
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="shield-outline" size={32} color={Colors.cream} />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  actionText: {
    fontFamily: Fonts.body,
    color: Colors.cream,
    fontSize: 10,
    marginTop: 4,
  },
});
