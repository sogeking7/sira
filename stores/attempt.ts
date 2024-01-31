import { User } from "@/types";
import { create } from "zustand";

type Store = {
  lastQuestionIndex: number | null;
  initAttempt: (id: number) => void;
};

export const useAttemptStore = create<Store>()((set) => {
  return {
    lastQuestionIndex: null,
    initAttempt: (id) =>
      set({
        lastQuestionIndex: id,
      }),
  };
});
