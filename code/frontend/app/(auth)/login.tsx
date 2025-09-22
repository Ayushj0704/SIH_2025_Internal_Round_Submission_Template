// app/(auth)/login.tsx
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image, // Import Image
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthContext } from "../_layout";

// Import your logo from the specified path
const logo = require('../../assets/images/logo.png');

export default function LoginPage() {
  const { setIsLoggedIn } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const checkLogin = async () => {
      const loggedIn = await AsyncStorage.getItem("loggedIn");
      if (loggedIn === "true") {
        setIsLoggedIn(true);
        router.replace("/(tabs)/dashboard");
      }
    };
    checkLogin();
  }, []);

  const handleLogin = async () => {
    if (email && password) {
      await AsyncStorage.setItem("loggedIn", "true");
      await AsyncStorage.setItem("landingSeen", "true");
      setIsLoggedIn(true);
      router.replace("/(tabs)/dashboard");
    } else {
      Alert.alert("Error", "Please enter email and password");
    }
  };

  const handleSignUp = () => {
    router.push("/signupdetails");
  };

  return (
    <View style={styles.container}>
      {/* New: Centered Logo and Descriptive Text */}
      <View style={styles.topContent}>
        <Image source={logo} style={styles.mainLogo} resizeMode="contain" />
        <Text style={styles.mainText}>Together, we make a cleaner tomorrow.</Text>
      </View>

      <Text style={styles.title}>Log In</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleSignUp}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#F0FDF4" },
  topContent: {
    alignItems: 'center',
    marginBottom: 40,
  },
  mainLogo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  mainText: {
    fontSize: 16,
    color: '#166534',
    textAlign: 'center',
  },
  title: { fontSize: 28, fontWeight: "700", marginBottom: 24, color: "#14532D", textAlign: "center" },
  input: {
    borderWidth: 1,
    borderColor: "#16a34a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#16a34a",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 12,
  },
  buttonText: { color: "#fff", fontWeight: "700", fontSize: 18 },
  signupText: { textAlign: "center", color: "#166534", fontWeight: "500", marginTop: 8 },
});