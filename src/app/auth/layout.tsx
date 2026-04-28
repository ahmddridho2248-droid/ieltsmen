import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in or create your IELTSPrep account to start practicing.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
