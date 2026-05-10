import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Agemo | Autonomous AI Growth Agent via Torque MCP",
  description: "AI CMO agent that autonomously creates, monitors, and optimizes Torque growth campaigns on Solana. Analyze → Optimize → Execute — full autonomous loop via MCP.",
  keywords: ["Torque", "MCP", "Solana", "AI Agent", "Growth", "DeFi", "Campaign"],
  icons: {
    icon: "/icon.svg",
    apple: "/apple-icon.png",
  },
  openGraph: {
    title: "Agemo — Autonomous AI Growth Loop Agent",
    description: "Full autonomous growth loop: Analyze → Optimize → Execute via Torque MCP on Solana.",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Agemo | Autonomous AI Growth Agent via Torque MCP",
      },
    ],
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
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary-500/30">
        <Navbar />
        <div className="flex flex-col flex-1 relative">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
