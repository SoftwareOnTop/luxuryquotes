import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
  LibreBaskerville_400Regular,
  LibreBaskerville_700Bold,
  LibreBaskerville_400Regular_Italic,
} from '@expo-google-fonts/libre-baskerville';
import {
  CormorantGaramond_400Regular,
  CormorantGaramond_400Regular_Italic,
  CormorantGaramond_700Bold,
} from '@expo-google-fonts/cormorant-garamond';
import {
  LibreCaslonText_400Regular,
  LibreCaslonText_700Bold,
  LibreCaslonText_400Regular_Italic,
} from '@expo-google-fonts/libre-caslon-text';

import { AuthProvider, useAuth } from '../context/AuthContext';
import { Colors } from '../constants/Colors';
import { useRouter, useSegments } from 'expo-router';

// Note: SplashScreen calls removed due to Expo Go compatibility issues
// Expo Go handles splash screen automatically

function InitialLayout() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const [loaded] = useFonts({
    LibreBaskerville_400Regular,
    LibreBaskerville_700Bold,
    LibreBaskerville_400Regular_Italic,
    CormorantGaramond_400Regular,
    CormorantGaramond_400Regular_Italic,
    CormorantGaramond_700Bold,
    LibreCaslonText_400Regular,
    LibreCaslonText_700Bold,
    LibreCaslonText_400Regular_Italic,
  });

  useEffect(() => {
    if (loaded && !loading) {
      // Note: SplashScreen.hideAsync() removed - Expo Go handles this automatically
      
      const inTabsGroup = segments[0] === '(tabs)';
      
      if (user && segments[0] === 'login') {
        router.replace('/(tabs)');
      } else if (!user && inTabsGroup) {
        router.replace('/login');
      }
    }
  }, [user, loading, loaded, segments]);

  if (!loaded || loading) {
    return null; 
  }

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: Colors.background,
      text: Colors.text.primary,
      primary: Colors.britishRacingGreen,
    },
  };

  return (
    <ThemeProvider value={MyTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ headerShown: false }} />
        <Stack.Screen name="categories" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="visual-folio" options={{ presentation: 'modal', headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AuthProvider>
          <InitialLayout />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
