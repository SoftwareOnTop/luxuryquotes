import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { useState } from 'react';

const { width } = Dimensions.get('window');

interface IdentityModalProps {
  visible: boolean;
  onClose: () => void;
  currentIdentity: string;
  onSelect: (identity: string) => void;
}

type Identity = 'Sir' | 'Lady' | 'Individual';

export default function IdentityModal({ visible, onClose, currentIdentity, onSelect }: IdentityModalProps) {
  
  const handleSelect = (identity: Identity) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    onSelect(identity);
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title}>Form of Address</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={Colors.oxblood} />
            </TouchableOpacity>
          </View>

          <View style={styles.cardsContainer}>
            <IdentityCard 
              label="Sir" 
              active={currentIdentity === 'Sir'} 
              onPress={() => handleSelect('Sir')} 
            />
            <IdentityCard 
              label="Lady" 
              active={currentIdentity === 'Lady'} 
              onPress={() => handleSelect('Lady')} 
            />
            <IdentityCard 
              label="Individual" 
              active={currentIdentity === 'Individual'} 
              onPress={() => handleSelect('Individual')} 
            />
          </View>

        </View>
      </View>
    </Modal>
  );
}

function IdentityCard({ label, active, onPress }: { label: string, active: boolean, onPress: () => void }) {
  return (
    <TouchableOpacity 
      style={[styles.card, active && styles.cardActive]} 
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Text style={[styles.cardLabel, active && styles.cardLabelActive]}>{label}</Text>
      
      {active && (
        <View style={styles.sealContainer}>
          <View style={styles.sealOuter}>
            <View style={styles.sealInner}>
              <Ionicons name="ribbon" size={16} color="#7B1E1E" />
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  content: {
    width: width * 0.85,
    backgroundColor: Colors.cream,
    padding: 32,
    borderWidth: 1,
    borderColor: Colors.gold,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontFamily: Fonts.subheadingItalic,
    fontSize: 28,
    color: Colors.britishRacingGreen,
  },
  closeButton: {
    padding: 4,
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    height: 80,
    backgroundColor: '#FAF9F6',
    borderWidth: 1,
    borderColor: '#E0D8C0',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  cardActive: {
    backgroundColor: '#FDFBF7',
    borderColor: Colors.gold,
    borderWidth: 2,
    shadowColor: Colors.gold,
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  cardLabel: {
    fontFamily: Fonts.heading,
    fontSize: 24,
    color: Colors.text.secondary,
    opacity: 0.7,
  },
  cardLabelActive: {
    color: Colors.britishRacingGreen,
    opacity: 1,
    fontFamily: Fonts.headingBold,
  },
  sealContainer: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -15,
  },
  sealOuter: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  sealInner: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#D4AF37', // Slightly lighter gold
    borderWidth: 1,
    borderColor: '#B8860B',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
