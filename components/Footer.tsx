import { useTranslations } from "next-intl";

export const Footer = () => {
  const t = useTranslations();
  return (
    <footer className="absolute bottom-0 h-[72px] w-full sm:h-[80px]">
      <div className="container mx-auto flex h-full items-center justify-center">
        <p className="text-sm">© 2023 SIRA. {t("allRightsReserved")}</p>
      </div>
    </footer>
  );
};
