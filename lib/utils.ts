import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const formatPhoneNumber = (phoneNumber: string): string => {
  return phoneNumber
    .replace(/\D/g, "")
    .replace(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/, "+$1 ($2)-$3-$4-$5");
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "auto",
  });
};
