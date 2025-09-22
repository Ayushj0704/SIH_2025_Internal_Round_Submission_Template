// app/(tabs)/training.tsx
import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, ImageBackground, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import YoutubePlayer from 'react-native-youtube-iframe';
import { WebView } from 'react-native-webview';
import Modal from 'react-native-modal';

export default function TrainingPage() {
  
 const [isModalVisible, setModalVisible] = useState(false);
const [videoUrl, setVideoUrl] = useState('');
 const [Playing, setplaying] = useState(true);

  const onStateChange = useCallback((state:any) => {
        if (state === "ended") {
            setplaying(false);
            Alert.alert("Video has finished playing!");
        }
    }, []);

const handleVideoPress = (videoID:any) => {
  
    setVideoUrl(videoID);
    setModalVisible(true);
    setplaying(true); // Start playing immediately
};
const youTubeLinks = {
        segregationBasics: 'O1qTFFF0zd8', // Replace with actual video IDs
        composting: 'EIR6_LoCcps',
        wasteLaws: 'AB02AyLKB2w',
    };
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header content moved to _layout.tsx */}
        <ScrollView contentContainerStyle={styles.mainContent}>
          <Text style={styles.mainTitle}>Learn Waste Management</Text>
          <View style={styles.cardList}>
            {/* Card 1: Segregation Basics */}
            <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => handleVideoPress(youTubeLinks.segregationBasics)}>
              <ImageBackground
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCaPJJDL52LYovFsz8KD_mgXKqs7u8TQSnoyef4c6uTUHbg98x9-A82MFmOa1-CeB57BampAtscBKq7Wm8ZoibqCv9ogOHFuLvVwb8hPIOjY6s7jMREo2ySyvlFTSz7zquygL1h6OPS7k6XxctBFlAnJPZF6Q_4vWJypNhCiNAd7lpMjGGE4yqJtW45ySE7LlE1196LEL9SWoZV6UW9eAlzaGUxqXQLORXLKvRiZnSBzbFTCYk_j42HPn3FJaSM4YwruIga_iqyCdw' }}
                style={styles.cardImage}
                imageStyle={{ borderRadius: 5, overflow: 'hidden',width:'111%' }}
              >
                <View style={styles.overlay} />
                <View style={styles.timerContainer}>
                  <MaterialIcons name="timer" size={16} color="#fff" />
                  <Text style={styles.timerText}>3 mins</Text>
                </View>
              </ImageBackground>
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>Segregation Basics</Text>
                <Text style={styles.cardDescription}>Learn the fundamentals of waste segregation with interactive videos and quizzes.</Text>
                <View style={styles.progressBarBackground}>
                  <View style={[styles.progressBar, { width: '10%', backgroundColor: '#a3d4a3' }]} />
                </View>
                <View style={styles.progressTextContainer}>
                  <Text style={styles.progressText}>5%Complete</Text>
                  <Text style={styles.progressTextBold}>Keep Going!</Text>
                </View>
              </View>
            </TouchableOpacity>
            {/* Card 2: Composting at Home */}
            <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => handleVideoPress(youTubeLinks.composting)}>
              <ImageBackground
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCkGRCVthOqdyYCBglHL7NcI95Aux8E2UcK4Xo7-NH__4LhVfjli0_ApZNCjxNVuoxpbDRiLQWtZ4GP6mGOhiyPlsFfHRMCzGg6USIyx5LDg7VvSCSv83Xtig88tNpJEZs8R5qJnrpJjLG1azQEGY9N1yMS3ebyyRcNPMbhify6vLzZX3tuCP4hwrcaMnknVX5vp-1VU7uHitdeEfrP3IGfbLv_P8WykLkhLtos8slcM9pke58SvxsH5XBqdzAa1hZ2Zo_REYkyQsE' }}
                style={styles.cardImage}
                imageStyle={{borderRadius: 5, overflow: 'hidden',width:'111%' }}
              >
                <View style={styles.overlay} />
                <View style={styles.timerContainer}>
                  <MaterialIcons name="timer" size={16} color="#fff" />
                  <Text style={styles.timerText}>7 mins</Text>
                </View>
              </ImageBackground>
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>Composting at Home</Text>
                <Text style={styles.cardDescription}>Discover how to compost at home and reduce your environmental footprint.</Text>
                <View style={styles.progressBarBackground}>
                  <View style={[styles.progressBar, { width: '25%', backgroundColor: '#fbbf24' }]} />
                </View>
                <View style={styles.progressTextContainer}>
                  <Text style={styles.progressText}>25% Complete</Text>
                </View>
              </View>
            </TouchableOpacity>
            {/* Card 3: Waste Laws & Rights */}
            <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => handleVideoPress(youTubeLinks.wasteLaws)}>
              <ImageBackground
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDz89Os-mglhNI_p3SMuOYIoo3dz3dDt_-FsBMP7nEC_YjEkLjG-fx7PapF7eNA5sogqbdsv-IQPCuglyvyibha51I0XwY2fdacrcMtpI9Zc3uyGn5vff5CJVBjwAbyRAI_enwuAbSNeLdX4evyPGktjH0sSSGw-QCHvCcepLev2cCkVEj8VMaVT3s-22ecWb7kds1dLYbm2P3guNlkLIqoF-6yIqxJGZHjK7attDdB17elvfwYGTIaAXClPj-NR6RGHIRKRBLN5Wo' }}
                style={styles.cardImage}
                imageStyle={{ borderRadius: 5, overflow: 'hidden',width:'111%'}}
              >
                <View style={styles.overlay} />
                <View style={styles.badgeContainer}>
                  <MaterialIcons name="military-tech" size={24} color="#f59e0b" />
                </View>
                <View style={styles.timerContainer}>
                  <MaterialIcons name="timer" size={16} color="#fff" />
                  <Text style={styles.timerText}> 5 mins</Text>
                </View>
              </ImageBackground>
              <View style={styles.cardBody}>
                <Text style={styles.cardTitle}>Waste Laws & Rights</Text>
                <Text style={styles.cardDescription}>Understand your rights and responsibilities regarding waste management.</Text>
                <View style={styles.progressBarBackground}>
                  <View style={[styles.progressBar, { width: '0%', backgroundColor: '#a3d4a3' }]} />
                </View>
                <View style={styles.progressTextContainer}>
                  <Text style={styles.progressText}>Not started</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
        {/* Video Modal using react-native-modal */}
            <Modal isVisible={isModalVisible} onBackdropPress={() => { setModalVisible(false); setplaying(false); }} style={styles.modalView}>
                <View style={styles.modalContent}>
                    <YoutubePlayer
                        width='100%'
                        height='100%'
                        play={Playing}
                        videoId={videoUrl}
                        onChangeState={onStateChange}
                    />
                    <TouchableOpacity onPress={() => { setModalVisible(false); setplaying(false); }} style={styles.closeButton}>
                        <MaterialIcons name="close" size={24} color="#fff" />
                    </TouchableOpacity>
                </View>
            </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#EEF7EE' },
  container: { flex: 1, backgroundColor: '#eef7ee' },
  mainContent: { padding: 24 },
  mainTitle: { fontSize: 28, fontWeight: '700', color: '#111711', marginBottom: 24 },
  cardList: { gap: 24 },
  card: { backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: 24, overflow: 'hidden', shadowColor: '#000', shadowOffset: { width: 0, height: 14 }, shadowOpacity: 1, shadowRadius:6 ,elevation:10 },
  cardImage: { width: '100%', aspectRatio: 16/9, justifyContent: 'flex-end', padding: 16 },
  overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.3)' },
  timerContainer: { position: 'absolute', bottom: 16, right: 16, flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 4 },
  timerText: { color: '#fff', fontSize: 12, fontWeight: '500' },
  badgeContainer: { position: 'absolute', top: 12, left: 12, backgroundColor: '#fff', borderRadius: 999, padding: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.2, shadowRadius: 4, elevation: 3 },
  cardBody: { padding: 20 },
  cardTitle: { fontSize: 20, fontWeight: '700', color: '#111711' },
  cardDescription: { fontSize: 14, color: '#4a774a', marginTop: 4, marginBottom: 16 },
  progressBarBackground: { width: '100%', height: 10, backgroundColor: '#d1d5db', borderRadius: 999 },
  progressBar: { height: 10, borderRadius: 999 },
  progressTextContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
  progressText: { fontSize: 12, color: '#4a774a' },
  progressTextBold: { fontSize: 12, color: '#4a774a', fontWeight: '600' },
   modalView: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    },
    modalContent: {
        width: '95%', // 90% of screen width
        aspectRatio:16/9,
        backgroundColor: '#000',
        borderRadius: 10,
        overflow: 'hidden',
    },
    webView: {
        flex: 1,
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        zIndex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: 5,
    },
});