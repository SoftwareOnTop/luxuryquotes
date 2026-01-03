import { Modal, View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

interface PatronageModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function PatronageModal({ visible, onClose }: PatronageModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <BlurView intensity={20} style={StyleSheet.absoluteFill} tint="dark" />
        <View style={styles.modalView}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color={Colors.oxblood} />
          </TouchableOpacity>

          <View style={styles.content}>
            <Ionicons name="ribbon-outline" size={48} color={Colors.gold} style={styles.icon} />
            <Text style={styles.title}>The Elite Patronage</Text>
            <Text style={styles.subtitle}>An Invitation to the Inner Circle</Text>
            
            <View style={styles.divider} />
            
            <Text style={styles.description}>
              As a Patron, you are granted access to The Forbidden Wing, 
              featuring our complete archive and 8K cinematic portraits.
            </Text>

            <View style={styles.benefitsList}>
              <View style={styles.benefitItem}>
                <Ionicons name="key-outline" size={20} color={Colors.britishRacingGreen} />
                <Text style={styles.benefitText}>Access to The Forbidden Wing</Text>
              </View>
              <View style={styles.benefitItem}>
                <Ionicons name="film-outline" size={20} color={Colors.britishRacingGreen} />
                <Text style={styles.benefitText}>8K Cinematic Backgrounds</Text>
              </View>
              <View style={styles.benefitItem}>
                <Ionicons name="infinite-outline" size={20} color={Colors.britishRacingGreen} />
                <Text style={styles.benefitText}>Unlimited Collections</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.subscribeButton}>
              <Text style={styles.subscribeText}>Become a Patron</Text>
            </TouchableOpacity>
            
            <Text style={styles.priceText}>Contribution: $9.99 / month</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '85%',
    backgroundColor: Colors.cream,
    borderRadius: 2, // Sharp corners for card feel
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
    zIndex: 1,
  },
  content: {
    alignItems: 'center',
    width: '100%',
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontFamily: Fonts.headingBold,
    fontSize: 24,
    color: Colors.oxblood,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: Fonts.subheadingItalic,
    fontSize: 18,
    color: Colors.text.secondary,
    marginBottom: 20,
    textAlign: 'center',
  },
  divider: {
    width: '60%',
    height: 1,
    backgroundColor: Colors.gold,
    marginBottom: 20,
  },
  description: {
    fontFamily: Fonts.body,
    fontSize: 16,
    color: Colors.text.primary,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 24,
  },
  benefitsList: {
    width: '100%',
    marginBottom: 30,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 10,
  },
  benefitText: {
    fontFamily: Fonts.body,
    fontSize: 15,
    color: Colors.text.primary,
    marginLeft: 12,
  },
  subscribeButton: {
    backgroundColor: Colors.britishRacingGreen,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.gold,
    marginBottom: 15,
    width: '100%',
    alignItems: 'center',
  },
  subscribeText: {
    fontFamily: Fonts.heading,
    color: Colors.cream,
    fontSize: 18,
  },
  priceText: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.text.secondary,
    fontStyle: 'italic',
  },
});
