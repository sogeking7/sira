"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { NavItem } from "@/types";
import LocaleSwitcher from "./locale/LocaleSwitcher";

interface MobileSidebarProps {
  pathname: string;
  locale: string;
  links: NavItem[];
}

export const MobileSidebar = ({
  pathname,
  links,
  locale,
}: MobileSidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger>
        <Menu />
      </SheetTrigger>
      <SheetContent side="top">
        <SheetHeader>
          <Logo />
        </SheetHeader>
        <nav className="mb-6 mt-12">
          <ul className=" flex flex-col gap-6">
            {links.map((item) => (
              <li
                className={cn(
                  (pathname.split("/").includes(item.path) && item.path) ||
                    (item.path === "/" && pathname.split("/").length === 2)
                    ? "font-semibold"
                    : "font-regular",
                  "text-center",
                )}
                key={item.path}
              >
                <Link
                  locale={locale}
                  href={item.path}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex justify-center md:!hidden">
          <LocaleSwitcher />
        </div>
      </SheetContent>
    </Sheet>
  );
};
