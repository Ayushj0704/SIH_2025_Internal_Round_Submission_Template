// app/(tabs)/profile.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuthContext } from "../_layout";

const achievements = [
  { id: '1', name: 'First Contribution', icon: 'thumb-up-alt', color: '#f59e0b', description: 'Made your first contribution.' },
  { id: '2', name: 'Recycling Rookie', icon: 'recycling', color: '#10b981', description: 'Completed a training module.' },
  { id: '3', name: 'Community Helper', icon: 'groups', color: '#3b82f6', description: 'Participated in a cleanup drive.' },
  { id: '4', name: 'Eco-Warrior', icon: 'forest', color: '#16a34a', description: 'Contributed over 100kg of waste.' },
];

export default function ProfileScreen() {
  const { setIsLoggedIn } = useAuthContext();

  const handleLogout = async () => {
    await AsyncStorage.removeItem("loggedIn");
    setIsLoggedIn(false);
    router.replace("/(auth)/login");
  };

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
    userIn();
  }, []);


  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.main}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://avatar.iran.liara.run/public/48' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editButton}>
              <MaterialIcons name="edit" size={16} color="white" />
            </TouchableOpacity>
          </View>
          <Text style={styles.profileName}>{username}</Text>
          <Text style={styles.profileStatus}>Citizen</Text>
          <View style={styles.idContainer}>
            <Text style={styles.idText}>ID: #123456</Text>
            <TouchableOpacity>
              <MaterialIcons name="qr-code-2" size={20} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Training Progress Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Training Progress & Status</Text>
          <View style={styles.trainingGrid}>
            <View style={styles.trainingItem}>
              <View style={styles.trainingIconBox}>
                <MaterialIcons name="recycling" size={40} color="#34d399" />
              </View>
              <Text style={styles.trainingText}>Source Segregation</Text>
            </View>
            <View style={styles.trainingItem}>
              <View style={styles.trainingIconBox}>
                <MaterialIcons name="eco" size={40} color="#34d399" />
              </View>
              <Text style={styles.trainingText}>Composting</Text>
            </View>
            <View style={styles.trainingItem}>
              <View style={styles.trainingIconBox}>
                <MaterialIcons name="shopping-bag" size={40} color="#34d399" />
              </View>
              <Text style={styles.trainingText}>Plastic Reuse</Text>
            </View>
          </View>
        </View>

        {/* NEW: Achievements Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsGrid}>
            {achievements.map((item) => (
              <View key={item.id} style={styles.achievementItem}>
                <MaterialIcons name={item.icon as any} size={40} color={item.color} />
                <Text style={styles.achievementName}>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Waste Contribution Dashboard */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Waste Contribution Dashboard</Text>
          <View style={styles.dashboardGrid}>
            <View style={styles.dashboardItem}>
              <Text style={styles.dashboardLabel}>Dry Waste</Text>
              <Text style={styles.dashboardValue}>15kg</Text>
            </View>
            <View style={styles.dashboardItem}>
              <Text style={styles.dashboardLabel}>Wet Waste</Text>
              <Text style={styles.dashboardValue}>20kg</Text>
            </View>
            <View style={styles.dashboardItem}>
              <Text style={styles.dashboardLabel}>Hazardous</Text>
              <Text style={styles.dashboardValue}>2kg</Text>
            </View>
            <View style={styles.dashboardItem}>
              <Text style={styles.dashboardLabel}>Composted</Text>
              <Text style={styles.dashboardValue}>10kg</Text>
            </View>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoTextBold}>You've saved 25kg of CO₂!</Text>
            <Text style={styles.infoText}>That's equivalent to planting a tree.</Text>
          </View>
        </View>

        {/* Incentives & Rewards Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Incentives & Rewards</Text>
          <View style={styles.listContainer}>
            <TouchableOpacity style={styles.listItem}>
              <View style={[styles.listIconBox, { backgroundColor: '#fef3c7' }]}>
                <MaterialIcons name="emoji-events" size={30} color="#f59e0b" />
              </View>
              <View style={styles.listItemTextContainer}>
                <Text style={styles.listItemTitle}>Badges & Points</Text>
                <Text style={styles.listItemSubtitle}>1500 points</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItem}>
              <View style={[styles.listIconBox, { backgroundColor: '#fee2e2' }]}>
                <MaterialIcons name="redeem" size={30} color="#ef4444" />
              </View>
              <View style={styles.listItemTextContainer}>
                <Text style={styles.listItemTitle}>Incentives Redeemed</Text>
                <Text style={styles.listItemSubtitle}>5 items</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
            </TouchableOpacity>
            <View style={styles.listHighlightItem}>
              <View style={[styles.listIconBox, { backgroundColor: '#d1fae5', width: 40, height: 40 }]}>
                <MaterialIcons name="verified-user" size={30} color="#10b981" />
              </View>
              <Text style={styles.listHighlightText}>Green Champion</Text>
            </View>
          </View>
        </View>

        {/* Community Participation Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Community Participation</Text>
          <View style={styles.listContainer}>
            <TouchableOpacity style={styles.listItem}>
              <View style={[styles.listIconBox, { backgroundColor: '#dbeafe' }]}>
                <MaterialIcons name="groups" size={30} color="#3b82f6" />
              </View>
              <View style={styles.listItemTextContainer}>
                <Text style={styles.listItemTitle}>Cleanup Drives</Text>
                <Text style={styles.listItemSubtitle}>3 contributions</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.listItem}>
              <View style={[styles.listIconBox, { backgroundColor: '#e9d5ff' }]}>
                <MaterialIcons name="add-location-alt" size={30} color="#a855f7" />
              </View>
              <View style={styles.listItemTextContainer}>
                <Text style={styles.listItemTitle}>Geo-tagged Waste Reports</Text>
                <Text style={styles.listItemSubtitle}>2 reports</Text>
              </View>
              <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.reportButton}>
            <MaterialIcons name="add-a-photo" size={24} color="white" />
            <Text style={styles.reportButtonText}>Report Improper Dumping</Text>
          </TouchableOpacity>
        </View>

        {/* Quick Access Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Access & Utilities</Text>
          <View style={styles.linkList}>
            <TouchableOpacity style={styles.linkItem}>
              <View style={[styles.linkIconBox, { backgroundColor: '#d1fae5' }]}>
                <MaterialIcons name="local-shipping" size={24} color="#10b981" />
              </View>
              <Text style={styles.linkText}>Track Waste Collection Vehicle</Text>
              <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.linkItem}>
              <View style={[styles.linkIconBox, { backgroundColor: '#d1fae5' }]}>
                <MaterialIcons name="location-on" size={24} color="#10b981" />
              </View>
              <Text style={styles.linkText}>Find Nearby Facilities</Text>
              <MaterialIcons name="chevron-right" size={24} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Penalization & Compliance Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Penalization & Compliance</Text>
          <View style={styles.listContainer}>
            <View style={styles.listItem}>
              <View style={[styles.listIconBox, { backgroundColor: '#fee2e2' }]}>
                <MaterialIcons name="notifications-active" size={30} color="#ef4444" />
              </View>
              <View style={styles.listItemTextContainer}>
                <Text style={styles.listItemTitle}>Non-Compliance Alerts</Text>
                <Text style={styles.listItemSubtitle}>No fines</Text>
              </View>
            </View>
            <View style={styles.listItem}>
              <View style={[styles.listIconBox, { backgroundColor: '#d1fae5' }]}>
                <MaterialIcons name="check-circle" size={30} color="#22c55e" />
              </View>
              <View style={styles.listItemTextContainer}>
                <Text style={styles.listItemTitle}>Segregation Rule Compliance</Text>
                <Text style={styles.listItemSubtitle}>100% compliant</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <MaterialIcons name="logout" size={24} color="white" />
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f9fafb' },
  container: { flex: 1, backgroundColor: '#fff' },
  main: { paddingVertical: 24, paddingHorizontal: 16, backgroundColor: '#f9fafb' },
  profileSection: { alignItems: 'center', textAlign: 'center', marginBottom: 24 },
  profileImageContainer: { position: 'relative', marginBottom: 16 },
  profileImage: { width: 128, height: 128, borderRadius: 999 },
  editButton: { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#16a34a', borderRadius: 999, padding: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 },
  profileName: { fontSize: 24, fontWeight: '700', color: '#111811' },
  profileStatus: { fontSize: 16, fontWeight: '500', color: '#10b981' },
  idContainer: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8, backgroundColor: '#f3f4f6', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 999 },
  idText: { fontSize: 14, color: '#4b5563' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#111811', marginBottom: 12 },
  trainingGrid: { flexDirection: 'row', justifyContent: 'space-between', gap: 16 },
  trainingItem: { flex: 1, alignItems: 'center', gap: 8 },
  trainingIconBox: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#d1fae5', borderRadius: 999, width: 80, height: 80 },
  trainingText: { fontSize: 14, fontWeight: '500', color: '#111811', textAlign: 'center' },
  achievementsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  achievementItem: { width: '48%', alignItems: 'center', backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#e5e7eb', ...Platform.select({ ios: { shadowColor: 'rgba(0,0,0,0.05)', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 1, shadowRadius: 4 }, android: { elevation: 2 } }) },
  achievementName: { fontSize: 14, fontWeight: '600', color: '#1f2937', textAlign: 'center', marginTop: 8 },
  dashboardGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginHorizontal: -8, },
  dashboardItem: { flexDirection: 'column', gap: 8, borderRadius: 8, padding: 16, borderWidth: 1, borderColor: '#e5e7eb', backgroundColor: '#fff', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1, width: '48%', marginBottom: 16 },
  dashboardLabel: { fontSize: 14, fontWeight: '500', color: '#4b5563' },
  dashboardValue: { fontSize: 24, fontWeight: '700', color: '#111811' },
  infoBox: { marginTop: 16, borderRadius: 8, padding: 16, backgroundColor: '#d1fae5', borderWidth: 1, borderColor: '#a7f3d0', textAlign: 'center', alignItems: 'center' },
  infoTextBold: { fontSize: 16, fontWeight: '600', color: '#065f46' },
  infoText: { fontSize: 14, color: '#047857' },
  listContainer: { gap: 12 },
  listItem: { flexDirection: 'row', alignItems: 'center', gap: 16, backgroundColor: '#fff', padding: 12, borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1, borderWidth: 1, borderColor: '#e5e7eb' },
  listIconBox: { alignItems: 'center', justifyContent: 'center', borderRadius: 8, width: 48, height: 48, flexShrink: 0 },
  listItemTextContainer: { flex: 1 },
  listItemTitle: { fontSize: 16, fontWeight: '500', color: '#111811' },
  listItemSubtitle: { fontSize: 14, color: '#4b5563' },
  listHighlightItem: { flexDirection: 'row', alignItems: 'center', gap: 16, backgroundColor: '#d1fae5', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#a7f3d0' },
  listHighlightText: { flex: 1, fontSize: 16, fontWeight: '600', color: '#065f46' },
  reportButton: { marginTop: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 8, height: 44, backgroundColor: '#16a34a', paddingHorizontal: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 },
  reportButtonText: { color: '#fff', fontSize: 14, fontWeight: '700' },
  linkList: { gap: 1, backgroundColor: '#fff', borderRadius: 8, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 2, elevation: 1, borderWidth: 1, borderColor: '#e5e7eb', overflow: 'hidden', },
  linkItem: { flexDirection: 'row', alignItems: 'center', gap: 16, padding: 12, backgroundColor: '#fff' },
  linkItemBorder: { borderBottomWidth: 1, borderBottomColor: '#e5e7eb' },
  linkIconBox: { alignItems: 'center', justifyContent: 'center', borderRadius: 8, width: 40, height: 40, flexShrink: 0 },
  linkText: { flex: 1, fontSize: 16, fontWeight: '500', color: '#111811' },
  logoutButton: { marginTop: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, borderRadius: 8, height: 50, backgroundColor: '#dc2626', paddingHorizontal: 16, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 4 },
  logoutButtonText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});