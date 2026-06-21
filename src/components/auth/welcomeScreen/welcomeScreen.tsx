import AuthButton from '@components/auth/AuthButton/authButton';
import styles from '@components/auth/welcomeScreen/welcomeScreen.styles';
import { AntDesign } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Image, View } from 'react-native';

//NativeStackScreenProps = comes from react-navigation, its purpose is to give your screen component TypeScript types of navigation.


const WelcomeScreen = () => {
    return (
        <View style={styles.container}>
        {/* Logo */}
        <Image
            source={require("@images/LOGO.png")}
            style={styles.logo}
            resizeMode="contain"
        />
        {/* Buttons */}
        <View style={styles.buttonContainer}>
            <AuthButton
            title="Login"
            onPress={() => router.push ("/(auth)/login")}
            style={styles.loginButton}
            loginText={styles.loginText}
            />

            <AuthButton
            title="Create Account"
            onPress={() => router.push ("/(auth)/register")}
            style={styles.registerButton}
            />

            <AuthButton
            title="Continue with Google"
            onPress={() => router.push ("/(auth)/register")}
            style={styles.registerButton}
            icon={<AntDesign name="google" size={20} />}
            />
        </View>
        </View>
    );
};

export default WelcomeScreen;

