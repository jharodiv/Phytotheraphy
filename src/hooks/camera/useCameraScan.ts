import { useRef, useState } from "react";
import { Alert } from "react-native";

import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import { router } from "expo-router";

import { identifyPlant } from "@services/ai/gemini.service";
import { searchHerbImage } from "@services/unsplash.service";

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
                            ImageManipulator.SaveFormat
                                .JPEG,
                        base64: true,
                    }
                );

            const imageBase64 =
                resized.base64!.replace(
                    /^data:image\/\w+;base64,/,
                    ""
                );

            const result =
                await identifyPlant(imageBase64);

            if ("error" in result) {
                Alert.alert(
                    "Identification Failed",
                    result.error
                );

                return;
            }

            const unsplash =
                await searchHerbImage(
                    result.commonName
                );

            router.push({
                pathname: "/(scan)/result",
                params: {
                    imageUrl:
                        unsplash?.imageUrl ?? "",

                    photographerName:
                        unsplash?.photographerName ??
                        "",

                    photographerUrl:
                        unsplash?.photographerUrl ??
                        "",

                    commonName:
                        result.commonName,

                    scientificName:
                        result.scientificName,

                    family:
                        result.family,

                    description:
                        result.description,

                    medicinalProperties:
                        JSON.stringify(
                            result.medicinalProperties
                        ),

                    uses:
                        result.uses,

                    preparation_method:
                        result.preparation_method,

                    origin:
                        result.origin,
                },
            });
        } catch (error) {
            console.error(error);

            Alert.alert(
                "Error",
                "Something went wrong."
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