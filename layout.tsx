import type { Metadata, Viewport } from "next";
import Pwa from "@/components/Pwa";
import "./globals.css";

export const metadata: Metadata = {
  title: "Udhëto bashkë | RideShare AAB",
  description: "Gjej një udhëtim studentor drejt kampusit AAB.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7fafc",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="sq">
      <body>
        <Pwa />
        {children}
      </body>
    </html>
  );
}
