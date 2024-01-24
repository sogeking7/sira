"use client";

import { Button } from "../ui/button";
import { useRouter } from "@/navigation";
import { usePrizeStore } from "@/hooks/prize";
import { useQuizStore } from "@/hooks/quiz";
import { useUserStore } from "@/hooks/user";
import axios from "axios";
import { useQuery } from "react-query";
import { useState } from "react";

interface Props {
  title: string;
  setStatus: (value: boolean | null) => void;
  refetch: () => void;
}

export const CorrectMessage = ({ title, setStatus, refetch }: Props) => {
  const router = useRouter();
  const { inc, set } = usePrizeStore();

  const { user } = useUserStore();
  const { initQuiz, correctAnswersCount, isLastQuestion, questionnaireId } =
    useQuizStore();
  const [prizeBtnClicked, setPrizeBtnClicked] = useState(false);

  const handleNextQuestion = () => {
    refetch();
    setStatus(null);
  };

  const handlePrize = () => {
    setPrizeBtnClicked(true);
    inc();
  };

  return (
    <div className="mb-[200px] mt-12">
      <div className="flex flex-col items-center">
        <img src="/icons/tick-round.svg" />
        <h1 className="mt-12 text-center text-[20px] font-bold leading-tight sm:text-2xl">
          Какой из ниже перечисленных ответов правильный?
        </h1>
        <div className="mt-6 w-full rounded-md bg-primary/[12%] px-3 py-6 text-left transition-colors max-sm:text-sm">
          {title}
        </div>
        <Button className="mt-12 w-full" onClick={handlePrize}>
          Получить подарок
        </Button>
        {prizeBtnClicked && (
          <Button
            className="mt-3 w-full"
            onClick={handleNextQuestion}
            variant="outline"
          >
            {isLastQuestion ? "Завершить" : "Следующий вопрос"}
          </Button>
        )}
      </div>
    </div>
  );
};
