import { COLORS } from '@constants/colors';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },

    logo: {
        width: 210,
        height: 210,
        marginBottom: 100,
    },

    buttonContainer: {
        width: '80%',
        gap: 12,
    },

    loginButton: {
        backgroundColor: COLORS.primary,
    },
    
    registerButton: {
        backgroundColor: COLORS.transparent,
        borderWidth: 1,
        borderColor: COLORS.black,

    },

    loginText: {
        color: COLORS.white,
    },

    orText: {
        textAlign: 'center',
        color: COLORS.black
    }
});

export default styles;