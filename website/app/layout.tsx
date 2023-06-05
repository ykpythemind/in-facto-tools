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

const description =
  "「真の楽しさを追求する」知的活動団体、in-factoの公式サイトです。";

export const metadata: Metadata = {
  metadataBase: new URL("https://in-facto.jp"),
  title: { absolute: "", template: "%s - in-facto" },
  description,
  openGraph: {
    title: { absolute: "", template: "%s - in-facto" },
    type: "article",
    description,
    images: "/in-facto-ogp.jpg",
    siteName: "in-facto",
  },
  twitter: {
    card: "summary_large_image",
    images: "/in-facto-ogp.jpg",
    description,
    title: { absolute: "", template: "%s - in-facto" },
  },
};
