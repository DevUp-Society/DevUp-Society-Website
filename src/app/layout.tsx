import type { Metadata } from "next";
import { Montserrat_Alternates } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/ui/header-2";
import Footer from "@/components/Footer";

const montserratAlternates = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-primary",
});

export const metadata: Metadata = {
  title: "DevUp Society | College Tech Club",
  description: "Official website of DevUp Society - A community of developers, innovators, and tech enthusiasts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={montserratAlternates.variable}>
      <body className="font-primary bg-black text-white">
        <Header />
        <main className="min-h-screen bg-black">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
