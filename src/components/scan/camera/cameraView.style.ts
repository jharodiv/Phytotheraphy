import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        paddingBottom: 50,
    },

    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2E7D32",
    },

    captureText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "600",
    },
});

export default styles;