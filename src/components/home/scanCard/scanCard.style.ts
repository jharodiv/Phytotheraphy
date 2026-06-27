import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "rgba(46, 125, 50, 0.66)", // #2E7D32 at 66% opacity
        borderRadius: 22,
        marginHorizontal: 20,
        marginTop: 20,
        padding: 16,
    },

    cameraButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        alignSelf: "flex-start",

        marginTop: 16,
        paddingHorizontal: 18,
        height: 42,
        borderRadius: 21,

        backgroundColor: "rgba(0, 0, 0, 0.5)", // Black with 50% opacity
    },

    cameraButtonText: {
        color: "#FFFFFF",
        fontSize: 14,
        fontWeight: "600",
        marginLeft: 8,
    },

    image: {
        width: 90,
        height: 90,
        marginRight: 16,
    },

    textContainer: {
        flex: 1,
        justifyContent: "center", // Centers content vertically
        alignItems: "flex-start",  // Keeps text left-aligned
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        color: "#FFFFFF",
        marginBottom: 6,
    },

    description: {
        fontSize: 15,
        color: "#FFFFFF",
        lineHeight: 22,
    },
});

export default styles;