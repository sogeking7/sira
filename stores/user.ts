import { Answer, Question, Questionnaire, User } from "@/types";
import axios from "axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

type Store = {
  id: User["id"] | null;
  phone: User["phone"] | null;
  count: number;
  foo: boolean;
  setFoo: (foo: boolean) => void;
  initUser: (user: User) => void;
  incCount: () => void;
  setCount: (count: number) => void;
  fetchSaveAnswer: (
    user_id: User["id"] | null,
    quiz_id: Questionnaire["id"],
    answer_id: Answer["id"],
    question_id: Question["id"],
  ) => Promise<any>;
};

export const useUserStore = create<Store>()(
  devtools((set) => {
    return {
      id: null,
      phone: null,
      count: 0,
      foo: false,
      setFoo: (foo) => set({ foo }),
      initUser: (user) => set({ id: user.id, phone: user.phone }),
      setCount: (count) => set({ count }),
      incCount: () => set((state) => ({ count: state.count + 1 })),
      fetchSaveAnswer: (user_id, quiz_id, answer_id, question_id) =>
        axios.post(`/api/proceed`, {
          userId: user_id,
          quizId: quiz_id,
          answerId: answer_id,
          questionId: question_id,
        }),
    };
  }),
);
