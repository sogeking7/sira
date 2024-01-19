"use client";
// import { useQuizStore } from "@/hooks/quiz";
import { Button } from "../ui/button";
import { useRouter } from "@/navigation";
import { usePrizeStore } from "@/hooks/prize";

interface Props {
  title: string;
  correctTitle: string;
  setStatus: (value: boolean | null) => void;
  setProgress: any;
}

export const WrongMessage = ({
  title,
  correctTitle,
  setStatus,
  setProgress,
}: Props) => {
  const router = useRouter();
  // const { index, nextQuestion, maxQuestionsNumber } = useQuizStore();
  const { setPrizeStatus } = usePrizeStore();

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
          {/* {index !== maxQuestionsNumber - 1 ? "Следующий вопрос" : "Завершить"} */}
        </Button>
      </div>
    </div>
  );
};
