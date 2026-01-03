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

        {/* The Morning Call - Streak Reminder */}
        <View style={styles.reminderContainer}>
          <View style={styles.reminderContent}>
            <Ionicons name="notifications-outline" size={24} color={Colors.gold} />
            <View style={styles.reminderTextContainer}>
              <Text style={styles.reminderTitle}>The Morning Call</Text>
              <Text style={styles.reminderSubtitle}>Daily discipline reminder</Text>
            </View>
          </View>
          <Ionicons name="toggle" size={32} color={Colors.britishRacingGreen} />
        </View>

        {/* The Curated Gallery - Liked Quotes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>The Curated Gallery</Text>
          <View style={styles.grid}>
            {[1, 2, 3, 4].map((item) => (
              <View key={item} style={styles.gridItem}>
                <View style={styles.frame}>
                  <View style={styles.placeholderImage}>
                    <Ionicons name="image-outline" size={32} color={Colors.gold} />
                  </View>
                </View>
                <Text style={styles.itemTitle}>Portrait {item}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* The Correspondence - Shared Quotes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>The Correspondence</Text>
          <View style={styles.correspondenceList}>
            {[1, 2, 3].map((item) => (
              <View key={item} style={styles.correspondenceItem}>
                <View style={styles.letterIcon}>
                  <Ionicons name="mail-open-outline" size={20} color={Colors.oxblood} />
                </View>
                <View style={styles.correspondenceContent}>
                  <Text style={styles.correspondenceTitle}>To a Friend</Text>
                  <Text style={styles.correspondenceDate}>October {item}, 1924</Text>
                </View>
                <Ionicons name="chevron-forward" size={16} color={Colors.gold} />
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
  reminderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    backgroundColor: Colors.offWhite,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 2,
  },
  reminderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reminderTextContainer: {
    marginLeft: 12,
  },
  reminderTitle: {
    fontFamily: Fonts.bodyBold,
    fontSize: 16,
    color: Colors.oxblood,
  },
  reminderSubtitle: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.text.secondary,
  },
  section: {
    padding: 20,
    paddingTop: 0,
  },
  sectionTitle: {
    fontFamily: Fonts.subheadingItalic,
    fontSize: 22,
    color: Colors.oxblood,
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 175, 55, 0.3)',
    paddingBottom: 8,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: ITEM_WIDTH,
    marginBottom: 24,
  },
  frame: {
    padding: 8,
    backgroundColor: '#3d2b1f', // Dark wood frame color
    borderWidth: 2,
    borderColor: '#D4AF37', // Gold inner rim
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: 8,
  },
  placeholderImage: {
    width: '100%',
    height: ITEM_WIDTH * 1.2,
    backgroundColor: Colors.offWhite,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemTitle: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.text.primary,
    textAlign: 'center',
    marginTop: 4,
  },
  correspondenceList: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  },
  correspondenceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.gold,
  },
  letterIcon: {
    marginRight: 16,
  },
  correspondenceContent: {
    flex: 1,
  },
  correspondenceTitle: {
    fontFamily: Fonts.bodyBold,
    fontSize: 16,
    color: Colors.text.primary,
  },
  correspondenceDate: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.text.secondary,
    fontStyle: 'italic',
  },
});
