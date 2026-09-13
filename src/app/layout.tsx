import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from "../context/LanguageContext";
import { AppStateProvider } from "../context/AppStateContext";
import { VoiceProvider } from "../context/VoiceContext";
import { AuthProvider } from "../context/AuthContext";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
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

