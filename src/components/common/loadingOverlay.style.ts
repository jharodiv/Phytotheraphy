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

        backgroundColor: "rgba(0, 0, 0, 0.55)",
        zIndex: 999,
    },

    card: {
        width: "80%",
        maxWidth: 320,

        paddingVertical: 28,
        paddingHorizontal: 24,

        alignItems: "center",

        backgroundColor: "transparent",

        elevation: 10,
    },

    spinnerContainer: {
        width: 64,
        height: 64,

        justifyContent: "center",
        alignItems: "center",

        borderRadius: 32,
        backgroundColor: "#E8F5E9",

        marginBottom: 18,
    },

    title: {
        fontSize: 18,
        fontWeight: "700",
        color: "#FFFFFF",
        shadowColor: "#0000",

        textAlign: "center",
    },

    subtitle: {
        marginTop: 8,

        fontSize: 14,
        lineHeight: 20,

        color: "#777777",
        textAlign: "center",

        paddingHorizontal: 8,
    },
});
