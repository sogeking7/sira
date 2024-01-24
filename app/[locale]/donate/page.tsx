import { DonateButton } from "@/components/DonateButton";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  params: { locale: string };
};

export default function DonatePage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();
  return (
    <main className="m-container mb-20 mt-6">
      <div className="flex flex-col w-full items-center">
        <div>
          <h1 className="text-2xl font-bold sm:text-[32px]">
            {t("donate.title")}
          </h1>
          <p className="mt-6 sm:text-2xl">{t("donate.description")}</p>
        </div>
        <DonateButton text={t("donateKaspi")} />
      </div>
    </main>
  );
}
