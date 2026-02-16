import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ChatWidget } from "@/components/chat/chat-widget";
import { PageTransition } from "@/components/layout/page-transition";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "TimeTravel Agency",
  description:
    "Webapp immersive pour découvrir, personnaliser et réserver un voyage temporel.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${manrope.variable} ${cormorant.variable} antialiased`}>
        <div className="min-h-screen bg-background text-foreground">
          <Header />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <ChatWidget />
        </div>
      </body>
    </html>
  );
}
