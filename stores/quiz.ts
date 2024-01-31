import { Question } from "@/types";
import { create } from "zustand";

type Store = {
  quizId: number;
  questions: Question[] | null;
  question: Question | null;
  isLastQuestion: boolean | null;
  collectedAnswers: any;
  questionIndex: number;
  nextQuestion: () => void;
  initQuiz: (data: Question[]) => void;
  addCollectedAnswer: (data: any) => void;
  initQuestionIndex: (index: number) => void;
  initQuestion: () => void;
};

export const useQuizStore = create<Store>()((set) => {
  return {
    quizId: 1,
    questions: null,
    question: null,
    questionIndex: -1,
    collectedAnswers: [],
    isLastQuestion: false,
    initQuiz: (data) =>
      set({
        questions: data,
      }),
    initQuestion: () =>
      set((state) => {
        return {
          question: state.questions![state.questionIndex],
        };
      }),
    initQuestionIndex: (index) =>
      set(() => {
        return {
          questionIndex: index,
        };
      }),
    nextQuestion: () =>
      set((state) => {
        const nextIndex = state.questionIndex + 1;

        if (nextIndex === state.questions!.length) {
          return {
            question: null,
            questionIndex: -1,
            isLastQuestion: false,
          };
        }

        const isLastQuestion = nextIndex === state.questions!.length - 1;

        return {
          question: state.questions![nextIndex],
          questionIndex: nextIndex,
          isLastQuestion,
        };
      }),
    addCollectedAnswer: (data) =>
      set((state) => {
        return {
          collectedAnswers: [...state.collectedAnswers, data],
        };
      }),
  };
});
