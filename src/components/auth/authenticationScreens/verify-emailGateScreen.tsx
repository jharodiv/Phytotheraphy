import AuthButton from "@components/auth/AuthButton/authButton";
import { styles } from "@components/auth/authenticationScreens/authenticationScreen.style";
import { resendVerificationEmail } from "@services/auth.service";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { AppState, Text, View } from "react-native";
import { auth } from "../../../../firebaseConfig";

const VerifyEmailGateScreen = () => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const currentUser = auth.currentUser;
  const email = currentUser?.email ?? "";

  useEffect(() => {
    if (!currentUser) return;

    const checkVerification = async () => {
      try {
        await currentUser.reload();

        if (currentUser.emailVerified) {
          router.replace("/(tabs)");
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Check every 5 seconds
    const interval = setInterval(checkVerification, 5000);

    // Check immediately when app comes back to foreground
    const subscription = AppState.addEventListener("change", (state) => {
      if (state === "active") {
        checkVerification();
      }
    });

    return () => {
      clearInterval(interval);
      subscription.remove();
    };
  }, [currentUser]);

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
        style={{
          textAlign: "center",
          marginBottom: 24,
          fontWeight: "600",
        }}
      >
        {email}
      </Text>

      <Text style={{ textAlign: "center", marginBottom: 24 }}>
        Waiting for verification...
      </Text>

      {!!message && (
        <Text style={{ textAlign: "center", marginBottom: 16 }}>
          {message}
        </Text>
      )}

      <AuthButton
        title={loading ? "Sending..." : "Resend verification email"}
        onPress={onResend}
      />
    </View>
  );
};

export default VerifyEmailGateScreen;