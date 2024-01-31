import { useTranslations } from "next-intl";
import { ChangePhoneNumber } from "@/components/change-phone-number";
import { PhoneBtn } from "@/components/change-phone-number/phone-btn";

export default function SettingsPage() {
  const t = useTranslations("settings");

  return (
    <main className="m-container mb-20 mt-6">
      <div>
        <h1 className="text-2xl font-bold leading-[30px] sm:text-[32px] sm:leading-[38px]">
          {t("title")}
        </h1>
        <p className="mt-6 leading-[20px]  sm:text-2xl sm:leading-[30px]">
          {t("desc1")}
        </p>
        <p className="my-6 leading-[20px]  sm:text-2xl sm:leading-[30px]">
          {t("desc2")}
        </p>
        <ChangePhoneNumber
          fromQuiz={false}
          imgSrc="/icons/phone.svg"
          t={{
            change: t("change"),
            send: t("send"),
            phoneNumber: t("phoneNumber"),
            inputPhone: t("inputPhone"),
            saved: t("saved"),
            close: t("close"),
          }}
        >
          <PhoneBtn text={t("input")} />
        </ChangePhoneNumber>
      </div>
    </main>
  );
}
