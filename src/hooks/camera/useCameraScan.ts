import { useRef, useState } from "react";
import { Alert } from "react-native";

import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import { router } from "expo-router";

import { scanPlant } from "@services/scan/scan.service";

export function useCameraScan() {
    const [permission, requestPermission] =
        useCameraPermissions();

    const cameraRef = useRef<CameraView>(null);

    const [loading, setLoading] = useState(false);

    async function handleCapture() {
        if (!cameraRef.current) return;

        setLoading(true);

        try {
            const photo =
                await cameraRef.current.takePictureAsync({
                    base64: true,
                });

            if (!photo?.base64) {
                Alert.alert(
                    "Error",
                    "Could not capture image."
                );
                return;
            }

            const resized =
                await ImageManipulator.manipulateAsync(
                    photo.uri,
                    [
                        {
                            resize: {
                                width: 800,
                            },
                        },
                    ],
                    {
                        compress: 0.8,
                        format:
                            ImageManipulator.SaveFormat.JPEG,
                        base64: true,
                    }
                );

            const imageBase64 =
                resized.base64!.replace(
                    /^data:image\/\w+;base64,/,
                    ""
                );

            const result =
                await scanPlant(imageBase64);

            router.push({
                pathname: "/(scan)/result",
                params: {
                    imageUrl: result.imageUrl,
                    photographerName:
                        result.photographerName,
                    photographerUrl:
                        result.photographerUrl,

                    commonName:
                        result.plant.commonName,

                    scientificName:
                        result.plant.scientificName,

                    family:
                        result.plant.family,

                    description:
                        result.plant.description,

                    medicinalProperties:
                        JSON.stringify(
                            result.plant.medicinalProperties
                        ),

                    uses:
                        result.plant.uses,

                    preparation_method:
                        result.plant.preparation_method,

                    origin:
                        result.plant.origin,
                },
            });

        } catch (error) {
            console.error(error);

            Alert.alert(
                "Error",
                error instanceof Error
                    ? error.message
                    : "Something went wrong."
            );
        } finally {
            setLoading(false);
        }
    }

    return {
        permission,
        requestPermission,
        cameraRef,
        loading,
        handleCapture,
    };
}