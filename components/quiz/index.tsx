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
import { cn, scrollToTop } from "@/lib/utils";
import { CorrectMessage } from "./correct-message";
import { WrongMessage } from "./wrong-message";
import { useQueryClient } from "react-query";
import { useQuizStore } from "@/stores/quiz";
import { Loader } from "lucide-react";
import { Button } from "../ui/button";
import { Answer } from "@/types";
import { useUserStore } from "@/stores/user";
import { Results } from "./results";
import { useAccessToken } from "@/hooks/use-access-token";
import { useValidateUser } from "@/hooks/use-validate-user";
import { useQuiz } from "@/hooks/use-quiz";
import { useAttempt } from "@/hooks/use-attempt";

interface Props {
  t: any;
}

export const Quiz = ({ t }: Props) => {
  const token = useAccessToken();

  const queryClient = useQueryClient();

  const [selectedAnswer, setSelectedAnswer] = useState<Answer | null>(null);
  const [open, setIsOpen] = useState(false);
  const [status, setStatus] = useState<"correct" | "incorrect" | "end" | null>(
    null,
  );
  const [correctAnswer, setCorrectAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { id: userId, ...user } = useUserStore();
  const { id: quizId, questions, question, ...quiz } = useQuizStore();

  const { isLoading: quizLoading } = useQuiz({
    quiz_id: quizId,
    onSuccess: (data) => {
      quiz.initQuiz(data);
      quiz.resetQuestion();
    },
  });
  const { isLoading: userLoading } = useValidateUser(token);
  const { isLoading: attemptLoading } = useAttempt({
    user_id: userId,
    quiz_id: quizId,
    onSuccess: (data) => {
      quiz.setIsFinished(data.isFinished);
      if (!data.isFinished) {
        quiz.initQuestionIndex(data.lastQuestionIndex);
      } else {
        quiz.resetQuestion();
      }
      user.setCount(data.count);
      if (!user.foo) {
        // quiz.nextQuestion();
        console.log("FOO");
      }
    },
  });

  const handleClickAnswer = async () => {
    if (!question || !selectedAnswer) return;
    setLoading(true);

    let saveAnswerStatus;

    console.log("userId", userId);
    quiz.addCollectedAnswer(selectedAnswer);

    if (userId) {
      try {
        const { status } = await queryClient.fetchQuery({
          queryKey: ["proceed", userId],
          queryFn: () =>
            user.fetchSaveAnswer(
              userId,
              quizId,
              selectedAnswer.id,
              question!.id,
            ),
        });
        saveAnswerStatus = status;
      } catch (err) {
        console.error(err);
      }
    }

    const data = await queryClient.fetchQuery({
      queryKey: ["proceed", question?.id],
      queryFn: () => quiz.fetchGetCorrectAnswer(question!.id),
    });

    const isCorrect = data.id === selectedAnswer.id;

    if (isCorrect) {
      if (userId && saveAnswerStatus) {
        user.incCount();
      }
      quiz.incQuizCount();
    }

    if (!userId) {
      quiz.nextQuestion();
    }
    setCorrectAnswer(data.title);
    setStatus(isCorrect ? "correct" : "incorrect");
    setIsOpen(false);
    scrollToTop();
    setLoading(false);
  };

  if (quizLoading || !questions || userLoading || attemptLoading) {
    return (
      <div className="flex w-full justify-center">
        <Loader className="animate-spin text-2xl text-primary" />
      </div>
    );
  }

  return (
    <div>
      {status === null && question && (
        <>
          <div className="flex flex-col items-center gap-3">
            <h1 className="text-sm sm:text-base">
              <b>{question.id} </b>
              из {questions.length}
            </h1>
            <Progress
              value={(question.id / questions.length) * 100}
              className="w-full"
            />
          </div>
          <div>
            <Image
              alt="quiz"
              src={question.imageUrl}
              width="0"
              height="0"
              sizes="100vw"
              className="mt-6 h-auto w-full rounded-lg"
              quality={100}
            />
            <h1 className="mt-6 text-[20px] font-bold leading-[24px] sm:text-2xl sm:leading-[30px]">
              {question.title}
            </h1>
            <div className="mt-6 flex flex-col gap-2">
              {question.answers.map((answer) => {
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
                  {loading ? (
                    <div className="flex w-full justify-center">
                      <Loader className="animate-spin text-2xl text-primary" />
                    </div>
                  ) : (
                    <Button onClick={handleClickAnswer} className="w-full">
                      {t.answer}
                    </Button>
                  )}
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </>
      )}

      {status === "end" && !question && (
        <Results
          t={t}
          count={
            quiz.count !== user.count && quiz.isQuizEnded !== false
              ? quiz.count
              : user.count
          }
        />
      )}

      {status === "correct" && (
        <CorrectMessage
          t={t}
          setStatus={setStatus}
          selectAnswerTitle={selectedAnswer?.title!}
        />
      )}

      {status === "incorrect" && (
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
