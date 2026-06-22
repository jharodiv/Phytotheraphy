import { COLORS } from "@constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: "center",
        paddingHorizontal: 24,
    },

    title: {
        fontSize: 28,
        fontFamily: "Poppins_600SemiBold",
        marginBottom: 32,
        textAlign: "center",
    },

    inputContainer: {
        gap: 16,
        marginBottom: 24,
    },

    loginButton: {
        backgroundColor: COLORS.primary,
    },
});