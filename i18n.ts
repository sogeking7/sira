import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "./config";

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.find((l) => l.value === locale)) {
    return notFound();
  }

  return {
    messages:
      locale === "ru"
        ? (await import("./messages")).messages.ru
        : locale === "kz"
          ? (await import("./messages")).messages.kz
          : (await import("./messages")).messages.en,
  };
});
