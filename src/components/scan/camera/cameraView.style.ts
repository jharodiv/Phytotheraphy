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


        guideContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    guideFrame: {
        width: 260,
        height: 260,
        borderWidth: 3,
        borderColor: "#FFFFFF",
        borderRadius: 16,
        backgroundColor: "transparent",
    },

    guideText: {
        marginTop: 16,
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
        textAlign: "center",
        paddingHorizontal: 24,
    },
});

export default styles;