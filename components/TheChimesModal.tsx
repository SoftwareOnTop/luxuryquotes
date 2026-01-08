import { Modal, View, Text, StyleSheet, TouchableOpacity, Dimensions, Switch, ScrollView } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

export interface ReminderItem {
  id: string;
  time: string;
  label: string;
  enabled: boolean;
}

interface TheChimesModalProps {
  visible: boolean;
  onClose: () => void;
  reminders: ReminderItem[];
  onChange: (reminders: ReminderItem[]) => void;
}

export default function TheChimesModal({ visible, onClose, reminders, onChange }: TheChimesModalProps) {
  
  const handleSwitchChange = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const updated = reminders.map(item => 
      item.id === id ? { ...item, enabled: !item.enabled } : item
    );
    onChange(updated);
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
            <View style={styles.headerLeft}>
              <Ionicons name="notifications" size={26} color="#000000" />
              <Text style={styles.title}>The Chimes</Text>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={26} color="#000000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>Configure your daily reminders</Text>

          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {reminders.map((item, index) => (
              <View 
                key={item.id} 
                style={[
                  styles.reminderCard,
                  index === reminders.length - 1 && styles.reminderCardLast
                ]}
              >
                <View style={styles.reminderInfo}>
                  <Text style={styles.timeText}>{item.time}</Text>
                  <Text style={styles.labelText}>{item.label}</Text>
                </View>
                <Switch
                  value={item.enabled}
                  onValueChange={() => handleSwitchChange(item.id)}
                  trackColor={{ false: '#E0E0E0', true: '#000000' }}
                  thumbColor={item.enabled ? '#FFFFFF' : '#f4f3f4'}
                  ios_backgroundColor="#E0E0E0"
                />
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
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
    maxHeight: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 28,
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
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontFamily: Fonts.headingBold,
    fontSize: 24,
    color: '#000000',
  },
  closeButton: {
    padding: 4,
  },
  subtitle: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: '#666666',
    marginBottom: 24,
  },
  scrollView: {
    maxHeight: 400,
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  reminderCardLast: {
    marginBottom: 0,
  },
  reminderInfo: {
    flex: 1,
  },
  timeText: {
    fontFamily: Fonts.headingBold,
    fontSize: 18,
    color: '#000000',
    marginBottom: 4,
  },
  labelText: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: '#666666',
  },
});
