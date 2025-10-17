"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signUpUser } from "@/lib/actions/user.actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signUpDefaultValues } from "@/lib/constants";
import { useSearchParams } from "next/navigation";

const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, { success: false, message: "" });
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const SignUpButton = () => {
    const { pending } = useFormStatus();
    return (
      <Button className="w-full" variant={"default"} disabled={pending} type="submit">
        {pending ? "Submitting..." : "Sign Up"}
      </Button>
    );
  };

  return (
    <form className="space-y-6" action={action}>
      <input type="hidden" name="callbackUrl" value={callbackUrl} />
      <div>
        <Label htmlFor="email">Name</Label>
        <Input id="name" name="name" type="text" autoComplete="name" defaultValue={signUpDefaultValues.name} />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" required autoComplete="email" defaultValue={signUpDefaultValues.email} />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input id="password" name="password" type="password" required autoComplete="password" defaultValue={signUpDefaultValues.password} />
      </div>
      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          autoComplete="confirmPassword"
          defaultValue={signUpDefaultValues.confirmPassword}
        />
      </div>
      <div>
        <SignUpButton />
      </div>
      {data && !data.success && <div className="text-destructive text-center">{data.message}</div>}
      <div className="text-sm text-center text-muted-foreground">
        Already have an account?{" "}
        <Link href={"/sign-in"} target="_self" className="link">
          Sign In
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
