import { Image, Text, View } from "react-native";

import AuthButton from "@components/auth/AuthButton/authButton";
import AuthInput from "@components/auth/authInput/authInput";
import { styles } from "@components/auth/loginScreen/loginScreen.styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LoginScreen = () => {
    return (
        <View style={styles.container}>
        <View style={styles.header}>
            <Image
                source={require("@images/LOGO.png")}
                style={styles.logo}
            />

            <Text style={styles.title}>
                Phytotherapy
            </Text>
        </View>

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
        </View>
    );
}

export default LoginScreen;