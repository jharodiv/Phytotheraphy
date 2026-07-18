import { Text, View } from "react-native";

type Props = {
  family: string;
  description: string;
  medicinalProperties: string[];
  uses: string;
  preparation: string;
  origin: string;
  confidence: number;
};

export default function PlantDetails({
  family,
  description,
  medicinalProperties,
  uses,
  preparation,
  origin,
  confidence,
}: Props) {
  const confidencePercentage = Math.round(confidence * 100);

  return (
    <View>

      {/* Description */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
          marginBottom: 12,
        }}
      >
        Description
      </Text>

      <Text>{description || "No description available."}</Text>

      {/* Family */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
          marginTop: 20,
          marginBottom: 12,
        }}
      >
        Family
      </Text>

      <Text>{family || "Unknown"}</Text>

      {/* Medicinal Properties */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
          marginTop: 20,
          marginBottom: 12,
        }}
      >
        Medicinal Properties
      </Text>

      {medicinalProperties.length > 0 ? (
        medicinalProperties.map((property, index) => (
          <Text
            key={index}
            style={{ marginBottom: 6 }}
          >
            • {property}
          </Text>
        ))
      ) : (
        <Text>No medicinal properties available.</Text>
      )}

      {/* Uses */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
          marginTop: 20,
          marginBottom: 12,
        }}
      >
        Uses
      </Text>

      <Text>{uses || "No information available."}</Text>

      {/* Preparation */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
          marginTop: 20,
          marginBottom: 12,
        }}
      >
        Preparation
      </Text>

      <Text>{preparation || "No preparation information available."}</Text>

      {/* Origin */}
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

      <Text>{origin || "Unknown"}</Text>

      {/* AI Confidence */}
      <Text
        style={{
          fontSize: 22,
          fontWeight: "700",
          marginTop: 20,
          marginBottom: 12,
        }}
      >
        AI Confidence
      </Text>

      <Text>{confidencePercentage}%</Text>

    </View>
  );
}