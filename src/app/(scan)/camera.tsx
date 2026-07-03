import { identifyPlant } from "@services/gemini.service";
import { searchHerbImage } from "@services/unsplash.service";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";
import { router } from "expo-router";
import { useRef, useState } from "react";
import { ActivityIndicator, Alert, Pressable, Text, View } from "react-native";

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [loading, setLoading] = useState(false);

  if (!permission) return <View />;

  if (!permission.granted) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text style={{ marginBottom: 20 }}>
          We need camera access to scan plants
        </Text>
        <Pressable onPress={requestPermission}>
          <Text style={{ color: "#2E7D32", fontWeight: "600" }}>
            Grant Permission
          </Text>
        </Pressable>
      </View>
    );
  }

  const handleCapture = async () => {
    if (!cameraRef.current) return;
    setLoading(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      if (!photo?.base64) {
        Alert.alert("Error", "Could not capture image");
        return;
      }

      // Strip the data URI prefix if it exists
      const cleanBase64 = photo.base64.replace(/^data:image\/\w+;base64,/, "");

      const resized = await ImageManipulator.manipulateAsync(
        photo.uri,
        [{ resize: { width: 800 } }],
        {
          compress: 0.8,
          format: ImageManipulator.SaveFormat.JPEG,
          base64: true,
        },
      );

      // resized.base64 might also include the prefix, so clean it too
      const resizedBase64 = resized.base64!.replace(
        /^data:image\/\w+;base64,/,
        "",
      );

      const result = await identifyPlant(resizedBase64);

      // ❗ Check for error BEFORE using any success properties
      if ("error" in result) {
        Alert.alert("Identification Failed", result.error);
        return;
      }

      // ✅ Now TypeScript knows result is the success type
      const unsplash = await searchHerbImage(result.commonName);

      router.push({
        pathname: "/(scan)/result",
        params: {
          imageUrl: unsplash?.imageUrl ?? "",
          photographerName: unsplash?.photographerName ?? "",
          photographerUrl: unsplash?.photographerUrl ?? "",
          commonName: result.commonName,
          scientificName: result.scientificName,
          medicinalProperties: JSON.stringify(result.medicinalProperties),
          origin: result.origin,
          usage: result.usage,
        },
      });
    } catch (err) {
      Alert.alert("Error", "Something went wrong. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" />

      {/* Overlay – now outside CameraView */}
      <View
        pointerEvents="box-none"
        style={{
          position: "absolute",
          bottom: 60,
          alignSelf: "center",
          backgroundColor: "white",
          borderRadius: 40,
          padding: 20,
        }}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#2E7D32" />
        ) : (
          <Pressable onPress={handleCapture}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>Scan</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
}
