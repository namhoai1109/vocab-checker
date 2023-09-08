"use client";
import { QueryClient, QueryClientProvider } from "react-query";
import "./globals.css";
import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";

const inter = Inter({ subsets: ["latin"] });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Vérifier le vocabulaire</title>
      </head>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <NextUIProvider>{children}</NextUIProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
