import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions, Platform, ScrollView } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get('window');

interface TheEliteLedgerModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function TheEliteLedgerModal({ visible, onClose }: TheEliteLedgerModalProps) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.container}>
          <BlurView intensity={80} tint="dark" style={StyleSheet.absoluteFill} />
          
          <View style={styles.content}>
            <View style={styles.header}>
              <Text style={styles.title}>The Elite Ledger</Text>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={Colors.cream} />
              </TouchableOpacity>
            </View>

            <View style={styles.cardContainer}>
              <View style={styles.card}>
                <LinearGradient
                  colors={['#1a1a1a', '#000000']}
                  style={StyleSheet.absoluteFill}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
                
                <View style={styles.cardContent}>
                  <View style={styles.cardHeader}>
                    <Ionicons name="ribbon" size={32} color={Colors.gold} />
                    <Text style={styles.cardBrand}>LUXURY QUOTES</Text>
                  </View>
                  
                  <View style={styles.cardBody}>
                    <View>
                      <Text style={styles.label}>MEMBER STATUS</Text>
                      <Text style={styles.value}>Elite Patron</Text>
                    </View>
                    <View style={styles.row}>
                      <View>
                        <Text style={styles.label}>RENEWAL DATE</Text>
                        <Text style={styles.value}>January 1st, 1925</Text>
                      </View>
                      <Ionicons name="infinite" size={24} color={Colors.gold} style={{ opacity: 0.8 }} />
                    </View>
                  </View>

                  <View style={styles.cardFooter}>
                    <Text style={styles.cardNumber}>0000 1924 8888 ELITE</Text>
                  </View>
                </View>
                
                {/* Border Glow */}
                <View style={styles.cardBorder} />
              </View>
            </View>

            <View style={styles.featuresContainer}>
              <Text style={styles.featuresTitle}>Your Privileges</Text>
              <FeatureItem icon="library-outline" text="Full Archive Access" />
              <FeatureItem icon="film-outline" text="Cinematic 4K Visuals" />
              <FeatureItem icon="phone-portrait-outline" text="Exclusive Widgets" />
              <FeatureItem icon="people-outline" text="Mastermind Community" />
            </View>

            <View style={styles.actions}>
              <TouchableOpacity style={styles.updateButton}>
                <Text style={styles.updateText}>Update Payment Method</Text>
              </TouchableOpacity>
              
              <View style={styles.divider} />
              
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel Patronage</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
}

function FeatureItem({ icon, text }: { icon: any, text: string }) {
  return (
    <View style={styles.featureItem}>
      <Ionicons name={icon} size={20} color={Colors.gold} />
      <Text style={styles.featureText}>{text}</Text>
    </View>
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
    width: width * 0.9,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontFamily: Fonts.heading,
    fontSize: 24,
    color: Colors.cream,
    letterSpacing: 1,
  },
  closeButton: {
    padding: 8,
  },
  cardContainer: {
    width: '100%',
    height: 220,
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    height: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },
  cardContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
    zIndex: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardBrand: {
    fontFamily: Fonts.headingBold,
    fontSize: 14,
    color: Colors.gold,
    letterSpacing: 2,
  },
  cardBody: {
    gap: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  label: {
    fontFamily: Fonts.body,
    fontSize: 10,
    color: Colors.text.secondary,
    letterSpacing: 1,
    marginBottom: 4,
  },
  value: {
    fontFamily: Fonts.heading,
    fontSize: 18,
    color: Colors.cream,
    textShadowColor: 'rgba(212, 175, 55, 0.3)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  cardFooter: {
    alignItems: 'flex-end',
  },
  cardNumber: {
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    fontSize: 12,
    color: Colors.gold,
    opacity: 0.8,
    letterSpacing: 2,
  },
  cardBorder: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: Colors.gold,
    borderRadius: 16,
    opacity: 0.3,
    zIndex: 4,
  },
  featuresContainer: {
    width: '100%',
    marginBottom: 30,
    gap: 12,
  },
  featuresTitle: {
    fontFamily: Fonts.heading,
    fontSize: 18,
    color: Colors.cream,
    marginBottom: 8,
    textAlign: 'center',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
  },
  featureText: {
    fontFamily: Fonts.body,
    fontSize: 16,
    color: Colors.text.secondary,
  },
  actions: {
    width: '100%',
    alignItems: 'center',
    gap: 8,
  },
  updateButton: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gold,
  },
  updateText: {
    fontFamily: Fonts.body,
    fontSize: 16,
    color: Colors.gold,
    letterSpacing: 0.5,
  },
  divider: {
    height: 40,
  },
  cancelButton: {
    alignItems: 'center',
    paddingVertical: 12,
  },
  cancelText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.text.secondary,
    opacity: 0.6,
  },
});
