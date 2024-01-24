import { Question, Questionnaire } from "@/types";
import { create } from "zustand";

type Store = {
  questionnaireId: number;
  questionnaire: Questionnaire | null;
  question: Question | null;
  progress: number | null;
  isLastQuestion: boolean | null;
  correctAnswersCount: number;
  removeQuiz: () => void;
  nextQuestion: () => void;
  initQuiz: (data: {
    attempt: {
      questionnaire: Questionnaire;
    };
    nextQuestion: Question;
    isLastQuestion: boolean;
    correctAnswersCount: number;
  }) => void;
};

export const useQuizStore = create<Store>()((set) => {
  return {
    questionnaireId: 1,
    questionnaire: null,
    question: null,
    progress: null,
    isLastQuestion: null,
    correctAnswersCount: 0,
    removeQuiz: () =>
      set(() => {
        return {
          questionnaire: null,
          question: null,
          progress: null,
          isLastQuestion: null,
          correctAnswersCount: 0,
        };
      }),
    initQuiz: (data) =>
      set(() => {
        return {
          questionnaire: data.attempt.questionnaire,
          question: data.nextQuestion,
          isLastQuestion: data.isLastQuestion,
          correctAnswersCount: data.correctAnswersCount,
        };
      }),
    nextQuestion: () =>
      set((state) => {
        if (state.questionnaire === null || state.question === null) return {};
        const curQuestionId = state.question.id;
        const maxQuestions = state.questionnaire.questions.length;
        if (curQuestionId === maxQuestions) return {};
        const nextQuestion = state.questionnaire.questions[curQuestionId];
        return {
          question: nextQuestion,
        };
      }),
  };
});
