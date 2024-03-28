import { Hero } from "@/components/hero";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("hero");

  return (
    <main className="m-container mt-6">
      <Hero
        t={{
          title: t("title"),
          description: t("description"),
          start: t("start"),
        }}
      />
    </main>
  );
}
