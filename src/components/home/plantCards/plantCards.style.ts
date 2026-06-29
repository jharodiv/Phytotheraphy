import COLORS from "@constants/colors";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

// Screen padding: 20 left + 20 right
// Gap between 5 items: 12 * 4 = 48
const CATEGORY_SIZE = (width - 40 - 48) / 5;

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

    categoryList: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
    },

    categoryButton: {
        width: CATEGORY_SIZE,
        height: CATEGORY_SIZE + 2,
        borderRadius: 19,

        backgroundColor: "#FFFFFF",

        justifyContent: "center",
        alignItems: "center",

        marginRight: 12,

        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 3,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 4,
    },

    categoryText: {
        marginTop: 6,
        fontSize: 10,
        fontWeight: "600",
        color: COLORS.black,
        textAlign: "center",
        fontFamily: "Poppins_600SemiBold",
    },

    icon: {
        width: 30,
        height: 30,
    },
});

export default styles;