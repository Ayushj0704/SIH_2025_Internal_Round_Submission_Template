// app/(auth)/signup.tsx
import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  Image, // Added Image component import
} from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuthContext } from '../_layout'; // import auth context

// Added the logo import
const logo = require('../../assets/images/logo.png');

export default function SignupPage() {
  const { setIsLoggedIn } = useAuthContext();

  const handleEmailSignup = () => {
    router.push('/signupdetails');
  };

  const handleGoogleSignup = () => {
    // Simulate Google signup/login
    setIsLoggedIn(true);
    router.replace('/dashboard'); // navigate to dashboard
  };

  const handleLoginRedirect = () => {
    router.push('/login');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
        {/* Top Image Section */}
        <View style={styles.imageBackgroundContainer}>
          <ImageBackground
            source={{
              uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8B3oOLAOFbovpF81xG4Wl8B3Z4AIHe0x5hmQBGTtV3yNnhiGerh9zwgm4N8fh-uAGyB2CHENoeutJra7o_ieh9hxrlR0CToZ6Y8tHtCpC31zxwXmh02m-4j6WM49k9tE4ytM38_XIrzpDM1QbT7amBX-sSkybLk-zHx5Ertok7k1PlXMAr6GVBQhtUMscdC2Df49vUU9g1JIfqI96vkA2u2cjgoogmtM-EP21M5-q_CJ3Nv9nJB_76XppfByDzn7gL_BYkgMD9EY',
            }}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            <View style={styles.overlay} />
          </ImageBackground>
        </View>

        {/* New: Centered Logo and Descriptive Text at the top */}
        <View style={styles.topContent}>
          <Image source={logo} style={styles.mainLogo} resizeMode="contain" />
          <Text style={styles.mainText}>Together, we make a cleaner tomorrow.</Text>
        </View>

        {/* Existing Content */}
        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Segregate Today,{'\n'}Save Tomorrow</Text>
            <Text style={styles.subtitle}>Track, Shop, Learn, Report</Text>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={handleEmailSignup}>
              <MaterialIcons name="mail" size={24} color="#14532d" />
              <Text style={styles.buttonText}>Continue with Email</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleGoogleSignup}>
              <Feather name="globe" size={24} color="#4285F4" />
              <Text style={styles.buttonText}>Continue with Google</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLoginRedirect}>
              <Text style={styles.loginText}>Already have an account? Log In</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.indicatorContainer}>
          <View style={styles.indicator} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#F5F5F5',
  },
  imageBackgroundContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  topContent: {
    // Correctly position the new logo and text
    position: 'absolute',
    top: 50,
    width: '100%',
    alignItems: 'center',
    zIndex: 1,
  },
  mainLogo: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  mainText: {
    fontSize: 16,
    color: '#166534',
    textAlign: 'center',
  },
  content: {
    marginTop: height * 0.45,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#F5F5F5',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    color: '#14532d',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#166534',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 30,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  buttonText: {
    color: '#14532d',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 12,
  },
  loginText: {
    textAlign: 'center',
    color: '#166534',
    fontWeight: '500',
    marginTop: 8,
  },
  indicatorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 16,
    paddingTop: 8,
  },
  indicator: {
    width: 128,
    height: 6,
    backgroundColor: '#d1d5db',
    borderRadius: 3,
  },
});