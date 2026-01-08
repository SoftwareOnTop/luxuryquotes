import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

interface SettingsItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle?: string;
  onPress?: () => void;
}

export default function SettingsItem({ icon, title, subtitle, onPress }: SettingsItemProps) {
  return (
    <Pressable
      onPress={() => {
        console.log(`SettingsItem pressed: ${title}`);
        if (onPress) onPress();
      }}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
    >
      <View style={styles.iconContainer}>
        <Ionicons name={icon} size={22} color="#1A1A1A" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      </View>
      <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#F3F4F6',
    backgroundColor: '#FFFFFF',
  },
  pressed: {
    backgroundColor: '#F9FAFB',
    opacity: 0.7,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontFamily: Fonts.headingBold,
    color: '#1A1A1A',
    fontSize: 16,
  },
  subtitle: {
    fontFamily: Fonts.body,
    color: '#6B7280',
    fontSize: 14,
    marginTop: 2,
  },
});
