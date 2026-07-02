import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 20,
        left: 20,
        right: 20,

        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",

        height: 65,
        borderRadius: 32,

        backgroundColor: "rgba(255,255,255,0.85)",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },

    tab: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },

    label: {
        marginTop: 4,
        fontSize: 12,
        color: "#777",
    },

    activeLabel: {
        color: "#2E7D32",
        fontWeight: "600",
    },
});

export default styles;