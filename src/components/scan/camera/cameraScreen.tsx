import { CameraView } from "expo-camera";

import { Pressable, Text, View } from "react-native";

import CameraOverlay from "./cameraOverlay";
import CaptureButton from "./captureButton";

import styles from "./camera.style";

import { useCameraScan } from "@hooks/camera/useCameraScan";

export default function CameraScreen() {
    const {
        permission,
        requestPermission,
        cameraRef,
        loading,
        handleCapture,
    } = useCameraScan();

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <View style={styles.permissionContainer}>
                <Text style={styles.permissionText}>
                    We need camera access to scan plants
                </Text>

                <Pressable onPress={requestPermission}>
                    <Text style={styles.permissionButton}>
                        Grant Permission
                    </Text>
                </Pressable>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                facing="back"
            />

            <CameraOverlay />

            <CaptureButton
                loading={loading}
                onPress={handleCapture}
            />
        </View>
    );
}