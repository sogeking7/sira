import { DonateButton } from "@/components/donate-btn";
import { useTranslations } from "next-intl";

export default function DonatePage() {
  const t = useTranslations("donate");
  return (
    <main className="m-container mb-20 mt-6">
      <div className="flex w-full flex-col items-center">
        <div>
          <h1 className="text-2xl font-bold leading-[30px] sm:text-[32px] sm:leading-[38px]">
            {t("title")}
          </h1>
          <p className="mt-6 leading-[20px]  sm:text-2xl sm:leading-[30px]">
            {t("description")}
          </p>
        </div>
        <DonateButton text={t("kaspi")} />
      </div>
    </main>
  );
}
