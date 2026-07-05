import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
    },

    camera: {
        flex: 1,
    },

    permissionContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },

    permissionText: {
        marginBottom: 20,
    },

    permissionButton: {
        color: "#2E7D32",
        fontWeight: "600",
    },

    overlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },

    topShade: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.45)",
    },

    middleRow: {
        flexDirection: "row",
        alignItems: "center",
    },

    sideShade: {
        flex: 1,
        height: 260,
        backgroundColor: "rgba(0,0,0,0.45)",
    },

    frame: {
        width: 260,
        height: 260,
        position: "relative",
    },

    cornerTopLeft: {
        position: "absolute",
        top: 0,
        left: 0,
        width: 40,
        height: 40,
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderColor: "#FFF",
        borderTopLeftRadius: 20,
    },

    cornerTopRight: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 40,
        height: 40,
        borderTopWidth: 4,
        borderRightWidth: 4,
        borderColor: "#FFF",
        borderTopRightRadius: 20,
    },

    cornerBottomLeft: {
        position: "absolute",
        bottom: 0,
        left: 0,
        width: 40,
        height: 40,
        borderBottomWidth: 4,
        borderLeftWidth: 4,
        borderColor: "#FFF",
        borderBottomLeftRadius: 20,
    },

    cornerBottomRight: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 40,
        height: 40,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderColor: "#FFF",
        borderBottomRightRadius: 20,
    },

    bottomShade: {
        flex: 1,
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.45)",
    },

    overlayText: {
        color: "#FFF",
        marginTop: 20,
        fontSize: 18,
        fontWeight: "600",
        textAlign: "center",
    },

    captureContainer: {
        position: "absolute",
        bottom: 60,
        alignSelf: "center",
    },

    captureButton: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: "#FFF",
        justifyContent: "center",
        alignItems: "center",
        elevation: 5,
    },

    captureText: {
        color: "#2E7D32",
        fontWeight: "700",
    },
});