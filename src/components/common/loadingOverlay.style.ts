import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,

        justifyContent: "center",
        alignItems: "center",

        backgroundColor: "black",
        opacity: 0.8,
    },

    title: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: "600",
    },

    subtitle: {
        marginTop: 8,
        color: "#666",
        textAlign: "center",
        paddingHorizontal: 32,
    },
});