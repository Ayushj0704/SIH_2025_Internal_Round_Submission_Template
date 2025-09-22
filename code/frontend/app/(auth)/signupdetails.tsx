import React, { useState } from 'react';
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  Text,
  Alert,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  TextInput,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { router } from 'expo-router';

export default function SignupDetailsPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [dob, setDob] = useState('');
  
  
  const validateForm = () => {
    // Basic validation for empty fields
    if (!name || !email || !password || !phone || !dob) {
      Alert.alert('Validation Error', 'All fields are required.');
      return false;
    }

    // Email validation using a regular expression
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Validation Error', 'Please enter a valid email address.');
      return false;
    }

    // Password validation based on backend schema
    if (password.length < 6) {
      Alert.alert('Validation Error', 'Password must be at least 6 characters long.');
      return false;
    }

    // Phone number validation for 10 digits
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert('Validation Error', 'Phone number must be exactly 10 digits.');
      return false;
    }

    // Date of Birth validation (DD/MM/YYYY)
    const dobRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dobRegex.test(dob)) {
      Alert.alert('Validation Error', 'Please enter a valid date of birth in DD/MM/YYYY format.');
      return false;
    }
    
    // You could also add a check to make sure the date is a valid date
    // For a simple check, we will assume the format is correct.

    return true;
  };
  const handleSignup = async() => {
     if (!validateForm()) {
      return;
    }

    // Convert DOB to YYYY-MM-DD for backend
    const [day, month, year] = dob.split('/');
    const formattedDob = `${year}-${month}-${day}`;
  // **This is the key change to fix the network error**
    const backendUrl = "https://sih-project-25-ukt8.onrender.com";

    try {
      const response = await fetch(`${backendUrl}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          phoneNumber: phone,
          dob: formattedDob,
        }),
      });

      const data = await response.json();

      if (response.ok) {
      
        Alert.alert('Success', data.msg);
         const userInfo = name;
        await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        // Navigate to login screen or home screen
       
        router.push('/login');
      } else {
        Alert.alert('Signup Failed', data.msg || 'An unknown error occurred.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Network Error', 'Could not connect to the server.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} bounces={false}>
        <View style={styles.imageBackgroundContainer}>
          <ImageBackground
            source={{
              uri: 'https://plus.unsplash.com/premium_photo-1681488503746-0e2cfffb5b36?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            <View style={styles.overlay} />
          </ImageBackground>
        </View>

        <View style={styles.content}>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Create your account</Text>
            <Text style={styles.subtitle}>Enter your details to get started</Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#9ca3af"
              value={name}
              onChangeText={setName}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#9ca3af"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="#9ca3af"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
            />
            <TextInput
              style={styles.input}
              placeholder="Date of Birth (DD/MM/YYYY)"
              placeholderTextColor="#9ca3af"
              value={dob}
              onChangeText={setDob}
            />
          </View>

          <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
            <Text style={styles.signupButtonText}>Sign Up</Text>
          </TouchableOpacity>
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
    backgroundColor: '#bda3a3cd',
  },
  imageBackgroundContainer: {
    ...StyleSheet.absoluteFillObject,
  },
  backgroundImage: {
    width: '100%',
    height: '60%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  content: {
    marginTop: height * 0.3,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 32,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: '#F5F5F5',
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    color: '#14532d',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    color: '#166534',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    marginTop: 8,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    color: '#14532d',
  },
  signupButton: {
    backgroundColor: '#166534',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
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