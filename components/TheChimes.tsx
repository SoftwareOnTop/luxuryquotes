import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

export interface ReminderItem {
  id: string;
  time: string;
  label: string;
  enabled: boolean;
}

interface TheChimesProps {
  reminders: ReminderItem[];
  onChange: (reminders: ReminderItem[]) => void;
}

export default function TheChimes({ reminders, onChange }: TheChimesProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSwitchChange = (id: string) => {
    const updated = reminders.map(item => 
      item.id === id ? { ...item, enabled: !item.enabled } : item
    );
    onChange(updated);
  };

  return (
    <View style={styles.container}>
      {/* Main Toggle Button */}
      <TouchableOpacity 
        style={styles.headerButton} 
        onPress={handleToggle}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Ionicons name="notifications" size={24} color="#000000" />
          <Text style={styles.headerTitle}>Configure Reminders</Text>
        </View>
        <Ionicons 
          name={isOpen ? "chevron-up" : "chevron-down"} 
          size={22} 
          color="#666666" 
        />
      </TouchableOpacity>

      {/* Expanded Content */}
      {isOpen && (
        <View style={styles.contentContainer}>
          {reminders.map((item) => (
            <View key={item.id} style={styles.row}>
              <View style={styles.rowInfo}>
                <Text style={styles.timeText}>{item.time}</Text>
                <Text style={styles.labelText}>{item.label}</Text>
              </View>
              <Switch
                value={item.enabled}
                onValueChange={() => handleSwitchChange(item.id)}
                trackColor={{ false: '#e0e0e0', true: '#000000' }}
                thumbColor={item.enabled ? '#FFFFFF' : '#f4f3f4'}
              />
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#F5F5F5',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#F5F5F5',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontFamily: Fonts.headingBold,
    fontSize: 16,
    color: '#000000',
  },
  contentContainer: {
    padding: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.08)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  rowInfo: {
    flex: 1,
  },
  timeText: {
    fontFamily: Fonts.headingBold,
    fontSize: 18,
    color: '#000000',
  },
  labelText: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: '#666666',
    marginTop: 4,
  },
});
