import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// TT Fors Trial — для продакшена нужна полная лицензия TypeType
const fors = localFont({
  src: "./fonts/TTForsVariable.ttf",
  weight: "100 900",
  variable: "--font-fors",
});

export const metadata: Metadata = {
  title: "Никита Махнач — депутат | Красногорск",
  description:
    "Официальный сайт Никиты Сергеевича Махнача — депутата, члена партии «Единая Россия», Красногорский район.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${fors.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
