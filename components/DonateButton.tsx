"use client";

import Link from "next/link";
import { Button } from "./ui/button";

export const DonateButton = ({ text }: { text: string }) => {
  return (
    <Link
      className="mt-12 w-full rounded-md max-sm:w-1/2"
      href="https://kaspi.kz/pay/ASARUME"
    >
      <Button className="w-full" variant="kaspi">
        <img src="/icons/kaspi.svg" className="mr-2 inline" />
        {text}
      </Button>
    </Link>
  );
};
