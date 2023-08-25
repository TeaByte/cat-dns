import "./globals.css";
import type { Metadata } from "next";

import AuthProvider from "./auth-provider";
import { Toaster } from "@/components/ui/toaster";

import Nav from "@/components/navigation/nav";
import Footer from "@/components/footer/footer";

import { Rubik } from "next/font/google";
const font = Rubik({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "DNS",
  description: "DNS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={font.className}>
          <Nav />
          <div className="container mx-auto">
            <main className="flex flex-col gap-5 pt-3 mb-5">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </body>
      </AuthProvider>
    </html>
  );
}
