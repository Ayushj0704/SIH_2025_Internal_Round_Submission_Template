import React, { useState } from 'react';
import {
    TouchableOpacity,
    Text,
    ActivityIndicator,
    StyleSheet,
    Alert,
    View,
    GestureResponderEvent,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { JumpingTransition } from 'react-native-reanimated';
import { MaterialIcons } from '@expo/vector-icons';


interface CameraWasteButtonProps {
    title?: string;
    onResult?: (result: { imageUrl: string; response: any }) => void;
    apiUrl: string;
    style?: object;
}

const CameraWasteButton: React.FC<CameraWasteButtonProps> = ({
    title = 'Take Photo',
    onResult,
    apiUrl,
    style,
}) => {
    const [loading, setLoading] = useState(false);

    const takeAndUploadPhoto = async (_event?: GestureResponderEvent) => {
        // Request camera permissions
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission required', 'Camera permission is required to take photos.');
            return;
        }

        // Launch camera
        const result = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
            quality: 1,
        });
        if (result.canceled) return;

        setLoading(true);
        try {
            const localUri = result.assets && result.assets[0] && result.assets[0].uri;

            const filename = localUri.split('/').pop();
            const match = /\.(\w+)$/.exec(filename ?? '');
            const type = match ? `image/${match[1]}` : `image`;

            const formData = new FormData();
            formData.append('image', {
                uri: localUri,
                name: filename,
                type,
            } as any);

            const res = await fetch(apiUrl, {
                method: 'POST',
                body: formData,
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            const json = await res.json();
            console.log(json)
            Alert.alert('Segregation Result', json.topPrediction || 'No prediction');
            if (onResult) onResult({ imageUrl: localUri, response: json });
        } catch (e) {
            Alert.alert('Error', 'Could not upload or process image.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={takeAndUploadPhoto}
            disabled={loading}
        >
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <MaterialIcons name="camera" size={30} style={{
                        marginHorizontal:5
                    }} color="#fff" />
                    <Text style={styles.text}>{title}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#2e86de',
        padding: 18,
        borderRadius: 10,
        alignItems: 'center',
        marginVertical: 12,
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 17,
    },
});

export default CameraWasteButton;
