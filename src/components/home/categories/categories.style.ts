import COLORS from "@constants/colors";
import { StyleSheet } from "react-native";

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
        color: "#000",
    },

    seeAll: {
        fontSize: 15,
        fontWeight: "600",
        color: COLORS.primary,
    },

    categoryList: {
        paddingHorizontal: 20,
        paddingBottom: 4,
    },

    categoryButton: {
        width: 84,
        height: 86,
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
        fontFamily: "Poppins_600SemiBold"
    },

    icon: {
        width: 30,
        height: 30
    }
});

export default styles;