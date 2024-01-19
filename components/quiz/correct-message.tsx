"use client";

// import { useQuizStore } from "@/hooks/quiz";
import { Button } from "../ui/button";
import { useRouter } from "@/navigation";
import { usePrizeStore } from "@/hooks/prize";

interface Props {
  title: string;
  setStatus: (value: boolean | null) => void;
  setProgress: any;
}

export const CorrectMessage = ({ title, setStatus, setProgress }: Props) => {
  const router = useRouter();
  // const { index, nextQuestion, maxQuestionsNumber } = useQuizStore();
  const { inc, currentQuestionPrizeStatus, setPrizeStatus } = usePrizeStore();
  const handleNextQuestion = () => {
    // if (index === maxQuestionsNumber - 1) {
    //   router.push("/");
    //   return;
    // }
    // nextQuestion();
    setPrizeStatus("pending");
    // @ts-ignore
    setProgress((value) => value + 100 / maxQuestionsNumber);
    setStatus(null);
  };

  const handlePrize = () => {
    inc();
    setPrizeStatus("pending");
  };

  return (
    <div className="mb-[200px] mt-12">
      <div className="flex flex-col items-center">
        <img src="/icons/tick-round.svg" />
        <h1 className="mt-12 text-center text-[20px] font-bold leading-tight sm:text-2xl">
          Какой из ниже перечисленных ответов правильный?
        </h1>
        <div className="max-sm:text-sm mt-6 w-full rounded-md bg-primary/[12%] px-3 py-6 text-left transition-colors">
          {title}
        </div>
        {currentQuestionPrizeStatus === "gifted" && (
          <Button className="mt-12 w-full" onClick={handlePrize}>
            Получить подарок
          </Button>
        )}
        <Button
          className="mt-3 w-full"
          onClick={handleNextQuestion}
          variant="outline"
        >
          {/* {index !== maxQuestionsNumber - 1 ? "Следующий вопрос" : "Завершить"} */}
        </Button>
      </div>
    </div>
  );
};
