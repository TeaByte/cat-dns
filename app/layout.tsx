import "./globals.css";
import type { Metadata } from "next";

import AuthProvider from "./auth-provider";
import { Toaster } from "@/components/ui/toaster";

import Nav from "@/components/navigation/nav";
import Footer from "@/components/footer/footer";

import { Rubik } from "next/font/google";
import { SubDomainProvider } from "@/components/context/context";
const font = Rubik({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "Cat DNS",
  description:
    "Cat DNS is your go-to solution for free dynamic DNS services. Say goodbye to tracking changing IP addresses and hello to effortless remote access with our feline-friendly system. Create personalized subdomains, ensure connectivity, and enjoy a hassle-free internet experience.",
  keywords: [
    "Dynamic DNS",
    "Free DNS service",
    "Cat DNS",
    "Dynamic IP address",
    "Custom subdomains",
    "DNS management",
    "Home network access",
    "Dynamic IP management",
    "Personalized subdomains",
    "Reliable DNS service",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <SubDomainProvider>
          <body className={font.className}>
            <Nav />
            <div className="container mx-auto">
              <main className="flex flex-col gap-5 pt-3 mb-5">{children}</main>
              <Footer />
            </div>
            <Toaster />
          </body>
        </SubDomainProvider>
      </AuthProvider>
    </html>
  );
}
