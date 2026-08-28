import { styles } from "@components/common/loadingOverlay.style";
import {
    ActivityIndicator,
    Text,
    View,
} from "react-native";
import { LoadingOverlayProps } from "@type/loading.type";

export default function LoadingOverlay({
    visible,
    message = "Loading...",
    subtitle = "Please wait...",
}: LoadingOverlayProps) {
    if (!visible) return null;

    return (
        <View style={styles.overlay}>
            <ActivityIndicator
                size="large"
                color="#2E7D32"
            />

            <Text style={styles.title}>
                {message}
            </Text>

            <Text style={styles.subtitle}>
                {subtitle}
            </Text>
        </View>
    );
}
