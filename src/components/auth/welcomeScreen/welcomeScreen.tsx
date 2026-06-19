import AuthButton from '@components/auth/AuthButton/authButton';
import styles from '@components/auth/welcomeScreen/welcomeScreen.styles';
import { router } from 'expo-router';
import { Image, Text, View } from 'react-native';

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

        {/* Title */}
        <Text style={styles.title}>
            Phytotheraphy
        </Text>

        {/* Subtitle */}
        <Text style={styles.subtitle}>
            Discover medicinal plants and their
            benefits anytime, anywhere.
        </Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
            <AuthButton
            title="Login"
            onPress={() => router.push ("/auth/login")}
            style={styles.loginButton}
            />

            <AuthButton
            title="Create Account"
            onPress={() => router.push ("/auth/register")}
            style={styles.registerButton}
            />
        </View>
        </View>
    );
};

export default WelcomeScreen;

