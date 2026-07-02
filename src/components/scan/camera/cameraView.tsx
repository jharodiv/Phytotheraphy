import { Pressable, Text, View } from "react-native";

import styles from "@components/scan/camera/cameraView.style";

type Props = {
    onCapture: () => void;
};

export default function CameraView({ onCapture }: Props) {
    return (
        <View style={styles.container}>
            {/* Camera Preview */}

            <Pressable
                style={styles.captureButton}
                onPress={onCapture}
            >
                <Text style={styles.captureText}>
                    Scan
                </Text>
            </Pressable>
        </View>
    );
}
