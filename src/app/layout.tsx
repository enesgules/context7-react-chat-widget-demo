import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Context7 React Chat Widget Demo",
  description: "A Next.js demo for the Context7 chat widget on React documentation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        {children}
        <Script
          id="context7-chat-widget"
          src="https://context7.com/widget.js"
          data-library="/reactjs/react.dev"
          data-color="#059669"
          data-position="bottom-right"
          data-placeholder="Ask about React..."
          data-welcome-message="Ask me anything about the React documentation."
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
