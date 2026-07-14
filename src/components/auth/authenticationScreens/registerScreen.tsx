import { useState } from "react";
import { Image, Text, View } from "react-native";

import AuthButton from "@components/auth/AuthButton/authButton";
import AuthInput from "@components/auth/authInput/authInput";
import { styles } from "@components/auth/authenticationScreens/authenticationScreen.style";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

import { signupWithEmail } from "@services/auth.service";
import { validateRegister } from "@validation/auth.validation";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onRegister = async () => {
    setError("");

    setLoading(true);

    try {
      const validationError = await validateRegister({
        email,
        fullName,
        username,
        password,
        confirmPassword,
      });

      if (validationError) {
        setError(validationError);
        return;
      }

      await signupWithEmail({
        email,
        fullName,
        username,
        password,
      });

      router.replace("/(auth)/verify-email");
    } catch (e: any) {
      const code = e?.code ?? "";

      if (code === "auth/email-already-in-use") {
        setError("Email is already registered.");
      } else if (code === "auth/weak-password") {
        setError("Password is too weak.");
      } else if (code === "auth/invalid-email") {
        setError("Invalid email address.");
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
          autoCapitalize="none"
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
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          icon={
            <MaterialCommunityIcons
              name="account-outline"
              size={22}
              color="gray"
            />
          }
        />

        <AuthInput
          placeholder="Username"
          autoCapitalize="none"
          value={username}
          onChangeText={setUsername}
          icon={
            <MaterialCommunityIcons
              name="at"
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
          <Text
            style={{
              color: "red",
              textAlign: "center",
              marginTop: 10,
            }}
          >
            {error}
          </Text>
        )}

      </View>

      <AuthButton
        title={loading ? "Registering..." : "Register"}
        onPress={onRegister}
        style={styles.loginButton}
        loginText={{ color: "white" }}
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
};

export default RegisterScreen;