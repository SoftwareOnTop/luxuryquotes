import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, KeyboardAvoidingView, Platform, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { Colors } from '../constants/Colors';
import { Fonts } from '../constants/Fonts';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import sessionUrlProvider from 'expo-auth-session/build/SessionUrlProvider';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { auth } from '../config/firebase';
import { Ionicons } from '@expo/vector-icons';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  // Expo Go (iOS): Use Expo AuthSession proxy START URL, but return to the app via a deep link.
  // The proxy redirect URL must be allow-listed in Google Cloud OAuth "Authorized redirect URIs".
  const projectNameForProxy = '@softwareontop/the-heritage';
  const webClientId = '963320354752-5ht0m07ua0mirpenpt6f692shaag6tvl.apps.googleusercontent.com';
  const proxyRedirectUri = sessionUrlProvider.getRedirectUrl({ projectNameForProxy });

  const [request] = Google.useAuthRequest({
    clientId: webClientId,
    // IMPORTANT: Using implicit flow so we don't need a client_secret.
    // This returns `id_token` directly in the redirect.
    responseType: 'id_token',
    // IMPORTANT: This is what Google redirects to.
    redirectUri: proxyRedirectUri,
    scopes: ['openid', 'profile', 'email'],
  });

  const handleGoogleSignIn = async () => {
    if (!request) return;

    setLoading(true);
    try {
      // IMPORTANT: This is what iOS listens for to return control back to Expo Go.
      const returnUrl = sessionUrlProvider.getDefaultReturnUrl();

      // Build the Google auth URL (redirect_uri will be the proxyRedirectUri above).
      const authUrl = await request.makeAuthUrlAsync(Google.discovery);

      // Wrap the Google auth URL in the Expo proxy start URL.
      const startUrl = sessionUrlProvider.getStartUrl(authUrl, returnUrl, projectNameForProxy);

      const browserResult = await WebBrowser.openAuthSessionAsync(startUrl, returnUrl);
      if (browserResult.type !== 'success') {
        return;
      }

      const parsed = request.parseReturnUrl(browserResult.url);
      if (parsed.type !== 'success') {
        const message =
          parsed.type === 'error'
            ? parsed.error?.message || parsed.errorCode || 'Authentication failed.'
            : 'Authentication was cancelled.';
        Alert.alert('Google Sign-In Error', message);
        return;
      }

      const idToken = parsed.params.id_token;
      if (!idToken) {
        Alert.alert('Google Sign-In Error', 'Missing id_token from Google.');
        return;
      }

      const credential = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, credential);
    } catch (error: any) {
      Alert.alert('Google Sign-In Error', error?.message ?? String(error));
    } finally {
      setLoading(false);
    }
  };

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await signIn(email.trim(), password);
        router.replace('/(tabs)');
      } else {
        await signUp(email.trim(), password);
        router.replace('/(tabs)');
      }
    } catch (error: any) {
      Alert.alert('Authentication Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.content}
      >
        <View style={styles.header}>
          <Text style={styles.title}>The Heritage</Text>
          <Text style={styles.subtitle}>Enter the Registry</Text>
        </View>

        <View style={styles.form}>
          {/* GOOGLE SIGN IN */}
          <TouchableOpacity 
            style={styles.googleButton} 
            onPress={handleGoogleSignIn}
            disabled={!request || loading}
          >
            <Ionicons name="logo-google" size={20} color="#000" style={{ marginRight: 10 }} />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="email@example.com"
              placeholderTextColor="#999"
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              placeholderTextColor="#999"
              secureTextEntry
            />
          </View>

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleAuth}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>
                {isLogin ? 'Sign In' : 'Create Account'}
              </Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.switchButton} 
            onPress={() => setIsLogin(!isLogin)}
          >
            <Text style={styles.switchText}>
              {isLogin ? "No account? Sign up" : "Already have an account? Sign in"}
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
    maxWidth: 500,
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontFamily: Fonts.bodyBold,
    fontSize: 32,
    color: Colors.britishRacingGreen,
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: Fonts.subheadingItalic,
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
  },
  form: {
    width: '100%',
  },
  googleButton: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 18,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  googleButtonText: {
    color: '#000',
    fontFamily: Fonts.bodyBold,
    fontSize: 16,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E5E5',
  },
  orText: {
    color: '#999',
    marginHorizontal: 16,
    fontFamily: Fonts.body,
    fontSize: 14,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: Fonts.heading,
    fontSize: 12,
    color: Colors.britishRacingGreen,
    marginBottom: 8,
    fontWeight: '600',
    marginLeft: 4,
  },
  input: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 16,
    padding: 18,
    color: '#000',
    fontFamily: Fonts.subheading,
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.britishRacingGreen,
    padding: 18,
    alignItems: 'center',
    marginTop: 12,
    borderRadius: 16,
    shadowColor: Colors.britishRacingGreen,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    color: '#FFFFFF',
    fontFamily: Fonts.bodyBold,
    fontSize: 16,
  },
  switchButton: {
    marginTop: 24,
    alignItems: 'center',
    padding: 10,
  },
  switchText: {
    color: '#666',
    fontFamily: Fonts.body,
    fontSize: 14,
  },
});
