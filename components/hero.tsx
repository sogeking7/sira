import { useTranslations } from "next-intl";
import Image from "next/image";
import { PlayBtn } from "./play-btn";

export const Hero = () => {
  const t = useTranslations("hero");
  return (
    <div className="w-full flex flex-col items-center gap-12 text-center leading-tight">
      <Image
        alt="moon"
        src="/icons/moon.svg"
        width={96}
        height={96}
        className="scale-x-[-1]"
      />
      <div>
        <h1 className="text-2xl font-bold leading-[30px] sm:text-[32px] sm:leading-[38px]">
          {t("title")}
        </h1>
        <p className="mt-4 text-base leading-[20px]  sm:text-2xl sm:leading-[30px] md:mt-6">
          {t("description")}
        </p>
      </div>
      <PlayBtn
        t={{
          start: t("start"),
          youPassed: t("youPassed"),
          youPassedDesc: t("youPassedDesc"),
          ok: t("ok"),
        }}
      />
    </div>
  );
};
