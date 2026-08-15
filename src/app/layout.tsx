import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";
import "./codexa/codexa.css";

export const metadata: Metadata = {
  title: "Codexa – Premium Developer Automation Template",
  description:
    "Write workflow logic in code and let Codexa automate, schedule, and optimize everything.",
  icons: {
    icon: "/sites/codexa-framer-website-9c43da05/root-8a5edab2/images/codexa-mark.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
