import PlantDetails from "@components/scan/result/plantDetails";
import PlantImage from "@components/scan/result/plantImage";
import { ScrollView, View } from "react-native";

type Props = {
  imageUri: string;
  imageBase64: string; // 👈 new
  commonName: string;
  scientificName: string;
  medicinalProperties: string[];
  origin: string;
  usage: string;
};

export default function ResultView(props: Props) {
  console.log("ResultView imageUri:", props.imageUri);

  return (
    <View style={{ flex: 1 }}>
      <PlantImage
        imageUri={props.imageUri}
        imageBase64={props.imageBase64} // 👈 new
        commonName={props.commonName}
        scientificName={props.scientificName}
      />

      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
      >
        <PlantDetails
          medicinalProperties={props.medicinalProperties}
          origin={props.origin}
          usage={props.usage}
        />
      </ScrollView>
    </View>
  );
}
