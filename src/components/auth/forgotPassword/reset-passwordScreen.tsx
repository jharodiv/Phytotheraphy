import AuthButton from "@components/auth/AuthButton/authButton";
import AuthInput from "@components/auth/authInput/authInput";
import { styles } from "@components/auth/forgotPassword/forgotPassword.style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, View } from "react-native";

const ResetPasswordScreen = () => {
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
                source={require("@images/ResetPassword.png")}
                style={styles.forgotPasswordImage}
                resizeMode="contain"
            />

            <Text style={styles.description}>
                Set a strong password to secure access.
            </Text>

            <View style={styles.inputContainer}>
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

            <AuthButton
                title="Save"
                onPress={() => router.push("/(auth)/login")} // FLAG: Will change afterwards
                style={styles.saveButton}
                loginText={{ color: "white" }}
            />
        </View>
    );
};

export default ResetPasswordScreen;