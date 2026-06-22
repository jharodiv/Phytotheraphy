import { Text, View } from "react-native";

import AuthButton from "@components/auth/AuthButton/authButton";
import AuthInput from "@components/auth/authInput/authInput";
import { styles } from "@components/auth/loginScreen/loginScreen.styles";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LoginScreen = () => {
    return (
        <View style={styles.container}>
        <Text style={styles.title}>
            Welcome Back
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
        </View>
    );
}

export default LoginScreen;