// app/_layout.tsx
import { Slot, useRouter } from "expo-router";
import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


type AuthContextType = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuthContext must be used inside AuthProvider");
  return ctx;
}

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check login status on app start
  useEffect(() => {
    const checkLogin = async () => {
      const value = await AsyncStorage.getItem("isLoggedIn");
      if (value === "true") {
        setIsLoggedIn(true);
        router.replace("/dashboard"); // Redirect to dashboard if logged in
      }
      setLoading(false);
    };
    checkLogin();
  }, []);

  if (loading) return null; // or a splash/loading screen

  return (
    
      <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
        <Slot />
      </AuthContext.Provider>
    );
}
