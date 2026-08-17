import type { Metadata } from "next";
import Script from "next/script";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieNotice from "@/components/CookieNotice";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = buildMetadata({
  title: "Миграционный юрист Егор Андреев | Москва",
  description:
    "Миграционный юрист Андреев Егор Викторович. Снятие запрета на въезд в Россию, отмена депортации и выдворения, оформление РВП, ВНЖ и гражданства РФ.",
  path: "/",
});

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className="h-full">
      <head>
        <meta name="google-site-verification" content="wivlQyw7EV1jjBZTBgnmNE_CRuU5yA4w3_oeo44Qpzo" />
        <meta name="yandex-verification" content="358a1dc97015f624" />
        <OrganizationJsonLd />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <style>{`
          :root {
            --font-pt-serif: 'PT Serif', Georgia, serif;
            --font-inter: 'Inter', system-ui, sans-serif;
            --font-mono-legal: 'JetBrains Mono', ui-monospace, monospace;
          }
        `}</style>
      </head>
      <body className="min-h-full flex flex-col bg-paper text-text antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieNotice />
        <Script
          src="//code.jivo.ru/widget/lfc0yqgGdk"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
