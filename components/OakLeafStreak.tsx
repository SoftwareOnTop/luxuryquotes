import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

interface OakLeafStreakProps {
  days: number;
}

export default function OakLeafStreak({ days }: OakLeafStreakProps) {
  // Determine number of leaves/acorns based on streak
  // 1-3 days: 1 leaf
  // 4-6 days: 2 leaves
  // 7+ days: 3 leaves + acorn
  
  const renderLeaves = () => {
    const items = [];
    const leafCount = Math.min(Math.floor(days / 2) + 1, 3);
    const hasAcorn = days >= 7;

    for (let i = 0; i < leafCount; i++) {
      items.push(
        <Ionicons 
          key={`leaf-${i}`} 
          name="leaf" 
          size={24} 
          color={Colors.britishRacingGreen} 
          style={{ transform: [{ rotate: `${i * 30 - 30}deg` }], marginHorizontal: -5 }}
        />
      );
    }

    if (hasAcorn) {
      items.push(
        <Ionicons 
          key="acorn" 
          name="nutrition" // Using nutrition as acorn proxy or similar shape
          size={20} 
          color={Colors.oxblood} 
          style={{ position: 'absolute', bottom: -5, right: '45%' }}
        />
      );
    }

    return items;
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        {renderLeaves()}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.count}>{days} Day Streak</Text>
        <Text style={styles.label}>Growth in Silence</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'rgba(0, 66, 37, 0.05)', // Light green tint
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.britishRacingGreen,
    alignSelf: 'flex-start',
  },
  iconContainer: {
    flexDirection: 'row',
    marginRight: 12,
    height: 30,
    alignItems: 'center',
  },
  textContainer: {
    justifyContent: 'center',
  },
  count: {
    fontFamily: Fonts.headingBold,
    color: Colors.britishRacingGreen,
    fontSize: 16,
  },
  label: {
    fontFamily: Fonts.body,
    color: Colors.britishRacingGreen,
    fontSize: 10,
    opacity: 0.8,
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
  streakCount: {
    fontFamily: Fonts.headingBold,
    fontSize: 24,
    color: Colors.britishRacingGreen,
  },
});
