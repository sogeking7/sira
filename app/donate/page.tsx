import { Hero } from "@/components/Hero";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="m-container mt-6">
      <div className="flex-col flex items-center">
        <div>
          <h1 className="text-2xl font-bold sm:text-[32px]">Пожертвование</h1>
          <p className="mt-6 sm:text-2xl">
            Вы можете пожертвовать собственные средства на то чтобы и другие
            люди могли узнать больше о жизни нашего пророка Мухаммада (мир ему и
            благословение Аллаха). Ваши денежные средства пойдут на формирование
            призового фонда.
          </p>
        </div>
        <Button className="mx-auto mt-12 w-full sm:w-1/2" variant="kaspi">
          <img src="icons/kaspi.svg" className="inline mr-2" />Пожертвовать через Kaspi
        </Button>
      </div>
    </main>
  );
}
