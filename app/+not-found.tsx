import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>This page doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Return to The Heritage</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: Colors.background,
  },
  title: {
    fontFamily: Fonts.headingBold,
    fontSize: 20,
    color: Colors.text.primary,
    marginBottom: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: Colors.britishRacingGreen,
    textDecorationLine: 'underline',
  },
});
