import { identifyPlant } from "@services/gemini.service";
import { searchHerbImage } from "@services/unsplash.service";

import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import { router } from "expo-router";

import { useRef, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";

import CameraOverlay from "@components/scan/camera/cameraOverlay";
import CaptureButton from "@components/scan/camera/captureButton";

import styles from "@components/scan/camera/camera.style";


export default function CameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();

    const cameraRef = useRef<CameraView>(null);

    const [loading, setLoading] = useState(false);

    if (!permission) return <View />;

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

    async function handleCapture() {
        if (!cameraRef.current) return;

        setLoading(true);

        try {
            const photo = await cameraRef.current.takePictureAsync({
                base64: true,
            });

            if (!photo?.base64) {
                Alert.alert("Error", "Could not capture image");
                return;
            }

            const resized = await ImageManipulator.manipulateAsync(
                photo.uri,
                [{ resize: { width: 800 } }],
                {
                    compress: 0.8,
                    format: ImageManipulator.SaveFormat.JPEG,
                    base64: true,
                }
            );

            const base64 = resized.base64!.replace(
                /^data:image\/\w+;base64,/,
                ""
            );

            const result = await identifyPlant(base64);

            if ("error" in result) {
                Alert.alert("Identification Failed", result.error);
                return;
            }

            const unsplash = await searchHerbImage(result.commonName);

            router.push({
                pathname: "/(scan)/result",
                params: {
                    imageUrl: unsplash?.imageUrl ?? "",
                    photographerName: unsplash?.photographerName ?? "",
                    photographerUrl: unsplash?.photographerUrl ?? "",
                    commonName: result.commonName,
                    scientificName: result.scientificName,
                    medicinalProperties: JSON.stringify(
                        result.medicinalProperties
                    ),
                    origin: result.origin,
                    usage: result.usage,
                },
            });
        } catch (err) {
            console.error(err);
            Alert.alert("Error", "Something went wrong.");
        } finally {
            setLoading(false);
        }
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