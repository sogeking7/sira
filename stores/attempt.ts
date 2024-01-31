import { User } from "@/types";
import { create } from "zustand";

type Store = {
  lastQuestionId: number | null;
  initAttempt: (id: number) => void;
};

export const useAttemptStore = create<Store>()((set) => {
  return {
    lastQuestionId: null,
    initAttempt: (id) =>
      set({
        lastQuestionId: id,
      }),
  };
});
