import { LinearGradient } from "expo-linear-gradient";
import { Image, Text, View } from "react-native";

type Props = {
    imageUri: string;
    commonName: string;
    scientificName: string;
};

export default function PlantImage({
    imageUri,
    commonName,
    scientificName,
}: Props) {

    return (
        <View
            style={{
                height: 340,
            }}
        >

            <Image
                source={{
                    uri: imageUri,
                }}
                style={{
                    flex: 1,
                }}
            />

            <LinearGradient
                colors={[
                    "transparent",
                    "rgba(0,0,0,.7)",
                ]}
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: 120,
                }}
            />

            <View
                style={{
                    position: "absolute",
                    left: 20,
                    bottom: 24,
                }}
            >

                <Text
                    style={{
                        color: "white",
                        fontSize: 28,
                        fontWeight: "700",
                    }}
                >
                    {commonName}
                </Text>

                <Text
                    style={{
                        color: "white",
                    }}
                >
                    {scientificName}
                </Text>

            </View>

        </View>
    );
}