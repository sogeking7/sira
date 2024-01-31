"use client";

import { Button } from "../ui/button";
import { useQuizStore } from "@/stores/quiz";
import { useUserStore } from "@/stores/user";
import Image from "next/image";

interface Props {
  t: any;
  selectAnswerTitle: string;
  correctTitle: string;
  setStatus: (value: boolean | null) => void;
}

export const WrongMessage = ({
  t,
  selectAnswerTitle,
  correctTitle,
  setStatus,
}: Props) => {
  const { isLastQuestion, nextQuestion } = useQuizStore();

  const handleNextQuestion = () => {
    nextQuestion();
    setStatus(null);
  };
  return (
    <div className="mb-[200px] mt-12">
      <div className="flex flex-col items-center">
        <Image
          width={64}
          height={64}
          alt="times-round"
          src="/icons/times-round.svg"
        />
        <h1 className="mt-12 text-[20px] font-bold leading-tight sm:text-2xl">
          {t.whichIsBelowCorrect}
        </h1>
        <div className="mt-6 w-full rounded-md bg-[#FCECEC] px-3 py-6 text-left transition-colors max-sm:text-sm">
          {selectAnswerTitle}
        </div>
        <div className="mt-3 w-full rounded-md bg-primary/[12%] px-3 py-6 text-left transition-colors max-sm:text-sm">
          {correctTitle}
        </div>
        <Button className="mt-12 w-full" onClick={handleNextQuestion}>
          {isLastQuestion ? t.finish : t.nextQuestion}
        </Button>
      </div>
    </div>
  );
};
