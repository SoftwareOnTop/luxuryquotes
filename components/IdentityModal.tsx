import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <BlurView intensity={40} tint="dark" style={StyleSheet.absoluteFill} />
          
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>Form of Address</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={26} color="#000000" />
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
      </GestureHandlerRootView>
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
              <Ionicons name="checkmark" size={16} color="#000000" />
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
    backgroundColor: '#FFFFFF',
    padding: 28,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontFamily: Fonts.headingBold,
    fontSize: 24,
    color: '#000000',
  },
  closeButton: {
    padding: 4,
  },
  cardsContainer: {
    gap: 12,
  },
  card: {
    height: 72,
    backgroundColor: '#FAFAFA',
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative',
  },
  cardActive: {
    backgroundColor: '#000000',
    borderColor: '#000000',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  cardLabel: {
    fontFamily: Fonts.heading,
    fontSize: 20,
    color: '#666666',
  },
  cardLabelActive: {
    color: '#FFFFFF',
    fontFamily: Fonts.headingBold,
  },
  sealContainer: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -12,
  },
  sealOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  sealInner: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
