import { COLORS } from "@constants/colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 120,
    },  

    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: "center",
        paddingHorizontal: 24,
    },

    title: {
        fontSize: 40,
        fontFamily: "Poppins_600SemiBold",
        textAlign: "center",
    },

    logo: {
        width: 60,
        height: 60,
        marginRight: 10,
    },

    inputContainer: {
        width: "80%",
        alignSelf: "center",
        gap: 16,
        marginBottom: 24,
    },

    loginButton: {
        width: "80%",
        alignSelf: "center",
        backgroundColor: COLORS.primary,
    },
});