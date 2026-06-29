import { useState } from "react";
import { Image, Text, View } from "react-native";

import AuthButton from "@components/auth/AuthButton/authButton";
import AuthInput from "@components/auth/authInput/authInput";
import { styles } from "@components/auth/authenticationScreens/authenticationScreen.style";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { loginWithEmail } from "../../../services/auth.service";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onLogin = async () => {
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter email and password.");
      return;
    }

    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      const user = await loginWithEmail(email.trim(), password);

      // IMPORTANT: reload to get freshest emailVerified state
      await user.reload();

      if (user.emailVerified) {
        router.replace("/(tabs)");
      } else {
        router.replace("/(auth)/verify-email");
      }
    } catch (e: any) {
      const code = e?.code ?? "";
      if (
        code.includes("auth/invalid-credential") ||
        code.includes("auth/wrong-password") ||
        code.includes("auth/user-not-found")
      ) {
        setError("Invalid email or password.");
      } else if (code.includes("auth/invalid-email")) {
        setError("Invalid email.");
      } else if (code.includes("auth/too-many-requests")) {
        setError("Too many attempts. Please try again later.");
      } else {
        setError("Login failed. Please try again.");
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

      <Text style={styles.screenTitle}>Login</Text>

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

        <Text
          style={styles.forgotPassword}
          onPress={() => router.push("/(auth)/forgot-password")}
        >
          Forgot Password?
        </Text>

        {!!error && (
          <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
        )}
      </View>

      <AuthButton
        title={loading ? "Logging in..." : "Login"}
        onPress={onLogin}
        style={styles.loginButton}
        loginText={{ color: "white" }}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <Text
          style={styles.authenticationLink}
          onPress={() => router.push("/(auth)/register")}
        >
          Register
        </Text>
      </View>
    </View>
  );
};

export default LoginScreen;
