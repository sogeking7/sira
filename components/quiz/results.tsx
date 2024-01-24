"use client";

import { Button } from "../ui/button";
import { useUserStore } from "@/hooks/user";
import { DonateButton } from "../DonateButton";
import Link from "next/link";
import { useQuizStore } from "@/hooks/quiz";

interface Props {}

export const Results = ({}: Props) => {
  const { correctAnswersCount } = useQuizStore();

  return (
    <div className="mb-[200px] mt-12">
      <div className="flex flex-col items-center">
        <img src="/icons/firework.png" className="h-24 w-24 scale-x-[-1]" />
        <h1 className="mt-2 text-[64px] font-bold text-primary">
          {correctAnswersCount}
        </h1>
        <h1 className="mt-2  text-center text-2xl font-bold leading-tight sm:text-[32px]">
          Поздравляем, вы завершили викторину
        </h1>
        <p className="mt-6 w-full text-center text-2xl">
          Теперь вы узнали чуточку больше о жизни нашего Пророка Мухаммада (мир
          ему и благословение Аллаха).
        </p>
        <p className="mt-6 w-full text-center text-2xl">
          Если вам понравилась викторина, вы можете пожертвовать собственные
          средства на то чтобы и другие люди могли узнать больше о жизни нашего
          пророка Мухаммада (мир ему и благословение Аллаха). Ваши денежные
          средства пойдут на формирование призового фонда.
        </p>
        <div className="mt-12 w-full space-y-4">
          <DonateButton text={"Пожертвовать через Kaspi"} />
          <Link href="/">
            <Button variant="outline" className="mt-3 w-full">
              {"На главную"}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
