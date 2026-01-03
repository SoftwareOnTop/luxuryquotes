import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import { Colors } from '../../constants/Colors';
import { Fonts } from '../../constants/Fonts';
import OakLeafStreak from '../../components/OakLeafStreak';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
const ITEM_WIDTH = (width - 60) / 2;

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        
        <View style={styles.header}>
          <Text style={styles.headerTitle}>The Personal Archive</Text>
          <Text style={styles.subHeader}>Collected Wisdom</Text>
        </View>

        <OakLeafStreak days={5} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Saved Portraits</Text>
          <View style={styles.grid}>
            {[1, 2, 3, 4].map((item) => (
              <View key={item} style={styles.gridItem}>
                <View style={styles.placeholderImage}>
                  <Ionicons name="image-outline" size={32} color={Colors.gold} />
                </View>
                <Text style={styles.itemTitle}>Collection {item}</Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.cream,
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: Fonts.heading,
    fontSize: 28,
    color: Colors.britishRacingGreen,
    marginBottom: 8,
  },
  subHeader: {
    fontFamily: Fonts.subheadingItalic,
    fontSize: 18,
    color: Colors.text.secondary,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontFamily: Fonts.bodyBold,
    fontSize: 18,
    color: Colors.oxblood,
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: ITEM_WIDTH,
    marginBottom: 20,
  },
  placeholderImage: {
    width: '100%',
    height: ITEM_WIDTH * 1.5,
    backgroundColor: Colors.offWhite,
    borderWidth: 1,
    borderColor: Colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemTitle: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.text.primary,
    textAlign: 'center',
  },
});
