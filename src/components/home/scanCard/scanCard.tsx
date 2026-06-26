import { Image, Text, View } from "react-native";

import styles from "@components/home/scanCard/scanCard.style";

const ScanCard = () => {
    return (
        <View style={styles.container}>
        <Image
            source={require("@images/home/plantScanCard.png")}
            style={styles.image}
            resizeMode="contain"
        />

        <View style={styles.textContainer}>
            <Text style={styles.title}>Scan a Plant</Text>

            <Text style={styles.description}>
                Identify medicinal plants instantly{"\n"}
                using your camera.            </Text>
        </View>
        </View>
    );
};

export default ScanCard;