import AuthButton from "@components/auth/AuthButton/authButton";
import { styles } from "@components/auth/forgotPassword/forgotPassword.style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const VerifyCodeScreen = () => {
    const email = "user@example.com"; // FLAG: Temporary Email 
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
                source={require("@images/VerifyCode.png")}
                style={styles.forgotPasswordImage}
                resizeMode="contain"
            />

            <Text style={styles.description}>
                Enter the 4-digit verification code sent to your email.
            </Text>


            <Text style={styles.emailText}>
                {email}
            </Text>

            <View style={styles.codeContainer}>
                <TextInput
                    style={styles.codeInput}
                    keyboardType="number-pad"
                    maxLength={1}
                />

                <TextInput
                    style={styles.codeInput}
                    keyboardType="number-pad"
                    maxLength={1}
                />

                <TextInput
                    style={styles.codeInput}
                    keyboardType="number-pad"
                    maxLength={1}
                />

                <TextInput
                    style={styles.codeInput}
                    keyboardType="number-pad"
                    maxLength={1}
                />
            </View>

            <AuthButton
                title="Verify"
                onPress={() => router.push("/(auth)/reset-password")}
                style={styles.saveButton}
                loginText={{ color: "white" }}
            />
        </View>
    );
};

export default VerifyCodeScreen;