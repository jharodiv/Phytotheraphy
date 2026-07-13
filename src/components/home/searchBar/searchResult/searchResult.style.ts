import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        position: "absolute",
        top: 65,          // Adjust based on your SearchBar height
        left: 20,
        right: 20,

        backgroundColor: "#FFF",
        borderRadius: 18,

        maxHeight: 320,

        elevation: 8,      // Android
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.15,
        shadowRadius: 10,

        zIndex: 999,
    },

    title: {
        display: "none",
    },

    list: {
        paddingVertical: 4,
    },

    resultItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#F2F2F2",
    },

    iconContainer: {
        width: 36,
        alignItems: "center",
    },

    icon: {
        fontSize: 18,
    },

    textContainer: {
        flex: 1,
        marginLeft: 12,
    },

    commonName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#222",
    },

    scientificName: {
        marginTop: 2,
        fontSize: 13,
        color: "#777",
        fontStyle: "italic",
    },

    emptyText: {
        textAlign: "center",
        paddingVertical: 20,
        color: "#888",
    },
});