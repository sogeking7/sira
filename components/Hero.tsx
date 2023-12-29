import { Link } from "@/navigation";
import { Button } from "./ui/button";
import { useTranslations } from "next-intl";

export const Hero = () => {
  const t = useTranslations();
  return (
    <div className="m-container flex flex-col items-center gap-12 text-center leading-tight">
      <img src="/icons/moon.svg" className="scale-x-[-1]" />
      <h1 className="text-2xl font-bold sm:text-[32px]">{t("hero.title")}</h1>
      <p className="text-base sm:text-2xl">{t("hero.description")}</p>
      <Link href="/quiz" className="w-full rounded-md sm:w-[312px]">
        <Button className="w-full">{t("start")}</Button>
      </Link>
    </div>
  );
};
