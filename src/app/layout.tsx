import type { Metadata } from "next";
import Script from "next/script";
import { PT_Serif, Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieNotice from "@/components/CookieNotice";
import OrganizationJsonLd from "@/components/OrganizationJsonLd";
import { buildMetadata } from "@/lib/seo";
import "./globals.css";

// Самохостинг шрифтов через next/font — файлы скачиваются один раз на
// этапе сборки и раздаются со своего домена, без запросов браузера к
// fonts.googleapis.com/fonts.gstatic.com (устраняет трансграничную
// передачу IP посетителя в Google, см. /privacy). Имена CSS-переменных
// совпадают с прежними литеральными --font-pt-serif/--font-inter/
// --font-mono-legal, поэтому globals.css трогать не пришлось.
const ptSerif = PT_Serif({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-pt-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--font-mono-legal",
  display: "swap",
});

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Миграционный юрист Егор Андреев | Москва",
    description:
      "Миграционный юрист Егор Андреев. Снятие запрета на въезд в Россию, отмена депортации и выдворения, оформление РВП, ВНЖ и гражданства РФ.",
    path: "/",
  }),
  icons: {
    icon: "/favicon.ico",
    apple: "/images/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ru"
      className={`h-full ${ptSerif.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta name="google-site-verification" content="wivlQyw7EV1jjBZTBgnmNE_CRuU5yA4w3_oeo44Qpzo" />
        <meta name="yandex-verification" content="358a1dc97015f624" />
        <OrganizationJsonLd />
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
