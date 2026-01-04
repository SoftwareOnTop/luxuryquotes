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
        activeOpacity={0.6}
      >
        <View style={styles.headerLeft}>
          <Ionicons name="notifications-outline" size={22} color={Colors.gold} />
          <Text style={styles.headerTitle}>Configure Reminders</Text>
        </View>
        <Ionicons 
          name={isOpen ? "chevron-up" : "chevron-down"} 
          size={20} 
          color={Colors.text.secondary} 
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
                trackColor={{ false: '#e0e0e0', true: Colors.gold }}
                thumbColor={item.enabled ? '#fff' : '#f4f3f4'}
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
    backgroundColor: 'rgba(0,0,0,0.02)',
    borderRadius: 8,
    overflow: 'hidden',
  },
  headerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.text.primary,
  },
  contentContainer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.05)',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  rowInfo: {
    flex: 1,
  },
  timeText: {
    fontFamily: Fonts.headingBold,
    fontSize: 16,
    color: Colors.britishRacingGreen,
  },
  labelText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: Colors.text.secondary,
    marginTop: 2,
  },
});
