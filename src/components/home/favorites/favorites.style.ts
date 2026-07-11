import COLORS from "@constants/colors";
import { Dimensions, StyleSheet } from "react-native";

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F7F8FA",
    },

    header: {
        marginLeft: 16,

        fontSize: 20,
        fontFamily: "Poppins_700Bold",
        color: COLORS.black,

        includeFontPadding: false, // Android
        textAlignVertical: "center", // Android
        lineHeight: 34, // Keeps the text vertically centered
    },


    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 34,
        marginHorizontal: 22,
        marginBottom: 26,
    },

    backgroundLeaf: {
        position: "absolute",
        right: -width * 0.18,
        bottom: -height * 0.15,
        opacity: 0.30,
        transform: [{ rotate: "-18deg" }],
        zIndex: 0,
    },

    backButton: {
        width: 46,
        height: 46,
        borderRadius: 23,

        backgroundColor: "#FFFFFF",

        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 3,
    },

    list: {
        paddingHorizontal: 20,
        paddingBottom: 170,
        zIndex: 1,
    },

        bookmarkContainer: {
        position: "absolute",
        top: 14,
        right: 14,

        width: 42,
        height: 42,
        borderRadius: 21,

        backgroundColor: "rgba(255,255,255,0.18)",
        justifyContent: "center",
        alignItems: "center",

        borderWidth: 1,
        borderColor: "rgba(255,255,255,0.25)",

        zIndex: 10,
    },

    plantItem: {
        height: 190,
        borderRadius: 22,
        overflow: "hidden",
        marginBottom: 18,

        backgroundColor: "#EEE",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
    },

    plantImage: {
        width: "100%",
        height: "100%",
        position: "absolute",
    },

    gradient: {
        flex: 1,
        justifyContent: "flex-end",
        paddingHorizontal: 18,
        paddingBottom: 18,
    },

    plantName: {
        color: "#FFF",
        fontSize: 22,
        fontFamily: "Poppins_700Bold",
    },

    scientificName: {
        color: "rgba(255,255,255,0.9)",
        fontSize: 14,
        fontFamily: "Poppins_400Regular",
        fontStyle: "italic",
        marginTop: 2,
    },

    emptyContainer: {
        marginTop: 120,
        alignItems: "center",
    },

    emptyTitle: {
        fontSize: 22,
        color: COLORS.black,
        fontFamily: "Poppins_700Bold",
    },

    emptySubtitle: {
        marginTop: 10,
        textAlign: "center",
        color: "#7A7A7A",
        fontSize: 15,
        fontFamily: "Poppins_400Regular",
        paddingHorizontal: 40,
    },
});

export default styles;