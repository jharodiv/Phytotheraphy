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
      <CameraView
        ref={cameraRef}
        style={{ flex: 1 }}
        facing="back"
      />

      {/* ===== Scanner Overlay ===== */}
      <View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        {/* Top dark area */}
        <View
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.45)",
          }}
        />

        {/* Middle section */}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* Left dark */}
          <View
            style={{
              flex: 1,
              height: 260,
              backgroundColor: "rgba(0,0,0,0.45)",
            }}
          />

          {/* Scanning Frame */}
          <View
            style={{
              width: 260,
              height: 260,
              position: "relative",
            }}
          >
            {/* Top Left */}
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 40,
                height: 40,
                borderTopWidth: 4,
                borderLeftWidth: 4,
                borderColor: "#FFFFFF",
                borderTopLeftRadius: 20,
              }}
            />

            {/* Top Right */}
            <View
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 40,
                height: 40,
                borderTopWidth: 4,
                borderRightWidth: 4,
                borderColor: "#FFFFFF",
                borderTopRightRadius: 20,
              }}
            />

            {/* Bottom Left */}
            <View
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: 40,
                height: 40,
                borderBottomWidth: 4,
                borderLeftWidth: 4,
                borderColor: "#FFFFFF",
                borderBottomLeftRadius: 20,
              }}
            />

            {/* Bottom Right */}
            <View
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 40,
                height: 40,
                borderBottomWidth: 4,
                borderRightWidth: 4,
                borderColor: "#FFFFFF",
                borderBottomRightRadius: 20,
              }}
            />
          </View>

          {/* Right dark */}
          <View
            style={{
              flex: 1,
              height: 260,
              backgroundColor: "rgba(0,0,0,0.45)",
            }}
          />
        </View>

        {/* Bottom dark */}
        <View
          style={{
            flex: 1,
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.45)",
          }}
        >
          <Text
            style={{
              color: "#FFFFFF",
              marginTop: 20,
              fontSize: 18,
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            Place the leaf inside the frame
          </Text>
        </View>
      </View>

      {/* ===== Capture Button ===== */}
      <View
        style={{
          position: "absolute",
          bottom: 60,
          alignSelf: "center",
        }}
      >
        {loading ? (
          <ActivityIndicator size="large" color="#2E7D32" />
        ) : (
          <Pressable
            onPress={handleCapture}
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: "#FFFFFF",
              justifyContent: "center",
              alignItems: "center",
              elevation: 5,
            }}
          >
            <Text
              style={{
                fontWeight: "700",
                color: "#2E7D32",
              }}
            >
              Scan
            </Text>
          </Pressable>
        )}
      </View>
    </View>
);}
