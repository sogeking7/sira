import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";

export const DonateButton = ({ text }: { text: string }) => {
  return (
    <Link
      className="mt-12 w-full rounded-md"
      href="https://kaspi.kz/pay/ASARUME"
    >
      <Button className="w-full" variant="kaspi">
        <Image
          alt="kaspi"
          width={24}
          height={24}
          src="/icons/kaspi.svg"
          className="mr-2 inline"
        />
        {text}
      </Button>
    </Link>
  );
};
