"use client";

import { Button } from "../ui/button";
import { useQuizStore } from "@/stores/quiz";
import Image from "next/image";
import { SetPhoneNumber } from "../set-phone-number";
import { useUserStore } from "@/stores/user";

interface Props {
  t: any;
  selectAnswerTitle: string;
}

export const CorrectMessage = ({ t, selectAnswerTitle }: Props) => {
  const quiz = useQuizStore();
  const { id: userId } = useUserStore();

  const handleNextQuestion = () => {
    quiz.nextQuestion();
    if (quiz.isLastQuestion) {
      quiz.setStatus("end");
      return;
    }
    quiz.setStatus(null);
  };

  return (
    <div className="mb-[200px] mt-12">
      <div className="flex flex-col items-center">
        <Image
          width={64}
          height={64}
          alt="tick-round"
          src="/icons/tick-round.svg"
        />
        <h1 className="mt-12 text-center text-[20px] font-bold leading-[25px] sm:text-2xl sm:leading-[30px]">
          {t.whichIsBelowCorrect}
        </h1>
        <div className="mt-6 w-full rounded-md bg-primary/[12%] px-3 py-6 text-left transition-colors max-sm:text-sm">
          {selectAnswerTitle}
        </div>
        <div className="mt-12 flex w-full flex-col gap-3">
          <SetPhoneNumber imgSrc="/icons/prize.svg" t={t} />
          <Button
            className="w-full"
            onClick={handleNextQuestion}
            variant={userId ? "default" : "outline"}
          >
            {quiz.isLastQuestion ? t.finish : t.nextQuestion}
          </Button>
        </div>
      </div>
    </div>
  );
};
