"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signInWithCredentials } from "@/lib/actions/user.actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInDefaultValues } from "@/lib/constants";
import { useSearchParams } from "next/navigation";

const CredentialSignInForm = () => {
  const [data, action] = useActionState(signInWithCredentials, { success: false, message: "" });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignInButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button className="w-full" variant={"default"} disabled={pending} type="submit">
        {pending ? "Signing In..." : "Sign In"}
      </Button>
    );
  };

  return (
    <form className="space-y-6" action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" defaultValue={signInDefaultValues.email} />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required autoComplete="password" defaultValue={signInDefaultValues.password} />
      </div>
      <div>
        <SignInButton />
      </div>
      {data && !data.success && <div className="text-destructive text-center">{data.message}</div>}
      <div className="text-sm text-center text-muted-foreground">
        Don&apos;t have an account?{" "}
        <Link href={"/sign-up"} target="_self" className="link">
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default CredentialSignInForm;
