import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  User,
} from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebaseConfig";

type SignupPayload = {
  email: string;
  password: string;
  name: string;
};

export async function signupWithEmail(payload: SignupPayload) {
  const { email, password, name } = payload;
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  const user = credential.user;

  await sendEmailVerification(user);

  // user profile doc (NO password)
  await setDoc(doc(db, "users", user.uid), {
    id: user.uid,
    role: "user",
    email: user.email ?? email,
    name,
    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  });

  return user;
}

export async function loginWithEmail(email: string, password: string) {
  const credential = await signInWithEmailAndPassword(auth, email, password);
  return credential.user;
}

export async function sendResetEmail(email: string) {
  await sendPasswordResetEmail(auth, email);
}

export async function resendVerificationEmail(user: User) {
  await sendEmailVerification(user);
}

export async function reloadAndCheckVerified(user: User) {
  await user.reload();
  return !!auth.currentUser?.emailVerified;
}
