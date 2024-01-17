import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { ChangePassword } from "../../../components/change-password";
import UserList from "@/components/UserList";

type Props = {
  params: { locale: string };
};

export default function SettingsPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);
  const t = useTranslations();

  return (
    <main className="m-container mb-20 mt-6">
      <div>
        <div>
          <h1 className="text-2xl font-bold sm:text-[32px]">
            {t("settings.title")}
          </h1>
          <p className="mt-6 sm:text-2xl">{t("settings.desc1")}</p>
          <p className="mt-6 sm:text-2xl">{t("settings.desc2")}</p>
        </div>
        <ChangePassword
          t={{
            input: t("settings.input"),
            change: t("change"),
            phoneNumber: t("settings.phoneNumber"),
            inputPhone: t("settings.inputPhone"),
          }}
        />
        <UserList />
      </div>
    </main>
  );
}
