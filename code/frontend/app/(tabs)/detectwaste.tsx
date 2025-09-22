// app/(tabs)/detectWaste.tsx
import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, Pressable } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import CameraWasteButton from '@/components/Camerabtn';

export default function DetectWasteScreen() {
  const [lastPhoto, setLastPhoto] = useState<string | null>(null);
  const [predictionResult, setPredictionResult] = useState<string | null>(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Main Content Area: Changes based on photo status */}
        <View style={styles.mainContent}>
          {lastPhoto ? (
            // Results State: Show the photo and prediction
            <View style={styles.resultsContainer}>
              <Text style={styles.predictionLabel}>Prediction:</Text>
              <Text style={styles.predictionText}>{predictionResult ? predictionResult : "—"}</Text>
              <Pressable onPress={() => setLastPhoto(null)} style={styles.imageWrapper}>
                <Image
                  source={{ uri: lastPhoto }}
                  style={styles.resultImage}
                />
                <View style={styles.overlayTextContainer}>
                  <Text style={styles.overlayText}>Tap to remove</Text>
                </View>
              </Pressable>
            </View>
          ) : (
            // Empty State: Prompt the user to take a photo
            <View style={styles.emptyStateContainer}>
              <View style={styles.cameraFrame}>
                <MaterialIcons name="center-focus-strong" size={120} color="#d1d5db" />
              </View>
              <Text style={styles.emptyStateTitle}>Start Waste Detection</Text>
              <Text style={styles.emptyStateSubtitle}>
                Point the camera at a waste item to get a quick classification and disposal tips.
              </Text>
            </View>
          )}
        </View>

        {/* Fixed Button Section at the bottom */}
        <View style={styles.buttonContainer}>
          <CameraWasteButton
            apiUrl="https://sih-project-25-1.onrender.com/api/waste/detect"
            title="Take Live Waste Photo"
            style={styles.detectButton}
            onResult={({ imageUrl, response }) => {
              setLastPhoto(imageUrl);
              setPredictionResult(response?.topPrediction || "No prediction");
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 24,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  cameraFrame: {
    borderWidth: 2,
    borderColor: '#e5e7eb',
    borderRadius: 20,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emptyStateTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  resultsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  predictionLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  predictionText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#16a34a',
    marginBottom: 20,
  },
  imageWrapper: {
    position: 'relative',
  },
  resultImage: {
    width: 250,
    height: 250,
    borderRadius: 16,
    marginBottom: 10,
  },
  overlayTextContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  overlayText: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    color: '#fff',
    fontSize: 14,
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  buttonContainer: {
    paddingBottom: 24,
  },
  detectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#16a34a',
    borderRadius: 99,
    paddingVertical: 14,
    paddingHorizontal: 24,
    elevation: 5,
    shadowColor: '#16a34a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});