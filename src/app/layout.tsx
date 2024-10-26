import type { Metadata } from "next";
import { JetBrains_Mono, Inter, Plus_Jakarta_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner";
import { QueryProvider } from "@/components/query-provider";
import "./globals.css";

// Main font for UI elements and body text
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Secondary font for headings and important UI elements
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-heading",
});

// Monospace font for code, IDs, and technical content
const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Taskera",
  description: "Taskera is a task management app",
  keywords: ["task management", "project management", "agile", "scrum"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          plusJakarta.variable,
          inter.variable,
          jetBrainsMono.variable,
          "antialiased min-h-screen font-sans"
        )}
      >
        <QueryProvider>
          <Toaster />
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
