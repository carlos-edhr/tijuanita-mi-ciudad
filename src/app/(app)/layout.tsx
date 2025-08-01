import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
// import { Roboto, Bebas_Neue, Roboto_Condensed } from "next/font/google";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { Toaster } from "@/components/ui/sonner";
import { luckiest_guy } from "./fonts";

import localFont from "next/font/local";

const kawaiiRT = localFont({
  src: "./fonts/KawaiiRT-MonaShine.ttf",
  display: "swap",
  variable: "--font-kawaiiRT", // Optional: CSS variable name
});

export const metadata: Metadata = {
  title: "Tijuanita Mi Ciudad",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${luckiest_guy.variable} ${kawaiiRT.variable}`}>
        <NuqsAdapter>
          <TRPCReactProvider>
            {children}

            <Toaster />
          </TRPCReactProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
