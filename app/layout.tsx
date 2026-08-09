import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PulaFeed | Botswana's Agriculture Community",
  description: "Connect with farmers, suppliers, veterinarians and agricultural service providers across Botswana.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
