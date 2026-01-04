import React, { useState, useEffect } from 'react';
import { 
  Modal, 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Dimensions, 
  ScrollView,
  Platform
} from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;
const CARD_HEIGHT = height * 0.75;

interface PatronageModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function PatronageModal({ visible, onClose }: PatronageModalProps) {
  const [isSigned, setIsSigned] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  
  useEffect(() => {
    if (!visible) {
      setIsSigned(false);
      setShowSuccess(false);
    }
  }, [visible]);

  const handleSign = async () => {
    if (isSigned) return;
    
    // Simple haptic feedback
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsSigned(true);

    // Delay to show "Accepted" briefly before switching to success state
    setTimeout(async () => {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
        setShowSuccess(true);
    }, 1000);
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
        
        {!showSuccess ? (
            // --- INVITATION STATE ---
            <View style={styles.cardWrapper}>
              <View style={styles.card}>
                
                {/* Gold Leaf Edges (Static) */}
                <View style={styles.goldBorder}>
                  <LinearGradient
                    colors={['#D4AF37', '#FEE180', '#D4AF37']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={StyleSheet.absoluteFill}
                  />
                </View>

                {/* Card Content */}
                <View style={styles.cardInner}>
                  
                  {/* Wax Seal */}
                  <View style={styles.waxSealContainer}>
                    <View style={styles.waxSeal}>
                      <LinearGradient
                        colors={['#B22222', '#800000']}
                        style={styles.waxGradient}
                      />
                      <Text style={styles.waxSealText}>A</Text>
                      <View style={styles.waxSealInnerRing} />
                    </View>
                    <View style={styles.ribbon} />
                  </View>

                  <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                    <Ionicons name="close" size={24} color={Colors.britishRacingGreen} />
                  </TouchableOpacity>

                  <Text style={styles.headerText}>THE APEX</Text>
                  <Text style={styles.subHeaderText}>Annual Patronage</Text>

                  {/* Triptych Scroll */}
                  <View style={styles.triptychContainer}>
                    <ScrollView 
                      horizontal 
                      pagingEnabled 
                      showsHorizontalScrollIndicator={false}
                      contentContainerStyle={styles.scrollContent}
                    >
                      <TriptychPanel 
                        title="The Archive" 
                        icon="library" 
                        desc="Unlimited access to the complete registry of wisdom." 
                      />
                      <TriptychPanel 
                        title="The Orchestration" 
                        icon="musical-notes" 
                        desc="Immersive soundscapes for deep focus and reflection." 
                      />
                      <TriptychPanel 
                        title="The Inner Circle" 
                        icon="people" 
                        desc="Priority access to new features and community events." 
                      />
                    </ScrollView>
                    
                    {/* Pagination Dots */}
                    <View style={styles.pagination}>
                      <View style={styles.dot} />
                      <View style={styles.dot} />
                      <View style={styles.dot} />
                    </View>
                  </View>

                  {/* The Signature (Purchase) */}
                  <View style={styles.signatureSection}>
                    <Text style={styles.priceText}>$49.99 / Year</Text>
                    
                    <TouchableOpacity 
                      activeOpacity={0.9} 
                      onPress={handleSign}
                      style={styles.signatureLineContainer}
                    >
                      <View style={styles.xMark}>
                        <Text style={styles.xText}>X</Text>
                      </View>
                      
                      <View style={styles.lineBase}>
                        {isSigned && (
                            <View style={styles.signatureMask}>
                                <Text style={styles.signatureText} numberOfLines={1}>
                                    Accepted
                                </Text>
                            </View>
                        )}
                        <View style={styles.underline} />
                      </View>
                    </TouchableOpacity>
                    
                    <Text style={styles.instructionText}>
                      {isSigned ? "Welcome to the fold." : "Sign to accept invitation"}
                    </Text>
                  </View>

                  <TouchableOpacity style={styles.discreteLink}>
                    <Text style={styles.discreteText}>Discrete Terms & Monthly Options</Text>
                  </TouchableOpacity>

                </View>
              </View>
            </View>
        ) : (
            // --- SUCCESS STATE (Static) ---
            <View style={[StyleSheet.absoluteFill, styles.successContainer]}>
                
                {/* 1. The Sovereign Crest (Center) */}
                <View style={styles.sovereignCrestContainer}>
                  <LinearGradient
                    colors={['#FFD700', '#B8860B', '#DAA520']}
                    style={styles.sovereignCrest}
                  >
                    <View style={styles.crestInner}>
                      <Ionicons name="ribbon" size={40} color="#5C4033" />
                    </View>
                  </LinearGradient>
                  <Text style={styles.crestLabel}>PATRONUS</Text>
                </View>

                {/* 2. The Sovereign Card */}
                <View style={styles.sovereignCardContainer}>
                  
                  {/* The Card Itself */}
                  <View style={styles.obsidianCard}>
                    {/* Glossy Finish */}
                    <LinearGradient
                      colors={['rgba(255,255,255,0.1)', 'transparent']}
                      style={StyleSheet.absoluteFill}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    />
                    
                    {/* Gold Filigree Borders */}
                    <View style={styles.filigreeBorder} />
                    
                    <View style={styles.cardContent}>
                      <Text style={styles.memberName}>Aaron Smith</Text>
                      <Text style={styles.memberId}>Patron No. 882</Text>
                      <View style={styles.chip} />
                    </View>
                  </View>

                  {/* 3. The Privilege Reveal */}
                  <View style={styles.privilegesContainer}>
                    <Text style={styles.privilegesTitle}>Access Granted</Text>
                    <View style={styles.privilegesGrid}>
                      <PrivilegeIcon icon="infinite" label="Infinite Archive" />
                      <PrivilegeIcon icon="tv-outline" label="8K Visuals" />
                      <PrivilegeIcon icon="construct-outline" label="Custom Architect" />
                      <PrivilegeIcon icon="phone-portrait-outline" label="Elite Widgets" />
                    </View>
                  </View>

                  {/* 4. The New Primary Action */}
                  <TouchableOpacity style={styles.enterButton} onPress={onClose}>
                    <LinearGradient
                      colors={['#D4AF37', '#B8860B']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 0 }}
                      style={StyleSheet.absoluteFill}
                    />
                    <Text style={styles.enterButtonText}>ENTER THE FORBIDDEN WING</Text>
                  </TouchableOpacity>

                </View>

            </View>
        )}

      </View>
    </Modal>
  );
}

function PrivilegeIcon({ icon, label }: { icon: any, label: string }) {
  return (
    <TouchableOpacity style={styles.privilegeItem} onPress={() => Haptics.selectionAsync()}>
      <View style={styles.privilegeIconCircle}>
        <Ionicons name={icon} size={20} color={Colors.gold} />
      </View>
      <Text style={styles.privilegeLabel}>{label}</Text>
    </TouchableOpacity>
  );
}

function TriptychPanel({ title, icon, desc }: { title: string, icon: any, desc: string }) {
  return (
    <View style={styles.panel}>
      <View style={styles.panelIcon}>
        <Ionicons name={icon} size={32} color={Colors.britishRacingGreen} />
      </View>
      <Text style={styles.panelTitle}>{title}</Text>
      <View style={styles.divider} />
      <Text style={styles.panelDesc}>{desc}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 22, 16, 0.95)', // Darker for success state
  },
  cardWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#F5F5F0', // Textured cotton paper color
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 15,
    padding: 4, // Space for gold border
  },
  goldBorder: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 3,
    borderColor: '#D4AF37', // Gold
    borderRadius: 4,
    overflow: 'hidden',
  },
  cardInner: {
    flex: 1,
    backgroundColor: '#F5F5F0',
    margin: 3, // Inner margin from gold border
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20,
  },
  waxSealContainer: {
    position: 'absolute',
    top: -25,
    alignItems: 'center',
    zIndex: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  waxSeal: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#800000',
  },
  waxGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 30,
  },
  waxSealText: {
    fontFamily: Fonts.serif,
    fontSize: 28,
    color: '#D4AF37',
    fontWeight: 'bold',
    opacity: 0.9,
  },
  waxSealInnerRing: {
    position: 'absolute',
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.3)',
  },
  ribbon: {
    position: 'absolute',
    top: 10,
    width: 40,
    height: 60,
    backgroundColor: '#800000',
    zIndex: -1,
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    padding: 5,
    zIndex: 5,
  },
  headerText: {
    fontFamily: Fonts.serif,
    fontSize: 24,
    letterSpacing: 3,
    color: Colors.britishRacingGreen,
    marginTop: 10,
  },
  subHeaderText: {
    fontFamily: Fonts.serif,
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
    marginTop: 5,
    marginBottom: 20,
  },
  triptychContainer: {
    height: 220,
    width: '100%',
    marginTop: 10,
  },
  scrollContent: {
    alignItems: 'center',
  },
  panel: {
    width: CARD_WIDTH - 20, // Adjust for padding
    alignItems: 'center',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  panelIcon: {
    marginBottom: 15,
  },
  panelTitle: {
    fontFamily: Fonts.serif,
    fontSize: 20,
    color: Colors.britishRacingGreen,
    marginBottom: 10,
  },
  divider: {
    width: 40,
    height: 1,
    backgroundColor: '#D4AF37',
    marginBottom: 15,
  },
  panelDesc: {
    fontFamily: Fonts.serif,
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    lineHeight: 24,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#D4AF37',
    opacity: 0.6,
  },
  signatureSection: {
    marginTop: 'auto',
    width: '100%',
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  priceText: {
    fontFamily: Fonts.serif,
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  signatureLineContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '100%',
    height: 60,
    marginBottom: 10,
  },
  xMark: {
    marginRight: 10,
    paddingBottom: 5,
  },
  xText: {
    fontFamily: Fonts.serif,
    fontSize: 24,
    color: '#000',
  },
  lineBase: {
    flex: 1,
    height: 50,
    justifyContent: 'flex-end',
  },
  underline: {
    height: 1,
    backgroundColor: '#000',
    width: '100%',
  },
  signatureMask: {
    position: 'absolute',
    bottom: 5,
    left: 0,
    height: 40,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  signatureText: {
    fontFamily: 'Georgia', // Fallback to a system serif that supports italics well if custom font fails
    fontStyle: 'italic',
    fontSize: 32,
    color: Colors.britishRacingGreen,
    width: 200, // Ensure width is enough for text
  },
  instructionText: {
    fontFamily: Fonts.serif,
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    letterSpacing: 1,
  },
  discreteLink: {
    marginTop: 20,
    padding: 10,
  },
  discreteText: {
    fontFamily: Fonts.serif,
    fontSize: 10,
    color: '#999',
    textDecorationLine: 'underline',
  },
  
  // --- SUCCESS STATE STYLES ---
  successContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 50,
  },
  sovereignCrestContainer: {
    position: 'absolute',
    top: height * 0.15,
    alignItems: 'center',
  },
  sovereignCrest: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#DAA520',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 20,
    elevation: 20,
  },
  crestInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#5C4033',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,215,0,0.3)',
  },
  crestLabel: {
    fontFamily: Fonts.headingBold,
    color: Colors.gold,
    marginTop: 16,
    fontSize: 18,
    letterSpacing: 4,
  },
  sovereignCardContainer: {
    width: width * 0.9,
    alignItems: 'center',
  },
  obsidianCard: {
    width: '100%',
    height: 220,
    backgroundColor: '#0a0a0a',
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#333',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 15,
  },
  filigreeBorder: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
    borderColor: Colors.gold,
    margin: 8,
    borderRadius: 8,
    opacity: 0.5,
    borderStyle: 'dashed', // Simulating filigree
  },
  cardContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  memberName: {
    fontFamily: Fonts.serif,
    fontSize: 28,
    color: Colors.cream,
    marginBottom: 8,
  },
  memberId: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.gold,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  chip: {
    width: 40,
    height: 30,
    backgroundColor: '#D4AF37',
    borderRadius: 4,
    marginTop: 20,
    opacity: 0.8,
  },
  privilegesContainer: {
    width: '100%',
    marginBottom: 30,
  },
  privilegesTitle: {
    fontFamily: Fonts.bodyItalic,
    color: Colors.gold,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    opacity: 0.8,
  },
  privilegesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 10,
  },
  privilegeItem: {
    width: '48%',
    backgroundColor: 'rgba(255,255,255,0.05)',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(212, 175, 55, 0.2)',
  },
  privilegeIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.gold,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  privilegeLabel: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.cream,
    flex: 1,
  },
  enterButton: {
    width: '100%',
    height: 60,
    borderRadius: 4,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#DAA520',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  shimmerOverlay: {
    width: '100%',
    height: '100%',
  },
  enterButtonText: {
    fontFamily: Fonts.headingBold,
    fontSize: 14,
    color: '#3e2723', // Dark brown text on gold
    letterSpacing: 2,
    zIndex: 10,
  },
});
