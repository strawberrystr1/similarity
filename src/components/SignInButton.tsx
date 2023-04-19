"use client";

import { FC, useState } from "react";
import { Button } from "@/ui/Button";
import { signIn } from "next-auth/react";
import { toast } from "@/ui/toast";

interface ISignInButtonProps {}

const SignInButton: FC<ISignInButtonProps> = () => {
  const [isLoading, setIsLoading] = useState(false);

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signIn("google");
    } catch (e) {
      toast({
        title: "Error sign in",
        message: "Please try again",
        type: "error"
      });
    }
  };

  return (
    <Button isLoading={isLoading} onClick={signInWithGoogle}>
      Sign in
    </Button>
  );
};

export default SignInButton