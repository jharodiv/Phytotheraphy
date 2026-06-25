import COLORS from "@constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: "center",
        paddingHorizontal: 24,
    },

    backButton: {
        position: "absolute",
        top: 60,
        left: 24,
        zIndex: 10,

        width: 48,
        height: 48,
        borderRadius: 24,

        backgroundColor: "white",

        justifyContent: "center",
        alignItems: "center",

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,

        elevation: 3,
    },

    topShape: {
    position: "absolute",
    width: 250,
    height: 180,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 80,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 150,
    top: -60,
    right: -80,
    },

    bottomShape: {
    position: "absolute",
    width: 250,
    height: 180,
    backgroundColor: COLORS.primary,
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 80,
    borderTopLeftRadius: 80,
    borderTopRightRadius: 150,
    bottom: -60,
    left: -80,
    },

    forgotPasswordImage: {
    width: 220,
    height: 220,
    alignSelf: "center",
    marginBottom: 20,
    },

    description: {
        width: "80%",
        alignSelf: "center",
        textAlign: "center",
        fontFamily: "Poppins_400Regular",
        fontSize: 14,
        marginBottom: 24,
    },

    emailText: {
        textAlign: "center",
        fontSize: 16,
        fontFamily: "Poppins_600SemiBold",
        marginBottom: 24,
    },

    inputContainer: {
        width: "80%",
        alignSelf: "center",
        gap: 16,
        marginBottom: 24,
    },


    codeContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 12,
        marginBottom: 32,
    },

    codeInput: {
        width: 60,
        height: 60,
        borderWidth: 1,
        borderColor: "#D9D9D9",
        borderRadius: 12,
        textAlign: "center",
        fontSize: 24,
        fontFamily: "Poppins_600SemiBold",
    },

    saveButton: {
        width: "80%",
        alignSelf: "center",
        backgroundColor: COLORS.primary,
    },

});