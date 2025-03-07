import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DocScan - Document Scanning & Matching",
  description: "A powerful document scanner and matching system.",
  generator: "DocScan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>{children}</body>
    </html>
  );
}
