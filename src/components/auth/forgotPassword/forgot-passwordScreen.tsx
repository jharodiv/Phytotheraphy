import { Image, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";
import AuthButton from "@components/auth/AuthButton/authButton";
import AuthInput from "@components/auth/authInput/authInput";
import { styles } from "@components/auth/forgotPassword/forgotPassword.style";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const ForgotPasswordScreen = () => {
    return (
        <View style={styles.container}>
            <View style={styles.topShape} />
            <View style={styles.bottomShape} />

            <TouchableOpacity
                style={styles.backButton}
                onPress={() => router.back()}
            >
                <MaterialCommunityIcons
                    name="arrow-left"
                    size={28}
                    color="black"
                />
            </TouchableOpacity>            

            <Image
                source={require("@images/MailboxForgotPassword.png")}
                style={styles.forgotPasswordImage}
                resizeMode="contain"
            />

            <Text style={styles.description}>
                Enter your email address and we'll send you a verification code
                to reset your password.
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
            </View>

            <AuthButton
                title="Send"
                onPress={() => {}}
                style={styles.saveButton}
                loginText={{ color: "white" }}
            />
        </View>
    );
};

export default ForgotPasswordScreen;