import { ScrollView, View } from "react-native";

import PlantDetails from "@components/scan/result/plantDetails";
import PlantImage from "@components/scan/result/plantImage";

type Props = {
    imageUri: string;
    commonName: string;
    scientificName: string;
};

export default function ResultView(props: Props) {

    return (
        <View style={{ flex: 1 }}>

            <PlantImage
                imageUri={props.imageUri}
                commonName={props.commonName}
                scientificName={props.scientificName}
            />

            <ScrollView
                contentContainerStyle={{
                    padding: 20,
                }}
            >

                <PlantDetails />

            </ScrollView>

        </View>
    );
}