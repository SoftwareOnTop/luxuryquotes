import { View, FlatList, StyleSheet, TouchableOpacity, Dimensions, Text, Animated, Easing } from 'react-native';
import { Colors } from '../../constants/Colors';
import ReelItem from '../../components/ReelItem';
import { useEffect, useMemo, useState, useRef } from 'react';
import { useRouter } from 'expo-router';
import { getBackdrop, subscribeBackdrop } from '../../constants/BackdropStore';
import { Ionicons } from '@expo/vector-icons';
import { Fonts } from '../../constants/Fonts';

const { height } = Dimensions.get('window');

const QUOTES = [
  {
    id: 'estate',
    title: 'Estate Dawn',
    description: '"Discipline is the dividend that compounds quietly."',
  },
  {
    id: 'ledger',
    title: 'Ledger Room',
    description: '"Old money is just new money that learned to stay home."',
  },
  {
    id: 'oak',
    title: 'Oak Study',
    description: '"Wealth is restraint stitched into habit."',
  },
  {
    id: 'club',
    title: 'Heritage Club',
    description: '"Taste whispers where excess shouts."',
  },
  {
    id: 'vault',
    title: 'Vault Light',
    description: '"Liquidity loves patience; so do heirs."',
  },
];

export default function ReelsScreen() {
  const [backdrop, setBackdrop] = useState(getBackdrop());
  const [menuOpen, setMenuOpen] = useState(false);
  const menuAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = subscribeBackdrop((uri) => setBackdrop(uri));
    return unsubscribe;
  }, []);

  const data = useMemo(
    () => QUOTES.map((q) => ({ ...q, imageUrl: backdrop })),
    [backdrop]
  );

  const goArchive = () => router.push('/profile');
  const goCategories = () => router.push('/categories');
  const goThemes = () => router.push('/visual-folio');
  const goGovernance = () => router.push('/settings');
  const closeMenu = () => setMenuOpen(false);

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
      <TouchableOpacity style={styles.iconButtonLeft} onPress={goCategories}>
        <Ionicons name="apps-outline" size={18} color={Colors.gold} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButtonRight} onPress={goThemes}>
        <Ionicons name="images-outline" size={18} color={Colors.gold} />
      </TouchableOpacity>
      <View style={styles.fabContainer} pointerEvents="box-none">
        <TouchableOpacity
          style={styles.fab}
          activeOpacity={0.9}
          onPress={() => setMenuOpen((o) => !o)}
        >
          <Ionicons name={menuOpen ? 'close' : 'ellipsis-vertical'} size={18} color={Colors.gold} />
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
                { translateY: menuAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 30] }) },
                { rotate: menuAnim.interpolate({ inputRange: [0, 1], outputRange: ['30deg', '0deg'] }) },
              ],
              opacity: menuAnim,
            }}
          >
            <TouchableOpacity
              style={styles.menuIconButton}
              onPress={() => { closeMenu(); goArchive(); }}
              accessibilityLabel="Open Archive"
            >
              <Ionicons name="person-circle-outline" size={18} color={Colors.gold} />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={{
              position: 'absolute',
              transform: [
                { translateX: menuAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -60] }) },
                { translateY: menuAnim.interpolate({ inputRange: [0, 1], outputRange: [0, -70] }) },
                { rotate: menuAnim.interpolate({ inputRange: [0, 1], outputRange: ['25deg', '0deg'] }) },
              ],
              opacity: menuAnim,
            }}
          >
            <TouchableOpacity
              style={styles.menuIconButton}
              onPress={() => { closeMenu(); goGovernance(); }}
              accessibilityLabel="Open Governance"
            >
              <Ionicons name="settings-outline" size={18} color={Colors.gold} />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={{
              position: 'absolute',
              transform: [
                { translateX: menuAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 70] }) },
                { translateY: menuAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 30] }) },
                { rotate: menuAnim.interpolate({ inputRange: [0, 1], outputRange: ['-30deg', '0deg'] }) },
              ],
              opacity: menuAnim,
            }}
          >
            <TouchableOpacity
              style={styles.menuIconButton}
              onPress={closeMenu}
              accessibilityLabel="Return"
            >
              <Ionicons name="arrow-back-circle-outline" size={18} color={Colors.gold} />
            </TouchableOpacity>
          </Animated.View>
        </Animated.View>
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => <ReelItem item={item} isActive />}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={height}
        snapToAlignment="start"
        getItemLayout={(_, index) => ({ length: height, offset: height * index, index })}
        bounces={false}
        removeClippedSubviews
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.britishRacingGreen,
    paddingTop: 0,
  },
  iconButtonLeft: {
    position: 'absolute',
    top: 40,
    left: 16,
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: Colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    zIndex: 20,
  },
  iconButtonRight: {
    position: 'absolute',
    top: 40,
    right: 16,
    width: 38,
    height: 38,
    borderRadius: 19,
    borderWidth: 1,
    borderColor: Colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.25)',
    zIndex: 20,
  },
  fabContainer: {
    position: 'absolute',
    right: 16,
    top: '42%',
    width: 44,
    height: 44,
    zIndex: 30,
  },
  fab: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: Colors.gold,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 30,
  },
  fabMenu: {
    position: 'absolute',
    right: 22,
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
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.gold,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuText: {
    fontFamily: Fonts.body,
    color: Colors.cream,
    fontSize: 12,
  },
});
