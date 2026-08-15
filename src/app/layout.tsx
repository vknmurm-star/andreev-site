import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "Миграционный юрист Егор Андреев | Москва",
  description:
    "Миграционный юрист Андреев Егор Викторович. Снятие запрета на въезд в Россию, отмена депортации и выдворения, оформление РВП, ВНЖ и гражданства РФ.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-neutral-900 font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
