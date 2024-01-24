"use client";
import { usePrizeStore } from "@/hooks/prize";
import { useQuery } from "react-query";
import axios from "axios";
import { useUserStore } from "@/hooks/user";
import { useEffect } from "react";
import { useQuizStore } from "@/hooks/quiz";
import { Loader } from "lucide-react";

export const PrizeCounter = () => {
  const { count, max, set, setMax } = usePrizeStore();
  const { user } = useUserStore();
  const { questionnaireId } = useQuizStore();

  const { isLoading } = useQuery(
    "prize",
    () => {
      if (!user) return;
      return axios.post("/api/prize", {
        userId: user.id,
        questionnaireId,
      });
    },
    {
      refetchOnWindowFocus: false,
      refetchOnMount: 'always',
      onSuccess: ({ data }) => {
        set(data.count);
        setMax(data.max);
      },
    },
  );

  if (isLoading) {
    return (
      <div className="font-semibold">
        <Loader size={16} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="font-semibold">
      <img src="/icons/prize.svg" className="inline" /> {count}/{max}
    </div>
  );
};
