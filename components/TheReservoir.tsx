import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

interface TheReservoirProps {
  selectedMode: 'archive' | 'vault';
  onChange: (mode: 'archive' | 'vault') => void;
}

export default function TheReservoir({ selectedMode, onChange }: TheReservoirProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>Choose your source of wisdom</Text>
      
      <View style={styles.sealContainer}>
        <TouchableOpacity 
          style={[
            styles.seal,
            selectedMode === 'archive' && styles.selectedSeal,
            selectedMode !== 'archive' && { opacity: 0.6 },
          ]}
          onPress={() => onChange('archive')}
        >
          <View style={[
            styles.sealOuter,
            selectedMode === 'archive' && styles.selectedSealOuter,
          ]}>
            <Text style={[
              styles.sealText,
              selectedMode === 'archive' && styles.selectedSealText,
            ]}>
              🏛️
            </Text>
          </View>
          <Text style={[
            styles.sealLabel,
            selectedMode === 'archive' && styles.selectedLabel,
          ]}>
            The Archive
          </Text>
          <Text style={styles.sealDescription}>Global Collection</Text>
        </TouchableOpacity>

        <View style={styles.dividerVertical} />

        <TouchableOpacity 
          style={[
            styles.seal,
            selectedMode === 'vault' && styles.selectedSeal,
            selectedMode !== 'vault' && { opacity: 0.6 },
          ]}
          onPress={() => onChange('vault')}
        >
          <View style={[
            styles.sealOuter,
            selectedMode === 'vault' && styles.selectedSealOuter,
          ]}>
            <Text style={[
              styles.sealText,
              selectedMode === 'vault' && styles.selectedSealText,
            ]}>
              💎
            </Text>
          </View>
          <Text style={[
            styles.sealLabel,
            selectedMode === 'vault' && styles.selectedLabel,
          ]}>
            The Vault
          </Text>
          <Text style={styles.sealDescription}>Liked Quotes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  description: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.text.secondary,
    marginBottom: 16,
    opacity: 0.8,
  },
  sealContainer: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
  },
  seal: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 16,
    borderRadius: 8,
    backgroundColor: Colors.offWhite,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  selectedSeal: {
    backgroundColor: Colors.britishRacingGreen,
    borderColor: Colors.gold,
  },
  sealOuter: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.cream,
    borderWidth: 2,
    borderColor: Colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  selectedSealOuter: {
    backgroundColor: Colors.gold,
    borderColor: Colors.cream,
  },
  sealText: {
    fontSize: 28,
  },
  selectedSealText: {
    fontSize: 28,
  },
  sealLabel: {
    fontFamily: Fonts.headingBold,
    fontSize: 13,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  selectedLabel: {
    color: Colors.cream,
  },
  sealDescription: {
    fontFamily: Fonts.body,
    fontSize: 10,
    color: Colors.text.secondary,
    opacity: 0.7,
  },
  dividerVertical: {
    width: 1,
    height: 80,
    backgroundColor: Colors.gold,
    opacity: 0.2,
  },
});
