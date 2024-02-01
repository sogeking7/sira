"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Progress } from "../ui/progress";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CorrectMessage } from "./correct-message";
import { WrongMessage } from "./wrong-message";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useQuizStore } from "@/stores/quiz";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { Answer } from "@/types";
import { useUserStore } from "@/stores/user";
import { Results } from "./results";

interface Props {
  t: any;
}

export const Quiz = ({ t }: Props) => {
  const queryClient = useQueryClient();

  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [open, setIsOpen] = useState(false);
  const [status, setStatus] = useState<boolean | null>(null);
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);

  const { user, count, foo, initUser, setCount, incCount } = useUserStore();
  const {
    question,
    quizId,
    questions,
    initQuiz,
    addCollectedAnswer,
    nextQuestion,
    initQuestionIndex,
    setIsFinished,
  } = useQuizStore();

  const token = localStorage.getItem("Access_Token");
  const userId = user?.id;

  const { isLoading } = useQuery({
    queryKey: ["quiz", quizId],
    queryFn: () => axios.get(`/api/quiz/${quizId}`),
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    onSuccess: async ({ data }) => {
      initQuiz(data);
      nextQuestion();
    },
  });

  const { isLoading: userLoading } = useQuery({
    queryKey: ["user", token],
    queryFn: async () => await axios.post("/api/validate", { token }),
    onSuccess: ({ data }) => {
      initUser(data);
    },
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchIntervalInBackground: false,
    enabled: !!token,
  });

  const { isLoading: attemptLoading } = useQuery({
    queryKey: ["attempt", userId],
    queryFn: () => axios.get(`/api/attempt/${userId}/${quizId}`),
    onSuccess: ({ data }) => {
      setIsFinished(data.isFinished);
      initQuestionIndex(data.lastQuestionIndex);
      setCount(data.count);
      if (!foo) {
        nextQuestion();
      }
    },
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchIntervalInBackground: false,
    enabled: !!userId,
  });

  const getCorrectAnswer = async () => {
    if (!question || !selectedAnswer) return;
    let userStatus;
    if (userId) {
      try {
        const { status: statusCode } = await queryClient.fetchQuery({
          queryKey: ["proceed", userId],
          queryFn: async () =>
            await axios.post(`/api/proceed`, {
              userId,
              quizId,
              answerId: selectedAnswer.id,
              questionId: question.id,
            }),
        });
        userStatus = statusCode;
      } catch (error) {
        console.log(error);
      }
    }

    try {
      const { data } = await queryClient.fetchQuery({
        queryKey: ["proceed", question.id],
        queryFn: async () => await axios.get(`/api/proceed/${question.id}`),
      });
      const isCorrect = data.id === selectedAnswer.id;
      if (isCorrect) {
        if (userStatus) {
          incCount();
        }
        addCollectedAnswer(selectedAnswer);
      }
      setCorrectAnswer(data.title);
      setStatus(isCorrect);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading || !questions || attemptLoading || userLoading) {
    // if (isLoading || !questions) {
    return (
      <div className="flex w-full justify-center">
        <Loader className="animate-spin text-2xl text-primary" />
      </div>
    );
  }

  return (
    <div>
      {question && (
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-sm sm:text-base">
            <b>{question?.id} </b>
            из {questions?.length}
          </h1>
          <Progress
            value={(question?.id / questions?.length!) * 100}
            className="w-full"
          />
        </div>
      )}
      {status === null && question && (
        <div>
          <Image
            alt="quiz"
            src={question?.imageUrl}
            width="0"
            height="0"
            sizes="100vw"
            className="mt-6 h-auto w-full rounded-lg"
            quality={100}
          />
          <h1 className="mt-6 text-[20px] font-bold leading-[24px] sm:text-2xl sm:leading-[30px]">
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
                <Image
                  width={64}
                  height={64}
                  alt="question"
                  src="/icons/question.svg"
                />
                <DialogTitle>{t.confirm}</DialogTitle>
                <DialogDescription>{t.areYouSure}</DialogDescription>
              </DialogHeader>
              <div className="w-full rounded-md bg-gray-100  px-4 py-5 text-left transition-colors max-sm:text-sm">
                {selectedAnswer?.title}
              </div>
              <DialogFooter>
                <Button onClick={() => getCorrectAnswer()} className="w-full">
                  {t.answer}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      )}

      {status === null && !question && <Results t={t} count={count} />}

      {status === true && (
        <CorrectMessage
          t={t}
          setStatus={setStatus}
          selectAnswerTitle={selectedAnswer?.title!}
        />
      )}

      {status === false && (
        <WrongMessage
          t={t}
          setStatus={setStatus}
          selectAnswerTitle={selectedAnswer?.title!}
          correctTitle={correctAnswer!}
        />
      )}
    </div>
  );
};
