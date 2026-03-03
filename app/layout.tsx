import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "DRA Projects",
  description: "High-conversion landing pages for DRA real estate projects.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          id="sell-do-global-tracker"
          src="https://forms.cdn.sell.do/t/5ba883447c0dac3321d9f483.js"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
