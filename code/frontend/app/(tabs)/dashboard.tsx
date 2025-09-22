// app/(tabs)/dashboard.tsx
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const colors = {
  primary: { '50': '#f0fdf4', '100': '#dcfce7', '200': '#bbf7d0', '300': '#86efac', '400': '#4ade80', '500': '#22c55e', '600': '#16a34a', '700': '#15803d', '800': '#166534', '900': '#14532d', '950': '#052e16' },
  gray: { '800': '#1f2937', '500': '#6b7280', '700': '#374151' },
  background: '#F8F9FA',
};

const dailyTips = [
  "Rinse food containers before recycling to prevent contamination.",
  "Composting food scraps can significantly reduce landfill waste.",
  "Plastic bags are not recyclable in most curbside programs.",
  "Donate old electronics instead of throwing them away.",
  "Use reusable bags for shopping to reduce plastic consumption.",
];

export default function DashboardScreen() {
  const [userName, setUserName] = useState("User");
  const [dailyTip, setDailyTip] = useState("");
  const topContributors = [
    { name: 'Aditya', value: '125', avatar: 'https://i.pravatar.cc/150?u=a' },
    { name: 'Harish', value: '115', avatar: 'https://i.pravatar.cc/150?u=b' },
    { name: 'Sunita', value: '105', avatar: 'https://i.pravatar.cc/150?u=c' },
    { name: 'Champak', value: '100', avatar: 'https://i.pravatar.cc/150?u=d' },
  ];
  const upcomingDrives = [
    { id: '1', name: 'River Cleanup Drive', date: 'Oct 25, 2025', location: 'Ganga Ghat' },
    { id: '2', name: 'Tree Plantation Day', date: 'Nov 10, 2025', location: 'City Park' },
    { id: '3', name: 'Beach Cleanup', date: 'Nov 22, 2025', location: 'Juhu Beach' },
  ];

 
const [username, setUsername] = useState("")
useEffect(() => {
    const userIn = async () => {
      try {
        const value = await AsyncStorage.getItem('userInfo');
        
        if (value !== null) {
           setUsername(value.replaceAll(`"`,""));
        }
      } catch (e) {
        console.error("Failed to load username:", e);
      }
    };
    setDailyTip(dailyTips[Math.floor(Math.random() * dailyTips.length)]);
    userIn();
  }, []);



  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.greetingText}>Hello, {username}</Text>
          <Image source={{ uri: 'https://i.pravatar.cc/150?u=user1' }} style={styles.avatar} />
        </View>

        {/* Today's Collection Info */}
        <View style={styles.collectionCard}>
          <Text style={styles.collectionTitle}>Today's Garbage Collection</Text>
          <Text style={styles.collectionType}>Plastic & Paper</Text>
        </View>
        
        {/* NEW: Daily Tip Card */}
        <View style={styles.dailyTipCard}>
          <View style={styles.tipHeader}>
            <Icon name="lightbulb-outline" size={24} color="#15803d" />
            <Text style={styles.tipTitle}>Daily Tip</Text>
          </View>
          <Text style={styles.tipText}>{dailyTip}</Text>
        </View>

        {/* NEW: Upcoming Community Drives Section */}
        <View style={styles.communityDrivesSection}>
          <Text style={styles.communityDrivesTitle}>Upcoming Community Drives</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.drivesList}>
            {upcomingDrives.map((drive, index) => (
              <View key={drive.id} style={styles.driveCard}>
                <Text style={styles.driveName}>{drive.name}</Text>
                <Text style={styles.driveDetail}>🗓️ {drive.date}</Text>
                <Text style={styles.driveDetail}>📍 {drive.location}</Text>
                <TouchableOpacity style={styles.registerButton}>
                  <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Top Contributors */}
        <View style={styles.contributorsSection}>
          <Text style={styles.contributorsTitle}>Top Contributors</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.contributorsList}>
            {topContributors.map((contributor, index) => (
              <View key={index} style={styles.contributorCard}>
                <Image source={{ uri: contributor.avatar }} style={styles.contributorAvatar} />
                <View style={styles.contributorInfo}>
                  <Text style={styles.contributorName}>{contributor.name}</Text>
                  <Text style={styles.contributorValue}>{contributor.value}</Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: { padding: 24, backgroundColor: colors.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 },
  greetingText: { fontSize: 24, fontWeight: '600', color: colors.gray['800'] },
  avatar: { width: 48, height: 48, borderRadius: 24 },
  collectionCard: { backgroundColor: 'white', padding: 20, borderRadius: 16, marginBottom: 32, ...Platform.select({ ios: { shadowColor: 'rgba(0,0,0,0.05)', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 1, shadowRadius: 15 }, android: { elevation: 2 } }) },
  collectionTitle: { fontSize: 14, fontWeight: '500', color: colors.gray['500'], marginBottom: 4 },
  collectionType: { fontSize: 20, fontWeight: '600', color: colors.gray['800'] },
  dailyTipCard: { backgroundColor: colors.primary['100'], padding: 16, borderRadius: 12, marginBottom: 20, borderWidth: 1, borderColor: colors.primary['200'] },
  tipHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  tipTitle: { fontSize: 16, fontWeight: '600', color: colors.primary['800'], marginLeft: 8 },
  tipText: { fontSize: 14, color: colors.primary['700'], lineHeight: 20 },
  communityDrivesSection: { marginBottom: 20 },
  communityDrivesTitle: { fontSize: 20, fontWeight: '600', color: colors.gray['800'], marginBottom: 16 },
  drivesList: { paddingBottom: 16 },
  driveCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginRight: 16,
    width: 250,
    ...Platform.select({
      ios: { shadowColor: 'rgba(0,0,0,0.05)', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 6 },
      android: { elevation: 2 },
    })
  },
  driveName: { fontSize: 18, fontWeight: '600', color: colors.gray['800'], marginBottom: 8 },
  driveDetail: { fontSize: 14, color: colors.gray['500'], marginBottom: 4 },
  registerButton: {
    backgroundColor: colors.primary['600'],
    borderRadius: 8,
    paddingVertical: 10,
    marginTop: 12,
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  contributorsSection: { marginBottom: 20 },
  contributorsTitle: { fontSize: 20, fontWeight: '600', color: colors.gray['800'], marginBottom: 16 },
  contributorsList: { paddingBottom: 16 },
  contributorCard: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minWidth: 120, backgroundColor: 'white', padding: 16, borderRadius: 16, marginRight: 16, ...Platform.select({ ios: { shadowColor: 'rgba(0,0,0,0.05)', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 1, shadowRadius: 6 }, android: { elevation: 2 } }) },
  contributorAvatar: { height: 64, width: 64, borderRadius: 32, marginBottom: 8 },
  contributorInfo: { alignItems: 'center' },
  contributorName: { fontWeight: '600', color: colors.gray['700'] },
  contributorValue: { fontSize: 12, color: colors.gray['500'] },
});