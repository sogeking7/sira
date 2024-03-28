"use client";

import { useUserStore } from "@/stores/user";
import { useQuizStore } from "@/stores/quiz";
import Image from "next/image";
import { useAccessToken } from "@/hooks/use-access-token";
import { useValidateUser } from "@/hooks/use-validate-user";
import { useQuiz } from "@/hooks/use-quiz";
import { useAttempt } from "@/hooks/use-attempt";

export const PrizeCounter = () => {
  const token = useAccessToken();

  const { id: userId, ...user } = useUserStore();
  const { id: quizId, ...quiz } = useQuizStore();

  useValidateUser(token);
  useQuiz({
    quiz_id: quizId,
    onSuccess: (data) => {
      quiz.initQuiz(data);
      if (!userId || !token) {
        quiz.resetQuestion();
      }
    },
  });
  useAttempt({
    user_id: userId,
    quiz_id: quizId,
    onSuccess: (data) => {
      quiz.setIsFinished(data.isFinished);
      quiz.initQuestionIndex(data.lastQuestionIndex);
      user.setCount(data.count);
      if (!user.foo) {
        quiz.nextQuestion();
      }
    },
  });

  if (!quiz.questions) {
    return null;
  }

  return (
    <div className="font-semibold">
      {/* {JSON.stringify(quiz.question ?? "null").toString()} */}
      <Image
        alt="prize"
        width={20}
        height={20}
        src="/icons/prize.svg"
        className="mr-1 inline"
      />
      <span>
        {user.count}/{quiz.questions.length}
      </span>
    </div>
  );
};
