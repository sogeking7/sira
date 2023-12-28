import { Pathnames } from "next-intl/navigation";

export const locales = [
  {
    value: "kz",
    label: "KAZ",
  },
  {
    value: "ru",
    label: "RUS",
  },
  {
    value: "en",
    label: "ENG",
  },
] as const;

// Use the default: `always`
export const localePrefix = undefined;

export const localesArray = locales.map(({value}) => value)

export const pathnames = {
  '/': '/',
} satisfies Pathnames<typeof localesArray >;

export type AppPathnames = keyof typeof pathnames;
