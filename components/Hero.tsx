import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export const Hero = () => {
  return (
    <div className="m-container flex flex-col items-center gap-12 text-center leading-tight">
      <img src="/icons/moon.png" className="h-24 w-24" />
      <h1 className="text-2xl font-bold sm:text-[32px]">
        Знаете ли вы историю жизни пророка Мухаммада (мир ему и благословение
        Аллаха)?
      </h1>
      <p className="text-base sm:text-2xl">
        Предлагаем вашему вниманию небольшую подборку в формате «вопрос-ответ» о
        Пророке Мухаммаде (мир ему и благословение Аллаха). За каждый правильный
        ответ вы будите получать призы
      </p>
      <Button className="w-[312px]">Начать</Button>
    </div>
  );
};
