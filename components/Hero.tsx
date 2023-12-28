import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

export const Hero = () => {
  const t = useTranslations();
  return (
    <div className="m-container flex flex-col items-center gap-12 text-center leading-tight">
      <img src="/icons/moon.png" className="h-24 w-24" />
      <h1 className="text-2xl font-bold sm:text-[32px]">{t("hero.title")}</h1>
      <p className="text-base sm:text-2xl">{t("hero.description")}</p>
      <Button className="w-full sm:w-[312px]">{t("start")}</Button>
    </div>
  );
};
