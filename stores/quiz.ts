import { Question } from "@/types";
import { create } from "zustand";

type Store = {
  quizId: number;
  questions: Question[] | null;
  question: Question | null;
  progress: number | null;
  isLastQuestion: boolean | null;
  correctAnswersCount: number;
  collectedAnswers: any;
  questionIndex: number;
  removeQuiz: () => void;
  nextQuestion: () => void;
  initQuiz: (data: Question[]) => void;
  addCollectedAnswer: (data: any) => void;
  initQuestionIndex: (index?: number | null) => void;
  initQuestion: () => void;
};

export const useQuizStore = create<Store>()((set) => {
  return {
    quizId: 1,
    questions: null,
    question: null,
    progress: null,
    correctAnswersCount: 0,
    questionIndex: -1,
    collectedAnswers: [],
    isLastQuestion: false,
    removeQuiz: () =>
      set(() => {
        return {
          questions: null,
          question: null,
          progress: null,
          correctAnswersCount: 0,
          collectedAnswers: [],
        };
      }),
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
    initQuestionIndex: (id) =>
      set((state) => {
        if (!id) {
          return {
            questionIndex: 0,
          };
        }
        const index = state.questions!.findIndex((val) => val.id === id);
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
