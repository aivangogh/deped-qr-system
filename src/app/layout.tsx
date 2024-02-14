import { Inter } from "next/font/google";
import "./globals.css";

import QueryClientProviderContext from "@/context/QueryClientProviderContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DepEd: Training QR System",
  description: "DepEd's Training QR System",
  generator: "DepEd: Training QR System",
  manifest: "/manifest.json",
  keywords: ["deped"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    { name: "Ivan Gemota" },
    {
      name: "Ivan Gemota",
      url: "https://github.com/aivangogh",
    },
  ],
  viewport:
    "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
  icons: [
    { rel: "apple-touch-icon", url: "images/deped-logo.png" },
    { rel: "icon", url: "images/deped-logo.png" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProviderContext>{children}</QueryClientProviderContext>
      </body>
    </html>
  );
}
