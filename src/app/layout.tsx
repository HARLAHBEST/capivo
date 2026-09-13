import type { Metadata } from "next";
import { Fraunces, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import { AppStateProvider } from "../context/AppStateContext";
import { VoiceProvider } from "../context/VoiceContext";
import { AuthProvider } from "../context/AuthContext";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Capivo — Smart Business Ledger for Nigerian SMEs",
  description:
    "Capivo is a modern, AI-powered business financial management app for Nigerian small and medium enterprises. Track inventory, sales, expenses, credit, and profit in English, Hausa, Yoruba, Igbo, and Pidgin.",
  keywords: [
    "capivo",
    "nigerian business app",
    "business ledger",
    "inventory management",
    "SME accounting Nigeria",
    "sales tracking",
    "hausa business app",
    "yoruba business app",
    "igbo business app",
    "voice controlled business app",
  ],
  authors: [{ name: "Capivo" }],
  robots: "index, follow",
  openGraph: {
    title: "Capivo — Smart Business Ledger for Nigerian SMEs",
    description: "Track inventory, sales, profit and expenses across all your branches — in any Nigerian language.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${fraunces.variable} ${ibmPlexSans.variable} ${ibmPlexMono.variable}`}>
      <body className={ibmPlexSans.className}>
        <AuthProvider>
          <LanguageProvider>
            <AppStateProvider>
              <VoiceProvider>{children}</VoiceProvider>
            </AppStateProvider>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

