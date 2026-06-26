import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 20,
    },

    subtitle: {
        fontSize: 20,
        fontWeight: "600",
        marginTop: 6,
    },

    titleBlack: {
        color: "#000000",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 30,
    },

    titleGreen: {
        color: "#2E7D32",
        fontFamily: "Poppins_600SemiBold",
        fontSize: 30
    },

    description: {
        fontSize: 15,
        fontWeight: "400",
        color: "#000000",
        fontFamily: "Poppins_400Regular",
        marginTop: 8,
    },

    textContainer: {
        flex: 1,
    },

    image: {
        width: 100,
        height: 100,
        transform: [
            { rotate: "-58.29deg" },
            { scale: 2 },
        ],
    },
});

export default styles;