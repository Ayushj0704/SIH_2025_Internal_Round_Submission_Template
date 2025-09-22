// app/(tabs)/leaderboard.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function LeaderboardScreen() {
  
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

const leaderboardData = [
  { rank: 1, name: "Ramesh", points: 1500, avatar: 'https://avatar.iran.liara.run/public/48' },
  { rank: 2, name: 'Aditya', points: 1250, avatar: 'https://i.pravatar.cc/150?u=a' },
  { rank: 3, name: 'Sunita', points: 1050, avatar: 'https://i.pravatar.cc/150?u=c' },
  { rank: 4, name: 'Harish', points: 980, avatar: 'https://i.pravatar.cc/150?u=b' },
  { rank: 5, name: 'Champak', points: 900, avatar: 'https://i.pravatar.cc/150?u=d' },
];
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Global Leaderboard</Text>
        <Text style={styles.subtitle}>Top contributors this month</Text>

        <View style={styles.leaderboardList}>
          {leaderboardData.map((user, index) => (
            <View key={user.rank} style={styles.leaderboardItem}>
              <Text style={[styles.rankText, index < 3 && styles.topRank]}>{user.rank}</Text>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
              <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.rank===1 && username || user.name}</Text>
                <Text style={styles.pointsText}>{user.points} points</Text>
              </View>
              {index < 3 && <MaterialIcons name="emoji-events" size={24} color={index === 0 ? '#FFD700' : index === 1 ? '#C0C0C0' : '#CD7F32'} />}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#f9fafb' },
  container: { padding: 24 },
  title: { fontSize: 24, fontWeight: '700', color: '#1f2937', marginBottom: 8 },
  subtitle: { fontSize: 16, color: '#6b7280', marginBottom: 24 },
  leaderboardList: { gap: 16 },
  leaderboardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  rankText: { fontSize: 20, fontWeight: 'bold', marginRight: 16, minWidth: 30, textAlign: 'center' },
  topRank: { color: '#16a34a' },
  avatar: { width: 50, height: 50, borderRadius: 25, marginRight: 16 },
  userInfo: { flex: 1 },
  userName: { fontSize: 16, fontWeight: '600', color: '#1f2937' },
  pointsText: { fontSize: 14, color: '#6b7280' },
});