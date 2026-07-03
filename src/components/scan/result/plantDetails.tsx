import { Text, View } from "react-native";

type Props = {
  medicinalProperties: string[];
  origin: string;
  usage: string;
};

export default function PlantDetails({
  medicinalProperties,
  origin,
  usage,
}: Props) {
  return (
    <View>
      <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 12 }}>
        Medicinal Properties
      </Text>
      {medicinalProperties.map((prop, index) => (
        <Text key={index} style={{ marginBottom: 4 }}>
          • {prop}
        </Text>
      ))}

      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
          marginTop: 20,
          marginBottom: 12,
        }}
      >
        Origin
      </Text>
      <Text>{origin}</Text>

      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
          marginTop: 20,
          marginBottom: 12,
        }}
      >
        How to Use
      </Text>
      <Text>{usage}</Text>
    </View>
  );
}
