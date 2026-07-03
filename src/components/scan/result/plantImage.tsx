import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Linking, Pressable, Text, View } from "react-native";

type Props = {
  imageUrl: string;
  photographerName: string;
  photographerUrl: string;
  commonName: string;
  scientificName: string;
};

export default function PlantImage({
  imageUrl,
  photographerName,
  photographerUrl,
  commonName,
  scientificName,
}: Props) {
  const showAttribution = !!photographerName && !!photographerUrl;

  return (
    <View style={{ height: 340, backgroundColor: "#e0e0e0" }}>
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          transition={200}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "#888" }}>No image available</Text>
        </View>
      )}

      {/* Gradient overlay for readability */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,.7)"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 120,
        }}
      />

      {/* Plant name and scientific name */}
      <View style={{ position: "absolute", left: 20, bottom: 40 }}>
        <Text style={{ color: "white", fontSize: 28, fontWeight: "700" }}>
          {commonName}
        </Text>
        <Text style={{ color: "white" }}>{scientificName}</Text>
      </View>

      {/* Unsplash attribution */}
      {showAttribution && (
        <Pressable
          onPress={() => Linking.openURL(photographerUrl)}
          style={{
            position: "absolute",
            right: 12,
            bottom: 8,
            backgroundColor: "rgba(0,0,0,0.5)",
            paddingHorizontal: 8,
            paddingVertical: 4,
            borderRadius: 4,
          }}
        >
          <Text style={{ color: "#ccc", fontSize: 11 }}>
            Photo by {photographerName} on Unsplash
          </Text>
        </Pressable>
      )}
    </View>
  );
}
