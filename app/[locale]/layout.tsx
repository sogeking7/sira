import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Providers from "@/lib/provider";
import { NavigationEvents } from "@/components/navigation-events";
import { Suspense } from "react";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Sira",
};

export default function LocaleLayout({ children }: Props) {
  return (
    <html>
      <body>
        <Providers>
          <div className="relative min-h-screen bg-background pb-[72px] antialiased sm:pb-[80px]">
            <Header />
            {children}
            <Suspense fallback={null}>
              <NavigationEvents />
            </Suspense>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
