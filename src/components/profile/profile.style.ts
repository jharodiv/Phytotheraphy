import COLORS from "@constants/colors";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightGray,
    },

    content: {
        paddingBottom: 100,
    },

    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    /* ===========================
            HEADER
    =========================== */

    header: {
        height: 220,
        borderBottomLeftRadius: 35,
        borderBottomRightRadius: 35,
        paddingHorizontal: 24,
        paddingTop: 60,
    },

    greetingContainer: {
        marginTop: 10,
    },

    greeting: {
        fontSize: 30,
        fontWeight: "700",
        color: COLORS.white,
    },

    greetingSubtext: {
        marginTop: 6,
        fontSize: 16,
        color: "rgba(255,255,255,0.85)",
    },

    /* ===========================
        PROFILE CARD
    =========================== */

    profileCard: {
        backgroundColor: COLORS.white,

        marginHorizontal: 20,
        marginTop: -60,

        borderRadius: 28,

        alignItems: "center",

        paddingTop: 70,
        paddingBottom: 28,
        paddingHorizontal: 24,

        shadowColor: "#000",
        shadowOpacity: 0.12,
        shadowRadius: 16,
        shadowOffset: {
            width: 0,
            height: 8,
        },

        elevation: 8,
    },

    avatar: {
        position: "absolute",

        top: -55,

        width: 110,
        height: 110,

        borderRadius: 55,

        borderWidth: 5,
        borderColor: COLORS.white,
    },

    avatarPlaceholder: {
        position: "absolute",

        top: -55,

        width: 110,
        height: 110,

        borderRadius: 55,

        backgroundColor: COLORS.lightGray,

        borderWidth: 5,
        borderColor: COLORS.white,

        justifyContent: "center",
        alignItems: "center",
    },

    fullName: {
        fontSize: 24,
        fontWeight: "700",
        color: COLORS.black,
    },

    username: {
        marginTop: 6,
        fontSize: 16,
        color: COLORS.gray,
    },

    subtitle: {
        marginTop: 10,
        fontSize: 15,
        color: COLORS.primary,
        fontWeight: "600",
    },

    /* ===========================
            STATS
    =========================== */

    statsContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",

        width: "100%",

        marginTop: 30,
        marginBottom: 25,
    },

    stat: {
        flex: 1,
        alignItems: "center",
    },

    statDivider: {
        width: 1,
        height: 40,
        backgroundColor: "#E0E0E0",
    },

    statNumber: {
        fontSize: 24,
        fontWeight: "700",
        color: COLORS.black,
    },

    statLabel: {
        marginTop: 4,
        fontSize: 14,
        color: COLORS.gray,
    },

    /* ===========================
            BUTTON
    =========================== */

    editButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",

        backgroundColor: COLORS.primary,

        paddingVertical: 14,
        paddingHorizontal: 30,

        borderRadius: 30,
    },

    editButtonText: {
        marginLeft: 8,
        fontSize: 16,
        fontWeight: "700",
        color: COLORS.white,
    },

    /* ===========================
            TABS
    =========================== */

    tabContainer: {
        flexDirection: "row",

        marginHorizontal: 20,
        marginTop: 30,

        backgroundColor: COLORS.white,

        borderRadius: 18,

        padding: 6,

        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 10,
        shadowOffset: {
            width: 0,
            height: 3,
        },

        elevation: 3,
    },

    tab: {
        flex: 1,

        flexDirection: "row",

        justifyContent: "center",
        alignItems: "center",

        paddingVertical: 14,

        borderRadius: 14,
    },

    activeTab: {
        backgroundColor: COLORS.primary,
    },

    tabText: {
        marginLeft: 8,
        fontSize: 15,
        fontWeight: "600",
        color: COLORS.primary,
    },

    activeTabText: {
        color: COLORS.white,
    },

    /* ===========================
            CONTENT
    =========================== */

    contentContainer: {
        minHeight: 350,

        marginTop: 24,
        marginHorizontal: 20,

        backgroundColor: COLORS.white,

        borderRadius: 24,

        padding: 24,

        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 12,
        shadowOffset: {
            width: 0,
            height: 4,
        },

        elevation: 3,
    },

    placeholder: {
        textAlign: "center",
        color: COLORS.gray,
        marginTop: 120,
        fontSize: 16,
    },

    /* ===========================
            MODAL
    =========================== */

    modalOverlay: {
        flex: 1,

        justifyContent: "flex-end",

        backgroundColor: "rgba(0,0,0,0.45)",
    },

    modal: {
        backgroundColor: COLORS.white,

        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,

        paddingHorizontal: 24,
        paddingTop: 28,
        paddingBottom: 40,
    },

    modalTitle: {
        fontSize: 24,
        fontWeight: "700",

        color: COLORS.black,

        textAlign: "center",

        marginBottom: 25,
    },

    input: {
        backgroundColor: COLORS.lightGray,

        borderRadius: 14,

        paddingHorizontal: 18,
        paddingVertical: 16,

        fontSize: 16,

        marginBottom: 16,

        color: COLORS.black,
    },

    saveButton: {
        backgroundColor: COLORS.primary,

        borderRadius: 16,

        alignItems: "center",

        paddingVertical: 16,

        marginTop: 10,
    },

    saveButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: "700",
    },

    cancelButton: {
        alignItems: "center",
        paddingVertical: 18,
    },

    cancelButtonText: {
        color: COLORS.gray,
        fontSize: 16,
        fontWeight: "600",
    },
});

export default styles;