import { View, FlatList, StyleSheet, TouchableOpacity, Dimensions, Animated, Easing, ImageBackground, ViewToken } from 'react-native';
import { Colors } from '../../constants/Colors';
import ReelItem from '../../components/ReelItem';
import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import { useRouter } from 'expo-router';
import { getBackdrop, subscribeBackdrop } from '../../constants/BackdropStore';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '../../constants/Fonts';
import { getQuotes, subscribeQuotes } from '../../constants/QuoteStore';
import * as Haptics from 'expo-haptics';
import ProfileModal from '../../components/ProfileModal';
import SettingsModal from '../../components/SettingsModal';

const { height } = Dimensions.get('window');

export default function ReelsScreen() {
  const [backdrop, setBackdrop] = useState(getBackdrop());
  const [quotes, setQuotes] = useState(getQuotes());
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);
  const menuAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      setCurrentIndex(viewableItems[0].index);
      // Reset button states when changing quotes
      setIsLiked(false);
      setIsBookmarked(false);
    }
  }, []);

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  useEffect(() => {
    const unsubscribe = subscribeBackdrop((uri) => setBackdrop(uri));
    return unsubscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeQuotes(({ quotes: nextQuotes }) => {
      setQuotes(nextQuotes);
    });
    return unsubscribe;
  }, []);

  const data = useMemo(
    () => quotes.map((q) => ({ ...q, imageUrl: q.imageUrl || backdrop })),
    [quotes, backdrop]
  );

  const goCategories = () => router.push('/categories');
  const goThemes = () => router.push('/visual-folio');
  const closeMenu = () => setMenuOpen(false);

  const handleLike = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsLiked(!isLiked);
  };

  const handleBookmark = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setIsBookmarked(!isBookmarked);
  };

  const handleShare = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    // Share logic here
  };

  useEffect(() => {
    Animated.timing(menuAnim, {
      toValue: menuOpen ? 1 : 0,
      duration: 260,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();
  }, [menuOpen, menuAnim]);

  return (
    <View style={styles.container}>
      {/* Static Background Layer */}
      <ImageBackground
        source={{ uri: backdrop }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
      </ImageBackground>

      {/* Transparent Quote Content */}
      <FlatList
        data={data}
        renderItem={({ item, index }) => <ReelItem item={item} isActive={index === currentIndex} />}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={height}
        snapToAlignment="start"
        getItemLayout={(_, index) => ({ length: height, offset: height * index, index })}
        bounces={false}
        removeClippedSubviews
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        style={styles.flatList}
      />

      {/* Static UI Overlay */}
      <TouchableOpacity style={styles.iconButtonLeft} onPress={goCategories}>
        <Ionicons name="grid-outline" size={24} color="#FFF" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButtonRight} onPress={goThemes}>
        <Ionicons name="color-palette-outline" size={24} color="#FFF" />
      </TouchableOpacity>
      {/* Static Action Buttons */}
      <View style={styles.actionsBar}>
        <TouchableOpacity style={[styles.pillButton, styles.pillLeft]} onPress={handleBookmark}>
          <Ionicons
            name={isBookmarked ? 'bookmark' : 'bookmark-outline'}
            size={24}
            color={isBookmarked ? '#FFD700' : '#FFF'}
          />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.pillButton, styles.pillCenter]} onPress={handleLike}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={28}
            color={isLiked ? '#FF4500' : '#FFF'}
          />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.pillButton, styles.pillRight]} onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.fabContainer} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.fab}
          activeOpacity={0.9}
          onPress={() => setMenuOpen((o) => !o)}
        >
          <Ionicons name={menuOpen ? 'close' : 'ellipsis-horizontal'} size={24} color="#FFF" />
        </TouchableOpacity>

        <Animated.View
          pointerEvents={menuOpen ? 'auto' : 'none'}
          style={styles.fabMenu}
        >
          <Animated.View
            style={{
              position: 'absolute',
              transform: [
                { translateX: menuAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -70] }) },
                { translateY: menuAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 60] }) },
                { rotate: menuAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '0deg'] }) },
              ],
              opacity: menuAnim,
            }}
          >
            <TouchableOpacity
              style={styles.menuIconButton}
              onPress={() => { closeMenu(); setProfileModalVisible(true); }}
              accessibilityLabel="Open Archive"
            >
              <Ionicons name="library-outline" size={18} color="#FFF" />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={{
              position: 'absolute',
              transform: [
                { translateX: menuAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 50] }) },
                { translateY: menuAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 60] }) },
                { rotate: menuAnim.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '0deg'] }) },
              ],
              opacity: menuAnim,
            }}
          >
            <TouchableOpacity
              style={styles.menuIconButton}
              onPress={() => { closeMenu(); setSettingsModalVisible(true); }}
              accessibilityLabel="Open Settings"
            >
              <Ionicons name="wine-outline" size={18} color="#FFF" />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>

      <ProfileModal visible={profileModalVisible} onClose={() => setProfileModalVisible(false)} />
      <SettingsModal 
        visible={settingsModalVisible} 
        onClose={() => setSettingsModalVisible(false)}
        onLogout={() => router.replace('/login')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.britishRacingGreen,
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(66, 37, 0, 0.1)',
  },
  flatList: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  iconButtonLeft: {
    position: 'absolute',
    top: 50,
    left: 20,
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 20,
  },
  iconButtonRight: {
    position: 'absolute',
    top: 50,
    right: 20,
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 20,
  },
  fabContainer: {
    position: 'absolute',
    left: '50%',
    top: 50,
    width: 44,
    height: 44,
    marginLeft: -22,
    zIndex: 30,
  },
  fab: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 30,
  },
  fabMenu: {
    position: 'absolute',
    left: 22,
    top: 22,
    width: 0,
    height: 0,
  },
  menuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuIconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontFamily: Fonts.body,
    color: Colors.cream,
    fontSize: 12,
  },
  actionsBar: {
    position: 'absolute',
    bottom: 50,
    left: 24,
    right: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 30,
  },
  pillButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    // Modern soft shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5.46,
    elevation: 9,
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
