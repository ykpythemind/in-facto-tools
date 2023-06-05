import { generateSharedMetadata } from "../lib/generateSharedMetadata";
import "../styles/globals.css";

import { Metadata } from "next";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
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
