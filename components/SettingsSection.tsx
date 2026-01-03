import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

export default function SettingsSection({ title, children }: SettingsSectionProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.line} />
      </View>
      <View style={styles.content}>
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  title: {
    fontFamily: Fonts.subheadingItalic,
    color: Colors.oxblood,
    fontSize: 18,
    marginRight: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.gold,
    opacity: 0.5,
  },
  content: {
    backgroundColor: 'rgba(255, 255, 255, 0.4)', // Slight transparency for paper effect
  },
});
