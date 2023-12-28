"use client";
import Link from "next/link";
import { Logo } from "./Logo";
import { PriceCounter } from "./PriceCounter";
import { usePathname } from "next/navigation";

export const Header = () => {
  const pathname = usePathname();
  const links = [
    {
      label: "Главная",
      path: "/",
    },
    {
      label: "Пожертвование",
      path: "/donate",
    },
    {
      label: "Настройки",
      path: "/settings",
    },
  ];

  return (
    <header className="h-[72px] sm:h-[80px]">
      <div className="container mx-auto flex h-full items-center justify-between">
        <Logo />
        <ul className="flex gap-10">
          <PriceCounter />
          {links.map((item) => (
            <li
              className={`${
                pathname === item.path ? "font-semibold" : "font-regular"
              }`}
              key={item.path}
            >
              <Link href={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
};
