import AuthButton from "@components/auth/AuthButton/authButton";
import AuthInput from "@components/auth/authInput/authInput";
import { styles } from "@components/auth/forgotPassword/forgotPassword.style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { sendResetEmail } from "../../../services/auth.service";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const onSend = async () => {
    setError("");
    setMessage("");

    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      await sendResetEmail(email.trim());
      setMessage("Check your email for the password reset link.");
    } catch (e: any) {
      const code = e?.code ?? "";
      if (code.includes("auth/user-not-found")) {
        setError("No account found with this email.");
      } else if (code.includes("auth/too-many-requests")) {
        setError("Too many attempts. Please try again later.");
      } else if (code.includes("auth/invalid-email")) {
        setError("Invalid email address.");
      } else {
        setError("Failed to send reset email. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topShape} />
      <View style={styles.bottomShape} />

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <MaterialCommunityIcons name="arrow-left" size={28} color="black" />
      </TouchableOpacity>

      <Image
        source={require("@images/MailboxForgotPassword.png")}
        style={styles.forgotPasswordImage}
        resizeMode="contain"
      />

      <Text style={styles.description}>
        Enter your email address and we'll send you a password reset link.
      </Text>

      <View style={styles.inputContainer}>
        <AuthInput
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          icon={
            <MaterialCommunityIcons
              name="email-outline"
              size={22}
              color="gray"
            />
          }
        />
      </View>

      {!!error && (
        <Text style={{ textAlign: "center", color: "red", marginBottom: 8 }}>
          {error}
        </Text>
      )}
      {!!message && (
        <Text style={{ textAlign: "center", color: "green", marginBottom: 8 }}>
          {message}
        </Text>
      )}

      <AuthButton
        title={loading ? "Sending..." : "Send"}
        onPress={onSend}
        style={styles.saveButton}
        loginText={{ color: "white" }}
      />
    </View>
  );
};

export default ForgotPasswordScreen;
