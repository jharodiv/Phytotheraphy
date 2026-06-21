import { COLORS } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    button: {
        padding: 12,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },

    iconContainer: { 
        position: 'absolute',
        left: 16,
    },

    text:{
        fontSize: 16,
        color: COLORS.black,
        textAlign: 'center',
        fontWeight: '400',
        fontFamily: "Poppins_400Regular",
    },

    loginText: {
        color: COLORS.white,
    }
});