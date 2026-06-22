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
        marginTop: 15,
        fontSize: 32,
        fontFamily: "Poppins_600SemiBold",
        textAlign: "center",
    },

    logo: {
        width: 100,
        height: 100,
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
});