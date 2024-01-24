"use client";
import { useQuery } from "react-query";
import axios from "axios";
import { useUserStore } from "@/hooks/user";
import { useEffect } from "react";
import { useQuizStore } from "@/hooks/quiz";
import { Loader } from "lucide-react";

export const PrizeCounter = () => {
  const { user, setUser, count, max } = useUserStore();
  const { questionnaireId } = useQuizStore();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const token = localStorage.getItem("Access_Token");
      if (token) setUser(token);
    }
  }, []);

  if (!user) {
    return (
      <div className="font-semibold">
        <Loader size={16} className="animate-spin" />
      </div>
    );
  }

  if (!user.id) {
    return null;
  }

  return (
    <div className="font-semibold">
      <img src="/icons/prize.svg" className="inline" /> {count}/{max}
    </div>
  );
};
