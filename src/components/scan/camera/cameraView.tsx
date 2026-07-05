import { Pressable, Text, View } from "react-native";

import styles from "@components/scan/camera/cameraView.style";

type Props = {
    onCapture: () => void;
};

export default function CameraView({ onCapture }: Props) {
    return (
        <View style={styles.container}>
            {/* Leaf Guide */}
            <View style={styles.guideContainer}>
                <View style={styles.guideFrame} />
                <Text style={styles.guideText}>
                    Center a single leaf inside the frame
                </Text>
            </View>

            {/* Capture Button */}
            <Pressable
                style={styles.captureButton}
                onPress={onCapture}
            >
                <Text style={styles.captureText}>Scan</Text>
            </Pressable>
        </View>
    );
}