import { Logo } from "../logo";
import { PrizeCounter } from "../prize-counter";
import { MobileSidebar } from "./mobile-sidebar";
import LocaleSwitcher from "../locale-switcher";
import { useTranslations } from "next-intl";
import { NavItem } from "@/types";
import { Navigations } from "./navigations";
import { useQuizStore } from "@/stores/quiz";

export const Header = () => {
  const t = useTranslations("nav");

  const links: NavItem[] = [
    {
      label: t("main"),
      path: "/",
    },
    {
      label: t("donate"),
      path: "donate",
    },
    {
      label: t("settings"),
      path: "settings",
    },
  ];

  return (
    <header className="h-[72px] sm:h-[80px]">
      <div className="container mx-auto flex h-full items-center justify-between">
        <Logo />
        <div className="flex items-center gap-6 md:gap-10">
          <PrizeCounter />
          <div className="max-md:!hidden">
            <Navigations links={links} />
          </div>
          <div className="md:!hidden">
            <MobileSidebar links={links} />
          </div>
          <div className="max-md:!hidden">
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};
