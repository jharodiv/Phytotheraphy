import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
  User,
} from "firebase/auth";

import {
  doc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";

import { auth, db } from "../../firebaseConfig";

type SignupPayload = {
  email: string;
  password: string;
  fullName: string;
  username: string;
};


export function getCurrentUser(): User {
  const user = auth.currentUser;

  if(!user) {
    throw new Error ("User is not authenticated");
  }

  return user;
}

export async function signupWithEmail(payload: SignupPayload) {
  const {
    email,
    password,
    fullName,
    username,
  } = payload;

  const normalizedEmail = email.trim().toLowerCase();
  const normalizedUsername = username.trim().toLowerCase();
  const normalizedFullName = fullName.trim();

  const credential = await createUserWithEmailAndPassword(
    auth,
    normalizedEmail,
    password
  );

  const user = credential.user;

  await updateProfile(user, {
    displayName: normalizedFullName,
  });

  await sendEmailVerification(user);

  await setDoc(doc(db, "users", user.uid), {
    id: user.uid,
    role: "user",

    email: normalizedEmail,

    fullName: normalizedFullName,
    username: normalizedUsername,

    photoURL: "",

    created_at: serverTimestamp(),
    updated_at: serverTimestamp(),
  });

  return user;
}

export async function loginWithEmail(
  email: string,
  password: string
) {
  const credential = await signInWithEmailAndPassword(
    auth,
    email.trim().toLowerCase(),
    password
  );

  return credential.user;
}

export async function sendResetEmail(email: string) {
  await sendPasswordResetEmail(
    auth,
    email.trim().toLowerCase()
  );
}

export async function resendVerificationEmail(user: User) {
  await sendEmailVerification(user);
}

export async function reloadAndCheckVerified(user: User) {
  await user.reload();
  return !!auth.currentUser?.emailVerified;
}