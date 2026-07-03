import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View } from "react-native";

type Props = {
  imageUri: string;
  imageBase64: string; // 👈 new
  commonName: string;
  scientificName: string;
};

export default function PlantImage({
  imageUri,
  imageBase64,
  commonName,
  scientificName,
}: Props) {
  // Build data URI if base64 is available, otherwise fallback to file URI
  const source = imageBase64
    ? { uri: `data:image/jpeg;base64,${imageBase64}` }
    : { uri: imageUri };

  return (
    <View style={{ height: 340, backgroundColor: "#e0e0e0" }}>
      <Image
        source={source}
        style={{ width: "100%", height: "100%" }} // explicit dimensions
        contentFit="cover"
        transition={200}
      />

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

      <View style={{ position: "absolute", left: 20, bottom: 24 }}>
        <Text style={{ color: "white", fontSize: 28, fontWeight: "700" }}>
          {commonName}
        </Text>
        <Text style={{ color: "white" }}>{scientificName}</Text>
      </View>
    </View>
  );
}
