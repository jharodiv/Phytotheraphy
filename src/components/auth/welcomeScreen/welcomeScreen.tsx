import AuthButton from "@components/auth/AuthButton/authButton";
import styles from "@components/auth/welcomeScreen/welcomeScreen.styles";
import { router } from "expo-router";
import { useEffect, useRef } from "react";
import {
    Animated,
    Easing,
    Image,
    Text,
    View,
} from "react-native";

const WelcomeScreen = () => {
    const logoOpacity = useRef(new Animated.Value(0)).current;
    const logoScale = useRef(new Animated.Value(0.8)).current;

    const buttonsOpacity = useRef(new Animated.Value(0)).current;
    const buttonsTranslateY = useRef(new Animated.Value(40)).current;

    useEffect(() => {
        Animated.sequence([
        Animated.parallel([
            Animated.timing(logoOpacity, {
            toValue: 1,
            duration: 700,
            useNativeDriver: true,
            }),

            Animated.spring(logoScale, {
            toValue: 1,
            friction: 6,
            tension: 60,
            useNativeDriver: true,
            }),
        ]),

        Animated.parallel([
            Animated.timing(buttonsOpacity, {
            toValue: 1,
            duration: 500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
            }),

            Animated.timing(buttonsTranslateY, {
            toValue: 0,
            duration: 500,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
            }),
        ]),
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
        <Animated.Image
            source={require("@images/LOGO.png")}
            resizeMode="contain"
            style={[
            styles.logo,
            {
                opacity: logoOpacity,
                transform: [{ scale: logoScale }],
            },
            ]}
        />

        <Animated.View
            style={[
            styles.buttonContainer,
            {
                opacity: buttonsOpacity,
                transform: [{ translateY: buttonsTranslateY }],
            },
            ]}
        >
        <AuthButton
            title="Login"
            onPress={() => router.push("/(auth)/login")}
            style={styles.loginButton}
            loginText={styles.loginText}
        />

        <AuthButton
            title="Sign Up"
            onPress={() => router.push("/(auth)/register")}
            style={styles.registerButton}
        />

        <Text style={styles.orText}>or</Text>

        <AuthButton
            title="Continue with Google"
            onPress={() => router.push("/(auth)/register")}
            style={styles.registerButton}
            icon={
                <Image
                source={require("@images/GoogleLogo.png")}
                style={{ width: 20, height: 20 }}
                resizeMode="contain"
                />
            }
            />
        </Animated.View>
        </View>
    );
};

export default WelcomeScreen;