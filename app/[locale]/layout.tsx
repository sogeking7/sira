import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { cn } from "@/lib/utils";
import { Inter as FontSans } from "next/font/google";
import { localesArray } from "@/config";
import { unstable_setRequestLocale } from "next-intl/server";
import { NavItem } from "@/types";
import { useTranslations } from "next-intl";
import Providers from "@/lib/provider";
import { useQuery } from "react-query";
import axios from "axios";

// export const fontSans = FontSans({
//   subsets: ["latin"],
//   variable: "--font-sans",
// });

// export const metadata: Metadata = {
//   title: "Sira",
//   description: "Generated by create next app",
// };

interface Props {
  children: React.ReactNode;
  params: { locale: "kz" | "ru" | "en" };
}

export const generateStaticParams = () => localesArray;

export default function LocaleLayout({ children, params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();
  const links: NavItem[] = [
    {
      label: t("nav.main"),
      path: "/",
    },
    {
      label: t("nav.donate"),
      path: "donate",
    },
    {
      label: t("nav.settings"),
      path: "settings",
    },
  ];

  return (
    <html>
      <body>
        <Providers>
          <div className="relative min-h-screen bg-background pb-[72px]  antialiased sm:pb-[80px]">
            <Header links={links} locale={locale} />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
