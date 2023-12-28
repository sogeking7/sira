import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  params: { locale: string };
};

export default function DonatePage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();
  return (
    <main className="m-container mt-6 mb-20">
      <div className="flex flex-col items-center">
        <div>
          <h1 className="text-2xl font-bold sm:text-[32px]">
            {t("donate.title")}
          </h1>
          <p className="mt-6 sm:text-2xl">{t("donate.description")}</p>
        </div>
        <Button className="mx-auto mt-12 w-full sm:w-1/2" variant="kaspi">
          <img src="/icons/kaspi.svg" className="mr-2 inline" />
          Пожертвовать через Kaspi
        </Button>
      </div>
    </main>
  );
}
