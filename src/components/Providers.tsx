"use client";

import { FC, ReactNode } from "react";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

interface IProvidersProps {
  children: ReactNode;
}

export const Providers: FC<IProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
};
