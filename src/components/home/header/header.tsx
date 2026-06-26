import { Image, Text, View } from "react-native";

import styles from "@components/home/header/header.style";

const HeaderComponent = () => {
    return (
        <View style={styles.container}>
        <View style={styles.textContainer}>
            <Text style={styles.titleBlack}>
            Explore Nature's
            </Text>

            <Text style={styles.titleGreen}>
            Medicine
            </Text>

            <Text style={styles.description}>
            Identify medicinal plant instantly
            </Text>
        </View>

        <Image
            source={require("@images/home/tea.png")}
            style={styles.image}
            resizeMode="contain"
        />
        </View>
    );
};

export default HeaderComponent;