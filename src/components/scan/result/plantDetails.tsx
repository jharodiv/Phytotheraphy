import { Text, View } from "react-native";

export default function PlantDetails() {

    return (
        <View>

            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "700",
                    marginBottom: 12,
                }}
            >
                Description
            </Text>

            <Text>
                Plant description...
            </Text>

            <Text
                style={{
                    fontSize: 22,
                    fontWeight: "700",
                    marginTop: 20,
                    marginBottom: 12,
                }}
            >
                Medicinal Uses
            </Text>

            <Text>
                Plant medicinal uses...
            </Text>

        </View>
    );
}