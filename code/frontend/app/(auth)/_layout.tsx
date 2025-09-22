// app/(auth)/_layout.tsx
import { Stack } from "expo-router";
import { View, Text, Image, StyleSheet } from "react-native";

// Fix: Corrected the folder name to 'images'
const logo = require('../../assets/images/logo.png');

const HeaderTitle = () => (
  <View style={headerStyles.headerContainer}>
    <Image source={logo} style={headerStyles.headerLogo} resizeMode="contain" />
    <Text style={headerStyles.headerText}>EcoSankalan</Text>
  </View>
);

const headerStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingLeft: 10,
  },
  headerLogo: {
    width: 55,
    height: 55,
    marginRight: 10,
  },
  headerText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#16a34a',
  },
});

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitle: () => <HeaderTitle />,
        headerStyle: {
          backgroundColor: '#fff',
        },
        // Corrected: The standard way to remove the default shadow and border.
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" options={{ title: "EcoSankalan" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
      <Stack.Screen
        name="signupdetails"
        options={{ title: "Sign Up Details" }}
      />
    </Stack>
  );
}