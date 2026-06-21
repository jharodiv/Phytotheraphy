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
        width: 180,
        height: 180,
        marginBottom: 70,
    },

    buttonContainer: {
        width: '100%',
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
    }
});

export default styles;