import COLORS from "@constants/colors";
import { StyleSheet } from "react-native";

export default StyleSheet.create({
    /* ===========================
            CONTAINER
    =========================== */

    container: {
        width: "100%",
    },

    /* ===========================
            CARD
    =========================== */

    card: {
        flexDirection: "row",
        alignItems: "center",

        width: "100%",

        backgroundColor: COLORS.white,

        borderRadius: 22,

        padding: 16,
        marginBottom: 16,

        borderWidth: 1,
        borderColor: "#EEF2F4",

        shadowColor: "#000",
        shadowOpacity: 0.04,
        shadowRadius: 8,
        shadowOffset: {
            width: 0,
            height: 3,
        },

        elevation: 2,
    },

    /* ===========================
            IMAGE
    =========================== */

    image: {
        width: 96,
        height: 96,

        borderRadius: 18,

        backgroundColor: COLORS.lightGray,
    },

    /* ===========================
            CONTENT
    =========================== */

    info: {
        flex: 1,

        justifyContent: "space-between",

        marginLeft: 18,
    },

    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
    },

    commonName: {
        flex: 1,

        fontSize: 19,
        fontWeight: "700",

        color: COLORS.black,
    },

    scientificName: {
        marginTop: 5,

        fontSize: 13,

        color: "#6B7280",

        fontStyle: "italic",
    },

    /* ===========================
            FAMILY
    =========================== */

    familyBadge: {
        alignSelf: "flex-start",

        flexDirection: "row",
        alignItems: "center",

        marginTop: 14,

        paddingHorizontal: 10,
        paddingVertical: 6,

        borderRadius: 50,

        backgroundColor: "#EDF7EE",
    },

    family: {
        marginLeft: 6,

        fontSize: 12,
        fontWeight: "600",

        color: COLORS.primary,
    },

    /* ===========================
            TAGS
    =========================== */

    badgeContainer: {
        flexDirection: "row",
        flexWrap: "wrap",

        marginTop: 14,
    },

    badge: {
        backgroundColor: "#F5F5F5",

        paddingHorizontal: 10,
        paddingVertical: 5,

        borderRadius: 50,

        marginRight: 8,
    },

    badgeText: {
        fontSize: 11,
        fontWeight: "600",

        color: "#666",
    },

    /* ===========================
        FAVORITE BUTTON
    =========================== */

    favoriteButton: {
        width: 42,
        height: 42,

        borderRadius: 21,

        justifyContent: "center",
        alignItems: "center",

        marginLeft: 12,

        backgroundColor: "#FFF8E5",

        borderWidth: 1,
        borderColor: "#FFE8A3",
    },

    /* ===========================
            LOADING
    =========================== */

    loadingContainer: {
        justifyContent: "center",
        alignItems: "center",

        paddingVertical: 40,
    },

    loadingText: {
        marginTop: 12,

        fontSize: 15,

        color: COLORS.gray,
    },

    /* ===========================
            EMPTY
    =========================== */

    emptyContainer: {
        alignItems: "center",

        paddingVertical: 50,
        paddingHorizontal: 20,
    },

    emptyTitle: {
        marginTop: 16,

        fontSize: 20,
        fontWeight: "700",

        color: COLORS.black,
    },

    emptySubtitle: {
        marginTop: 8,

        fontSize: 14,

        color: COLORS.gray,

        textAlign: "center",
        lineHeight: 22,
    },
});