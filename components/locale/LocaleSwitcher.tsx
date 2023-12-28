"use client";
import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTransition } from "react";
import { useRouter, usePathname } from "@/navigation";
import { locales } from "@/config";
import { useLocale } from "next-intl";

export default function LocaleSwitcherSelect() {
  const locale = useLocale();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  function onSelectChange(nextLocale: string) {
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  }

  return (
    <Select
      disabled={isPending}
      defaultValue={locale}
      onValueChange={(val) => onSelectChange(val)}
    >
      <SelectTrigger className="h-auto w-auto gap-2 px-2 py-1">
        <SelectValue placeholder="" />
      </SelectTrigger>
      <SelectContent className="min-w-min">
        <SelectGroup>
          {locales.map((locale) => (
            <SelectItem key={locale.value} value={locale.value}>
              {locale.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
