import type { Metadata } from "next";
import "./globals.css";
import "./responsive.css";
import "./heritage.css";

export const metadata: Metadata = {
  title: "Wedlink — Your story. One beautiful link.",
  description: "Beautiful wedding invitation websites, personalized with your story and ready to share.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
