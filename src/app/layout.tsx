import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "IELTSPrep — Master Your IELTS Score",
    template: "%s | IELTSPrep",
  },
  description:
    "A modern, interactive IELTS learning platform. Practice Listening, Reading, Writing, and Speaking modules with AI-powered feedback and track your progress.",
  keywords: [
    "IELTS",
    "IELTS preparation",
    "English test",
    "Listening",
    "Reading",
    "Writing",
    "Speaking",
    "Band score",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
