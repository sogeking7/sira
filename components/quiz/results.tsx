import { Button } from "../ui/button";
import { DonateButton } from "../donate-btn";
import Link from "next/link";
import Image from "next/image";

interface Props {
  t: any;
  count: number;
}

export const Results = ({ t, count }: Props) => {
  return (
    <div className="mb-[200px] mt-12">
      <div className="flex flex-col items-center text-center">
        <Image
          quality={100}
          alt="firework"
          src="/icons/firework.png"
          width={96}
          height={96}
          className="md:scale-x-[-1]"
        />
        <h1 className="mt-2 text-[64px] font-bold text-primary">{count}</h1>
        <h1 className="mt-2 text-2xl font-bold leading-[30px] sm:text-[32px] sm:leading-[38px]">
          {t.congratulations}
        </h1>
        <p className="mt-6 text-base leading-[20px] sm:text-2xl sm:leading-[30px] md:mt-8">
          {t.desc1}
        </p>
        <p className="mt-4 text-base leading-[20px] sm:text-2xl sm:leading-[30px] md:mt-8">
          {t.desc2}
        </p>
        <div className="mt-12 w-full space-y-4">
          <DonateButton text={t.kaspi} />
          <Link href="/">
            <Button variant="outline" className="mt-3 w-full">
              {t.goHome}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
