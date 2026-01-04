import React, { useRef, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  Dimensions, 
  TouchableOpacity, 
  ImageBackground, 
  StatusBar,
  Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { BlurView } from 'expo-blur';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

const { width, height } = Dimensions.get('window');
const CARD_HEIGHT = 160;
const SPACING = 20;

const CATEGORIES = [
  {
    id: 'compass',
    title: 'The Pathfinder',
    subtitle: 'Navigating the moral landscape.',
    icon: 'compass-outline',
  },
  {
    id: 'lion',
    title: 'The Sovereign',
    subtitle: 'Leadership, command, and legacy.',
    icon: 'ribbon-outline', // Proxy for crest
  },
  {
    id: 'anchor',
    title: 'The Foundation',
    subtitle: 'Stability amidst the chaos.',
    icon: 'boat-outline', // Proxy for anchor
  },
  {
    id: 'pillar',
    title: 'The Architect',
    subtitle: 'Building a life of substance.',
    icon: 'business-outline', // Proxy for pillar
  },
  {
    id: 'key',
    title: 'The Gatekeeper',
    subtitle: 'Unlocking hidden truths.',
    icon: 'key-outline',
  },
  {
    id: 'scales',
    title: 'The Arbiter',
    subtitle: 'Judgment, balance, and fairness.',
    icon: 'git-compare-outline', // Proxy for scales
  },
  {
    id: 'diamond',
    title: 'The Paragon',
    subtitle: 'The relentless pursuit of perfection.',
    icon: 'diamond-outline',
  },
];

export default function ArchiveIndex() {
  const router = useRouter();
  const scrollY = useRef(new Animated.Value(0)).current;
  
  // Parallax Background Interpolation
  const backgroundTranslateY = scrollY.interpolate({
    inputRange: [0, height],
    outputRange: [0, -100], // Moves up slowly
    extrapolate: 'clamp',
  });

  const handleSelect = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    // Simulate "Smooth-in" transition
    // In a real app, we'd use shared element transitions.
    // Here we just navigate back to main feed or a detail screen.
    router.push('/'); 
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Parallax Background */}
      <Animated.View 
        style={[
          StyleSheet.absoluteFill, 
          { transform: [{ translateY: backgroundTranslateY }] }
        ]}
      >
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1507842217343-583bb7260b66?q=80&w=2600&auto=format&fit=crop' }} // Library image
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />
          <View style={styles.backgroundOverlay} />
        </ImageBackground>
      </Animated.View>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>THE ARCHIVE INDEX</Text>
        <View style={styles.headerLine} />
        <Text style={styles.headerSubtitle}>Select a discipline to study</Text>
      </View>

      {/* Scrollable List */}
      <Animated.ScrollView
        contentContainerStyle={styles.scrollContent}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        decelerationRate={0.9} // "Heavy" feel
      >
        {CATEGORIES.map((item, index) => (
          <ExhibitionCard 
            key={item.id} 
            item={item} 
            index={index} 
            onPress={() => handleSelect(item.id)}
          />
        ))}
        <View style={{ height: 100 }} /> 
      </Animated.ScrollView>
    </View>
  );
}

function ExhibitionCard({ item, index, onPress }: { item: any, index: number, onPress: () => void }) {
  const scale = useRef(new Animated.Value(1)).current;
  const glowOpacity = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1.02,
        useNativeDriver: true,
        friction: 5,
      }),
      Animated.timing(glowOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        friction: 5,
      }),
      Animated.timing(glowOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.cardContainer}
    >
      <Animated.View style={[styles.card, { transform: [{ scale }] }]}>
        
        {/* Glow Effect (Behind) */}
        <Animated.View style={[styles.glow, { opacity: glowOpacity }]}>
           <LinearGradient
            colors={['transparent', '#D4AF37', 'transparent']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>

        {/* Card Body */}
        <View style={styles.cardBody}>
            {/* Deckle Edge Simulation (Left Border) */}
            <View style={styles.deckleEdge} />
            
            {/* Content */}
            <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                    <Ionicons name={item.icon} size={28} color={Colors.gold} style={{ opacity: 0.8 }} />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#D4AF37" style={{ opacity: 0.5 }} />
            </View>

            {/* Gold Leaf Corner */}
            <View style={styles.goldCorner} />
        </View>

      </Animated.View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B3022', // Deep British Racing Green
  },
  backgroundImage: {
    width: width,
    height: height * 1.2, // Taller for parallax
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(27, 48, 34, 0.85)', // Green tint overlay
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    alignItems: 'center',
    zIndex: 10,
  },
  headerTitle: {
    fontFamily: Fonts.headingBold,
    fontSize: 22,
    color: '#D4AF37',
    letterSpacing: 4,
  },
  headerLine: {
    width: 40,
    height: 2,
    backgroundColor: '#D4AF37',
    marginVertical: 10,
    opacity: 0.6,
  },
  headerSubtitle: {
    fontFamily: Fonts.bodyItalic,
    fontSize: 14,
    color: '#A0A0A0',
  },
  scrollContent: {
    paddingHorizontal: SPACING,
    paddingTop: 10,
  },
  cardContainer: {
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10,
  },
  card: {
    height: 100,
    backgroundColor: '#F5F5F0', // Cream Parchment
    borderRadius: 2, // Sharp corners for paper feel
    overflow: 'visible', // Allow glow to show
  },
  glow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 2,
    zIndex: -1,
    transform: [{ scale: 1.05 }], // Slightly larger than card
  },
  cardBody: {
    flex: 1,
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  deckleEdge: {
    width: 4,
    height: '100%',
    backgroundColor: '#E8E8E0',
    borderRightWidth: 1,
    borderRightColor: 'rgba(0,0,0,0.1)',
    borderStyle: 'dashed', // Rough edge simulation
  },
  cardContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  cardTitle: {
    fontFamily: Fonts.headingBold,
    fontSize: 18,
    color: '#004225', // Deep Green Ink
    marginBottom: 4,
  },
  cardSubtitle: {
    fontFamily: Fonts.body,
    fontSize: 13,
    color: '#886F30', // Muted Gold
  },
  goldCorner: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 20,
    height: 20,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderColor: '#D4AF37',
    opacity: 0.6,
  },
});
