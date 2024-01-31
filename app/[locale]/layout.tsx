import type { Metadata } from "next";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import Providers from "@/lib/provider";

interface Props {
  children: React.ReactNode;
}

export default function LocaleLayout({ children }: Props) {
  return (
    <html>
      <body>
        <Providers>
          <div className="relative min-h-screen bg-background pb-[72px] antialiased sm:pb-[80px]">
            <Header />
            {children}
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
