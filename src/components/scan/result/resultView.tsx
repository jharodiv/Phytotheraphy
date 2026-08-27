import PlantDetails from "@components/scan/result/plantDetails";
import PlantImage from "@components/scan/result/plantImage";
import { ResultViewProps } from "@type/plants.type";
import { ScrollView, View } from "react-native";

export default function ResultView({ plantDetails, plantImage }: ResultViewProps) {
  return (
    <View style={{ flex: 1 }}>
      <PlantImage
        imageUrl={plantImage.imageUrl}
        commonName={plantImage.commonName}
        scientificName={plantImage.scientificName}
      />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <PlantDetails
          family={plantDetails.family}
          description={plantDetails.description}
          medicinalProperties={plantDetails.medicinalProperties}
          uses={plantDetails.uses}
          preparationMethod={plantDetails.preparationMethod}
          origin={plantDetails.origin}
          sideEffect={plantDetails.sideEffect}
          verified={plantDetails.verified}
        />
      </ScrollView>
    </View>
  );
}