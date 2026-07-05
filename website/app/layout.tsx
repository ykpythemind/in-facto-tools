import { generateSharedMetadata } from "../lib/generateSharedMetadata";
import "../styles/globals.css";

import { Metadata } from "next";
import { Noto_Serif_JP } from "next/font/google";

const notoSerif = Noto_Serif_JP({
  weight: ["400", "700"],
  preload: false,
  variable: "--font-noto-serif",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className={notoSerif.variable}>
      <head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" href="/android-chrome-192x192.png" />
      </head>
      <body>{children}</body>
    </html>
  );
}

const meta = generateSharedMetadata({ title: "" });

export const metadata: Metadata = {
  metadataBase: new URL("https://in-facto.jp"),
  ...meta,
};
