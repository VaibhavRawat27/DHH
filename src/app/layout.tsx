import type { Metadata } from "next";
import "./globals.css";
import { PlayerProvider } from "@/components/PlayerProvider";
import { PlayerBar } from "@/components/PlayerBar";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "DHH — Desi Hip Hop, the boombox never stops",
  description:
    "A rooftop for Desi Hip Hop. Raps only. Hit play once and the music rides with you across every page.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col">
        <PlayerProvider>
          <SiteHeader />
          <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-10">
            {children}
          </main>
          <footer className="mx-auto w-full max-w-5xl px-4 pb-6 text-center text-xs text-muted/70">
            DHH · Desi Hip Hop · {new Date().getFullYear()}
          </footer>
          <PlayerBar />
        </PlayerProvider>
      </body>
    </html>
  );
}
