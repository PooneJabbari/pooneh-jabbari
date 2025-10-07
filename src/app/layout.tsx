import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pooneh Jabbari | Frontend Developer",
  description:
    "Experienced Frontend Developer with 5+ years expertise in Next.js, React.js, and modern web technologies. Building impactful digital experiences.",
  keywords: [
    "Frontend Developer",
    "Next.js",
    "React.js",
    "TypeScript",
    "Web Development",
    "Pooneh Jabbari",
  ],
  authors: [{ name: "Pooneh Jabbari" }],
  openGraph: {
    title: "Pooneh Jabbari | Frontend Developer",
    description:
      "Experienced Frontend Developer specializing in Next.js, React.js, and modern web technologies.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
