import PlantDetails from "@components/scan/result/plantDetails";
import PlantImage from "@components/scan/result/plantImage";
import { ScrollView, View } from "react-native";

type Props = {
  imageUrl: string;
  photographerName: string;
  photographerUrl: string;
  commonName: string;
  scientificName: string;
  medicinalProperties: string[];
  origin: string;
  usage: string;
};

export default function ResultView(props: Props) {
  return (
    <View style={{ flex: 1 }}>
      <PlantImage
        imageUrl={props.imageUrl}
        photographerName={props.photographerName}
        photographerUrl={props.photographerUrl}
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
