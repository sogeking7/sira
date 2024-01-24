"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CorrectMessage } from "./correct-message";
import { WrongMessage } from "./wrong-message";
import { useQuery } from "react-query";
import axios from "axios";
import { useQuizStore } from "@/hooks/quiz";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { Answer } from "@/types";
import { useUserStore } from "@/hooks/user";
import { Results } from "./results";

interface Props {
  t: any;
}

export const Quiz = ({ t }: Props) => {
  const { user, setUser } = useUserStore();
  const {
    initQuiz,
    question,
    correctAnswersCount,
    isLastQuestion,
    questionnaire,
    questionnaireId,
  } = useQuizStore();

  const { data, isLoading, isFetching, refetch } = useQuery(
    "questionnaire",
    () =>
      axios.post("/api/quiz", {
        userId: user?.id,
        questionnaireId,
      }),
    {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      // refetchOnMount: false,
      onSuccess: (data) => {
        initQuiz(data.data);
      },
    },
  );

  const [progress, setProgress] = useState<number | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [open, setIsOpen] = useState(false);
  const [status, setStatus] = useState<boolean | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const token = localStorage.getItem("Access_Token");
      if (token) {
        setUser(token);
      }
    }
  }, []);

  const getCorrectAnswer = async () => {
    if (!questionnaire || !question || !selectedAnswer || !user) return;
    await axios
      .post("/api/proceed", {
        questionnaireId: questionnaire?.id,
        questionId: question?.id,
        answerId: selectedAnswer?.id,
        userId: user?.id,
      })
      .then(({ data }) => {
        setCorrectAnswer(data.correctAnswer.title);
        setStatus(data.isCorrect);

        setIsOpen(false);
      });
  };

  if (isLoading || isFetching) {
    return (
      <div className="flex w-full justify-center">
        <Loader className="animate-spin text-2xl text-primary" />
      </div>
    );
  }

  return (
    <div>
      {status === null && question && (
        <div>
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-sm sm:text-base">
              <b>{question?.id} </b>
              из {questionnaire?.questions.length}
            </h1>

            <Progress
              value={(question?.id / questionnaire?.questions.length) * 100}
              className="w-full"
            />
          </div>
          <Image
            src={`/quiz/${question?.id}.png`}
            alt="image"
            width={612}
            height={360}
            sizes="100vw"
            style={{
              width: "100%",
              height: "auto",
            }}
            className="mt-6 rounded-lg"
            quality={100}
          />
          <h1 className="mt-6 text-[20px] font-bold leading-tight sm:text-2xl">
            {question?.title}
          </h1>
          <div className="mt-6 flex flex-col gap-2">
            {question?.answers.map((answer) => {
              return (
                <button
                  onClick={() => {
                    setSelectedAnswer({ ...answer });
                    setIsOpen(true);
                  }}
                  className={cn(
                    selectedAnswer?.id === answer.id
                      ? "bg-gray-300  text-black"
                      : "bg-gray-100 text-black",
                    "w-full rounded-md px-3 py-4 text-left transition-colors hover:bg-gray-200 max-sm:text-sm",
                  )}
                  key={answer.id}
                >
                  {answer.title}
                </button>
              );
            })}
          </div>
          <Dialog open={open} onOpenChange={setIsOpen} defaultOpen={false}>
            <DialogContent className="sm:max-w-[312px]">
              <DialogHeader className="items-center">
                <img src="/icons/question.svg" />
                <DialogTitle>Подтвердите ваш выбор</DialogTitle>
                <DialogDescription>
                  Вы уверены что хотите выбрать этот вариант?
                </DialogDescription>
              </DialogHeader>
              <div className="w-full rounded-md bg-gray-100  px-4 py-5 text-left transition-colors max-sm:text-sm">
                {selectedAnswer?.title}
              </div>
              <DialogFooter>
                <Button onClick={() => getCorrectAnswer()} className="w-full">
                  Ответить
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}
      {!question && status === null && <Results />}

      {status === true && (
        <CorrectMessage
          refetch={refetch}
          setStatus={setStatus}
          title={selectedAnswer?.title!}
        />
      )}
      {status === false && (
        <WrongMessage
          refetch={refetch}
          setStatus={setStatus}
          title={selectedAnswer?.title!}
          correctTitle={correctAnswer!}
        />
      )}
    </div>
  );
};
