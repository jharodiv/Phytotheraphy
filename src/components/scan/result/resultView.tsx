import PlantDetails from "@components/scan/result/plantDetails";
import PlantImage from "@components/scan/result/plantImage";
import { ScrollView, View } from "react-native";

type Props = {
  imageUrl: string;
  photographerName: string;
  photographerUrl: string;

  commonName: string;
  scientificName: string;

  family: string;
  description: string;

  medicinalProperties: string[];

  uses: string;
  preparation: string;
  origin: string;

  confidence: number;
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
          family={props.family}
          description={props.description}
          medicinalProperties={props.medicinalProperties}
          uses={props.uses}
          preparation={props.preparation}
          origin={props.origin}
          confidence={props.confidence}
        />
      </ScrollView>
    </View>
  );
}