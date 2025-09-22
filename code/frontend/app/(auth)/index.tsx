// app/(auth)/index.tsx
import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  TextInput,
  Alert,
  ScrollView,
  Platform,
} from "react-native";
import PagerView from "react-native-pager-view";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LandingPage() {
  const pagerRef = useRef<PagerView>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Check if user already logged in
    AsyncStorage.getItem("isLoggedIn").then((value) => {
      if (value === "true") {
        router.replace("/dashboard");
      }
    });
  }, []);

  const handleNext = () => {
    if (pagerRef.current && currentPage < 2) {
      pagerRef.current.setPageWithoutAnimation(currentPage + 1);
    }
  };

  const handlePageSelected = (e: any) => {
    setCurrentPage(e.nativeEvent.position);
  };
 const handlePress=()=>{
  router.replace("/login")
 }
  const handleLogin = async () => {
    if (email && password) {
      // Save login state
      await AsyncStorage.setItem("isLoggedIn", "true");
      router.replace("/dashboard");
    } else {
      Alert.alert("Error", "Please enter email and password");
    }
  };

  const handleSignUp = () => {
    router.push("/signup");
  };

  return (
    <SafeAreaView style={styles.container}>
      <PagerView
        style={{ flex: 1 }}
        initialPage={0}
        ref={pagerRef}
        onPageSelected={handlePageSelected}
      >
        {/* Page 1 */}
        <View key="1" style={[styles.page, styles.pageLight]}>
          <View style={styles.pageContent}>
            <View style={styles.imageWrapper}>
              <ImageBackground
                source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6ogVCAmqMLzM-7G1KWumpogI4PWTpe9QyMXMUyxT39rf9KrhwIas-x9Holtlcl8S80qyJA8Wph0HA9KkKIiGdT0w1w03hqPNhW3iCMxzUZkycVH5Cam1_qGGzj7tDDgaYxrb07hKtqVYYxM4wDFo_UfisUkqvtQ8UkobWGWNZcVOvwgYRvQsPMGxdTaF9tr85KUd7Jam18fQ6OS9LpNVjSF87eo82T40owR7we78zcFlPKCh2NL-Iey5g1i1jJB-9hpyCrBVB--4" }}
                style={styles.image}
                imageStyle={{ borderRadius: 20 }}
                resizeMode="cover"
              />
            </View>

            <View style={styles.textBlock}>
              <Text style={styles.h1}>Segregate Waste, Save the Planet</Text>
              <Text style={styles.p}>
                Join us in our mission to create a cleaner, greener future.
                Learn how to properly sort your waste and contribute to a
                sustainable world.
              </Text>
            </View>
          </View>

          <View style={styles.footer}>
            <TouchableOpacity style={styles.primaryButton} onPress={handleNext}>
              <Text style={styles.primaryButtonText}>Swipe</Text>
              <MaterialIcons
                name="arrow-forward"
                size={22}
                color="#14532D"
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Page 2 */}
        <View key="2" style={[styles.page, styles.pageWhite]}>
          <ImageBackground
            source={{ uri: "https://lh3.googleusercontent.com/aida-public/AB6AXuAFTVSicVZOkm-7Z1xFvU9ImkVA8gJPslEvaCDV-5VmAXY8-nhQHLMVM0qosw3j1TZ7pqEb-3I3eHZfXdn2-9dPlizPRKn2A8K4l_OyTJz4ZS98Hhf8maw0qrnQlIjbFQZwlNqttMRxd-RNxpFR-4FArO0tfObfycYI-aHi8o9-SprSrnUAdSEDzvMF0nOf13DtE45lN38VXfQRi2Qt-Enc25MzFNULDS6Jfh6KIs4lq3MQ9UEOtRjTLI4pLkO0SutxD00cHLmETAc" }}
            style={{ flex: 1, minHeight: 300 }}
            resizeMode="cover"
          />
          <View style={{ padding: 24, alignItems: "center" }}>
            <Text style={styles.h1Dark}>Our Mission</Text>
            <Text style={styles.pDark}>
              We're on a mission to make waste segregation easy and rewarding,
              helping you contribute to a greener planet.
            </Text>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity style={styles.primaryButtonAlt} onPress={handlePress}>
              <Text style={styles.primaryButtonAltText} >Next</Text>
              <MaterialIcons
                name="arrow-forward"
                size={22}
                color="#111827"
                style={{ marginLeft: 8 }}
              />
            </TouchableOpacity>
          </View>
        </View>

      </PagerView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0FDF4" },
  page: { flex: 1, justifyContent: "space-between" },
  pageLight: { backgroundColor: "#F0FDF4" },
  pageWhite: { backgroundColor: "#FFFFFF" },
  pageContent: { flex: 1, alignItems: "center", paddingTop: 32 },
  imageWrapper: { width: "90%", aspectRatio: 1 },
  image: { flex: 1, overflow: "hidden" },
  textBlock: { marginTop: 24, paddingHorizontal: 24, alignItems: "center" },
  h1: { fontSize: 28, fontWeight: "700", color: "#14532D", textAlign: "center" },
  p: { marginTop: 16, fontSize: 16, color: "#166534", textAlign: "center", lineHeight: 22 },
  footer: { paddingHorizontal: 24, paddingBottom: 24 },
  primaryButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    borderRadius: 999,
    backgroundColor: "#38e07b",
  },
  primaryButtonText: { fontSize: 18, fontWeight: "700", color: "#14532D" },
  primaryButtonAlt: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    borderRadius: 999,
    backgroundColor: "#38e07b",
  },
  primaryButtonAltText: { fontSize: 18, fontWeight: "700", color: "#111827" },
  h1Dark: { fontSize: 28, fontWeight: "700", color: "#111827", textAlign: "center" },
  pDark: { marginTop: 16, fontSize: 18, color: "#4B5563", textAlign: "center" },
  h1Large: { fontSize: 32, fontWeight: "700", color: "#14532D", textAlign: "center", marginVertical: 16 },
  input: {
    width: "90%",
    marginTop: 16,
    borderWidth: 1,
    borderColor: "#16a34a",
    borderRadius: 12,
    padding: 16,
  },
  loginButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    borderRadius: 999,
    backgroundColor: "#16a34a",
    marginTop: 16,
    width: "90%",
  },
  loginButtonText: { fontSize: 18, fontWeight: "700", color: "#fff" },
  signupButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 56,
    borderRadius: 999,
    backgroundColor: "#22c55e",
    marginTop: 12,
    width: "90%",
  },
  signupButtonText: { fontSize: 18, fontWeight: "700", color: "#fff" },
});
