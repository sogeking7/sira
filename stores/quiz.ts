import { Answer, Question } from "@/types";
import { create } from "zustand";

type Store = {
  quizId: number;
  questions: Question[] | null;
  question: Question | null;
  isLastQuestion: boolean | null;
  collectedAnswers: any;
  questionIndex: number;
  isFinished: boolean;
  count: number;
  isQuizEnded: boolean;
  incQuizCount: () => void;
  setIsFinished: (isFinished: boolean) => void;
  nextQuestion: () => void;
  initQuiz: (data: Question[]) => void;
  addCollectedAnswer: (data: any) => void;
  initQuestionIndex: (index: number) => void;
  initQuestion: () => void;
  resetQuestion: () => void;
  setIsQuizEnded: (isQuizEnded: boolean) => void;
};

export const useQuizStore = create<Store>()((set) => {
  return {
    quizId: 1,
    questions: null,
    question: null,
    questionIndex: -1,
    collectedAnswers: [],
    isLastQuestion: false,
    isFinished: false,
    count: 0,
    isQuizEnded: false,
    setIsQuizEnded: (isQuizEnded) => set({ isQuizEnded }),
    incQuizCount: () => {
      set((state) => {
        return {
          count: state.count + 1,
        };
      });
    },
    resetQuestion: () => {
      set((state) => {
        if (state.questions) {
          return {
            count: 0,
            question: state.questions[0],
            questionIndex: -1,
            isLastQuestion: false,
          };
        }
        return {};
      });
    },
    setIsFinished: (isFinished) => set({ isFinished }),
    initQuiz: (data) =>
      set(() => {
        const sortedData = data.map((question) => {
          let allAnswersObj: Answer | null = null;
          const sortedAnswers: Answer[] = [];
          question.answers.forEach((obj) => {
            if (obj.title === "Все ответы верны") allAnswersObj = obj;
            else sortedAnswers.push(obj);
          });
          if (allAnswersObj) sortedAnswers.push(allAnswersObj);
          return {
            ...question,
            answers: sortedAnswers,
          };
        });
        return {
          questionIndex: -1,
          questions: sortedData,
        };
      }),
    initQuestion: () =>
      set((state) => {
        return {
          question: state.questions![state.questionIndex],
        };
      }),
    initQuestionIndex: (index) =>
      set((state) => {
        if (!state.questions) return {};
        if (index === state.questions?.length - 1) {
          return {
            questionIndex: -1,
            isLastQuestion: false,
            count: 0,
            isQuizEnded: true,
          };
        }
        return {
          questionIndex: index,
        };
      }),
    nextQuestion: () =>
      set((state) => {
        const nextIndex = state.questionIndex + 1;
        console.log("nextIndex", nextIndex);
        if (nextIndex === state.questions!.length) {
          return {
            isFinished: true,
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
