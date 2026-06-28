import { useState } from "react";
import { Image, Text, View } from "react-native";

import AuthButton from "@components/auth/AuthButton/authButton";
import AuthInput from "@components/auth/authInput/authInput";
import { styles } from "@components/auth/authenticationScreens/authenticationScreen.style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { signupWithEmail } from "../../../services/auth.service";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onRegister = async () => {
    setError("");

    if (!email.trim() || !name.trim() || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await signupWithEmail({
        email: email.trim(),
        password,
        name: name.trim(),
      });

      // user must verify email before app access
      router.replace("/(auth)/verify-email");
    } catch (e: any) {
      const code = e?.code ?? "";
      if (code.includes("auth/email-already-in-use")) {
        setError("Email already in use.");
      } else if (code.includes("auth/weak-password")) {
        setError("Password is too weak.");
      } else if (code.includes("auth/invalid-email")) {
        setError("Invalid email.");
      } else {
        setError("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.topShape} />
      <View style={styles.bottomShape} />

      <View style={styles.header}>
        <Image source={require("@images/LOGO.png")} style={styles.logo} />

        <Text style={styles.title}>Phytotherapy</Text>
      </View>

      <Text style={styles.screenTitle}>Register</Text>

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

        <AuthInput
          placeholder="Name"
          keyboardType="default"
          value={name}
          onChangeText={setName}
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
          value={password}
          onChangeText={setPassword}
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
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          icon={
            <MaterialCommunityIcons
              name="lock-outline"
              size={22}
              color="gray"
            />
          }
        />

        {!!error && (
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
        )}
      </View>

      <AuthButton
        title={loading ? "Registering..." : "Register"}
        onPress={onRegister}
        style={styles.loginButton}
        loginText={{ color: "white" }}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Already have an account?</Text>

        <Text
          style={styles.authenticationLink}
          onPress={() => router.push("/(auth)/login")}
        >
          Login
        </Text>
      </View>
    </View>
  );
};

export default RegisterScreen;
