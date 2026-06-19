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
        marginBottom: 20,
    },

    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.black,
        textAlign: 'center'
    },

    subtitle: {
        fontSize: 16,
        color: COLORS.gray,
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 40,
        lineHeight: 24,
    },

    buttonContainer: {
        width: '100%',
        gap: 12,
    },

    loginButton: {
        backgroundColor: COLORS.primary,
    },
    
    registerButton: {
        backgroundColor: COLORS.secondary,
    }
});

export default styles;