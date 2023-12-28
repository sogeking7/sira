import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  params: { locale: string };
};

export default function SettingsPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("settings");
  return (
    <main className="m-container mb-20 mt-6">
      <div>
        <div>
          <h1 className="text-2xl font-bold sm:text-[32px]">{t("title")}</h1>
          <p className="mt-6 sm:text-2xl">{t("desc1")}</p>
          <p className="mt-6 sm:text-2xl">{t("desc2")}</p>
        </div>
        <Input className="mt-6" placeholder={t("input")} />
      </div>
    </main>
  );
}
