"use client";

import { FC, useState } from "react";
import { Button } from "@/ui/Button";
import { signOut } from "next-auth/react";
import { toast } from "@/ui/toast";

interface ISignOutButtonProps {}

const SignOutButton: FC<ISignOutButtonProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);

  const signInWithGoogle = async () => {
    setIsLoading(true);
    try {
      await signOut();
    } catch (e) {
      toast({
        title: "Error sign out",
        message: "Please try again later",
        type: "error"
      });
    }
  };

  return (
    <Button isLoading={isLoading} onClick={signInWithGoogle}>
      Sign out
    </Button>
  );
};

export default SignOutButton;
