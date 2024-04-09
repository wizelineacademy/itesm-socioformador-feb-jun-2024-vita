
import type { Metadata } from "next";

import "../globals.css";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import NextAuthProvider from "@/context/authprovider";

const interFont = Inter({
  display: "swap",
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Vita",
  description: "Salud",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
 
    <html lang="es">
      <NextAuthProvider>
        <body className={interFont.className}>
          {children}
        </body>
      </NextAuthProvider>   
    </html>
    
  );
}
