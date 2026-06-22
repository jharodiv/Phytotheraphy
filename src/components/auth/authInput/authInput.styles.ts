import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        marginBottom: 12,
    },

    input: {
        flex: 1,
        paddingVertical: 12,
        marginLeft: 10,
        outlineStyle: "none" as any,
    },
});