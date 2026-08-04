import { styles } from "@components/common/loadingOverlay.style";
import { ActivityIndicator, Text, View } from "react-native";

type Props = {
    visible: boolean;
    message?: string;
};

export default function LoadingOverlay({
    visible,
    message = "Loading...",
}: Props){

    if(!visible) return null;

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
                Please wait while Gemini generates the
                plant information.
            </Text>
        </View>
    );
}