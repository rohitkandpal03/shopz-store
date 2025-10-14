/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { signInFormSchema } from "@/lib/validators";
import { signIn, signOut } from "@/auth";

export async function signInWithCredentials(prevState: any, formData: FormData) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    });

    await signIn("credentials", user);

    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Invalid email or password." };
  }
}

//sing out user
export async function signOutUser() {
  try {
    await signOut();
    return { success: true, message: "Signed out successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: "Error signing out. Please try again." };
  }
}
