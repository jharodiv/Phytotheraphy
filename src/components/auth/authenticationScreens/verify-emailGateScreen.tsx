import AuthButton from "@components/auth/AuthButton/authButton";
import { styles } from "@components/auth/authenticationScreens/authenticationScreen.style";
import { router } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { auth } from "../../../../firebaseConfig";
import {
  reloadAndCheckVerified,
  resendVerificationEmail,
} from "../../../services/auth.service";

const VerifyEmailGateScreen = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const currentUser = auth.currentUser;
  const email = currentUser?.email ?? "";

  const onRefresh = async () => {
    if (!currentUser) return;
    setLoading(true);
    setMessage("");
    try {
      const verified = await reloadAndCheckVerified(currentUser);
      if (verified) {
        router.replace("/(tabs)");
      } else {
        setMessage("Still not verified yet. Please check your email.");
      }
    } catch {
      setMessage("Could not refresh verification status. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const onResend = async () => {
    if (!currentUser) return;
    setLoading(true);
    setMessage("");
    try {
      await resendVerificationEmail(currentUser);
      setMessage("Verification email resent.");
    } catch {
      setMessage("Could not resend verification email right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Verify your email</Text>
      <Text style={{ textAlign: "center", marginBottom: 12 }}>
        We sent a verification link to:
      </Text>
      <Text
        style={{ textAlign: "center", marginBottom: 24, fontWeight: "600" }}
      >
        {email}
      </Text>

      {!!message && (
        <Text style={{ textAlign: "center", marginBottom: 16 }}>{message}</Text>
      )}

      <AuthButton
        title={loading ? "Checking..." : "I've verified, continue"}
        onPress={onRefresh}
        style={styles.loginButton}
        loginText={{ color: "white" }}
      />

      <View style={{ height: 12 }} />

      <AuthButton title="Resend verification email" onPress={onResend} />
    </View>
  );
};

export default VerifyEmailGateScreen;
