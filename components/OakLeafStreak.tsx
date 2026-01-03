import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

interface OakLeafStreakProps {
  days: number;
}

export default function OakLeafStreak({ days }: OakLeafStreakProps) {
  // Generate array of 7 days for the week view
  const week = Array.from({ length: 7 }, (_, i) => i < days);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Days of Consistency</Text>
      <View style={styles.leavesContainer}>
        {week.map((isActive, index) => (
          <View key={index} style={styles.leafWrapper}>
            <Ionicons
              name="leaf"
              size={32}
              color={isActive ? Colors.britishRacingGreen : '#D3D3D3'}
            />
            {isActive && (
              <View style={styles.activeDot} />
            )}
          </View>
        ))}
      </View>
      <Text style={styles.count}>{days} Days</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.offWhite,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gold,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontFamily: Fonts.subheadingItalic,
    fontSize: 18,
    color: Colors.oxblood,
    marginBottom: 16,
  },
  leavesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 12,
  },
  leafWrapper: {
    alignItems: 'center',
  },
  activeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.gold,
    marginTop: 4,
  },
  count: {
    fontFamily: Fonts.headingBold,
    fontSize: 24,
    color: Colors.britishRacingGreen,
  },
});
