"use client";

import { Link } from "@/navigation";
import { Logo } from "./Logo";
import { PriceCounter } from "./PriceCounter";
import { usePathname } from "next/navigation";
import { MobileSidebar } from "./mobile-sidebar";
import { NavItem } from "@/types";
import { cn } from "@/lib/utils";
import LocaleSwitcher from "./locale/LocaleSwitcher";

interface Props {
  links: NavItem[];
  locale: "kz" | "ru" | "en";
}

export const Header = ({ links, locale }: Props) => {
  const pathname = usePathname();

  return (
    <header className="h-[72px] sm:h-[80px]">
      <div className="container mx-auto flex h-full items-center justify-between">
        <Logo />
        <div className="flex items-center gap-6 md:gap-10">
          <PriceCounter />
          <nav className="max-md:!hidden">
            <ul className="flex items-center gap-10">
              {links.map((item) => (
                <li
                  className={cn(
                    (pathname.split("/").includes(item.path) && item.path) ||
                      (item.path === "/" && pathname.split("/").length === 2)
                      ? "font-semibold"
                      : "font-regular",
                  )}
                  key={item.path}
                >
                  <Link
                    // @ts-ignore
                    href={item.path === "/" ? "/" : `/${item.path}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="h-6 md:!hidden">
            <MobileSidebar locale={locale} pathname={pathname} links={links} />
          </div>
          <div className="max-md:!hidden">
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};
