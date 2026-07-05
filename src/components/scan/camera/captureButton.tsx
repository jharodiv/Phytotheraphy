import { ActivityIndicator, Pressable, Text, View } from "react-native";

import styles from "@components/scan/camera/camera.style";

type Props = {
    loading: boolean;
    onPress: () => void;
};

export default function CaptureButton({
    loading,
    onPress,
}: Props) {
    return (
        <View style={styles.captureContainer}>
            {loading ? (
                <ActivityIndicator
                    size="large"
                    color="#2E7D32"
                />
            ) : (
                <Pressable
                    onPress={onPress}
                    style={styles.captureButton}
                >
                    <Text style={styles.captureText}>
                        Scan
                    </Text>
                </Pressable>
            )}
        </View>
    );
}