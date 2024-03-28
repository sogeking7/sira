"use client";

import { useUserStore } from "@/stores/user";
import { useQuizStore } from "@/stores/quiz";
import Image from "next/image";
import { useEffect } from "react";
import { useQueryClient } from "react-query";
import axios from "axios";

export const PrizeCounter = () => {
  const queryClient = useQueryClient();

  const { id: userId, ...user } = useUserStore();
  const { id: quizId, ...quiz } = useQuizStore();

  useEffect(() => {
    const fetchAttempt = async () => {
      try {
        const { data } = await queryClient.fetchQuery({
          queryKey: ["attempt"],
          queryFn: () => axios.get(`/api/attempt/${userId}/${quizId}`),
        });
        quiz.initQuiz(data.questions);
        quiz.setIsFinished(data.isFinished);
        if (!data.isFinished) {
          quiz.initQuestionIndex(data.lastQuestionIndex);
          quiz.initQuestion();
          quiz.nextQuestion();
        } else {
          quiz.resetQuestion();
        }
        user.setPrize(data.count);
      } catch (err) {
        console.error(err);
      }
    };

    if (userId) {
      fetchAttempt();
    }
  }, []);

  if (!quiz.questions) {
    return null;
  }

  return (
    <div className="font-semibold">
      <Image
        alt="prize"
        width={20}
        height={20}
        src="/icons/prize.svg"
        className="mr-1 inline"
      />
      <span>
        {user.prize}/{quiz.questions.length}
      </span>
    </div>
  );
};
