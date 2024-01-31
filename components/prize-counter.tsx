"use client";

import { useUserStore } from "@/stores/user";
import { useQuizStore } from "@/stores/quiz";
import Image from "next/image";
import { useQuery } from "react-query";
import axios from "axios";

export const PrizeCounter = () => {
  const { user, initUser, count, setCount } = useUserStore();
  const { questions, quizId, initQuestionIndex } = useQuizStore();

  const token = localStorage.getItem("Access_Token");
  const userId = user?.id;

  useQuery({
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

  useQuery({
    queryKey: ["attempt", userId],
    queryFn: () => axios.get(`/api/attempt/${userId}/${quizId}`),
    onSuccess: ({ data }) => {
      console.log(data);
      // initAttempt(data.lastQuestionId);
      initQuestionIndex(data.lastQuestionIndex);
      setCount(data.count);
    },
    refetchOnReconnect: false,
    refetchInterval: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchIntervalInBackground: false,
    enabled: !!userId,
  });

  if (!userId || !questions) {
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
        {count}/{questions.length}
      </span>
    </div>
  );
};
