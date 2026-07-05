import { Text, View } from "react-native";

import styles from "@components/scan/camera/camera.style";

export default function CameraOverlay() {
    return (
        <View
            pointerEvents="none"
            style={styles.overlay}
        >
            <View style={styles.topShade} />

            <View style={styles.middleRow}>
                <View style={styles.sideShade} />

                <View style={styles.frame}>
                    <View style={styles.cornerTopLeft} />
                    <View style={styles.cornerTopRight} />
                    <View style={styles.cornerBottomLeft} />
                    <View style={styles.cornerBottomRight} />
                </View>

                <View style={styles.sideShade} />
            </View>

            <View style={styles.bottomShade}>
                <Text style={styles.overlayText}>
                    Place the leaf inside the frame
                </Text>
            </View>
        </View>
    );
}