import { Image, Text, View } from "react-native";

import AuthButton from "@components/auth/AuthButton/authButton";
import AuthInput from "@components/auth/authInput/authInput";
import { styles } from "@components/auth/authenticationScreens/authenticationScreen.style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const LoginScreen = () => {
    return (
        <View style={styles.container}>

        <View style={styles.topShape} />
        <View style={styles.bottomShape} />
        
        <View style={styles.header}>
            <Image
                source={require("@images/LOGO.png")}
                style={styles.logo}
            />

            <Text style={styles.title}>
                Phytotherapy
            </Text>
        </View>

        <Text style={styles.screenTitle}>
            Login
        </Text>

        <View style={styles.inputContainer}>
            <AuthInput
            placeholder="Email"
            keyboardType="email-address"
            icon={
            <MaterialCommunityIcons
            name="email-outline"
            size={22}
            color="gray"
            />
        }
            />

            <AuthInput
            placeholder="Password"
            secureTextEntry
            icon={
                <MaterialCommunityIcons
                name="lock-outline"
                size={22}
                color="gray"
                />
            }
            />
        </View>

        <AuthButton
            title="Login"
            onPress={() => {}}
            style={styles.loginButton}
            loginText = {{ color: "white" }}
        />

        <View style={styles.footer}>
            <Text style={styles.footerText}>
                Don't have an account?
            </Text>

            <Text
                style={styles.authenticationLink}
                onPress={() => router.push("/(auth)/register")}
            >
                Register
            </Text>
        </View>
        </View>
    );
}

export default LoginScreen;