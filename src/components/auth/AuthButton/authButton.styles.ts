import { COLORS } from '@constants/colors';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    button: {
        padding: 12,
        borderRadius: 8,
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
    },

    loginText: {
        color: COLORS.white,
    }
});