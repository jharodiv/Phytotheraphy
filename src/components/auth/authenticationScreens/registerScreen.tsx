import { Image, Text, View } from "react-native";

import AuthButton from "@components/auth/AuthButton/authButton";
import AuthInput from "@components/auth/authInput/authInput";
import { styles } from "@components/auth/authenticationScreens/authenticationScreen.style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const RegisterScreen = () => {
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
            Register
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
            placeholder="Name"
            keyboardType="default"
            icon={
                <MaterialCommunityIcons
                name="account-outline"
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

            <AuthInput
            placeholder="Confirm Password"
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
            <Text
            style={styles.authenticationLink}
            onPress={() => router.push("/(auth)/forgotpassword")}>
            Forgot Password?
        </Text>
        <AuthButton
            title="Register"
            onPress={() => {}}
            style={styles.loginButton}
            loginText = {{ color: "white" }}
        />

        <View style={styles.footer}>
            <Text style={styles.footerText}>
                Already have an account?
            </Text>

            <Text
                style={styles.authenticationLink}
                onPress={() => router.push("/(auth)/login")}
            >
                Login
            </Text>
        </View>
        </View>
    );
}

export default RegisterScreen;