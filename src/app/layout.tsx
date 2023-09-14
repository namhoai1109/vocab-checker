"use client";
import "./globals.css";
import { Inter } from "next/font/google";
import { NextUIProvider } from "@nextui-org/react";
import { ConfigProvider } from "antd";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="check vocabulary" />
        <title>Vérifier le vocabulaire</title>
      </head>
      <body className={inter.className}>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "#3fcf8e",
              borderRadius: 2,
            },
          }}
        >
          <NextUIProvider>{children}</NextUIProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
