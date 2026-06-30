import COLORS from "@constants/colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        marginTop: 24,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginBottom: 16,
    },

    title: {
        fontSize: 22,
        fontWeight: "700",
        color: COLORS.black,
    },

    seeAll: {
        fontSize: 15,
        fontWeight: "600",
        color: COLORS.black,
    },

    plantList: {
    paddingHorizontal: 20,
    },

    card: {
        width: 160,
        height: 220,
        backgroundColor: "#fff",
        borderRadius: 20,
        overflow: "hidden",
        marginRight: 16,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
    },

    image: {
        width: "100%",
        height: "65%",
    },

    info: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 14,
    },

    plantName: {
        fontSize: 18,
        fontFamily: "Poppins_600SemiBold",
        color: COLORS.black,
    },

    plantCategory: {
        marginTop: 4,
        fontSize: 13,
        fontFamily: "Poppins_400Regular",
        color: "#7A7A7A",
    },
});

export default styles;