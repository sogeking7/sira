import { Hero } from "@/components/Hero";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  params: { locale: string };
};

export default function HomePage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  return (
    <main className="my-20">
      <Hero />
    </main>
  );
}
