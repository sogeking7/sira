"use client";

import { Button } from "../ui/button";
import { useRouter } from "@/navigation";
import { useQuery } from "react-query";
import axios from "axios";
import { useQuizStore } from "@/hooks/quiz";
import { useUserStore } from "@/hooks/user";
import { usePrizeStore } from "@/hooks/prize";

interface Props {
  title: string;
  correctTitle: string;
  setStatus: (value: boolean | null) => void;
  refetch: () => void;
}

export const WrongMessage = ({ title, correctTitle, setStatus, refetch }: Props) => {
  const router = useRouter();
  const { user } = useUserStore();
  const { set } = usePrizeStore();
  const { initQuiz, isLastQuestion, correctAnswersCount } = useQuizStore();

  const handleNextQuestion = () => {
    refetch();
    setStatus(null);
  };
  return (
    <div className="mb-[200px] mt-12">
      <div className="flex flex-col items-center">
        <img src="/icons/times-round.svg" />
        <h1 className="mt-12 text-[20px] font-bold leading-tight sm:text-2xl">
          Какой из ниже перечисленных ответов правильный?
        </h1>
        <div className="mt-6 w-full rounded-md bg-[#FCECEC] px-3 py-6 text-left transition-colors max-sm:text-sm">
          {title}
        </div>
        <div className="mt-3 w-full rounded-md bg-primary/[12%] px-3 py-6 text-left transition-colors max-sm:text-sm">
          {correctTitle}
        </div>
        <Button className="mt-3 w-full" onClick={handleNextQuestion}>
          {isLastQuestion ? "Завершить" : "Следующий вопрос"}
        </Button>
      </div>
    </div>
  );
};
