import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
        borderRadius: 30,
        paddingHorizontal: 18,
        height: 54,
        marginHorizontal: 20,
        marginTop: 20,

        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 8,
        shadowOffset: {
        width: 0,
        height: 2,
        },

        elevation: 3,
    },

    icon: {
        marginRight: 10,
    },

    input: {
        flex: 1,
        fontSize: 16,
        color: "#000",
    },
});

export default styles;